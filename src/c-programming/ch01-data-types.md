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
