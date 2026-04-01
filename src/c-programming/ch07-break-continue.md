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
