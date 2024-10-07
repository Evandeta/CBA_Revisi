const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending Submitted...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
  // Fungsi untuk memeriksa apakah perangkat mobile atau tidak
function isMobile() {
  return window.innerWidth <= 768;
}

// Fungsi untuk mengaktifkan atau menonaktifkan tombol submit
function toggleSubmitButton() {
  if (isMobile()) {
    // Jika perangkat mobile, nonaktifkan tombol submit jika formulir belum diisi
    if (!validateForm()) {
      document.querySelector('button[type="submit"]').disabled = true;
    } else {
      document.querySelector('button[type="submit"]').disabled = false;
    }
  } else {
    // Jika perangkat desktop, aktifkan tombol submit
    document.querySelector('button[type="submit"]').disabled = false;
  }
}

// Jalankan fungsi toggleSubmitButton saat halaman dimuat
toggleSubmitButton();

// Jalankan fungsi toggleSubmitButton saat ada perubahan pada field
document.addEventListener('input', toggleSubmitButton);
}
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let response = xhr.response;
    let formData = new FormData(form);
    let data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    // ...
  }
}
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let response = xhr.response;
    let formData = new FormData(form);
    let data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    fetch('/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }
}
app.post('/dashboard', (req, res) => {
  let data = req.body;
  // Display the data on the dashboard
  res.render('dashboard', { data: data });
});