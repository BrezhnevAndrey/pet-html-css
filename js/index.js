window.addEventListener('DOMContentLoaded', function () {

  let h = null;
  let mapContainer = document.querySelector('.map-container');
  let mapH = document.querySelector('#map');
  let linkBtn = document.querySelector('#footerBtn');

  function mapHeight() {
    h = document.querySelector('.footer__contacts').clientHeight;
    mapContainer.style.height = h + 'px';
    mapH.style.height = h - 2 + 'px';
    ymaps.ready(init);
  }

  $(window).on("load", function () {
    mapHeight();
  })

  linkBtn.addEventListener('click', () => {
    setTimeout(() => {
      mapHeight();
    }, 100);
  })

  tippy('.tippy', {
    maxWidth: 264,
    theme: 'tippy',
  });


  var mySwiper = new Swiper('.swiper-container__hero', {
    effect: "fade",
    allowTouchMove: false,
    speed: 4500,
    autoplay: {
      delay: 3000
    },
  })


  var mySwiper2 = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    slidesPerColumn: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
    breakpoints: {
      1600: {
        slidesPerColumn: 2,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      651: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 35,
        slidesPerGroup: 2,
      }
    },
    direction: 'horizontal',
    pagination: {
      el: '.gallery-swiper-pagination',
      type: 'fraction',
      clickable: true,
    },
    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev',
    },
  });

  var mySwiper3 = new Swiper('.edition__swiper', {
    slidesPerView: 2,
    spaceBetween: 0,
    slidesPerGroup: 2,
    direction: 'horizontal',
    allowTouchMove: false,
    breakpoints: {
      1300: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
      },
      960: {
        slidesPerView: 2,
        spaceBetween: 39,
        slidesPerGroup: 2,
      },
      650: {
        allowTouchMove: true,
        slidesPerView: 2,
        spaceBetween: 0,
        slidesPerGroup: 2,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true,
    },
    navigation: {
      nextEl: '.edition-swiper-button-next',
      prevEl: '.edition-swiper-button-prev',
    },
  })

  const swiper4 = new Swiper('.projects__swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    centerSlides: true,
    initialSlide: -3,
    breakpoints: {
      1300: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 35,
        centerSlides: false,
      },
      960: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 58,
        centerSlides: false,
      },
      650: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 40,
        centerSlides: false,
      }
    },
    navigation: {
      nextEl: '.projects__button-next',
      prevEl: '.projects__button-prev',
    },
  });

  const swiperEvents = new Swiper('.events-swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 20,
    initialSlide: -1,
    allowTouchMove: true,
    breakpoints: {
      650: {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 0,
        initialSlide: -1,
        allowTouchMove: false,
      }
    },
    pagination: {
      el: '.events__swiper-pagination',
      clickable: true,
    },
  });


  const element = document.querySelector('.js-choice');
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
  });

  $("#france").accordion({
    animate: 200,
    collapsible: true,
    heightStyle: "content",
  });



  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76027505530118, 37.6391775345154],
      zoom: 14,
      controls: []
    }),
      ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
        "<div id='zoom-in' class='btn'><i class='icon-plus'></i></div><br>" +
        "<div id='zoom-out' class='btn'><i class='icon-minus'></i></div>" +
        "</div>", {
        build: function () {
          ZoomLayout.superclass.build.call(this);
          this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
          this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
          $('#zoom-in').bind('click', this.zoomInCallback);
          $('#zoom-out').bind('click', this.zoomOutCallback);
        },
        clear: function () {
          $('#zoom-in').unbind('click', this.zoomInCallback);
          $('#zoom-out').unbind('click', this.zoomOutCallback);
          ZoomLayout.superclass.clear.call(this);
        },
        zoomIn: function () {
          var map = this.getData().control.getMap();
          map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
        },
        zoomOut: function () {
          var map = this.getData().control.getMap();
          map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
        }
      }),
      zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });
    myMap.controls.add(zoomControl);
    var geolocationControl = new ymaps.control.GeolocationControl({
      options: { noPlacemark: true }
    });
    geolocationControl.events.add('locationchange', function (event) {
      var position = event.get('position'),
        locationPlacemark = new ymaps.Placemark(position);
      myMap.geoObjects.add(locationPlacemark);
      myMap.panTo(position);
    });

    // Создаём макет содержимого.
    myPlacemark = new ymaps.Placemark([55.75788183464083, 37.60038342079201], {}, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: './images/svg/map_placemark.svg',
      // Размеры метки.
      iconImageSize: [17, 20],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [0, 0]
    });

    myMap.controls.add(geolocationControl);
    myMap.geoObjects.add(myPlacemark);
    linkBtn.addEventListener('click', () => {
      myMap.destroy();
    })
  }

  function hideShow(e) {
    e.preventDefault();
    let n = events.length;
    for (let i = 2; i < n; i++) {
      events[i].style.display = 'flex';
    }
    eventsA.style.display = 'none';
    const swiperEvents = new Swiper('.events-swiper', {
      direction: 'horizontal',
      loop: true,
      spaceBetween: 0,
      initialSlide: -1,
      allowTouchMove: true,
      breakpoints: {
        650: {
          direction: 'horizontal',
          loop: true,
          spaceBetween: 0,
          initialSlide: -1,
          allowTouchMove: false,
        }
      },
      pagination: {
        el: '.events__swiper-pagination',
        clickable: true,
      },
    });
  };

  function activeNameArtist() {
    let activeTabs = document.getElementsByClassName('tabs display-none block');
    activeName = activeTabs[0].getElementsByClassName('catalog__name');
    activeTabs[0].getElementsByClassName('accordion-catalog__list').forEach(function (artist) {
      for (i = 0; i < artist.children.length; i++) {
        if (activeName[0].textContent.trim() == artist.children[i].textContent.trim()) {
          artist.children[i].children[0].classList.add('accordion-catalog__btn--active');
        }
        else {
          artist.children[i].children[0].classList.remove('accordion-catalog__btn--active');
        }
      }
    });
  }

  function mobileScroll() {
    let getImg = document.querySelector('.tabs.display-none.block').querySelector('.catalog__image');
    var $page = $('html, body');
    $page.animate({ scrollTop: $(getImg).offset().top }, 400);
    return false;
  }

  function searchCountry() {
    let tabs = document.getElementsByClassName('tabs');
    for (let i of tabs) {
      if (i.classList[2] == 'block') {
        return i.dataset;
      }
    }
  }

  function tabsSelected() {
    let catalogItems = document.getElementsByClassName("catalog__btn");
    for (let i = 0; i < catalogItems.length; i++) {
      if (catalogItems[i].dataset.target == country.path) {
        catalogItems[i].classList.add('catalog__btn--active');
      }
      else {
        catalogItems[i].classList.remove('catalog__btn--active');
      }
    }
  }

  function closeModal() {
    document.getElementById('openModal').classList.remove('modal-open');
    document.body.style.position = 'static';
    window.scrollTo(0, scrollY);
    scrollY = null;
  }


  let country = searchCountry();
  let scrollY = null;
  let burger = document.querySelector('.header-upper__burger');
  let burgerMenu = document.querySelector('.header-upper__list');
  let btnSearch = document.querySelector('.header-lower__btn-form');
  let inputSearch = document.querySelector('.header-lower__input');
  let editionSubtitle = document.querySelector('.edition__subtitle--mobile');
  let editionCheckContainer = Array.from(document.getElementsByClassName('edition__list'));
  let eventsA = document.querySelector('#openAll');
  let events = document.getElementsByClassName('events__card');
  let btnSearchClose = document.querySelector('.header-lower__btn-close');


  activeNameArtist();
  tabsSelected();

  var $page = $('html, body');
  $('.header-upper__link[href*="#"]').click(function () {
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
  });

  if (window.innerWidth <= 1200) {
    btnSearch.tabIndex = 0;
  }

  eventsA.addEventListener('click', hideShow);

  document.querySelectorAll('.accordion-catalog__btn').forEach(function (accordion) {
    accordion.addEventListener('click', function (removeAcc) {
      removeAcc.preventDefault();
      if (window.innerWidth <= 960) {
        mobileScroll();
      }
      let name = removeAcc.target.textContent;
      let activeName = document.getElementsByClassName('catalog__name');
      for (let i = 0; i < activeName.length; i++) {
        activeName[i].textContent = name;
      }
      activeNameArtist();
    })
  })

  document.querySelectorAll('.catalog__btn').forEach(function (tabBtn) {
    tabBtn.addEventListener('click', function (event) {
      let path = event.currentTarget.dataset.target;
      document.querySelectorAll('.tabs').forEach(function (tabContent) {
        tabContent.classList.remove('block')
      });
      document.querySelector(`[data-path = "${path}"]`).classList.add('block');
      $(`[id = "${path}"]`).accordion({
        animate: 200,
        collapsible: true,
        heightStyle: "content"
      });
    })
  });


  document.getElementsByClassName('catalog__btn').forEach(function (tabs) {
    tabs.addEventListener('click', function () {
      country = searchCountry();
      tabsSelected();
      activeNameArtist();
    })
  })

  addEventListener('keydown', (e) => {
    if (document.getElementById('openModal').classList.contains('modal-open')) {
      if (e.keyCode == 27) {
        closeModal();
      }
    }
  })

  document.querySelectorAll('.swiper-slide-gallery a').forEach(function (modal) {
    modal.addEventListener('click', function (modalActive) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      modalActive.preventDefault();
      document.getElementById('openModal').classList.add('modal-open');
      let modalImg = modalActive.currentTarget.innerHTML;
      let modalBox = document.querySelector('.modal__box');
      let modalImageBox = modalBox.children[0];
      modalInformation = document.querySelector('.modal__information');
      modalImageBox.innerHTML = modalImg;
      modalImageBox.children[0].classList.add('modal__image');
    })
  })

  document.querySelector('.modal__close').addEventListener('click', function () {
    closeModal();
  })

  document.querySelector('.modal').addEventListener('click', function (e) {
    let modal = document.querySelector('.modal');
    if (e.target == modal) {
      closeModal();
    }
  })

  burger.addEventListener('click', () => {
    burgerMenu.classList.toggle('header-upper__list--active');
    burger.classList.toggle('header-upper__burger--active');
  })

  btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.innerWidth <= 1200) {
      inputSearch.style.display = "block";
      inputSearch.focus();
    }
    if ((window.innerWidth <= 960) && (window.innerWidth > 650)) {
      document.querySelector('.header-upper__nav').style.visibility = 'hidden';
      document.querySelector('.header-lower__btn-close').style.display = 'inline-block';
    }
    if (window.innerWidth <= 650) {
      document.querySelector('.header-lower__btn-close').style.display = 'inline-block';
      document.querySelector('.header-lower').classList.add('header-lower--searchActive');
      document.querySelector('.header-lower__content').classList.add('header-lower__content--searchActive');
    }
  })

  inputSearch.onblur = function () {
    if (window.innerWidth <= 1200) {
      inputSearch.style.display = "none";
      btnSearchClose.style.display = "none";
      document.querySelector('.header-upper__nav').style.visibility = 'visible';
      inputSearch.value = "";
      document.querySelector('.header-lower').classList.remove('header-lower--searchActive');
      document.querySelector('.header-lower__content').classList.remove('header-lower__content--searchActive');
    }
  }

  editionSubtitle.addEventListener('click', () => {
    editionCheckContainer.forEach((e) => {
      e.classList.toggle('edition__check-container--active');
      let check = e.childNodes[1].childNodes[1];
      if (check.checked === true) {
        e.classList.add('edition__check-container--active');
      }
    })
    editionSubtitle.classList.toggle('edition__subtitle--mobile-active');
  })

  editionCheckContainer.forEach((e) => {
    e.addEventListener('click', () => {
      let check = e.childNodes[1].childNodes[1];
      if (!editionSubtitle.classList.contains('edition__subtitle--mobile-active')) {
        e.classList.remove('edition__check-container--active');
      }
    })
  })

})
