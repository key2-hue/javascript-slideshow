'use strict';

{
  const images = [
    'https://www.sony.jp/ichigan/a-universe/assets/img/entry_detail/321/mv_01.jpg',
    'https://www.tobezoo.com/animals/img/mn03.jpg',
    'https://s3-ap-northeast-1.amazonaws.com/newsphere.jp/wp-content/uploads/2019/11/26183147/1_shutterstock_529567036.jpg',
    'https://s.skygate.co.jp/pc/sa_city/oversea/images/ca/ca_img_k27_01.jpg',
    'https://www.nakatsuvet.com/wp-content/uploads/2019/04/image-3840x600.jpg',
    'https://www.pet7.com/wp-content/uploads/sp_image2.jpg',
    'https://ichef.bbci.co.uk/news/410/cpsprodpb/18430/production/_110867399_a9410d19-7a03-4179-95f1-76e2eb5b32cd.jpg',
    'https://cdn.mainichi.jp/vol1/2020/01/08/20200108k0000m040014000p/8.jpg?1',
  ];
  let currentIndex = 0;

  

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    li.classList.add('image');
    if(index === currentIndex) {
      li.classList.add('current');
    }
    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.smallImage > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);
    document.querySelector('.smallImage').appendChild(li);
  });

  

  let timeoutId;

  let check = 0;
  function playSlideshow() {
    let target = currentIndex + 1;
    if(target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.smallImage > li')[target].click();
    timeoutId = setTimeout(() => {
      playSlideshow();
    },1000);
  }

  function backSlideshow() {
    let target = currentIndex - 1;
    if(target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.smallImage > li')[target].click();
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
    if(isPlaying === false) {
      isPlaying = true;
      playSlideshow();
      stop.disabled = true;
      stopState();
    }
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    if(isPlaying === false) {
      isPlaying = true;
      backSlideshow();
      stop.disabled = true;
      stopState();
    }
  });
  

  

  const stop = document.getElementById('stop');
  stop.addEventListener('click', () => {
    clearTimeout(timeoutId);
    clearTimeout(state);
    check = 0;
    isPlaying = false;
  });
}