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
