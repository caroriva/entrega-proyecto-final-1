function generateCaptcha() {
  return Math.floor(Math.random() * 9000) + 1000;
}

const captchaDisplay = document.getElementById("captcha");
const captchaInput = document.getElementById("captchaInput");
const messageDisplay = document.getElementById("message");
let captchaValue = generateCaptcha();

captchaDisplay.textContent = captchaValue;

document.getElementById("captchaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (parseInt(captchaInput.value) === captchaValue) {
    messageDisplay.textContent = "Captcha correcto.";
    messageDisplay.style.color = "green";
  } else {
    messageDisplay.textContent = "Captcha incorrecto. Intenta de nuevo.";
    messageDisplay.style.color = "red";
  }

  captchaValue = generateCaptcha();
  captchaDisplay.textContent = captchaValue;
  captchaInput.value = "";
});
