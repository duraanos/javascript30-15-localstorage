'use strict';

const insertionBar = document.querySelector('input[name="item"]');
const addItems = document.querySelector('form');
const itemsList = document.querySelector('ul');
const items = JSON.parse(localStorage.getItem('items')) || [];

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const renderList = function (items = [], itemsList) {
  itemsList.innerHTML = items
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      } />
          <label for="item${i}">${capitalize(plate.text)}</label>
        </li>
      `;
    })
    .join('');
};

const addItem = function (e) {
  e.preventDefault();
  const text = insertionBar.value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  renderList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
};

const toggleDone = function (e) {
  if (!e.target.matches('input')) return;

  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;

  localStorage.setItem('items', JSON.stringify(items));
  renderList(items, itemsList);
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

renderList(items, itemsList);
