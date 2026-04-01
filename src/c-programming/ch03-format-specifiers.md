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
