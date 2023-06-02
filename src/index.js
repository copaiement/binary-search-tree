import { Tree } from './modules/binary-search-tree';
import './style.css';
// global tree
let tree;

// Tree functions
function createTree(arr) {
  tree = new Tree(arr);
  updateValues();
  updateDisplay();
}

// event listeners
function initializeEventListeners() {
  const randArr = document.querySelector('#getRandomArr');
  const custArr = document.querySelector('#getCustomArr');
  const add = document.querySelector('#addBtn');
  const rebal = document.querySelector('#rebalanceBtn');
  
  randArr.addEventListener('click', getRandomArr);
  custArr.addEventListener('click', customArr);
  add.addEventListener('click', addNode);
  rebal.addEventListener('click', rebalance);
}

// dom functions
function updateValues() {
  const isBalanced = document.querySelector('.isbalanced');
  const levelOrder = document.querySelector('.level-order');
  const inorder = document.querySelector('.inorder');
  const preorder = document.querySelector('.preorder');
  const postorder = document.querySelector('.postorder');
  // text content
  isBalanced.textContent = tree.isBalanced();
  levelOrder.textContent = tree.levelOrder();
  inorder.textContent = tree.inorder();
  preorder.textContent = tree.preorder();
  postorder.textContent = tree.postorder();
}

function updateDisplay() {
  const display = document.querySelector('.display');
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  const arr = tree.prettyPrint();
  for (let i = 0; i < arr.length; i++) {
    const temp = document.createElement('div');
    temp.innerHTML = arr[i];
    display.appendChild(temp);
  }
}

function getInput(id) {
  const input = document.querySelector(`#${id}`);
  const val = input.value;
  input.value = '';
  return val;
}

// input cleaning functions
function cleanArr(input) {
  let arr = [];
  let regex = /([^0-9, ])/;
  if (regex.test(input)) return arr;
  if (input.indexOf(',') > 0) {
    arr = input.split(',');
    arr = arr.map((element) => { return parseInt(element, 10); });
  } else {
    arr = [parseInt(input, 10)];
  }
  return arr;
}

// input handling functions
function getRandomArr() {
  // get input
  let input = getInput('randomArraySize');
  if (input === '') return;
  const arr = [];
  input = parseInt(input, 10);
  for (let i = 0; i < input; i++) {
    // no zero values
    const rand = Math.floor(Math.random() * 99) + 1;
    arr.push(rand);
  }
  createTree(arr);
}

function customArr() {
  // get input
  const input = getInput('customArrayValues');
  if (input === '') return;
  const clean = cleanArr(input);
  if (clean.length === 0) return;
  createTree(clean);
}

function addNode() {
  // get input
  const input = getInput('nodeValue');
  if (input === '') return;
  if (tree === undefined) {
    createTree([input]);
  } else {
    tree.insert(input);
    updateValues();
    updateDisplay();
  }
}

function rebalance() {
  if (tree === undefined) return;
  tree.rebalance();
  updateValues();
  updateDisplay();
}

initializeEventListeners();
