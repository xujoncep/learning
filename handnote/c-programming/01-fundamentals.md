# Chapter 01 — Fundamentals — C Programming 💻

> Data types, operators, format specifiers, type casting, conditionals — C-র ভিত্তি।

---
# LEVEL 1: FUNDAMENTALS (ভিত্তি)

*C Programming এর মৌলিক ভিত্তি — এই অংশ না বুঝলে পরের কিছুই বোঝা যাবে না*


---
---

# Topic 1: Data Types, Variables & Constants

<div align="center">

*"C তে প্রতিটি data এর একটি type আছে — type না জানলে memory বোঝা যায় না"*

</div>

---

## 📖 1.1 ধারণা (Concept)

C programming এ প্রতিটি variable এর একটি **data type** থাকতে হয়। Data type তিনটি গুরুত্বপূর্ণ বিষয় নির্ধারণ করে:

- **কত byte memory** নেবে — memory management এর জন্য জরুরি
- **কী ধরনের data** store করবে — পূর্ণসংখ্যা, দশমিক, না character
- **কত range** এর মধ্যে value রাখতে পারবে — overflow এড়ানোর জন্য

### Data Types এর শ্রেণীবিভাগ

```
Data Types in C
├── Primary (Built-in)
│   ├── int          → পূর্ণসংখ্যা (4 bytes)
│   ├── float        → দশমিক সংখ্যা (4 bytes)
│   ├── double       → বড় দশমিক সংখ্যা (8 bytes)
│   ├── char         → একটি character (1 byte)
│   └── void         → কোনো value নেই
│
├── Modifiers
│   ├── short        → ছোট range (2 bytes)
│   ├── long         → বড় range (4/8 bytes)
│   ├── long long    → আরো বড় range (8 bytes)
│   ├── signed       → ধনাত্মক + ঋণাত্মক (default)
│   └── unsigned     → শুধু ধনাত্মক (0 থেকে শুরু)
│
├── Derived
│   ├── Array
│   ├── Pointer
│   └── Function
│
└── User Defined
    ├── Structure
    ├── Union
    └── Enum
```

### Size & Range Table

> **এই table টি মুখস্থ করুন — পরীক্ষায় সবচেয়ে বেশি আসে!**

```
┌──────────────────┬───────┬──────────────────────────────────┐
│   Data Type      │ Size  │         Range                    │
├──────────────────┼───────┼──────────────────────────────────┤
│ char             │ 1 B   │ -128 to 127                      │
│ unsigned char    │ 1 B   │ 0 to 255                         │
│ short            │ 2 B   │ -32,768 to 32,767                │
│ unsigned short   │ 2 B   │ 0 to 65,535                      │
│ int              │ 4 B   │ -2,147,483,648 to 2,147,483,647  │
│ unsigned int     │ 4 B   │ 0 to 4,294,967,295               │
│ long             │ 4 B   │ same as int (32-bit system)      │
│ long long        │ 8 B   │ -9.2×10¹⁸ to 9.2×10¹⁸           │
│ float            │ 4 B   │ 3.4E-38 to 3.4E+38 (6 decimal)  │
│ double           │ 8 B   │ 1.7E-308 to 1.7E+308 (15 dec)   │
│ long double      │ 12/16B│ even larger precision             │
└──────────────────┴───────┴──────────────────────────────────┘
```

> **মনে রাখার সূত্র:** n bit signed range = **-2^(n-1)** to **2^(n-1) - 1**
>
> **উদাহরণ:** char = 8 bit → -2⁷ to 2⁷-1 → **-128 to 127**

---

## 📖 1.2 Variables (চলক)

Variable হলো memory তে একটি **নামযুক্ত স্থান** যেখানে data store করা হয়। ভাবুন এটি একটি **লেবেলযুক্ত বাক্স** — বাক্সের নাম = variable name, ভেতরের জিনিস = value।

```c
/* ═══════════════════════════════════════════
   Variable Declaration & Initialization
   ═══════════════════════════════════════════ */

/* শুধু Declaration (ঘোষণা) */
int age;

/* শুধু Initialization (মান দেওয়া) */
age = 25;

/* Declaration + Initialization (একসাথে) — BEST PRACTICE */
int marks = 90;
float gpa = 3.75;
char grade = 'A';
```

### Variable Naming Rules

```
✅ Valid Names                 ❌ Invalid Names
─────────────────             ──────────────────────────────
int age;                      int 2name;       → সংখ্যা দিয়ে শুরু নয়
int _count;                   int my name;     → space থাকতে পারবে না
int student1;                 int float;       → keyword ব্যবহার নয়
int MAX_VALUE;                int my-name;     → hyphen ব্যবহার নয়
int __;                       int @price;      → special char নয়
```

> **মনে রাখুন:** C হলো **case-sensitive** — `Age`, `age`, `AGE` তিনটি সম্পূর্ণ **আলাদা** variable।

---

## 📖 1.3 Constants (ধ্রুবক)

যে value **একবার set করলে আর পরিবর্তন করা যায় না** — সেটাই constant। দুই উপায়ে constant তৈরি করা যায়:

```c
/* ═══════════════════════════════════
   Way 1: const keyword
   ═══════════════════════════════════ */
const int MAX = 100;
/* MAX = 200;   ← ❌ ERROR! const পরিবর্তন করা যায় না */

/* ═══════════════════════════════════
   Way 2: #define (Preprocessor Macro)
   ═══════════════════════════════════ */
#define PI 3.14159
#define MAX_SIZE 100
```

### const vs #define — পার্থক্য

| Feature | `const` | `#define` |
|---------|---------|-----------|
| **Type checking** | ✅ হ্যাঁ (compiler check করে) | ❌ না (just text replace) |
| **Memory** | নেয় (একটি variable) | নেয় না (compile time text replace) |
| **Scope** | Block scope (নিয়ন্ত্রিত) | File scope (সব জায়গায়) |
| **Debugging** | সহজ (debugger এ দেখা যায়) | কঠিন (replace হয়ে যায়) |

### Literal Constants — পরীক্ষায় Trap!

```c
/* ═══════════════════════════════════
   Integer Literals — বিভিন্ন base এ
   ═══════════════════════════════════ */
int a = 10;        /* Decimal (base 10) — সাধারণ */
int b = 012;       /* ⚠️ Octal (base 8) — 0 দিয়ে শুরু! = 10 decimal */
int c = 0xA;       /* Hexadecimal (base 16) — 0x দিয়ে শুরু! = 10 decimal */
int d = 0b1010;    /* Binary (base 2) — 0b দিয়ে শুরু! = 10 decimal (C99) */

/* ═══════════════════════════════════
   Floating-point Literals
   ═══════════════════════════════════ */
float f = 3.14f;   /* Float literal — 'f' suffix */
double g = 3.14;   /* ⚠️ Double literal — default! (NOT float!) */

/* ═══════════════════════════════════
   Character Literal
   ═══════════════════════════════════ */
char ch = 'A';     /* Character literal — ASCII 65 */
char nl = '\n';    /* Escape sequence — newline */
```

---

## 💻 1.4 Code Examples

### Example 1: sizeof Operator — প্রতিটি type এর size দেখা

```c
#include <stdio.h>

int main() {
    printf("╔═══════════════════════════════════╗\n");
    printf("║     Data Type Sizes in C          ║\n");
    printf("╠═══════════════════════════════════╣\n");
    printf("║ char      : %2lu byte              ║\n", sizeof(char));
    printf("║ short     : %2lu bytes             ║\n", sizeof(short));
    printf("║ int       : %2lu bytes             ║\n", sizeof(int));
    printf("║ long      : %2lu bytes             ║\n", sizeof(long));
    printf("║ long long : %2lu bytes             ║\n", sizeof(long long));
    printf("║ float     : %2lu bytes             ║\n", sizeof(float));
    printf("║ double    : %2lu bytes             ║\n", sizeof(double));
    printf("╚═══════════════════════════════════╝\n");

    return 0;
}
```

### Example 2: Overflow — কী হয় range ছাড়িয়ে গেলে?

```c
#include <stdio.h>

int main() {
    /* ═══════ signed char overflow ═══════ */
    char c = 127;           /* char এর MAX value */
    c = c + 1;              /* ⚠️ OVERFLOW! */
    printf("char 127+1 = %d\n", c);
    /* Output: -128 (wrap around — ঘুরে negative!) */

    /* ═══════ unsigned char overflow ═══════ */
    unsigned char uc = 255; /* unsigned char এর MAX */
    uc = uc + 1;            /* ⚠️ OVERFLOW! */
    printf("uchar 255+1 = %d\n", uc);
    /* Output: 0 (wrap around — ঘুরে 0!) */

    /* ═══════ int overflow ═══════ */
    int smax = 2147483647;  /* INT_MAX */
    printf("INT_MAX + 1 = %d\n", smax + 1);
    /* Output: -2147483648 (wrap around!) */

    return 0;
}
```

> **Overflow Rule:**
> - **signed** overflow → **negative** হয়ে যায় (wrap around)
> - **unsigned** overflow → **0** থেকে আবার শুরু (circular)

### Example 3: #define Macro Trap — সবচেয়ে common mistake

```c
#include <stdio.h>

#define SQUARE(x)    x * x          /* ❌ ভুল way! */
#define SQUARE_OK(x) ((x) * (x))   /* ✅ সঠিক way! */

int main() {
    printf("SQUARE(3)   = %d\n", SQUARE(3));      /* 9 ✅ */
    printf("SQUARE(2+3) = %d\n", SQUARE(2+3));    /* ⚠️ 11 ❌ */
    /* কারণ: SQUARE(2+3) → 2+3 * 2+3 = 2+6+3 = 11 */
    /* চাই: (2+3) * (2+3) = 25 */

    printf("SQUARE_OK(2+3) = %d\n", SQUARE_OK(2+3)); /* 25 ✅ */
    /* কারণ: ((2+3)) * ((2+3)) = 5*5 = 25 */

    return 0;
}
```

> **Rule:** `#define` macro তে parameter এর চারপাশে সবসময় **`((x))`** bracket দিন!

---

## ❓ 1.5 MCQ Problems with Solutions

---

**MCQ 1:** `sizeof(char)` এর value কত?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) **1** | ✅ |
| (c) 2 | |
| (d) Compiler dependent | |

> **ব্যাখ্যা:** C standard অনুযায়ী `sizeof(char)` সবসময় **1 byte** — এটি guaranteed। কোনো system এ এটি ভিন্ন হতে পারে না।

---

**MCQ 2:** নিচের কোডের output কী?
```c
int x = 5.9;
printf("%d", x);
```

| Option | Answer |
|--------|--------|
| (a) 5.9 | |
| (b) 6 | |
| (c) **5** | ✅ |
| (d) Error | |

> **ব্যাখ্যা:** `5.9` (double) → `int` এ **implicit type casting** হয়। দশমিক অংশ **কেটে যায়** (truncation)। এটি **round হয় না** — 5.9 → 5, 5.1 → 5, 5.999 → 5।

---

**MCQ 3:** `unsigned char` এর range কত?

| Option | Answer |
|--------|--------|
| (a) -128 to 127 | |
| (b) 0 to 127 | |
| (c) **0 to 255** | ✅ |
| (d) 0 to 256 | |

> **ব্যাখ্যা:** 8 bit, unsigned → 0 to 2⁸-1 = **0 to 255**। signed char হলে -128 to 127 (option a)।

---

**MCQ 4:** নিচের কোডের output কী?
```c
char c = 127;
c = c + 1;
printf("%d", c);
```

| Option | Answer |
|--------|--------|
| (a) 128 | |
| (b) **-128** | ✅ |
| (c) 0 | |
| (d) Undefined | |

> **ব্যাখ্যা:** char এর max = 127। +1 করলে **overflow** → -128 এ **wrap around**। এটি 2's complement system এর বৈশিষ্ট্য।

---

**MCQ 5:** নিচের কোডের output কী?
```c
printf("%d", sizeof(3.14));
```

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **8** | ✅ |
| (c) 10 | |
| (d) Error | |

> **ব্যাখ্যা:** `3.14` by default **double** literal (NOT float!)। `sizeof(double)` = **8 bytes**। float চাইলে `3.14f` লিখতে হবে — তখন `sizeof(3.14f)` = 4।

---

**MCQ 6:** `int a = 010;` — `a` এর value কত?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **8** | ✅ |
| (c) 2 | |
| (d) Error | |

> **ব্যাখ্যা:** `0` দিয়ে শুরু = **octal** number! `010` (octal) = 1×8 + 0×1 = **8** (decimal)। এটি পরীক্ষায় অত্যন্ত common trap!

---

**MCQ 7:** নিচের কোডের output কী?
```c
int a;
printf("%d", a);
```

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) **Garbage value** | ✅ |
| (c) Error | |
| (d) NULL | |

> **ব্যাখ্যা:** **Local variable** initialize না করলে **garbage value** (memory তে আগে যা ছিল)। কিন্তু **global** বা **static** variable হলে default **0** হয়।

---

**MCQ 8:** `const int x = 10; x = 20;` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) x = 20 | |
| (b) x = 10 | |
| (c) **Compilation error** | ✅ |
| (d) Runtime error | |

> **ব্যাখ্যা:** `const` variable এর value পরিবর্তন করার চেষ্টা করলে **compile time** এ error আসবে, runtime এ নয়।

---

**MCQ 9:** নিচের কোনটি valid variable name?

| Option | Answer |
|--------|--------|
| (a) `2ndPlace` | |
| (b) **`_result`** | ✅ |
| (c) `my var` | |
| (d) `int` | |

> **ব্যাখ্যা:** (a) সংখ্যা দিয়ে শুরু ❌, (c) space আছে ❌, (d) keyword ❌। শুধু (b) underscore দিয়ে শুরু — valid ✅।

---

**MCQ 10:** `#define` ও `const` এর মূল পার্থক্য কী?

| Option | Answer |
|--------|--------|
| (a) #define memory allocate করে | |
| (b) **const type safe, #define type safe নয়** | ✅ |
| (c) দুটো একই জিনিস | |
| (d) const শুধু integer এ কাজ করে | |

> **ব্যাখ্যা:** `const` = variable, compiler **type checking** করে (safe)। `#define` = text replacement, কোনো type checking **নেই** (unsafe)।

---

## ✍️ 1.6 Written Problems with Solutions

---

### Problem 1: User Input — integer, float, char

```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char initial;

    printf("Enter age: ");
    scanf("%d", &age);

    printf("Enter height: ");
    scanf("%f", &height);

    printf("Enter initial: ");
    scanf(" %c", &initial);
    /*     ↑ space before %c — CRITICAL! */
    /* ⚠️ এই space না দিলে আগের scanf এর '\n' পড়ে ফেলবে! */

    printf("\n╔════════════════════════╗\n");
    printf("║ Age     : %-12d ║\n", age);
    printf("║ Height  : %-12.2f ║\n", height);
    printf("║ Initial : %-12c ║\n", initial);
    printf("╚════════════════════════╝\n");

    return 0;
}
```

---

### Problem 2: Swap Without Third Variable

```c
#include <stdio.h>

int main() {
    int a = 10, b = 20;
    printf("Before: a=%d, b=%d\n", a, b);

    /* ═══════ Method 1: Arithmetic ═══════ */
    a = a + b;    /* a = 30 */
    b = a - b;    /* b = 30-20 = 10 */
    a = a - b;    /* a = 30-10 = 20 */
    printf("Arithmetic: a=%d, b=%d\n", a, b);

    /* ═══════ Method 2: XOR (Best — no overflow!) ═══════ */
    a = a ^ b;    /* a = 20^10 */
    b = a ^ b;    /* b = (20^10)^10 = 20 */
    a = a ^ b;    /* a = (20^10)^20 = 10 */
    printf("XOR: a=%d, b=%d\n", a, b);

    return 0;
}
```

---

### Problem 3: Demonstrate Overflow Behavior

```c
#include <stdio.h>
#include <limits.h>

int main() {
    printf("═══ Integer Limits & Overflow ═══\n\n");

    /* ───── Limits from limits.h ───── */
    printf("CHAR_MIN  = %d\n", CHAR_MIN);     /* -128 */
    printf("CHAR_MAX  = %d\n", CHAR_MAX);     /* 127 */
    printf("INT_MIN   = %d\n", INT_MIN);      /* -2147483648 */
    printf("INT_MAX   = %d\n", INT_MAX);      /* 2147483647 */
    printf("UINT_MAX  = %u\n", UINT_MAX);     /* 4294967295 */

    /* ───── Overflow demo ───── */
    printf("\n═══ Overflow Demo ═══\n");
    unsigned int u = UINT_MAX;
    printf("UINT_MAX     = %u\n", u);         /* 4294967295 */
    printf("UINT_MAX + 1 = %u\n", u + 1);     /* 0 (wrap!) */

    int s = INT_MAX;
    printf("INT_MAX      = %d\n", s);         /* 2147483647 */
    printf("INT_MAX + 1  = %d\n", s + 1);     /* -2147483648 */

    printf("\n0 - 1 (unsigned) = %u\n", (unsigned int)(0 - 1));
    /* 4294967295! (UINT_MAX) */

    return 0;
}
```

---

## ⚠️ 1.7 Tricky Parts & Common Mistakes

| # | Trap | বিবরণ | Fix |
|---|------|-------|-----|
| 1 | **Octal literal** | `int x = 010;` → x = **8**, NOT 10! Leading `0` = octal | Octal না চাইলে leading 0 দেবেন না |
| 2 | **Default = double** | `3.14` = double (8B), NOT float (4B)। `sizeof(3.14)` = **8** | Float চাইলে `3.14f` লিখুন |
| 3 | **char overflow** | `char c = 127+1;` → **-128**। `unsigned char = 255+1;` → **0** | Range check করুন |
| 4 | **Uninitialized local** | `int x; printf("%d",x);` → **Garbage!** (global হলে 0) | সবসময় initialize করুন |
| 5 | **scanf %c trap** | `scanf("%c",&ch);` → আগের **'\n'** পড়ে ফেলে! | `scanf(" %c",&ch);` — space দিন |
| 6 | **Integer division** | `5/2 = 2` (NOT 2.5!)। `float a = 5/2;` → **2.0** | Cast: `(float)5/2` = 2.5 |
| 7 | **Macro expansion** | `#define SQ(x) x*x` → `SQ(2+3)` = 11 ❌ | `((x)*(x))` bracket দিন |
| 8 | **sizeof array** | `int arr[10]; sizeof(arr)` = **40** bytes, NOT 4 | 40 / sizeof(int) = 10 elements |
| 9 | **Hex literal** | `0xA` = 10, `0xFF` = 255, `0x10` = **16** (NOT 10!) | 0x prefix = hexadecimal |
| 10 | **Escape in char** | `'\0'` = 0 (null), `'0'` = **48** (ASCII zero) | '\0' ≠ '0'! |

---

## 📝 1.8 Summary

> **প্রতিটি point মনোযোগ দিয়ে পড়ুন — exam এ এখান থেকেই প্রশ্ন হয়:**

- **`char`** = 1 byte (সবসময়), **`int`** = 4 bytes, **`float`** = 4 bytes, **`double`** = 8 bytes। এই size গুলো মুখস্থ রাখা **বাধ্যতামূলক** কারণ sizeof related প্রশ্ন প্রায় সব exam এ আসে।

- **`signed`** (default) ধনাত্মক ও ঋণাত্মক উভয় দিকে range দেয়; **`unsigned`** শুধু ধনাত্মক দিকে range **দ্বিগুণ** করে। `unsigned char` = 0 to 255, `signed char` = -128 to 127 — মোট value count (256) কিন্তু same!

- **Range মনে রাখার সূত্র:** n bit signed = **-2^(n-1) to 2^(n-1)-1**। এই একটি formula দিয়ে যেকোনো type এর range বের করা যায় — `char` (8 bit), `short` (16 bit), `int` (32 bit)।

- **Literal prefix** মনে রাখুন: `0` দিয়ে শুরু = **octal** (base 8), `0x` দিয়ে শুরু = **hexadecimal** (base 16), `0b` দিয়ে শুরু = **binary** (base 2)। `010` = 8 (decimal) — এটি সবচেয়ে common trap!

- **`3.14` by default `double`**, NOT float! `sizeof(3.14)` = **8**। float চাইলে `3.14f` suffix দিতে হবে — `sizeof(3.14f)` = **4**। এই পার্থক্য পরীক্ষায় প্রায়ই আসে।

- **`const`** হলো type-safe constant যা memory তে variable হিসেবে থাকে; **`#define`** হলো preprocessor text replacement যা compile time এ code এ paste হয়ে যায়। `const` ব্যবহার **বেশি নিরাপদ** কারণ compiler type checking করতে পারে।

- **Local variable** initialize না করলে **garbage value** থাকে (stack memory র random content); কিন্তু **global** বা **static** variable automatically **0** দিয়ে initialize হয়। এটি `auto` vs `static` storage class এর পার্থক্য।

- **Overflow** হলে value **wrap around** করে — signed variable এ positive overflow → **negative** হয়ে যায়, unsigned variable এ overflow → **0** থেকে আবার শুরু হয়। `char 127+1 = -128`, `unsigned char 255+1 = 0`।

- `scanf` এ **`" %c"`** — `%c` এর আগে **space character** না দিলে আগের input এর leftover **newline (`\n`)** character পড়ে ফেলে এবং user কে input দেওয়ার সুযোগ দেয় না। এটি beginners এর **সবচেয়ে common bug**।

- **Integer division** সবসময় দশমিক অংশ **কেটে ফেলে** (truncation, NOT rounding): `5/2 = 2`, `7/3 = 2`, `-7/2 = -3`। Float result পেতে **কমপক্ষে একটি operand** কে float/double এ **cast** করতে হবে: `(float)5/2 = 2.5`।

- `#define` **macro** তে parameter এর চারপাশে **bracket না দিলে** unexpected result আসে: `#define SQ(x) x*x` → `SQ(2+3)` = `2+3*2+3` = 11 (চাই 25!)। Fix: `#define SQ(x) ((x)*(x))`।

---
---

# Topic 2: Operators

<div align="center">

*"Operator বুঝলে expression বোঝা যায় — expression বুঝলে code পড়া যায়"*

</div>

---

## 📖 2.1 ধারণা (Concept)

Operator হলো **বিশেষ symbol** যা variable বা value এর উপর নির্দিষ্ট **operation** সম্পাদন করে। C তে **15 ধরনের** operator আছে।

```
Operators in C (Category-wise)
├── 1. Arithmetic          →  +   -   *   /   %
├── 2. Relational          →  ==  !=  >   <   >=  <=
├── 3. Logical             →  &&  ||  !
├── 4. Bitwise             →  &   |   ^   ~   <<  >>
├── 5. Assignment          →  =   +=  -=  *=  /=  %=
├── 6. Increment/Decrement →  ++  --
├── 7. Ternary             →  ? :
├── 8. Comma               →  ,
├── 9. sizeof              →  sizeof()
├── 10. Pointer            →  &   *
└── 11. Member Access      →  .   ->
```

---

## 📖 2.2 Arithmetic Operators

```c
#include <stdio.h>

int main() {
    int a = 17, b = 5;

    printf("a + b  = %d\n", a + b);    /* 22 — যোগ */
    printf("a - b  = %d\n", a - b);    /* 12 — বিয়োগ */
    printf("a * b  = %d\n", a * b);    /* 85 — গুণ */
    printf("a / b  = %d\n", a / b);    /* 3  — ⚠️ integer division! */
    printf("a %% b = %d\n", a % b);    /* 2  — ভাগশেষ (modulus) */

    /* ═══════ Modulus sign rule ═══════ */
    printf("-7 %% 2  = %d\n", -7 % 2);   /* -1 ⚠️ */
    printf(" 7 %% -2 = %d\n",  7 % -2);  /* +1 */
    printf("-7 %% -2 = %d\n", -7 % -2);  /* -1 */

    return 0;
}
```

> **Modulus (`%`) Rule:** sign সবসময় **left operand (dividend)** follow করে। `-7 % 2 = -1` (not +1)

---

## 📖 2.3 Short-Circuit Evaluation

> **এটি exam এর সবচেয়ে important topic — প্রায় প্রতিটি পরীক্ষায় আসে!**

```c
#include <stdio.h>

int main() {
    int a = 0, b = 5;

    /* ══════════════════════════════════════════
       AND (&&): বামদিক false হলে ডানদিক SKIP!
       ══════════════════════════════════════════ */
    int result = (a != 0) && (++b > 0);
    printf("b = %d, result = %d\n", b, result);
    /* b = 5 ⚠️ (b increment হয়নি! skip হয়েছে!) */
    /* result = 0 */

    /* ══════════════════════════════════════════
       OR (||): বামদিক true হলে ডানদিক SKIP!
       ══════════════════════════════════════════ */
    a = 1; b = 5;
    result = (a != 0) || (++b > 0);
    printf("b = %d, result = %d\n", b, result);
    /* b = 5 ⚠️ (b increment হয়নি!) */
    /* result = 1 */

    return 0;
}
```

```
Short-Circuit Summary:
━━━━━━━━━━━━━━━━━━━━━
&&  →  LEFT = false  →  RIGHT completely SKIPPED  →  result = 0
||  →  LEFT = true   →  RIGHT completely SKIPPED  →  result = 1

⚠️ Side effects (++, --, function call) ডানদিকে থাকলে execute নাও হতে পারে!
```

---

## 📖 2.4 Increment/Decrement — সবচেয়ে Tricky

```c
#include <stdio.h>

int main() {
    int a = 5;

    /* ═══════ Pre-increment: আগে বাড়াও, তারপর ব্যবহার করো ═══════ */
    printf("++a = %d\n", ++a);   /* 6 (a আগে 6 হলো, তারপর print) */

    /* ═══════ Post-increment: আগে ব্যবহার করো, তারপর বাড়াও ═══════ */
    a = 5;
    printf("a++ = %d\n", a++);   /* 5 (আগে 5 print, তারপর a = 6) */
    printf("a now = %d\n", a);    /* 6 */

    /* ═══════ Complex example — exam pattern ═══════ */
    a = 5;
    int b = a++;    /* b = 5 (old a), a becomes 6 */
    int c = ++a;    /* a becomes 7, c = 7 (new a) */
    printf("a=%d b=%d c=%d\n", a, b, c);  /* a=7 b=5 c=7 */

    return 0;
}
```

```
মনে রাখার কৌশল:
━━━━━━━━━━━━━━━━━
++a  →  "PRE  = আগে বাড়াও"  →  new value ব্যবহার হয়
a++  →  "POST = পরে বাড়াও"   →  old value ব্যবহার হয়
```

---

## 📖 2.5 Operator Precedence Table

```
Precedence (High → Low):
═══════════════════════════════════════════════════════════
 1.   ()  []  ->  .                        Postfix
 2.   !  ~  ++  --  +  -  *  &  sizeof    Unary (right→left)
 3.   *  /  %                              Multiplicative
 4.   +  -                                 Additive
 5.   <<  >>                               Shift
 6.   <  <=  >  >=                         Relational
 7.   ==  !=                               Equality
 8.   &                                    Bitwise AND
 9.   ^                                    Bitwise XOR
10.   |                                    Bitwise OR
11.   &&                                   Logical AND
12.   ||                                   Logical OR
13.   ?:                                   Ternary (right→left)
14.   =  +=  -=  ...                       Assignment (right→left)
15.   ,                                    Comma
═══════════════════════════════════════════════════════════
```

> **মনে রাখার কৌশল:** "**U**nary **M**ultiply **A**dd **S**hift — **R**elate **E**qual — **B**it **A**nd **X**or **O**r — **L**ogic **T**ernary **A**ssign **C**omma"

---

## ❓ 2.6 MCQ Problems

---

**MCQ 1:** `5 + 3 * 2` এর value কত?

| Option | Answer |
|--------|--------|
| (a) 16 | |
| (b) **11** | ✅ |
| (c) 10 | |
| (d) 13 | |

> **ব্যাখ্যা:** `*` precedence `+` এর চেয়ে বেশি। 3×2=6, তারপর 5+6=**11**

---

**MCQ 2:** নিচের কোডের output কী?
```c
int a = 0, b = 10;
int c = a && ++b;
printf("%d %d", b, c);
```

| Option | Answer |
|--------|--------|
| (a) 11 0 | |
| (b) **10 0** | ✅ |
| (c) 11 1 | |
| (d) 10 1 | |

> **ব্যাখ্যা:** **Short-circuit!** a=0 (false) → `&&` এর ডানদিক (`++b`) সম্পূর্ণ **skip**! b = 10 (unchanged), c = 0

---

**MCQ 3:** `int x = (2, 3, 4);` — x এর value?

| Option | Answer |
|--------|--------|
| (a) 2 | |
| (b) 3 | |
| (c) **4** | ✅ |
| (d) Error | |

> **ব্যাখ্যা:** Comma operator **সবশেষ expression এর value** return করে। (2, 3, 4) → **4**

---

**MCQ 4:** `-7 % 2` এর value কত?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) **-1** | ✅ |
| (c) 0 | |
| (d) -2 | |

> **ব্যাখ্যা:** Modulus sign **left operand (dividend)** follow করে। -7 negative → result = **-1**

---

**MCQ 5:** `12 & 10` এর value কত?

| Option | Answer |
|--------|--------|
| (a) **8** | ✅ |
| (b) 14 | |
| (c) 6 | |
| (d) 2 | |

> **ব্যাখ্যা:** 12=`1100`, 10=`1010`, AND=`1000`=**8**

---

**MCQ 6:** `5 << 2` এর value কত?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **20** | ✅ |
| (c) 2 | |
| (d) 7 | |

> **ব্যাখ্যা:** Left shift 2 = ×2² = ×4। 5 × 4 = **20**। Rule: `a << n` = a × 2ⁿ

---

**MCQ 7:** নিচের কোডের output কী?
```c
int a = 5;
printf("%d", a++);
printf(" %d", a);
```

| Option | Answer |
|--------|--------|
| (a) **5 6** | ✅ |
| (b) 6 6 | |
| (c) 5 5 | |
| (d) 6 7 | |

> **ব্যাখ্যা:** প্রথম printf: post-increment → আগে **5** print, তারপর a=6। দ্বিতীয় printf: a=**6**।

---

**MCQ 8:** নিচের কোডের output কী?
```c
printf("%d", !0);
printf(" %d", !5);
printf(" %d", !!5);
```

| Option | Answer |
|--------|--------|
| (a) 0 5 5 | |
| (b) 1 0 5 | |
| (c) **1 0 1** | ✅ |
| (d) 0 1 0 | |

> **ব্যাখ্যা:** `!0`=1 (NOT false=true), `!5`=0 (NOT true=false), `!!5`=!0=**1**

---

## ⚠️ 2.7 Tricky Parts

| # | Trap | বিবরণ | Fix |
|---|------|-------|-----|
| 1 | **= vs ==** | `if(a=5)` = Assignment, always true! | `if(5==a)` লিখলে ভুলে `=` দিলে error |
| 2 | **Short-circuit** | `(0) && (++x)` → x বাড়বে না! | Side effect short-circuit এ skip হয় |
| 3 | **Comma precedence** | `a = 5, 10, 15;` → a=**5** | Bracket দিন: `a = (5, 10, 15)` → a=15 |
| 4 | **Bitwise vs Logical** | `6 & 3`=**2**, `6 && 3`=**1** — ভিন্ন! | `&` = bit level, `&&` = boolean |
| 5 | **== > &** | `a & b == c` = `a & (b==c)` | `(a & b) == c` bracket দিন |
| 6 | **UB** | `x++ + ++x` = **Undefined Behavior!** | একই expression এ double modify এড়িয়ে চলুন |
| 7 | **~x formula** | `~x = -(x+1)` | `~0`=-1, `~5`=-6, `~(-1)`=0 |

---

## 📝 2.8 Summary

- **Arithmetic operator `%` (modulus)** এর result এর sign সবসময় **left operand (dividend)** এর sign follow করে। `-7 % 2 = -1`, `7 % -2 = +1`। এটি জানা না থাকলে পরীক্ষায় ভুল হওয়া নিশ্চিত।

- **Relational operator** এর result C তে সবসময় **integer** — true = **1** (বা যেকোনো non-zero), false = **0**। C তে `bool` type নেই (C99 এ `_Bool` আছে তবে exam এ `int` হিসেবেই আসে)।

- **Short-circuit evaluation** হলো `&&` ও `||` এর সবচেয়ে গুরুত্বপূর্ণ বৈশিষ্ট্য: `&&` এ left side **false** হলে right side **execute হয় না**; `||` এ left side **true** হলে right side **execute হয় না**। যদি right side এ `++`, `--`, বা function call থাকে — সেগুলোও **skip** হয়ে যায়!

- **Pre-increment (`++a`)** আগে value বাড়ায়, তারপর ব্যবহার করে — **new value** return করে। **Post-increment (`a++`)** আগে ব্যবহার করে, তারপর বাড়ায় — **old value** return করে। মনে রাখুন: **PRE = আগে, POST = পরে**।

- **Ternary operator** (`condition ? true_val : false_val`) হলো if-else এর **compact version**। `max = (a > b) ? a : b;` — এক লাইনে max বের করা যায়।

- **Comma operator** বাম থেকে ডানে সব expression evaluate করে, কিন্তু **শেষেরটার value** return করে। তবে `=` operator এর চেয়ে precedence **কম**, তাই `a = 5, 10` → a = **5** (5 আগে assign হয়)।

- **`=` vs `==`** হলো C programming এর **সবচেয়ে common mistake**। `if(a = 5)` সবসময় true (a তে 5 assign হয়, 5 = non-zero = true)। Fix: `if(5 == a)` লিখুন — ভুলে `=` দিলে compiler error দেবে।

- **Bitwise `&`** vs **Logical `&&`** সম্পূর্ণ আলাদা operator! `6 & 3 = 2` (bit-level AND: 110 & 011 = 010), কিন্তু `6 && 3 = 1` (boolean: true AND true = true)। Exam এ confuse করার জন্য এই দুটো পাশাপাশি আসে।

- **`==` এর precedence `&` এর চেয়ে বেশি**, তাই `a & b == c` parse হয় `a & (b == c)` হিসেবে — `(a & b) == c` নয়! Bitwise operation এ সবসময় **explicit bracket** ব্যবহার করুন।

---
---

# Topic 3: Format Specifiers & printf/scanf Tricks

<div align="center">

*"printf ও scanf এর ১০টি trick জানলে exam এর ১০টি প্রশ্ন কমন পড়বে"*

</div>

---

## 📖 3.1 ধারণা (Concept)

Format specifier হলো `printf()` ও `scanf()` এ ব্যবহৃত বিশেষ code যা বলে দেয় **কোন type** এর data **কিভাবে format** করে input/output হবে।

```
Format Specifier Structure:
═══════════════════════════
% [flags] [width] [.precision] [length] specifier

%        → শুরু indicator
flags    → -, +, 0, space, #
width    → minimum field width
.precision → decimal places / max string length
length   → h, l, ll, L
specifier → d, f, c, s, x, o, etc.
```

### Complete Specifier Table

```
┌────────────┬───────────────────────────┬────────────────────────┐
│ Specifier  │ ব্যবহার                   │ Example                │
├────────────┼───────────────────────────┼────────────────────────┤
│ %d  or %i  │ signed int (decimal)      │ printf("%d", 42) → 42 │
│ %u         │ unsigned int              │ printf("%u", 42) → 42 │
│ %f         │ float/double (printf)     │ 3.140000               │
│ %lf        │ double (scanf ONLY!)      │ scanf("%lf", &d)       │
│ %e / %E    │ scientific notation       │ 3.14e+00               │
│ %g         │ shortest of %f or %e      │ 3.14                   │
│ %c         │ single character          │ A                      │
│ %s         │ string (char array)       │ Hello                  │
│ %p         │ pointer address           │ 0x7ffc...              │
│ %x / %X    │ hexadecimal (lower/upper) │ ff / FF                │
│ %o         │ octal                     │ 10                     │
│ %ld        │ long int                  │ 123456789              │
│ %lld       │ long long int             │ 9223372036854775807    │
│ %%         │ literal % sign            │ 100%                   │
└────────────┴───────────────────────────┴────────────────────────┘
```

---

## 💻 3.2 printf() Formatting — Width, Flags, Precision

```c
#include <stdio.h>

int main() {
    /* ═══════ Width (minimum field width) ═══════ */
    printf("[%d]\n", 42);         /* [42]         → normal */
    printf("[%10d]\n", 42);       /* [        42] → right-aligned, width 10 */
    printf("[%-10d]\n", 42);      /* [42        ] → left-aligned, width 10 */

    /* ═══════ Flags ═══════ */
    printf("[%+d]\n", 42);        /* [+42]  → always show sign */
    printf("[%+d]\n", -42);       /* [-42]  → negative always shows */
    printf("[%010d]\n", 42);      /* [0000000042] → zero padding */
    printf("[%#x]\n", 255);       /* [0xff] → hex with 0x prefix */
    printf("[%#o]\n", 8);         /* [010]  → octal with 0 prefix */

    /* ═══════ Precision (.N) ═══════ */
    printf("%.2f\n", 3.14159);    /* 3.14   → 2 decimal places */
    printf("%.4f\n", 3.14159);    /* 3.1416 → 4 places (rounded!) */
    printf("%.0f\n", 3.14159);    /* 3      → no decimal */
    printf("%f\n", 3.14159);      /* 3.141590 → default 6 places */
    printf("%.3s\n", "Hello");    /* Hel    → max 3 chars of string */

    /* ═══════ Width + Precision ═══════ */
    printf("[%10.2f]\n", 3.14);   /* [      3.14] → width 10, 2 decimal */

    return 0;
}
```

---

## 💻 3.3 printf() Return Value — Nested printf

> **Exam favourite! প্রায় প্রতিটি পরীক্ষায় nested printf আসে।**

```c
#include <stdio.h>

int main() {
    /* ══════════════════════════════════════════════
       printf() returns: TOTAL CHARACTERS PRINTED
       ══════════════════════════════════════════════ */
    int n;

    n = printf("Hello");
    printf(" → returned %d\n", n);     /* Hello → returned 5 */

    n = printf("%d", 1234);
    printf(" → returned %d\n", n);     /* 1234 → returned 4 */

    /* ══════════════════════════════════════════════
       Nested printf — evaluate INSIDE OUT!
       ══════════════════════════════════════════════ */

    /* Level 1: */
    printf("%d", printf("Hello"));
    /* Step 1: inner printf("Hello") → prints "Hello", returns 5 */
    /* Step 2: outer printf("%d", 5) → prints "5" */
    /* Output: Hello5 */
    printf("\n");

    /* Level 2: */
    printf("%d", printf("%d", printf("Hello")));
    /* Step 1: printf("Hello")  → prints "Hello", returns 5 */
    /* Step 2: printf("%d", 5)  → prints "5", returns 1 */
    /* Step 3: printf("%d", 1)  → prints "1" */
    /* Output: Hello51 */
    printf("\n");

    return 0;
}
```

---

## 💻 3.4 scanf() — Input Methods Comparison

```c
#include <stdio.h>
#include <string.h>

int main() {
    char name[50];

    /* ════════════════════════════════════════════════
       Method 1: scanf %s — STOPS AT WHITESPACE!
       ════════════════════════════════════════════════ */
    scanf("%s", name);
    /* Input: "John Doe" → name = "John" ONLY! ⚠️ */

    /* ════════════════════════════════════════════════
       Method 2: fgets — reads FULL LINE (BEST!)
       ════════════════════════════════════════════════ */
    fgets(name, 50, stdin);
    /* ⚠️ fgets includes '\n' at end! */
    name[strcspn(name, "\n")] = '\0';  /* Remove '\n' */

    /* ════════════════════════════════════════════════
       Method 3: scanf scanset
       ════════════════════════════════════════════════ */
    scanf(" %[^\n]", name);  /* reads until newline */

    /* ════════════════════════════════════════════════
       Method 4: Formatted input
       ════════════════════════════════════════════════ */
    int d, m, y;
    scanf("%d/%d/%d", &d, &m, &y);  /* Input: 15/03/2000 */

    return 0;
}
```

```
Input Methods Comparison:
┌──────────────┬──────────┬──────────┬──────────────┐
│ Method       │ Spaces?  │ Safe?    │ '\n' in str? │
├──────────────┼──────────┼──────────┼──────────────┤
│ scanf("%s")  │ ❌ stops │ ⚠️ no limit│ ❌ no       │
│ scanf("%49s")│ ❌ stops │ ✅ limited │ ❌ no       │
│ fgets()      │ ✅ reads │ ✅ limited │ ⚠️ includes! │
│ gets()       │ ✅ reads │ ❌ NEVER! │ ❌ no       │
│ scanf scanset│ ✅ reads │ ⚠️ no limit│ ❌ no       │
└──────────────┴──────────┴──────────┴──────────────┘

⚡ Best practice: fgets() + remove '\n'
```

---

## ❓ 3.5 MCQ Problems

---

**MCQ 1:** `printf("%d", printf("Hello"))` এর output?

| Option | Answer |
|--------|--------|
| (a) **Hello5** | ✅ |
| (b) 5Hello | |
| (c) Hello | |
| (d) 5 | |

> Inner printf prints **"Hello"** (returns 5), outer prints **"5"**. Output: **Hello5**

---

**MCQ 2:** `printf("%.2f", 3.14659)` এর output?

| Option | Answer |
|--------|--------|
| (a) 3.14 | |
| (b) **3.15** | ✅ |
| (c) 3.14659 | |
| (d) 3.1 | |

> `.2f` = 2 decimal places। 3.14**6**59 → 6≥5 তাই round up → **3.15**

---

**MCQ 3:** `printf("%c", 65)` এর output?

| Option | Answer |
|--------|--------|
| (a) 65 | |
| (b) **A** | ✅ |
| (c) Error | |
| (d) 6 | |

> `%c` = character format। ASCII 65 = **'A'**

---

**MCQ 4:** `printf("%%d", 10)` এর output?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **%d** | ✅ |
| (c) %10 | |
| (d) Error | |

> `%%` = literal **%** print → output: **%d**। 10 ignored হয়ে যায়।

---

**MCQ 5:** নিচের কোডে কী হবে?
```c
float f = 3.14;
printf("%d", f);
```

| Option | Answer |
|--------|--------|
| (a) 3 | |
| (b) 3.14 | |
| (c) **Garbage (UB)** | ✅ |
| (d) Error | |

> **`%d` with float = Undefined Behavior!** Format specifier ও data type মিলতে হবে। `%d` expects int, কিন্তু float পেয়েছে — result = garbage!

---

**MCQ 6:** `scanf()` কী return করে?

| Option | Answer |
|--------|--------|
| (a) 0 always | |
| (b) 1 always | |
| (c) **Successfully read items এর সংখ্যা** | ✅ |
| (d) Input string length | |

> `scanf("%d %d", &a, &b)` — দুটো successfully read হলে **2** return করে। একটিও fail হলে 0 বা EOF।

---

## 📝 3.6 Summary

- **`%d`**=int, **`%f`**=float/double(printf), **`%lf`**=double(**scanf only!**), **`%c`**=char, **`%s`**=string, **`%%`**=literal %। scanf এ double পড়তে **`%lf`** বাধ্যতামূলক, কিন্তু printf এ `%f` ই কাজ করে (double automatically promote হয়)।

- **printf() returns** মোট কতটি **character print** হয়েছে সেই সংখ্যা। nested printf এ **inside-out** evaluate হয় — inner printf আগে execute হয়, তার return value outer printf এ যায়। `printf("%d", printf("Hello"))` → **Hello5**

- **scanf() returns** successfully read হওয়া item এর **count**। Input validation এ খুবই useful: `if(scanf("%d", &n) != 1)` → invalid input handle।

- **`%f` default 6 decimal places** দেখায়: `printf("%f", 3.14)` → **3.140000** (NOT 3.14!)। নির্দিষ্ট decimal চাইলে precision দিন: `%.2f` → 3.14

- **scanf(" %c")** — `%c` এর আগে **space** দেওয়া **বাধ্যতামূলক** যদি আগে কোনো scanf থাকে। কারণ আগের input এর leftover `\n` character buffer এ থেকে যায় এবং `%c` সেটা পড়ে ফেলে — user কে input দেওয়ার সুযোগ দেয় না।

- **scanf("%s")** whitespace (space, tab, newline) পেলেই **থেমে যায়**। "John Doe" input দিলে শুধু "John" পড়ে। Full line পড়তে **fgets()** ব্যবহার করুন — তবে fgets শেষে **`\n` include** করে, সেটা remove করতে হবে।

- **Format mismatch = Undefined Behavior:** `printf("%d", 3.14f)` → **garbage!** `printf("%f", 5)` → **garbage!** Specifier ও data type অবশ্যই match করতে হবে।

---
---

# Topic 4: Type Casting (Implicit & Explicit)

<div align="center">

*"Type casting না বুঝলে expression evaluation কখনো সঠিক হবে না"*

</div>

---

## 📖 4.1 ধারণা (Concept)

Type casting হলো এক **data type** থেকে অন্য **data type** এ রূপান্তর। C তে দুই ধরনের casting:

```
Type Casting
├── Implicit (Automatic)
│   └── Compiler নিজে করে — ছোট type → বড় type (safe)
│
└── Explicit (Manual)
    └── Programmer নিজে করে — (target_type) expression
```

### Promotion Hierarchy

```
ছোট ──────────────────────────────────────────────────→ বড়

char → short → int → unsigned int → long → long long
                                         → float → double → long double

⚡ Mixed expression এ ছোট type → বড় type এ PROMOTE হয়
```

---

## 💻 4.2 Implicit Casting — Compiler নিজে করে

```c
#include <stdio.h>

int main() {
    /* ══════ Case 1: int + float → float ══════ */
    int a = 5;
    float b = 2.5;
    float result = a + b;   /* a(5) → 5.0, then 5.0 + 2.5 = 7.5 */
    printf("int + float = %.1f\n", result);  /* 7.5 */

    /* ══════ Case 2: int / int → int (NO promotion!) ══════ */
    int x = 7, y = 2;
    float z = x / y;     /* ⚠️ 7/2 = 3 (int!) THEN 3 → 3.0 */
    printf("7 / 2 = %.1f\n", z);  /* 3.0 ⚠️ NOT 3.5! */

    /* ══════ Case 3: float → int (narrowing, data loss!) ══════ */
    float f = 9.87;
    int n = f;            /* 9.87 → 9 (truncation, NOT rounding!) */
    printf("(int)9.87 = %d\n", n);  /* 9 */

    /* ══════ Case 4: char promotion ══════ */
    char c1 = 10, c2 = 20;
    printf("sizeof(c1+c2) = %lu\n", sizeof(c1 + c2));  /* 4 (int!) */
    /* char + char → int + int (automatically promoted!) */

    return 0;
}
```

---

## 💻 4.3 Explicit Casting — Cast Position Critical!

```c
#include <stdio.h>

int main() {
    int a = 7, b = 2;

    /* ═══════════════════════════════════════════════
       ❌ WRONG: cast AFTER division
       ═══════════════════════════════════════════════ */
    float wrong = (float)(a / b);
    printf("(float)(7/2) = %f\n", wrong);   /* 3.000000 ❌ */
    /* কারণ: a/b = 7/2 = 3 (int division DONE!) → then (float)3 = 3.0 */

    /* ═══════════════════════════════════════════════
       ✅ RIGHT: cast BEFORE division
       ═══════════════════════════════════════════════ */
    float right = (float)a / b;
    printf("(float)7 / 2 = %f\n", right);   /* 3.500000 ✅ */
    /* কারণ: (float)7 = 7.0, then 7.0/2 → 2 promotes → 3.5 */

    /* ═══════════════════════════════════════════════
       Truncation = toward zero, NOT rounding!
       ═══════════════════════════════════════════════ */
    printf("(int)3.9  = %d\n", (int)3.9);    /* 3  (NOT 4!) */
    printf("(int)-3.7 = %d\n", (int)-3.7);   /* -3 (NOT -4!) */

    return 0;
}
```

> **Golden Rule:** `(float)(a/b)` ≠ `(float)a/b`! Cast এর **position** result সম্পূর্ণ বদলে দেয়।

---

## 💻 4.4 signed vs unsigned — Most Dangerous Trap!

```c
#include <stdio.h>

int main() {
    /* ═══════ signed vs unsigned comparison ═══════ */
    int s = -1;
    unsigned int u = 1;

    if (s < u)
        printf("-1 < 1: Expected\n");
    else
        printf("-1 > 1: Surprise!\n");   /* ⚠️ THIS PRINTS! */

    /* কেন? -1 (signed) → unsigned convert → 4294967295! */
    printf("(unsigned)(-1) = %u\n", (unsigned int)-1);
    /* 4294967295 (UINT_MAX!) */
    /* 4294967295 > 1 = true! */

    return 0;
}
```

> **Critical Rule:** `signed + unsigned` comparison → signed variable **unsigned এ convert** হয়! `-1` → `4294967295` হয়ে যায়! তাই `-1 < 1u` = **FALSE!**

---

## ❓ 4.5 MCQ Problems

---

**MCQ 1:** `float c = 5 / 2;` — c এর value?

| Option | Answer |
|--------|--------|
| (a) 2.5 | |
| (b) **2.0** | ✅ |
| (c) 3.0 | |
| (d) Error | |

> `5/2` = **int/int = 2** (int division!)। তারপর 2 → **2.0** (float এ assign)

---

**MCQ 2:** `(int)3.9 + (int)3.1` এর value?

| Option | Answer |
|--------|--------|
| (a) 7 | |
| (b) **6** | ✅ |
| (c) 7.0 | |
| (d) Error | |

> `(int)3.9`=**3**, `(int)3.1`=**3**। 3+3 = **6**। Truncation, NOT rounding!

---

**MCQ 3:** `sizeof('A')` C তে কত?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) 2 | |
| (c) **4** | ✅ |
| (d) 8 | |

> C তে character constant **int** type! `sizeof('A')` = `sizeof(int)` = **4**। (C++ এ 1 হতো — exam trap!)

---

**MCQ 4:** `-1 > 1u` — result?

| Option | Answer |
|--------|--------|
| (a) 0 (false) | |
| (b) **1 (true)** | ✅ |
| (c) Error | |
| (d) -1 | |

> -1 → unsigned → **4294967295** > 1 = **true!** সবচেয়ে dangerous trap।

---

**MCQ 5:** `int big = 300; char small = big;` — small এর value?

| Option | Answer |
|--------|--------|
| (a) 300 | |
| (b) **44** | ✅ |
| (c) 0 | |
| (d) Error | |

> char = 1 byte = 256 values। 300 % 256 = **44** (overflow wrap)

---

## 📝 4.6 Summary

- **Implicit casting** compiler **automatically** করে: ছোট type → বড় type (safe, widening)। **Explicit casting** programmer করে: `(type)expression` — যেকোনো direction এ force convert।

- C expression এ **char ও short** automatically **int** এ **promote** হয়। `char a = 10, b = 20; sizeof(a+b)` = **4** (int!), 1 নয়। এটি "integer promotion" rule — exam এ আসে।

- **int / int = int** — দশমিক অংশ **সম্পূর্ণ কেটে যায়**! `7/2 = 3` (not 3.5!)। Float result পেতে কমপক্ষে **একটি operand** কে cast করুন: `(float)7/2 = 3.5`।

- **`(float)(a/b)`** ≠ **`(float)a/b`** — cast এর **position** result সম্পূর্ণ বদলে দেয়! প্রথমটিতে int division **আগে** হয়ে যায় (3), তারপর cast হয় (3.0)। দ্বিতীয়টিতে cast **আগে** হয় (7.0), তারপর float division (3.5)।

- **Truncation toward zero:** `(int)3.9` = **3** (NOT 4!), `(int)-3.7` = **-3** (NOT -4!)। Truncation **round নয়** — শুধু দশমিক অংশ কেটে ফেলে, zero এর দিকে যায়।

- **signed vs unsigned comparison** হলো C এর **সবচেয়ে dangerous trap**: `-1 < 1u` = **FALSE!** কারণ signed -1 → unsigned convert হয়ে **4294967295** (UINT_MAX) হয়ে যায়। সবসময় **same type** এ compare করুন।

- **`sizeof('A')`** = **4** in C কারণ character constant এর type **int**। কিন্তু C++ এ `sizeof('A')` = **1** কারণ সেখানে type **char**। পরীক্ষায় C vs C++ confusion এর জন্য এই প্রশ্ন আসে।

- **float** precision ~ **7 significant digits**, **double** ~ **15 significant digits**। বড় integer (যেমন 123456789) float এ রাখলে **precision loss** হবে: `float f = 123456789;` → `123456792.0` (ভুল!)।

---
---

# Topic 5: Conditional Statements

<div align="center">

*"if-else ও switch সঠিকভাবে না বুঝলে logic build করা অসম্ভব"*

</div>

---

## 📖 5.1 ধারণা (Concept)

Conditional statement প্রোগ্রামকে **সিদ্ধান্ত নিতে** সাহায্য করে — কোন condition সত্য হলে কোন code block execute হবে।

```
Conditional Statements in C
├── if                       → একটি condition check
├── if-else                  → দুটি path (true/false)
├── if-else if-else          → একাধিক condition (ladder)
├── Nested if                → if এর ভেতরে if
├── switch-case              → exact value matching
└── Ternary (? :)            → compact if-else
```

### Flow Diagram

```
if-else:                        switch:

    ┌──────────┐                ┌──────────────┐
    │Condition?│                │  expression  │
    └────┬─────┘                └──────┬───────┘
    TRUE │ FALSE               ┌──┬───┴───┬──┐
    ┌────┘   └────┐            ▼  ▼       ▼  ▼
    ▼              ▼         case1 case2 case3 default
  ┌────┐       ┌────┐          │    │      │    │
  │ if │       │else│        break break break  │
  └──┬─┘       └──┬─┘          └────┴──┬───┴────┘
     └─────┬──────┘                    ▼
           ▼                      Continue...
      Continue...
```

---

## 💻 5.2 if-else Ladder

```c
#include <stdio.h>

int main() {
    int marks = 75;

    if (marks >= 90) {
        printf("Grade: A+\n");
    } else if (marks >= 80) {
        printf("Grade: A\n");
    } else if (marks >= 70) {
        printf("Grade: B\n");     /* ✅ This executes (75 >= 70) */
    } else if (marks >= 60) {
        printf("Grade: C\n");     /* skip — already matched above */
    } else {
        printf("Grade: F\n");
    }

    return 0;
}
/* Output: Grade: B */
```

> **Rule:** প্রথম **true** condition এর block execute হয়, **বাকি সব skip** হয়ে যায়!

---

## 💻 5.3 Dangling Else — পরীক্ষার #1 Trap

```c
#include <stdio.h>

int main() {
    int a = 5, b = 3;

    /* ⚠️ কোন if এর সাথে else match করবে? */
    if (a > 2)
        if (b > 5)
            printf("Case 1\n");
    else
        printf("Case 2\n");

    /* Output: Case 2 */

    /* ═══ Actually parsed as: ═══ */
    /*                             */
    /*  if (a > 2)                 */
    /*      if (b > 5)             */
    /*          printf("Case 1");  */
    /*      else          ← INNER if এর else! */
    /*          printf("Case 2");  */
    /*                             */
    /* a>2=true → inner: b>5=false → else → "Case 2" */

    return 0;
}
```

> **Rule:** `else` সবসময় **nearest unmatched if** এর সাথে pair হয়। Confusion এড়াতে **সবসময় `{}` braces** ব্যবহার করুন!

---

## 💻 5.4 switch-case & Fall-Through

```c
#include <stdio.h>

int main() {
    int x = 2;

    /* ═══════ ⚠️ No break — FALL-THROUGH! ═══════ */
    switch (x) {
        case 1: printf("One\n");
        case 2: printf("Two\n");      /* ← match! */
        case 3: printf("Three\n");    /* ← fall-through */
        case 4: printf("Four\n");     /* ← fall-through */
        default: printf("Default\n"); /* ← fall-through */
    }

    /* Output:
       Two
       Three
       Four
       Default
    */

    return 0;
}
```

> **Fall-through Rule:** `break` না দিলে match হওয়া case থেকে **নিচের সব case execute** হতে থাকে!

### switch Rules

```
switch এর নিয়ম — মুখস্থ করুন:
══════════════════════════════
1. expression অবশ্যই INTEGER type (int, char, enum)
   → float হবে না! string হবে না!
2. case value অবশ্যই CONSTANT
   → variable হবে না! range হবে না!
3. break না দিলে FALL-THROUGH হয়
4. default optional — যেকোনো position এ থাকতে পারে
5. duplicate case value → Compilation Error
6. case 1+2: ও case 3: → duplicate (both = 3)!
```

---

## 💻 5.5 Tricky Conditions — C তে true/false

```c
#include <stdio.h>

int main() {
    /* ══════════════════════════════════════
       Non-zero = TRUE, Zero = FALSE
       ══════════════════════════════════════ */
    if (5)     printf("5 is true\n");      /* ✅ prints */
    if (-1)    printf("-1 is true\n");     /* ✅ prints! */
    if (0.001) printf("0.001 is true\n");  /* ✅ prints! */
    if (0)     printf("0 is true\n");      /* ❌ won't print */
    if (0.0)   printf("0.0 is true\n");    /* ❌ won't print */
    if ('\0')  printf("null true\n");      /* ❌ ('\0' = 0) */
    if ('0')   printf("'0' is true\n");    /* ✅ ('0' = 48!) */

    /* ══════════════════════════════════════
       ⚠️ Assignment in condition
       ══════════════════════════════════════ */
    int a = 0;
    if (a = 5) {
        printf("Always true! a=%d\n", a);
        /* a = 5 (assignment), 5 = non-zero = true! */
    }

    /* ══════════════════════════════════════
       ⚠️ Semicolon after if = EMPTY if!
       ══════════════════════════════════════ */
    int x = 1;
    if (x > 100);              /* ← empty statement! if does NOTHING */
        printf("Always!\n");   /* ← ALWAYS prints (not part of if!) */

    return 0;
}
```

---

## ❓ 5.6 MCQ Problems

---

**MCQ 1:** নিচের কোডের output?
```c
int a = 5;
if (a = 0)
    printf("YES");
else
    printf("NO");
```

| Option | Answer |
|--------|--------|
| (a) YES | |
| (b) **NO** | ✅ |
| (c) Error | |
| (d) 5 | |

> `a = 0` হলো **assignment** (comparison নয়!)। a তে 0 বসে, 0 = **false** → else → **"NO"**

---

**MCQ 2:** নিচের কোডের output?
```c
int x = 2;
switch (x) {
    case 1: printf("A");
    case 2: printf("B");
    case 3: printf("C");
    default: printf("D");
}
```

| Option | Answer |
|--------|--------|
| (a) B | |
| (b) **BCD** | ✅ |
| (c) BD | |
| (d) ABCD | |

> case 2 match → "B" → **break নেই** → fall-through → "C" → "D"। Output: **BCD**

---

**MCQ 3:** Dangling else — output?
```c
int x = 1, y = 0;
if (x)
    if (y)
        printf("A");
else
    printf("B");
```

| Option | Answer |
|--------|--------|
| (a) A | |
| (b) **B** | ✅ |
| (c) Nothing | |
| (d) AB | |

> else = nearest if (`if(y)`)। x=1 → inner: y=0 → else → **"B"**

---

**MCQ 4:** `switch(3.5)` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) Match | |
| (b) No match | |
| (c) **Compilation Error** | ✅ |
| (d) Runtime Error | |

> switch **float/double accept করে না!** শুধু **int/char/enum**।

---

**MCQ 5:** নিচের কোডের output?
```c
int x = 5;
switch (x) {
    default: printf("D");
    case 1:  printf("1");
    case 2:  printf("2");
}
```

| Option | Answer |
|--------|--------|
| (a) D | |
| (b) **D12** | ✅ |
| (c) 12 | |
| (d) Nothing | |

> x=5 → কোনো case match নেই → **default** → "D" → fall-through → "1" → "2"

---

**MCQ 6:** নিচের কোডের output?
```c
if (printf("Hello"))
    printf(" World");
else
    printf(" C");
```

| Option | Answer |
|--------|--------|
| (a) **Hello World** | ✅ |
| (b) Hello C | |
| (c) Hello | |
| (d) World | |

> `printf("Hello")` returns **5** (non-zero = true) → " World"

---

**MCQ 7:** নিচের কোডের output?
```c
int x = 0;
if (x == 0)
    printf("A");
    printf("B");
printf("C");
```

| Option | Answer |
|--------|--------|
| (a) AC | |
| (b) **ABC** | ✅ |
| (c) A | |
| (d) BC | |

> braces নেই → শুধু `printf("A")` if block এ। **"B"** ও **"C"** সবসময় execute হয়।

---

**MCQ 8:** নিচের কোডের output?
```c
int a = 2;
switch (a) {
    case 1: printf("One "); break;
    case 2: printf("Two ");
    case 3: printf("Three "); break;
    case 4: printf("Four ");
}
```

| Option | Answer |
|--------|--------|
| (a) Two | |
| (b) **Two Three** | ✅ |
| (c) Two Three Four | |
| (d) Two Four | |

> case 2 match → "Two " → **break নেই** → fall to case 3 → "Three " → **break** → stop

---

## ✍️ 5.7 Written Problems

---

### Problem 1: Leap Year Check

```c
#include <stdio.h>

int main() {
    int year;
    printf("Enter year: ");
    scanf("%d", &year);

    /*
     * Leap Year Rules:
     * 1. Divisible by 400 → LEAP
     * 2. Divisible by 100 → NOT LEAP
     * 3. Divisible by 4   → LEAP
     * 4. Otherwise        → NOT LEAP
     */

    if (year % 400 == 0) {
        printf("%d is a Leap Year\n", year);
    } else if (year % 100 == 0) {
        printf("%d is NOT a Leap Year\n", year);
    } else if (year % 4 == 0) {
        printf("%d is a Leap Year\n", year);
    } else {
        printf("%d is NOT a Leap Year\n", year);
    }

    /* One-line version: */
    /* (year%400==0) || (year%100!=0 && year%4==0) → Leap */

    return 0;
}
```

---

### Problem 2: Calculator with switch

```c
#include <stdio.h>

int main() {
    float a, b;
    char op;

    printf("Enter: num op num (e.g., 10 + 5): ");
    scanf("%f %c %f", &a, &op, &b);

    printf("\nResult: ");
    switch (op) {
        case '+':
            printf("%.2f + %.2f = %.2f\n", a, b, a + b);
            break;
        case '-':
            printf("%.2f - %.2f = %.2f\n", a, b, a - b);
            break;
        case '*':
            printf("%.2f * %.2f = %.2f\n", a, b, a * b);
            break;
        case '/':
            if (b == 0)
                printf("Error: Division by zero!\n");
            else
                printf("%.2f / %.2f = %.2f\n", a, b, a / b);
            break;
        case '%':
            printf("%d %% %d = %d\n", (int)a, (int)b, (int)a % (int)b);
            break;
        default:
            printf("Invalid operator '%c'!\n", op);
    }

    return 0;
}
```

---

### Problem 3: Triangle Type Checker

```c
#include <stdio.h>

int main() {
    int a, b, c;
    printf("Enter three sides: ");
    scanf("%d %d %d", &a, &b, &c);

    /* Check if valid triangle */
    if (a + b <= c || b + c <= a || a + c <= b) {
        printf("Not a valid triangle!\n");
    } else if (a == b && b == c) {
        printf("Equilateral triangle\n");
    } else if (a == b || b == c || a == c) {
        printf("Isosceles triangle\n");
    } else {
        printf("Scalene triangle\n");
    }

    return 0;
}
```

---

## ⚠️ 5.8 Tricky Parts

| # | Trap | বিবরণ | Fix |
|---|------|-------|-----|
| 1 | **= vs ==** | `if(a=5)` = assignment, always **true** (5≠0)! | `if(5==a)` লিখুন |
| 2 | **Dangling else** | else = **nearest** unmatched if | সবসময় `{}` ব্যবহার করুন |
| 3 | **Missing braces** | if এর পরে শুধু **1st statement** block এ | `{}` দিন |
| 4 | **Fall-through** | break ভুলে গেলে **সব পরের case** চলে | break দিন |
| 5 | **switch float** | `switch(3.14)` → **Error!** | শুধু int/char/enum |
| 6 | **Semicolon** | `if(x>5);` → if **empty** হয়ে যায়! | semicolon সরান |
| 7 | **Non-zero = true** | `-1`, `0.001`, `'0'`(48) সব **true** | শুধু `0` = false |
| 8 | **case variable** | `case x:` → **Error!** | case = constant only |
| 9 | **duplicate case** | `case 3:` ও `case 1+2:` = duplicate → **Error** | unique values |
| 10 | **printf in if** | `if(printf("Hi"))` = **true** (returns 2) | return value = char count |

---

## 📝 5.9 Summary

- **if-else** সবচেয়ে versatile — range check, complex condition, float comparison, nested logic — সব কিছু করতে পারে। **switch** শুধু **exact value matching** এ কাজ করে এবং শুধু **int, char, enum** type accept করে — float, string, range check কোনোটাই switch এ সম্ভব নয়।

- **Dangling else** হলো C এর একটি classic trap: `else` সবসময় **nearest unmatched if** এর সাথে pair হয়, indentation যাই হোক না কেন। এটি এড়ানোর একমাত্র উপায় হলো সবসময় **`{}` braces** ব্যবহার করা, এমনকি single statement if/else block এও।

- **switch fall-through** পরীক্ষার **#1 most common topic**: `break` না দিলে match হওয়া case থেকে **নিচের সব case ও default** execute হতে থাকে যতক্ষণ না break পাওয়া যায় বা switch block শেষ হয়। Intentional fall-through useful হতে পারে (যেমন multiple case এ same code), কিন্তু ভুলে break না দেওয়া = exam trap!

- C তে **true = যেকোনো non-zero value** (এমনকি -1, 0.001, '0' যার ASCII 48), আর **false = শুধুমাত্র 0** (এবং 0.0, '\0', NULL যেগুলো সব 0 এর variant)। `if(-1)` = true, `if('0')` = true, কিন্তু `if('\0')` = false — এই পার্থক্য পরীক্ষায় আসে।

- **`if(a = 5)`** হলো **assignment**, comparison নয়! a তে 5 assign হয়, expression এর value = 5 (non-zero = true), তাই **সবসময় true**! Fix: `if(5 == a)` লিখুন — ভুলে `=` দিলে `5 = a` → compiler error দেবে (literal এ assign অসম্ভব)।

- **`if(x > 5);`** — if এর পরে **semicolon** দিলে if statement **empty** হয়ে যায় (empty statement execute করে), এবং পরের line **সবসময় execute** হয় — if এর condition যাই হোক না কেন! এটি subtle bug তৈরি করে এবং exam এ trap হিসেবে আসে।

- **braces `{}` ছাড়া** if/else/for/while এর পরে **শুধু প্রথম statement** block এর অংশ হয়, বাকি সব statement **বাইরে** থাকে এবং **সবসময় execute** হয়। `if(x) printf("A"); printf("B");` → "B" সবসময় print হবে, x যাই হোক।

- **switch এ case value অবশ্যই compile-time constant** হতে হবে — variable, function call, বা runtime expression দেওয়া যায় না। `case x:` → Error! `case 5:` → OK। এছাড়া `case 1+2:` ও `case 3:` = duplicate (both 3) → Compilation Error।

- **default** switch এর যেকোনো position এ থাকতে পারে (শুরুতে, মাঝে, শেষে) — কিন্তু **fall-through rule সবসময় apply** হয়। default শুরুতে থাকলে এবং match না হলে default execute হবে, তারপর break না থাকলে নিচের case গুলোতেও fall-through হবে।

- **`printf()` return value** condition এ ব্যবহার করা যায় কারণ এটি print হওয়া character count return করে (non-zero = true)। `if(printf("Hi"))` = true (returns 2)। Exam এ printf return value + if condition combo আসে।

---
---


---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ➡️ Next: [Chapter 02 — Control Flow](02-control-flow.md)
