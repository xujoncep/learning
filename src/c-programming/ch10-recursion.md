# Topic 10: Recursion

<div align="center">

*"Recursion বোঝার জন্য আগে Recursion বুঝতে হবে — এটাই Recursion!"*

</div>

---

## 📖 10.1 ধারণা (Concept)

Recursion = function **নিজেই নিজেকে call** করে। প্রতিটি recursive function এ **দুটি অংশ** বাধ্যতামূলক:

```
Recursion Structure:
━━━━━━━━━━━━━━━━━━━
1. Base Case     → থামার শর্ত (ছাড়া infinite → Stack Overflow!)
2. Recursive Case → নিজেকে ছোট সমস্যা দিয়ে call

void recursive(params) {
    if (base_condition)         ← BASE: থামো!
        return;
    recursive(smaller_params);  ← RECURSIVE: ছোট করে call
}
```

### Factorial Visualization

```
factorial(5)
├── 5 * factorial(4)
│       ├── 4 * factorial(3)
│       │       ├── 3 * factorial(2)
│       │       │       ├── 2 * factorial(1)
│       │       │       │       └── return 1  ← BASE!
│       │       │       └── return 2*1 = 2
│       │       └── return 3*2 = 6
│       └── return 4*6 = 24
└── return 5*24 = 120
```

---

## 💻 10.2 Classic Recursive Functions

### Factorial

```c
int factorial(int n) {
    if (n <= 1) return 1;           /* Base case */
    return n * factorial(n - 1);    /* Recursive case */
}
/* factorial(5) = 5 × 4 × 3 × 2 × 1 = 120 */
```

### Fibonacci

```c
int fib(int n) {
    if (n <= 1) return n;                   /* Base: fib(0)=0, fib(1)=1 */
    return fib(n - 1) + fib(n - 2);        /* Two recursive calls! */
}
/* ⚠️ O(2^n) — extremely slow! Use memoization or iterative */
```

### GCD (Euclidean)

```c
int gcd(int a, int b) {
    if (b == 0) return a;           /* Base case */
    return gcd(b, a % b);          /* Recursive */
}
/* gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) → 6 */
```

### Power (Fast — O(log n))

```c
long long power(int base, int exp) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    else return base * half * half;
}
```

---

## 💻 10.3 Head vs Tail Recursion — Output Prediction Key!

```c
#include <stdio.h>

/* HEAD: call first, work after (ascending output) */
void head(int n) {
    if (n == 0) return;
    head(n - 1);          /* ← call FIRST */
    printf("%d ", n);      /* ← work AFTER return */
}

/* TAIL: work first, call after (descending output) */
void tail(int n) {
    if (n == 0) return;
    printf("%d ", n);      /* ← work FIRST */
    tail(n - 1);          /* ← call AFTER */
}

/* BOTH: work before AND after call (mirror output!) */
void both(int n) {
    if (n == 0) return;
    printf("%d ", n);      /* ← winding */
    both(n - 1);
    printf("%d ", n);      /* ← unwinding */
}

int main() {
    printf("Head: "); head(4); printf("\n");
    /* Output: 1 2 3 4 (ascending — unwinding prints) */

    printf("Tail: "); tail(4); printf("\n");
    /* Output: 4 3 2 1 (descending — winding prints) */

    printf("Both: "); both(3); printf("\n");
    /* Output: 3 2 1 1 2 3 (mirror!) */

    return 0;
}
```

> **Exam Pattern:** print **before** call = descending, print **after** call = ascending, print **both sides** = mirror!

---

## 💻 10.4 Tower of Hanoi

```c
#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n - 1, from, aux, to);          /* n-1 disks: from → aux */
    printf("Disk %d: %c → %c\n", n, from, to); /* nth disk: from → to */
    hanoi(n - 1, aux, to, from);          /* n-1 disks: aux → to */
}

int main() {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}
/* Total moves = 2^n - 1 = 7 for n=3 */
```

> **Formula:** n disks → **2ⁿ - 1** moves। n=3 → 7, n=4 → 15, n=10 → 1023

---

## ❓ 10.5 MCQ Problems

---

**MCQ 1:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n == 0) return;
    fun(n - 1);
    printf("%d ", n);
}
int main() { fun(4); }
```

| Option | Answer |
|--------|--------|
| (a) 4 3 2 1 | |
| (b) **1 2 3 4** | ✅ |
| (c) 4 3 2 1 0 | |
| (d) 0 1 2 3 4 | |

> **Head recursion:** call আগে, print পরে (unwinding) → **ascending**

---

**MCQ 2:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n == 0) return;
    printf("%d ", n);
    fun(n - 1);
    printf("%d ", n);
}
int main() { fun(3); }
```

| Option | Answer |
|--------|--------|
| (a) **3 2 1 1 2 3** | ✅ |
| (b) 1 2 3 3 2 1 | |
| (c) 3 2 1 | |
| (d) 3 2 1 3 2 1 | |

> Print **both sides** → winding: 3 2 1, unwinding: 1 2 3 → **mirror!**

---

**MCQ 3:** Tower of Hanoi তে 4 disks → কত moves?

| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) **15** | ✅ |
| (c) 16 | |
| (d) 4 | |

> Moves = 2ⁿ - 1 = 2⁴ - 1 = **15**

---

**MCQ 4:** Base case ছাড়া recursion করলে কী হয়?

| Option | Answer |
|--------|--------|
| (a) 0 return | |
| (b) **Stack Overflow** | ✅ |
| (c) Compilation Error | |
| (d) Infinite loop (no crash) | |

> Stack memory শেষ → **crash** (Segmentation Fault)!

---

**MCQ 5:** নিচের কোডের output কী?
```c
int fun(int n) {
    if (n <= 1) return n;
    return fun(n-1) + fun(n-2);
}
printf("%d", fun(6));
```

| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **8** | ✅ |
| (c) 13 | |
| (d) 5 | |

> **Fibonacci!** 0,1,1,2,3,5,**8** (index 0-6)

---

**MCQ 6:** নিচের কোডের output কী?
```c
int fun(int n) {
    if (n == 0) return 0;
    return fun(n/2) + 1;
}
printf("%d", fun(16));
```

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 16 | |
| (d) 8 | |

> fun(16)→fun(8)+1→fun(4)+1→fun(2)+1→fun(1)+1→fun(0)+1=0+1=1 → 1+1+1+1+1 = **5** (log₂(16)+1)

---

**MCQ 7:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n > 0) {
        fun(n - 1);
        printf("%d ", n);
        fun(n - 1);
    }
}
int main() { fun(3); }
```

| Option | Answer |
|--------|--------|
| (a) **1 2 1 3 1 2 1** | ✅ |
| (b) 3 2 1 1 2 1 | |
| (c) 1 2 3 2 1 | |
| (d) 1 1 2 1 1 2 3 | |

> Two recursive calls → tree-like expansion → **1 2 1 3 1 2 1**

---

## 💻 10.6 Recursion vs Iteration

```
┌──────────────────┬──────────────────┬──────────────────┐
│ Feature          │ Recursion        │ Iteration        │
├──────────────────┼──────────────────┼──────────────────┤
│ Code clarity     │ Clean, elegant   │ Longer but clear │
│ Memory           │ Stack grows!     │ Constant         │
│ Speed            │ Slower (overhead)│ Faster           │
│ Stack Overflow   │ Possible!        │ No risk          │
│ Best for         │ Tree, divide &   │ Simple counting  │
│                  │ conquer          │ loops            │
└──────────────────┴──────────────────┴──────────────────┘

Complexity:
  fun(n-1)              → O(n) time, O(n) space
  fun(n/2)              → O(log n) time, O(log n) space
  fun(n-1) + fun(n-1)   → O(2^n) time! ⚠️ (Fibonacci naive)
  fun(n-1) + fun(n-2)   → O(2^n) time! ⚠️
```

---

## 📝 10.7 Summary

- Recursion = function **নিজেকে call** করে। দুটি অংশ **বাধ্যতামূলক**: **base case** (থামার শর্ত) ও **recursive case** (ছোট সমস্যায় call)। Base case ছাড়া = **infinite recursion** → **Stack Overflow** (crash!)।

- **Head recursion** (call আগে, print পরে) → output **ascending** (1 2 3 4)। **Tail recursion** (print আগে, call পরে) → output **descending** (4 3 2 1)। **Both sides print** → output **mirror** (3 2 1 1 2 3)। এই pattern exam এ সবচেয়ে বেশি আসে — trace করে output predict করতে হয়।

- **Fibonacci naive recursion** = **O(2ⁿ)** — extremely slow! fib(40) seconds লাগে। Fix: **memoization** (cache results) → O(n), বা **iterative** approach। Exam এ complexity জিজ্ঞেস করা হয়।

- **Tower of Hanoi** moves = **2ⁿ - 1**। n=3 → 7, n=4 → 15, n=10 → 1023। Algorithm: (1) n-1 disks move to auxiliary, (2) nth disk move to destination, (3) n-1 disks move from auxiliary to destination।

- **Stack depth limit** ~ 10,000 calls (system dependent)। এর বেশি → **Stack Overflow**। বড় input এ **iteration ব্যবহার** করুন। সব recursion কে iteration এ convert করা **সম্ভব**, কিন্তু Tree/Backtracking এ recursion **natural**।

- **Multiple recursive calls** = **exponential** complexity: `fun(n-1) + fun(n-1)` → O(2ⁿ)। **Single call** = linear: `fun(n-1)` → O(n)। **Halving call** = logarithmic: `fun(n/2)` → O(log n)। Exam এ complexity question আসে।

- Recursion trace করার কৌশল: **call stack** এ প্রতিটি call push করুন, base case এ pop শুরু করুন। **winding** (call going down) ও **unwinding** (returning back) দুটি phase — কোথায় print আছে সেটাই output determine করে।

---
---

<div align="center">


*Storage Classes, Scope — variable কোথায় থাকে, কতক্ষণ বাঁচে*

</div>

---
---
