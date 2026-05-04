# Chapter 04 — Pointer Mastery & Dynamic Memory — C Programming 💻

> Pointer basics, arithmetic, pointer-to-pointer, function pointer এবং Dynamic Memory (Heap)।

---
# LEVEL 4: POINTER MASTERY (পয়েন্টার ও ডাইনামিক মেমোরি)

*C এর সবচেয়ে powerful ও সবচেয়ে tricky concept — master করলে C master*

---
---

# Topic 17: Pointer Basics

<div align="center">

*"Pointer = variable এর address store করে — C এর সবচেয়ে শক্তিশালী অস্ত্র"*

</div>

---

## 📖 17.1 ধারণা (Concept)

```
int a = 42;
int *p = &a;

Memory:
  Address: 1000        2000
         ┌──────┐    ┌──────┐
         │  42  │    │ 1000 │
         └──────┘    └──────┘
           a           p
        (value)     (address of a)

&  = "address of"     → &a = 1000
*  = "dereference"    → *p = 42 (value AT address p holds)
*p = a = 42  (same memory!)
```

---

## 💻 17.2 Declaration, Dereference, Modify

```c
int a = 42;
int *p = &a;         /* p stores address of a */

printf("%d\n", a);   /* 42 — direct access */
printf("%d\n", *p);  /* 42 — via pointer (dereference) */
printf("%p\n", p);   /* address of a */

*p = 100;            /* modify a through pointer! */
printf("%d\n", a);   /* 100 — changed! */
```

> **Key:** `*p` ও `a` **একই memory** access করে — একটি change করলে অন্যটিতেও দেখা যায়!

---

## 💻 17.3 Pointer Arithmetic

```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

/* p + n → moves n ELEMENTS forward (not n bytes!) */
printf("%d\n", *(p + 2));    /* 30 (arr[2]) */
printf("%d\n", *(p + 4));    /* 50 (arr[4]) */

p++;                          /* now points to arr[1] */
printf("%d\n", *p);           /* 20 */

/* Step size depends on TYPE: */
/* int*:    p+1 = +4 bytes   */
/* char*:   p+1 = +1 byte    */
/* double*: p+1 = +8 bytes   */
```

---

## 💻 17.4 const with Pointers — Exam Favourite

```c
int a = 10, b = 20;

/* ══════ 1. Pointer to const (value locked) ══════ */
const int *p1 = &a;
/* *p1 = 20;   ← ❌ can't modify VALUE */
p1 = &b;       /* ✅ can change POINTER */

/* ══════ 2. const Pointer (pointer locked) ══════ */
int * const p2 = &a;
*p2 = 30;      /* ✅ can modify VALUE */
/* p2 = &b;    ← ❌ can't change POINTER */

/* ══════ 3. const Pointer to const (both locked) ══════ */
const int * const p3 = &a;
/* *p3 = 40;   ← ❌ */
/* p3 = &b;    ← ❌ */
```

```
মনে রাখার কৌশল — Read RIGHT to LEFT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const int *p    → "p is pointer to CONST int"    (value ❌, pointer ✅)
int * const p   → "p is CONST pointer to int"    (value ✅, pointer ❌)
const int * const p → both ❌

⚡ const BEFORE * → value locked
   const AFTER *  → pointer locked
```

---

## 💻 17.5 NULL, Wild, Dangling Pointers

```c
/* ══════ NULL Pointer — safely "points nowhere" ══════ */
int *null_ptr = NULL;
/* *null_ptr = 10;  ← ❌ Segmentation Fault! */

/* ══════ Wild Pointer — uninitialized! ══════ */
int *wild;            /* ⚠️ random address! */
/* *wild = 10;        ← ❌ writing to random memory! UB */

/* ══════ Dangling Pointer — freed/destroyed memory ══════ */
int *dangle;
{ int x = 42; dangle = &x; }  /* x destroyed! */
/* *dangle = 10;      ← ❌ UB! memory no longer valid */

/* Fix: always set to NULL after scope/free */
```

---

## 📝 17.7 Summary

- Pointer = **variable এর address** store করে। `&` = address of, `*` = dereference (value at address)।

- **`int *a, b`** → a = pointer, **b = int**! দুটো pointer = `int *a, *b`।

- **Pointer arithmetic:** `p+1` = next **element** (type size অনুযায়ী jump)। `int*` +1 = +4 bytes, `char*` +1 = +1 byte।

- **const + pointer:** const **BEFORE** `*` = value locked; const **AFTER** `*` = pointer locked। Right-to-left পড়ুন!

- **NULL** pointer dereference = **crash**। **Wild** pointer = uninitialized (random address)। **Dangling** = freed memory। Fix: always **NULL initialize** ও free পরে **NULL set**।

- **All pointer sizes same** (4/8 bytes) — type শুধু arithmetic ও dereference এ matter করে।

---
---

# Topic 18: Pointer with Array & String

<div align="center">

*"Array name = pointer, String = char pointer — pointer বুঝলে সব বোঝা যায়"*

</div>

---

## 📖 18.1 Array Access — 6 Equivalent Ways

```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

/* ALL IDENTICAL: */
arr[2]        /* subscript */
*(arr + 2)    /* pointer + offset */
*(2 + arr)    /* commutative */
2[arr]        /* ⚠️ valid! (exam trap) */
p[2]          /* pointer subscript */
*(p + 2)      /* pointer + offset */
/* All = 30 */
```

---

## 📖 18.2 *p++ vs (*p)++ vs ++*p — Master Table

```c
int arr[] = {10, 20, 30};
int *p = arr;

/* *p++    → read *p=10, THEN p moves to arr[1]  (pointer changes) */
/* (*p)++  → read *p=10, THEN arr[0] becomes 11  (value changes)   */
/* ++*p    → arr[0] becomes 11, THEN read 11      (value changes)   */
/* *++p    → p moves to arr[1], THEN read 20       (pointer changes) */
```

```
Expression │ Returns  │ Side Effect
───────────┼──────────┼─────────────
*p++       │ old *p   │ p moves forward
(*p)++     │ old *p   │ *p increments
++*p       │ new *p   │ *p increments
*++p       │ new *p   │ p moves forward
```

> **Exam এ সবচেয়ে বেশি আসে!** Precedence: postfix ++ > * > prefix ++

---

## 📖 18.3 arr vs &arr — Different Types, Same Address

```c
int arr[5];

/* arr   → int*       → arr+1 skips 1 element (4 bytes)  */
/* &arr  → int(*)[5]  → &arr+1 skips ENTIRE array (20 bytes!) */

printf("%p %p\n", arr, &arr);     /* same address! */
printf("%p %p\n", arr+1, &arr+1); /* DIFFERENT! +4 vs +20 */
```

---

## 📖 18.4 Pointer with String

```c
char *s = "Hello";
printf("%s\n", s);      /* Hello */
printf("%s\n", s + 2);  /* llo (starts from index 2!) */
printf("%c\n", *s);     /* H */
printf("%c\n", *(s+4)); /* o */

/* ⚠️ char *s = "literal" → READ-ONLY! */
/* char s[] = "literal"   → MODIFIABLE! */
```

---

## 📝 18.6 Summary

- **`arr[i]` = `*(arr+i)` = `i[arr]` = `p[i]`** — সব identical! `2[arr]` valid — exam trap!

- **`*p++`** = read then move pointer; **`++*p`** = increment value then read; **`(*p)++`** = read then increment value। Precedence key!

- **`arr` vs `&arr`:** same address কিন্তু **different types**! `arr+1` = +4 bytes, `&arr+1` = +20 bytes (entire array skip)।

- **String pointer:** `s+2` = "llo" (substring from index 2)। `char*` = read-only literal, `char[]` = modifiable copy।

---
---

# Topic 19: Pointer to Pointer & Function Pointer

<div align="center">

*"Double pointer = pointer এর pointer, Function pointer = function এর address"*

</div>

---

## 📖 19.1 Double Pointer (int**)

```
int a = 42;
int *p = &a;
int **pp = &p;

pp  → address of p
*pp → value of p (= address of a)
**pp → value of a (= 42)

Modify:
*pp = &b;   → changes what p POINTS TO
**pp = 99;  → changes VALUE of a
```

---

## 💻 19.2 Why Double Pointer? — Modify Caller's Pointer

```c
/* ❌ WRONG: single pointer can't modify caller's pointer */
void allocWrong(int *p) {
    p = malloc(sizeof(int));  /* p = LOCAL copy! caller unchanged! */
}

/* ✅ RIGHT: double pointer modifies caller's pointer */
void allocRight(int **pp) {
    *pp = malloc(sizeof(int)); /* modifies CALLER's pointer! */
    **pp = 42;
}

int main() {
    int *ptr = NULL;
    allocWrong(ptr);    /* ptr still NULL! ⚠️ */
    allocRight(&ptr);   /* ptr = valid, *ptr = 42 ✅ */
    free(ptr);
}
```

> **Rule:** Function এ caller's pointer modify করতে **double pointer** লাগে — linked list insert, dynamic allocation এ essential!

---

## 💻 19.3 Function Pointer

```c
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

/* Declaration: return_type (*name)(param_types) */
int (*fp)(int, int);

fp = add;                   /* function name = its address */
printf("%d\n", fp(3, 5));   /* 8 — call via pointer! */

fp = sub;
printf("%d\n", fp(10, 3));  /* 7 */

/* ⚠️ int (*fp)(int,int) = FUNCTION POINTER ✅ */
/* ⚠️ int *fp(int,int)   = FUNCTION returning int* ❌ */
/* () around *fp is CRITICAL! */
```

---

## 💻 19.4 Practical Uses — Callback & qsort

```c
#include `stdlib.h`

/* qsort compare function */
int cmpAsc(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int cmpDesc(const void *a, const void *b) {
    return (*(int*)b - *(int*)a);
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};

    qsort(arr, 5, sizeof(int), cmpAsc);   /* ascending */
    qsort(arr, 5, sizeof(int), cmpDesc);  /* descending */

    /* Same qsort, different behavior — via function pointer! */
}
```

---

## 📝 19.6 Summary

- **Double pointer (`int **pp`):** pointer এর address store করে। `**pp` = original value, `*pp` = original pointer। Function এ **caller's pointer modify** করতে essential।

- **Function pointer:** `int (*fp)(int, int)` — function এর address store করে। **`()` around `*fp` critical!** ছাড়া `int *fp(int,int)` = function returning pointer (ভিন্ন জিনিস!)।

- **Uses:** callback (qsort), custom comparator, event handler, strategy pattern, dispatch table। **ttypedef** দিলে readable: `ttypedef int (*MathFunc)(int,int);`

---
---

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
#include `stdlib.h`

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

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 04 — Arrays & Strings](04-arrays-strings.md)
- ➡️ Next: [Chapter 06 — Structures, Unions & File I/O](06-structures-unions.md)
