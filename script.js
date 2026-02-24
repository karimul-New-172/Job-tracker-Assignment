let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

// Step 1: Toggle Button Style + Filter View
function toggleStyle(id) {
  allFilterBtn.classList.add('bg-gray-300', 'text-black');
  interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
  rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

  allFilterBtn.classList.remove('bg-black', 'text-white');
  interviewFilterBtn.classList.remove('bg-black', 'text-white');
  rejectedFilterBtn.classList.remove('bg-black', 'text-white');

  const selected = document.getElementById(id);
  currentStatus = id;

  selected.classList.remove('bg-gray-300', 'text-black');
  selected.classList.add('bg-black', 'text-white');

  if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } 
  else if (id === 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  } 
  else {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }
}

// Step 2: Event Delegation
mainContainer.addEventListener('click', function (event) {

  if (event.target.classList.contains('interview-btn')) {
    const parentNode = event.target.parentNode.parentNode;

    const company = parentNode.querySelector('.company').innerText;
    const role = parentNode.querySelector('.role').innerText;
    const location = parentNode.querySelector('.location').innerText;
    const status = 'Interview';

    parentNode.querySelector('.status').innerText = status;

    const cardInfo = { company, role, location, status };

    const exists = interviewList.find(item => item.company === company);
    if (!exists) interviewList.push(cardInfo);

    rejectedList = rejectedList.filter(item => item.company !== company);

    if (currentStatus === 'rejected-filter-btn') {
      renderRejected();
    }

    calculateCount();
  }

  else if (event.target.classList.contains('rejected-btn')) {
    const parentNode = event.target.parentNode.parentNode;

    const company = parentNode.querySelector('.company').innerText;
    const role = parentNode.querySelector('.role').innerText;
    const location = parentNode.querySelector('.location').innerText;
    const status = 'Rejected';

    parentNode.querySelector('.status').innerText = status;

    const cardInfo = { company, role, location, status };

    const exists = rejectedList.find(item => item.company === company);
    if (!exists) rejectedList.push(cardInfo);

    interviewList = interviewList.filter(item => item.company !== company);

    if (currentStatus === 'interview-filter-btn') {
      renderInterview();
    }

    calculateCount();
  }
});

// Step 3: Render Interview Cards
function renderInterview() {
  filterSection.innerHTML = '';

  for (let job of interviewList) {
    let div = document.createElement('div');
    div.className = 'card border p-6 rounded-lg mb-4';

    div.innerHTML = `
      <p class="company text-xl font-semibold">${job.company}</p>
      <p class="role text-gray-600">${job.role}</p>
      <p class="location text-sm text-gray-400">${job.location}</p>

      <p class="status text-green-600 mt-2">${job.status}</p>

      <div class="mt-3 space-x-2">
        <button class="interview-btn border px-3 py-1">Interview</button>
        <button class="rejected-btn border px-3 py-1">Rejected</button>
      </div>
    `;

    filterSection.appendChild(div);
  }
}

// Step 4: Render Rejected Cards
function renderRejected() {
  filterSection.innerHTML = '';

  for (let job of rejectedList) {
    let div = document.createElement('div');
    div.className = 'card border p-6 rounded-lg mb-4';

    div.innerHTML = `
      <p class="company text-xl font-semibold">${job.company}</p>
      <p class="role text-gray-600">${job.role}</p>
      <p class="location text-sm text-gray-400">${job.location}</p>

      <p class="status text-red-600 mt-2">${job.status}</p>

      <div class="mt-3 space-x-2">
        <button class="interview-btn border px-3 py-1">Interview</button>
        <button class="rejected-btn border px-3 py-1">Rejected</button>
      </div>
    `;

    filterSection.appendChild(div);
  }
}