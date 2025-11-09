// index.js
// Author: Izabela Ledwoń
// Date: 2025-11-09

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addDataForm");
  const table = document.querySelector("table tbody");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("telephone");
  const bdayInput = document.getElementById("bday");
  const agreeInput = document.getElementById("agreeTerms");

function setError(input, message) {
    const span = input.parentElement.querySelector("span");
    if (span) span.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".nameInput, .bdayInput, .agreeInput, .emailInput, .telInput")
      .forEach(span => span.textContent = "");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name   = nameInput.value.trim();
    const email  = emailInput.value.trim();
    const tel    = telInput.value.trim();
    const bday   = bdayInput.value;
    const agreed = agreeInput.checked;

    let valid = true;

    if (!name)  { setError(nameInput,  "Required"); valid = false; }
    if (!email) { setError(emailInput, "Required"); valid = false; }
    if (!tel)   { setError(telInput,   "Required"); valid = false; }
    if (!bday)  { setError(bdayInput,  "Required"); valid = false; }
    if (!agreed){ setError(agreeInput, "Required"); valid = false; }

    if (!valid) return;

    if (!name.includes(" ") || name.length < 5) {
      setError(nameInput, "Enter first + last name");
      return;
    }

    if (!email.includes("@")) {
      setError(emailInput, "Invalid email");
      return;
    }

    if (!tel.startsWith("+358")) {
      setError(telInput, "Must start with +358");
      return;
    }

    const today = new Date();
    const birthDate = new Date(bday);

    if (birthDate > today) {
      setError(bdayInput, "Cannot be in future");
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age <= 13) {
      setError(bdayInput, "Must be 14+");
      return;
    }

    const row = document.createElement("tr");

    // Add user info cells
    const timestampCell = document.createElement("td");
    timestampCell.textContent = today.toLocaleString();
    row.appendChild(timestampCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = email;
    row.appendChild(emailCell);

    const telCell = document.createElement("td");
    telCell.textContent = tel;
    row.appendChild(telCell);

    const bdayCell = document.createElement("td");
    bdayCell.textContent = bday;
    row.appendChild(bdayCell);

    const agreeCell = document.createElement("td");
    agreeCell.textContent = agreed ? "✅" : "❌";
    row.appendChild(agreeCell);

    table.appendChild(row);

    form.reset();
    nameInput.focus();
  });
});
