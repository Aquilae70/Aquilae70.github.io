---
title: Summary of All Sorting Algorithms
date: {{date}}
tags:
  - ''
categories:
  - ''
lang: en
comments: false
excerpt: ''
mathjax: true
---

## Simple Comparison-Based Sorting Algorithms

|                | Time Complexity | Extra Space | Stability |
| :------------: | :-------------: | :---------: | :-------: |
|  Bubble Sort   |    $O(n^2)$     |      -      |           |
| Selection Sort |    $O(n^2)$     |   $O(1)$    |           |
| Insertion Sort |    $O(n^2)$     |      -      |           |

### Bubble Sort

![Bubble-Sort](/images/[Sorting-Algorithms-2]-Bubble-Sort.gif)

```js
const bubbleSort = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
};
```

### Selection Sort

![Selection-Sort](/images/[Sorting-Algorithms-2]-Selection-Sort.gif)

```js
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
};
```

### Insertion Sort

![Insertion-Sort](/images/[Sorting-Algorithms-2]-Insertion-Sort.gif)

```js
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    }
  }
  return arr;
};
```

## Efficient Comparison-Based Algorithms

|            | Time Complexity | Extra Space | Stability |
| :--------: | :-------------: | :---------: | :-------: |
| Merge Sort |  $O(n \log n)$  |             |           |
| Quick Sort |  $O(n \log n)$  |             |           |
| Heap Sort  |  $O(n \log n)$  |             |           |
| Shell Sort |  $O(n \log n)$  |             |           |

### Merge Sort

![Merge-Sort](/images/[Sorting-Algorithms-2]Merge-Sort.jpg)

```js
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  let result = [];
  while (left.length && right.length) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
};
```

### Quick Sort

```js
const quickSort = (arr) =>
  arr.length <= 1
    ? arr
    : [...quickSort(arr.filter((x) => x < arr[0])), arr[0], ...quickSort(arr.filter((x) => x >= arr[0]))];
```

### Heap Sort

```js
const heapify = (n, i) => {
  let largest = i,
    left = 2 * i + 1,
    right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(n, largest);
  }
};
```

### Shell Sort

## Integer Non-Comparison-Based Sorting

|                 | Time Complexity | Extra Space | Stability |
| :-------------: | :-------------: | :---------: | :-------: |
|  Counting Sort  |    $O(n+k)$     |             |           |
|   Bucket Sort   |    $O(n+k)$     |             |           |
| Pigeonhole Sort |    $O(n+k)$     |             |           |
|   Radix Sort    |     $O(nk)$     |             |           |
