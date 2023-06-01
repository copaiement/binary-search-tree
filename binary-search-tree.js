// Node factory with attribute for data stored as well as left/right children
function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

// Tree class which accepts an array when initialized.
// Should have a root attribute which uses return value of buildTree function
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // private method to sort and remove duplicates
  #sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  // private method to find min value
  #minvalue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  buildTree(array) {
    // sort array
    let cleanArray = this.#sort(array);
    // return if start > end
    if (cleanArray.length === 0) return null;
    // find middle element
    let mid = Math.floor((cleanArray.length - 1) / 2);
    // create new Node
    let node = Node(cleanArray[mid]);
    // recursive call on left
    node.left = this.buildTree(cleanArray.slice(0, mid));
    // retursive call on right
    node.right = this.buildTree(cleanArray.slice(mid + 1));
    // return root
    return node;
  }

  // insert a value
  insert(value, node = this.root) {
    // if node is empty, create new
    if (node === null) return Node(value);
    // ignore duplicates
    if (value === node.data) return node;
    // recursive calls
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  // delete a value
  delete(value, node = this.root) {
    // if node is empty, value does not exist in tree
    if (node === null) return node;
    // tree traversal
    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      // if node has only left, right, or is leaf
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // node has two children:
      // move the smaller child to node.data
      node.data = this.#minvalue(node.right);
      // run delete again with smaller child to remove it
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  // find, accepts value and returns node with given value
  find(value, node = this.root) {
    // if node is empty, value does not exist in tree
    if (node === null) return node;
    // tree traversal
    if (value < node.data) return this.find(value, node.left);
    if (value > node.data) return this.find(value, node.right);
    return node;
  }

  // levelOrder, traverses tree in breadth-first order
  // levelOrder(function) {

  // }

  // height, accepts a node and returns longest path to a leaf node
  // if no argument is given, function will use root
  height(node = this.root) {
    // reject empty
    if (node === null) return 0;
    // if branches are empty, we've reached the end
    if (node.left === null && node.right === null) return 0;
    // tree traversal
    let lHeight = this.height(node.left);
    let rHeight = this.height(node.right);
    return Math.max(lHeight, rHeight) + 1;
  }

  // depth, accepts a node and returns path to root
  depth(node, root = this.root) {
    // reject empty
    if (node === null || root === null) return 0;
    if (node.data < root.data) return this.depth(node, root.left) + 1;
    if (node.data > root.data) return this.depth(node, root.right) + 1;
    return 0;
  }

  isBalanced(node = this.root) {
    let lHeight = this.height(node.left);
    let rHeight = this.height(node.right);
    if (Math.abs(lHeight - rHeight) > 1) return false;
    if (node.left !== null) this.isBalanced(node.left);
    if (node.right !== null) this.isBalanced(node.right);
    return true;
  }
}

// print function
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};



let testArray = [1, 8, 19, 22, 71, 4, 8, 15, 15, 23, 99, 71, 2, 3, 18];

let sortedTest = [6, 5, 2, 1, 3, 4, 4, 4, 4, 4, 4];

let testTree = new Tree(sortedTest);
console.log(testTree.root);
prettyPrint(testTree.root);
// testTree.insert(7);
testTree.delete(1);
console.log(testTree.root);
prettyPrint(testTree.root);
console.log(testTree.find(4));
let testHeight = testTree.find(100);
// testTree.height();
// testTree.height(2);
console.log(testTree.depth(testHeight));
console.log(testTree.isBalanced());



