# Topic 9: Function Basics

<div align="center">

*"Function হলো code এর building block — reuse, modularity, readability সবকিছুর ভিত্তি"*

</div>

---

## 📖 9.1 ধারণা (Concept)

Function হলো একটি **স্বতন্ত্র code block** যা নির্দিষ্ট কাজ করে। একবার লিখে বারবার call করা যায়।

```
Function Structure:
═══════════════════

return_type function_name(parameters) {
    // body
    return value;
}

Example:
  int add(int a, int b) {
      return a + b;
  }
  │     │       │           │
  │     │       │           └── return statement
  │     │       └── parameters (formal arguments)
  │     └── function name
  └── return type
```

### Function এর তিন ধাপ

```
1. Declaration (Prototype) → compiler কে জানানো
   int add(int a, int b);     ← definition এর আগে call করলে দরকার

2. Definition → actual code লেখা
   int add(int a, int b) { return a + b; }

3. Call → function ব্যবহার করা
   int result = add(3, 5);    ← result = 8
```

---

## 💻 9.2 Call by Value vs Call by Reference

```c
#include <stdio.h>

/* ═══════ Call by Value — COPY, original UNCHANGED ═══════ */
void swapByValue(int a, int b) {
    int temp = a; a = b; b = temp;
    printf("Inside: a=%d, b=%d\n", a, b);  /* swapped inside */
}

/* ═══════ Call by Reference (Pointer) — original CHANGED ═══════ */
void swapByRef(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}

int main() {
    int x = 10, y = 20;

    swapByValue(x, y);
    printf("After Value: x=%d, y=%d\n", x, y);
    /* x=10, y=20 ⚠️ NOT swapped! Copy changed, original intact */

    swapByRef(&x, &y);
    printf("After Ref:   x=%d, y=%d\n", x, y);
    /* x=20, y=10 ✅ Swapped! Original changed via pointer */

    return 0;
}
```

> **Golden Rule:** Value pass → **copy**, original **safe**। Pointer pass → **address**, original **change** হয়!

---

## 💻 9.3 Array as Parameter — Always by Reference!

```c
#include <stdio.h>

void doubleAll(int arr[], int size) {
    /* ⚠️ arr = pointer! sizeof(arr) = 4/8, NOT array size! */
    for (int i = 0; i < size; i++)
        arr[i] *= 2;    /* original array CHANGES! */
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);  /* 5 */

    printf("Before: ");
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);

    doubleAll(arr, size);

    printf("\nAfter:  ");
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);
    /* Output: 2 4 6 8 10 — original modified! */

    return 0;
}
```

> **Rule:** Array function এ pass হলে **pointer** এ decay হয় — size info হারায়, original modify হয়!

---

## 💻 9.4 func() vs func(void)

```c
/* ⚠️ C তে func() ও func(void) আলাদা! */
int func1();       /* C: "unspecified parameters" — ANY args accepted! */
int func2(void);   /* C: "zero parameters" — strict, no args */

/* C++ তে দুটো same (both = zero params) */
/* পরীক্ষায় এই পার্থক্য আসে! */
```

---

## ❓ 9.5 MCQ Problems

---

**MCQ 1:** নিচের কোডের output কী?
```c
void fun(int x) { x = 20; }
int main() {
    int a = 10;
    fun(a);
    printf("%d", a);
}
```

| Option | Answer |
|--------|--------|
| (a) 20 | |
| (b) **10** | ✅ |
| (c) 0 | |
| (d) Error | |

> **Call by value:** x = a এর **copy**। x change হলেও a = **10** unchanged!

---

**MCQ 2:** নিচের কোডের output কী?
```c
void fun(int *p) { *p = 20; }
int main() {
    int a = 10;
    fun(&a);
    printf("%d", a);
}
```

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **20** | ✅ |
| (c) Address | |
| (d) Error | |

> **Call by reference:** `*p = 20` → a এর memory তে 20 লেখা → a = **20**

---

**MCQ 3:** নিচের কোডের output কী?
```c
int fun() {
    static int count = 0;
    count++;
    return count;
}
int main() {
    printf("%d %d %d", fun(), fun(), fun());
}
```

| Option | Answer |
|--------|--------|
| (a) 1 1 1 | |
| (b) **1 2 3** (or 3 2 1, evaluation order UB) | ✅ |
| (c) 0 1 2 | |
| (d) 3 3 3 | |

> **static** variable persist করে। প্রতি call এ count বাড়ে। তবে argument evaluation order **unspecified**!

---

**MCQ 4:** Function prototype `int func();` C তে কী বোঝায়?

| Option | Answer |
|--------|--------|
| (a) Zero parameters | |
| (b) **Unspecified number of parameters** | ✅ |
| (c) One int parameter | |
| (d) Error | |

> C তে `func()` = any args। `func(void)` = zero args। **C++ এ দুটো same!**

---

**MCQ 5:** Prototype আছে কিন্তু definition নেই — কী হবে?

| Option | Answer |
|--------|--------|
| (a) Compilation Error | |
| (b) Runtime Error | |
| (c) 0 return | |
| (d) **Linker Error** | ✅ |

> Prototype থাকলে compile হয়। Definition না থাকলে **linker** "undefined reference" error দেয়।

---

## 📝 9.6 Summary

- **Call by value** (default): argument এর **copy** পাঠায়, original **unchanged**। **Call by reference** (pointer): **address** পাঠায়, function ভেতরে original **modify** হয়। Swap function value pass এ কাজ করে না — pointer লাগে!

- **Array** function এ সবসময় **pointer** হিসেবে pass হয় — `sizeof(arr)` function ভেতরে = **pointer size** (4/8), array size নয়! তাই size **আলাদা parameter** এ পাঠাতে হয়। Array modify করলে **original** ও change হয়।

- **`func()` vs `func(void)`**: C তে `()` = **unspecified** params (any args accepted!), `(void)` = **zero** params (strict)। C++ এ দুটো same। Exam এ এই **C-specific** পার্থক্য আসে।

- C function **সর্বোচ্চ 1টি value** return করতে পারে। Multiple value return করতে **pointer parameter** ব্যবহার করুন: `void minMax(int arr[], int n, int *min, int *max)`।

- **static local variable** function call এর মধ্যে value **ধরে রাখে** — re-initialize হয় না। Counter, ID generator এ useful।

- Prototype **আছে** কিন্তু definition **নেই** → **Linker Error** (NOT compilation error!)। এটি compile vs link phase এর পার্থক্য — exam এ আসে।

---
---
