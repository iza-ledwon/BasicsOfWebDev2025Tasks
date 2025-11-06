// index.js
// Author: Izabela Ledwoń
// Date: 2025-11-05

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addDataForm");
  const table = document.getElementById("dataTable").querySelector("tbody");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("telephone");
  const bdayInput = document.getElementById("bday");
  const agreeInput = document.getElementById("agreeTerms");

function setError(input, message) {
  const span = input.parentElement.querySelector('span');
  if(span) span.textContent = message;
}

  form.addEventListener("submit", (event) => {
    event.preventDefault();

  document.querySelectorAll('.nameInput, .bdayInput, .agreeInput, .emailInput, .telInput')
    .forEach(span => span.textContent = '');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const tel = telInput.value.trim();
    const bday = bdayInput.value;
    const agreed = agreeInput.checked;

    if (!name || !email || !tel || !bday) {
      alert("Please fill all fields");
      event.preventDefault();
      return;
    }

    if (!(name.includes(" ")) || name.length < 5) {
      setError(nameInput,"Name must be 2 words, at least 2 letters each");
      return;
    }

    const today = new Date();
    const bdayAsDate = new Date(bday);

    if (bday > today) {
      setError(bdayInput,"Birth date cannot be in the future");
      return;
    }

    const age = today.getFullYear() - bdayAsDate.getFullYear();
    const monthDiff = today.getMonth() - bdayAsDate.getMonth();
    const dayDiff = today.getDate() - bdayAsDate.getDate();
    const actualAge = age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);
    if (actualAge <= 13) {
      setError(bdayInput, "You must be over 13!");
      return;
    }

    if (!agreed) {
      setError(agreeInput,"Please agree to the terms.");
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

    // Terms agreement cell
    const agreeCell = document.createElement("td");
    agreeCell.textContent = agreed ? "✅" : "❌";
    row.appendChild(agreeCell);

    table.appendChild(row);

    form.reset();
    nameInput.focus();
  });
});