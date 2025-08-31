const form = document.getElementById('formularioTicket');
const ticket = document.getElementById('ticket');

const avatarInput = document.getElementById('avatar');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github');

const avatarError = document.getElementById('avatarError');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const githubError = document.getElementById('githubError');

const ticketAvatar = document.getElementById('ticketAvatar');
const ticketName = document.getElementById('ticketName');
const ticketGithub = document.getElementById('ticketGithub');
const uploadPreview = document.getElementById('uploadPreview');

avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file && ['image/jpeg','image/png'].includes(file.type) && file.size <= 500*1024) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadPreview.src = e.target.result;
      uploadPreview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  } else {
    uploadPreview.src = '';
    uploadPreview.style.display = 'none';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  // Nome completo
  if (!nameInput.value.trim()) {
    nameError.style.display = 'block';
    valid = false;
  } else {
    nameError.style.display = 'none';
  }

  // Endereço de e-mail
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.style.display = 'block';
    valid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Usuário do GitHub
  if (!githubInput.value.trim()) {
    githubError.style.display = 'block';
    valid = false;
  } else {
    githubError.style.display = 'none';
  }

  // Avatar
  const file = avatarInput.files[0];
  if (!file || !['image/jpeg','image/png'].includes(file.type) || file.size > 500*1024) {
    avatarError.style.display = 'block';
    valid = false;
  } else {
    avatarError.style.display = 'none';
  }

  if (valid) {
    // Gerar ingresso
    const reader = new FileReader();
    reader.onload = function(e) {
      ticketAvatar.src = e.target.result;
    }
    reader.readAsDataURL(file);

    document.getElementById('headerText').textContent = `Congrats, ${nameInput.value}! Your ticket is ready.`;
    document.getElementById('parText').textContent = `We have emailed your ticket to ${emailInput.value} and will send updates in the run up to the event.`;
    ticketName.textContent = `${nameInput.value}`;
    ticketGithub.textContent = `${githubInput.value}`;

    form.style.display = 'none';
    ticket.style.display = 'block';
  }
});
