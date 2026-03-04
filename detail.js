const STORAGE_KEY = 'entree-sortie-declaration';

const titleEl = document.getElementById('arrival-title');
const metaEl = document.getElementById('arrival-meta');
const categoriesWrap = document.getElementById('categories-wrap');
const actorFilter = document.getElementById('actor-filter');
const dueFilter = document.getElementById('due-filter');
const textFilter = document.getElementById('text-filter');
const statsEl = document.getElementById('stats');

let currentRequest = null;

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

function renderFilters(tasks) {
  const actors = [...new Set(tasks.map((task) => task.actor))].sort();
  const dues = [...new Set(tasks.map((task) => task.due))];

  actorFilter.innerHTML = '<option value="ALL">Tous</option>' + actors.map((actor) => `<option value="${actor}">${actor}</option>`).join('');
  dueFilter.innerHTML = '<option value="ALL">Toutes</option>' + dues.map((due) => `<option value="${due}">${due}</option>`).join('');
}

function getFilteredTasks(tasks) {
  const actor = actorFilter.value || 'ALL';
  const due = dueFilter.value || 'ALL';
  const text = (textFilter.value || '').trim().toLowerCase();

  return tasks.filter((task) => {
    if (actor !== 'ALL' && task.actor !== actor) return false;
    if (due !== 'ALL' && task.due !== due) return false;
    if (!text) return true;
    return `${task.actor} ${task.action} ${task.detail} ${task.due}`.toLowerCase().includes(text);
  });
}

function renderStats(tasks) {
  const done = tasks.filter((task) => task.done).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  statsEl.innerHTML = `
    <div class="pill">${done}/${total} tâches réalisées</div>
    <div class="pill">Progression: ${percent}%</div>
  `;
}

function groupByActor(tasks) {
  const groups = new Map();
  tasks.forEach((task) => {
    if (!groups.has(task.actor)) groups.set(task.actor, []);
    groups.get(task.actor).push(task);
  });
  return groups;
}

function persistTaskState(taskId, checked) {
  const declarations = loadDeclarations();
  const idx = declarations.findIndex((item) => item.id === currentRequest.id);
  if (idx < 0) return;

  const list = declarations[idx].arrivalChecklist || [];
  const taskIndex = list.findIndex((task) => task.id === taskId);
  if (taskIndex < 0) return;

  list[taskIndex].done = checked;
  declarations[idx].arrivalCompleted = list.length > 0 && list.every((task) => task.done);
  saveDeclarations(declarations);

  currentRequest = declarations[idx];
}

function renderCategories() {
  const list = currentRequest.arrivalChecklist || [];
  const filtered = getFilteredTasks(list);
  categoriesWrap.innerHTML = '';

  if (filtered.length === 0) {
    categoriesWrap.innerHTML = '<p class="muted">Aucune tâche pour ce filtre.</p>';
    renderStats(list);
    return;
  }

  const grouped = groupByActor(filtered);
  let isFirst = true;

  grouped.forEach((tasks, actor) => {
    const doneCount = tasks.filter((task) => task.done).length;
    const details = document.createElement('details');
    details.className = 'category';
    details.open = isFirst;
    isFirst = false;

    details.innerHTML = `
      <summary>
        <span>${actor}</span>
        <span class="category-count">${doneCount}/${tasks.length}</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fait</th>
              <th>Action</th>
              <th>Détail</th>
              <th>Échéance</th>
            </tr>
          </thead>
          <tbody>
            ${tasks
              .map(
                (task) => `
              <tr>
                <td><input type="checkbox" data-task-id="${task.id}" ${task.done ? 'checked' : ''} /></td>
                <td>${task.action}</td>
                <td>${task.detail}</td>
                <td>${task.due}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
    categoriesWrap.appendChild(details);
  });

  document.querySelectorAll('[data-task-id]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      persistTaskState(checkbox.dataset.taskId, checkbox.checked);
      renderStats(currentRequest.arrivalChecklist || []);
      renderCategories();
    });
  });

  renderStats(currentRequest.arrivalChecklist || []);
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

  currentRequest = request;

  titleEl.textContent = `Parcours d'arrivée — ${request.firstName} ${request.lastName}`;
  metaEl.textContent = `${request.department || '-'} • Arrivée: ${request.arrivalDate || '-'} • Bureau: ${request.office || '-'}`;

  if (!request.arrivalChecklist || request.arrivalChecklist.length === 0) {
    categoriesWrap.innerHTML = '<p class="muted">Aucun parcours trouvé pour cette demande.</p>';
    return;
  }

  renderFilters(request.arrivalChecklist);
  actorFilter.addEventListener('change', renderCategories);
  dueFilter.addEventListener('change', renderCategories);
  textFilter.addEventListener('input', renderCategories);

  renderCategories();
}

init();
