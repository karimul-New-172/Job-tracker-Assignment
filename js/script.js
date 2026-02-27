let interviewList = [];
let rejectedList = [];

const allCount = document.getElementById("all-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

const allCardSection = document.getElementById("all-cards");
const filterSection = document.getElementById("filter-section");

const allBtn = document.getElementById("btn-all");
const interviewBtn = document.getElementById("btn-interview");
const rejectedBtn = document.getElementById("btn-rejected");

let currentFilter = "all";

// Calculate count function
function calculateCount() {
  allCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  const currentStatus = document.getElementById("current-status");
  if (currentFilter === "all") {
    currentStatus.innerText = allCardSection.children.length;
  } else if (currentFilter === "interview") {
    currentStatus.innerText = interviewList.length;
  } else if (currentFilter === "rejected") {
    currentStatus.innerText = rejectedList.length;
  }
}
calculateCount();

// Toggle style and filter
function toggleStyle(id) {
  const toggleBtns = document.querySelectorAll(".btn");
  for(let btn of toggleBtns) {
    btn.classList.remove("bg-sky-500", "text-white");
    btn.classList.add("bg-white", "text-neutral-500");
  }

  const activeBtn = document.getElementById(id);
  activeBtn.classList.remove("bg-white", "text-neutral-500");
  activeBtn.classList.add("bg-sky-500", "text-white");

  if (id === "btn-all") {
    currentFilter = "all";
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    // update current status
    document.getElementById("current-status").innerText = allCardSection.children.length;
  } else if (id === "btn-interview") {
    currentFilter = "interview";
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterviewList();
    document.getElementById("current-status").innerText = interviewList.length;
  } else if (id === "btn-rejected") {
    currentFilter = "rejected";
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejectedList();
    document.getElementById("current-status").innerText = rejectedList.length;
  }
}

// Main click handler
document.querySelector("main").addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const companyName = card.querySelector(".company-name").innerText;
  const jobName = card.querySelector(".job-name").innerText;
  const salary = card.querySelector(".salary").innerText;
  const notes = card.querySelector(".notes").innerText;
  const statusBadge = card.querySelector(".status");

  // INTERVIEW
  if (event.target.classList.contains("btn-interview")) {
    statusBadge.innerText = "INTERVIEW";
    statusBadge.classList.add("bg-green-400", "text-white");
    statusBadge.classList.remove("bg-neutral-300", "text-neutral-600");

    card.style.borderLeft = "4px solid #22c55e";

    const cardInfo = { companyName, jobName, salary, status: "INTERVIEW", notes };

    if (!interviewList.find((item) => item.companyName === companyName)) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter((item) => item.companyName !== companyName);

    calculateCount();
    if (currentFilter === "interview") renderInterviewList();
    if (currentFilter === "rejected") renderRejectedList();
  }

  // REJECTED
  if (event.target.classList.contains("btn-rejected")) {
    statusBadge.innerText = "REJECTED";
    statusBadge.classList.add("bg-red-400", "text-white");
    statusBadge.classList.remove("bg-neutral-300", "text-neutral-600");

    card.style.borderLeft = "4px solid #f87171";

    const cardInfo = { companyName, jobName, salary, status: "REJECTED", notes };

    if (!rejectedList.find((item) => item.companyName === companyName)) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter((item) => item.companyName !== companyName);

    calculateCount();
    if (currentFilter === "interview") renderInterviewList();
    if (currentFilter === "rejected") renderRejectedList();
  }

  // DELETE
  if (event.target.classList.contains("btn-delete")) {
    card.remove();

    interviewList = interviewList.filter((item) => item.companyName !== companyName);
    rejectedList = rejectedList.filter((item) => item.companyName !== companyName);

    calculateCount();
    if (currentFilter === "interview") renderInterviewList();
    if (currentFilter === "rejected") renderRejectedList();
  }
});

// Render interview list
function renderInterviewList() {
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    filterSection.innerHTML = emptyMessage("No Interview jobs");
    return;
  }

  interviewList.forEach((item) => {
    filterSection.innerHTML += createCard(item);
  });
}

// Render rejected list
function renderRejectedList() {
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filterSection.innerHTML = emptyMessage("No Rejected jobs");
    return;
  }

  rejectedList.forEach((item) => {
    filterSection.innerHTML += createCard(item);
  });
}

// Create card HTML
function createCard(item) {
  let borderColor = item.status === "INTERVIEW" ? "#22c55e" : item.status === "REJECTED" ? "#f87171" : "#d1d5db";
  let bgColor = item.status === "INTERVIEW" ? "bg-green-400 text-white" : item.status === "REJECTED" ? "bg-red-400 text-white" : "bg-neutral-300 text-neutral-600";

  return `
    <div class="card bg-white rounded-md" style="border-left:4px solid ${borderColor}">
      <div class="flex justify-between p-5">
        <div class="space-y-2.5">
          <h3 class="company-name text-lg text-neutral-600 font-bold">${item.companyName}</h3>
          <p class="job-name text-neutral-500">${item.jobName}</p>
          <p class="salary text-neutral-500">${item.salary}</p>
          <span class="status px-3 py-2 rounded-sm mb-2 inline-block ${bgColor}">${item.status}</span>
          <p class="notes text-neutral-600">${item.notes}</p>
          <div class="flex gap-4">
            <button class="btn-interview border border-green-500 px-2 py-1 rounded-md text-green-500 text-sm">INTERVIEW</button>
            <button class="btn-rejected border border-red-500 px-2 py-1 rounded-md text-red-500 text-sm">REJECTED</button>
          </div>
        </div>
        <div class="w-9 h-9 border border-neutral-400 p-2 rounded-full flex justify-center items-center">
          <i class="btn-delete fa-solid fa-trash-can text-neutral-600 w-full text-center"></i>
        </div>
      </div>
    </div>
  `;
}

// Empty message
function emptyMessage(text) {
  return `
    <div class="bg-white text-center mt-3 py-10 rounded-lg">
        <img class="mx-auto" src="./asset/jobs.png" alt="">
        <h3 class="text-lg text-neutral-600 font-semibold">No jobs available</h3>
        <p class="text-neutral-500">Check back soon for new job opportunities</p>
    </div>
  `;
}