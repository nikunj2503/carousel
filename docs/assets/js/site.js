$(document).ready(function() {
    
    var isMobile = mobileDeviceChecker();
    
    $('.previous').click(function(){
        previous();
    });
    
    $('.next').click(function(){
        next('click');
    });
    
    progress  = setInterval(progressBar, 10);
    slideshow = setInterval(next, 3000);
    
    $('.slider-container').mouseenter(function() {
        clearInterval(progress);
        clearInterval(slideshow);
    })
    .mouseleave(function() {
        updateProgressBarWidth();
        progress  = setInterval(progressBar, 10);
        slideshow = setInterval(next, 3000);
    });
    
    if(isMobile) {
        
        $('.slider-container').on('swipeleft',function(e){
            previous();
        });
    
        $('.slider-container').on('swiperight',function(e){
            next('swipe');
        });
        
    }
    
});

var currentCard = 1;
var progressBarWidth = 0;
var slideshow, progress;

function previous() {
    if(currentCard > 1) {
        currentCard--;
        var previousCard = currentCard + 1;
        updateCard(currentCard,previousCard);
        updateProgressBarWidth();
    } else if(currentCard === 1) {
        currentCard = 4;
        var previousCard = 1;
        updateCard(currentCard,previousCard);
    }
}

function next(eventType) {
    if(currentCard < 4) {
        currentCard++;
        var previousCard = currentCard - 1;
        updateCard(currentCard,previousCard);
        updateProgressBarWidth();
    } else if(currentCard === 4) {
        currentCard = 1;
        var previousCard = 4;
        if(eventType === 'undefined') {
            console.log(eventType);
            clearInterval(progress);
            progressBarWidth = 0;
            progress  = setInterval(progressBar, 10);
        }
        updateCard(currentCard,previousCard);
    }
}

function updateCard(nextCard, previousCard) {
    document.getElementsByClassName('sc-'+previousCard)[0].style.display = 'none';
    var previousGalleryCard = document.getElementsByClassName('sgc-'+previousCard);
    var pgcClassName = previousGalleryCard[0].className.split(' ');
    previousGalleryCard[0].className = pgcClassName[0] + ' ' + pgcClassName[1];
    document.getElementsByClassName('sc-' +nextCard)[0].style.display = 'flex';
    var nextGalleryCard = document.getElementsByClassName('sgc-' +nextCard);
    nextGalleryCard[0].className = nextGalleryCard[0].className + ' active';
}

function progressBar() {
    if(progressBarWidth < 99.64) {
        progressBarWidth += .0833;
        document.getElementsByClassName('sg-progressbar')[0].style.width = progressBarWidth + '%';
    }
}

function updateProgressBarWidth() {
    var slides = document.getElementsByClassName('sc');
    for(i = 0; i < slides.length; i++) {
        if(slides[i].style.display == 'flex') {
            var slideClassName = (slides[i].className).split(' ');
            switch(slideClassName[1]) {
                case 'sc-1':
                    progressBarWidth = 0;
                    break;
                case 'sc-2': 
                    progressBarWidth = 25;
                    break;
                case 'sc-3':
                    progressBarWidth = 50;
                    break;
                case 'sc-4':
                    progressBarWidth = 75;
                    break;

            }
        }
    }
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


