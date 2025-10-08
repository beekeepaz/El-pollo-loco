function creatFooterHtml() {
    return `
        <div class="place-footer-elements">
            <a href="https://www.flaticon.com/free-icons/speaker" title="speaker icons">Flaticon</a>
            <div class="the-line"></div>
            <a target="_blank" href="https://icons8.com/icon/10389/sombrero"></a><a target="_blank"
                href="https://icons8.com">Icons8</a>
            <div class="the-line"></div>
            <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=22922">Pixabay</a>
        </div>
        <div class="place-footer-elements">
            <a onclick="showDatenschutz()" href="#">Datenschutz</a>
            <div class="the-line"></div>
            <a onclick="showImpressum()" href="#">Impressum</a>
        </div>
    `;
}

/**
 * Generates HTML markup for the impressum section.
 * Includes a back button that reloads the page when clicked.
 * @returns {string} The HTML string for the impressum section.
 */
function createImpressumHtml() {
    return `
        <div class="place-impressum">
            <button class="original-button color-btn" onclick="reLoad()">back</button>
        </div>
    `;
}

/**
 * Generates HTML markup for the Datenschutz (privacy policy) section.
 * Includes a back button that reloads the page when clicked.
 * @returns {string} The HTML string for the Datenschutz section.
 */
function createDatenschutzHtml() {
    return `
        <div class="place-impressum">
            <button class="original-button color-btn" onclick="reLoad()">back</button>
        </div>
    `;
}
