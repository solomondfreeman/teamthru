/**
 * @file
 * Back to top button functionality.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Back to top button behavior.
   */
  Drupal.behaviors.teamthruBackToTop = {
    attach: function (context, settings) {
      once('back-to-top', '.back-to-top', context).forEach(function (button) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
          if (window.scrollY > 300) {
            button.classList.add('is-visible');
          } else {
            button.classList.remove('is-visible');
          }
        });

        // Scroll to top on click
        button.addEventListener('click', function () {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      });
    }
  };

})(Drupal, once);
