/**
 * @file
 * Navigation functionality for TeamThru theme.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Mobile navigation toggle behavior.
   */
  Drupal.behaviors.teamthruNavigation = {
    attach: function (context, settings) {
      // Mobile menu toggle
      once('mobile-menu', '.menu-toggle', context).forEach(function (toggle) {
        // Find the main navigation element
        const mainNav = document.querySelector('.main-nav');
        const overlay = document.querySelector('.nav-overlay');

        if (!mainNav) {
          console.warn('TeamThru: Could not find .main-nav element');
          return;
        }

        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          const isOpen = toggle.classList.contains('is-active');

          // Toggle classes on toggle button
          toggle.classList.toggle('is-active');
          
          // Toggle the main navigation visibility
          mainNav.classList.toggle('is-open');
          
          // Also add class to body for additional CSS control
          document.body.classList.toggle('mobile-menu-open');

          if (overlay) {
            overlay.classList.toggle('is-visible');
          }

          // Update ARIA attributes
          toggle.setAttribute('aria-expanded', !isOpen);

          // Prevent body scroll when menu is open
          document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close menu when clicking overlay
        if (overlay) {
          overlay.addEventListener('click', function () {
            closeMenu(toggle, mainNav, overlay);
          });
        }
      });

      // Helper function to close menu
      function closeMenu(toggle, mainNav, overlay) {
        if (toggle) {
          toggle.classList.remove('is-active');
          toggle.setAttribute('aria-expanded', 'false');
        }
        if (mainNav) {
          mainNav.classList.remove('is-open');
        }
        if (overlay) {
          overlay.classList.remove('is-visible');
        }
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
      }

      // Add toggle buttons for dropdown menus on mobile
      once('dropdown-toggle-btn', '.main-nav .menu-item--expanded', context).forEach(function (menuItem) {
        // Check if toggle button already exists
        if (menuItem.querySelector('.submenu-toggle')) return;
        
        // Create a toggle button for the submenu
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'submenu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle submenu');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<span class="submenu-toggle__icon"></span>';
        
        // Insert the button after the link
        const link = menuItem.querySelector(':scope > a');
        if (link) {
          link.after(toggleBtn);
        }
        
        // Toggle submenu when button is clicked
        toggleBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          const isOpen = menuItem.classList.contains('is-open');
          menuItem.classList.toggle('is-open');
          toggleBtn.setAttribute('aria-expanded', !isOpen);
        });
      });

      // Close menu on window resize to desktop
      let resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (window.innerWidth >= 992) {
            const toggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const overlay = document.querySelector('.nav-overlay');

            if (toggle) toggle.classList.remove('is-active');
            if (mainNav) mainNav.classList.remove('is-open');
            if (overlay) overlay.classList.remove('is-visible');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            
            // Close all submenus
            document.querySelectorAll('.menu-item--expanded.is-open').forEach(function(item) {
              item.classList.remove('is-open');
              const btn = item.querySelector('.submenu-toggle');
              if (btn) btn.setAttribute('aria-expanded', 'false');
            });
          }
        }, 100);
      });

      // Close menu on escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          const toggle = document.querySelector('.menu-toggle');
          const mainNav = document.querySelector('.main-nav');
          const overlay = document.querySelector('.nav-overlay');

          if (toggle && toggle.classList.contains('is-active')) {
            closeMenu(toggle, mainNav, overlay);
          }
        }
      });
      
      // Close menu when clicking a menu link (allow navigation)
      once('menu-link-close', '.main-nav .menu a', context).forEach(function (link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth < 992) {
            const toggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const overlay = document.querySelector('.nav-overlay');
            
            // Small delay to allow navigation to start
            setTimeout(function() {
              if (toggle) {
                toggle.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
              }
              if (mainNav) {
                mainNav.classList.remove('is-open');
              }
              if (overlay) {
                overlay.classList.remove('is-visible');
              }
              document.body.classList.remove('mobile-menu-open');
              document.body.style.overflow = '';
            }, 100);
          }
        });
      });
    }
  };

  /**
   * Smooth scroll for anchor links.
   */
  Drupal.behaviors.teamthruSmoothScroll = {
    attach: function (context, settings) {
      once('smooth-scroll', 'a[href^="#"]', context).forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');

          if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            const toggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            if (toggle && toggle.classList.contains('is-active')) {
              toggle.classList.remove('is-active');
              toggle.setAttribute('aria-expanded', 'false');
            }
            if (mainNav) {
              mainNav.classList.remove('is-open');
            }
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
          }
        });
      });
    }
  };

})(Drupal, once);
