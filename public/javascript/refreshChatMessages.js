$(document).ready(function () {
    setInterval(function () {
        $( "#here" ).load(window.location.href + " #here" );
    }, 1000);
});