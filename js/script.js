function showImpressum() {
    deleteBackgroundImage();
    const cardimpressum = createHtmlImpressum();
    const getplaceimpressum = document.getElementById('fullscreen');
    const getplaceinput = document.getElementById('place_input');
    getplaceimpressum.innerHTML = cardimpressum;
    getplaceinput.innerHTML = createImpressumHtml();
}

function showDatenschutz() {
    deleteBackgroundImage();
    const cardDatenschutz = createHtmlDatenschutz();
    const getplaceDatenschutz = document.getElementById('fullscreen');
    const getplaceInput = document.getElementById('place_input');
    getplaceDatenschutz.innerHTML = cardDatenschutz;
    getplaceInput.innerHTML = createDatenschutzHtml();
}

function reLoad() {
    location.reload();
}

function deleteBackgroundImage() {
    let body = document.getElementById(`body`);
    body.style.background = `none`;
    body.style.width = `100%`;
    body.style.height = `100%`;
    body.style.paddingBottom = `80px`;
}

function openMenu() {
    let menu = document.getElementById(`place_top_menu`);
    let menubutton = document.getElementById(`menu`);
    menu.classList.remove(`d-none`);
    menubutton.classList.add(`d-none`);
}

function noCloseContent(event) {
    event.stopPropagation();
}

function closeMenu() {
    let menu = document.getElementById(`place_top_menu`);
    let menubutton = document.getElementById(`menu`);
    menu.classList.add(`d-none`);
    menubutton.classList.remove(`d-none`);
}

function descript() {
    let descript = document.getElementById(`show_descript`);
    descript.classList.remove(`d-none`);
}

function descriptBack() {
    let descript = document.getElementById(`show_descript`);
    descript.classList.add(`d-none`);
}

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

window.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});