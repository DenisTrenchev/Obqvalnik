$(document).ready(function () {
    setInterval(function () {
        $( "#here" ).load(window.location.href + " #here" );
        $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    }, 1000);
});
//window.scrollTo(0,document.querySelector(".here").scrollHeight);
//window.scrollTo(0,document.body.scrollHeight);
//$('html,body').animate({scrollTop: document.body.scrollHeight},"fast");

