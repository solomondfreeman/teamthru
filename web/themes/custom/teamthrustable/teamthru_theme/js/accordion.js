/**
 * @file
 * Accordion functionality.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Accordion behavior.
   */
  Drupal.behaviors.teamthruAccordion = {
    attach: function (context, settings) {
      once('accordion', '.accordion__header', context).forEach(function (header) {
        header.addEventListener('click', function () {
          const item = header.parentElement;
          const isOpen = item.classList.contains('is-open');

          // Toggle current item
          item.classList.toggle('is-open');

          // Update ARIA attributes
          const content = item.querySelector('.accordion__content');
          if (content) {
            header.setAttribute('aria-expanded', !isOpen);
            content.setAttribute('aria-hidden', isOpen);
          }
        });
      });
    }
  };

})(Drupal, once);
