let interviewList = [];
let rejectList = [];
let currentFilter = "all";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("reject-count");

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
    filterSection.classList.add("hidden");
  } else if (currentId === "interview-filter-btn") {
    allCardContainer.classList.add("hidden");
    noJobsSection.classList.remove("hidden");
    filterSection.classList.remove("hidden");

    renderInterview();
  } else if (currentId === "reject-filter-btn") {
    allCardContainer.classList.add("hidden");
    noJobsSection.classList.remove("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {
  const card = event.target.closest("#all-card-container");
  if (!card) return;
  const companyName = card.querySelector(".company-name").innerText;
  const jobPosition = card.querySelector(".job-position").innerText;
  const jobLocation = card.querySelector(".job-location").innerText;
  const jobStatus = card.querySelector(".job-status");
  const jobDescription = card.querySelector(".job-description").innerText;

  if (event.target.classList.contains("interview-btn")) {
    jobStatus.innerText = "Interview";
    jobStatus.className = "btn btn-outline btn-success";
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
    if (!exists) interviewList.push(cardInfo);
    rejectList.filter((item) => item.companyName !== companyName);
    if (currentFilter === "interview-filter-btn") {
      renderInterview();
    }
  }
  calculateCount();
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
            <button class="job-status btn btn-outline btn-success">Interview</button>
            <p class="job-description text-gray-400">
              ${interview.jobDescription}
            </p>
            <div class="flex gap-5 justify-center md:justify-start">
              <button class="interview-btn btn btn-outline btn-success">interview</button>
              <button class="reject-btn btn btn-outline btn-error">Rejected</button>
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
