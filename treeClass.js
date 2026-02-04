import nodeClass from "./nodeClass.js";

export default class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.#buildTree();
  }

  #buildTree() {
    let copyarr = [...new Set(this.arr)];
    copyarr.sort((a, b) => a - b);
    this.arr = [...copyarr];
    return this.recursiveBST(this.arr, 0, this.arr.length - 1);
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
    this.verifyCallbackArg(callback);
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
    this.verifyCallbackArg(callback);
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
    this.verifyCallbackArg(callback);
    if (root == null) return;
    this.inOrderForEach(callback, root.left);
    callback(root);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root) {
    this.verifyCallbackArg(callback);
    if (root == null) return;
    callback(root);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root) {
    this.verifyCallbackArg(callback);
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
    this.root = this.#buildTree();
  }

  getArrayOfNodes = (value) => {
    this.arr.push(value.data);
  };

  print(node) {
    console.log(node.data);
  }

  verifyCallbackArg(callback) {
    if (typeof callback != "function") throw new Error("Callback required");
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

/*let tree = new Tree([1, 5, 9, 14, 23, 27, 0, 23, 18, 2]);
tree.buildTree(tree.arr);
tree.insert(12, tree.root);
tree.insert(6, tree.root);

tree.prettyPrint(tree.root);
console.log(tree.arr);
tree.rebalance();
tree.prettyPrint(tree.root);
*/
