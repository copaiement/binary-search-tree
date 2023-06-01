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

  insert(value, node = this.root) {
    // if node is empty, insert
    console.log(value, node)
    if (node === null) {
      console.log('test');
      let insert = Node(value);
      return insert;
    }
    // ignore duplicates
    if (value === node.data) return;
    // if value is < node.data, move left, if > node.data, move right
    if (value < node.data) {
      this.insert(value, node.left);
    } else if (value > node.data) {
      this.insert(value, node.right);
    }
    return node;
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
testTree.insert(7);
prettyPrint(testTree.root);
console.log(testTree.root);

