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

## ❓ 17.6 MCQ Problems

---

**MCQ 1:** `int *a, b;` — a ও b এর type?

| Option | Answer |
|--------|--------|
| (a) Both int* | |
| (b) **a=int*, b=int** | ✅ |
| (c) a=int, b=int* | |
| (d) Both int | |

> `*` শুধু `a` এর সাথে! b = plain int। দুটো pointer চাইলে: `int *a, *b;`

---

**MCQ 2:** `int arr[]={10,20,30}; printf("%d", *(arr+2));` output?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 20 | |
| (c) **30** | ✅ |
| (d) Error | |

> `*(arr+2)` = arr[2] = **30**

---

**MCQ 3:** `const int *p` — কী modify করা যায়?

| Option | Answer |
|--------|--------|
| (a) Value through *p | |
| (b) **Pointer p itself** | ✅ |
| (c) Both | |
| (d) Neither | |

> const int *p = "pointer to constant" → **value ❌, pointer ✅**

---

**MCQ 4:** All pointer types এর size (64-bit) কত?

| Option | Answer |
|--------|--------|
| (a) Type অনুযায়ী ভিন্ন | |
| (b) সব 4 bytes | |
| (c) **সব 8 bytes** | ✅ |
| (d) int*=4, double*=8 | |

> Pointer = address store করে → size **system dependent, type independent**

---

**MCQ 5:** `int *p = NULL; *p = 10;` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) p = 10 | |
| (b) 0 | |
| (c) **Segmentation Fault** | ✅ |
| (d) Garbage | |

> NULL dereference = **crash!** Always check `if (p != NULL)` before `*p`

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
