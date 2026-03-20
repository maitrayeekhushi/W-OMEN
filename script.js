const demoCabDrivers = [
  { name: "Priya Singh", city: "Delhi", phone: "+91 98765 11110", cabId: "DL-CAB-1045" },
  { name: "Ayesha Khan", city: "Mumbai", phone: "+91 98765 11120", cabId: "MH-CAB-2310" },
  { name: "Meera Nair", city: "Bengaluru", phone: "+91 98765 11130", cabId: "KA-CAB-4521" },
  { name: "Ananya Das", city: "Kolkata", phone: "+91 98765 11140", cabId: "WB-CAB-7788" },
  { name: "Kavya Sharma", city: "Jaipur", phone: "+91 98765 11150", cabId: "RJ-CAB-9004" }
];

const emergencyDirectory = [
  { service: "National Emergency Response", number: "112", notes: "24x7 immediate emergency help" },
  { service: "Women Helpline", number: "1091", notes: "Women-specific emergency support" },
  { service: "Police Control Room", number: "100", notes: "Urgent law enforcement response" },
  { service: "Ambulance", number: "108", notes: "Medical emergency services" },
  { service: "Cyber Crime Helpline", number: "1930", notes: "Report online/cyber fraud quickly" }
];

function safeParse(data, fallback) {
  try {
    return JSON.parse(data) || fallback;
  } catch (e) {
    return fallback;
  }
}

function getLoginData() {
  return safeParse(localStorage.getItem("wsm_login"), null);
}

function saveLoginData(payload) {
  localStorage.setItem("wsm_login", JSON.stringify(payload));
}

function setLoggedInUserBanner() {
  const box = document.getElementById("loggedInUserInfo");
  if (!box) return;
  const data = getLoginData();
  if (!data) {
    box.innerHTML = `<div class="status warning">No user profile found. Please complete login on Home page.</div>`;
    return;
  }
  box.innerHTML = `
    <span class="pill">Logged In User</span>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Current Location:</strong> ${data.location}</p>
  `;
}

function renderCabDrivers() {
  const tableBody = document.getElementById("cabDriverRows");
  if (!tableBody) return;
  tableBody.innerHTML = demoCabDrivers
    .map(
      (driver) => `
      <tr>
        <td>${driver.name}</td>
        <td>${driver.city}</td>
        <td>${driver.cabId}</td>
        <td>${driver.phone}</td>
        <td><a class="btn-link" href="tel:${driver.phone.replace(/\s+/g, "")}">Call</a></td>
      </tr>
    `
    )
    .join("");
}

function renderEmergencyNumbers() {
  const box = document.getElementById("emergencyList");
  if (!box) return;
  box.innerHTML = emergencyDirectory
    .map(
      (item) => `
    <div class="card">
      <h3>${item.service}</h3>
      <p class="emergency-number">${item.number}</p>
      <p class="small">${item.notes}</p>
      <a class="btn-link" href="tel:${item.number}">Call ${item.number}</a>
    </div>
  `
    )
    .join("");
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  const statusBox = document.getElementById("loginStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("userName").value.trim();
    const contact = document.getElementById("userContact").value.trim();
    const location = document.getElementById("userLocation").value.trim();
    if (!name || !contact || !location) {
      statusBox.className = "status error";
      statusBox.textContent = "Please fill all fields to continue.";
      return;
    }
    saveLoginData({ name, contact, location, createdAt: new Date().toISOString() });
    statusBox.className = "status success";
    statusBox.textContent = "Profile saved successfully. You can access all safety modules now.";
    form.reset();
  });
}

function setupSpamFineForm() {
  const form = document.getElementById("spamFineForm");
  if (!form) return;
  const output = document.getElementById("spamOutput");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const caller = document.getElementById("callerNumber").value.trim();
    const reason = document.getElementById("spamReason").value;
    const fine = document.getElementById("fineAmount").value.trim() || "500";
    if (!caller || !reason) {
      output.className = "status error";
      output.textContent = "Enter caller details and reason.";
      return;
    }
    const paymentRef = "PMT-" + Math.floor(100000 + Math.random() * 900000);
    output.className = "status success";
    output.innerHTML = `
      Spam call approved and fine issued.
      <br/>Criminal Number: <strong>${caller}</strong>
      <br/>Fine Amount: <strong>INR ${fine}</strong>
      <br/>Reason: <strong>${reason}</strong>
      <br/>You received payment confirmation: <strong>${paymentRef}</strong>.
    `;
  });
}

function setupComplaintForm() {
  const form = document.getElementById("complaintForm");
  if (!form) return;
  const output = document.getElementById("complaintOutput");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const station = document.getElementById("policeStation").value.trim();
    const issueType = document.getElementById("issueType").value;
    const details = document.getElementById("complaintDetails").value.trim();
    const incidentLocation = document.getElementById("incidentLocation").value.trim();
    if (!station || !issueType || !details || !incidentLocation) {
      output.className = "status error";
      output.textContent = "Please complete all complaint fields.";
      return;
    }
    const complaintId = "CMP-" + Math.floor(100000 + Math.random() * 900000);
    output.className = "status success";
    output.innerHTML = `
      Complaint submitted successfully to <strong>${station}</strong>.
      <br/>Issue Type: <strong>${issueType}</strong>
      <br/>Reference ID: <strong>${complaintId}</strong>
      <br/>Location: <strong>${incidentLocation}</strong>
      <br/>Your complaint is forwarded to police and municipal authorities for action.
    `;
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLoginForm();
  setupSpamFineForm();
  setupComplaintForm();
  renderCabDrivers();
  renderEmergencyNumbers();
  setLoggedInUserBanner();
});
