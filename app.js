const STORAGE_KEY = "entreeSortieData";

const SERVICES = ["RH", "Affaires Générales", "IT"];

const STATUS_LABELS = {
  A_FAIRE: "À faire",
  EN_COURS: "En cours",
  BLOQUE: "Bloqué",
  TERMINE: "Terminé",
};

const DEFAULT_TASKS = {
  ENTREE: {
    RH: "Créer le dossier collaborateur et transmettre les données",
    "Affaires Générales": "Préparer bureau, badge et clé",
    IT: "Créer comptes, préparer poste et droits d'accès",
  },
  SORTIE: {
    RH: "Confirmer la sortie et communiquer la date effective",
    "Affaires Générales": "Organiser la restitution des moyens physiques",
    IT: "Planifier désactivation des accès et récupération du matériel",
  },
};

const state = loadState();

const form = document.getElementById("requestForm");
const globalTable = document.getElementById("globalTable");
const boards = document.getElementById("boards");
const notifications = document.getElementById("notifications");
const auditLog = document.getElementById("auditLog");
const taskTemplate = document.getElementById("taskTemplate");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const request = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type: data.get("type"),
    effectiveDate: data.get("effectiveDate"),
    lastName: data.get("lastName"),
    firstName: data.get("firstName"),
    email: data.get("email"),
    department: data.get("department"),
    manager: data.get("manager"),
    itNeeds: data.get("itNeeds") || "-",
    logisticsNeeds: data.get("logisticsNeeds") || "-",
    tasks: SERVICES.map((service) => ({
      id: crypto.randomUUID(),
      service,
      title: DEFAULT_TASKS[data.get("type")][service],
      status: "A_FAIRE",
      updatedAt: new Date().toISOString(),
    })),
  };

  state.requests.unshift(request);
  addNotification(`Nouvelle demande ${request.type.toLowerCase()} créée pour ${request.firstName} ${request.lastName}.`);
  addAudit(`Demande créée (${request.type}) par RH pour ${request.firstName} ${request.lastName}.`);
  saveState();
  render();
  form.reset();
});

function render() {
  renderGlobalTable();
  renderBoards();
  renderNotifications();
  renderAudit();
}

function renderGlobalTable() {
  if (!state.requests.length) {
    globalTable.innerHTML = "<p>Aucune demande pour le moment.</p>";
    return;
  }

  const rows = state.requests
    .map((request) => {
      const completion = Math.round(
        (request.tasks.filter((task) => task.status === "TERMINE").length / request.tasks.length) * 100,
      );

      return `<tr>
        <td>${request.firstName} ${request.lastName}</td>
        <td>${request.type}</td>
        <td>${request.department}</td>
        <td>${request.effectiveDate}</td>
        <td>${request.manager}</td>
        <td>${completion}%</td>
      </tr>`;
    })
    .join("");

  globalTable.innerHTML = `<div class="table-wrap"><table>
    <thead>
      <tr><th>Collaborateur</th><th>Type</th><th>Service</th><th>Date effective</th><th>Manager</th><th>Progression</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderBoards() {
  boards.innerHTML = "";

  SERVICES.forEach((service) => {
    const board = document.createElement("section");
    board.className = "board";
    board.innerHTML = `<h3>${service}</h3>`;

    const serviceTasks = state.requests.flatMap((request) =>
      request.tasks
        .filter((task) => task.service === service)
        .map((task) => ({ task, request })),
    );

    if (!serviceTasks.length) {
      const empty = document.createElement("p");
      empty.textContent = "Aucune tâche.";
      board.appendChild(empty);
    } else {
      serviceTasks.forEach(({ task, request }) => {
        const fragment = taskTemplate.content.cloneNode(true);
        fragment.querySelector("h4").textContent = `${request.firstName} ${request.lastName}`;
        fragment.querySelector(".meta").textContent = `${task.title} · ${request.type} · ${request.effectiveDate}`;

        const select = fragment.querySelector(".statusSelect");
        select.value = task.status;
        select.addEventListener("change", (event) => {
          task.status = event.target.value;
          task.updatedAt = new Date().toISOString();
          addNotification(
            `${service} : ${request.firstName} ${request.lastName} -> statut "${STATUS_LABELS[task.status]}".`,
          );
          addAudit(
            `${service} a mis à jour la tâche de ${request.firstName} ${request.lastName} : ${STATUS_LABELS[task.status]}.`,
          );
          saveState();
          render();
        });

        board.appendChild(fragment);
      });
    }

    boards.appendChild(board);
  });
}

function addNotification(message) {
  state.notifications.unshift({ id: crypto.randomUUID(), message, at: new Date().toISOString() });
  state.notifications = state.notifications.slice(0, 30);
}

function addAudit(message) {
  state.audit.unshift({ id: crypto.randomUUID(), message, at: new Date().toISOString() });
  state.audit = state.audit.slice(0, 60);
}

function renderNotifications() {
  notifications.innerHTML = "";
  if (!state.notifications.length) {
    notifications.innerHTML = "<li>Aucune notification.</li>";
    return;
  }
  state.notifications.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `[${formatDate(item.at)}] ${item.message}`;
    notifications.appendChild(li);
  });
}

function renderAudit() {
  auditLog.innerHTML = "";
  if (!state.audit.length) {
    auditLog.innerHTML = "<li>Aucun événement.</li>";
    return;
  }
  state.audit.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `[${formatDate(item.at)}] ${item.message}`;
    auditLog.appendChild(li);
  });
}

function formatDate(value) {
  return new Date(value).toLocaleString("fr-FR");
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { requests: [], notifications: [], audit: [] };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { requests: [], notifications: [], audit: [] };
  }
}

render();
