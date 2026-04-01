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
#include <stdlib.h>

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

## ❓ 19.5 MCQ Problems

---

**MCQ 1:** নিচের কোডের output?
```c
int a=10; int *p=&a; int **pp=&p;
**pp = 50;
printf("%d", *p);
```

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **50** | ✅ |
| (c) Address | |
| (d) Error | |

> `**pp=50` → a=50 → *p=a=**50**

---

**MCQ 2:** `int (*fp)(int)` কী?

| Option | Answer |
|--------|--------|
| (a) Function returning int* | |
| (b) **Pointer to function(int)→int** | ✅ |
| (c) Array of function pointers | |
| (d) Error | |

---

**MCQ 3:** Caller's pointer modify করতে কী লাগে?

| Option | Answer |
|--------|--------|
| (a) Single pointer | |
| (b) **Double pointer** | ✅ |
| (c) Triple pointer | |
| (d) void pointer | |

> Single pointer = local copy! Double pointer = modify caller's pointer ✅

---

## 📝 19.6 Summary

- **Double pointer (`int **pp`):** pointer এর address store করে। `**pp` = original value, `*pp` = original pointer। Function এ **caller's pointer modify** করতে essential।

- **Function pointer:** `int (*fp)(int, int)` — function এর address store করে। **`()` around `*fp` critical!** ছাড়া `int *fp(int,int)` = function returning pointer (ভিন্ন জিনিস!)।

- **Uses:** callback (qsort), custom comparator, event handler, strategy pattern, dispatch table। **typedef** দিলে readable: `typedef int (*MathFunc)(int,int);`

---
---
