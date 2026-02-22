let interviewList = [];
let rejectList= [];
let currentFilter = 'all';



let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount= document.getElementById('reject-count');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectFilterBtn = document.getElementById('reject-filter-btn');

const mainContainer = document.querySelector('main');
const allCardContainer = document.getElementById('all-card-container');
const filterSection = document.getElementById('filter-section');

function calculateCount(){
totalCount.innerText= allCardContainer.childElementCount;
}
calculateCount()



function filteredBtn(currentId){
currentFilter = currentId;


allFilterBtn.classList.remove('btn-info');
interviewFilterBtn.classList.remove('btn-info');
rejectFilterBtn.classList.remove('btn-info');
document.getElementById(currentId).classList.add('btn-info');


}