var modal = document.querySelector(".focus-modal");
var modalButton = document.querySelector(".focus-modal-button");
var modalOverlay = document.querySelector(".focus-modal-overlay");
var cancelButton = document.querySelector(".focus-modal-cancel");

modalButton.addEventListener("click", open);
cancelButton.addEventListener("click", close);

function open() {
  // Initialize the element that was focused prior to modal open
  var previouslyFocused = document.activeElement;

  // Add event listener using keydown and custom function
  modal.addEventListener("keydown", trapTabKey);

  // Add event listener for click
  modalOverlay.addEventListener('click', close);

  // Get list of all focusable elements
  var focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]');

  focusableElements = Array.prototype.slice.call(focusableElements);

  // Initialize first and last focusable elements
  var firstItem = focusableElements[0];
  var lastItem = focusableElements[focusableElements.length - 1];

  // Show the modal and overlay
  modal.style.display = "block";
  modalOverlay.style.display = "block";

  // Auto focus on first item
  firstItem.focus();

  function trapTabKey(event) {
    if (event.keyCode === 9) {
      // Shift tab
      if (event.shiftKey) {
        // Backwards
        if (document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        }
        // Tab
      } else {
        // Forwards
        if (document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
      // Escape
    } else if (event.keyCode === 27) {
      close();
    }
  }
}

function close() {
  // Hide the modal and overlay
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}
