# Topic 37: Miscellaneous

<div align="center">

*"Command line args, variable args, volatile, const — বিবিধ গুরুত্বপূর্ণ topics"*

</div>

---

## 💻 37.1 Command Line Arguments

```c
#include <stdio.h>

/* argc = argument count, argv = argument vector (string array) */
int main(int argc, char *argv[]) {
    printf("Total args: %d\n", argc);
    for (int i = 0; i < argc; i++)
        printf("argv[%d] = %s\n", i, argv[i]);
    return 0;
}

/* Run: ./program hello world 42
   Output:
   Total args: 4
   argv[0] = ./program
   argv[1] = hello
   argv[2] = world
   argv[3] = 42     ← string! atoi("42") for int
*/
```

> **argv[0]** = program name (always!)। argv[argc] = **NULL**। All arguments are **strings** — `atoi()` দিয়ে int এ convert

---

## 💻 37.2 Variable Arguments (stdarg.h)

```c
#include <stdio.h>
#include <stdarg.h>

/* ══════ Function with variable number of arguments ══════ */
int sum(int count, ...) {
    va_list args;
    va_start(args, count);     /* initialize after last fixed param */

    int total = 0;
    for (int i = 0; i < count; i++)
        total += va_arg(args, int);  /* get next arg as int */

    va_end(args);              /* cleanup */
    return total;
}

int main() {
    printf("Sum: %d\n", sum(3, 10, 20, 30));      /* 60 */
    printf("Sum: %d\n", sum(5, 1, 2, 3, 4, 5));   /* 15 */
    return 0;
}

/* ⚡ printf itself uses variable arguments! */
/* int printf(const char *format, ...); */
```

---

## 💻 37.3 volatile & const Keywords

```c
/* ══════ volatile — compiler optimization prevent ══════ */
volatile int sensorValue;
/* ⚡ Tells compiler: "this value can change ANY TIME!"
   → Don't cache in register
   → Always read from memory
   Used in: hardware registers, signal handlers, multi-threading */

/* ══════ const — various uses ══════ */
const int MAX = 100;               /* constant variable */
const int *p1;                     /* pointer to const int */
int * const p2 = &x;              /* const pointer to int */
const int * const p3 = &x;        /* const pointer to const int */

void func(const char *s) {        /* promise: won't modify string */
    /* s[0] = 'X'; ← ❌ Error! */
    printf("%s\n", s);             /* read-only access ✅ */
}
```

---

## 💻 37.4 Comma Operator, Ternary, typedef Tricks

```c
/* ══════ Comma as operator (not separator!) ══════ */
int x = (printf("A"), printf("B"), 5);  /* prints AB, x=5 */

/* ══════ Ternary chain ══════ */
int n = 75;
char *grade = (n>=90) ? "A+" :
              (n>=80) ? "A"  :
              (n>=70) ? "B"  :
              (n>=60) ? "C"  : "F";
printf("Grade: %s\n", grade);  /* B */

/* ══════ Useful macros ══════ */
#define ARRAY_SIZE(arr) (sizeof(arr)/sizeof(arr[0]))
#define MIN(a,b) ((a)<(b)?(a):(b))
#define MAX(a,b) ((a)>(b)?(a):(b))
#define SWAP(a,b) do { typeof(a) _t=a; a=b; b=_t; } while(0)
```

---

## ❓ 37.5 MCQ Problems

---

**MCQ 1:** `argv[0]` কী contain করে?

| Option | Answer |
|--------|--------|
| (a) First argument | |
| (b) **Program name** | ✅ |
| (c) NULL | |
| (d) Argument count | |

---

**MCQ 2:** `volatile` keyword কী বলে?

| Option | Answer |
|--------|--------|
| (a) Variable is constant | |
| (b) **Value যেকোনো সময় change হতে পারে** | ✅ |
| (c) Variable is fast | |
| (d) Variable is global | |

---

**MCQ 3:** `va_arg(args, int)` কী করে?

| Option | Answer |
|--------|--------|
| (a) Argument count দেয় | |
| (b) **Next argument (int হিসেবে) return করে** | ✅ |
| (c) Argument list শেষ করে | |
| (d) Error check করে | |

---

## 📝 37.6 Summary

- **Command line args:** `int main(int argc, char *argv[])` — argc = count, argv[0] = program name, সব **string** (atoi for int convert)

- **Variable args** (stdarg.h): `va_list`, `va_start`, `va_arg`, `va_end` — printf নিজেও এটা ব্যবহার করে!

- **volatile:** compiler optimization prevent — hardware register, multi-thread shared variable এ ব্যবহৃত

- **const** multiple uses: constant variable, pointer to const, const pointer — function parameter এ **const** = caller's data **safe**

---
---

---
---
