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

function calculateCount() {
  totalCount.innerText = getTotalCount();
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectList.length;
  availableJobsCount.innerText = getTotalCount();
}
calculateCount();

function getTotalCount() {
  return document.getElementById("all-card-container").children.length;
}

function filteredBtn(currentId) {
  currentFilter = currentId;

  allFilterBtn.classList.remove("btn-info");
  interviewFilterBtn.classList.remove("btn-info");
  rejectFilterBtn.classList.remove("btn-info");
  document.getElementById(currentId).classList.add("btn-info");

  if (currentId === "all-filter-btn") {
    allCardContainer.classList.remove("hidden");
    noJobsSection.classList.add("hidden");
  } else if (currentId === "interview-filter-btn") {
    allCardContainer.classList.add("hidden");
    noJobsSection.classList.remove("hidden");
    renderInterview();
  } else if (currentId === "reject-filter-btn") {
    allCardContainer.classList.add("hidden");
    noJobsSection.classList.remove("hidden");
    renderReject();
  }
}

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
    // jobStatus.className = "btn btn-outline btn-success";
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
      renderReject();;
    }

    calculateCount();
  } else if (event.target.classList.contains("reject-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobPosition = parentNode.querySelector(".job-position").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;
    parentNode.querySelector(".job-status").innerText = "REJECTED";
    // jobStatus.className = "btn  btn-outline btn-error";
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

    calculateCount();
  }
});

function renderInterview() {
  filterSection.innerHTML = "";
  interviewList.forEach((interview) => {
    const newDiv = document.createElement("div");
    newDiv.className = "bg-white p-6 rounded-lg flex justify-between";
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
            class="rounded-full h-fit p-1 border border-gray-300 hidden sm:block"
          >
            <i class="fa-regular fa-trash-can"></i>
          </div>`;
    filterSection.appendChild(newDiv);
  });
}

function renderReject() {
  filterSection.innerHTML = "";
  rejectList.forEach((reject) => {
    const newDiv = document.createElement("div");
    newDiv.className = "bg-white p-6 rounded-lg flex justify-between";
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
            class="rounded-full h-fit p-1 border border-gray-300 hidden sm:block"
          >
            <i class="fa-regular fa-trash-can"></i>
          </div>`;
    filterSection.appendChild(newDiv);
  });
}
