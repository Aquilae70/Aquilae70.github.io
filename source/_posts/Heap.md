---
title: Binary Heap
date: 2024-10-13 19:26:58
tags:
  - Priority Queue
  - Heap Sort
  - Heap
  - Data Structures
categories:
  - Study Algorithms
lang: en
excerpt: Learn about Binary Heaps, their operations, Heap Sort algorithm, and Priority Queue implementations with detailed JavaScript examples.
comments: false
mathjax: true
---

## Binary Heap Data Structure

### Concepts

1. Binary Heap is a nearly completely binary tree, the last one can only has one child.
2. The value stored in the parent node must monotonic ≥(≤) its children nodes.
3. Binary Heap can be stored as an Array.
   ![Binary Heap Concepts](/images/[Binary-Heap]Concepts.png)

### Heapify

1. Compare 3 numbers `arr[i]`, `arr[l]`, `arr[r]` and select the largest as the parent node. Set the max index as the next root and recurse.
2. $O(\log n)$ per Heapify operation.
3. An Operation of Heapify is to move one node down to the tree.

```js
const HeapifyDown = (arr: number[], i: number, length: number) => {
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  let max = i;
  if (l < length && arr[l] > arr[max]) max = l;
  if (r < length && arr[r] > arr[max]) max = r;

  if (max != i) {
    [arr[i], arr[max]] = [arr[max], arr[i]]; // Swap
    HeapifyDown(arr, max, length);
  }
};
```

Heapify-Up: Swap the current node and the parent node if current <= parent.

```js
const HeapifyUp = (arr: number[], i: number) => {
  while (arr[i] > arr[Math.floor((i - 1) / 2)]) {
    const parent = Math.floor((i - 1) / 2);
    [arr[i], arr[parent]] = [arr[parent], arr[i]];
    i = parent;
  }
};
```

1. Build a Heap: Apply Heapify to all non-leaf nodes. loop from n/2 to 1
2. $O(n)$ build process.
3. We can build a heap form any index in the array.

```js
const BuildMaxHeap = (arr: number[], size: number) => {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    HeapifyDown(arr, i, size);
  }
};
```

### Operations on a Max Heap

1. `build()`
2. `getMax()`: Return the root of the heap
3. `insert(val)`: Push it to the end of the array and Heapify-Up, $O(\log n)$
4. `deleteMax()`: Delete the root, replaces it with the last element and re-heapify, $O(\log n)$
5. `increaseKey(i, newVal)`: similar as insert, change i and Heapify-Up, $O(\log n)$
6. `deleteElement(i)`: Replace it with the last element, remove the last element, and re-heapify, $O(\log n)$

## Heap Sort

1. Build a max Heap
2. Swap the largest value on root and the value at the end of the array.
3. Heapify the root to get the next largest root.
4. Loop this until only one node (the smallest element) remains

```js
const HeapSort = (arr: number[]) => {
  BuildMaxHeap(arr, arr.length);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    HeapifyDown(arr, 0, i);
  }
};
```

## Priority Queue

A priority queue is an abstract data type that operates similarly to a regular queue (FIFO) but where each element has an associated priority.

- `Insert()`: Enqueue, add an element to the end of the queue.
- `DeleteMax/Min()`: Dequeue, remove and return the element from the front of the queue.

### Implementation

We can implement Priority Queues simply using an array, but it has efficiency limitation. When both insertions and deletions are frequent, these array/list implementations can lead to inefficiencies.

|                |   Insert    | Dequeue | IncreasePriority |  Peek  |
| :------------: | :---------: | :-----: | :--------------: | :----: |
| Unsorted Array |   $O(1)$    | $O(n)$  |      $O(n)$      | $O(n)$ |
|  Sorted Array  |   $O(n)$    | $O(1)$  |      $O(n)$      | $O(1)$ |
|      Heap      | $O(\log n)$ | $O(1)$  |   $O(\log n)$    | $O(1)$ |

The heap has balanced time complexity for both insertion and extraction, which gives a good compromise compared to Array.

```js
class PriorityQueue {
  heap: Event[] = [];

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(value: number, priority: number) {
    this.heap.push({value, priority});
    this._HeapifyUp(this.heap.length - 1);
  }

  getMax() {
    return this.heap[0].value;
  }

  removeMax() {
    this.heap.shift();
    this.heap.unshift(this.heap.pop());
    this._HeapifyDown(0);
  }

  _HeapifyUp(i: number) {
    while (i > 0 && this.heap[i].priority > this.heap[Math.floor((i - 1) / 2)].priority) {
      const parent = Math.floor((i - 1) / 2);
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }

  _HeapifyDown(i: number) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    let max = i;
    if (l < this.heap.length && this.heap[l].priority > this.heap[max].priority) max = l;
    if (r < this.heap.length && this.heap[r].priority > this.heap[max].priority) max = r;

    if (max != i) {
      [this.heap[i], this.heap[max]] = [this.heap[max], this.heap[i]];
      this._HeapifyDown(max);
    }
  }
}
```
