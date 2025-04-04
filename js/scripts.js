/*
======================
Photography Portfolio JavaScript
======================
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 1000);
        }, 1000);
    });

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active Navigation Link on Scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 700) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize Vanilla Tilt for 3D hover effect
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Active button
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter items
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio Lightbox
    const portfolioZoom = document.querySelectorAll('.portfolio-zoom');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    let currentImgIndex;

    portfolioZoom.forEach((zoom, index) => {
        zoom.addEventListener('click', function(e) {
            e.preventDefault();
            currentImgIndex = index;
            const imgSrc = this.getAttribute('href');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightboxNext.addEventListener('click', function() {
        currentImgIndex = (currentImgIndex + 1) % portfolioZoom.length;
        const imgSrc = portfolioZoom[currentImgIndex].getAttribute('href');
        lightboxImg.setAttribute('src', imgSrc);
    });

    lightboxPrev.addEventListener('click', function() {
        currentImgIndex = (currentImgIndex - 1 + portfolioZoom.length) % portfolioZoom.length;
        const imgSrc = portfolioZoom[currentImgIndex].getAttribute('href');
        lightboxImg.setAttribute('src', imgSrc);
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Click outside to close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });

    testimonialNext.addEventListener('click', function() {
        testimonialSlides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        testimonialSlides[currentSlide].style.display = 'block';
    });

    testimonialPrev.addEventListener('click', function() {
        testimonialSlides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].style.display = 'block';
    });

    // Initialize the Calendar
    const calendarEl = document.getElementById('booking-calendar');
    const dateInput = document.getElementById('date');
    
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            selectable: true,
            selectMirror: true,
            dateClick: function(info) {
                // Check if the date is in the past
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const clickedDate = new Date(info.dateStr);
                
                if (clickedDate < today) {
                    // If date is in the past, alert the user
                    alert('Please select a future date for booking.');
                    return;
                }
                
                // Format the date and set it in the input field
                const formattedDate = formatDate(clickedDate);
                dateInput.value = formattedDate;
                
                // Remove all other selected-date classes
                document.querySelectorAll('.fc-day').forEach(day => {
                    day.classList.remove('selected-date');
                });
                
                // Add a class to highlight the selected date
                info.dayEl.classList.add('selected-date');
            },
            events: [
                // You can add predefined events or booked dates here
                {
                    title: 'Booked',
                    start: '2025-04-15',
                    end: '2025-04-16',
                    color: '#888'
                },
                {
                    title: 'Booked',
                    start: '2025-04-22',
                    end: '2025-04-23',
                    color: '#888'
                }
            ]
        });
        
        calendar.render();
    }

    // Format date to YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Form Submission for Booking
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // Don't prevent default form submission since we're using Formspree
            
            // Collect form data for localStorage
            const formData = new FormData(this);
            const bookingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                date: formData.get('date'),
                time: formData.get('time'),
                message: formData.get('message')
            };
            
            console.log('Booking request data:', bookingData);
            
            // The form will be submitted to Formspree automatically because of the action attribute
            // Email will be sent to bobajaj@gmail.com through Formspree
            
            // Store in localStorage for demo purposes and backup
            const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            existingBookings.push({
                ...bookingData,
                id: Date.now(),
                status: 'pending',
                submittedAt: new Date().toISOString()
            });
            localStorage.setItem('bookings', JSON.stringify(existingBookings));
            
            // We don't need to reset the form as the page will redirect after submission
            // Neither do we need to show the success modal since Formspree will handle that
            
            // Note: If you later want to intercept the form submission completely and handle
            // it via AJAX, use this pattern:
            /*
            e.preventDefault();
            fetch(bookingForm.action, {
                method: bookingForm.method,
                body: new FormData(bookingForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Formspree response:', data);
                if (data.ok) {
                    showSuccessModal();
                    bookingForm.reset();
                }
            })
            .catch(error => console.error('Error:', error));
            */
        });
    }

    // Form Submission for Quote
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            // Don't prevent default submission since we're using Formspree
            
            // Collect form data for localStorage
            const formData = new FormData(this);
            const quoteData = {
                name: formData.get('quote-name'),
                email: formData.get('quote-email'),
                service: formData.get('quote-service'),
                message: formData.get('quote-message')
            };
            
            console.log('Quote request data:', quoteData);
            
            // The form will be submitted to Formspree automatically
            // Email will be sent to bobajaj@gmail.com through Formspree
            
            // Store in localStorage for demo purposes and backup
            const existingQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
            existingQuotes.push({
                ...quoteData,
                id: Date.now(),
                status: 'pending',
                submittedAt: new Date().toISOString()
            });
            localStorage.setItem('quotes', JSON.stringify(existingQuotes));
            
            // We don't need to reset the form as the page will redirect after submission
            // Neither do we need to show the success modal since Formspree will handle that
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real project, you would send form data to a server here
            // For demo purposes, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Show Success Modal
    function showSuccessModal() {
        const successModal = document.getElementById('success-modal');
        successModal.classList.add('active');
        
        const modalClose = document.querySelector('.modal-close');
        const modalOk = document.querySelector('.modal-ok');
        
        modalClose.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
        
        modalOk.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
        
        // Click outside to close modal
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                successModal.classList.remove('active');
            }
        });
    }

    // Split Text Animation with GSAP
    const splitTexts = document.querySelectorAll('.split-text');
    
    splitTexts.forEach(text => {
        // Create a span for each letter
        const content = text.textContent;
        const letters = content.split('');
        text.textContent = '';
        
        letters.forEach(letter => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(100%)';
            span.style.opacity = '0';
            
            if (letter === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = letter;
            }
            
            text.appendChild(span);
        });
        
        // Animate each letter
        gsap.to(text.querySelectorAll('span'), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
                trigger: text,
                start: "top 80%"
            }
        });
    });

    // Animate counter
    const counterElement = document.querySelector('.counter');
    if (counterElement) {
        gsap.to(counterElement, {
            innerText: parseInt(counterElement.textContent),
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counterElement,
                start: "top 80%"
            }
        });
    }

    // Parallax effect for hero section
    gsap.to('.hero-image', {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
});
