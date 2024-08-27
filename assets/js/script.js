
//Javascript for toggle menu//

var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";   
}
function hideMenu(){
    navLinks.style.right = "-200px";
};


const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 4000,
        disableOnInteraction:false
    },
loop: true,

pagination: {
el: '.swiper-pagination',
clickable: true,
},

navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
},

});



/*delete this to get rid of scrolldown effect on title
const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
})

sr.reveal('.text-box',{delay:200, origin:'top'});

// Listen for window resize events
window.addEventListener('resize', function(){
    // Reset ScrollReveal
    sr.sync();
});

*/