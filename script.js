// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated Counter for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('about-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section, .about-stats, .skills').forEach(el => {
    observer.observe(el);
});

// Load GitHub repositories
async function loadGitHubRepos() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Show loading state
    projectsGrid.innerHTML = `
        <div class="project-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading GitHub repositories...</p>
        </div>
    `;
    
    try {
        console.log('Fetching GitHub repositories...');
        const response = await fetch('https://api.github.com/users/GH05TN3T/repos?sort=updated&per_page=8', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'CyborgJedi-Portfolio'
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const repos = await response.json();
        console.log('GitHub repos loaded:', repos.length);
        
        // Clear loading state
        projectsGrid.innerHTML = '';
        
        const validRepos = repos.filter(repo => !repo.fork);
        console.log('Valid repos (non-forks):', validRepos.length);
        
        if (validRepos.length === 0) {
            projectsGrid.innerHTML = '<p class="error-message">No repositories found.</p>';
            return;
        }
        
        validRepos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error loading GitHub repositories:', error);
        console.error('Current domain:', window.location.hostname);
        console.error('Full error details:', error);
        
        // Fallback to static project data if API fails
        const fallbackProjects = [
            {
                name: 'ghostnet-site',
                description: 'Personal portfolio website built with HTML, CSS, and JavaScript',
                html_url: 'https://github.com/GH05TN3T/ghostnet-site',
                language: 'HTML',
                stargazers_count: 0,
                forks_count: 0,
                watchers_count: 0,
                topics: ['portfolio', 'website', 'html']
            },
            {
                name: 'cybersecurity-tools',
                description: 'Collection of cybersecurity and penetration testing tools',
                html_url: 'https://github.com/GH05TN3T/cybersecurity-tools',
                language: 'Python',
                stargazers_count: 5,
                forks_count: 2,
                watchers_count: 3,
                topics: ['cybersecurity', 'pentesting', 'tools']
            },
            {
                name: 'docker-compose-stack',
                description: 'Production-ready Docker Compose configurations for various services',
                html_url: 'https://github.com/GH05TN3T/docker-compose-stack',
                language: 'Dockerfile',
                stargazers_count: 8,
                forks_count: 3,
                watchers_count: 5,
                topics: ['docker', 'devops', 'infrastructure']
            }
        ];
        
        console.log('Using fallback project data');
        projectsGrid.innerHTML = '';
        
        fallbackProjects.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
        
        // Show error message at the bottom
        const errorDiv = document.createElement('div');
        errorDiv.className = 'project-loading';
        errorDiv.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <p>Showing cached projects. GitHub API temporarily unavailable.</p>
            <button onclick="loadGitHubRepos()" class="btn btn-primary">Retry Live Data</button>
        `;
        projectsGrid.appendChild(errorDiv);
    }
}


// GitHub API Integration
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/GH05TN3T/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        repos.forEach(repo => {
            if (!repo.fork && repo.description) {
                const projectCard = createProjectCard(repo);
                projectsGrid.appendChild(projectCard);
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        document.getElementById('projects-grid').innerHTML = `
            <div class="project-loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load projects. Please check GitHub API.</p>
            </div>
        `;
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    // Get primary language color
    const languageColors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Shell': '#89e051',
        'Dockerfile': '#384d54',
        'TypeScript': '#2b7489',
        'Lua': '#000080',
        'PHP': '#4F5D95'
    };
    
    const languageColor = languageColors[repo.language] || '#6e7681';
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">
                <i class="fab fa-github"></i>
                ${repo.name}
            </h3>
            <p class="project-description">${repo.description || 'No description available'}</p>
        </div>
        <div class="project-content">
            <div class="project-tech">
                ${repo.language ? `<span class="tech-tag" style="border-color: ${languageColor}; color: ${languageColor}">${repo.language}</span>` : ''}
                ${repo.topics ? repo.topics.slice(0, 3).map(topic => 
                    `<span class="tech-tag">${topic}</span>`
                ).join('') : ''}
            </div>
            <div class="project-stats">
                <span class="project-stat">
                    <i class="fas fa-star"></i>
                    ${repo.stargazers_count}
                </span>
                <span class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    ${repo.forks_count}
                </span>
                <span class="project-stat">
                    <i class="fas fa-eye"></i>
                    ${repo.watchers_count}
                </span>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i>
                    View Code
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:edgar@cyborgjedi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        this.reset();
    }, 3000);
});

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.title-name');
    if (heroTitle) {
        typeWriter(heroTitle, 'CyborgJedi', 150);
    }
});

// Particle Background Effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    .project-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
    
    .project-stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize particles
    initParticles();
    
    // Load GitHub repositories
    loadGitHubRepos();
    
    
    // Initialize contact form
    initContactForm();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize stats counter
    initStatsCounter();
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--border-color); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: var(--text-secondary);">Loading...</p>
        </div>
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});
