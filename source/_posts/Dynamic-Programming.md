---
title: Dynamic Programming (DP)
tags:
  - Dynamic Programming (DP)
  - Memoization
  - Optimization
  - Divide-and-conquer
  - Rod Cutting Problem
  - Time Complexities
categories:
  - Study Algorithms
lang: en
comments: false
mathjax: true
date: 2023-05-12 18:04:51
excerpt: Dynamic programming is a problem-solving approach that is useful for optimization problems. In these problems, you have to make a series of choices to find the best possible solution. Each choice leads to smaller, similar problems, and these smaller problems tend to repeat. The trick is to remember the solutions to these smaller problems instead of calculating them again and again.
---

Think of dynamic programming as the clever cousin of the divide-and-conquer method. While both approaches involve breaking problems into smaller parts, dynamic programming takes it a step further by cleverly storing the solutions to each small subproblem. This trick saves time and effort by avoiding repetitive computations of the same subproblems over and over again.

Dynamic programming finds its strength in optimizing problems, aiming to discover the solution with the best (either minimum or maximum) value. This solution is referred to as an "optimal solution" because it achieves the best possible value, but it's important to note that there can be multiple solutions that achieve the same optimal value.

In our first example, we will apply dynamic programming to solve a straightforward problem: determining the best positions to cut steel rods:

## Rod cutting problem

Given a rod of length $n$ and a list of prices for different lengths, determine the maximum revenue that can be obtained by cutting the rod into pieces and selling them according to the given prices. Let's say we have a rod of length 4, here is an example:

![Rod cutting problem](/images/[Dynamic-Programming]Rod%20cutting%20problem.png)

### Brute force

As we said the intuition before, dynamic programming using the thought of divide-and-conquer. So at the beginning, we need to solve this problem just by splitting it into sub-problems and deal with each of them recursively. The current revenue is the price $i$ plus the max price $i-1$. By comparing every possible $i$, the max revenue is our goal.

```ts
function cutRod(rodLength: number): number {
  if (rodLength === 0) return 0;
  let maxRevenue = -1;

  for (let i = 1; i <= rodLength; i++) {
    const revenue = prices[i] + cutRod(rodLength - i);
    maxRevenue = Math.max(maxRevenue, revenue);
  }
  return maxRevenue;
}
```

However, the brute force approach has an exponential time complexity $O(2^n)$, because it considers all possible cut combinations.

### Memorize the result

We can optimize this approach using memoization, store and reuse the result for saving the expensive function calls. Before making any recursive calls, check if the maximum revenue for the current rod length is already stored in the memoization table. If it is, return the stored value instead of perform the recursive computation.

```ts
const Memo = [0];
function cutRod(rodLength: number): number {
  if (Memo[rodLength] === undefined) {
    for (let i = 1; i <= rodLength; i++) {
      const revenue = prices[i] + cutRod(rodLength - i);
      Memo[rodLength] = Math.max(Memo[rodLength] || -1, revenue);
    }
  }
  return Memo[rodLength];
}
```

Or we can change it to loop expression

```ts
function cutRod(rodLength: number): number {
  if (Memo[rodLength] === undefined) {
    for (let i = 1; i <= rodLength; i++) {
      for (let j = 1; j <= i; j++) {
        const revenue = prices[j] + Memo[i - j];
        Memo[i] = Math.max(Memo[i] || -1, revenue);
      }
    }
  }

  return Memo[rodLength];
}
```

## Conclusion Strategy

To create a dynamic programming algorithm, you can follow a sequence of four steps:

1. **Understand the structure of an optimal solution** Analyze the problem to identify the key components and subproblems that contribute to achieving the best value or outcome.
2. **Recursively define the value of an optimal solution** Break down the problem into smaller subproblems and define the value of the optimal solution in terms of the values of these subproblems. Use recursion to solve these subproblems.
3. **Compute the value of an optimal solution, typically in a bottom-up fashion** Start solving the subproblems from the simplest ones and gradually build up to the larger problem. Store the results of solved subproblems in a table or array to avoid redundant calculations.
4. **Construct an optimal solution from computed information** If you need the actual solution (not just its value), use the information stored during step 3 to construct the optimal solution. This step allows you to determine the specific elements or choices that lead to the optimal solution.

Note that if you only require the value of the optimal solution and not the solution itself, you can skip step 4 However, if you do perform step 4, it is often beneficial to maintain additional information during step 3, as it simplifies the process of constructing the optimal solution.
