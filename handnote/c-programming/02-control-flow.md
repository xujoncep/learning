# Chapter 02 — Control Flow — C Programming 💻

> Loops, break/continue/goto, pattern printing, function basics, recursion।

---
# LEVEL 2: CONTROL FLOW (নিয়ন্ত্রণ প্রবাহ) — Part 2

*Loops, Jump Statements, Patterns — program এর flow নিয়ন্ত্রণের চাবিকাঠি*


---
---

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

# Topic 7: Break, Continue & Goto

<div align="center">

*"Break থামায়, Continue লাফায়, Goto উড়ে যায় — তিনটি Jump Statement"*

</div>

---

## 📖 7.1 ধারণা (Concept)

এই তিনটি হলো **jump statement** — program এর normal sequential flow ভেঙে অন্যত্র লাফ দেয়।

```
Jump Statements
├── break     → loop/switch থেকে সম্পূর্ণ বের (EXIT)
├── continue  → বর্তমান iteration skip, পরের iteration (SKIP)
└── goto      → যেকোনো label এ সরাসরি লাফ (JUMP) — ⚠️ avoid!
```

### Visual Comparison

```
break:                           continue:
for (i=0; i<10; i++) {           for (i=0; i<10; i++) {
    if (i==5) break; ←EXIT          if (i==5) continue; ←SKIP
    print(i);                        print(i);
}                                }
Output: 0 1 2 3 4               Output: 0 1 2 3 4 6 7 8 9
        ↑ loop শেষ                       ↑ শুধু 5 বাদ
```

---

## 💻 7.2 break — Loop/Switch Exit

```c
#include <stdio.h>

int main() {
    /* ═══════ break in loop ═══════ */
    for (int i = 1; i <= 10; i++) {
        if (i == 6) break;      /* i=6 এ loop EXIT */
        printf("%d ", i);
    }
    printf("\n");  /* Output: 1 2 3 4 5 */

    /* ═══════ break in nested loop — শুধু NEAREST loop ভাঙে! ═══════ */
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 5; j++) {
            if (j == 3) break;   /* inner loop ভাঙে, outer নয়! */
            printf("(%d,%d) ", i, j);
        }
        printf("| ");
    }
    printf("\n");
    /* Output: (1,1) (1,2) | (2,1) (2,2) | (3,1) (3,2) | */

    return 0;
}
```

> **Critical Rule:** break শুধু **nearest enclosing** loop/switch ভাঙে — **outer loop** চলতে থাকে!

---

## 💻 7.3 continue — Skip Current Iteration

```c
#include <stdio.h>

int main() {
    /* ═══════ continue in for — UPDATE (i++) STILL RUNS! ═══════ */
    for (int i = 0; i < 8; i++) {
        if (i % 3 == 0) continue;  /* 3 এর গুণিতক skip */
        printf("%d ", i);
    }
    printf("\n");  /* Output: 1 2 4 5 7 */

    /* ═══════ ⚠️ continue in while — INFINITE LOOP RISK! ═══════ */
    int i = 0;
    while (i < 5) {
        if (i == 3) {
            i++;           /* ← এটা না দিলে i=3 এ INFINITE LOOP! */
            continue;
        }
        printf("%d ", i);
        i++;
    }
    printf("\n");  /* Output: 0 1 2 4 */

    return 0;
}
```

```
continue → কোথায় যায়?
━━━━━━━━━━━━━━━━━━━━━━
for loop    →  UPDATE (i++) এ যায়  →  ✅ Safe (i++ always runs)
while loop  →  CONDITION check এ  →  ⚠️ manual i++ skip হতে পারে!
do-while    →  CONDITION check এ  →  ⚠️ same risk as while
```

> **Danger:** `for` loop এ continue **safe** (update always runs), কিন্তু `while` loop এ continue দিলে **increment skip** হতে পারে → **infinite loop!**

---

## 💻 7.4 goto — Direct Jump (Avoid!)

```c
#include <stdio.h>

int main() {
    /* ═══════ goto — nested loop থেকে বের হওয়া (useful case) ═══════ */
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            for (int k = 0; k < 5; k++) {
                if (i == 2 && j == 3 && k == 1) {
                    printf("Found at (%d,%d,%d)!\n", i, j, k);
                    goto done;  /* সব loop থেকে একবারে EXIT! */
                }
            }
        }
    }
done:
    printf("Search complete.\n");

    return 0;
}
```

```
goto কখন গ্রহণযোগ্য:
━━━━━━━━━━━━━━━━━━━━━
✅ Deeply nested loop (3+) থেকে exit
✅ Error handling cleanup (C তে try-catch নেই)
❌ বাকি সব ক্ষেত্রে — for/while/break/continue ব্যবহার করুন

goto Rules:
• শুধু SAME function এর মধ্যে কাজ করে
• label scope = পুরো function
• variable declaration skip করলে UB!
```

---

## 💻 7.5 switch + loop — break/continue Combo

```c
#include <stdio.h>

int main() {
    for (int i = 0; i < 6; i++) {
        switch (i) {
            case 3:
                continue;    /* ⚠️ LOOP এর continue! (switch নয়) */
            case 5:
                break;       /* switch থেকে break */
        }
        printf("%d ", i);
    }
    printf("\n");
    /* i=0: no match, print 0 */
    /* i=1: no match, print 1 */
    /* i=2: no match, print 2 */
    /* i=3: continue → printf SKIP → next iteration */
    /* i=4: no match, print 4 */
    /* i=5: break (switch) → printf executes! print 5 */
    /* Output: 0 1 2 4 5 */

    return 0;
}
```

> **Rule:** switch ভেতরে `break` → **switch** exit। `continue` → enclosing **loop** এর next iteration!

---

## ❓ 7.6 MCQ Problems

---

**MCQ 1:** নিচের কোডের output কী?
```c
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    if (i == 3) continue;
    printf("%d ", i);
}
```

| Option | Answer |
|--------|--------|
| (a) **0 1 2 4** | ✅ |
| (b) 0 1 2 3 4 | |
| (c) 0 1 2 | |
| (d) 0 1 2 4 5 | |

> i=3 → continue (skip) → i=4 → print → i=5 → **break** → exit

---

**MCQ 2:** নিচের কোডের output কী?
```c
int i = 0;
while (i < 5) {
    if (i == 3) continue;
    printf("%d ", i);
    i++;
}
```

| Option | Answer |
|--------|--------|
| (a) 0 1 2 4 | |
| (b) 0 1 2 3 4 | |
| (c) **0 1 2 (infinite loop)** | ✅ |
| (d) Error | |

> **ব্যাখ্যা:** i=3 → continue → **i++ skip!** → i সবসময় 3 → **infinite loop!**

---

**MCQ 3:** নিচের কোডে কতবার "Hello" print হবে?
```c
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;
        printf("Hello\n");
    }
}
```

| Option | Answer |
|--------|--------|
| (a) 9 | |
| (b) 6 | |
| (c) **3** | ✅ |
| (d) 1 | |

> **ব্যাখ্যা:** Inner: j=0→print, j=1→break। প্রতিবার 1 print। Outer 3 বার → **3** total

---

**MCQ 4:** `goto` কোথায় jump করতে পারে?

| Option | Answer |
|--------|--------|
| (a) যেকোনো function এ | |
| (b) **শুধু same function এর মধ্যে** | ✅ |
| (c) শুধু loop এর মধ্যে | |
| (d) শুধু নিচের দিকে | |

---

## 📝 7.7 Summary

- **break** loop বা switch থেকে **সম্পূর্ণ বের** করে দেয়; শুধু **nearest enclosing** loop/switch affect করে — outer loop চলতে থাকে। Multiple nested loop থেকে exit করতে **goto, flag variable, বা function return** ব্যবহার করতে হয়।

- **continue** বর্তমান iteration এর **বাকি code skip** করে **পরের iteration** এ চলে যায় — loop থেকে বের হয় না। `for` loop এ continue **safe** (update part always runs), কিন্তু `while` loop এ **infinite loop risk** আছে কারণ manual increment skip হতে পারে!

- **goto** সরাসরি যেকোনো **label** এ unconditional jump করে, কিন্তু শুধু **same function** এর মধ্যে। **99% ক্ষেত্রে avoid** করুন — শুধু **deeply nested loop exit** ও **error handling cleanup** এ acceptable।

- switch ভেতরে **break** → switch exit করে; **continue** → enclosing **loop** এর পরের iteration এ যায়। switch এর ভেতর continue = loop continue, NOT switch continue — এটি exam trap!

---
---

# Topic 8: Pattern Printing

<div align="center">

*"Pattern = nested loop + formula — row ও column এর সম্পর্ক বুঝতে পারলেই হলো"*

</div>

---

## 📖 8.1 ধারণা (Concept)

Pattern printing = **nested loop** এর সবচেয়ে practical application। প্রতিটি pattern বুঝতে হলে **row (i)** এর সাথে **space ও star count** এর formula বের করতে হয়।

```
Pattern বোঝার Master Formula:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Outer loop → ROW control (কতটি লাইন)
Inner loop(s) → COLUMN control (space + star)

Pyramid Example (n=5):
Row │ Spaces │ Stars   │ Formula
────┼────────┼─────────┼──────────
 1  │   4    │   1     │ spaces = n-i
 2  │   3    │   3     │ stars  = 2*i-1
 3  │   2    │   5     │
 4  │   1    │   7     │
 5  │   0    │   9     │
```

---

## 💻 8.2 Essential Patterns

### Pattern 1: Left-Aligned Triangle

```
*
* *
* * *
* * * *
* * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++)   /* stars = i */
        printf("* ");
    printf("\n");
}
```

### Pattern 2: Right-Aligned Triangle

```
        *
      * *
    * * *
  * * * *
* * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)  /* spaces = n-i */
        printf("  ");
    for (int j = 1; j <= i; j++)      /* stars = i */
        printf("* ");
    printf("\n");
}
```

### Pattern 3: Pyramid

```
        *
      * * *
    * * * * *
  * * * * * * *
* * * * * * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)       /* spaces = n-i */
        printf("  ");
    for (int j = 1; j <= 2 * i - 1; j++)   /* stars = 2*i-1 */
        printf("* ");
    printf("\n");
}
```

### Pattern 4: Number Pyramid

```
    1
   1 2 1
  1 2 3 2 1
 1 2 3 4 3 2 1
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)
        printf(" ");
    for (int j = 1; j <= i; j++)       /* increasing: 1 to i */
        printf("%d ", j);
    for (int j = i - 1; j >= 1; j--)   /* decreasing: i-1 to 1 */
        printf("%d ", j);
    printf("\n");
}
```

### Pattern 5: Diamond

```c
/* Upper half (1 to n) */
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++) printf("  ");
    for (int j = 1; j <= 2*i-1; j++) printf("* ");
    printf("\n");
}
/* Lower half (n-1 to 1) — middle row একবারই! */
for (int i = n-1; i >= 1; i--) {
    for (int j = 1; j <= n - i; j++) printf("  ");
    for (int j = 1; j <= 2*i-1; j++) printf("* ");
    printf("\n");
}
```

### Pattern 6: Pascal's Triangle

```
         1
        1 1
       1 2 1
      1 3 3 1
     1 4 6 4 1
```

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++)
        printf("  ");
    int val = 1;
    for (int j = 0; j <= i; j++) {
        printf("%3d ", val);
        val = val * (i - j) / (j + 1);   /* nCr formula */
    }
    printf("\n");
}
```

---

## 📖 8.3 Master Formula Sheet

```
┌──────────────────────────┬──────────────┬──────────────┐
│ Pattern                  │ Spaces       │ Stars/Nums   │
├──────────────────────────┼──────────────┼──────────────┤
│ Left triangle            │ 0            │ i            │
│ Right triangle           │ n - i        │ i            │
│ Inverted left            │ 0            │ n - i + 1    │
│ Inverted right           │ i - 1        │ n - i + 1    │
│ Pyramid                  │ n - i        │ 2*i - 1      │
│ Inverted pyramid         │ i - 1        │ 2*(n-i) + 1  │
│ Diamond                  │ |n - i|      │ 2*min - 1    │
│ Hollow: star at edges    │ same         │ first/last   │
└──────────────────────────┴──────────────┴──────────────┘

Diamond total rows = 2n - 1
Pyramid stars always ODD (1, 3, 5, 7...)
```

---

## 📝 8.4 Summary

- **Outer loop = rows**, **Inner loop(s) = columns** (spaces + stars/numbers)
- **Pyramid:** spaces = `n-i`, stars = **`2*i-1`** (সবসময় odd সংখ্যা)
- **Diamond** = pyramid (1 to n) + inverted pyramid (**n-1** to 1) — middle row **একবারই**
- **Hollow pattern:** star শুধু **edge** এ (first/last row/column), বাকি space
- **Number pattern:** `j` print = sequential, `i` print = same number per row
- Pattern solve কৌশল: **কাগজে row-by-row count** → formula → code

---
---

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

# Topic 10: Recursion

<div align="center">

*"Recursion বোঝার জন্য আগে Recursion বুঝতে হবে — এটাই Recursion!"*

</div>

---

## 📖 10.1 ধারণা (Concept)

Recursion = function **নিজেই নিজেকে call** করে। প্রতিটি recursive function এ **দুটি অংশ** বাধ্যতামূলক:

```
Recursion Structure:
━━━━━━━━━━━━━━━━━━━
1. Base Case     → থামার শর্ত (ছাড়া infinite → Stack Overflow!)
2. Recursive Case → নিজেকে ছোট সমস্যা দিয়ে call

void recursive(params) {
    if (base_condition)         ← BASE: থামো!
        return;
    recursive(smaller_params);  ← RECURSIVE: ছোট করে call
}
```

### Factorial Visualization

```
factorial(5)
├── 5 * factorial(4)
│       ├── 4 * factorial(3)
│       │       ├── 3 * factorial(2)
│       │       │       ├── 2 * factorial(1)
│       │       │       │       └── return 1  ← BASE!
│       │       │       └── return 2*1 = 2
│       │       └── return 3*2 = 6
│       └── return 4*6 = 24
└── return 5*24 = 120
```

---

## 💻 10.2 Classic Recursive Functions

### Factorial

```c
int factorial(int n) {
    if (n <= 1) return 1;           /* Base case */
    return n * factorial(n - 1);    /* Recursive case */
}
/* factorial(5) = 5 × 4 × 3 × 2 × 1 = 120 */
```

### Fibonacci

```c
int fib(int n) {
    if (n <= 1) return n;                   /* Base: fib(0)=0, fib(1)=1 */
    return fib(n - 1) + fib(n - 2);        /* Two recursive calls! */
}
/* ⚠️ O(2^n) — extremely slow! Use memoization or iterative */
```

### GCD (Euclidean)

```c
int gcd(int a, int b) {
    if (b == 0) return a;           /* Base case */
    return gcd(b, a % b);          /* Recursive */
}
/* gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) → 6 */
```

### Power (Fast — O(log n))

```c
long long power(int base, int exp) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    else return base * half * half;
}
```

---

## 💻 10.3 Head vs Tail Recursion — Output Prediction Key!

```c
#include <stdio.h>

/* HEAD: call first, work after (ascending output) */
void head(int n) {
    if (n == 0) return;
    head(n - 1);          /* ← call FIRST */
    printf("%d ", n);      /* ← work AFTER return */
}

/* TAIL: work first, call after (descending output) */
void tail(int n) {
    if (n == 0) return;
    printf("%d ", n);      /* ← work FIRST */
    tail(n - 1);          /* ← call AFTER */
}

/* BOTH: work before AND after call (mirror output!) */
void both(int n) {
    if (n == 0) return;
    printf("%d ", n);      /* ← winding */
    both(n - 1);
    printf("%d ", n);      /* ← unwinding */
}

int main() {
    printf("Head: "); head(4); printf("\n");
    /* Output: 1 2 3 4 (ascending — unwinding prints) */

    printf("Tail: "); tail(4); printf("\n");
    /* Output: 4 3 2 1 (descending — winding prints) */

    printf("Both: "); both(3); printf("\n");
    /* Output: 3 2 1 1 2 3 (mirror!) */

    return 0;
}
```

> **Exam Pattern:** print **before** call = descending, print **after** call = ascending, print **both sides** = mirror!

---

## 💻 10.4 Tower of Hanoi

```c
#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n - 1, from, aux, to);          /* n-1 disks: from → aux */
    printf("Disk %d: %c → %c\n", n, from, to); /* nth disk: from → to */
    hanoi(n - 1, aux, to, from);          /* n-1 disks: aux → to */
}

int main() {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}
/* Total moves = 2^n - 1 = 7 for n=3 */
```

> **Formula:** n disks → **2ⁿ - 1** moves। n=3 → 7, n=4 → 15, n=10 → 1023

---

## ❓ 10.5 MCQ Problems

---

**MCQ 1:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n == 0) return;
    fun(n - 1);
    printf("%d ", n);
}
int main() { fun(4); }
```

| Option | Answer |
|--------|--------|
| (a) 4 3 2 1 | |
| (b) **1 2 3 4** | ✅ |
| (c) 4 3 2 1 0 | |
| (d) 0 1 2 3 4 | |

> **Head recursion:** call আগে, print পরে (unwinding) → **ascending**

---

**MCQ 2:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n == 0) return;
    printf("%d ", n);
    fun(n - 1);
    printf("%d ", n);
}
int main() { fun(3); }
```

| Option | Answer |
|--------|--------|
| (a) **3 2 1 1 2 3** | ✅ |
| (b) 1 2 3 3 2 1 | |
| (c) 3 2 1 | |
| (d) 3 2 1 3 2 1 | |

> Print **both sides** → winding: 3 2 1, unwinding: 1 2 3 → **mirror!**

---

**MCQ 3:** Tower of Hanoi তে 4 disks → কত moves?

| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) **15** | ✅ |
| (c) 16 | |
| (d) 4 | |

> Moves = 2ⁿ - 1 = 2⁴ - 1 = **15**

---

**MCQ 4:** Base case ছাড়া recursion করলে কী হয়?

| Option | Answer |
|--------|--------|
| (a) 0 return | |
| (b) **Stack Overflow** | ✅ |
| (c) Compilation Error | |
| (d) Infinite loop (no crash) | |

> Stack memory শেষ → **crash** (Segmentation Fault)!

---

**MCQ 5:** নিচের কোডের output কী?
```c
int fun(int n) {
    if (n <= 1) return n;
    return fun(n-1) + fun(n-2);
}
printf("%d", fun(6));
```

| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **8** | ✅ |
| (c) 13 | |
| (d) 5 | |

> **Fibonacci!** 0,1,1,2,3,5,**8** (index 0-6)

---

**MCQ 6:** নিচের কোডের output কী?
```c
int fun(int n) {
    if (n == 0) return 0;
    return fun(n/2) + 1;
}
printf("%d", fun(16));
```

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 16 | |
| (d) 8 | |

> fun(16)→fun(8)+1→fun(4)+1→fun(2)+1→fun(1)+1→fun(0)+1=0+1=1 → 1+1+1+1+1 = **5** (log₂(16)+1)

---

**MCQ 7:** নিচের কোডের output কী?
```c
void fun(int n) {
    if (n > 0) {
        fun(n - 1);
        printf("%d ", n);
        fun(n - 1);
    }
}
int main() { fun(3); }
```

| Option | Answer |
|--------|--------|
| (a) **1 2 1 3 1 2 1** | ✅ |
| (b) 3 2 1 1 2 1 | |
| (c) 1 2 3 2 1 | |
| (d) 1 1 2 1 1 2 3 | |

> Two recursive calls → tree-like expansion → **1 2 1 3 1 2 1**

---

## 💻 10.6 Recursion vs Iteration

```
┌──────────────────┬──────────────────┬──────────────────┐
│ Feature          │ Recursion        │ Iteration        │
├──────────────────┼──────────────────┼──────────────────┤
│ Code clarity     │ Clean, elegant   │ Longer but clear │
│ Memory           │ Stack grows!     │ Constant         │
│ Speed            │ Slower (overhead)│ Faster           │
│ Stack Overflow   │ Possible!        │ No risk          │
│ Best for         │ Tree, divide &   │ Simple counting  │
│                  │ conquer          │ loops            │
└──────────────────┴──────────────────┴──────────────────┘

Complexity:
  fun(n-1)              → O(n) time, O(n) space
  fun(n/2)              → O(log n) time, O(log n) space
  fun(n-1) + fun(n-1)   → O(2^n) time! ⚠️ (Fibonacci naive)
  fun(n-1) + fun(n-2)   → O(2^n) time! ⚠️
```

---

## 📝 10.7 Summary

- Recursion = function **নিজেকে call** করে। দুটি অংশ **বাধ্যতামূলক**: **base case** (থামার শর্ত) ও **recursive case** (ছোট সমস্যায় call)। Base case ছাড়া = **infinite recursion** → **Stack Overflow** (crash!)।

- **Head recursion** (call আগে, print পরে) → output **ascending** (1 2 3 4)। **Tail recursion** (print আগে, call পরে) → output **descending** (4 3 2 1)। **Both sides print** → output **mirror** (3 2 1 1 2 3)। এই pattern exam এ সবচেয়ে বেশি আসে — trace করে output predict করতে হয়।

- **Fibonacci naive recursion** = **O(2ⁿ)** — extremely slow! fib(40) seconds লাগে। Fix: **memoization** (cache results) → O(n), বা **iterative** approach। Exam এ complexity জিজ্ঞেস করা হয়।

- **Tower of Hanoi** moves = **2ⁿ - 1**। n=3 → 7, n=4 → 15, n=10 → 1023। Algorithm: (1) n-1 disks move to auxiliary, (2) nth disk move to destination, (3) n-1 disks move from auxiliary to destination।

- **Stack depth limit** ~ 10,000 calls (system dependent)। এর বেশি → **Stack Overflow**। বড় input এ **iteration ব্যবহার** করুন। সব recursion কে iteration এ convert করা **সম্ভব**, কিন্তু Tree/Backtracking এ recursion **natural**।

- **Multiple recursive calls** = **exponential** complexity: `fun(n-1) + fun(n-1)` → O(2ⁿ)। **Single call** = linear: `fun(n-1)` → O(n)। **Halving call** = logarithmic: `fun(n/2)` → O(log n)। Exam এ complexity question আসে।

- Recursion trace করার কৌশল: **call stack** এ প্রতিটি call push করুন, base case এ pop শুরু করুন। **winding** (call going down) ও **unwinding** (returning back) দুটি phase — কোথায় print আছে সেটাই output determine করে।

---
---


---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 01 — Fundamentals](01-fundamentals.md)
- ➡️ Next: [Chapter 03 — Functions — Deep Dive](03-functions-deep.md)
