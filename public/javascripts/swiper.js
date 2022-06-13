var mySwiper = new Swiper('.swiper-container', {
  autoplay: true,
  loop: true,
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  observer: true, //修改swiper自己或子元素时，自动初始化swiper 
  observeParents: false, //修改swiper的父元素时，自动初始化swiper 
  onSlideChangeEnd: function (swiper) {
    swiper.update();
    mySwiper.startAutoplay();
    mySwiper.reLoop();
  }
});