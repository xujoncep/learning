# Topic 20: Dynamic Memory Allocation

<div align="center">

*"malloc/calloc/realloc/free — runtime এ memory নেওয়া ও ছাড়া"*

</div>

---

## 📖 20.1 ধারণা (Concept)

```
Stack vs Heap:
━━━━━━━━━━━━━
Stack: auto (fixed size, fast, auto-managed, scope-bound)
Heap:  malloc/calloc (dynamic size, slower, MANUAL free!)

┌───────────────┐  High
│    Stack ↓    │  ← local vars, function calls
├───────────────┤
│    Heap  ↑    │  ← malloc/calloc/realloc
├───────────────┤
│  Data (BSS)   │  ← global/static
├───────────────┤
│    Code       │  ← program
└───────────────┘  Low
```

---

## 💻 20.2 malloc vs calloc vs realloc

```c
#include <stdlib.h>

/* ══════ malloc: allocate, UNINITIALIZED (garbage!) ══════ */
int *a = (int*)malloc(5 * sizeof(int));
/* a[0] to a[4] = GARBAGE! must initialize */

/* ══════ calloc: allocate, ZERO-INITIALIZED ══════ */
int *b = (int*)calloc(5, sizeof(int));
/* b[0] to b[4] = 0 ✅ */

/* ══════ realloc: RESIZE existing block ══════ */
int *temp = (int*)realloc(a, 10 * sizeof(int));
if (temp) a = temp;  /* ⚠️ use temp! direct assign = leak risk! */
/* Old data preserved, new area = UNINITIALIZED */

/* ══════ free: release memory ══════ */
free(a);   a = NULL;  /* ✅ set NULL after free! */
free(b);   b = NULL;
free(NULL);            /* ✅ safe, does nothing */
/* free(a); free(a);   ← ❌ DOUBLE FREE = CRASH! */
```

```
Comparison Table:
┌─────────────┬──────────────────┬──────────────────┐
│ Function    │ Params           │ Init             │
├─────────────┼──────────────────┼──────────────────┤
│ malloc(s)   │ total bytes      │ ❌ GARBAGE        │
│ calloc(n,s) │ count × size     │ ✅ ZERO           │
│ realloc(p,s)│ ptr + new size   │ ❌ new area garbage│
│ free(p)     │ ptr to free      │ —                │
└─────────────┴──────────────────┴──────────────────┘

Special cases:
  realloc(NULL, size) = malloc(size)
  free(NULL) = safe (no-op)
  realloc fail → returns NULL, ORIGINAL UNCHANGED!
```

---

## 💻 20.3 realloc Safety Pattern

```c
/* ❌ DANGEROUS: */
arr = realloc(arr, new_size);
/* If fail → arr=NULL → original memory LEAKED! */

/* ✅ SAFE: */
int *temp = realloc(arr, new_size);
if (temp == NULL) {
    /* handle error — arr still valid! */
    free(arr);
    return -1;
}
arr = temp;  /* success! */
```

---

## 💻 20.4 Dynamic 2D Array

```c
/* ══════ Method 1: Array of pointers (int**) ══════ */
int **m = (int**)malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++)
    m[i] = (int*)calloc(cols, sizeof(int));
/* Use: m[i][j] */
/* Free: for each row free(m[i]), then free(m) */

/* ══════ Method 2: Single contiguous block (FASTER!) ══════ */
int **m = (int**)malloc(rows * sizeof(int*));
int *block = (int*)calloc(rows * cols, sizeof(int));
for (int i = 0; i < rows; i++)
    m[i] = block + i * cols;
/* Free: free(m[0]); free(m); — only 2 frees! */
/* ⚡ Better cache performance — contiguous memory! */
```

---

## ❓ 20.5 MCQ Problems

---

**MCQ 1:** `malloc(10 * sizeof(int))` কত byte? (int=4)

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 14 | |
| (c) **40** | ✅ |
| (d) 4 | |

> 10 × 4 = **40** bytes

---

**MCQ 2:** malloc ও calloc এর মূল পার্থক্য?

| Option | Answer |
|--------|--------|
| (a) malloc slow | |
| (b) **calloc zero-init করে** | ✅ |
| (c) calloc array পারে না | |
| (d) পার্থক্য নেই | |

---

**MCQ 3:** `realloc(NULL, 50)` কী করে?

| Option | Answer |
|--------|--------|
| (a) Error | |
| (b) Nothing | |
| (c) **Same as malloc(50)** | ✅ |
| (d) Frees 50 bytes | |

---

**MCQ 4:** নিচের কোডে memory leak কোথায়?
```c
int *p = malloc(sizeof(int));
p = malloc(sizeof(int));
free(p);
```

| Option | Answer |
|--------|--------|
| (a) No leak | |
| (b) **First malloc leaked** | ✅ |
| (c) Second leaked | |
| (d) Both leaked | |

> প্রথম allocation এর address **হারিয়ে গেছে** (p overwritten)! ঐ memory আর free করা **অসম্ভব**!

---

**MCQ 5:** `free(NULL)` — কী হয়?

| Option | Answer |
|--------|--------|
| (a) Crash | |
| (b) **Nothing (safe)** | ✅ |
| (c) Memory error | |
| (d) UB | |

---

**MCQ 6:** `int arr[5]; free(arr);` — কী হয়?

| Option | Answer |
|--------|--------|
| (a) arr freed | |
| (b) **Crash! stack memory free করা যায় না** | ✅ |
| (c) No effect | |
| (d) arr = NULL | |

> শুধু **heap** memory (malloc/calloc/realloc) free করা যায়! Stack array → **crash!**

---

**MCQ 7:** realloc fail হলে original memory কী হয়?

| Option | Answer |
|--------|--------|
| (a) Freed | |
| (b) **Unchanged (still valid)** | ✅ |
| (c) Corrupted | |
| (d) Resized partially | |

---

## ⚠️ 20.6 Memory Error Cheat Sheet

```
┌─────────────────────┬──────────────────────────┬───────────────────┐
│ Error               │ Cause                    │ Fix               │
├─────────────────────┼──────────────────────────┼───────────────────┤
│ Memory leak         │ malloc without free       │ Always free!      │
│ Double free         │ free same ptr twice       │ ptr=NULL after free│
│ Use after free      │ dereference freed ptr     │ ptr=NULL          │
│ Dangling pointer    │ ptr to destroyed memory   │ NULL or re-assign │
│ Buffer overflow     │ write beyond allocation   │ Check bounds      │
│ Wild pointer        │ uninitialized pointer     │ Init to NULL      │
│ Stack free          │ free(stack_var)           │ Only free heap!   │
│ NULL dereference    │ *NULL_ptr                 │ Check before use  │
│ Realloc leak        │ arr=realloc(arr,sz) fail  │ Use temp pointer! │
└─────────────────────┴──────────────────────────┴───────────────────┘
```

---

## 📝 20.7 Summary

- **malloc(size):** size bytes, **uninitialized** (garbage!)। **calloc(n, size):** n×size bytes, **zero-initialized**। calloc slightly slower (zeroing overhead) কিন্তু safer।

- **realloc(ptr, size):** resize, data **preserved**, may return **new address!** `realloc(NULL, size)` = `malloc(size)`। Failure → NULL return, **original unchanged!**

- **free(ptr):** heap memory release। `free(NULL)` = **safe**। **Double free = CRASH!** Always `ptr = NULL` after free।

- **realloc safety:** direct `arr = realloc(arr, sz)` **dangerous!** Fail হলে arr=NULL → original **leaked!** Fix: **temp pointer** ব্যবহার করুন।

- **Memory leak rule:** প্রতিটি malloc/calloc/realloc এর matching **free** থাকতে **হবে**। Pointer overwrite before free = address lost = **permanent leak!**

- **Stack vs Heap:** stack = auto, fixed, fast, scope-bound। Heap = manual, dynamic, slower, **programmer responsible** for free। `free(stack_variable)` = **crash!**

- **Dynamic 2D array:** Method 1 (separate mallocs per row) vs Method 2 (single contiguous block) — Method 2 **faster** (cache friendly) ও **simpler** to free (2 calls only)।

---
---

<div align="center">


*User-defined types, File I/O, Number Theory — real-world problem solving*

</div>

---
---
