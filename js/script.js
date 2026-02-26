const interviewList = [];
const rejectedList = [];

// for count
const allCount = document.getElementById("all-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

// section
const allCardSection = document.getElementById("all-cards");
const filterSection = document.getElementById("filter-section");

function calculateCount() {
  allCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

// for toggle btn
const allBtn = document.getElementById("btn-all");
const interviewBtn = document.getElementById("btn-interview");
const rejectedBtn = document.getElementById("btn-rejected");

// toggle function
function toggleStyle(id) {
  const toggleBtns = document.querySelectorAll(".btn");

  for (const btn of toggleBtns) {
    btn.classList.remove("bg-sky-500", "text-white");
    btn.classList.add("bg-white", "text-neutral-500");
  }

  const activeBtn = document.getElementById(id);
  activeBtn.classList.remove("bg-white", "text-neutral-500");
  activeBtn.classList.add("bg-sky-500", "text-white");

  if(id === 'btn-all') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }else if(id === 'btn-interview') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
  }

}

// for push interview list
const mainContainer = document.querySelector("main");
mainContainer.addEventListener("click", function (event) {

  const parentNode = event.target.parentNode.parentNode.parentNode;
  if (event.target.classList.contains("btn-interview")) {
    parentNode.classList.add("border-l-3", "border-green-400");

    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobName = parentNode.querySelector(".job-name").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;

    parentNode.querySelector(".status").innerText = 'INTERVIEW';

    const cardInfo = {
      companyName,
      jobName,
      salary,
      status: 'INTERVIEW',
      notes,
    };

    const interviewExist = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!interviewExist) {
      interviewList.push(cardInfo);
    }

    calculateCount();
    renderInterviewList();
  }

});

// for render interview list
function renderInterviewList() {
  filterSection.innerHTML = "";

  for (const item of interviewList) {
    const div = document.createElement("div");
    div.className = "card bg-white rounded-md";
    div.innerHTML = `
        <div class="flex justify-between p-5">
                    <div class="space-y-2.5">
                        <h3 class="company-name text-lg text-neutral-600 font-bold">${item.companyName}</h3>
                        <p class="job-name text-neutral-500">${item.jobName}</p>
                        <p class="salary text-neutral-500">${item.salary}</p>
                        <span class="status text-neutral-600 bg-neutral-300 px-3 py-2 rounded-sm mb-2 inline-block">${item.status}</span>
                        <p class="notes text-neutral-600">${item.notes}</p>
                        <div class="flex gap-4">
                            <button
                                class="btn-interview border border-green-500 px-2 py-1 rounded-md text-green-500 text-sm">INTERVIEW</button>
                            <button
                                class="btn-rejected border border-red-500 px-2 py-1 rounded-md text-red-500 text-sm">REJECTED</button>
                        </div>
                    </div>
                    <div class="w-9 h-9 border border-neutral-400 p-2 rounded-full flex justify-center items-center">
                        <i class="btn-delete fa-solid fa-trash-can text-neutral-600 w-full text-center"></i>
                    </div>
                </div>
        `;
        filterSection.appendChild(div);
  }

}

