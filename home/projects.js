// Function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Function to create project card HTML
function createProjectCard(project, index) {
  const delay = (index % 3) * 0.1;
  const url = `https://rayyan-balami.github.io/study-projects/${project.slug}`;
  return `
    <a href="${url}" class="project-card fade-in grid grid-rows-subgrid gap-6 row-span-3" style="animation-delay: ${0.3 + delay}s">
      <div class="overflow-hidden aspect-[4/5] hover-target border border-gray-200">
        <img 
          src="${project.image || "placeholder.svg"}" 
          alt="${project.title}" 
          loading="lazy"
          class="project-image w-full h-full object-cover object-top"
        >
      </div>
      <div class="space-y-2">
        <div class="flex justify-between">
            <h3 class="text-lg font-medium hover-target">${project.title}</h3>
          <span class="text-sm uppercase tracking-wider text-gray-500">${project.type}</span>
        </div>
        <p class="text-base text-gray-600">${project.description}</p>
      </div>
      <div class="pt-2 flex justify-between items-center text-sm text-gray-500">
        <span>${formatDate(project.completionDate)}</span>
        ${
          project.status === "Completed"
            ? `<span class="px-3 py-1 bg-gray-100 rounded-full">Completed</span>`
            : `<span class="px-3 py-1 bg-black text-white rounded-full">In Progress</span>`
        }
      </div>
    </a>
  `;
}

// Function to render projects
function renderProjects(projects) {
  const projectGrid = document.getElementById("project-grid");
  projectGrid.innerHTML = "";

  if (projects.length === 0) {
    projectGrid.innerHTML =
      '<p class="col-span-full text-center py-16 text-gray-400">No projects found matching your criteria.</p>';
    return;
  }

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.innerHTML = createProjectCard(project, index);
    projectGrid.appendChild(projectCard.firstElementChild);
  });
}

// Function to filter projects
function filterProjects(projects, selectedType, selectedStatus) {
  return projects.filter((project) => {
    const matchesType = selectedType === "All" || project.type === selectedType;
    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;

    return matchesType && matchesStatus;
  });
}

// Function to handle filter button clicks
function handleFilterClick(event) {
  if (!event.target.matches(".filter-btn")) return;

  const filterType = event.target.dataset.filter;
  const filterValue = event.target.dataset.value;

  // Update active state
  document
    .querySelectorAll(`.filter-btn[data-filter="${filterType}"]`)
    .forEach((btn) => {
      btn.classList.remove("filter-active");
    });
  event.target.classList.add("filter-active");

  // Apply filters
  applyFilters();
}

// Function to apply all filters
function applyFilters() {
  const selectedType = document.querySelector(
    '.filter-btn[data-filter="type"].filter-active'
  ).dataset.value;
  const selectedStatus = document.querySelector(
    '.filter-btn[data-filter="status"].filter-active'
  ).dataset.value;

  const filteredProjects = filterProjects(
    allProjects,
    selectedType,
    selectedStatus
  );
  renderProjects(filteredProjects);
}

// Function to generate filter buttons
function generateFilterButtons(projects) {
  // Extract unique categories and statuses
  const categories = ["All", ...new Set(projects.map(project => project.type))];
  const statuses = ["All", ...new Set(projects.map(project => project.status))];
  
  // Get the filter containers
  const typeFilterContainer = document.getElementById("type-filters");
  const statusFilterContainer = document.getElementById("status-filters");
  
  // Clear existing filters
  typeFilterContainer.innerHTML = "";
  statusFilterContainer.innerHTML = "";
  
  // Generate type filter buttons
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = `filter-btn hover-target ${index === 0 ? "filter-active" : ""}`;
    button.dataset.filter = "type";
    button.dataset.value = category;
    button.textContent = category === "All" ? "All Projects" : category;
    typeFilterContainer.appendChild(button);
  });
  
  // Generate status filter buttons
  statuses.forEach((status, index) => {
    const button = document.createElement("button");
    button.className = `filter-btn hover-target ${index === 0 ? "filter-active" : ""}`;
    button.dataset.filter = "status";
    button.dataset.value = status;
    button.textContent = status === "All" ? "All Status" : status;
    statusFilterContainer.appendChild(button);
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
  document.body.classList.toggle("overflow-hidden");
}

// Custom cursor functionality
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  
  // Only initialize on desktop
  if (window.innerWidth < 1024) return;
  
  // Direct positioning for perfect accuracy
  document.addEventListener("mousemove", (e) => {
    // Position exactly at mouse tip position
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });
  
  // Scale effect on click
  document.addEventListener("mousedown", () => {
    cursorDot.classList.add("cursor-clicked");
  });
  
  document.addEventListener("mouseup", () => {
    cursorDot.classList.remove("cursor-clicked");
  });
  
  // Add hover effect for all interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .hover-target, h1, h2, h3, p, span, input, .filter-btn, .project-card");
  
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-hover");
    });
    
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-hover");
    });
  });
}

// Scroll animation
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Global variable to store all projects
let allProjects = [];

// Main function to initialize the page
async function initProjectsPage() {
  try {
    // Fetch projects data
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }
    allProjects = await response.json();

    // Generate filter buttons based on project data
    generateFilterButtons(allProjects);

    // Initial render
    renderProjects(allProjects);

    // Set up event listeners
    document.addEventListener("click", handleFilterClick);
    document
      .getElementById("menu-toggle")
      .addEventListener("click", toggleMobileMenu);
    document
      .getElementById("menu-close")
      .addEventListener("click", toggleMobileMenu);

    // Initialize custom cursor
    initCustomCursor();

    // Initialize scroll animations
    initScrollAnimation();
  } catch (error) {
    console.error("Error initializing projects page:", error);
    document.getElementById("project-grid").innerHTML = `
      <p class="col-span-full text-center py-16 text-red-500">
        Error loading projects. Please try again later.
      </p>
    `;
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initProjectsPage);
