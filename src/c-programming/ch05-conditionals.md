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

<div align="center">


*Loops, Jump Statements, Patterns — program এর flow নিয়ন্ত্রণের চাবিকাঠি*

</div>

---
---
