NOTES:

Types of Disabilities:
  * Attention-Deficit/Hyperactivity Disorders
  * Blindness or Low Vision
  * Brain Injuries
  * Deaf/Hard-of-hearing
  * Learning Disabilities
  * Physical Disabilities
  * Speech and Language Disabilities

Intro takeaways:
  * All websites should be Perceivable, Operable, Understandable and Robust
  * Custom components are a big area that needs accessibility coverage. Making your own checkbox or button can negate the built it accessibile functionality that comes with HTML elements

WebAim Checklist:
  * Awesome checklist broken up by element/content type
    * https://webaim.org/standards/wcag/checklist

SECTIONS:

Keyboard Navigation:
  * Major sites have implemented keyboard shortcuts for quick actions (Twitter, Reddit etc - use shift+? to see)
  * Tabable elements by default
    * '<a>'
    * '<button>'
    * '<input>'
    * '<select>'
    * '<textarea>'
    * '<iframe>'
  * Tabindex values
    * a negative value means the element is focusable but not reachable via keyboard Navigation
    * 0 (zero) means the element should be focusable and reachable with keyboard navigation.
    * a positive value means focusable and reachable with keyboard navigation. Relative order is defined by the value of the attribute. If elements share a same tabindex then it will go in order by position in the document
  * Skip Links
    * WebAim technique page: https://webaim.org/techniques/skipnav/
    * Checkout nytimes.com - They have an awesome 'Skip to navigation' and 'Skip to Site Index' links once you start tabbing on the page
    * Great way to allow users to skip to important parts of the content.

Focus Control:
  * Easy way to identify which element is selected `var currentElement = document.activeElement`
  * Great way to use `document.activeElement` is with modals or something that temparily navigates the user away. Using the currentElement can bring the focus back to the element that led to the temp navigation.
  * Tabtrapping - trap/restrict the user focus/keyboard movement inside the modal/popup
    * Select your modal
    * Find and select all focusable childdren
    * Convert them to an array
    * Find the first and last tabbable item inside modal
    * Listen for keydown event
    * Check to see if its the tab key or shift+tab
    * If moving forward and on the last item => focus the first item
    * If moving backward and on the first item => focus the last item
  * Look at `focusable` module. Which simply returns a string of all focusable elements to use with selecto
    * a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]

Screen Readers:
  * Most popular desktop screen Readers
    * JAWS (W)
    * ZoomText (Mac & W)
    * Window-Eyes (W)
    * NVDA (W)
    * VoiceOver (Mac)
    * ChromeVox (Browser)
  * Alternative text
    * Be accurate
    * Be succinct
    * Don't be redundant
    * Don't use "image of" or "graphic of"
      * alt="" intentionally skip element with empty string
      * USE THIS WITH DECORATIVE IMAGES THAT ADD NO CONTENT
    * Hiding from screenreaders
      * 'display: none' 'visibility: hidden' '<input hidden/>'
  * Labels:
    * ari-labelledby - this can take in multiple elements such as 'billing name'
    * aria-roles 
    * aria-roles listing: https://www.w3.org/WAI/PF/aria/roles

Semantic HTML:
  * Make sure the language is defined in the HTML lang attribute (<html lang="eng">)
  * Elements with inherited functionality should used
    * If recreate a element then make sure it has the same functionality of what you replaced
  * HTML Headers (option + ctrl + u) when using screen reader/voice over

ARIA:
  * Example of needing to use a '<span class="button>Click Me </span>' as a button and what it would need to be compliant
    * Add a role => 'role="button"' spans are not focusable 
    * Add a tabindex => 'tabindex="0"' spans are not tabbable
    * Add an onClick() listener => onclick="btnClicked()"'
    * Add an onKeyUp() listener => onKeyUp="btnClicked()"'
  * ARIA-DESCRIBEDBY
    * Used for longer descriptions are actions or navigation that are longer than a label should be
  * ARIA CSS Selectors
    * .dropdown[aria-expanded="false"] .icon::after { content: '>'; }
  * ARIA-LIVE
    * Regions on the site that are more focused and interactive
    * Regions that will have updates
      * aria-live = "off/polite/assertive"
      * aria-relevant = "additions/removals/text/all"

Color:
  * NoCoffee * Chrome extension that is a vision simulator for understanding the problems faced by people with slight to extreme vision problems.
    * https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl
  * Color is not used as sole method of conveying content or distinguishing visual elements.
  * Should not distinguish links only by being blue to be be compliant.

Tools:
  * Chrome Accessibility Developer tools
  * Tenon.io - Accessibility as a service - https://tenon.io/
    * API to be integrated with build pipeline to identify and test accessibility'
  * Tota11y - accessibility visualization toolkit - https://khan.github.io/tota11y/
    * Can add to any site for interactive accessibility visualization audit'
  * React - react-a11y - static analysis while developing
  * Get keycode info quickly - http://keycode.info/


Auditing Sites and Q&A:
  * Dropdown with flyouts should only show when the dropdown is enabled
    * Use javascript to assert tabindex to child elements when parent dropdown is activated
  * Starbucks.com - awesome navigation with keyboard functionality
  * Safari browser has another layer of accessibility preferences that can be the reason why features are not working during testing (2017)
