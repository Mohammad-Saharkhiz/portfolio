const navToggleIcon = document.querySelector('.nav__toggle-icon')
const menu = document.querySelector('.menu')
const cover = document.querySelector('.cover')
const resumeListItems = document.querySelectorAll('.resume-list__item')
const portfolioListItems = document.querySelectorAll('.portfolio-list__item')
const menuItems = document.querySelectorAll('.menu__item')
const observer = new IntersectionObserver(observerHandeler, {
  threshold: 0.5
});
const sections = document.querySelectorAll("main > section")
const changeThemeBtn = document.querySelector('.change-theme')
const lightThemeIcon = `<svg viewBox="-8 -9 40 40" fill=#fff><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`
const darkThemeIcon = `<svg viewBox="-9 -9 40 40" fill=#fff><path d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z"/></svg>`
const header = document.querySelector('.header')

if (window.localStorage.getItem("theme") == "dark-theme") {
  document.documentElement.classList.add("dark-theme")
  changeThemeBtn.innerHTML = lightThemeIcon
}

function removeActiveClass(className) {
  document.querySelector(`.${className}`).classList.remove(className)
}

function observerHandeler(allSections) {
  allSections.map(section => {
    let sectionClassName = section.target.className
    if (section.isIntersecting) {
      document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.add('menu__link--active')
    }
    else {
      document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.remove('menu__link--active')
    }
  })
}

navToggleIcon.addEventListener('click', function () {
  this.classList.toggle('nav__toggle-icon--open')
  menu.classList.toggle('menu--open')
  cover.classList.toggle('cover--show')
})

resumeListItems.forEach(resumeListItem => {
  resumeListItem.addEventListener('click', function () {
    removeActiveClass('resume-list__item--active')
    removeActiveClass('resume-content--show')
    this.classList.add('resume-list__item--active')
    let contentId = this.getAttribute('data-content-id')
    document.querySelector(contentId).classList.add('resume-content--show')
  })
})


portfolioListItems.forEach(portfolioListItem => {
  portfolioListItem.addEventListener('click', function () {
    document.querySelector('.portfolio-list__item--active').classList.remove('portfolio-list__item--active')
    document.querySelector('.portfolio-content--show').classList.remove('portfolio-content--show')
    this.classList.add('portfolio-list__item--active')
    let contentId = this.getAttribute('data-content-id')
    document.querySelector(contentId).classList.add('portfolio-content--show')
  })
})

menuItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault()
    removeActiveClass('menu__link--active')
    this.classList.add('menu__link--active')

    let sectionClass = item.getAttribute("data-section")
    let sectionOFFsetTop = document.querySelector(`.${sectionClass}`).offsetTop
    window.scrollTo({
      top: sectionOFFsetTop,
      behavior: "smooth"
    })
  })
})

sections.forEach(section => {
  observer.observe(section)
})

changeThemeBtn.addEventListener('click', function () {
  document.documentElement.classList.toggle("dark-theme")
  if (document.documentElement.classList.contains("dark-theme")) {
    window.localStorage.setItem("theme", "dark-theme")
    this.innerHTML = lightThemeIcon
  } else {
    window.localStorage.setItem("theme", "light-theme")
    this.innerHTML = darkThemeIcon
  }
})

let scrollTop = 0
document.addEventListener('scroll', () => {
  if (document.body.offsetWidth >= 768) {
    if (scrollTop < document.documentElement.scrollTop && document.documentElement.scrollTop > 100) {
      header.style.top = '-97px'
      header.style.boxShadow = 'none'
    } else {
      header.style.top = '0px'
      header.style.boxShadow = '0 0rem 4rem rgba(4, 195, 255, 0.26)'
    }
    scrollTop = document.documentElement.scrollTop
  }
})

var homeName = document.querySelector('.home__name');

var homeNameElem = new Typewriter(homeName, {
  loop: true
});

homeNameElem.typeString(`Hello, I'M <span style="color: #F57F17;">Mohammad Saharkhiz</span>`)
  .pauseFor(2500)
  .deleteAll()
  .typeString(`I'm a <span style="color: #F57F17;">Front End Developer</span>`)
  .pauseFor(2500)
  // .deleteChars(7)
  .deleteAll()
  .typeString('To order, <span style="color: #F57F17;">refer to the Contact part</span>')
  .pauseFor(2500)
  .start();

// Hello, I'M <span>Mohammad Saharkhiz</span>

/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',

  {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#F57F17",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});