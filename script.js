document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerIcon = document.querySelector('.icon-hamburger');
    const closeIcon = document.querySelector('.icon-close');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('active');

            if (isMenuOpen) {
                mobileMenu.classList.remove('active');
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            } else {
                mobileMenu.classList.add('active');
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });

    // Hero Description Typewriter Animation
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        const text = heroDesc.textContent.trim();
        heroDesc.textContent = ''; // Clear text

        // Create Cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        heroDesc.appendChild(cursor);

        let charIndex = 0;

        function typeChar() {
            if (charIndex < text.length) {
                const char = text.charAt(charIndex);
                const charNode = document.createTextNode(char);
                heroDesc.insertBefore(charNode, cursor);
                charIndex++;
                setTimeout(typeChar, 30); // Adjust speed (30ms per char)
            }
        }

        // Start typing
        setTimeout(typeChar, 500); // Initial delay
    }

    // Split Section Intersection Observer
    const contentBlocks = document.querySelectorAll('.content-block');
    const stickyTitle = document.querySelector('.section-title');
    const stickySubtitle = document.querySelector('.section-subtitle');
    const navItems = document.querySelectorAll('.nav-list li');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when content is in the middle 20% of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = entry.target.getAttribute('data-step');
                const title = entry.target.getAttribute('data-title');
                const subtitle = entry.target.getAttribute('data-subtitle');

                // Update Text
                if (title && stickyTitle) stickyTitle.textContent = title;
                if (subtitle && stickySubtitle) stickySubtitle.textContent = subtitle;

                // Update Navigation
                if (stepIndex !== null) {
                    navItems.forEach((item, index) => {
                        if (index == stepIndex) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    contentBlocks.forEach(block => {
        observer.observe(block);
    });

    // Add click event listeners to navigation items
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const targetBlock = document.querySelector(`.content-block[data-step="${index}"]`);
            if (targetBlock) {
                targetBlock.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Quote Section Animation
    const quoteElements = document.querySelectorAll('.quote-content blockquote, .quote-content cite');

    if (quoteElements.length > 0) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    quoteObserver.unobserve(entry.target); // Run once
                }
            });
        }, { threshold: 0 }); // Trigger as soon as any part is visible

        quoteElements.forEach(el => {
            el.classList.add('reveal-text'); // Add initial class
            quoteObserver.observe(el);
        });
    }

    // Team Section Animation
    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add active class to the grid or section to trigger children transitions
                    const grid = entry.target.querySelector('.team-grid');
                    if (grid) grid.classList.add('active');
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% visible

        teamObserver.observe(teamSection);
        teamObserver.observe(teamSection);
    }

    // Generic Fade-in-up Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in-up');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            accordions.forEach(otherItem => {
                otherItem.classList.remove('active');
                const content = otherItem.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Business Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button and target panel
                btn.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    /* Blog Section Tab Filtering */
    const blogTabs = document.querySelectorAll('.blog-tab');
    const blogCards = document.querySelectorAll('.blog-card');

    if (blogTabs.length > 0) {
        blogTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                blogTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                blogCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* Blog Sidebar Filtering Logic */
    const sidebarCategoryLinks = document.querySelectorAll('.category-list a');

    if (sidebarCategoryLinks.length > 0 && blogCards.length > 0) {
        // Function to filter posts
        const filterPosts = (filterValue) => {
            // Update Active State
            sidebarCategoryLinks.forEach(link => {
                if (link.getAttribute('data-filter') === filterValue) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Update Breadcrumb
            const breadcrumbSpan = document.querySelector('.current-cat');
            if (breadcrumbSpan) {
                breadcrumbSpan.textContent = filterValue === 'all' ? 'All Posts' : filterValue;
            }

            // Filter Cards
            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Re-trigger animation if present (optional, depends on CSS)
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // Click Event Listener
        sidebarCategoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = link.getAttribute('data-filter');

                // Update URL query param without reloading
                const newUrl = new URL(window.location);
                if (filter === 'all') {
                    newUrl.searchParams.delete('category');
                } else {
                    newUrl.searchParams.set('category', filter);
                }
                window.history.pushState({}, '', newUrl);

                filterPosts(filter);
            });
        });

        // Check URL on Load
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            filterPosts(categoryParam);
        }
    }

    /* Blog Search Functionality */
    const searchInput = document.getElementById('blogSearchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        // Blog Post Data
        const blogPosts = [
            { title: "The Rise of the Digital Conglomerate", url: "./riseOfDigital.html" },
            { title: "The Polymath Advantage", url: "./polyMath.html" },
            { title: "The Phygital Revolution", url: "./pygitalRev.html" },
            { title: "The Metaverse Economy", url: "./metaVerse.html" },
            { title: "Manufacturing Renaissance", url: "./manuRen.html" },
            { title: "From Artificial to Augmented Intelligence", url: "./fromArti.html" },
            { title: "Banking Beyond Banking", url: "./banking.html" },
            { title: "Subscription Economics", url: "./subEco.html" },
            { title: "Why Strategy, Technology, and Talent Must Evolve in Concert", url: "./whyStra.html" },
            { title: "The Quantum Horizon", url: "./quantumHori.html" },
            { title: "The Renaissance of Human-Centred Business Models", url: "./renaissance.html" }
        ];

        // Search Input Event Listener
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = ''; // Clear previous results

            if (query.length > 0) {
                const filteredPosts = blogPosts.filter(post =>
                    post.title.toLowerCase().includes(query)
                );

                if (filteredPosts.length > 0) {
                    searchResults.classList.add('active');
                    filteredPosts.forEach(post => {
                        const link = document.createElement('a');
                        link.href = post.url;
                        link.classList.add('search-result-item');
                        link.textContent = post.title;
                        searchResults.appendChild(link);
                    });
                } else {
                    searchResults.classList.add('active');
                    const noResult = document.createElement('div');
                    noResult.classList.add('no-results');
                    noResult.textContent = 'No matching posts found.';
                    searchResults.appendChild(noResult);
                }
            } else {
                searchResults.classList.remove('active');
            }
        });

        // Close dropdown when clicking outside
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    } // End of Blog Search Logic

    // Dynamic Footer Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Stats Count-Up Animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = +stat.getAttribute('data-target');
                    const smallTag = stat.querySelector('small');
                    const suffix = smallTag ? smallTag.outerHTML : ''; // Save suffix (yrs/+)

                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            stat.innerHTML = Math.ceil(count) + suffix;
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.innerHTML = target + suffix;
                        }
                    };

                    updateCount();
                    statsObserver.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
});
