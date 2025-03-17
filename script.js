document.addEventListener('DOMContentLoaded', () => {

  // --- Marquee Animation ---
  const marqueeContainer = document.querySelector('.marquee-container');
  const marquee = document.querySelector('.marquee');
  const track = document.querySelector('.marquee-track');
  const marqueeContent = document.querySelector('.marquee-content');

  if (marqueeContainer && track && marqueeContent) {
      const containerWidth = marqueeContainer.offsetWidth;
      const contentWidth = marqueeContent.offsetWidth;
      const baseSpeed = 0.2;
      const speedFactor = containerWidth / 1000; // Proportional to container width
      const speed = baseSpeed * speedFactor;
      let animationRunning = true;

      // Duplicate content (same as before)
      if (contentWidth < containerWidth) {
          const numCopies = Math.ceil((containerWidth * 1.1) / contentWidth) + 1; // Calculate copies for 110%
          for (let i = 0; i < numCopies; i++) {
              const clone = marqueeContent.cloneNode(true);
              track.appendChild(clone);
          }
      }

        // Set the track width.  Use scrollWidth to include padding/border.
      track.style.width = `${marqueeContent.scrollWidth * track.children.length}px`;


      let x = 0;

      function animateMarquee() {
          if (!animationRunning) return;

          x -= speed;
          //  Loop when *one full copy* has scrolled off-screen.
          if (x <= -marqueeContent.scrollWidth) {
              x += marqueeContent.scrollWidth;
          }
          track.style.transform = `translate3d(${x}px, 0, 0)`;
          requestAnimationFrame(animateMarquee);
      }

      animateMarquee();

      marqueeContainer.addEventListener('mouseenter', () => { animationRunning = false; });
      marqueeContainer.addEventListener('mouseleave', () => {
          animationRunning = true;
          requestAnimationFrame(animateMarquee);
      });
  }


    // --- Letter Animation ---
    const heroText = document.querySelector('.hero-text');
    const letters = document.querySelectorAll('.letter');

    if (heroText && letters.length > 0) {
        heroText.addEventListener('mousemove', (event) => {
            const rect = heroText.getBoundingClientRect();
            const containerX = rect.left + window.scrollX;
            const containerY = rect.top + window.scrollY;
            const mouseX = event.clientX - containerX;
            const mouseY = event.clientY - containerY;

            letters.forEach(letter => {
                const letterRect = letter.getBoundingClientRect();
                const letterX = letterRect.left - containerX + letterRect.width / 2;
                const letterY = letterRect.top - containerY + letterRect.height / 2;
                const dx = mouseX - letterX;
                const dy = mouseY - letterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 600; // Adjust maxDistance as needed
                const moveFactor = 30; // Adjust moveFactor as needed

                if (distance < maxDistance) {
                    const moveX = (dx / distance) * (maxDistance - distance) / maxDistance * moveFactor;
                    const moveY = (dy / distance) * (maxDistance - distance) / maxDistance * moveFactor;
                    letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    letter.style.transform = ''; // Reset
                }
            });
        });

        heroText.addEventListener('mouseout', () => {
            letters.forEach(letter => {
                letter.style.transform = ''; // Reset on mouseout
            });
        });
    }


    // --- Image Parallax ---
    const heroImageContainer = document.querySelector('.hero-image-container');
    const heroImage = document.querySelector('.hero-image');

    if (heroImageContainer && heroImage && window.innerWidth > 768) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const containerRect = heroImageContainer.getBoundingClientRect();

            const imageX = (x - containerRect.left - containerRect.width / 2) * 0.05;
            const imageY = (y - containerRect.top - containerRect.height / 2) * 0.05;

            heroImage.style.transform = `translate(${imageX}px, ${imageY}px)`;
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'translate(-50%, -50%)'; // Correct reset
        });
    }


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }


    // --- Smooth Scrolling ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 20) { // Adjust the scroll threshold as needed
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });


    // --- GSAP ScrollTrigger ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray(".project-link").forEach((card) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: "-=10", // Adjust the animation as needed
                duration: 0.5,
                ease: "power1.inOut"
            });
        });
    }


   


    // --- Contact Form Submission ---
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert('Message sent successfully!');
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    alert('There was an error sending your message: ' + error.message);
                });
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.solution-project-left img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.solution-project-left2 img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.solution-project-chef-left img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.solution-project-jiffy-left img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.solution-project-trulioo-left img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // ... your other JavaScript code ...

    const images = document.querySelectorAll('.challenge-project-right img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expandable-image');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const challengeImages = document.querySelectorAll('.challenge-project-right img');

    challengeImages.forEach(image => {
        image.addEventListener('click', (event) => {
            image.classList.toggle('expanded');
            if (image.classList.contains('expanded')) {
                document.addEventListener('click', exitLightbox); // Add listener
            } else {
                document.removeEventListener('click', exitLightbox); // Remove listener
            }
            event.stopPropagation(); // Prevent immediate document click
        });
    });

    function exitLightbox(event) {
        const expandedImage = document.querySelector('.challenge-project-chef-right img.expanded');
        if (expandedImage && !expandedImage.contains(event.target)) {
            expandedImage.classList.remove('expanded');
            document.removeEventListener('click', exitLightbox);
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const challengeImages = document.querySelectorAll('.challenge-project-chef-right img');

    challengeImages.forEach(image => {
        image.addEventListener('click', (event) => {
            image.classList.toggle('expanded');
            if (image.classList.contains('expanded')) {
                document.addEventListener('click', exitLightbox); // Add listener
            } else {
                document.removeEventListener('click', exitLightbox); // Remove listener
            }
            event.stopPropagation(); // Prevent immediate document click
        });
    });

    function exitLightbox(event) {
        const expandedImage = document.querySelector('.challenge-project-right img.expanded');
        if (expandedImage && !expandedImage.contains(event.target)) {
            expandedImage.classList.remove('expanded');
            document.removeEventListener('click', exitLightbox);
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // --- Generate Portfolio Sections ---
    generatePortfolio(projects, 'grid-container', 'grid'); // Grid layout for homepage

    // Generate "View More" grid with only three projects
    if (document.getElementById('view-more-projects-grid')) {
        generatePortfolio(shuffle(projects), 'view-more-projects-grid', 'grid', 3); // Limit to 3 projects
    }

    // --- Horizontal Scrolling for Similar Projects ---
    setupHorizontalScroll('.horizontal-scroll-container');

    // --- View More Button ---
    setupViewMoreButton();

    // --- Expandable Image ---
    setupExpandableImage();

    // --- Generate Carousel ---
    generateCarousel(projects);

    // --- Menu Toggle ---
    setupMenuToggle();

    // --- Generate Horizontal Portfolio ---
    generateHorizontalPortfolio(projects, 'portfolio-horizontal');
});

function generatePortfolio(projectsArray, containerId, layout = 'grid', maxProjects = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = '';

    const projectsToDisplay = maxProjects ? projectsArray.slice(0, maxProjects) : projectsArray;

    projectsToDisplay.forEach(project => {
        const projectLink = createProjectLink(project);
        container.appendChild(projectLink);
    });
}

function createProjectLink(project) {
    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.classList.add('project-link', project.class);
    projectLink.style.backgroundColor = project.color;

    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.title;
    image.dataset.src = project.imageUrl;
    image.dataset.llStatus = "loaded";

    const projectContent = document.createElement('div');
    projectContent.classList.add('project-content');

    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.textContent = project.description;

    const viewCaseButton = createViewCaseButton();

    imageContainer.appendChild(image);
    projectLink.appendChild(imageContainer);

    projectContent.appendChild(projectTitle);
    projectContent.appendChild(projectDescription);
    projectContent.appendChild(viewCaseButton);

    projectLink.appendChild(projectContent);

    return projectLink;
}

function createViewCaseButton() {
    const viewCaseButton = document.createElement('button');
    viewCaseButton.classList.add('view-case-button');

    const buttonText = document.createElement('span');
    buttonText.textContent = 'View case';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = `<path d="M10.7186 17.7593L4.83753 11.8782L3.46777 13.248L11.6873 21.4675L12.3722 20.7826L19.9068 13.248L18.537 11.8782L12.656 17.7593L12.656 2.09326H10.7186L10.7186 17.7593Z"></path><path d="M10.7186 17.7593L4.83753 11.8782L3.46777 13.248L11.6873 21.4675L12.3722 20.7826L19.9068 13.248L18.537 11.8782L12.656 17.7593L12.656 2.09326H10.7186L10.7186 17.7593Z"></path>`;

    viewCaseButton.appendChild(buttonText);
    viewCaseButton.appendChild(svg);

    return viewCaseButton;
}

function setupHorizontalScroll(selector) {
    const scrollContainer = document.querySelector(selector);
    if (!scrollContainer) return;

    const scrollAmount = 300;

    const prevButton = document.querySelector('.scroll-button.prev');
    const nextButton = document.querySelector('.scroll-button.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
        nextButton.addEventListener('click', () => scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    }

    addDragEvents(scrollContainer);
}

function addDragEvents(scrollContainer) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.scrollBehavior = 'auto';
    };

    const endDrag = () => {
        isDragging = false;
        scrollContainer.style.scrollBehavior = 'smooth';
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener('mousedown', startDrag);
    scrollContainer.addEventListener('mouseleave', endDrag);
    scrollContainer.addEventListener('mouseup', endDrag);
    scrollContainer.addEventListener('mousemove', drag);

    scrollContainer.addEventListener('touchstart', startDrag);
    scrollContainer.addEventListener('touchend', endDrag);
    scrollContainer.addEventListener('touchmove', drag);
}

function setupViewMoreButton() {
    const viewMoreButton = document.querySelector('.view-more-button');
    const viewMoreContainer = document.querySelector('#view-more-projects .horizontal-scroll-container');
    if (viewMoreButton && viewMoreContainer) {
        viewMoreButton.addEventListener('click', () => viewMoreContainer.classList.toggle('show'));
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupExpandableImage() {
    const expandableImage = document.querySelector('.expandable-image');
    const overlay = document.querySelector('.overlay');

    if (expandableImage && overlay) {
        expandableImage.addEventListener('click', (event) => {
            event.stopPropagation();
            expandableImage.classList.toggle('expanded');
        });

        overlay.addEventListener('click', () => {
            expandableImage.classList.remove('expanded');
        });
    }
}



    
document.addEventListener('DOMContentLoaded', () => {
    
      // --- Carousel Image Drag Prevention ---
      const carouselImages = document.querySelectorAll('#portfolio-carousel .portfolio-carousel-container img');
      

      carouselImages.forEach(img => {
          img.addEventListener('mousedown', (e) => {
              e.preventDefault();
          });
      });

    // --- Generate Portfolio Sections ---
    generatePortfolio(projects, 'grid-container'); // Grid layout for homepage


    generatePortfolioCarousel(projects, 'portfolio-carousel-container'); // Carousel generation
    setupCarouselNavigation('portfolio-carousel-container'); // Navigation setup

    // --- Add this drag-and-drop scrolling code here ---
    const container = document.getElementById('portfolio-carousel-container');
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    if (container) {
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.scrollBehavior = 'auto';
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.scrollBehavior = 'smooth';
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.scrollBehavior = 'smooth';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }


    // Generate "View More" grid with only three projects
    if (document.getElementById('view-more-projects-grid')) {
        generatePortfolio(shuffle(projects), 'view-more-projects-grid', 3);
    }

    generatePortfolioCarousel(projects, 'portfolio-carousel-container'); // Add the carousel


    // --- Add this code here ---
    const images = document.querySelectorAll('#portfolio-carousel .portfolio-carousel-container img');

    images.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
    // --- End of added code ---

 // --- Add this code here ---
 const carouselContainer = document.getElementById('portfolio-carousel-container');
 const projectLinks = document.querySelectorAll('.project-link');
 if (carouselContainer){
     let originalCarouselHeight = carouselContainer.offsetHeight;

     projectLinks.forEach(link => {
         link.addEventListener('click', () => {
             link.classList.toggle('expanded');
             if (link.classList.contains('expanded')) {
                 carouselContainer.style.height = '600px'; // Adjust as needed
             } else {
                 carouselContainer.style.height = originalCarouselHeight + 'px';
             }
         });
     });
 }

    // --- Horizontal Scrolling for Similar Projects ---
    setupHorizontalScroll('.horizontal-scroll-container');

    // --- View More Button ---
    setupViewMoreButton();

    // --- Expandable Image ---
    setupExpandableImage();

    // --- Generate Carousel ---
    generateCarousel(projects);

    // --- Menu Toggle ---
    setupMenuToggle();
    
    // --- Carousel Navigation ---
    setupCarouselNavigation('portfolio-carousel-container');
});


// --- Portfolio Generation Functions ---
function generatePortfolio(projectsArray, containerId, maxProjects = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = '';

    const projectsToDisplay = maxProjects ? projectsArray.slice(0, maxProjects) : projectsArray;

    projectsToDisplay.forEach(project => {
        const projectLink = createProjectLink(project);
        container.appendChild(projectLink);
    });
}

function generatePortfolioCarousel(projectsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = '';
    projectsArray.forEach(project => {
        const projectLink = createProjectLink(project);
        container.appendChild(projectLink);
    });
    addDragEvents(container);
    setupInfiniteScroll(container, projectsArray);
}

function setupInfiniteScroll(container, projectsArray) {
    let scrollPosition = 0;
    const itemWidth = 320;
    const visibleItems = 3;

    container.addEventListener('scroll', () => {
        const currentScroll = container.scrollLeft;

        if (currentScroll > scrollPosition) {
            if (currentScroll >= (projectsArray.length - visibleItems) * itemWidth) {
                projectsArray.forEach(project => {
                    const projectLink = createProjectLink(project);
                    container.appendChild(projectLink);
                });
            }
        } else if (currentScroll < scrollPosition) {
            if (currentScroll <= visibleItems * itemWidth) {
                for (let i = projectsArray.length - 1; i >= 0; i--) {
                    const projectLink = createProjectLink(projectsArray[i]);
                    container.prepend(projectLink);
                }
            }
        }
        scrollPosition = currentScroll;
    });
}



// --- Project Item Creation and Helper Functions ---

function createProjectLink(project) {
    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.classList.add('project-link', project.class);
    projectLink.style.backgroundColor = project.color;

    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.title;
    image.dataset.src = project.imageUrl;
    image.dataset.llStatus = "loaded";

    const projectContent = document.createElement('div');
    projectContent.classList.add('project-content');

    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.textContent = project.description;

    const viewCaseButton = createViewCaseButton();

    imageContainer.appendChild(image);
    projectLink.appendChild(imageContainer);

    projectContent.appendChild(projectTitle);
    projectContent.appendChild(projectDescription);
    projectContent.appendChild(viewCaseButton);

    projectLink.appendChild(projectContent);

    return projectLink;
}

function createViewCaseButton() {
    const viewCaseButton = document.createElement('button');
    viewCaseButton.classList.add('view-case-button');

    const buttonText = document.createElement('span');
    buttonText.textContent = 'View case';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = `<path d="M10.7186 17.7593L4.83753 11.8782L3.46777 13.248L11.6873 21.4675L12.3722 20.7826L19.9068 13.248L18.537 11.8782L12.656 17.7593L12.656 2.09326H10.7186L10.7186 17.7593Z"></path><path d="M10.7186 17.7593L4.83753 11.8782L3.46777 13.248L11.6873 21.4675L12.3722 20.7826L19.9068 13.248L18.537 11.8782L12.656 17.7593L12.656 2.09326H10.7186L10.7186 17.7593Z"></path>`;

    viewCaseButton.appendChild(buttonText);
    viewCaseButton.appendChild(svg);

    return viewCaseButton;
}

function setupHorizontalScroll(selector) {
    const scrollContainer = document.querySelector(selector);
    if (!scrollContainer) return;

    const scrollAmount = 300;

    const prevButton = document.querySelector('.scroll-button.prev');
    const nextButton = document.querySelector('.scroll-button.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
        nextButton.addEventListener('click', () => scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    }

    addDragEvents(scrollContainer);
}

function addDragEvents(scrollContainer) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.scrollBehavior = 'auto';
    };

    const endDrag = () => {
        isDragging = false;
        scrollContainer.style.scrollBehavior = 'smooth';
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener('mousedown', startDrag);
    scrollContainer.addEventListener('mouseleave', endDrag);
    scrollContainer.addEventListener('mouseup', endDrag);
    scrollContainer.addEventListener('mousemove', drag);

    scrollContainer.addEventListener('touchstart', startDrag);
    scrollContainer.addEventListener('touchend', endDrag);
    scrollContainer.addEventListener('touchmove', drag);
}

function setupViewMoreButton() {
    const viewMoreButton = document.querySelector('.view-more-button');
    const viewMoreContainer = document.querySelector('#view-more-projects .horizontal-scroll-container');
    if (viewMoreButton && viewMoreContainer) {
        viewMoreButton.addEventListener('click', () => viewMoreContainer.classList.toggle('show'));
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupExpandableImage() {
    const expandableImage = document.querySelector('.expandable-image');
    const overlay = document.querySelector('.overlay');

    if (expandableImage && overlay) {
        expandableImage.addEventListener('click', (event) => {
            event.stopPropagation();
            expandableImage.classList.toggle('expanded');
        });

        overlay.addEventListener('click', () => {
            expandableImage.classList.remove('expanded');
        });
    }
}

function generateCarousel(projects) {
    console.log("generateCarousel function called");
}

function setupMenuToggle() {
    console.log("setupMenuToggle function called");
}

function setupCarouselNavigation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const navLeft = container.parentElement.querySelector('.carousel-nav-left');
    const navRight = container.parentElement.querySelector('.carousel-nav-right');

    if (navLeft && navRight) {
        navLeft.addEventListener('click', () => {
            container.scrollBy({ left: -320, behavior: 'smooth' });
        });

        navRight.addEventListener('click', () => {
            container.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
}

const form = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

if (form) { // Check if the form exists
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // --- Client-Side Validation ---
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            displayMessage('Please fill in all required fields.', 'error');
            return; // Stop if validation fails
        }

        // Basic email format validation (you can use a more robust regex if needed)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }

        // --- Formspree Submission ---
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                displayMessage('Message sent successfully!', 'success');
                form.reset(); // Clear the form
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        displayMessage(data["errors"].map(error => error["message"]).join(", "), 'error')
                      } else {
                        displayMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
                      }
                });

            }
        })
        .catch(error => {
            displayMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
            console.error(error);
        });
    });
}

function displayMessage(message, type) {
    formMessages.textContent = message;
    formMessages.className = type; // Add 'success' or 'error' class
}

document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            const cursorX = e.clientX - customCursor.offsetWidth / 2;
            const cursorY = e.clientY - customCursor.offsetHeight / 2;
            customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        });

        document.addEventListener('mouseleave', () => {
            customCursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            customCursor.style.display = 'block';
        });

       // --- Hover effects for BOTH clickable elements and expandable images ---

        // 1. Get ALL elements that should trigger the solid cursor:
        const interactiveElements = document.querySelectorAll(
            'a, button, input[type="submit"], input[type="button"], input[type="radio"], input[type="checkbox"], label, select, summary, [role="button"], [tabindex], .expandable-image'
        );

         // --- ADD THIS BLOCK FOR .solution-project-trulioo-left ---
    const truliooLeft = document.querySelector('.solution-project-trulioo-left');
    if (truliooLeft) { // Important: Check if the element exists
        truliooLeft.addEventListener('mouseenter', () => {
            customCursor.classList.add('solid');
        });
        truliooLeft.addEventListener('mouseleave', () => {
            customCursor.classList.remove('solid');
        });
    }
    // --- END OF ADDED BLOCK ---


  // --- ADD THIS BLOCK FOR .solution-project-chef-left ---
  const chefLeft = document.querySelector('.solution-project-chef-left');
  if (chefLeft) { // Important: Check if the element exists
      chefLeft.addEventListener('mouseenter', () => { // Corrected: Use chefLeft here
          customCursor.classList.add('solid');
      });
      chefLeft.addEventListener('mouseleave', () => { // Corrected: Use chefLeft here
          customCursor.classList.remove('solid');
      });
  }
  // --- END OF ADDED BLOCK ---

  // --- ADD THIS BLOCK FOR .solution-project-left ---
  const projectLeft = document.querySelector('.solution-project-left');
  if (projectLeft) { // Important: Check if the element exists
      projectLeft.addEventListener('mouseenter', () => { // Corrected: Use projectLeft here
          customCursor.classList.add('solid');
      });
      projectLeft.addEventListener('mouseleave', () => { // Corrected: Use projectLeft here
          customCursor.classList.remove('solid');
      });
  }
  // --- END OF ADDED BLOCK ---


  // --- ADD THIS BLOCK FOR .challenge-project-right ---
  const challengeright = document.querySelector('.challenge-project-right');
  if (challengeright) { // Important: Check if the element exists
    challengeright.addEventListener('mouseenter', () => { // Corrected: Use challengeright here
          customCursor.classList.add('solid');
      });
      challengeright.addEventListener('mouseleave', () => { // Corrected: Use challengeright here
          customCursor.classList.remove('solid');
      });
  }
  // --- END OF ADDED BLOCK ---

  
   // --- ADD THIS BLOCK FOR .project-video ---
   const projectvideo = document.querySelector('.project-video');
   if (projectvideo) { // Important: Check if the element exists
    projectvideo.addEventListener('mouseenter', () => { // Corrected: Use projectvideo here
           customCursor.classList.add('solid');
       });
       projectvideo.addEventListener('mouseleave', () => { // Corrected: Use projectvideo here
           customCursor.classList.remove('solid');
       });
   }
   // --- END OF ADDED BLOCK ---

        // 2. Add event listeners to ALL of them:
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                customCursor.classList.add('solid');
            });
            element.addEventListener('mouseleave', () => {
                customCursor.classList.remove('solid');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox'); // Updated ID to 'checkbox'
    const body = document.body;
    const LIGHT_MODE_CLASS = 'light-mode';

    // Function to set the theme based on local storage
    function setThemeFromLocalStorage() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            body.classList.add(LIGHT_MODE_CLASS);
            if (checkbox) {
                checkbox.checked = true;
            }
        } else {
            body.classList.remove(LIGHT_MODE_CLASS);
            if (checkbox) {
                checkbox.checked = false;
            }
        }
    }

    // Apply theme on initial page load
    setThemeFromLocalStorage();

    // Event listener for the theme toggle (only if the toggle exists on the page)
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            body.classList.toggle(LIGHT_MODE_CLASS);

            // Store the user's preference in localStorage
            localStorage.setItem('theme', body.classList.contains(LIGHT_MODE_CLASS) ? 'light' : 'dark');
        });
    }
});

const customCursor = document.getElementById('custom-cursor');
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
    if (!cursorVisible) {
        customCursor.style.opacity = 1; // Make visible on first move
        cursorVisible = true;
    }
    const x = e.clientX;
    const y = e.clientY;
    customCursor.style.transform = `translate(${x}px, ${y}px)`;
});

