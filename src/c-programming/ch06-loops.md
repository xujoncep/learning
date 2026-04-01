# Topic 6: Loops (for, while, do-while, nested)

<div align="center">

*"Loop বুঝলে repetition বোঝা যায় — repetition বুঝলে programming বোঝা যায়"*

</div>

---

## 📖 6.1 ধারণা (Concept)

Loop হলো একটি **পুনরাবৃত্তিমূলক কাঠামো** — condition true থাকা পর্যন্ত একই code block বারবার execute করে।

```
Loops in C
├── for       → কতবার চলবে জানা থাকলে (counter-based)
├── while     → condition-based, আগে check (0 বারও চলতে পারে)
├── do-while  → condition-based, পরে check (কমপক্ষে ১বার চলে)
└── nested    → loop এর ভেতরে loop (pattern, matrix)
```

### তিন Loop এর তুলনা

```
┌─────────────┬──────────────────────┬──────────────────┬──────────────────┐
│ Feature     │ for                  │ while            │ do-while         │
├─────────────┼──────────────────────┼──────────────────┼──────────────────┤
│ Check       │ আগে (entry)          │ আগে (entry)      │ পরে (exit)       │
│ Min runs    │ 0 বার                │ 0 বার            │ 1 বার (minimum!) │
│ Use when    │ কতবার জানা থাকলে     │ condition-based   │ কমপক্ষে ১বার     │
│ Syntax      │ for(i;c;u){...}      │ while(c){...}    │ do{...}while(c); │
│ Semicolon   │ শেষে নেই             │ শেষে নেই         │ while(); এ আছে!  │
│ Best for    │ counting, array      │ unknown count     │ menu, validation │
└─────────────┴──────────────────────┴──────────────────┴──────────────────┘
```

---

## 💻 6.2 for Loop — Syntax & Variations

```c
/*
 * for loop syntax:
 * for (initialization; condition; update) {
 *     body;
 * }
 *
 * Execution order:
 * 1. initialization (একবারই)
 * 2. condition check → false হলে EXIT
 * 3. body execute
 * 4. update
 * 5. → Step 2 তে ফিরে যাও
 */

#include <stdio.h>

int main() {
    /* ═══════ Basic for loop ═══════ */
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");  /* Output: 1 2 3 4 5 */

    /* ═══════ Reverse counting ═══════ */
    for (int i = 5; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\n");  /* Output: 5 4 3 2 1 */

    /* ═══════ Step by 2 ═══════ */
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);
    }
    printf("\n");  /* Output: 0 2 4 6 8 10 */

    /* ═══════ Multiple variables (comma) ═══════ */
    for (int i = 0, j = 10; i < j; i++, j--) {
        printf("(%d,%d) ", i, j);
    }
    printf("\n");  /* Output: (0,10) (1,9) (2,8) (3,7) (4,6) */

    /* ═══════ Infinite loop ═══════ */
    /* for (;;) { ... }  → same as while(1) */

    /* ═══════ ⚠️ Empty body (semicolon trap!) ═══════ */
    int sum = 0;
    for (int i = 1; i <= 10; sum += i, i++);
    /* ↑ semicolon = empty body! All work in update part */
    printf("Sum = %d\n", sum);  /* 55 */

    return 0;
}
```

---

## 💻 6.3 while Loop

```c
#include <stdio.h>

int main() {
    /* ═══════ Basic while ═══════ */
    int i = 1;
    while (i <= 5) {
        printf("%d ", i);
        i++;
    }
    printf("\n");  /* Output: 1 2 3 4 5 */

    /* ═══════ Sum of digits ═══════ */
    int num = 12345, sum = 0;
    while (num > 0) {
        sum += num % 10;     /* last digit */
        num /= 10;           /* remove last digit */
    }
    printf("Sum of digits = %d\n", sum);  /* 15 */

    /* ═══════ Reverse a number ═══════ */
    int original = 1234, reversed = 0;
    while (original > 0) {
        reversed = reversed * 10 + original % 10;
        original /= 10;
    }
    printf("Reversed = %d\n", reversed);  /* 4321 */

    return 0;
}
```

---

## 💻 6.4 do-while Loop — কমপক্ষে ১ বার

```c
#include <stdio.h>

int main() {
    /* ═══════ Key difference: condition false থেকেও ১বার চলে ═══════ */

    /* while: condition false → body NEVER runs */
    int i = 10;
    while (i < 5) {
        printf("while: %d\n", i);   /* ❌ NEVER prints */
    }

    /* do-while: body runs FIRST, then condition check */
    i = 10;
    do {
        printf("do-while: %d\n", i); /* ✅ prints ONCE! */
    } while (i < 5);
    /* Output: do-while: 10 */

    /* ═══════ Best use case: Menu system ═══════ */
    int choice;
    do {
        printf("\n1. Add\n2. Delete\n3. Exit\nChoice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: printf("Added!\n"); break;
            case 2: printf("Deleted!\n"); break;
            case 3: printf("Bye!\n"); break;
            default: printf("Invalid!\n");
        }
    } while (choice != 3);

    return 0;
}
```

> **do-while rule:** body **আগে** execute হয়, condition **পরে** check হয় — তাই condition false হলেও **কমপক্ষে ১ বার** চলবেই। `while()` এর পরে **semicolon (`;`) বাধ্যতামূলক!**

---

## 💻 6.5 Nested Loops

```c
#include <stdio.h>

int main() {
    /* ═══════ Multiplication Table ═══════ */
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 10; j++) {
            printf("%4d", i * j);
        }
        printf("\n");
    }

    /* ═══════ Total iterations = outer × inner ═══════ */
    int count = 0;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 4; j++)
            count++;
    printf("Total iterations: %d\n", count);  /* 3 × 4 = 12 */

    return 0;
}
```

---

## ❓ 6.6 MCQ Problems

---

**MCQ 1:** নিচের কোডের output কী?
```c
int i;
for (i = 0; i < 5; i++);
printf("%d", i);
```

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 0 1 2 3 4 | |
| (d) 0 | |

> **ব্যাখ্যা:** Semicolon = **empty body!** Loop 5 বার চলে (i: 0→4), i=5 হলে condition false → exit। printf i=**5** print করে। ⚠️ `for(int i=...)` হলে scope error হতো — এখানে `int i;` আগে declare।

---

**MCQ 2:** নিচের কোডের output কী?
```c
int i = 0;
while (i < 5)
    printf("%d ", i);
    i++;
```

| Option | Answer |
|--------|--------|
| (a) 0 1 2 3 4 | |
| (b) **0 0 0 0 ... (infinite)** | ✅ |
| (c) 1 2 3 4 5 | |
| (d) Error | |

> **ব্যাখ্যা:** Braces নেই! শুধু `printf` while body তে। `i++` while এর **বাইরে** — কখনো execute হয় না → i সবসময় 0 → **infinite loop!**

---

**MCQ 3:** নিচের কোডের output কী?
```c
int i = 10;
do {
    printf("%d ", i);
} while (i < 5);
```

| Option | Answer |
|--------|--------|
| (a) Nothing | |
| (b) **10** | ✅ |
| (c) 10 9 8 7 6 5 | |
| (d) Infinite | |

> **ব্যাখ্যা:** do-while: body **আগে** execute → 10 print → condition 10<5 **false** → exit। কমপক্ষে **১ বার** চলে!

---

**MCQ 4:** নিচের কোডে কতবার "Hello" print হবে?
```c
int i = 0;
while (i++ < 5)
    printf("Hello\n");
```

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 6 | |
| (d) Infinite | |

> **ব্যাখ্যা:** **Post-increment:** আগে compare, পরে বাড়ে। i=0: 0<5✅ → i=1: 1<5✅ → ... → i=4: 4<5✅ → i=5: 5<5❌ → exit। Total: **5 বার**।

---

**MCQ 5:** নিচের কোডে কতবার "Hello" print হবে?
```c
int i = 0;
while (++i < 5)
    printf("Hello\n");
```

| Option | Answer |
|--------|--------|
| (a) **4** | ✅ |
| (b) 5 | |
| (c) 6 | |
| (d) 3 | |

> **ব্যাখ্যা:** **Pre-increment:** আগে বাড়ে, পরে compare। i=1: 1<5✅ → i=2: 2<5✅ → i=3: 3<5✅ → i=4: 4<5✅ → i=5: 5<5❌ → exit। Total: **4 বার**। (Post vs Pre = 1 difference!)

---

**MCQ 6:** `for(;;)` কী করে?

| Option | Answer |
|--------|--------|
| (a) Compilation error | |
| (b) Runs once | |
| (c) **Infinite loop** | ✅ |
| (d) Does nothing | |

> **ব্যাখ্যা:** সব অংশ empty → condition **always true** → **infinite loop**। Same as `while(1)`।

---

**MCQ 7:** নিচের কোডের output কী?
```c
for (int i = 0; i < 5, i < 3; i++)
    printf("%d ", i);
```

| Option | Answer |
|--------|--------|
| (a) 0 1 2 3 4 | |
| (b) **0 1 2** | ✅ |
| (c) 0 1 2 3 | |
| (d) Error | |

> **ব্যাখ্যা:** **Comma in condition:** শেষ expression `i < 3` = actual condition! (Comma operator returns last value)

---

**MCQ 8:** নিচের কোডের output কী?
```c
int i = 0, sum = 0;
for (; i < 5; sum += i++);
printf("sum=%d i=%d", sum, i);
```

| Option | Answer |
|--------|--------|
| (a) **sum=10 i=5** | ✅ |
| (b) sum=15 i=5 | |
| (c) sum=10 i=6 | |
| (d) sum=15 i=6 | |

> **ব্যাখ্যা:** Empty body (semicolon)। `sum += i++`: i=0→sum=0, i=1→sum=1, i=2→sum=3, i=3→sum=6, i=4→sum=**10**। i=5 → 5<5 false → exit। sum=0+1+2+3+4=**10**, i=**5**

---

## ⚠️ 6.7 Tricky Parts

| # | Trap | বিবরণ | Fix |
|---|------|-------|-----|
| 1 | **Semicolon after for/while** | `for(i=0;i<5;i++);` → **empty body!** | Semicolon remove করুন |
| 2 | **Missing braces** | `while(i<5) printf(); i++;` → i++ **বাইরে** → infinite | `{}` braces দিন |
| 3 | **Off-by-one** | `<` vs `<=` → 1 iteration পার্থক্য | Count carefully |
| 4 | **do-while semicolon** | `do{...}while(cond)` → **`;` missing** → Error! | `while(cond);` |
| 5 | **Comma in condition** | `for(;i<5, i<3;)` → **শেষেরটা** = real condition | Comma = last value |
| 6 | **C99 scope** | `for(int i=0;...)` → i **loop বাইরে** accessible নয় | Declare before loop |
| 7 | **Unsigned countdown** | `for(unsigned i=5; i>=0; i--)` → **infinite!** unsigned never <0 | signed ব্যবহার করুন |
| 8 | **Post vs Pre in condition** | `while(i++<5)` = 5 বার, `while(++i<5)` = **4 বার** | 1 iteration difference |

---

## 📝 6.8 Summary

- **for loop** কতবার চলবে জানা থাকলে best — initialization, condition, update **একই লাইনে** থাকায় পড়তে সুবিধা। `for(int i=0; i<n; i++)` সবচেয়ে common pattern।

- **while loop** condition-based repetition এ best — কতবার চলবে জানা না থাকলে (user input, file read, digit extraction)। Condition **আগে** check হয়, তাই **0 বারও** চলতে পারে।

- **do-while loop** এর unique feature: body **আগে** execute হয়, condition **পরে** check হয় — ফলে condition false হলেও **কমপক্ষে ১ বার** চলে। Menu system, input validation এ best। `while()` এর পরে **semicolon বাধ্যতামূলক!**

- **Semicolon trap:** `for(...);` বা `while(...);` → loop body **empty** হয়ে যায়। Loop চলে কিন্তু কিছুই করে না, পরের line **loop এর বাইরে** execute হয়। সবচেয়ে common beginner bug।

- **Braces ছাড়া** loop body তে শুধু **প্রথম statement** থাকে। `while(x<5) a(); b();` → শুধু `a()` loop এ, `b()` বাইরে! সবসময় **`{}` ব্যবহার** করুন।

- **Post-increment vs Pre-increment** condition এ: `while(i++<5)` = **5 বার** (আগে compare, পরে বাড়ে), `while(++i<5)` = **4 বার** (আগে বাড়ে, পরে compare)। **1 iteration** পার্থক্য — exam এ #1 topic!

- **`for(;;)`** ও **`while(1)`** দুটোই **infinite loop** — break দিয়ে বের হতে হয়। `for(;;)` এ condition empty = always true।

- **Unsigned loop** নিচে countdown করলে `i >= 0` **সবসময় true** (unsigned never negative) → **infinite loop!** Fix: signed variable ব্যবহার করুন।

- **Nested loop** এ total iterations = **outer × inner**। 3×4 = 12 iterations। Pattern printing, matrix traversal — সব nested loop এ হয়।

---
---
