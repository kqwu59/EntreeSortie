const STORAGE_KEY = 'entree-sortie-declaration';

const ARRIVAL_TEMPLATE = [
  { actor: 'CdS', action: 'Prévoir', detail: 'Documents à remettre : organigramme, chartes, … (documents actualisés)', due: '0-Avant' },
  { actor: 'CdS', action: 'Définir', detail: "Habilitations de l'agent dans IAM (Pré-IAM BFC), SIRHUS(circuit actuel)", due: '0-Avant' },
  { actor: 'CdS', action: 'Définir', detail: "Personne en charge de l'accueil", due: '0-Avant' },
  { actor: 'CdS', action: 'Informer', detail: "Personnels de la structure de l’arrivée du nouvel agent (par mail a minima) : identité de l’agent, poste occupé, durée si personnel non permanent", due: '1-Pendant' },
  { actor: 'CdS', action: 'Planifier', detail: 'Présentation aux membres de la structure', due: '1-Pendant' },
  { actor: 'CdS', action: 'Réaliser', detail: 'PVI, contrat de travail', due: '1-Pendant' },
  { actor: 'CdS', action: 'Planifier', detail: 'Visites des locaux / services', due: '1-Pendant' },

  { actor: 'SCMS', action: 'Prévoir', detail: "Mettre à jour l'organigramme", due: '3-Après' },

  { actor: 'SPPS', action: 'Prévoir', detail: 'Badge et/ou code d’accès, clés de bureau', due: '0-Avant' },
  { actor: 'SPPS', action: 'Moyens mis à disposition', detail: 'Badge et/ou code d’accès', due: '1-Pendant' },
  { actor: 'SPPS', action: 'Moyens mis à disposition', detail: 'Clés de bureau', due: '1-Pendant' },

  { actor: 'SRH', action: 'Prévoir', detail: 'Carte de restauration', due: '0-Avant' },
  { actor: 'SRH', action: 'Transmission de documents', detail: 'Fiche de poste', due: '1-Pendant' },
  { actor: 'SRH', action: 'Transmission de documents', detail: 'Organigramme', due: '1-Pendant' },
  { actor: 'SRH', action: 'Définir', detail: 'Paramétres Agate-Tempo', due: '1-Pendant' },
  { actor: 'SRH', action: 'Transmission de documents', detail: 'Règlement intérieur', due: '1-Pendant' },
  { actor: 'SRH', action: 'Moyens mis à disposition', detail: 'Remise la carte de restauration ou carte ticket restaurant', due: '3-Après' },
  { actor: 'SRH', action: 'Prévoir', detail: 'Visite médicale avec le médecin de prévention', due: '3-Après' },

  { actor: 'SSI', action: 'Prévoir', detail: 'Accès et listes de diffusion', due: '0-Avant' },
  { actor: 'SSI', action: 'Prévoir', detail: 'Création du compte utilisateur dans le SI MOY1800', due: '0-Avant' },
  { actor: 'SSI', action: 'Prévoir', detail: 'Poste de travail et outils bureautiques', due: '0-Avant' },
  { actor: 'SSI', action: 'Moyens mis à disposition', detail: "Accréditer l'agent aux applications métiers CNRS", due: '1-Pendant' },
  { actor: 'SSI', action: 'Transmission de documents', detail: 'Accueil 1 : Charte Informatique', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 1 : Présentation du poste informatique', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 1 : Présenter la messagerie', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 1 : Présenter le compte Windows', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 1 : Présenter les imprimantes disponibles', due: '1-Pendant' },
  { actor: 'SSI', action: 'Moyens mis à disposition', detail: 'Accueil 1 : PV remise du poste informatique et des accessoires', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 1 : Sensibilisation sécurité Informatique', due: '1-Pendant' },
  { actor: 'SSI', action: 'Réaliser', detail: 'Accueil 2 : Générer son certificat Sésame Secure', due: '1-Pendant' },
  { actor: 'SSI', action: 'Réaliser', detail: 'Accueil 2 : Initialiser le compte Janus', due: '1-Pendant' },
  { actor: 'SSI', action: 'Réaliser', detail: 'Accueil 2 : Initier les zoom, citadel, sdrive', due: '1-Pendant' },
  { actor: 'SSI', action: 'Réaliser', detail: 'Accueil 2 : Installer et configurer Eduroam', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 2 : Présentation du site d’intégration-agent', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 2 : Présenter la marguerite des applications', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 2 : Présenter les mardis SSI', due: '1-Pendant' },
  { actor: 'SSI', action: 'Informer', detail: 'Accueil 2 : Présenter Micollab', due: '1-Pendant' },
];

const form = document.getElementById('declaration-form');
const editingIdInput = document.getElementById('editingId');
const noDepartureDate = document.getElementById('noDepartureDate');
const departureDateInput = document.getElementById('departureDate');
const feedback = document.getElementById('form-feedback');
const savedBodyActive = document.getElementById('saved-body-active');
const savedBodyDone = document.getElementById('saved-body-done');
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
  savedBodyActive.innerHTML = '';
  savedBodyDone.innerHTML = '';

  if (declarations.length === 0) {
    const empty = '<tr><td colspan="6">Aucune demande enregistrée.</td></tr>';
    savedBodyActive.innerHTML = empty;
    savedBodyDone.innerHTML = empty;
    return;
  }

  const active = declarations.filter((item) => !item.arrivalCompleted);
  const done = declarations.filter((item) => item.arrivalCompleted);

  const renderRow = (item, targetBody) => {
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
    targetBody.appendChild(row);
  };

  if (active.length === 0) {
    savedBodyActive.innerHTML = '<tr><td colspan="6">Aucune demande en cours.</td></tr>';
  } else {
    active.forEach((item) => renderRow(item, savedBodyActive));
  }

  if (done.length === 0) {
    savedBodyDone.innerHTML = '<tr><td colspan="6">Aucune demande terminée.</td></tr>';
  } else {
    done.forEach((item) => renderRow(item, savedBodyDone));
  }

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
