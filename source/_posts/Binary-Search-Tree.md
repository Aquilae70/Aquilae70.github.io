---
title: Binary Search Tree (BST)
tags:
  - Binary Search Tree (BST)
  - Data Structure
  - Binary Tree
categories:
  - Study Algorithms
lang: en
comments: true
mathjax: false
date: 2023-05-11 14:33:44
updated: {{updated}}
excerpt: Simple introduction of binary search tree
---

You can use Search Tree both as a dictionary and as a priority queue.

## What is a binary search tree

Binary search tree has two significant properties:

- Fist, its a binary tree data structure, include _left_ _right_ and _parent_.
- Second, for each node of the tree, the value of its left must be greater than or equal to itself, the value of itself must be greater than or equal to its right. (right<=itself<=left)

![BST Introduction.png](/images/[Binary-Search-Tree]BST_Introduction.png)

Because binary-search-tree property, we can easily print out all keys in sorted order by a simple recursive algorithm, same as binary-tree **Inorder Traverse**. And it takes liner time to perform.

```js
const InOrderTraverse = (T: TreeNode | null) => {
  if (T === null) return;
  InOrderTraverse(T.left);
  console.log(T.val); // print out
  InOrderTraverse(T.right);
};
```

## Query a binary search tree

### Search

The tree search algorithm begins its search at the root and traces a simple path downward in the tree. If the value needed search smaller than the node value, the search continues to its left subtree, otherwise continues to its right subtree. Until two values are equal or the tree node value is null

```js
const Search = (T: TreeNode | null, value: number): TreeNode | null => {
  if (T === null || T.val === value) return T;
  if (value < T.val) return Search(T.left, value);
  else return Search(T.right, value);
};
```
