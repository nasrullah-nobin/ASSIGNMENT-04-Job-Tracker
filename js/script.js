let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount= document.getElementById('reject-count');


const mainContainer = document.querySelector('main');
const allCardContainer = document.getElementById('all-card-container');

function calculateCount(){
totalCount.innerText= allCardContainer.childElementCount;
}
calculateCount()