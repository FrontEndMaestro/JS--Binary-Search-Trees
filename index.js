import treeClass from "./treeClass.js";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createArray() {
  let arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(getRandomNumber(100));
  }
  return arr;
}

let Tree = new treeClass(createArray());
//Tree.buildTree();
//Tree.prettyPrint(Tree.root);
console.log("Balanced? ",Tree.isBalanced(Tree.root));
//Tree.inOrderForEach(Tree.print, Tree.root);
//Tree.preOrderForEach(Tree.print, Tree.root);
//Tree.postOrderForEach(Tree.print, Tree.root);
Tree.insert(120, Tree.root);
Tree.insert(140, Tree.root);
//Tree.insert(110, Tree.root);

//Tree.insert(180, Tree.root);
//Tree.insert(132, Tree.root);

//Tree.prettyPrint(Tree.root);
//console.log("Balanced? ",Tree.isBalanced(Tree.root));
Tree.rebalance()
Tree.prettyPrint(Tree.root);
//console.log("Balanced? ",Tree.isBalanced(Tree.root));
Tree.levelOrderForEach(Tree.print)
/*Tree.rebalance();
console.log(Tree.isBalanced());

Tree.inOrderForEach(Tree.prettyPrint, Tree.root);
Tree.preOrderForEach(Tree.prettyPrint, Tree.root);
Tree.postOrderForEach(Tree.prettyPrint, Tree.root);
*/
