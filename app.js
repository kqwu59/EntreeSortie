const STORAGE_KEY = 'entree-sortie-declaration';

const ARRIVAL_TEMPLATE = [
  { actor: 'CdS', action: 'Prévoir', detail: 'Documents à remettre : organigramme, chartes...', due: 'Avant' },
  { actor: 'CdS', action: 'Définir', detail: "Habilitations de l'agent dans IAM", due: 'Avant' },
  { actor: 'CdS', action: 'Informer', detail: "Personnel de la structure de l'arrivée du nouvel agent", due: 'Pendant' },
  { actor: 'SCMS', action: 'Prévoir', detail: "Mettre à jour l'organigramme", due: 'Après' },
  { actor: 'SPPS', action: 'Prévoir', detail: 'Badge/code accès, clés de bureau', due: 'Avant' },
  { actor: 'SRH', action: 'Transmettre', detail: 'Fiche de poste et règlement intérieur', due: 'Pendant' },
  { actor: 'SSI', action: 'Prévoir', detail: 'Création compte utilisateur et liste de diffusion', due: 'Avant' },
  { actor: 'SSI', action: 'Moyens mis à disposition', detail: 'Accréditer l’agent aux applications métiers', due: 'Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil informatique et sécurité numérique', due: 'Pendant' },
];

const form = document.getElementById('declaration-form');
const editingIdInput = document.getElementById('editingId');
const noDepartureDate = document.getElementById('noDepartureDate');
const departureDateInput = document.getElementById('departureDate');
const feedback = document.getElementById('form-feedback');
const savedBody = document.getElementById('saved-body');
const clearStorageButton = document.getElementById('clear-storage');
const cancelEditButton = document.getElementById('cancel-edit');
const submitButton = document.getElementById('submit-btn');

function createArrivalChecklist() {
  return ARRIVAL_TEMPLATE.map((item, index) => ({
    id: crypto.randomUUID(),
    order: index,
    done: false,
    ...item,
  }));
}

function applyNoDepartureState() {
  const disabled = noDepartureDate.checked;
  if (disabled) departureDateInput.value = '';
  departureDateInput.disabled = disabled;
}

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

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('fr-FR');
}

function setFeedback(message, error = false) {
  feedback.textContent = message;
  feedback.style.color = error ? '#991b1b' : '#14532d';
}

function resetFormMode() {
  editingIdInput.value = '';
  submitButton.textContent = 'Enregistrer';
  cancelEditButton.classList.add('hidden');
}

function fillFormForEdit(item) {
  editingIdInput.value = item.id;
  form.lastName.value = item.lastName || '';
  form.firstName.value = item.firstName || '';
  form.email.value = item.email || '';
  form.department.value = item.department || '';
  form.arrivalDate.value = item.arrivalDate || '';
  form.departureDate.value = item.departureDate || '';
  form.noDepartureDate.checked = Boolean(item.noDepartureDate);
  form.office.value = item.office || '';
  form.team.value = item.team || '';
  form.role.value = item.role || '';

  applyNoDepartureState();
  submitButton.textContent = 'Mettre à jour';
  cancelEditButton.classList.remove('hidden');
  setFeedback(`Reprise de la demande pour ${item.firstName} ${item.lastName}.`);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSavedDeclarations() {
  const declarations = loadDeclarations();
  savedBody.innerHTML = '';

  if (declarations.length === 0) {
    savedBody.innerHTML = '<tr><td colspan="6">Aucune demande enregistrée.</td></tr>';
    return;
  }

  declarations.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.firstName} ${item.lastName}</td>
      <td>${item.department || '-'}</td>
      <td>${formatDate(item.arrivalDate)}</td>
      <td>${item.noDepartureDate ? 'Pas de date de fin' : formatDate(item.departureDate)}</td>
      <td>
        <label class="check-inline">
          <input type="checkbox" data-complete-id="${item.id}" ${item.arrivalCompleted ? 'checked' : ''} />
          <span>Terminé</span>
        </label>
      </td>
      <td>
        <button type="button" class="secondary action-btn" data-edit-id="${item.id}">Reprendre</button>
        <a class="link-btn" href="details.html?id=${item.id}">Ouvrir parcours</a>
      </td>
    `;
    savedBody.appendChild(row);
  });

  document.querySelectorAll('[data-edit-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = declarations.find((item) => item.id === button.dataset.editId);
      if (target) fillFormForEdit(target);
    });
  });

  document.querySelectorAll('[data-complete-id]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const updated = loadDeclarations();
      const idx = updated.findIndex((item) => item.id === checkbox.dataset.completeId);
      if (idx < 0) return;
      updated[idx].arrivalCompleted = checkbox.checked;
      saveDeclarations(updated);
      setFeedback('Statut arrivée mis à jour.');
    });
  });
}

noDepartureDate.addEventListener('change', applyNoDepartureState);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  applyNoDepartureState();
  const data = new FormData(form);

  const currentId = data.get('editingId') || crypto.randomUUID();
  const payload = {
    id: currentId,
    createdAt: new Date().toISOString(),
    lastName: (data.get('lastName') || '').trim(),
    firstName: (data.get('firstName') || '').trim(),
    email: (data.get('email') || '').trim(),
    department: (data.get('department') || '').trim(),
    arrivalDate: data.get('arrivalDate') || '',
    noDepartureDate: data.get('noDepartureDate') === 'on',
    departureDate: data.get('noDepartureDate') === 'on' ? '' : data.get('departureDate') || '',
    office: (data.get('office') || '').trim(),
    team: (data.get('team') || '').trim(),
    role: (data.get('role') || '').trim(),
    arrivalCompleted: false,
    arrivalChecklist: createArrivalChecklist(),
  };

  if (!payload.noDepartureDate && !payload.departureDate) {
    setFeedback("Veuillez renseigner une date de départ ou cocher 'Pas de date de fin'.", true);
    return;
  }

  const existing = loadDeclarations();
  const index = existing.findIndex((item) => item.id === currentId);

  if (index >= 0) {
    payload.createdAt = existing[index].createdAt;
    payload.arrivalCompleted = Boolean(existing[index].arrivalCompleted);
    payload.arrivalChecklist = existing[index].arrivalChecklist?.length
      ? existing[index].arrivalChecklist
      : createArrivalChecklist();
    existing[index] = payload;
    setFeedback('Demande mise à jour.');
  } else {
    existing.unshift(payload);
    setFeedback('Déclaration enregistrée.');
  }

  saveDeclarations(existing);
  form.reset();
  resetFormMode();
  applyNoDepartureState();
  renderSavedDeclarations();
});

cancelEditButton.addEventListener('click', () => {
  form.reset();
  resetFormMode();
  applyNoDepartureState();
  setFeedback('Reprise annulée.');
});

clearStorageButton.addEventListener('click', () => {
  saveDeclarations([]);
  renderSavedDeclarations();
  form.reset();
  resetFormMode();
  applyNoDepartureState();
  setFeedback('Liste vidée.');
});

resetFormMode();
applyNoDepartureState();
renderSavedDeclarations();
