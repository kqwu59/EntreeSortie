const STORAGE_KEY = 'entree-sortie-declaration';

const titleEl = document.getElementById('arrival-title');
const metaEl = document.getElementById('arrival-meta');
const tasksBody = document.getElementById('tasks-body');

function loadDeclarations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeclarations(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getRequestId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderTaskRows(request) {
  tasksBody.innerHTML = '';

  request.arrivalChecklist.forEach((task) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" data-task-id="${task.id}" ${task.done ? 'checked' : ''} /></td>
      <td>${task.actor}</td>
      <td>${task.action}</td>
      <td>${task.detail}</td>
      <td>${task.due}</td>
    `;
    tasksBody.appendChild(tr);
  });

  document.querySelectorAll('[data-task-id]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const declarations = loadDeclarations();
      const idx = declarations.findIndex((item) => item.id === request.id);
      if (idx < 0) return;

      const list = declarations[idx].arrivalChecklist || [];
      const taskIndex = list.findIndex((task) => task.id === checkbox.dataset.taskId);
      if (taskIndex < 0) return;

      list[taskIndex].done = checkbox.checked;
      const allDone = list.length > 0 && list.every((task) => task.done);
      declarations[idx].arrivalCompleted = allDone;
      saveDeclarations(declarations);
    });
  });
}

function init() {
  const id = getRequestId();
  if (!id) {
    titleEl.textContent = "Parcours d'arrivée introuvable";
    metaEl.textContent = 'Aucun identifiant de demande fourni.';
    return;
  }

  const declarations = loadDeclarations();
  const request = declarations.find((item) => item.id === id);
  if (!request) {
    titleEl.textContent = "Parcours d'arrivée introuvable";
    metaEl.textContent = "La demande n'existe pas ou a été supprimée.";
    return;
  }

  titleEl.textContent = `Parcours d'arrivée — ${request.firstName} ${request.lastName}`;
  metaEl.textContent = `${request.department || '-'} • Arrivée: ${request.arrivalDate || '-'}`;

  if (!request.arrivalChecklist || request.arrivalChecklist.length === 0) {
    metaEl.textContent += ' • Aucun parcours trouvé pour cette demande.';
    return;
  }

  renderTaskRows(request);
}

init();
