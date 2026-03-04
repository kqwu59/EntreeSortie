const STORAGE_KEY = 'entree-sortie-mvp';

const SERVICES = {
  RH: 'Ressources Humaines',
  AG: 'Affaires Générales',
  IT: 'Service Informatique',
};

const STATUS_OPTIONS = ['À faire', 'En cours', 'Bloqué', 'Terminé'];

const TASK_LIBRARY = {
  ENTRY: {
    RH: [
      'Créer le dossier collaborateur',
      'Saisir les informations contractuelles',
      'Déclencher Sirhus et Reseda',
    ],
    AG: ['Préparer le bureau', 'Créer le badge', 'Préparer la clé'],
    IT: ['Créer le compte AD', 'Préparer la machine', 'Configurer les accès applicatifs'],
  },
  EXIT: {
    RH: ['Créer la demande de sortie', 'Valider la date effective', 'Informer les services'],
    AG: ['Organiser restitution badge/clé', 'Vérifier libération du bureau', 'Clôturer les moyens physiques'],
    IT: ['Planifier désactivation des comptes', 'Récupérer le matériel', 'Confirmer la clôture des accès'],
  },
};

let state = loadState();

const form = document.getElementById('request-form');
const globalBody = document.getElementById('global-body');
const taskContainers = {
  RH: document.getElementById('tasks-rh'),
  AG: document.getElementById('tasks-ag'),
  IT: document.getElementById('tasks-it'),
};
const notificationsEl = document.getElementById('notifications');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const requestType = data.get('requestType');
  const arrivalDate = data.get('arrivalDate') || '';
  const departureDate = data.get('departureDate') || '';

  if (requestType === 'ENTRY' && !arrivalDate) {
    alert("Pour une entrée, la date d'arrivée est requise.");
    return;
  }

  if (requestType === 'EXIT' && !departureDate) {
    alert('Pour une sortie, la date de départ est requise.');
    return;
  }

  const request = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    lastName: data.get('lastName').trim(),
    firstName: data.get('firstName').trim(),
    email: data.get('email').trim(),
    department: data.get('department').trim(),
    manager: data.get('manager').trim(),
    requestType,
    arrivalDate,
    departureDate,
    office: data.get('office').trim(),
    team: data.get('team').trim(),
    role: data.get('role').trim(),
    validations: {
      sirhusValidated: data.get('sirhusValidated') === 'on',
      resedaMailSent: data.get('resedaMailSent') === 'on',
      iamTagged: data.get('iamTagged') === 'on',
      preIamMatrixCompleted: data.get('preIamMatrixCompleted') === 'on',
    },
    itNeeds: data.get('itNeeds').trim(),
    logisticsNeeds: data.get('logisticsNeeds').trim(),
    tasks: createTasks(requestType),
    auditLog: [{ message: 'Demande créée', timestamp: new Date().toISOString() }],
  };

  state.requests.unshift(request);
  pushNotification(`Nouvelle demande ${labelType(request.requestType)}: ${fullName(request)}`);
  saveAndRender();
  form.reset();
});

function createTasks(type) {
  return Object.entries(TASK_LIBRARY[type]).flatMap(([serviceCode, labels]) =>
    labels.map((label) => ({
      id: crypto.randomUUID(),
      service: serviceCode,
      label,
      status: 'À faire',
      updatedAt: new Date().toISOString(),
    }))
  );
}

function updateTaskStatus(requestId, taskId, status) {
  const request = state.requests.find((r) => r.id === requestId);
  if (!request) return;

  const task = request.tasks.find((t) => t.id === taskId);
  if (!task) return;

  task.status = status;
  task.updatedAt = new Date().toISOString();
  const entry = `${SERVICES[task.service]}: "${task.label}" → ${status}`;
  request.auditLog.unshift({ message: entry, timestamp: new Date().toISOString() });

  pushNotification(`Mise à jour (${fullName(request)}): ${entry}`);
  saveAndRender();
}

function pushNotification(message) {
  state.notifications.unshift({ id: crypto.randomUUID(), message, timestamp: new Date().toISOString() });
  state.notifications = state.notifications.slice(0, 30);
}

function progression(request) {
  const done = request.tasks.filter((t) => t.status === 'Terminé').length;
  return `${done}/${request.tasks.length}`;
}

function displayDates(request) {
  const arrival = request.arrivalDate ? `Arrivée: ${request.arrivalDate}` : '';
  const departure = request.departureDate ? `Départ: ${request.departureDate}` : '';
  return [arrival, departure].filter(Boolean).join(' • ') || '-';
}

function renderGlobal() {
  globalBody.innerHTML = '';

  if (state.requests.length === 0) {
    globalBody.innerHTML = '<tr><td colspan="5"><small class="muted">Aucune demande.</small></td></tr>';
    return;
  }

  for (const request of state.requests) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fullName(request)}<br/><small class="muted">${request.email} • ${request.department}</small></td>
      <td>${labelType(request.requestType)}</td>
      <td>${request.team || '-'} / ${request.role || '-'}</td>
      <td>${displayDates(request)}</td>
      <td>${progression(request)}</td>
    `;
    globalBody.appendChild(tr);
  }
}

function renderTasksByService() {
  Object.values(taskContainers).forEach((container) => (container.innerHTML = ''));

  const byService = { RH: [], AG: [], IT: [] };
  for (const request of state.requests) {
    for (const task of request.tasks) {
      byService[task.service].push({ request, task });
    }
  }

  Object.entries(byService).forEach(([service, entries]) => {
    const container = taskContainers[service];
    if (entries.length === 0) {
      container.innerHTML = '<small class="muted">Aucune tâche.</small>';
      return;
    }

    entries.forEach(({ request, task }) => {
      const wrapper = document.createElement('article');
      wrapper.className = 'task-item';

      const options = STATUS_OPTIONS.map((status) =>
        `<option value="${status}" ${status === task.status ? 'selected' : ''}>${status}</option>`
      ).join('');

      wrapper.innerHTML = `
        <div class="task-head">
          <span>${task.label}</span>
          <span class="badge">${labelType(request.requestType)}</span>
        </div>
        <small>${fullName(request)} • ${request.department} • ${request.office || 'Bureau à définir'}</small>
        <label>Statut
          <select data-request-id="${request.id}" data-task-id="${task.id}">${options}</select>
        </label>
      `;
      container.appendChild(wrapper);
    });
  });

  document.querySelectorAll('select[data-task-id]').forEach((selectEl) => {
    selectEl.addEventListener('change', (event) => {
      const target = event.target;
      updateTaskStatus(target.dataset.requestId, target.dataset.taskId, target.value);
    });
  });
}

function renderNotifications() {
  notificationsEl.innerHTML = '';
  if (state.notifications.length === 0) {
    notificationsEl.innerHTML = '<li><small class="muted">Aucune notification.</small></li>';
    return;
  }

  state.notifications.forEach((notification) => {
    const li = document.createElement('li');
    li.innerHTML = `${notification.message}<br/><small class="muted">${new Date(notification.timestamp).toLocaleString('fr-FR')}</small>`;
    notificationsEl.appendChild(li);
  });
}

function labelType(type) {
  return type === 'ENTRY' ? 'Entrée' : 'Sortie';
}

function fullName(request) {
  return `${request.firstName} ${request.lastName}`;
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { requests: [], notifications: [] };
  } catch {
    return { requests: [], notifications: [] };
  }
}

function render() {
  renderGlobal();
  renderTasksByService();
  renderNotifications();
}

render();
