var allDomeElements = document.getElementsByTagName("*");

for (var i=0, max=allDomeElements.length; i < max; i++) {
    if (window.getComputedStyle( allDomeElements[i], null ).getPropertyValue( 'font-family' ).indexOf("Comic Sans MS") != -1) {
        var alert = document.createElement("div");
        alert.setAttribute("id","csk-alert");
        alert.className = "csk-alert csk-alert-danger";
        alert.innerHTML = '<strong>DANGER!</strong> This page is using Comic Sans font.';

        document.body.insertBefore(alert, document.body.firstChild);

        break;
    }
}
