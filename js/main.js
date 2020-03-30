'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
  let currentIndex = 0;

  

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    if(index === currentIndex) {
      li.classList.add('current');
    }
    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  

  let timeoutId;

  let check = 0;
  function playSlideshow() {
    let target = currentIndex + 1;
    if(target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
    timeoutId = setTimeout(() => {
      if(currentIndex === images.length - 1) {
        playSlideshow();
      } else {
        playSlideshow();
      }
    },1000);
  }

  function backSlideshow() {
    let target = currentIndex - 1;
    if(target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
    timeoutId = setTimeout(() => {
      backSlideshow();
    },1000);
  }

  let state;

  function stopState() {
    if(currentIndex === 0 && check === 1) {
      stop.disabled = false;
    }
    check = 1;
    state = setTimeout(() => {
      stopState();
    },1000)
  }


  let isPlaying = false;

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    isPlaying = true;
    playSlideshow();
    stop.disabled = true;
    stopState();
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    isPlaying = true;
    backSlideshow();
    stop.disabled = true;
    stopState();
  });
  

  

  const stop = document.getElementById('stop');
  stop.addEventListener('click', () => {
    
    
    if(isPlaying === false) {
      playSlideshow();
    } else {
      clearTimeout(timeoutId);
      clearTimeout(state);
    }
    check = 0;
    
    isPlaying = false;
  });
}