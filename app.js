const STORAGE_KEY = 'entree-sortie-declaration';

const form = document.getElementById('declaration-form');
const noDepartureDate = document.getElementById('noDepartureDate');
const departureDateInput = document.getElementById('departureDate');
const feedback = document.getElementById('form-feedback');

noDepartureDate.addEventListener('change', () => {
  if (noDepartureDate.checked) {
    departureDateInput.value = '';
    departureDateInput.disabled = true;
  } else {
    departureDateInput.disabled = false;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  feedback.textContent = 'Déclaration enregistrée.';
  feedback.style.color = '#14532d';
  form.reset();
  departureDateInput.disabled = false;
});

function loadDeclarations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
