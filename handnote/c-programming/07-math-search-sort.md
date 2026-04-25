# Chapter 07 — Math, Search & Sort — C Programming 💻

> Number system, series, digit manipulation, linear/binary search, basic sorts।

---
# LEVEL 8-9: MATH, SEARCH & SORT

*Number crunching, searching, sorting — algorithm fundamentals*


---
---

# Topic 26: Number System Conversion

<div align="center">

*"Decimal ↔ Binary ↔ Octal ↔ Hex — computer এর ভাষা বুঝতে হলে base conversion জানতেই হবে"*

</div>

---

## 📖 26.1 Number Systems Overview

```
┌──────────┬──────┬──────────┬──────────────────┐
│ System   │ Base │ Digits   │ C Prefix         │
├──────────┼──────┼──────────┼──────────────────┤
│ Binary   │  2   │ 0, 1     │ 0b (0b1010)      │
│ Octal    │  8   │ 0-7      │ 0  (012)         │
│ Decimal  │ 10   │ 0-9      │ none (10)        │
│ Hex      │ 16   │ 0-9, A-F │ 0x (0xA)         │
└──────────┴──────┴──────────┴──────────────────┘

Quick Table:
Dec │ Bin  │ Oct │ Hex
────┼──────┼─────┼────
 0  │ 0000 │  0  │  0
 5  │ 0101 │  5  │  5
 10 │ 1010 │ 12  │  A
 15 │ 1111 │ 17  │  F
 16 │10000 │ 20  │ 10
255 │11111111│377│ FF
```

---

## 💻 26.2 Conversion Functions

```c
#include <stdio.h>

/* ══════ Decimal → Binary (print) ══════ */
void decToBin(int n) {
    if (n == 0) { printf("0"); return; }
    int bits[32], count = 0;
    while (n > 0) {
        bits[count++] = n % 2;
        n /= 2;
    }
    for (int i = count - 1; i >= 0; i--)
        printf("%d", bits[i]);
}
/* 13 → 1101 */

/* ══════ Binary → Decimal ══════ */
int binToDec(long long bin) {
    int dec = 0, base = 1;
    while (bin > 0) {
        dec += (bin % 10) * base;
        base *= 2;
        bin /= 10;
    }
    return dec;
}
/* 1101 → 13 */

/* ══════ Decimal → Octal ══════ */
void decToOct(int n) {
    printf("%o", n);          /* built-in! */
}

/* ══════ Decimal → Hex ══════ */
void decToHex(int n) {
    printf("%X", n);          /* built-in! */
}

/* ══════ printf built-in conversions ══════ */
int main() {
    int n = 255;
    printf("Decimal: %d\n", n);     /* 255 */
    printf("Octal:   %o\n", n);     /* 377 */
    printf("Hex:     %X\n", n);     /* FF */
    printf("Hex(0x): %#x\n", n);    /* 0xff */

    return 0;
}
```

---

## ❓ 26.3 MCQ Problems

---

**MCQ 1:** Binary `1011` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **11** | ✅ |
| (c) 13 | |
| (d) 9 | |

> 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = **11**

---

**MCQ 2:** Decimal `25` = Binary?

| Option | Answer |
|--------|--------|
| (a) 10101 | |
| (b) **11001** | ✅ |
| (c) 10011 | |
| (d) 11010 | |

> 25÷2: 1,0,0,1,1 (bottom-up) → **11001**

---

**MCQ 3:** `0xFF` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 16 | |
| (b) **255** | ✅ |
| (c) 15 | |
| (d) 256 | |

> F=15. 15×16+15 = 240+15 = **255**

---

**MCQ 4:** Octal `17` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 17 | |
| (b) **15** | ✅ |
| (c) 14 | |
| (d) 8 | |

> 1×8 + 7×1 = **15**

---

## 📝 26.4 Summary

- **Binary** (base 2): computer এর native language। C prefix: `0b`। **Octal** (base 8): prefix `0`। **Hex** (base 16): prefix `0x`

- **Decimal → Binary:** বারবার 2 দিয়ে ভাগ, remainder নিচ থেকে পড়ুন। **Binary → Decimal:** প্রতিটি bit × 2^position

- **printf** built-in conversion: `%o`=octal, `%x`=hex, `%d`=decimal। `%#x` = "0x" prefix সহ

- **Quick trick:** 4-bit group = 1 hex digit। `1111` = F, `1010` = A। Binary ↔ Hex দ্রুত convert হয়

---
---

# Topic 27: Series & Sequences

<div align="center">

*"Series = pattern চিনে formula বের করো — exam এ সিরিজের sum ও nth term আসে"*

</div>

---

## 💻 27.1 Common Series

```c
#include <stdio.h>

int main() {
    int n = 10;

    /* ══════ Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13... ══════ */
    int a = 0, b = 1;
    printf("Fibonacci: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b; b = next;
    }
    printf("\n");

    /* ══════ AP: a, a+d, a+2d... ══════ */
    int first = 2, d = 3;
    printf("AP: ");
    for (int i = 0; i < n; i++)
        printf("%d ", first + i * d);    /* 2, 5, 8, 11... */
    printf("\n");
    /* Sum = n/2 * (2a + (n-1)d)  OR  n/2 * (first + last) */

    /* ══════ GP: a, a*r, a*r²... ══════ */
    float a_gp = 2, r = 3;
    printf("GP: ");
    float term = a_gp;
    for (int i = 0; i < 6; i++) {
        printf("%.0f ", term);          /* 2, 6, 18, 54... */
        term *= r;
    }
    printf("\n");
    /* Sum = a*(r^n - 1)/(r - 1) */

    /* ══════ Special: 1² + 2² + 3²... ══════ */
    int sumSq = 0;
    for (int i = 1; i <= n; i++) sumSq += i * i;
    printf("Sum of squares(10) = %d\n", sumSq);   /* 385 */
    /* Formula: n(n+1)(2n+1)/6 */

    /* ══════ Special: 1³ + 2³ + 3³... ══════ */
    int sumCube = 0;
    for (int i = 1; i <= n; i++) sumCube += i * i * i;
    printf("Sum of cubes(10) = %d\n", sumCube);     /* 3025 */
    /* Formula: [n(n+1)/2]² */

    /* ══════ Harmonic: 1 + 1/2 + 1/3 + 1/4... ══════ */
    float harmonic = 0;
    for (int i = 1; i <= n; i++) harmonic += 1.0f / i;
    printf("Harmonic(10) = %.4f\n", harmonic);      /* 2.9290 */

    return 0;
}
```

---

## 📖 27.2 Formula Sheet

```
┌─────────────────────┬─────────────────────────────────┐
│ Series              │ Sum Formula                     │
├─────────────────────┼─────────────────────────────────┤
│ 1+2+3+...+n        │ n(n+1)/2                        │
│ 1²+2²+...+n²       │ n(n+1)(2n+1)/6                  │
│ 1³+2³+...+n³       │ [n(n+1)/2]²                     │
│ AP sum              │ n/2 × (2a + (n-1)d)             │
│ GP sum              │ a(rⁿ - 1)/(r - 1)              │
│ AP nth term         │ a + (n-1)d                      │
│ GP nth term         │ a × r^(n-1)                     │
│ Fibonacci           │ F(n) = F(n-1) + F(n-2)         │
└─────────────────────┴─────────────────────────────────┘
```

---

## ❓ 27.3 MCQ Problems

---

**MCQ 1:** `1+2+3+...+100` = ?

| Option | Answer |
|--------|--------|
| (a) 5000 | |
| (b) **5050** | ✅ |
| (c) 10000 | |
| (d) 10100 | |

> n(n+1)/2 = 100×101/2 = **5050**

---

**MCQ 2:** AP: first=3, d=5, 10th term = ?

| Option | Answer |
|--------|--------|
| (a) 50 | |
| (b) **48** | ✅ |
| (c) 53 | |
| (d) 45 | |

> a + (n-1)d = 3 + 9×5 = 3+45 = **48**

---

**MCQ 3:** Fibonacci 7th term (0-indexed: F(7)) = ?

| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) **13** | ✅ |
| (c) 21 | |
| (d) 11 | |

> 0,1,1,2,3,5,8,**13** (index 0-7)

---

## 📝 27.4 Summary

- **AP:** nth term = `a + (n-1)d`, sum = `n/2 × (first + last)`। **GP:** nth term = `a × r^(n-1)`, sum = `a(rⁿ-1)/(r-1)`

- **Sum formulas মুখস্থ:** 1+2+...+n = `n(n+1)/2`, squares = `n(n+1)(2n+1)/6`, cubes = `[n(n+1)/2]²`

- **Fibonacci** iterative: O(n) time, O(1) space — exam এ iterative ই চাওয়া হয়। Recursive = O(2ⁿ) — avoid!

---
---

# Topic 28: Digit Manipulation

<div align="center">

*"সংখ্যার digit নিয়ে খেলা — reverse, sum, Armstrong, count"*

</div>

---

## 💻 28.1 Essential Digit Operations

```c
#include <stdio.h>
#include <math.h>

int main() {
    int num = 12345;

    /* ══════ Extract last digit ══════ */
    int lastDigit = num % 10;        /* 5 */

    /* ══════ Remove last digit ══════ */
    int withoutLast = num / 10;      /* 1234 */

    /* ══════ Count digits ══════ */
    int n = num, count = 0;
    while (n > 0) { count++; n /= 10; }
    printf("Digits: %d\n", count);    /* 5 */

    /* ══════ Sum of digits ══════ */
    n = num; int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    printf("Digit sum: %d\n", sum);   /* 15 */

    /* ══════ Reverse number ══════ */
    n = num; int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed: %d\n", reversed); /* 54321 */

    /* ══════ Palindrome check ══════ */
    int original = 12321;
    n = original; reversed = 0;
    while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }
    printf("%d is %spalindrome\n", original,
           (original == reversed) ? "" : "not "); /* palindrome! */

    return 0;
}
```

---

## 💻 28.2 Armstrong & Special Numbers

```c
/* ══════ Armstrong: sum of digits^n = number ══════ */
/* 153 = 1³ + 5³ + 3³ = 1+125+27 = 153 ✅ */
int isArmstrong(int num) {
    int original = num, sum = 0;
    int digits = 0, n = num;
    while (n > 0) { digits++; n /= 10; }

    n = num;
    while (n > 0) {
        int d = n % 10;
        sum += (int)pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
/* Armstrong numbers: 1,2,...,9, 153, 370, 371, 407, 1634... */

/* ══════ Strong Number: sum of digit factorials = number ══════ */
/* 145 = 1! + 4! + 5! = 1+24+120 = 145 ✅ */
int factorial(int n) {
    int f = 1;
    for (int i = 2; i <= n; i++) f *= i;
    return f;
}
int isStrong(int num) {
    int sum = 0, n = num;
    while (n > 0) { sum += factorial(n % 10); n /= 10; }
    return sum == num;
}

/* ══════ Automorphic: n² ends with n ══════ */
/* 5² = 25 (ends with 5), 76² = 5776 (ends with 76) */
int isAutomorphic(int n) {
    int sq = n * n;
    while (n > 0) {
        if (n % 10 != sq % 10) return 0;
        n /= 10; sq /= 10;
    }
    return 1;
}
```

---

## ❓ 28.3 MCQ Problems

---

**MCQ 1:** `num % 10` কী দেয়?

| Option | Answer |
|--------|--------|
| (a) First digit | |
| (b) **Last digit** | ✅ |
| (c) Digit count | |
| (d) Digit sum | |

---

**MCQ 2:** 153 কি Armstrong number?

| Option | Answer |
|--------|--------|
| (a) **হ্যাঁ (1³+5³+3³ = 153)** | ✅ |
| (b) না | |
| (c) Depends | |
| (d) শুধু 2-digit এ | |

---

**MCQ 3:** 121 reverse করলে কত?

| Option | Answer |
|--------|--------|
| (a) 112 | |
| (b) **121 (palindrome!)** | ✅ |
| (c) 211 | |
| (d) 12 | |

---

**MCQ 4:** `num / 10` কী করে?

| Option | Answer |
|--------|--------|
| (a) First digit দেয় | |
| (b) **Last digit সরায়** | ✅ |
| (c) 10 দিয়ে গুণ | |
| (d) Decimal দেয় | |

---

## 📝 28.4 Summary

- **Two magic operations:** `num % 10` = **last digit** extract, `num / 10` = last digit **remove**। এই দুটো দিয়ে সব digit problem solve হয়

- **Reverse number:** `reversed = reversed * 10 + num % 10; num /= 10;` — loop শেষে reversed পাওয়া যায়

- **Palindrome:** reverse == original? Armstrong: digit^n sum == original? Strong: digit! sum == original?

- **Digit count:** `while(n>0) { count++; n/=10; }`। ⚠️ n=0 হলে count=0 — special case handle!

---
---

# Topic 29: Linear Search & Binary Search

<div align="center">

*"Search = data খোঁজা — Linear হলো সহজ, Binary হলো দ্রুত"*

</div>

---

## 💻 29.1 Linear Search — O(n)

```c
/* ══════ Simple: check every element ══════ */
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target)
            return i;          /* found! return index */
    return -1;                 /* not found */
}

/* ⚡ Works on: sorted OR unsorted array
   ⚡ Time: O(n) — worst case check all elements
   ⚡ Space: O(1) */
```

---

## 💻 29.2 Binary Search — O(log n)

```c
/* ══════ Iterative (preferred!) ══════ */
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;  /* ⚡ avoids overflow! */

        if (arr[mid] == target) return mid;      /* found! */
        else if (arr[mid] < target) low = mid + 1;   /* right half */
        else high = mid - 1;                          /* left half */
    }
    return -1;  /* not found */
}

/* ══════ Recursive ══════ */
int binarySearchRec(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;

    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, mid + 1, high, target);
    return binarySearchRec(arr, low, mid - 1, target);
}

/* ⚡ REQUIRES: SORTED array!
   ⚡ Time: O(log n) — halves search space each step
   ⚡ Space: O(1) iterative, O(log n) recursive */
```

```
Binary Search Visualization:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1: low=0, high=9, mid=4 → arr[4]=16 < 23 → low=5
Step 2: low=5, high=9, mid=7 → arr[7]=56 > 23 → high=6
Step 3: low=5, high=6, mid=5 → arr[5]=23 = 23 → FOUND! index 5

Only 3 steps for 10 elements! (log₂10 ≈ 3.3)
```

---

## 📖 29.3 Comparison

```
┌──────────────┬──────────────┬──────────────┐
│ Feature      │ Linear       │ Binary       │
├──────────────┼──────────────┼──────────────┤
│ Sorted needed│ ❌ No        │ ✅ Yes!       │
│ Time (worst) │ O(n)         │ O(log n)     │
│ Time (best)  │ O(1)         │ O(1)         │
│ Space        │ O(1)         │ O(1) iter    │
│ 1000 elements│ ~1000 checks │ ~10 checks!  │
│ 1M elements  │ ~1M checks   │ ~20 checks!  │
└──────────────┴──────────────┴──────────────┘
```

---

## ❓ 29.4 MCQ Problems

---

**MCQ 1:** Binary search এর prerequisite কী?

| Option | Answer |
|--------|--------|
| (a) Array must be large | |
| (b) **Array must be SORTED** | ✅ |
| (c) Array must have no duplicates | |
| (d) কোনো prerequisite নেই | |

---

**MCQ 2:** 1024 elements এ binary search → max কতবার compare?

| Option | Answer |
|--------|--------|
| (a) 1024 | |
| (b) 512 | |
| (c) **10** | ✅ |
| (d) 100 | |

> log₂(1024) = **10**

---

**MCQ 3:** `mid = (low + high) / 2` এর সমস্যা কী?

| Option | Answer |
|--------|--------|
| (a) কোনো সমস্যা নেই | |
| (b) **Integer overflow possible!** | ✅ |
| (c) Slower | |
| (d) Wrong result | |

> low+high overflow হতে পারে! Fix: `mid = low + (high - low) / 2`

---

**MCQ 4:** Unsorted array তে কোন search ব্যবহার করবেন?

| Option | Answer |
|--------|--------|
| (a) Binary | |
| (b) **Linear** | ✅ |
| (c) উভয়ই | |
| (d) কোনোটাই না | |

> Binary search **sorted array** এ কাজ করে! Unsorted → **linear** only

---

## 📝 29.5 Summary

- **Linear search:** O(n), unsorted/sorted দুটোতেই কাজ করে। Simple but slow for large data

- **Binary search:** O(log n), **sorted array mandatory!** প্রতি step এ search space **অর্ধেক** হয়। 1M elements → মাত্র ~20 comparisons!

- **mid calculation:** `mid = low + (high-low)/2` ব্যবহার করুন — `(low+high)/2` **overflow** হতে পারে!

- Binary search **iterative** version preferred — recursive এ O(log n) stack space লাগে

---
---

# Topic 30: Bubble Sort, Selection Sort, Insertion Sort

<div align="center">

*"Sorting = data সাজানো — exam এ algorithm, complexity, ও trace জিজ্ঞেস করা হয়"*

</div>

---

## 💻 30.1 Bubble Sort — O(n²)

```c
/* ══════ Adjacent elements compare & swap ══════ */
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {  /* ⚡ n-i-1: already sorted! */
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;   /* ⚡ early exit: already sorted! */
    }
}

/* Pass 1: largest element → end
   Pass 2: 2nd largest → 2nd last
   ...continues until sorted */
```

```
Trace: [64, 34, 25, 12, 22]
Pass 1: [34,25,12,22,64]  ← 64 bubbled to end
Pass 2: [25,12,22,34,64]  ← 34 in place
Pass 3: [12,22,25,34,64]  ← sorted!
(early exit — no swaps needed in pass 4)
```

---

## 💻 30.2 Selection Sort — O(n²)

```c
/* ══════ Find min, swap to front ══════ */
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx])
                minIdx = j;

        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

/* Pass 1: find min → swap to index 0
   Pass 2: find min in remaining → swap to index 1
   ...continues */
```

---

## 💻 30.3 Insertion Sort — O(n²)

```c
/* ══════ Insert each element into sorted portion ══════ */
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];   /* shift right */
            j--;
        }
        arr[j + 1] = key;          /* insert at correct position */
    }
}

/* ⚡ Best for: nearly sorted data → O(n) best case!
   ⚡ Stable sort (preserves equal elements' order)
   ⚡ Online sort (can sort as data arrives) */
```

---

## 📖 30.4 Comparison Table

```
┌──────────────┬──────────┬──────────┬──────────┬────────┬────────┐
│ Algorithm    │ Best     │ Average  │ Worst    │ Stable │ Space  │
├──────────────┼──────────┼──────────┼──────────┼────────┼────────┤
│ Bubble       │ O(n)     │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
│ Selection    │ O(n²)    │ O(n²)   │ O(n²)   │ ❌ No   │ O(1)   │
│ Insertion    │ O(n) ⚡  │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
└──────────────┴──────────┴──────────┴──────────┴────────┴────────┘

⚡ Insertion sort best case O(n) — nearly sorted data তে fastest!
⚡ Selection sort — minimum number of SWAPS (useful when swap costly)
⚡ Bubble sort — simplest to understand, worst practical performance
```

---

## ❓ 30.5 MCQ Problems

---

**MCQ 1:** Bubble sort এর best case complexity?

| Option | Answer |
|--------|--------|
| (a) O(n²) | |
| (b) **O(n)** | ✅ |
| (c) O(n log n) | |
| (d) O(1) | |

> Already sorted + **swapped flag** → 1 pass, no swaps → **O(n)**

---

**MCQ 2:** কোন sort এ minimum number of swaps হয়?

| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) **Selection** | ✅ |
| (c) Insertion | |
| (d) সবাই equal | |

> Selection sort: প্রতি pass এ **সর্বোচ্চ 1 swap** (min element কে swap)

---

**MCQ 3:** Nearly sorted data তে কোন sort সবচেয়ে ভালো?

| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) Selection | |
| (c) **Insertion** | ✅ |
| (d) সবাই equal | |

> Insertion sort nearly sorted → **O(n)** (best case!)

---

**MCQ 4:** কোনটি stable sort?

| Option | Answer |
|--------|--------|
| (a) Selection | |
| (b) **Bubble ও Insertion দুটোই** | ✅ |
| (c) শুধু Bubble | |
| (d) কোনোটাই না | |

> Stable = equal elements এর relative order preserve। Bubble ✅, Insertion ✅, Selection ❌

---

**MCQ 5:** তিনটি sort এর space complexity?

| Option | Answer |
|--------|--------|
| (a) O(n) | |
| (b) **O(1) সবগুলো** | ✅ |
| (c) O(n²) | |
| (d) O(log n) | |

> তিনটিই **in-place** — extra array লাগে না → O(1) space

---

## 📝 30.6 Summary

- **Bubble sort:** adjacent elements compare ও swap করে। বড় element ধীরে ধীরে "bubble up"। `swapped` flag দিলে best case **O(n)** (already sorted detection)। Simplest but slowest practically

- **Selection sort:** প্রতি pass এ **minimum** element খুঁজে front এ swap করে। Swap count **minimum** (per pass max 1)। Swap costly হলে best choice। **Not stable!**

- **Insertion sort:** প্রতিটি element কে sorted portion এ correct position এ **insert** করে। **Nearly sorted data** তে **O(n)** — best among three! **Stable ও online** (streaming data sort possible)

- তিনটিই **O(n²)** average/worst, **O(1)** space (in-place)। বড় data (n > 10000) এ **merge sort** বা **quick sort** (O(n log n)) ব্যবহার করুন

- **Stable sort** = equal value elements এর original **relative order preserve** করে। Bubble ✅, Insertion ✅, Selection ❌

---
---


---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 06 — Structures, Unions & File I/O](06-structures-unions.md)
- ➡️ Next: [Chapter 08 — Data Structures & Advanced](08-data-structures-advanced.md)
