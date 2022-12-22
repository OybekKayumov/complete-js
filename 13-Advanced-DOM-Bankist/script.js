'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log('allSections: ', allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log('allButtons: ', allButtons);

// console.log( document.getElementsByClassName('btn') );

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