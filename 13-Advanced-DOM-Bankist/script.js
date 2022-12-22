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
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log('allSections: ', allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log('allButtons: ', allButtons);

console.log( document.getElementsByClassName('btn') );

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
