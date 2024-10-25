---
title: Dynamic Programming (DP)
tags:
  - Dynamic Programming
  - Divide-and-conquer
categories:
  - Study Algorithms
lang: en
comments: false
mathjax: true
date: 2023-05-12 18:04:51
---

Dynamic programming is a optimization technique similar to the divide-and-conquer method, where both break problems into smaller parts. However, dynamic programming goes further by storing solutions to sub-problems, saving time and effort by avoiding repeated calculations.

- Find a solution with the optimal value.
- Minimization or maximization.

<!--more-->

## Solving Process

### Analyze the question

1. Analyze the problem and find the sub-problems: One function with the same methods but different parameter.
2. Build a recursive top-down solution
3. Understand the structure of the recursive tree: Find the repeated computation parameters and store.

### Optimizing methods

1. Characterize the structure of an optimal solution: “Store, don’t recompute” => time-memory trade-off.
2. Recursively define the value of an optimal solution: Top-down with memoization (**Memoizing** is remembering what has been computed previously)
3. Compute the value of an optimal solution, typically in a bottom-up fashion.

## Rod cutting problem

Given a rod of length $n$ and a list of prices for different lengths, determine the maximum revenue that can be obtained by cutting the rod into pieces and selling them according to the given prices.

![Rod cutting problem](/images/[Dynamic-Programming]Rod-cutting-problem.jpeg)

Original solution

```ts
function MaxP(len: number): number {
  if (len === 0) return 0;
  let max = -1;
  for (let i = 1; i <= len; i++) {
    max = Math.max(P[i] + MaxP(len - i), max);
  }
  return max;
}
```

Time Complexity: $O(2^n)$ -> $O(n^2)$. Optimization. Also can be changed to a loop expression.

```ts
const maxP = [0];
function MaxP(len: number): number {
  if (maxP[len] === undefined) {
    for (let i = 1; i <= len; i++) {
      maxP[len] = Math.max(P[i] + MaxP(len - i), maxP[len] || -1);
    }
  }
  return maxP[len];
}
```

## Matrix-chain multiplication

Given a sequence of matrices $A_1, A_2, \dots, A_n$, the matrix-chain multiplication problem is to determine the most efficient way to fully parenthesize the product $A_1 \times A_2 \times \dots \times A_n$, such that the total number of scalar multiplications is minimized.

![Matrix-chain multiplication](/images/[Dynamic-Programming]Matrix-chain-multiplication.png)

Based on this thinking process, we can successfully build an memoization solution.

```ts
const Memo = Array.from({length: arr.length}, () => new Array(arr.length).fill(Infinity));
Memo.forEach((e, i) => (e[i] = 0));

const memoCost = (i: number, j: number) => {
  for (let k = i; k < j; k++) {
    Memo[i][j] = Math.min(Memo[i][j], minCost(i, k) + minCost(k + 1, j) + arr[i - 1] * arr[k] * arr[j]);
  }
  return Memo[i][j];
};
```

## Longest common subsequence

Given two sequences: $A = [a_1, a_2, \dots, a_m]$, $B = [b_1, b_2, \dots, b_n]$. The Longest Common Subsequence is the longest sequence $S = [s_1, s_2, \dots, s_k]$ such that $S$ is a subsequence of both $A$ and $B$. Here, $k$ is the maximum possible length for such a subsequence. A subsequence doesn't have to be consecutive, but it has to be in order.

![Longest common subsequence](/images/[Dynamic-Programming]Longest-common-subsequence.png)

A simple recursive solution

```ts
const LCS = (i: number, j: number) => {
  if (i < 0 || j < 0) return 0;
  if (A[i] == B[j]) return LCS(i - 1, j - 1) + 1;
  else return Math.max(LCS(i, j - 1), LCS(i - 1, j));
};
```

Memoization

```js
const Memo = Array.from({length: A.length}, () => new Array(B.length).fill(-1));
const LCS = (i: number, j: number) => {
  if (i < 0 || j < 0) return 0;
  if (Memo[i][j] != -1) return Memo[i][j];

  if (A[i] == B[j]) Memo[i][j] = LCS(i - 1, j - 1) + 1;
  else Memo[i][j] = Math.max(LCS(i - 1, j), LCS(i, j - 1));

  return Memo[i][j];
};
```
