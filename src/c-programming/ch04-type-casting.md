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
