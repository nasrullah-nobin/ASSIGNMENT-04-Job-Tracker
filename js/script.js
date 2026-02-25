let interviewList = [];
let rejectList = [];
let currentFilter = "all";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("reject-count");
let availableJobsCount = document.getElementById("Available-jobs");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectFilterBtn = document.getElementById("reject-filter-btn");

const mainContainer = document.querySelector("main");
const allCardContainer = document.getElementById("all-card-container");
const noJobsSection = document.getElementById("no-jobs-section");
const filterSection = document.getElementById("filter-section");

function updateCounts() {
  const total = (totalCount.innerText = allCardContainer.children.length);
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectList.length;
  if (currentFilter === "all-filter-btn")
    availableJobsCount.innerText = allCardContainer.children.length;
  else if (currentFilter === "interview-filter-btn")
    availableJobsCount.innerText = interviewList.length;
  else if (currentFilter === "reject-filter-btn")
    availableJobsCount.innerText = rejectList.length;
  else {
    availableJobsCount.innerText = total;
  }
}
updateCounts();

function filteredBtn(currentId) {
  currentFilter = currentId;

  allFilterBtn.classList.remove("btn-info");
  interviewFilterBtn.classList.remove("btn-info");
  rejectFilterBtn.classList.remove("btn-info");
  document.getElementById(currentId).classList.add("btn-info");

  filterSection.classList.add("hidden");
  noJobsSection.classList.add("hidden");
  allCardContainer.classList.add("hidden");

  if (currentId === "all-filter-btn")
  {
    allCardContainer.classList.remove("hidden");
    updateCounts()
    if(allCardContainer.children.length  === 0){
      noJobsSection.classList.remove('hidden')
      updateCounts()
    }
  }
  else if (currentId === "interview-filter-btn") {
    filterSection.classList.remove("hidden");
    renderInterview();
    updateCounts()
  } else if (currentId === "reject-filter-btn") {
    filterSection.classList.remove("hidden");
    renderReject();
    updateCounts()
  }
}

let selectedCard = null;
const alertDiv = document.getElementById("alert-div");
const isYes = document.getElementById("Yes");
const isNO = document.getElementById("NO");

allCardContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    selectedCard = event.target.closest(".parent-card");
    alertDiv.classList.remove("hidden");
  }
});

isYes.addEventListener("click", function () {
  if (selectedCard) {
    selectedCard.remove();
    selectedCard = null;
    if(allCardContainer.children.length=== 0) noJobsSection.classList.remove('hidden')
  }
  alertDiv.classList.add("hidden");
  updateCounts();
});

isNO.addEventListener("click", function () {
  alertDiv.classList.add("hidden");
});

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobPosition = parentNode.querySelector(".job-position").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;
    parentNode.querySelector(".job-status").innerText = "INTERVIEW";
   

    const cardInfo = {
      companyName,
      jobPosition,
      jobLocation,
      jobStatus,
      jobDescription,
    };
    const exists = interviewList.find(
      (item) => item.companyName === companyName,
    );
    if (!exists) {
      interviewList.push(cardInfo);
    }

    rejectList = rejectList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentFilter === "reject-filter-btn") {
      renderReject();
    }

    updateCounts();
  } else if (event.target.classList.contains("reject-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobPosition = parentNode.querySelector(".job-position").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;

    parentNode.querySelector(".job-status").innerText = "REJECTED";
    // parentNode.querySelector(".job-status").className = "btn  btn-outline btn-error";
    const cardInfo = {
      companyName,
      jobPosition,
      jobLocation,
      jobStatus,
      jobDescription,
    };
    const exists = rejectList.find(
      (item) => item.companyName === cardInfo.companyName,
    );
    if (!exists) rejectList.push(cardInfo);

    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentFilter === "interview-filter-btn") {
      renderInterview();
    }

    updateCounts();
  }
});

function renderInterview() {
  if (interviewList.length === 0) {
    noJobsSection.classList.remove("hidden");
  } else {
    availableJobsCount.innerText = interviewList.length;
  }
  filterSection.innerHTML = "";
  interviewList.forEach((interview) => {
    const newDiv = document.createElement("div");
    newDiv.className = "parent bg-white p-6 rounded-lg flex justify-between";
    newDiv.innerHTML = `
        <div class="space-y-3 text-center md:text-left">
            <h2 class="company-name text-lg font-semibold">${interview.companyName}</h2>
            <p  class="job-position text-base text-gray-500">${interview.jobPosition}</p>
            <p class="job-location text-[14px] text-gray-500">
             ${interview.jobLocation}
            </p>
            <button class="job-status btn btn-outline btn-success">INTERVIEW</button>
            <p class="job-description text-gray-400">
              ${interview.jobDescription}
            </p>
            <div class="flex gap-5 justify-center md:justify-start">
              <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
              <button class="reject-btn btn btn-outline btn-error">REJECTED</button>
            </div>
          </div>
          <div
            class="rounded-full btn btn-error btn-soft"
          >
            <i class="delete-btn fa-regular fa-trash-can"></i>
          </div>`;
    filterSection.appendChild(newDiv);
  });
}

function renderReject() {
  if (rejectList.length === 0) {
    noJobsSection.classList.remove("hidden");
  } else {
    availableJobsCount.innerText = rejectList.length;
  }
  filterSection.innerHTML = "";
  rejectList.forEach((reject) => {
    const newDiv = document.createElement("div");
    newDiv.className = "parent bg-white p-6 rounded-lg flex justify-between";
    newDiv.innerHTML = `
        <div class="space-y-3 text-center md:text-left">
            <h2 class="company-name text-lg font-semibold">${reject.companyName}</h2>
            <p  class="job-position text-base text-gray-500">${reject.jobPosition}</p>
            <p class="job-location text-[14px] text-gray-500">
             ${reject.jobLocation}
            </p>
            <button class="job-status btn btn-outline btn-error">REJECTED</button>
            <p class="job-description text-gray-400">
              ${reject.jobDescription}
            </p>
            <div class="flex gap-5 justify-center md:justify-start">
              <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
              <button class="reject-btn btn btn-outline btn-error">REJECTED</button>
            </div>
          </div>
          <div
            class="rounded-full btn btn-error btn-soft"
          >
            <i class="delete-btn fa-regular fa-trash-can"></i>
          </div>`;
    filterSection.appendChild(newDiv);
  });
}



