---
title: Sorting Algorithms (Part I)
updated:
  - { { updated } }
tags:
  - Sorting algorithms
  - Time Complexities
  - Insertion sort
  - Merge sort
  - Divide-and-conquer
  - Recursive
  - Heap Sort
  - Heap
  - Binary Tree
  - Complete Binary Tree
categories:
  - Study Algorithms
lang: en
comments: true
excerpt: >-
  Sorting algorithms are the backbone of computer science and play a critical
  role in organizing data efficiently. In this comprehensive guide, we'll delve
  into 3 core sorting algorithms: Insertion Sort, Merge Sort and Heap Sort, including their theoretical foundations,
  complexities, and practical implementations.
mathjax: true
date: 2023-04-19 09:05:24
---

Sorting algorithms are the backbone of computer science and play a critical role in organizing data efficiently. In this comprehensive guide, we'll delve into 7 core sorting algorithms, including their theoretical foundations, complexities, and practical implementations. This part, lets concentrate on the first 3 algorithms: Insertion Sort, Merge Sort and Heap Sort.

From _Insertion Sort_ to _Bucket Sort_, I will try to explain them in the most intuitive and easy-to-understand ways. Get ready to elevate your coding skills to new heights!

| Algorithm      | Time Complexities (worst/average) |
| :------------- | :-------------------------------: |
| Insertion Sort |             $Θ(n^2)$              |
| Merge Sort     |           $Θ(n \log n)$           |
| Heap Sort      |           $O(n \log n)$           |
| Quick Sort     |      $Θ(n^2)$ /$Θ(n \log n)$      |
| Counting Sort  |             $Θ(k+n)$              |
| Radix Sort     |            $Θ(d(n+k))$            |
| Bucket Sort    |         $Θ(n^2)$ /$Θ(n)$          |

## Insertion Sort

I've found the most intuitive way to understand sorting algorithms is using **playing cards**, I got this eureka! firstly in the book _Introduction to Algorithms_. I realized that when I was playing cards, I was actually using insertion sort to manage cards in my hand. Like this.

![Insertion_Sort.GIF](/images/%5BSorting%20Algorithms%5DInsertion_Sort.GIF)

It's fairly easy to understand its process, let's analyze its processing steps:

1. Pick the first card in the list. -> for loop
2. Find a position in the hand where the picked card is greater than the card in front and smaller than the card behind. -> search
3. Insert the picked card into the hand list at that position. -> array insert

So picking any search algorithm and array insert algorithm its easy to implement insertion sort. Here is my solution in JavaScript:

```js
const INSERTION_SORT = (A) => {
  let R = [A[0]];
  for (let i = 1; i < A.length; i++) {
    // for-loop for step one
    let j = R.length - 1;
    // from back to front search position where the target card grater than the behind one
    while (j >= 0 && A[i] <= R[j]) {
      R[j + 1] = R[j]; // prepare for array insert
      j--;
    }
    R[j + 1] = A[i];
  }
  return R;
};
```

Obviously, insertion sort has a time complexity of $O(n^2)$ due to its nested loops. However, if we choose binary search as our search algorithm instead of the linear search, the time complexity can be optimized to $O(n \log_2n)$

## Merge Sort

Merge Sort follows the **divide-and-conquer** method which can be illustrated in 3 steps:

- Divide: break the problem into several subproblem which are similar to the original problem but smaller size
- Conquer: solve the subproblem recursively
- Combine: combine these solutions to create a solution to the original problem

![Merge_Sort.GIF](/images/[Sorting%20Algorithms]Merge_Sort.gif)

Okay, let's move on step by step. First, divide the problem into smaller parts. Our big problem is to solve a needed sort list. Thereby, our small problem is to sort a small part of the list. We choose to divide list into 2 parts.

Next, if we can solve the smaller part of our problem, we should use **recursive** to solve all same small parts of our big problem. Finally, we combine this smaller ones into its origin problem. Here is the core `Divide()` code:

```js
const Divide = (A) => {
  if (A.length === 1) {
    return A;
  }
  const mid = A.length / 2;
  return Combine(Divide(A.slice(0, mid)), Divide(A.slice(mid)));
};
```

Since the list is divided recursively, the termination condition is when there is only one number in a small list, which does not require sorting in the divided process. Actually, the sort occur in the `Combine()` process, where two sorted arrays are merged into one. Here is an example implementation:

```js
const Combine = (L, R) => {
  const result = [];
  while (L.length > 0 && R.length > 0) {
    if (L[0] > R[0]) {
      result.push(R.shift());
    } else {
      result.push(L.shift());
    }
  }
  return [...result, ...L, ...R];
};
```

### Time Complexity

Merge sort uses divide-and-conquer approach, in order to understand its time complexity, let's break down the algorithm into steps: ①divide repeatedly till length == 1 ②Merge two smaller array and Combine

- Divide: We repeatedly keep dividing the original array of length $n$ by 2, until each sub-array has only one element. The equation is $n/2/2/2/2.../2 = 1$, and how many 2 we have, how many times we divided totally, solved $t=log_2n$. So, the total number of divisions is $log_2n$ times:
  - $n/2/2.../2=1$
  - $ n=1⨉2⨉2...⨉2$
  - $log_2n=log_22⨉2...⨉2=t \log_22=t$
  - $t=log_2n$
- Combine: The number of times we combine the sub-arrays is equal to the number of times we divided the original array, which is $O(log_2n)$. However, before each combine step, we need to merge two smaller arrays, and this merging process takes $O(n)$ time for all pairs of sub-arrays. Since the merging steps are performed at different levels of the recursion, the total time complexity for merging is $O(n \log_2n)$.

Considering the worst-case array of the sort algorithm, the overall time complexity is determined by the merging step, which is $O(n \log_2n)$.

## Heap Sort

### Heap

To truly understand heap sort, firstly we need to grasp the concept of a Heap. Heap is a binary tree data structure with 2 constraints:

1. complete binary tree: Every levels except the last one are filled, the last level's nodes are as far left as possible.
2. the value stored in each node is ≥(≤) the value in its children

Here is an example for array `[9,7,6,3,1,5]`

```text
          9(0)
         /   \
        7(1)  6(2)
       / \    /
    3(3)1(4) 5(5)
```

Traditionally, we think of a binary tree with a tree data structure. However, a complete binary tree can also be implemented using an array data structure. And it can easy to access its Parent, Left_Child, Right_Child by index.

In the above left example, you can see the relationship between vertex `i` and its parent or children. That is, for each vertex `i`, the indexes of its parent or children are: `parent_index=(i-1)/2`, `left_child_index=2i+1`, `right_child_index=2i`

```js
const parent = (i) => (i - 1) / 2;
const l_child = (i) => 2 * i + 1;
const r_child = (i) => 2 * i;
```

### Intuition

In a max-heap, where the value of each node's parent is greater than or equal to(≥) the value of the node itself. Thus, the largest element must be stored at root.

So imagine, there is a max-heap, it can build and maintain itself. When we pick the root, which contains the largest value, and replace it with a smaller value on the top. This disrupts the max-heap property, as the largest value is no longer at the root. But fear not! The heap has the ability to automatically rebuild itself, rearranging the elements to restore the max-heap property with the largest value back at the root.

If we continue this process of picking the largest value and replacing it until all elements are removed from the heap, we will get a sorted array.

### Implementation

`Heapify()`: maintain the max-heap property, $O(\log_2n)$.

```js
const Heapify = (A, i) => {
  const l = l_child(i);
  const r = r_child(i);
  let largest = i;
  // compare 3 numbers: A[i], A[l], A[r]
  if (l < A.length && A[l] > A[i]) {
    largest = l;
  }
  if (r < A.length && A[r] > A[largest]) {
    largest = r;
  }
  if (largest !== i) {
    // swap 2 numbers: A[largest], A[i]
    const temp = A[largest];
    A[largest] = A[i];
    A[i] = temp;
    Heapify(A, largest);
  }
};
```

`BuildHeap()`: initial unsorted array to a max-heap, for storing an n elements array, the leaves are the nodes indexed by n/2 +1, n/2 +2,...,n. Thus, we only need to loop `A.length/2`

```js
const BuildHeap = (A) => {
  for (let i = A.length / 2; i >= 0; i--) {
    Heapify(A, i);
  }
  return A;
};
```

so the main function of heap sort is:

```js
const HEAP_SORT = (A) => {
  const result = [];
  BuildHeap(A);
  let j = A.length - 1;
  while (A.length > 0) {
    result.push(A.shift());
    A[0] && A.unshift(A.pop());
    Heapify(A, 0);
  }
  return result;
};
```
