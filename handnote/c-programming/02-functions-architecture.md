# Chapter 02 — Functions & Memory Architecture — C Programming 💻
> Storage classes, scope, lifetime, stack vs heap basics — function-এর internals।
---
# LEVEL 2: FUNCTIONS & MEMORY ARCHITECTURE
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
#include `stdio.h`
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
#include `stdio.h`
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