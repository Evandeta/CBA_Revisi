const inputFile = document.getElementById('proposal');
const fileNameSpan = document.getElementById('file-name');
const fileSizeSpan = document.getElementById('file-size');

inputFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    fileNameSpan.textContent = file.name;
    fileSizeSpan.textContent = `(${file.size} bytes)`;
  } else {
    fileNameSpan.textContent = 'No file chosen';
    fileSizeSpan.textContent = '';
  }
// Seleksi form dan tombol submit
const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');

// Fungsi untuk memeriksa apakah semua field telah diisi
function validateForm() {
  const fields = document.querySelectorAll('input, textarea, select');
  let isValid = true;

  fields.forEach((field) => {
    if (field.required && field.value.trim() === '') {
      isValid = false;
    }
  });

  return isValid;
}

// Fungsi untuk mengaktifkan atau menonaktifkan tombol submit
function toggleSubmitButton() {
  if (validateForm()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Jalankan fungsi toggleSubmitButton saat halaman dimuat
toggleSubmitButton();

// Jalankan fungsi toggleSubmitButton saat ada perubahan pada field
document.addEventListener('input', toggleSubmitButton);

});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  // Send the form data to the dashboard
  const formData = new FormData(form);
  // Use XMLHttpRequest, Fetch API, or a library like Axios to send the data to the dashboard
  // For example, using the Fetch API:
  fetch('/dashboard', {
    method: 'POST',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
});