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
