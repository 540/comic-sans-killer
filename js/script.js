var allDomeElements = document.getElementsByTagName("*");

for (var i=0, max=allDomeElements.length; i < max; i++) {
    if (window.getComputedStyle( allDomeElements[i], null ).getPropertyValue( 'font-family' ).indexOf("Comic Sans MS") != -1) {
        console.log('Heyyyy man!! Comic Sans detected!!!');

        var alert = document.createElement("div");
        alert.setAttribute("id","comic-sans-alert");
        alert.className = "alert alert-danger";
        alert.innerHTML = '<strong>Danger!</strong> This page has Comic Sans';

        document.body.insertBefore(alert, document.body.firstChild);

        break;
    }
}
