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
 * Generates HTML markup for the impressum (legal notice) section.
 * Includes contact information, legal disclaimers, and copyright details.
 * @returns {string} The HTML string for the impressum section.
 */
function createHtmlImpressum() {
    return `
    <div class="impressum-test">
        <button class="impressum-b" onclick="impressumBack()">Back</button>
        <div class='impressum'><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Sebastian Peters <br> 
            Hamburger Allee 31<br> 
            30161 Hannover <br> 
            </p><p> <strong>Vertreten durch: </strong><br>
                Sebastian Peters<br>
            </p><p><strong>Kontakt:</strong> <br>
                Telefon: 0160-97596360<br>
                E-Mail: <a href='mailto:mech.Peters@mail.de'>mech.Peters@mail.de</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Haftung für Links</strong><br><br>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
            </p><br> 
            Impressum vom <a href="https://www.impressum-generator.de">Impressum Generator</a> der <a href="https://www.kanzlei-hasselbach.de/">Kanzlei Hasselbach, Rechtsanwälte für Arbeitsrecht und Familienrecht</a>
        </div>
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

/**
 * Generates HTML markup for the Datenschutz (privacy policy) section.
 * @returns {string} The HTML string for the Datenschutz section.
 */
function createHtmlDatenschutz() {
    return `
    <div class="impressum-test">
        <button class="impressum-b" onclick="impressumBack()">Back</button>
        <div class='impressum'><h1>1. Datenschutz auf einen Blick</h1><p>Allgemeine Hinweise</p>
            <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
                Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
            <h1>Datenerfassung auf dieser Website</h1>
            <p>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
            <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
            </p>
            <p>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
            <p>Wie erfassen wir Ihre Daten?</p>
            <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
                Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p>
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere ITSysteme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit
                des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
            <p>Wofür nutzen wir Ihre Daten?</p>
            <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
                Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden
            </p>
            <p>Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
            <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
                können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
            <h1>Analyse-Tools und Tools von Drittanbietern</h1>
            <p>
                Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor
                allem mit sogenannten Analyseprogrammen.
                <br>
                Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden
                Datenschutzerklärung.
            </p>
            <h1>2. Allgemeine Hinweise und Pflichtinformationen</h1>
            <p>Datenschutz</p>
            <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
                Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
                und zu welchem Zweck das geschieht.
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                möglich.
            </p>
            <p>Hinweis zur verantwortlichen Stelle</p>
            <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                [Voller Namen bzw. die vollständige Unternehmensbezeichnung des Website-Betreibers sowie die
                vollständige Anschrift]
                <p>Telefon: 0160-97596360</p>
                <p>E-Mail: mech.Peters@mail.de</p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
                die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.)
                entscheidet.
            </p>
            <p>Speicherdauer</p>
            <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
                personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
            <p>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</p>
            <p>
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien
                nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung
                personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art.
                49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in
                Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich
                auf Grundlage von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
                Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre
                Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese
                zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
                Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f
                DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden
                Absätzen dieser Datenschutzerklärung informiert.
            </p>
            <p>Empfänger von personenbezogenen Daten</p>
            <p>
                Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei
                ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich.
                Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer
                Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten
                an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe
                haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von
                Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen
                Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über
                gemeinsame Verarbeitung geschlossen.
            </p>
            <p>Widerruf Ihrer Einwilligung zur Datenverarbeitung</p>
            <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
            <p>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</p>
            <p>
                WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
                ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN
                SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN
                WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES
                PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
                ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN,
                WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
                SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG
                NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
                VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
                RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>
            <p>
                WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN,
                SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE
                BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG
                EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN
                VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
                ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH
                NACH ART. 21 ABS. 2 DSGVO).
            </p>
            <p>Beschwerderecht bei der zuständigen Aufsichtsbehörde</p>
            <p>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
                oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
                verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe
            </p>
            <p>Recht auf Datenübertragbarkeit</p>
            <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
                aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
                verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>
            <p>Auskunft, Berichtigung und Löschung</p>
            <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
                Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
                zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>
            <p>Recht auf Einschränkung der Verarbeitung</p>
            <p>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
                folgenden Fällen:
            </p>
            <li>
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir
                in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </li>
            <br>
            <li>
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
                statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
            </li>
            <br>
            <li>
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </li>
            <br>
            <li>
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen
                Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
                überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                zu verlangen.
            </li>
            <p>
                Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
                ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
                Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
                juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder
                eines Mitgliedstaats verarbeitet werden
            </p>
            <p>Widerspruch gegen Werbe-E-Mails</p>
            <p>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von
                nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die
                Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
                Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
            <p>Quelle:</p>
            <a href="https://www.e-recht24.de/">www.e-recht24.de</a>
        </div>
    </div>
    `;
}