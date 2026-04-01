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

<div align="center">


*Data collection — একই type এর অনেক data একটি নামে manage করা*

</div>

---
---
