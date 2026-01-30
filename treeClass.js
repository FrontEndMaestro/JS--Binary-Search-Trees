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
    return this.recursiveBST(this.arr, 0, this.arr.length);
  }

  recursiveBST(array, st, end) {
    if (st > end) return null;
    let mid = Math.floor((st + end) / 2);
    let root = new nodeClass(array[mid]);
    root.left = this.recursiveBST(array, st, mid - 1);
    root.right = this.recursiveBST(array, mid + 1, end);
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

let tree = new Tree([1, 2, 3, 9, 13, 14]);
tree.buildTree(tree.arr);
//console.log(tree.arr);
