# Topic 23: typedef & sizeof Operator

<div align="center">

*"typedef = type এর alias, sizeof = type/variable এর byte count"*

</div>

---

## 📖 23.1 typedef — Type Alias

```c
/* ══════ Basic typedef ══════ */
typedef unsigned long ulong;
typedef char* String;

ulong count = 1000000;
String name = "Hello";

/* ══════ struct typedef ══════ */
typedef struct {
    int x, y;
} Point;

Point p = {10, 20};   /* no "struct" keyword needed! */

/* ══════ Function pointer typedef ══════ */
typedef int (*MathFunc)(int, int);

int add(int a, int b) { return a + b; }
MathFunc fp = add;     /* clean! vs: int (*fp)(int,int) = add; */

/* ══════ Array typedef ══════ */
typedef int IntArray[10];
IntArray arr;           /* same as: int arr[10]; */
```

```
typedef vs #define:
━━━━━━━━━━━━━━━━━━
typedef char* String;     → String a, b;  → a=char*, b=char* ✅
#define String char*      → String a, b;  → a=char*, b=char ⚠️

typedef = compiler-processed (type-safe, scoped)
#define = preprocessor text replacement (no type check!)
```

---

## 📖 23.2 sizeof Operator

```c
/* sizeof = compile-time operator (NOT function!) */
/* Returns size in BYTES */

/* ══════ Basic types ══════ */
sizeof(char)        /* 1 (always!) */
sizeof(int)         /* 4 */
sizeof(float)       /* 4 */
sizeof(double)      /* 8 */
sizeof(int*)        /* 4/8 (pointer size = system dependent) */

/* ══════ Arrays ══════ */
int arr[10];
sizeof(arr)              /* 40 (total bytes!) */
sizeof(arr) / sizeof(arr[0])  /* 10 (element count formula!) */

/* ⚠️ In function: array decays to pointer! */
void func(int arr[]) {
    sizeof(arr);         /* 4/8 (POINTER size, NOT 40!) */
}

/* ══════ Tricky cases ══════ */
sizeof('A')              /* 4 in C! (char constant = int) */
                         /* 1 in C++! */
sizeof(3.14)             /* 8 (double!) */
sizeof(3.14f)            /* 4 (float) */
sizeof("Hello")          /* 6 (5 chars + '\0') */

/* ══════ Expression (NOT evaluated!) ══════ */
int x = 5;
sizeof(x++)              /* 4 — x is STILL 5! */
/* sizeof does NOT evaluate expression, just checks type! */
```

---

## ❓ 23.3 MCQ Problems

---

**MCQ 1:** `typedef char* String; String a, b;` — b এর type?

| Option | Answer |
|--------|--------|
| (a) char | |
| (b) **char*** | ✅ |
| (c) String | |
| (d) Error | |

> typedef = **true type alias**। a ও b দুটোই **char***

---

**MCQ 2:** `#define PTR char*; PTR a, b;` — b এর type?

| Option | Answer |
|--------|--------|
| (a) char* | |
| (b) **char** | ✅ |
| (c) PTR | |
| (d) Error | |

> #define text replace: `char* a, b;` → a=char*, **b=char!** ⚠️ typedef এর সাথে পার্থক্য!

---

**MCQ 3:** `int x=5; sizeof(x++);` — x এর value পরে?

| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **5** | ✅ |
| (c) 4 | |
| (d) Error | |

> sizeof **expression evaluate করে না!** শুধু type check → x **unchanged** = 5

---

**MCQ 4:** `sizeof("Hello")` = ?

| Option | Answer |
|--------|--------|
| (a) 5 | |
| (b) **6** | ✅ |
| (c) 8 | |
| (d) 4/8 | |

> String literal = char array! 5 chars + '\0' = **6** bytes

---

**MCQ 5:** `sizeof('A')` C তে কত?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) 2 | |
| (c) **4** | ✅ |
| (d) 8 | |

> C তে character constant = **int**! sizeof = 4। (C++ এ 1)

---

## 📝 23.4 Summary

- **typedef** = type এর **alias** তৈরি করে। struct, function pointer, complex type কে **readable** করে। **Compiler-processed**, type-safe, scoped

- **`typedef char* String`** vs **`#define String char*`**: typedef → `String a, b;` = **both char***। #define → `char* a, b;` = a=char*, **b=char!** এই পার্থক্য exam এ আসে

- **sizeof** = compile-time operator, **bytes** return করে। **Expression evaluate করে না!** `sizeof(x++)` → x **unchanged**

- **sizeof('A')** = **4** in C (char constant = int), **1** in C++। `sizeof(3.14)` = **8** (double)

- **Array sizeof:** main এ = total bytes; function এ = **pointer size!** Element count = `sizeof(arr)/sizeof(arr[0])`

---
---
