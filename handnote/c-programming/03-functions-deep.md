# Chapter 03 — Functions — Deep Dive — C Programming 💻

> Storage classes, scope, lifetime — function-এর internals।

---
# LEVEL 3: FUNCTIONS — Part 2

*Storage Classes, Scope — variable কোথায় থাকে, কতক্ষণ বাঁচে*


---
---

# Topic 11: Storage Classes (auto, static, extern, register)

<div align="center">

*"Storage class বলে দেয় variable কোথায় থাকবে, কতক্ষণ বাঁচবে, আর default value কত হবে"*

</div>

---

## 📖 11.1 ধারণা (Concept)

Storage class একটি variable এর **৪টি বৈশিষ্ট্য** নির্ধারণ করে:

```
┌──────────────┬───────────┬────────────┬──────────┬───────────┐
│Storage Class │ Lifetime  │ Scope      │ Default  │ Storage   │
├──────────────┼───────────┼────────────┼──────────┼───────────┤
│ auto         │ Block     │ Block/Local│ Garbage  │ Stack     │
│ static       │ Program   │ Block/File │ 0        │ Data seg  │
│ extern       │ Program   │ Global     │ 0        │ Data seg  │
│ register     │ Block     │ Block/Local│ Garbage  │ CPU Reg   │
└──────────────┴───────────┴────────────┴──────────┴───────────┘
```

---

## 💻 11.2 auto vs static — Key Difference

```c
#include <stdio.h>

void counter_auto() {
    int count = 0;        /* auto: প্রতিবার re-initialize! */
    count++;
    printf("auto: %d\n", count);
}

void counter_static() {
    static int count = 0; /* static: একবারই init, value persist! */
    count++;
    printf("static: %d\n", count);
}

int main() {
    counter_auto();    /* auto: 1 */
    counter_auto();    /* auto: 1 ← আবার 0 থেকে! */
    counter_auto();    /* auto: 1 */

    counter_static();  /* static: 1 */
    counter_static();  /* static: 2 ← value ধরে রেখেছে! */
    counter_static();  /* static: 3 */

    return 0;
}
```

---

## 💻 11.3 extern — Cross-File Access

```c
/* ═══ globals.c (Definition) ═══ */
int globalCount = 100;           /* actual memory allocation */

/* ═══ main.c (Declaration) ═══ */
extern int globalCount;          /* ⚠️ memory allocate করে না, refer করে */

int main() {
    printf("%d\n", globalCount); /* 100 — অন্য file এর variable! */
    return 0;
}
```

> **extern rule:** `extern int x;` = declaration only (no memory)। `int x = 10;` = definition (memory allocated)।

---

## 💻 11.4 register — CPU Register Request

```c
register int i;      /* CPU register এ রাখার অনুরোধ */
/* ⚠️ &i → ERROR! register variable এর address নেওয়া যায় না! */
/* Modern compilers নিজেই optimize করে — register keyword প্রায় obsolete */
```

---

## 💻 11.5 static Global & static Function — File Private

```c
/* ═══ utils.c ═══ */
static int secretVar = 42;       /* ⚠️ শুধু এই FILE এ accessible! */
static void helperFunc() { }     /* ⚠️ শুধু এই FILE থেকে callable! */

/* ═══ main.c ═══ */
/* extern int secretVar;  → ❌ Linker Error! static = no external linkage */
```

```
static এর দুটি ভিন্ন অর্থ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. static LOCAL variable  → value call-to-call persist করে
2. static GLOBAL var/func → file-private (internal linkage)
```

---

## ❓ 11.6 MCQ Problems

---

**MCQ 1:** নিচের কোডের output?
```c
void fun() { static int x = 0; x++; printf("%d ", x); }
int main() { fun(); fun(); fun(); }
```

| Option | Answer |
|--------|--------|
| (a) 1 1 1 | |
| (b) **1 2 3** | ✅ |
| (c) 0 1 2 | |
| (d) 3 3 3 | |

> **static:** একবারই init, value persist → 1, 2, 3

---

**MCQ 2:** Uninitialized local variable এর default value?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) NULL | |
| (c) **Garbage** | ✅ |
| (d) -1 | |

> **auto/local = garbage!** static/global = 0

---

**MCQ 3:** `register int x; printf("%p", &x);` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) Address print | |
| (b) 0 | |
| (c) **Compilation Error** | ✅ |
| (d) Runtime Error | |

> register variable এর **address নেওয়া যায় না!**

---

**MCQ 4:** `static` global variable কোথা থেকে accessible?

| Option | Answer |
|--------|--------|
| (a) পুরো program | |
| (b) **শুধু যে file এ declare হয়েছে** | ✅ |
| (c) শুধু main | |
| (d) শুধু define হওয়া function | |

---

**MCQ 5:** নিচের কোডের output?
```c
void fun() { static int a = 5; printf("%d ", a--); }
int main() { fun(); fun(); fun(); }
```

| Option | Answer |
|--------|--------|
| (a) 5 5 5 | |
| (b) **5 4 3** | ✅ |
| (c) 4 3 2 | |
| (d) 5 4 4 | |

> Post-decrement: print **আগে**, কমাও **পরে**। Call 1: print 5(a→4), Call 2: print 4(a→3), Call 3: print 3

---

## 📝 11.7 Summary

- **auto** (default local): stack এ, block শেষে destroy, **default = garbage**। প্রতি function call এ নতুন করে create ও initialize হয় — আগের value মনে রাখে না।

- **static local:** scope narrow (function) কিন্তু lifetime = **program duration**। **একবারই initialize** হয়, পরের call এ **value persist** করে। Counter, ID generator এ best। **default = 0**।

- **static global/function:** **file-private** (internal linkage) — `extern` দিয়েও অন্য file থেকে access **করা যায় না**। Encapsulation এর জন্য useful।

- **extern:** অন্যত্র define করা variable **refer** করে, memory allocate করে না। `extern int x;` = declaration, `int x = 10;` = definition।

- **register:** CPU register এ রাখার **request** (guarantee নয়)। **`&` operator illegal!** Modern compiler নিজেই optimize করে — practically obsolete।

- **Default values:** auto/register = **garbage**, static/extern/global = **0** (int→0, float→0.0, char→'\0', pointer→NULL)।

---
---

# Topic 12: Scope & Lifetime of Variables

<div align="center">

*"Scope = কোথা থেকে দেখা যায়, Lifetime = কতক্ষণ বেঁচে থাকে — দুটো আলাদা concept!"*

</div>

---

## 📖 12.1 ধারণা (Concept)

```
Scope    = variable কোথা থেকে ACCESS করা যায়  (compile time)
Lifetime = variable কতক্ষণ memory তে EXIST করে (runtime)

⚡ Scope ≠ Lifetime!
   static int x; → scope = function only, lifetime = entire program!
```

```
Scope Types:
━━━━━━━━━━━━
1. Block scope    → { } braces এর মধ্যে
2. Function scope → শুধু goto labels (variable নয়!)
3. File scope     → function এর বাইরে declare (same file)
4. Program scope  → extern linkage (any file)
```

---

## 💻 12.2 Variable Shadowing — পরীক্ষায় আসে!

```c
#include <stdio.h>

int x = 100;         /* global */

int main() {
    int x = 200;     /* shadows global! */
    printf("%d\n", x);   /* 200 */

    {
        int x = 300; /* shadows main's x! */
        printf("%d\n", x);   /* 300 */
    }

    printf("%d\n", x);   /* 200 (inner x destroyed, main's x back) */
    return 0;
}
```

> **Shadowing rule:** inner scope এ same name declare → outer variable **ঢেকে যায়**। Block শেষে inner variable destroy → outer **ফিরে আসে**।

---

## 💻 12.3 Dangling Pointer — Lifetime Trap

```c
int* dangerous() {
    int x = 42;
    return &x;          /* ⚠️ x destroyed after return! */
}
/* Caller gets DANGLING pointer → Undefined Behavior! */

int* safe() {
    static int x = 42;
    return &x;           /* ✅ static lives forever */
}
```

```
Return করার সময় Address Rules:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Local variable address return   → Dangling! (UB)
✅ Static variable address return  → Safe
✅ Heap (malloc) memory return     → Safe (caller must free)
✅ Global variable address return  → Safe
```

---

## ❓ 12.4 MCQ Problems

---

**MCQ 1:** নিচের কোডের output?
```c
int x = 10;
int main() {
    int x = 20;
    { int x = 30; printf("%d ", x); }
    printf("%d", x);
}
```

| Option | Answer |
|--------|--------|
| (a) 20 20 | |
| (b) **30 20** | ✅ |
| (c) 30 10 | |
| (d) 10 20 | |

> Inner block x=30 → print 30 → block end → main's x=20 → print 20

---

**MCQ 2:** static local variable সম্পর্কে কোনটি সত্য?

| Option | Answer |
|--------|--------|
| (a) Scope = Lifetime | |
| (b) Scope > Lifetime | |
| (c) **Scope < Lifetime** | ✅ |
| (d) কোনো সম্পর্ক নেই | |

> static local: scope = function only (narrow), lifetime = entire program (long). **Scope < Lifetime!**

---

**MCQ 3:** নিচের কোডের output?
```c
int main() {
    int a = 10;
    { int a = 20; a++; }
    printf("%d", a);
}
```

| Option | Answer |
|--------|--------|
| (a) **10** | ✅ |
| (b) 11 | |
| (c) 20 | |
| (d) 21 | |

> Inner a=20 → a++=21 → block end → **inner a destroyed** → outer a=**10** (unchanged!)

---

## 📝 12.5 Summary

- **Scope** = compile time concept (কোথা থেকে access), **Lifetime** = runtime concept (কতক্ষণ memory তে)। দুটো **আলাদা** — static local proof: scope narrow, lifetime long।

- **Variable shadowing:** inner scope এ same name → outer variable **ঢেকে যায়**। C তে shadowed global access করার **কোনো syntax নেই** (C++ এ `::x` আছে)। তবে inner block এ `extern int x;` দিলে global **ফিরে পাওয়া** যায়!

- **Local variable address return** → **dangling pointer** → **UB!** Fix: `static`, `malloc`, বা global variable ব্যবহার করুন।

- **for loop variable** (C99): `for(int i=0;...)` → i শুধু **loop block** এ accessible, বাইরে **error**।

---
---


---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 02 — Control Flow](02-control-flow.md)
- ➡️ Next: [Chapter 04 — Arrays & Strings](04-arrays-strings.md)
