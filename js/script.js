const interviewList = [];
const rejectedList = [];
// for count
const allCount = document.getElementById('all-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');

const allCardSection = document.getElementById('all-cards');

function calculateCount() {
    allCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// for toggle btn
const allBtn = document.getElementById('btn-all');
const interviewBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');

function toggleStyle(id){
    const toggleBtns = document.querySelectorAll('.btn');
    for(const btn of toggleBtns){
        btn.classList.remove('bg-sky-500', 'text-white');
        btn.classList.add('bg-white', 'text-neutral-500');
    }
    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove('bg-white', 'text-neutral-500');
    activeBtn.classList.add('bg-sky-500', 'text-white');
}

const mainContainer = document.querySelector('main');
console.log(mainContainer);