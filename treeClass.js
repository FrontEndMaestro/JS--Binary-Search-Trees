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
    this.root = this.recursiveBST(this.arr, 0, this.arr.length - 1);
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
      root.left = this.insert(value, root.left);
    }
    if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  //Finds the value of the node to be added in place of the node being deleted
  Sucessor(root) {
    while (root.left != null && root.data != null) {
      root = root.left;
    }
    return root.data;
  }

  deleteItem(value, root) {
    if (value == root.data) {
      if (root.left == null && root.right == null) {
        return null;
      } else if (root.left == null && root.right != null) {
        return root.right;
      } else if (root.right == null && root.left != null) {
        return root.left;
      } else {
        let sucessorValue = this.Sucessor(root.right);
        root.data = sucessorValue;
        //delete the sucessor node since its value is replaced with the deleted node
        root.right = this.deleteItem(sucessorValueValue, root.right);
        return root;
      }
    }

    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    }
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    }
    return root;
  }

  levelOrderForEach(callback) {
    if (typeof callback != "function") throw new Error("Callback required");
    let queue = [];
    let currentnode = this.root;
    queue.push(currentnode);
    while (queue.length > 0) {
      currentnode = queue.shift();
      callback(currentnode);
      if (currentnode.left != null) {
        queue.push(currentnode.left);
      }
      if (currentnode.right != null) {
        queue.push(currentnode.right);
      }
    }
  }

  levelOrderRecursive(callback, queue) {
    if (typeof callback != "function") throw new Error("Callback required");
    if (queue.length == 0) return;
    let currentnode = queue.shift();
    callback(currentnode);
    if (currentnode.left != null) {
      queue.push(currentnode.left);
    }
    if (currentnode.right != null) {
      queue.push(currentnode.right);
    }
    this.levelOrderRecursive(callback, queue);
  }

  inOrderForEach(callback, root) {
    if (root == null) return;
    this.inOrderForEach(callback, root.left);
    callback(root);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root) {
    if (root == null) return;
    callback(root);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root) {
    if (root == null) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root);
  }

  height(value, root) {
    if (root == null) return undefined;
    if (value == root.data) {
      return this.countHeight(root);
    }
    return this.height(value, root.left) == undefined
      ? this.height(value, root.right)
      : this.height(value, root.left);
  }

  countHeight(currentNode) {
    if (currentNode == null) return -1;
    let leftHeight = this.countHeight(currentNode.left);
    let rightHeight = this.countHeight(currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, root) {
    if (root == null) return undefined;
    if (value == root.data) {
      return 0;
    }
    let leftSubtree = this.depth(value, root.left);
    let rightSubtree = this.depth(value, root.right);
    return leftSubtree == undefined
      ? rightSubtree == undefined
        ? undefined
        : rightSubtree + 1
      : leftSubtree + 1;
  }

  isBalanced(root) {
    if (root == null) return true;
    let leftHeight = this.countHeight(root.left);
    let rightHeight = this.countHeight(root.right);
    return (
      this.isBalanced(root.left) &&
      this.isBalanced(root.right) &&
      Math.abs(leftHeight - rightHeight) <= 1
    ); //tree is balanced if the difference between heights of left and right subtree is no more than 1
  }

  rebalance() {
    this.arr = [];
    this.levelOrderRecursive(this.getArrayOfNodes, [this.root]);
    this.buildTree();
  }

  getArrayOfNodes=(value)=>{
    this.arr.push(value.data);
  };

  print(node) {
    console.log(node.data);
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

let tree = new Tree([1, 5, 9, 14, 23, 27, 0, 23, 18, 2]);
//let tree = new Tree([9, 4, 10, 11]);
tree.buildTree(tree.arr);
tree.insert(12, tree.root);
tree.insert(6, tree.root);
//tree.insert(28, tree.root);
//console.log(tree.arr);

//tree.prettyPrint(tree.root);
/*tree.deleteItem(1, tree.root);
tree.deleteItem(5, tree.root);
tree.deleteItem(9, tree.root);
*

tree.deleteItem(9, tree.root);
tree.deleteItem(27, tree.root);

tree.deleteItem(1, tree.root);
*/
tree.prettyPrint(tree.root);
//tree.levelOrderForEach(tree.print);
//tree.levelOrderRecursive(tree.print, [tree.root]);
//tree.preOrderForEach(tree.print, tree.root);

//tree.prettyPrint(tree.root);
//tree.inOrderForEach(tree.print, tree.root);

//tree.prettyPrint(tree.root);
//tree.postOrderForEach(tree.print, tree.root);

//console.log(tree.height(28, tree.root));
//console.log(tree.depth(108, tree.root));
//console.log(tree.isBalanced(tree.root));
console.log(tree.arr);
tree.rebalance();
tree.prettyPrint(tree.root);
