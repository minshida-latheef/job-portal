// Array containing structural objects defining the list dataset
const targetJobsList = [
    {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "TechVibe Solutions",
        location: "Remote (US/Canada)",
        type: "Full-Time",
        salary: "$120k - $140k"
    },
    {
        id: 2,
        title: "Data Analyst",
        company: "Metrics Analytics Corp",
        location: "New York, NY",
        type: "Full-Time",
        salary: "$85k - $105k"
    },
    {
        id: 3,
        title: "UX/UI Product Designer",
        company: "CreativeFlow Studio",
        location: "Remote (Global)",
        type: "Contract",
        salary: "$70 - $90 / hr"
    },
    {
        id: 4,
        title: "DevOps Infrastructure Engineer",
        company: "CloudScale Systems",
        location: "Austin, TX",
        type: "Full-Time",
        salary: "$130k - $160k"
    },
    {
        id: 5,
        title: "Junior Full Stack Developer",
        company: "Alpha Codebase",
        location: "San Francisco, CA",
        type: "Internship",
        salary: "$45k - $60k"
    }
];

// Reference assignments to DOM engine nodes
const jobsContainer = document.getElementById('jobs-container');
const searchButton = document.getElementById('search-btn');
const inputTitle = document.getElementById('search-title');
const inputLocation = document.getElementById('search-location');

const applyModal = document.getElementById('apply-modal');
const closeModalBtn = document.getElementById('close-modal');
const applicationForm = document.getElementById('application-form');
const modalJobTitle = document.getElementById('modal-job-title');
const modalJobCompany = document.getElementById('modal-job-company');

// Function rendering records array matching current query context properties
function displayJobs(jobsArray) {
    jobsContainer.innerHTML = '';
    
    if (jobsArray.length === 0) {
        jobsContainer.innerHTML = `
            <div style="text-align:center; padding: 40px; color: #64748b;">
                <h3>No jobs found matching your criteria.</h3>
                <p>Try modifying your keyword search queries or constraints.</p>
            </div>
        `;
        return;
    }

    jobsArray.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        jobCard.innerHTML = `
            <div class="job-info-main">
                <div class="job-title">${job.title}</div>
                <div class="job-company">${job.company}</div>
                <div class="job-meta-tags">
                    <span class="meta-tag">${job.location}</span>
                    <span class="meta-tag">${job.type}</span>
                    <span class="meta-tag salary">${job.salary}</span>
                </div>
            </div>
            <button class="btn btn-primary apply-trigger-btn" data-id="${job.id}">Apply Now</button>
        `;
        
        jobsContainer.appendChild(jobCard);
    });

    // Attach listeners to newly created buttons
    attachModalTriggers();
}

// Function evaluating state inputs against baseline search array values
function filterJobs() {
    const titleFilter = inputTitle.value.toLowerCase().trim();
    const locationFilter = inputLocation.value.toLowerCase().trim();

    const filtered = targetJobsList.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(titleFilter) || 
                             job.company.toLowerCase().includes(titleFilter);
        const matchesLocation = job.location.toLowerCase().includes(locationFilter);
        
        return matchesTitle && matchesLocation;
    });

    displayJobs(filtered);
}

// Action binds enabling contextual interaction over form popup views
function attachModalTriggers() {
    document.querySelectorAll('.apply-trigger-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const jobId = parseInt(e.target.getAttribute('data-id'));
            const selectedJob = targetJobsList.find(j => j.id === jobId);
            
            if (selectedJob) {
                modalJobTitle.innerText = `Apply for ${selectedJob.title}`;
                modalJobCompany.innerText = selectedJob.company;
                applyModal.style.display = 'flex';
            }
        });
    });
}

// Closing handling functions
closeModalBtn.addEventListener('click', () => {
    applyModal.style.display = 'none';
    applicationForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === applyModal) {
        applyModal.style.display = 'none';
        applicationForm.reset();
    }
});

// Intercept application submission and render structural alerts
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const applicantName = document.getElementById('applicant-name').value;
    
    alert(`Success! Thank you ${applicantName}, your application for "${modalJobTitle.innerText}" has been simulated successfully.`);
    applyModal.style.display = 'none';
    applicationForm.reset();
});

// Event Binding Core Triggers Initialization Hook
searchButton.addEventListener('click', filterJobs);
inputTitle.addEventListener('keyup', (e) => { if(e.key === 'Enter') filterJobs(); });
inputLocation.addEventListener('keyup', (e) => { if(e.key === 'Enter') filterJobs(); });

// First execution setup baseline view on screen load rendering logic arrays
document.addEventListener('DOMContentLoaded', () => {
    displayJobs(targetJobsList);
});
