document.addEventListener("DOMContentLoaded", function(){
    
    var isMobile = mobileDeviceChecker();
    var previousBtn = document.getElementById('previous_btn');
    var nextBtn = document.getElementById('next_btn');
    var sliderContainer = document.getElementById('slider_container');
    slide1[0].style.transform = 'translate3d('+w+'px,0,0)';
    slide2[0].style.transform = 'translate3d('+w+'px,0,0)';
    slide3[0].style.transform = 'translate3d(-'+w+'px,0,0)';

    nextBtn.addEventListener('click',function(){
        var currentSlide = retrieveCurrentSlide();
        next(currentSlide);
    });

    previousBtn.addEventListener('click',function(){
        var currentSlide = retrieveCurrentSlide();
        previous(currentSlide);
    });

    slideshow = setInterval(changeSlide, 3000);
    progress  = setInterval(progressBar, 10);

    sliderContainer.addEventListener('mouseover',function(){
        clearInterval(progress);
        clearInterval(slideshow);
    },false);
    
    sliderContainer.addEventListener('mouseout',function(){
        updateProgressBarWidth();
        slideshow = setInterval(changeSlide, 3000);
        progress  = setInterval(progressBar, 10);
    },false); 
    
    if(isMobile) {
        
        sliderContainer.on('swipeleft',function(e){
            var currentSlide = retrieveCurrentSlide();
            next(currentSlide);
        });
        
        sliderContainer.on('swiperight',function(e){
            var currentSlide = retrieveCurrentSlide();
            previous(currentSlide);
        });

    }

});

var currentCard = 0;
var w = window.innerWidth;
var slideshow, progress;
var progressBarWidth = 0
var slide0 = document.getElementsByClassName('slide0');
var slide1 = document.getElementsByClassName('slide1');
var slide2 = document.getElementsByClassName('slide2');
var slide3 = document.getElementsByClassName('slide3');
var slides = [{'key': '0','slide': slide0}, {'key': '1','slide': slide1},{'key': '2','slide': slide2},{'key': '3','slide': slide3}];

function changeSlide() {
    var currentSlide = retrieveCurrentSlide();
    next(currentSlide);
}

function retrieveCurrentSlide() {
    for(var i in slides) {
        var className = slides[i]['slide'][0].className;
        if(RegExp('\\bactive\\b').test(className)) {
            return slides[i];
        }
    } 
}

function next(currentSlide) { 
    var slideToDisplay, nextSlide, previousSlide, currentSlidekey, lastSlide, firstSlide;
    currentSlidekey = currentSlide['key'];
    firstSlide = 0;
    lastSlide = slides.length - 1;
    previousSlide =  currentSlide;
    if(currentSlidekey == slides[lastSlide]['key']) {
        slideToDisplay = slides[firstSlide];
        firstSlide++;
        nextSlide = slides[firstSlide];
    } else {
        currentSlidekey++;
        slideToDisplay = slides[currentSlidekey];
        currentSlidekey++;
        if(currentSlidekey > lastSlide) {
            nextSlide = slides[firstSlide];
        } else {
            nextSlide = slides[currentSlidekey];
            
        }
        
    }
    updateSlide(previousSlide,slideToDisplay,nextSlide,'next');
}

function previous(currentSlide) {
    var slideToDisplay, nextSlide, previousSlide, currentSlidekey, lastSlide, firstSlide;
    currentSlidekey = currentSlide['key'];
    firstSlide = 0;
    lastSlide = slides.length - 1;
    previousSlide =  currentSlide;
    if(currentSlidekey == slides[firstSlide]['key']) {
        slideToDisplay = slides[lastSlide];
        lastSlide--;
        nextSlide = slides[lastSlide];
    } else {
        currentSlidekey--;
        if(currentSlidekey < 0 ) {
            slideToDisplay = slides[lastSlide];
        } else {
            slideToDisplay = slides[currentSlidekey]; 
        }
        currentSlidekey--;
        if(currentSlidekey < 0) {
            nextSlide = slides[lastSlide];
        } else {
            nextSlide = slides[currentSlidekey];
            
        }
        
    }
    updateSlide(previousSlide,slideToDisplay,nextSlide,'previous');
}

function updateSlide(p,d,n,e) {
    p['slide'][0].style.opacity = 1;
    if(e === 'previous') {
        p['slide'][0].style.transform = 'translate3d('+w+'px,0,0)';
    } else {
         p['slide'][0].style.transform = 'translate3d(-'+w+'px,0,0)';
    }
    d['slide'][0].style.opacity = 1;
    d['slide'][0].style.transform = 'translate3d(0,0,0)';
    n['slide'][0].style.opacity = 0;
    if(e === 'previous') {
       n['slide'][0].style.transform = 'translate3d(-'+w+'px,0,0)'; 
    } else {
        n['slide'][0].style.transform = 'translate3d('+w+'px,0,0)';
    }
    
    updateSlideClass(p,d);
    updateSlideGalleryClass();
}

function updateSlideClass(p,d) {
    var removeActiveClass = (p['slide'][0].className).split(' ');
    removeActiveClass = removeActiveClass[0] + ' ' + removeActiveClass[1];
    p['slide'][0].className = removeActiveClass;
    d['slide'][0].classList.add('active');
    updateProgressBarWidth();
}

function updateSlideGalleryClass() {
    var activeClass = document.getElementsByClassName('sgc active');
    var ac = (activeClass[0].className).split(' ');
    var removeActive = ac[0] + ' ' + ac[1];
    activeClass[0].className = removeActive;
    var currentSlide = retrieveCurrentSlide();
    switch(currentSlide['key']) {
        case '0':
            (document.getElementsByClassName('sgc-0'))[0].classList.add('active');
            break;
        case '1': 
            (document.getElementsByClassName('sgc-1'))[0].classList.add('active');
            break;
        case '2':
            (document.getElementsByClassName('sgc-2'))[0].classList.add('active');
            break;
        case '3':
            (document.getElementsByClassName('sgc-3'))[0].classList.add('active');
            break;
    }
    
}

function progressBar() {
    if(progressBarWidth < 99.64) {
        progressBarWidth += .0833;
        document.getElementsByClassName('sg-progressbar')[0].style.width = progressBarWidth + '%';
    } else {
        progressBarWidth = 0;
    }
}

function updateProgressBarWidth() {
    var currentSlide = retrieveCurrentSlide();
    switch(currentSlide['key']) {
        case '0':
            progressBarWidth = 0;
            break;
        case '1': 
            progressBarWidth = 25;
            break;
        case '2':
            progressBarWidth = 50;
            break;
        case '3':
            progressBarWidth = 75;
            break;
    }
}

function updateWindowWidth() {
    w = window.innerWidth;
}

 function mobileDeviceChecker() {
     var isMobile = {
         Android: function() {
             return navigator.userAgent.match(/Android/i);
         },
         BlackBerry: function() {
             return navigator.userAgent.match(/BlackBerry/i);
         },
         iOS: function() {
             return navigator.userAgent.match(/iPhone|iPad|iPod/i);
         },
         Opera: function() {
             return navigator.userAgent.match(/Opera Mini/i);
         },
         Windows: function() {
             return navigator.userAgent.match(/IEMobile/i);
         },
         any: function() {
             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
         }
     };
     if(isMobile.any()) {
         return true;
     }
 }