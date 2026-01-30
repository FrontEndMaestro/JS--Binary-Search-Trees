import nodeClass from "./nodeClass.js";

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
  }

  buildTree() {
    let copyarr = this.arr.filter(
      (element, index) => this.arr.indexOf(element) === index,
    );
    copyarr.sort((a, b) => a - b);
    this.arr = [...copyarr];
    this.root = this.recursiveBST(this.arr, 0, this.arr.length-1);
  }

  recursiveBST(array, st, end) {
    if (st > end) return null;
    let mid = Math.floor((st + end) / 2);
    let root = new nodeClass(array[mid]);
    root.left = this.recursiveBST(array, st, mid - 1);
    root.right = this.recursiveBST(array, mid + 1, end);
    return root;
  }

  insert(value, root) {
    if (root == null) return new nodeClass(value);
    if (value < root.data) {
      root.left=this.insert(value, root.left);
    }
    if (value > root.data) {
      root.right=this.insert(value, root.right);
    }
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let tree = new Tree([1, 5, 9, 14, 23, 27]);
tree.buildTree(tree.arr);
tree.insert(13, tree.root);
tree.insert(0, tree.root);
//tree.insert(2, tree.root);
console.log(tree.insert(2, tree.root))
console.log(tree.insert(25, tree.root))

//console.log(tree.arr);
tree.prettyPrint(tree.root)
