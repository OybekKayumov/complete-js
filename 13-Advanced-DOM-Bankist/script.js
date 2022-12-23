'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//todo: button scrolling
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();

  console.log(e.target.getBoundingClientRect());
  console.log(window.pageXOffset, window.pageYOffset);

  console.log(document.documentElement.clientHeight,
    document.documentElement.clientWidth );

  //todo: scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  // left:   s1coords.left + window.pageXOffset,
  // top:  s1coords.top + window.pageYOffset,
  // behavior: "smooth",
  // });

  //todo: modern smooth
  section1.scrollIntoView({behavior: 'smooth'})
})

///////////////////////////////////////
//todo: page navigation
// without using event delegation
/*
document.querySelectorAll('.nav__link').forEach((el) => {
  // el.addEventListener('click', (e) => {  //! this and arrow fn
  el.addEventListener('click', function (e) {
    //! no longer scroll to the page when click to nav elements
    e.preventDefault(); 
    console.log('LINK 123');

    const id = this.getAttribute('href');
    console.log('id: ', id); // id:  #section--1-2-3

    document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
  })
});
*/

//todo: event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links')        // parent element
  .addEventListener('click', function (e) {
    e.preventDefault();   

  //todo: matching strategy
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
    }
})

// todo: building a tabbed component
// tabs.forEach((t) => t.addEventListener('click', () => {
//   console.log('TAB: ', );
// }))

//* use event delegation, attach eventHandler to common parent element
tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target;
  // const clicked = e.target.parentElement;
  const clicked = e.target.closest('.operations__tab');
  // console.log('clicked: ', clicked );

  //todo: Active Tab
  //* ignore clicks if not button, no Error
  if (!clicked) return;

  //* remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  
  tabsContent.forEach(content => 
    content.classList.remove('operations__content--active'))
  
  //* activate tab  
  clicked.classList.add('operations__tab--active');
  
  //todo: Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
})

///////////////////////////////////////
//todo: menu fade animation
// refactoring
const handleHover = function (e) {
// const handleHover = function (e, opacity) {
  // this : 0.5 or 1, e.currentTarget -- <nav>
  // console.log('this and e.currentTarget: ', this, e.currentTarget);  

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(elem => {
      if (elem !== link) {
        // elem.style.opacity = opacity;
        elem.style.opacity = this;
      }
    })
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
}

/*
nav.addEventListener('mouseover', (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(elem => {
      if (elem !== link) {
        elem.style.opacity = 0.5;
      }
    })
    logo.style.opacity = 0.5;
  } 
})
*/
//* won't work
// nav.addEventListener('mouseover',handleHover(e, 0.5))
// nav.addEventListener('mouseout',handleHover(e, 1))

//! we need to pass a function
/*
nav.addEventListener('mouseover',(e) => {
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', (e) => {
  handleHover(e, 1)
})
*/

//todo: Passing "argument" into handler
//! use bind method - creates a copy of the function that it's called on
// and it will set the "this keyword" in this function call to whatever value that we pass into "bind"
// if you want to pass more than one value, you can use array or object
// nav.addEventListener('mouseover', handleHover.bind([0.5, 1, 2] or {}))

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

///////////////////////////////////////
//todo: sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();
console.log(': ', initialCoords);

window.addEventListener('scroll', function (e) {
  // console.log(': ', e);
  // console.log(': ', window.scrollY);

  if(this.window.scrollY > initialCoords.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  } 
})
*/

/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(': ', entry);
  })
}

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries // entries[0] getting 1st element
  console.log(': ', entry);
  
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
//todo: reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15,
  });

allSections.forEach(function (section) {
  sectionObserver.observe(section);

  section.classList.add('section--hidden');
})

///////////////////////////////////////
//todo: lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, 
  {
    root: null,
    threshold: 0, 
});

imgTarget.forEach(img => imgObserver.observe(img));


///////////////////////////////////////

// TODO: how the DOM really works
// - every single node in the DOM tree is type of node, represented by object
// and gets access to special node methods and properties
// Element, Text, Comment, Document types of Node

// Element <p>  .innerHTML, .classlist, .append(), ...
    // - HTMLElement
    //   - HTMLButtonElement
    //   -
    //   -HTMLDivElement
// Text -- <p>Text</p>, 
// Comment <!-- comment -->

//! inheritance means all the child types will also get access to the methods and properties of all their parent node types

// Document - another type of Node, it contains important methods, and available on both the document and element types

// EventTarget is a parent of both the Node type and Window node type
// we do never manually create an EventTarget object, it is an abstract type. 

// TODO: Selecting, Creating, and Deleting Elements
// Selecting

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

//TODO: Creating and inserting elements
// .insertAdjacentHTML

const msg = document.createElement('div');  
// create DOM element, and its not yet in DOM

msg.classList.add('cookie-message');
msg.textContent = 'We use cookies for improve functionality and analytics';

msg.innerHTML = 'We use cookies for improve functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(msg);  // first child - at the top of HTML
header.append(msg);  // last child - at the end of HTML
// can be only in one place, move element

// header.append(msg.cloneNode(true)); // to get same msg in both places

// header.before(msg);  // insert msg before to header element as a sibling
// header.after(msg);  

//todo: Delete elements
document.querySelector('.btn--close-cookie')
    .addEventListener('click', () => {
      // msg.remove();
      msg.parentElement.removeChild(msg)  // also delete element
    })

// TODO: Styles, Attributes and Classes
msg.style.backgroundColor = "#37383d"
msg.style.width = "120%"

console.log('msg.style.height: ', msg.style.height); // empty line
console.log('msg.style.backgroundColor: ', msg.style.backgroundColor);
//! we cannot get a style that is hidden inside a class
// msg.style.height:  (empty)  

// ! we can get inline style, because we set manually ourselves
// msg.style.backgroundColor:  rgb(55, 56, 61)  

//todo: to get hidden style
// console.log('getComputedStyle(msg): ', getComputedStyle(msg));
// getComputedStyle(msg):  CSSStyleDeclaration {0: 'accent-color', 1: 'align-content', 2: 'align-items', 3: 'align-self', 4: 'alignment-baseline', 5: 'animation-delay', 6: 'animation-direction', 7:........
// console.log('getComputedStyle(msg): ', getComputedStyle(msg).color);
// console.log('getComputedStyle(msg): ', getComputedStyle(msg).height);
// getComputedStyle(msg):  rgb(187, 187, 187)
// getComputedStyle(msg):  49.2424px

msg.style.height = 
  Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered')

//todo: Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log( logo.getAttribute('src') );
// http://127.0.0.1:8080/13-Advanced-DOM-Bankist/img/logo.png
// img/logo.png

const link = document.querySelector('.twitter-link')
console.log(link.href);
console.log(link.getAttribute('href'));

//todo: Data attributes
console.log(logo.dataset.versionNumber);  // 3.0


//todo: Classes
logo.classList.add('c', 'j')      //! use this
logo.classList.remove('c', 'j')   //! use this
logo.classList.toggle('c')  
logo.classList.contains('c')      // ! not 'includes'

//todo: Don't use
logo.className = 'jonas' //! only ONE class and will override all other classes

//TODO: Implementing Smooth Scrolling
/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();

  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);

  // console.log(document.documentElement.clientHeight,
    // document.documentElement.clientWidth );

  //todo: scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  // left:   s1coords.left + window.pageXOffset,
  // top:  s1coords.top + window.pageYOffset,
  // behavior: "smooth",
  // });

  //todo: modern smooth
  section1.scrollIntoView({behavior: 'smooth'})
})
*/
// TODO: Types of Events and Event Handlers
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', () => {
//   alert('addEventListener: Great! You are reading the heading!')
// })

//* mdn Events
// https://developer.mozilla.org/en-US/docs/Web/Events

// h1.onmouseenter = () => {
//   alert('onmouseenter: Great! You are reading the heading!')
// }

//
/*
const alertH1 = () => {
  alert('addEventListener: Great! You are reading the heading!')

  // h1.removeEventListener('mouseenter', alertH1)
};

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1)

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1)
}, 2000)
*/
//TODO: Event Propagation: Bubbling and Capturing
// event is generated at the root of the document, at the top of DOM tree
//* 1 capturing phase
// event travels down the tree through every single parent element of the target element

// click event:
// document 
      // element <html>
      // element <body>
      // element <section>
      // element <p>
      // element <a> 

//* 2 target phase
  // runs attached callback function
  // events travels up to the document route again

//* 3 bubbling phase


//! by default, events can only be handled in the target and bubbling phase
// events propagate from 1 place to another: capturing and bubbling

//TODO: Event Propagation in Practice
// rgb(255,255,255);

const randomInt = (min, max) => 

  Math.floor(Math.random() * (max - min + 1) + min);
  

const randomColor = () => 
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
  
// console.log('randomColor: ', randomColor());

//! this not works in arrow fn
// document.querySelector('.nav__link').addEventListener('click', (e) => { 
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('LINK :', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
  console.log(e.currentTarget === this ); //! true

  //todo: stop propagation
  // e.stopPropagation();  // !
})

// document.querySelector('.nav__links').addEventListener('click', (e) => {
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('CONTAINER-LINKs :', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
})
  
// document.querySelector('.nav').addEventListener('click', (e) => {
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('NAV :', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// })

// event happened at document root and travels down to the target element
// and bubbles up - means event happens in all the parent elements
// if you click on parent element, color in child element doesn't change
//* e.currentTarget is the element on which the element handler is attached 

//todo: capture phase
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('NAV :', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
}, 
// true //! capture parameter is set to true,
false //default
) 
// event handler will no longer listen to bubbling events, but instead, to capturing events

// now the first element through which the element passes, is NAV
// NAV element now listening for the event as it travels DOWN from the DOM  
// NAV is the first one to happen
// nav
// nav__links
// nav__link

// before was listening for event travels back UP
// nav__link
// nav__links
// nav


// they are still working with same event but doing in different phases of event propagation

// ! understanding, why three boxes here get three different background colors, even click happened on <a> element


//TODO: Event Delegation: Implementing Page Navigation
//TODO: DOM Traversing
// we can select an element based on another element
const h1 = document.querySelector('h1');

//todo: going downwards: child
/*
console.log(h1.querySelectorAll('.highlight'));
console.log('h1.childNodes: ', h1.childNodes);
console.log('h1.children: ', h1.children);
console.log('h1.firstElementChild: ', h1.firstElementChild.style.color = 'white');
console.log('h1.lastElementChild: ', h1.lastElementChild.style.color = 'red');

//todo: going upwards: parents
console.log(': ', h1.parentNode);
console.log(': ', h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

//todo: sideways: sibling
console.log(': ', h1.previousElementSibling);
console.log(': ', h1.nextElementSibling);

console.log(': ', h1.previousSibling);
console.log(': ', h1.nextSibling);

console.log(': ', h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';  // 50% smaller
  }
})
*/
//TODO: Building a Tabbed Component
//TODO: Passing Arguments to Event Handlers
//TODO: Implementing a Sticky Navigation: The Scroll Event
//TODO: A Better Way: The Intersection Observer API
//TODO: Revealing Elements on Scroll
//TODO: Lazy Loading Images
