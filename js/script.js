// function setFooter() {
//     let footer = creatFooterHtml();
//     let getPlaceFooter = document.getElementById(`footer`);
//     getPlaceFooter.innerHTML = footer;
// }

/**
 * Displays the Impressum (legal notice) content on the page.
 */
function showImpressum() {
    deleteBackgroundImage();
    let cardimpressum = createHtmlImpressum();
    let getplaceimpressum = document.getElementById('fullscreen');
    getplaceimpressum.innerHTML = cardimpressum;
}

/**
 * Displays the Datenschutz (privacy policy) content on the page.
 */
function showDatenschutz() {
    deleteBackgroundImage();
    let cardDatenschutz = createHtmlDatenschutz();
    let getplaceDatenschutz = document.getElementById('fullscreen');
    getplaceDatenschutz.innerHTML = cardDatenschutz;
}

/**
 * Reloads the current page.
 */
function impressumBack() {
    location.reload();
}

/**
 * Removes the background image from the body and sets its size to cover the full viewport.
 */
function deleteBackgroundImage() {
    let body = document.getElementById(`body`);
    body.style.background = 'none';
    body.style.width = `100%`;
    body.style.height = `100%`;
    // body.style.paddingBottom = `80px`;
}

// function impressumBack() {
//     setBackgroundImage();
//     let getplaceDatenschutz = document.getElementById('fullscreen');
//     getplaceDatenschutz.innerHTML = '';
// }

// function setBackgroundImage() {
//     let body = document.getElementById('body');
//     body.style.backgroundImage = 'url("img/5_background/desert-background.jpg")';
//     body.style.width = '';
//     body.style.height = '100vh';
// }

/**
* Shows the menu by removing the 'd-none' class from it and hides the menu button.
 */
function openMenu() {
    let menu = document.getElementById(`place_top_menu`);
    let menubutton = document.getElementById(`menu`);
    menu.classList.remove(`d-none`);
    menubutton.classList.add(`d-none`);
}

/**
 * Prevents the event from propagating to parent elements.
 * @param {object} event - The event object to be handled. 
 */
function noCloseContent(event) {
    event.stopPropagation();
}

/**
 * Hides the top menu and shows the menu button.
 */
function closeMenu() {
    let menu = document.getElementById(`place_top_menu`);
    let menubutton = document.getElementById(`menu`);
    menu.classList.add(`d-none`);
    menubutton.classList.remove(`d-none`);
}

/**
 * Shows the description by removing the "d-none" class.
 */
function descript() {
    let descript = document.getElementById(`show_descript`);
    descript.classList.remove(`d-none`);
}

/**
 * Hides the description by adding the "d-none" class.
 */
function descriptBack() {
    let descript = document.getElementById(`show_descript`);
    descript.classList.add(`d-none`);
}

/**
 * Hides or shows an element based on the device's orientation.
 * - Hides the element when in landscape mode (90° or -90°).
 * - Shows the element when in portrait mode (other angles)
 */
window.addEventListener("orientationchange", function () {
    let oversrceen = document.getElementById(`show_field`);
    switch (window.orientation) {
        case -90: case 90:
            oversrceen.classList.add(`d-none`);
            break;
        default:
            oversrceen.classList.remove(`d-none`);
    }
});

/**
 * Prevents the context menu from appearing on right-click for images.
 * @param {Event} e - The event object representing the right-click action.
 */
window.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
