// Cursor Effects
document.addEventListener('DOMContentLoaded', function () {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        document.addEventListener('mousemove', function (e) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';

            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
            });

            link.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
            });
        });
    }
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');

            mobileMenuBtn.innerHTML = mobileMenu.classList.contains('hidden')
                ? '<i class="ri-menu-line ri-lg"></i>'
                : '<i class="ri-close-line ri-lg"></i>';
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
            });
        });
    }
});

// Typing Effect
document.addEventListener('DOMContentLoaded', function () {
    const typingText = document.getElementById('typingText');

    if (typingText) {
        const phrases = ['Design. Code. Inspire.', 'Create. Develop. Innovate.', 'Imagine. Build. Transform.'];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }
});

// Portfolio Filter
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filterValue = this.getAttribute('data-filter');

                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                this.classList.remove('bg-gray-200', 'text-gray-800');
                this.classList.add('bg-primary', 'text-white');

                projectCards.forEach(card => {
                    card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? 'block' : 'none';
                });
            });
        });
    }
});

// Resume Tabs
document.addEventListener('DOMContentLoaded', function () {
    const resumeTabs = document.querySelectorAll('.resume-tab');
    const resumeContents = document.querySelectorAll('.resume-content');

    if (resumeTabs.length && resumeContents.length) {
        resumeTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const tabId = this.getAttribute('data-tab');

                resumeTabs.forEach(t => {
                    t.classList.remove('border-primary');
                    t.classList.add('border-transparent');
                });
                this.classList.remove('border-transparent');
                this.classList.add('border-primary');

                resumeContents.forEach(content => {
                    content.classList.add('hidden');
                });
                document.getElementById(tabId + '-content').classList.remove('hidden');
            });
        });
    }
});

// Skill Bars
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    if (skillBars.length) {
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function animateSkillBars() {
            skillBars.forEach(bar => {
                if (isInViewport(bar) && bar.style.width === '0%') {
                    const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent.trim();
                    let width = 0;
                    const percent = parseInt(targetWidth, 10);

                    function fill() {
                        if (width < percent) {
                            width++;
                            bar.style.width = width + '%';
                            requestAnimationFrame(fill);
                        } else {
                            bar.style.width = percent + '%';
                        }
                    }
                    fill();
                }
            });
        }

        animateSkillBars();
        window.addEventListener('scroll', animateSkillBars);
    }
});

// Scroll-to-top Button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg opacity-0 pointer-events-none transition-all duration-300';
document.body.appendChild(scrollBtn);
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('opacity-100', 'pointer-events-auto');
    scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    scrollBtn.classList.remove('opacity-100', 'pointer-events-auto');
    scrollBtn.classList.add('opacity-0', 'pointer-events-none');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section fade-in on scroll
const fadeSections = document.querySelectorAll('section');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadein');
    }
  });
}, { threshold: 0.1 });
fadeSections.forEach(sec => fadeObs.observe(sec));

// Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('border-red-500');
                }
            }

            if (isValid) {
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });

        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('border-red-500');
            });
        });
    }
});

// Smooth Scroll and Active Nav
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('darkModeToggle');
    const modeLabel = document.getElementById('modeLabel');
    const body = document.body;

    if (themeToggle) {
        // Load mode from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark');
            themeToggle.checked = true;
            if (modeLabel) modeLabel.textContent = 'Dark Mode';
        } else {
            body.classList.remove('dark');
            themeToggle.checked = false;
            if (modeLabel) modeLabel.textContent = 'Light Mode';
        }

        themeToggle.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (modeLabel) modeLabel.textContent = 'Dark Mode';
            } else {
                body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (modeLabel) modeLabel.textContent = 'Light Mode';
            }
        });
    }
});
