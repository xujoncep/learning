# Chapter 04 — Pointer Mastery & Dynamic Memory — C Programming 💻
``n> Pointer basics, arithmetic, pointer-to-pointer, function pointer এবং Dynamic Memory (Heap)।
``n---
# LEVEL 4: POINTER MASTERY (পয়েন্টার ও ডাইনামিক মেমোরি)
``n*C এর সবচেয়ে powerful ও সবচেয়ে tricky concept — master করলে C master*
``n---
---
``n# Topic 17: Pointer Basics
``n<div align="center">
``n*"Pointer = variable এর address store করে — C এর সবচেয়ে শক্তিশালী অস্ত্র"*
``n</div>
``n---
``n## 📖 17.1 ধারণা (Concept)
``n```
int a = 42;
int *p = &a;
``nMemory:
  Address: 1000        2000
         ┌──────┐    ┌──────┐
         │  42  │    │ 1000 │
         └──────┘    └──────┘
           a           p
        (value)     (address of a)
``n&  = "address of"     → &a = 1000
*  = "dereference"    → *p = 42 (value AT address p holds)
*p = a = 42  (same memory!)
```
``n---
``n## 💻 17.2 Declaration, Dereference, Modify
``n```c
int a = 42;
int *p = &a;         /* p stores address of a */
``nprintf("%d\n", a);   /* 42 — direct access */
printf("%d\n", *p);  /* 42 — via pointer (dereference) */
printf("%p\n", p);   /* address of a */
``n*p = 100;            /* modify a through pointer! */
printf("%d\n", a);   /* 100 — changed! */
```
``n> **Key:** `*p` ও `a` **একই memory** access করে — একটি change করলে অন্যটিতেও দেখা যায়!
``n---
``n## 💻 17.3 Pointer Arithmetic
``n```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;
``n/* p + n → moves n ELEMENTS forward (not n bytes!) */
printf("%d\n", *(p + 2));    /* 30 (arr[2]) */
printf("%d\n", *(p + 4));    /* 50 (arr[4]) */
``np++;                          /* now points to arr[1] */
printf("%d\n", *p);           /* 20 */
``n/* Step size depends on TYPE: */
/* int*:    p+1 = +4 bytes   */
/* char*:   p+1 = +1 byte    */
/* double*: p+1 = +8 bytes   */
```
``n---
``n## 💻 17.4 const with Pointers — Exam Favourite
``n```c
int a = 10, b = 20;
``n/* ══════ 1. Pointer to const (value locked) ══════ */
const int *p1 = &a;
/* *p1 = 20;   ← ❌ can't modify VALUE */
p1 = &b;       /* ✅ can change POINTER */
``n/* ══════ 2. const Pointer (pointer locked) ══════ */
int * const p2 = &a;
*p2 = 30;      /* ✅ can modify VALUE */
/* p2 = &b;    ← ❌ can't change POINTER */
``n/* ══════ 3. const Pointer to const (both locked) ══════ */
const int * const p3 = &a;
/* *p3 = 40;   ← ❌ */
/* p3 = &b;    ← ❌ */
```
``n```
মনে রাখার কৌশল — Read RIGHT to LEFT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const int *p    → "p is pointer to CONST int"    (value ❌, pointer ✅)
int * const p   → "p is CONST pointer to int"    (value ✅, pointer ❌)
const int * const p → both ❌
``n⚡ const BEFORE * → value locked
   const AFTER *  → pointer locked
```
``n---
``n## 💻 17.5 NULL, Wild, Dangling Pointers
``n```c
/* ══════ NULL Pointer — safely "points nowhere" ══════ */
int *null_ptr = NULL;
/* *null_ptr = 10;  ← ❌ Segmentation Fault! */
``n/* ══════ Wild Pointer — uninitialized! ══════ */
int *wild;            /* ⚠️ random address! */
/* *wild = 10;        ← ❌ writing to random memory! UB */
``n/* ══════ Dangling Pointer — freed/destroyed memory ══════ */
int *dangle;
{ int x = 42; dangle = &x; }  /* x destroyed! */
/* *dangle = 10;      ← ❌ UB! memory no longer valid */
``n/* Fix: always set to NULL after scope/free */
```
``n---
``n## ❓ 17.6 MCQ Problems
``n---
``n**MCQ 1:** `int *a, b;` — a ও b এর type?
``n| Option | Answer |
|--------|--------|
| (a) Both int* | |
| (b) **a=int*, b=int** | ✅ |
| (c) a=int, b=int* | |
| (d) Both int | |
``n> `*` শুধু `a` এর সাথে! b = plain int। দুটো pointer চাইলে: `int *a, *b;`
``n---
``n**MCQ 2:** `int arr[]={10,20,30}; printf("%d", *(arr+2));` output?
``n| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 20 | |
| (c) **30** | ✅ |
| (d) Error | |
``n> `*(arr+2)` = arr[2] = **30**
``n---
``n**MCQ 3:** `const int *p` — কী modify করা যায়?
``n| Option | Answer |
|--------|--------|
| (a) Value through *p | |
| (b) **Pointer p itself** | ✅ |
| (c) Both | |
| (d) Neither | |
``n> const int *p = "pointer to constant" → **value ❌, pointer ✅**
``n---
``n**MCQ 4:** All pointer types এর size (64-bit) কত?
``n| Option | Answer |
|--------|--------|
| (a) Type অনুযায়ী ভিন্ন | |
| (b) সব 4 bytes | |
| (c) **সব 8 bytes** | ✅ |
| (d) int*=4, double*=8 | |
``n> Pointer = address store করে → size **system dependent, type independent**
``n---
``n**MCQ 5:** `int *p = NULL; *p = 10;` — কী হবে?
``n| Option | Answer |
|--------|--------|
| (a) p = 10 | |
| (b) 0 | |
| (c) **Segmentation Fault** | ✅ |
| (d) Garbage | |
``n> NULL dereference = **crash!** Always check `if (p != NULL)` before `*p`
``n---
``n## 📝 17.7 Summary
``n- Pointer = **variable এর address** store করে। `&` = address of, `*` = dereference (value at address)।
``n- **`int *a, b`** → a = pointer, **b = int**! দুটো pointer = `int *a, *b`।
``n- **Pointer arithmetic:** `p+1` = next **element** (type size অনুযায়ী jump)। `int*` +1 = +4 bytes, `char*` +1 = +1 byte।
``n- **const + pointer:** const **BEFORE** `*` = value locked; const **AFTER** `*` = pointer locked। Right-to-left পড়ুন!
``n- **NULL** pointer dereference = **crash**। **Wild** pointer = uninitialized (random address)। **Dangling** = freed memory। Fix: always **NULL initialize** ও free পরে **NULL set**।
``n- **All pointer sizes same** (4/8 bytes) — type শুধু arithmetic ও dereference এ matter করে।
``n---
---
``n# Topic 18: Pointer with Array & String
``n<div align="center">
``n*"Array name = pointer, String = char pointer — pointer বুঝলে সব বোঝা যায়"*
``n</div>
``n---
``n## 📖 18.1 Array Access — 6 Equivalent Ways
``n```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;
``n/* ALL IDENTICAL: */
arr[2]        /* subscript */
*(arr + 2)    /* pointer + offset */
*(2 + arr)    /* commutative */
2[arr]        /* ⚠️ valid! (exam trap) */
p[2]          /* pointer subscript */
*(p + 2)      /* pointer + offset */
/* All = 30 */
```
``n---
``n## 📖 18.2 *p++ vs (*p)++ vs ++*p — Master Table
``n```c
int arr[] = {10, 20, 30};
int *p = arr;
``n/* *p++    → read *p=10, THEN p moves to arr[1]  (pointer changes) */
/* (*p)++  → read *p=10, THEN arr[0] becomes 11  (value changes)   */
/* ++*p    → arr[0] becomes 11, THEN read 11      (value changes)   */
/* *++p    → p moves to arr[1], THEN read 20       (pointer changes) */
```
``n```
Expression │ Returns  │ Side Effect
───────────┼──────────┼─────────────
*p++       │ old *p   │ p moves forward
(*p)++     │ old *p   │ *p increments
++*p       │ new *p   │ *p increments
*++p       │ new *p   │ p moves forward
```
``n> **Exam এ সবচেয়ে বেশি আসে!** Precedence: postfix ++ > * > prefix ++
``n---
``n## 📖 18.3 arr vs &arr — Different Types, Same Address
``n```c
int arr[5];
``n/* arr   → int*       → arr+1 skips 1 element (4 bytes)  */
/* &arr  → int(*)[5]  → &arr+1 skips ENTIRE array (20 bytes!) */
``nprintf("%p %p\n", arr, &arr);     /* same address! */
printf("%p %p\n", arr+1, &arr+1); /* DIFFERENT! +4 vs +20 */
```
``n---
``n## 📖 18.4 Pointer with String
``n```c
char *s = "Hello";
printf("%s\n", s);      /* Hello */
printf("%s\n", s + 2);  /* llo (starts from index 2!) */
printf("%c\n", *s);     /* H */
printf("%c\n", *(s+4)); /* o */
``n/* ⚠️ char *s = "literal" → READ-ONLY! */
/* char s[] = "literal"   → MODIFIABLE! */
```
``n---
``n## ❓ 18.5 MCQ Problems
``n---
``n**MCQ 1:** `int arr[]={10,20,30,40}; int *p=arr; printf("%d",*p++);` then `printf(" %d",*p);`
``n| Option | Answer |
|--------|--------|
| (a) **10 20** | ✅ |
| (b) 20 20 | |
| (c) 10 10 | |
| (d) 20 30 | |
``n> `*p++`: read *p=**10**, then p→arr[1]. Next *p=**20**
``n---
``n**MCQ 2:** `char *names[]={"AB","CD","EF"}; printf("%c",*names[1]);`
``n| Option | Answer |
|--------|--------|
| (a) A | |
| (b) **C** | ✅ |
| (c) B | |
| (d) CD | |
``n> names[1]="CD", *names[1]='**C**' (first char)
``n---
``n**MCQ 3:** `int (*p)[5]` কী?
``n| Option | Answer |
|--------|--------|
| (a) 5টি pointer এর array | |
| (b) **Pointer to array of 5 ints** | ✅ |
| (c) Pointer to pointer | |
| (d) Error | |
``n> `int (*p)[5]` = **pointer to array**। `int *p[5]` = **array of pointers**। `()` changes everything!
``n---
``n## 📝 18.6 Summary
``n- **`arr[i]` = `*(arr+i)` = `i[arr]` = `p[i]`** — সব identical! `2[arr]` valid — exam trap!
``n- **`*p++`** = read then move pointer; **`++*p`** = increment value then read; **`(*p)++`** = read then increment value। Precedence key!
``n- **`arr` vs `&arr`:** same address কিন্তু **different types**! `arr+1` = +4 bytes, `&arr+1` = +20 bytes (entire array skip)।
``n- **String pointer:** `s+2` = "llo" (substring from index 2)। `char*` = read-only literal, `char[]` = modifiable copy।
``n---
---
``n# Topic 19: Pointer to Pointer & Function Pointer
``n<div align="center">
``n*"Double pointer = pointer এর pointer, Function pointer = function এর address"*
``n</div>
``n---
``n## 📖 19.1 Double Pointer (int**)
``n```
int a = 42;
int *p = &a;
int **pp = &p;
``npp  → address of p
*pp → value of p (= address of a)
**pp → value of a (= 42)
``nModify:
*pp = &b;   → changes what p POINTS TO
**pp = 99;  → changes VALUE of a
```
``n---
``n## 💻 19.2 Why Double Pointer? — Modify Caller's Pointer
``n```c
/* ❌ WRONG: single pointer can't modify caller's pointer */
void allocWrong(int *p) {
    p = malloc(sizeof(int));  /* p = LOCAL copy! caller unchanged! */
}
``n/* ✅ RIGHT: double pointer modifies caller's pointer */
void allocRight(int **pp) {
    *pp = malloc(sizeof(int)); /* modifies CALLER's pointer! */
    **pp = 42;
}
``nint main() {
    int *ptr = NULL;
    allocWrong(ptr);    /* ptr still NULL! ⚠️ */
    allocRight(&ptr);   /* ptr = valid, *ptr = 42 ✅ */
    free(ptr);
}
```
``n> **Rule:** Function এ caller's pointer modify করতে **double pointer** লাগে — linked list insert, dynamic allocation এ essential!
``n---
``n## 💻 19.3 Function Pointer
``n```c
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
``n/* Declaration: return_type (*name)(param_types) */
int (*fp)(int, int);
``nfp = add;                   /* function name = its address */
printf("%d\n", fp(3, 5));   /* 8 — call via pointer! */
``nfp = sub;
printf("%d\n", fp(10, 3));  /* 7 */
``n/* ⚠️ int (*fp)(int,int) = FUNCTION POINTER ✅ */
/* ⚠️ int *fp(int,int)   = FUNCTION returning int* ❌ */
/* () around *fp is CRITICAL! */
```
``n---
``n## 💻 19.4 Practical Uses — Callback & qsort
``n```c
#include `stdlib.h`
``n/* qsort compare function */
int cmpAsc(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}
``nint cmpDesc(const void *a, const void *b) {
    return (*(int*)b - *(int*)a);
}
``nint main() {
    int arr[] = {64, 25, 12, 22, 11};
``n    qsort(arr, 5, sizeof(int), cmpAsc);   /* ascending */
    qsort(arr, 5, sizeof(int), cmpDesc);  /* descending */
``n    /* Same qsort, different behavior — via function pointer! */
}
```
``n---
``n## ❓ 19.5 MCQ Problems
``n---
``n**MCQ 1:** নিচের কোডের output?
```c
int a=10; int *p=&a; int **pp=&p;
**pp = 50;
printf("%d", *p);
```
``n| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **50** | ✅ |
| (c) Address | |
| (d) Error | |
``n> `**pp=50` → a=50 → *p=a=**50**
``n---
``n**MCQ 2:** `int (*fp)(int)` কী?
``n| Option | Answer |
|--------|--------|
| (a) Function returning int* | |
| (b) **Pointer to function(int)→int** | ✅ |
| (c) Array of function pointers | |
| (d) Error | |
``n---
``n**MCQ 3:** Caller's pointer modify করতে কী লাগে?
``n| Option | Answer |
|--------|--------|
| (a) Single pointer | |
| (b) **Double pointer** | ✅ |
| (c) Triple pointer | |
| (d) void pointer | |
``n> Single pointer = local copy! Double pointer = modify caller's pointer ✅
``n---
``n## 📝 19.6 Summary
``n- **Double pointer (`int **pp`):** pointer এর address store করে। `**pp` = original value, `*pp` = original pointer। Function এ **caller's pointer modify** করতে essential।
``n- **Function pointer:** `int (*fp)(int, int)` — function এর address store করে। **`()` around `*fp` critical!** ছাড়া `int *fp(int,int)` = function returning pointer (ভিন্ন জিনিস!)।
``n- **Uses:** callback (qsort), custom comparator, event handler, strategy pattern, dispatch table। **ttypedef** দিলে readable: `ttypedef int (*MathFunc)(int,int);`
``n---
---
``n# Topic 20: Dynamic Memory Allocation
``n<div align="center">
``n*"malloc/calloc/realloc/free — runtime এ memory নেওয়া ও ছাড়া"*
``n</div>
``n---
``n## 📖 20.1 ধারণা (Concept)
``n```
Stack vs Heap:
━━━━━━━━━━━━━
Stack: auto (fixed size, fast, auto-managed, scope-bound)
Heap:  malloc/calloc (dynamic size, slower, MANUAL free!)
``n┌───────────────┐  High
│    Stack ↓    │  ← local vars, function calls
├───────────────┤
│    Heap  ↑    │  ← malloc/calloc/realloc
├───────────────┤
│  Data (BSS)   │  ← global/static
├───────────────┤
│    Code       │  ← program
└───────────────┘  Low
```
``n---
``n## 💻 20.2 malloc vs calloc vs realloc
``n```c
#include `stdlib.h`
``n/* ══════ malloc: allocate, UNINITIALIZED (garbage!) ══════ */
int *a = (int*)malloc(5 * sizeof(int));
/* a[0] to a[4] = GARBAGE! must initialize */
``n/* ══════ calloc: allocate, ZERO-INITIALIZED ══════ */
int *b = (int*)calloc(5, sizeof(int));
/* b[0] to b[4] = 0 ✅ */
``n/* ══════ realloc: RESIZE existing block ══════ */
int *temp = (int*)realloc(a, 10 * sizeof(int));
if (temp) a = temp;  /* ⚠️ use temp! direct assign = leak risk! */
/* Old data preserved, new area = UNINITIALIZED */
``n/* ══════ free: release memory ══════ */
free(a);   a = NULL;  /* ✅ set NULL after free! */
free(b);   b = NULL;
free(NULL);            /* ✅ safe, does nothing */
/* free(a); free(a);   ← ❌ DOUBLE FREE = CRASH! */
```
``n```
Comparison Table:
┌─────────────┬──────────────────┬──────────────────┐
│ Function    │ Params           │ Init             │
├─────────────┼──────────────────┼──────────────────┤
│ malloc(s)   │ total bytes      │ ❌ GARBAGE        │
│ calloc(n,s) │ count × size     │ ✅ ZERO           │
│ realloc(p,s)│ ptr + new size   │ ❌ new area garbage│
│ free(p)     │ ptr to free      │ —                │
└─────────────┴──────────────────┴──────────────────┘
``nSpecial cases:
  realloc(NULL, size) = malloc(size)
  free(NULL) = safe (no-op)
  realloc fail → returns NULL, ORIGINAL UNCHANGED!
```
``n---
``n## 💻 20.3 realloc Safety Pattern
``n```c
/* ❌ DANGEROUS: */
arr = realloc(arr, new_size);
/* If fail → arr=NULL → original memory LEAKED! */
``n/* ✅ SAFE: */
int *temp = realloc(arr, new_size);
if (temp == NULL) {
    /* handle error — arr still valid! */
    free(arr);
    return -1;
}
arr = temp;  /* success! */
```
``n---
``n## 💻 20.4 Dynamic 2D Array
``n```c
/* ══════ Method 1: Array of pointers (int**) ══════ */
int **m = (int**)malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++)
    m[i] = (int*)calloc(cols, sizeof(int));
/* Use: m[i][j] */
/* Free: for each row free(m[i]), then free(m) */
``n/* ══════ Method 2: Single contiguous block (FASTER!) ══════ */
int **m = (int**)malloc(rows * sizeof(int*));
int *block = (int*)calloc(rows * cols, sizeof(int));
for (int i = 0; i < rows; i++)
    m[i] = block + i * cols;
/* Free: free(m[0]); free(m); — only 2 frees! */
/* ⚡ Better cache performance — contiguous memory! */
```
``n---
``n## ❓ 20.5 MCQ Problems
``n---
``n**MCQ 1:** `malloc(10 * sizeof(int))` কত byte? (int=4)
``n| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 14 | |
| (c) **40** | ✅ |
| (d) 4 | |
``n> 10 × 4 = **40** bytes
``n---
``n**MCQ 2:** malloc ও calloc এর মূল পার্থক্য?
``n| Option | Answer |
|--------|--------|
| (a) malloc slow | |
| (b) **calloc zero-init করে** | ✅ |
| (c) calloc array পারে না | |
| (d) পার্থক্য নেই | |
``n---
``n**MCQ 3:** `realloc(NULL, 50)` কী করে?
``n| Option | Answer |
|--------|--------|
| (a) Error | |
| (b) Nothing | |
| (c) **Same as malloc(50)** | ✅ |
| (d) Frees 50 bytes | |
``n---
``n**MCQ 4:** নিচের কোডে memory leak কোথায়?
```c
int *p = malloc(sizeof(int));
p = malloc(sizeof(int));
free(p);
```
``n| Option | Answer |
|--------|--------|
| (a) No leak | |
| (b) **First malloc leaked** | ✅ |
| (c) Second leaked | |
| (d) Both leaked | |
``n> প্রথম allocation এর address **হারিয়ে গেছে** (p overwritten)! ঐ memory আর free করা **অসম্ভব**!
``n---
``n**MCQ 5:** `free(NULL)` — কী হয়?
``n| Option | Answer |
|--------|--------|
| (a) Crash | |
| (b) **Nothing (safe)** | ✅ |
| (c) Memory error | |
| (d) UB | |
``n---
``n**MCQ 6:** `int arr[5]; free(arr);` — কী হয়?
``n| Option | Answer |
|--------|--------|
| (a) arr freed | |
| (b) **Crash! stack memory free করা যায় না** | ✅ |
| (c) No effect | |
| (d) arr = NULL | |
``n> শুধু **heap** memory (malloc/calloc/realloc) free করা যায়! Stack array → **crash!**
``n---
``n**MCQ 7:** realloc fail হলে original memory কী হয়?
``n| Option | Answer |
|--------|--------|
| (a) Freed | |
| (b) **Unchanged (still valid)** | ✅ |
| (c) Corrupted | |
| (d) Resized partially | |
``n---
``n## ⚠️ 20.6 Memory Error Cheat Sheet
``n```
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
``n---
``n## 📝 20.7 Summary
``n- **malloc(size):** size bytes, **uninitialized** (garbage!)। **calloc(n, size):** n×size bytes, **zero-initialized**। calloc slightly slower (zeroing overhead) কিন্তু safer।
``n- **realloc(ptr, size):** resize, data **preserved**, may return **new address!** `realloc(NULL, size)` = `malloc(size)`। Failure → NULL return, **original unchanged!**
``n- **free(ptr):** heap memory release। `free(NULL)` = **safe**। **Double free = CRASH!** Always `ptr = NULL` after free।
``n- **realloc safety:** direct `arr = realloc(arr, sz)` **dangerous!** Fail হলে arr=NULL → original **leaked!** Fix: **temp pointer** ব্যবহার করুন।
``n- **Memory leak rule:** প্রতিটি malloc/calloc/realloc এর matching **free** থাকতে **হবে**। Pointer overwrite before free = address lost = **permanent leak!**
``n- **Stack vs Heap:** stack = auto, fixed, fast, scope-bound। Heap = manual, dynamic, slower, **programmer responsible** for free। `free(stack_variable)` = **crash!**
``n- **Dynamic 2D array:** Method 1 (separate mallocs per row) vs Method 2 (single contiguous block) — Method 2 **faster** (cache friendly) ও **simpler** to free (2 calls only)।
``n---
---
``n---
``n## 🔗 Navigation
``n- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 04 — Arrays & Strings](04-arrays-strings.md)
- ➡️ Next: [Chapter 06 — Structures, Unions & File I/O](06-structures-unions.md)
``n---
``n# 🇧🇩 Job Exam Special (Bangladesh Context)
``n> বিপিএসসি (BPSC), ব্যাংক আইটি এবং এ্যাসিস্ট্যান্ট প্রোগ্রামার পরীক্ষার বিগত বছরের প্রশ্নের লজিক ও সমাধান।
``n### Problem 01: Function to swap two numbers using pointers
**পরীক্ষা:** সোনালী ব্যাংক আইটি (২০২২), বিপিএসসি এ্যাসিস্ট্যান্ট প্রোগ্রামার (২০১৯)
``n<details>
<summary><b>💻 Solution in C (Call by Reference)</b></summary>
``n`c
#include `stdio.h`
``nvoid swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
``nint main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x=%d, y=%d", x, y); // x=20, y=10
    return 0;
}
`
</details>
``n<details>
<summary><b>💻 Solution in C# (ref keyword)</b></summary>
``n`csharp
void Swap(ref int a, ref int b) {
    int temp = a;
    a = b;
    b = temp;
}
`
</details>
``n<details>
<summary><b>💻 Solution in Python (Idiomatic)</b></summary>
``n`python
# Python এ পয়েন্টার লাগে না, সরাসরি সোয়াপ করা যায়
x, y = 10, 20
x, y = y, x
`
</details>
``n### Problem 02: Dynamic Memory Allocation for an Array
**পরীক্ষা:** আালী ব্যাংক আইটি (২০২৩)
``n<details>
<summary><b>💻 Solution in C (malloc)</b></summary>
``n`c
int n = 5;
int *arr = (int*)malloc(n * sizeof(int));
if(arr == NULL) return 1; // Safety check
// Use arr...
free(arr);
`
</details>
``n---
``n# ✍️ Written Questions
``n**Q1: What is a Dangling Pointer? How to avoid it?**
**Answer:** কোনো মেমোরি ব্লক ree() করার পর যদি কোনো পয়েন্টার এখনও সেই মেমোরি এড্রেসকে পয়েন্ট করে থাকে, তবে তাকে **Dangling Pointer** বলে। এটি এড়াতে ree(ptr) করার পরপরই ptr = NULL; করে দেওয়া উচিত।
``n**Q2: Difference between Reference and Pointer?**
**Answer:**
1. **Pointer:** এড্রেস স্টোর করে, NULL হতে পারে, রি-অ্যাসাইন করা যায়।
2. **Reference:** এটি একটি এলিয়াস বা ডাকনাম মাত্র, NULL হতে পারে না এবং একবার অ্যাসাইন করলে পরিবর্তন করা যায় না (যেমন C++ বা C#-এ)।
``n**Q3: Explain "Memory Leak" in C.**
**Answer:** যখন malloc() বা calloc() দিয়ে হিপ মেমোরি নেওয়া হয় কিন্তু কাজ শেষে ree() করা হয় না, তখন সেই মেমোরি সিস্টেমের কাছে অকেজো হয়ে পড়ে থাকে। একেই **Memory Leak** বলে।
``n