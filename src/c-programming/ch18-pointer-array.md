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

## ❓ 18.5 MCQ Problems

---

**MCQ 1:** `int arr[]={10,20,30,40}; int *p=arr; printf("%d",*p++);` then `printf(" %d",*p);`

| Option | Answer |
|--------|--------|
| (a) **10 20** | ✅ |
| (b) 20 20 | |
| (c) 10 10 | |
| (d) 20 30 | |

> `*p++`: read *p=**10**, then p→arr[1]. Next *p=**20**

---

**MCQ 2:** `char *names[]={"AB","CD","EF"}; printf("%c",*names[1]);`

| Option | Answer |
|--------|--------|
| (a) A | |
| (b) **C** | ✅ |
| (c) B | |
| (d) CD | |

> names[1]="CD", *names[1]='**C**' (first char)

---

**MCQ 3:** `int (*p)[5]` কী?

| Option | Answer |
|--------|--------|
| (a) 5টি pointer এর array | |
| (b) **Pointer to array of 5 ints** | ✅ |
| (c) Pointer to pointer | |
| (d) Error | |

> `int (*p)[5]` = **pointer to array**। `int *p[5]` = **array of pointers**। `()` changes everything!

---

## 📝 18.6 Summary

- **`arr[i]` = `*(arr+i)` = `i[arr]` = `p[i]`** — সব identical! `2[arr]` valid — exam trap!

- **`*p++`** = read then move pointer; **`++*p`** = increment value then read; **`(*p)++`** = read then increment value। Precedence key!

- **`arr` vs `&arr`:** same address কিন্তু **different types**! `arr+1` = +4 bytes, `&arr+1` = +20 bytes (entire array skip)।

- **String pointer:** `s+2` = "llo" (substring from index 2)। `char*` = read-only literal, `char[]` = modifiable copy।

---
---
