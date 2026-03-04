const STORAGE_KEY = 'entree-sortie-declaration';

const form = document.getElementById('declaration-form');
const noDepartureDate = document.getElementById('noDepartureDate');
const departureDateInput = document.getElementById('departureDate');
const feedback = document.getElementById('form-feedback');
const savedBody = document.getElementById('saved-body');
const clearStorageButton = document.getElementById('clear-storage');

function applyNoDepartureState() {
  const disabled = noDepartureDate.checked;
  if (disabled) {
    departureDateInput.value = '';
  }
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

function renderSavedDeclarations() {
  const declarations = loadDeclarations();
  savedBody.innerHTML = '';

  if (declarations.length === 0) {
    savedBody.innerHTML = '<tr><td colspan="5">Aucune demande enregistrée.</td></tr>';
    return;
  }

  declarations.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.firstName} ${item.lastName}</td>
      <td>${item.department || '-'}</td>
      <td>${formatDate(item.arrivalDate)}</td>
      <td>${item.noDepartureDate ? 'Pas de date de fin' : formatDate(item.departureDate)}</td>
      <td>${new Date(item.createdAt).toLocaleString('fr-FR')}</td>
    `;
    savedBody.appendChild(row);
  });
}

noDepartureDate.addEventListener('change', applyNoDepartureState);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  applyNoDepartureState();
  const data = new FormData(form);

  const payload = {
    id: crypto.randomUUID(),
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
    step2: {
      sirhusValidated: data.get('sirhusValidated') === 'on',
      resedaMailSent: data.get('resedaMailSent') === 'on',
      iamTagged: data.get('iamTagged') === 'on',
      preIamMatrixCompleted: data.get('preIamMatrixCompleted') === 'on',
    },
  };

  if (!payload.noDepartureDate && !payload.departureDate) {
    feedback.textContent = "Veuillez renseigner une date de départ ou cocher 'Pas de date de fin'.";
    feedback.style.color = '#991b1b';
    return;
  }

  const existing = loadDeclarations();
  existing.unshift(payload);
  saveDeclarations(existing);

  feedback.textContent = 'Déclaration enregistrée.';
  feedback.style.color = '#14532d';
  form.reset();
  applyNoDepartureState();
  renderSavedDeclarations();
});

clearStorageButton.addEventListener('click', () => {
  saveDeclarations([]);
  renderSavedDeclarations();
  feedback.textContent = 'Liste vidée.';
  feedback.style.color = '#14532d';
});

applyNoDepartureState();
renderSavedDeclarations();
