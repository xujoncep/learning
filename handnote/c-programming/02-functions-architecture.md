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
## ❓ 11.6 Practice Zone (Gold Standard: MCQ & Written)
---
### 🔴 Group A: Multi-Choice Questions (MCQs)

**MCQ 1: নিচের কোডের output কী হবে?**
```c
void fun() { 
    static int x = 0; 
    x++; 
    printf("%d ", x); 
}
int main() { 
    fun(); fun(); fun(); 
    return 0;
}
```
| Option | Answer |
|--------|--------|
| (a) 1 1 1 | |
| (b) **1 2 3** | ✅ |
| (c) 0 1 2 | |
| (d) 3 3 3 | |
> **বিস্তারিত ব্যাখ্যা:** `static` ভ্যারিয়েবল একবারই ইনিয়ালাইজ হয়। `fun()` প্রথমবার কল করলে `x=1` হয়। দ্বিতীয়বার কলেও `x` তার আগের ভ্যালু (১) ধরে রাখে, তাই ইনক্রিমেন্ট হয়ে `x=2` হয়। একইভাবে তৃতীয়বার `x=3` হয়।

**MCQ 2: একটি Uninitialized static variable এর default value কত?**
| Option | Answer |
|--------|--------|
| (a) Garbage | |
| (b) **0** | ✅ |
| (c) 1 | |
| (d) -1 | |
> **বিস্তারিত ব্যাখ্যা:** C ল্যাঙ্গুয়েজে `static` এবং `global` ভ্যারিয়েবলগুলো অটোমেটিকভাবে `0` (বা pointer হলে `NULL`) দিয়ে ইম্প্লিসিটলি ইনিশিয়ালাইজ হয়। পক্ষান্তরে `auto` বা সাধারণ লোকাল ভ্যারিয়েবল `garbage` ভ্যালু ধারণ করে।

**MCQ 3: `register int x; printf("%p", &x);` — এই কোডটির ফলাফল কী?**
| Option | Answer |
|--------|--------|
| (a) Address প্রিন্ট হবে | |
| (b) 0 প্রিন্ট হবে | |
| (c) **Compilation Error** | ✅ |
| (d) Runtime Error | |
> **বিস্তারিত ব্যাখ্যা:** `register` মেমোরি ক্লাসের মাধ্যমে কম্পাইলারকে অনুরোধ করা হয় ভ্যারিয়েবলটি যেন CPU Register-এ রাখা হয়। যেহেতু রেজিস্টারের কোনো মেমোরি অ্যাড্রেস (RAM address) থাকে না, তাই `&` (address-of) অপারেটর ব্যবহার করা অবৈধ।

**MCQ 4: `extern` কীওয়ার্ড কেন ব্যবহৃত হয়?**
| Option | Answer |
|--------|--------|
| (a) মেমোরি এলোকেট করতে | |
| (b) **অন্য ফাইলে ডিফাইন করা ভ্যারিয়েবল রেফার করতে** | ✅ |
| (c) ভ্যালু ০ করতে | |
| (d) ভ্যারিয়েবল ডিলিট করতে | |
> **বিস্তারিত ব্যাখ্যা:** `extern` ব্যবহার করা হয় ভ্যারিয়েবল ডিক্লেয়ার করার জন্য, ডিফাইন করার জন্য নয়। এটি দিয়ে কম্পাইলারকে বলা হয় যে এই ভ্যারিয়েবলটি অন্য কোনো ফাইলে বা জায়গায় ইতিপূর্বেই ডিফাইন করা হয়েছে।

**MCQ 5: নিচের কোডের output কত?**
```c
void fun() { 
    static int a = 5; 
    printf("%d ", a--); 
}
int main() { 
    fun(); fun(); fun(); 
}
```
| Option | Answer |
|--------|--------|
| (a) 5 5 5 | |
| (b) **5 4 3** | ✅ |
| (c) 4 3 2 | |
| (d) 5 4 4 | |
> **বিস্তারিত ব্যাখ্যা:** এখানে `a--` হলো post-decrement। অর্থাৎ আগে `a` এর বর্তমান ভ্যালু প্রিন্ট হবে, তারপর ১ কমবে। যেহেতু `a` স্ট্যাটিক, তাই প্রতিবার কমানো ভ্যালু পরের কলে পাওয়া যাবে। Call 1: prints 5 (a becomes 4), Call 2: prints 4 (a becomes 3), Call 3: prints 3 (a becomes 2)।

**MCQ 6: Stack মেমোরিতে কোন ধরনের ভ্যারিয়েবল জমা থাকে?**
| Option | Answer |
|--------|--------|
| (a) Static | |
| (c) Global | |
| (c) **Auto (Local)** | ✅ |
| (d) Extern | |
> **বিস্তারিত ব্যাখ্যা:** ফাংশন কল করার সময় তার লোকাল ভ্যারিয়েবল এবং আর্গুমেন্টগুলো Stack মেমোরিতে জমা হয়। ফাংশন শেষ হলে এই মেমোরি রিলিজ হয়ে যায়।

**MCQ 7: `static global` ভ্যারিয়েবলের স্কোপ কতটুকু?**
| Option | Answer |
|--------|--------|
| (a) পুরো প্রোগ্রাম | |
| (b) **শুধুমাত্র ওই সোর্স ফাইল** | ✅ |
| (c) শুধুমাত্র মেইন ফাংশন | |
| (d) ড্রাইভের সব ফাইল | |
> **বিস্তারিত ব্যাখ্যা:** গ্লোবাল ভ্যারিয়েবল এমনিতেই সব জায়গা থেকে এক্সেস করা যায়, কিন্তু তার আগে `static` লাগিয়ে দিলে তার "External Linkage" বন্ধ হয়ে যায়। ফলে অন্য ফাইল থেকে `extern` ব্যবহার করেও তাকে পাওয়া যায় না। একে "Internal Linkage" বলে।

**MCQ 8: Recursion-এর ক্ষেত্রে সবচেয়ে উপযোগী স্টোরেজ ক্লাস কোনটি?**
| Option | Answer |
|--------|--------|
| (a) static | |
| (b) extern | |
| (c) **auto** | ✅ |
| (d) register | |
> **বিস্তারিত ব্যাখ্যা:** Recursion-এ প্রতিবার নতুন লোকাল কপি দরকার হয়। `auto` ভ্যারিয়েবল Stack-এ থাকে এবং প্রতি কলের জন্য আলাদা মেমোরি পায়। `static` ব্যবহার করলে সব কল একই ভেরিয়েবল শেয়ার করত, যা রিকার্সন লজিক নষ্ট করত।

**MCQ 9: নিচের কোনটি সঠিক ভ্যালু প্রিন্ট করবে?**
```c
int x = 10;
void test() {
    int x = 20;
    {
        extern int x;
        printf("%d", x);
    }
}
```
| Option | Answer |
|--------|--------|
| (a) 20 | |
| (b) **10** | ✅ |
| (c) Error | |
| (d) Garbage | |
> **বিস্তারিত ব্যাখ্যা:** ইনার ব্লকে `extern int x` ব্যবহারের ফলে কম্পাইলার লোকাল `x` কে বাদ দিয়ে গ্লোবাল `x` (যার ভ্যালু ১০) কে খুঁজতে শুরু করে। ফলে ১০ প্রিন্ট হয়।

**MCQ 10: Register variable-এর প্রধান সুবিধা কী?**
| Option | Answer |
|--------|--------|
| (a) মেমোরি কম লাগে | |
| (b) ভ্যালু স্থায়ী হয় | |
| (c) **এক্সেস স্পিড অনেক বেশি** | ✅ |
| (d) সিকিউরিটি বাড়ে | |
> **বিস্তারিত ব্যাখ্যা:** CPU Register সরাসরি প্রসেসরের ভেতরে থাকে, যা RAM এর তুলনায় কয়েকশ গুণ দ্রুত। লুপের কাউন্টার ভ্যারিয়েবল হিসেবে এটি ব্যবহারের জন্য সাজেস্ট করা হয়।

---

### 🔵 Group B: Written Questions (Solutions included)

**Q1: `auto` এবং `static` লোকাল ভ্যারিয়েবলের মধ্যে প্রধান ৩টি পার্থক্য লিখুন।**
**উত্তরঃ** 
1. **Lifetime:** `auto` ভ্যারিয়েবল ফাংশন শেষ হলেই মারা যায়। `static` ভ্যারিয়েবল পুর প্রোগ্রামের শেষ পর্যন্ত বেঁচে থাকে।
2. **Initialization:** `auto` ভ্যারিয়েবল প্রতিবার ফাংশন কলের সময় আবার তৈরি হয়। `static` ভ্যারিয়েবল শুধুমাত্র প্রথমবার কল করার সময় তৈরি হয়।
3. **Default Value:** `auto` এর ডিফল্ট ভ্যালু গারবেজ (Garbage), আর `static` এর ডিফল্ট ভ্যালু ০ (Zero)।

**Q2: "Shadowing of Variables" বলতে কী বুঝো? একটি উদাহরনসহ ব্যাখ্যা দাও।**
**উত্তরঃ** যখন কোনো ইনার হোয়াইট-স্পেস বা ব্লকের ভেতর একটি ভ্যারিয়েবল ডিক্লেয়ার করা হয় যার নাম আউটার স্কোপের কোনো ভ্যারিয়েবলের নামের সমান, তখন ইনার ভ্যারিয়েবলটি আউটারটিকে আড়াল করে দেয়। একেই Shadowing বলে।
```c
int x = 5; // Global
int main() {
    int x = 10; // Shadows global x
    printf("%d", x); // Prints 10
}
```

**Q3: Recursive ফাংশনে `static` ভ্যারিয়েবল ব্যবহার করলে কী সমস্যা হতে পারে?**
**উত্তরঃ** স্ট্যাটিক ভ্যারিয়েবল সব ফাংশন কলের মধ্যে মেমোরি শেয়ার করে। রিকার্সনে আমরা সাধারণত চাই প্রতিটি কলের নিজস্ব 'State' থাকুক। স্ট্যাটিক ব্যবহার করলে আগের কলের ভ্যালু পরের কলে আপডেট হয়ে যাবে, যা বেস ক্যাস (Base Case) বা ক্যালকুলেশনকে ওলটপালট করে দিতে পারে। একমাত্র যদি আমাদের গ্লোবাল কাউন্টিং দরকার হয়, তখনই স্ট্যাটিক ব্যবহার করা উচিত।

**Q4: Stack এবং Heap মেমোরির মধ্যে পার্থক্য কী?**
**উত্তরঃ** 
- **Stack:** এখানে ফাংশনের লোকাল ভ্যারিয়েবল থাকে। এটি অটোমেটিক ম্যানেজ হয়। সাইজ ফিক্সড এবং এক্সেস ফাস্ট।
- **Heap:** এটি ডাইনামিক মেমোরি এলোকেশনের (malloc/calloc) জন্য ব্যবহৃত হয়। প্রোগ্রামারকে ম্যানুয়ালি মেমোরি রিলিজ (free) করতে হয়। এটি অনেক বড় সাইজ হতে পারে কিন্তু এক্সেস কিছুটা স্লো।

**Q5: নিচের কোডটির আউটপুট ব্যাখ্যাসহ লিখুন:**
```c
#include <stdio.h>
int main() {
    {
        int x = 10;
        {
            int x = 20;
            printf("%d ", x);
        }
        printf("%d", x);
    }
    return 0;
}
```
**উত্তরঃ** আউটপুট হবে `20 10`। 
ব্যাখ্যা: প্রথম `printf` টি ইনার ব্লকের `x` (ভ্যালু ২০) কে এক্সেস করছে। সেই ব্লকটি শেষ হওয়ার সাথে সাথে ২০ ভ্যালুটি মেমোরি থেকে মুছে যায়। দ্বিতীয় `printf` টি আউটার ব্লকের `x` (ভ্যালু ১০) কে এক্সেস করছে। সুতরাং আউটপুট আসে ২০ এবং ১০।

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