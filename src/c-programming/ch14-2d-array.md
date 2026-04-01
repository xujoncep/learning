# Topic 14: 2D Array & Matrix Operations

<div align="center">

*"2D Array = array of arrays = matrix = table of rows and columns"*

</div>

---

## 📖 14.1 ধারণা (Concept)

```
int m[3][4] — 3 rows × 4 columns

         Col0  Col1  Col2  Col3
Row 0  [  1     2     3     4  ]
Row 1  [  5     6     7     8  ]
Row 2  [  9    10    11    12  ]

Memory (Row-Major — C default):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
     Row 0          Row 1           Row 2

Size: rows = sizeof(m)/sizeof(m[0])       = 3
      cols = sizeof(m[0])/sizeof(m[0][0]) = 4
```

---

## 💻 14.2 Declaration & Function Parameter

```c
/* ═══ Declaration ═══ */
int a[2][3] = {{1,2,3}, {4,5,6}};     /* nested init */
int b[2][3] = {1,2,3,4,5,6};          /* flat init (same!) */
int c[][3]  = {{1,2,3}, {4,5,6}};     /* row auto, column MUST specify! */
/* int d[2][] = {...};  ← ❌ Error! column size MANDATORY! */

/* ═══ Function parameter — column size REQUIRED! ═══ */
void print(int m[][4], int rows) { }   /* ✅ */
void print(int (*m)[4], int rows) { }  /* ✅ same thing */
/* void print(int m[][], int r, int c); ← ❌ Error! */
/* void print(int **m, int r, int c);   ← ❌ int** ≠ int[][N]! */
```

---

## 💻 14.3 Matrix Multiplication — Exam Classic

```c
/* A[m×n] × B[n×p] = C[m×p] — n MUST match! */

void multiply(int A[][3], int B[][2], int C[][2], int m, int n, int p) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < p; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
        }
}
/* Triple nested loop: i(rows A), j(cols B), k(common dimension) */
```

---

## 💻 14.4 Pointer & 2D Array

```c
int m[3][4];

/* Type hierarchy: */
/* m       → int (*)[4]   (pointer to row of 4 ints)     */
/* m[i]    → int *         (pointer to element)           */
/* m[i][j] → int           (value)                        */

/* m + 1    → skips ENTIRE ROW (16 bytes for int[4])      */
/* m[0] + 1 → skips ONE ELEMENT (4 bytes)                 */

/* Access: m[i][j] = *(*(m+i)+j) = *(m[i]+j)             */
```

---

## ❓ 14.5 MCQ Problems

---

**MCQ 1:** `int a[2][3] = {1,2,3,4,5,6}; a[1][1]` = ?

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 2 | |
| (d) Error | |

> Flat init: Row0={1,2,3}, Row1={4,5,6}। a[1][1] = **5**

---

**MCQ 2:** `int a[2][3] = {{1,2},{4}};` — `a[1][1]` = ?

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **0** | ✅ |
| (c) Garbage | |
| (d) 2 | |

> Partial: Row0={1,2,**0**}, Row1={4,**0**,0}। a[1][1] = **0**

---

**MCQ 3:** 2D array function parameter এ কোনটি mandatory?

| Option | Answer |
|--------|--------|
| (a) Row size | |
| (b) **Column size** | ✅ |
| (c) দুটোই | |
| (d) কোনোটাই না | |

---

**MCQ 4:** `int m[3][3]; *(*(m+1)+2)` = ?

| Option | Answer |
|--------|--------|
| (a) m[2][1] | |
| (b) **m[1][2]** | ✅ |
| (c) m[1][1] | |
| (d) Error | |

> `*(m+1)` = m[1], `*(m[1]+2)` = m[1][2]

---

## 📝 14.6 Summary

- 2D Array = **rows × columns**, **row-major** order এ memory তে store। **Column size mandatory** — row omit করা যায়।

- **`int**` ≠ `int[][N]`!** Dynamic 2D (pointer-to-pointer) ও static 2D array **সম্পূর্ণ ভিন্ন** memory layout।

- **m+1** = next **row** (big jump), **m[0]+1** = next **element** (small jump) — exam এ আসে।

- **Matrix multiply:** A[m×n] × B[n×p] = C[m×p]। Triple loop (i, j, k)। **n must match!**

- **Transpose:** `t[j][i] = m[i][j]`। In-place: **j = i+1** থেকে শুরু (double-swap prevent)।

---
---
