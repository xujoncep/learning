# Chapter 04 — Pointer Mastery & Dynamic Memory — C Programming 💻
> Pointer basics, arithmetic, pointer-to-pointer, function pointer এবং Dynamic Memory (Heap)।
---
# LEVEL 4: POINTER MASTERY (পয়েন্টার ও ডাইনামিক মেমোরি)
*C এর সবচেয়ে powerful ও সবচেয়ে tricky concept — master করলে C master*
---
---
# Topic 17: Pointer Basics
<div align="center">
*"Pointer = variable এর address store করে — C এর সবচেয়ে শক্তিশালী অস্ত্র"*
</div>
---
## 📖 17.1 ধারণা (Concept)
```
int a = 42;
int *p = &a;

Memory:
  Address: 1000        2000
         ┌──────┐    ┌──────┐
         │  42  │    │ 1000 │
         └──────┘    └──────┘
           a           p
        (value)     (address of a)

&  = "address of"     → &a = 1000
*  = "dereference"    → *p = 42 (value AT address p holds)
*p = a = 42  (same memory!)
```
---
## 💻 17.2 Declaration, Dereference, Modify
```c
int a = 42;
int *p = &a;         /* p stores address of a */

printf("%d\n", a);   /* 42 — direct access */
printf("%d\n", *p);  /* 42 — via pointer (dereference) */
printf("%p\n", p);   /* address of a */

*p = 100;            /* modify a through pointer! */
printf("%d\n", a);   /* 100 — changed! */
```
> **Key:** `*p` ও `a` **একই memory** access করে — একটি change করলে অন্যটিতেও দেখা যায়!
---
## 💻 17.3 Pointer Arithmetic
```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

/* p + n → moves n ELEMENTS forward (not n bytes!) */
printf("%d\n", *(p + 2));    /* 30 (arr[2]) */
printf("%d\n", *(p + 4));    /* 50 (arr[4]) */

p++;                          /* now points to arr[1] */
printf("%d\n", *p);           /* 20 */

/* Step size depends on TYPE: */
/* int*:    p+1 = +4 bytes   */
/* char*:   p+1 = +1 byte    */
/* double*: p+1 = +8 bytes   */
```
---
## 💻 17.4 const with Pointers — Exam Favourite
```c
int a = 10, b = 20;

/* ══════ 1. Pointer to const (value locked) ══════ */
const int *p1 = &a;
/* *p1 = 20;   ← ❌ can't modify VALUE */
p1 = &b;       /* ✅ can change POINTER */

/* ══════ 2. const Pointer (pointer locked) ══════ */
int * const p2 = &a;
*p2 = 30;      /* ✅ can modify VALUE */
/* p2 = &b;    ← ❌ can't change POINTER */

/* ══════ 3. const Pointer to const (both locked) ══════ */
const int * const p3 = &a;
/* *p3 = 40;   ← ❌ */
/* p3 = &b;    ← ❌ */
```
```
মনে রাখার কৌশল — Read RIGHT to LEFT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const int *p    → "p is pointer to CONST int"    (value ❌, pointer ✅)
int * const p   → "p is CONST pointer to int"    (value ✅, pointer ❌)
const int * const p → both ❌

⚡ const BEFORE * → value locked
   const AFTER *  → pointer locked
```
---
## 💻 17.5 NULL, Wild, Dangling Pointers
```c
/* ══════ NULL Pointer — safely "points nowhere" ══════ */
int *null_ptr = NULL;
/* *null_ptr = 10;  ← ❌ Segmentation Fault! */

/* ══════ Wild Pointer — uninitialized! ══════ */
int *wild;            /* ⚠️ random address! */
/* *wild = 10;        ← ❌ writing to random memory! UB */

/* ══════ Dangling Pointer — freed/destroyed memory ══════ */
int *dangle;
{ int x = 42; dangle = &x; }  /* x destroyed! */
/* *dangle = 10;      ← ❌ UB! memory no longer valid */

/* Fix: always set to NULL after scope/free */
```
---
## ❓ 17.6 Practice Zone (Gold Standard: MCQ & Written)
---
### 🔴 Group A: Multi-Choice Questions (MCQs)

**MCQ 1: `int *a, b;` — এখানে a ও b এর ডাটা টাইপ কী?**
| Option | Answer |
|--------|--------|
| (a) Both int* | |
| (b) **a=int*, b=int** | ✅ |
| (c) a=int, b=int* | |
| (d) Both int | |
> **বিস্তারিত ব্যাখ্যা:** C তে `*` অপারেটরটি শুধুমাত্র তার ঠিক পাশের ভ্যারিয়েবলের সাথে যুক্ত থাকে। এখানে `*` শুধু `a` এর সাথে আছে, তাই `a` একটি পয়েন্টার। `b` এর আগে কোনো `*` নেই, তাই এটি একটি সাধারণ ইন্টিজার। যদি দুজনেই পয়েন্টার হতো তবে `int *a, *b;` লিখতে হতো।

**MCQ 2: `int arr[]={10,20,30}; printf("%d", *(arr+2));` এর আউটপুট কত?**
| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 20 | |
| (c) **30** | ✅ |
| (d) Error | |
> **বিস্তারিত ব্যাখ্যা:** অ্যারে নাম `arr` আসলে অ্যারের প্রথম এলিমেন্টের অ্যাড্রেস নির্দেশ করে। `arr+2` মানে হলো ২ ধাপ এগিয়ে যাওয়া (অ্যারে ইনডেক্স ২ এর অ্যাড্রেস)। সামনে `*` (dereference operator) থাকায় ওই অ্যাড্রেসে থাকা ভ্যালুটি (৩০) প্রিন্ট হবে। এটি `arr[2]` এর সমতুল্য।

**MCQ 3: `const int *p` দিয়ে নিচের কোন কাজটি করা সম্ভব?**
| Option | Answer |
|--------|--------|
| (a) *p = 20; (ভ্যালু পরিবর্তন) | |
| (b) **p = &x; (পয়েন্টার পরিবর্তন)** | ✅ |
| (c) দুটাই সম্ভব | |
| (d) কোনটিই সম্ভব নয় | |
> **বিস্তারিত ব্যাখ্যা:** `const int *p` মানে হলো "pointer to a constant integer"। এখানে ইন্টিজার ভ্যালুটি কনস্ট্যান্ট (lock), তাই ভ্যালু পরিবর্তন করা যাবে না। কিন্তু পয়েন্টারটি নিজে কনস্ট্যান্ট নয়, তাই এটি অন্য কোনো অ্যাড্রেসকে পয়েন্ট করতে পারবে।

**MCQ 4: একটি ৬৪-বিট সিস্টেমে `int*` এবং `char*` পয়েন্টারের সাইজ কত?**
| Option | Answer |
|--------|--------|
| (a) int*=4, char*=1 | |
| (b) **উভয়ই 8 bytes** | ✅ |
| (c) উভয়ই 4 bytes | |
| (d) আর্কিটেকচারের উপর ভিত্তি করে ভিন্ন | |
> **বিস্তারিত ব্যাখ্যা:** পয়েন্টারের ডাটা টাইপ যাই হোক না কেন (int, char, double), এটি শেষ পর্যন্ত একটি মেমোরি অ্যাড্রেস স্টোর করে। ৬৪-বিট আর্কিটেকচারে যেকোন মেমোরি অ্যাড্রেসের স্টোরেজ সাইজ ৮ বাইট। ডাটা টাইপটি ম্যাটার করে শুধুমাত্র dereferencing এবং pointer arithmetic এর সময়।

**MCQ 5: `int *p = NULL; *p = 10;` — এই কোডটির আউটপুট কী হবে?**
| Option | Answer |
|--------|--------|
| (a) 10 প্রিন্ট হবে | |
| (b) NULL প্রিন্ট হবে | |
| (c) **Segmentation Fault (Crash)** | ✅ |
| (d) ০ প্রিন্ট হবে | |
> **বিস্তারিত ব্যাখ্যা:** `NULL` মানে হলো পয়েন্টারটি "কিছুই না" কে নির্দেশ করছে (সাধারণত অ্যাড্রেস ০)। একটি নাল পয়েন্টারকে ডিরেফারেন্স করার চেষ্টা করলে অপারেটিং সিস্টেম প্রোগ্রামটিকে বন্ধ করে দেয়, যাকে আমরা **Segmentation Fault** বলি। সবসময় চেক করা উচিত: `if (p != NULL)`।

**MCQ 6: Pointer arithmetic এ `p + 1` করলে মেমোরিতে কয় বাইট জাম্প করবে?**
| Option | Answer |
|--------|--------|
| (a) সবসময় ১ বাইট | |
| (b) ৪ বাইট | |
| (c) **sizeof(type) বাইট** | ✅ |
| (d) ৮ বাইট | |
> **বিস্তারিত ব্যাখ্যা:** পয়েন্টার এক কদম বাড়ানো মানে হলো তার ডাটা টাইপের সমান বাইট মেমোরিতে এগিয়ে যাওয়া। যদি `int*` হয় তবে ৪ বাইট (সিস্টেম ভেদে), যদি `char*` হয় তবে ১ বাইট। একে বলা হয় 'Element-wise jump'।

**MCQ 7: `*p++` এক্সপ্রেশনের কাজ কী?**
| Option | Answer |
|--------|--------|
| (a) p বাড়ে তারপর ভ্যালু নেয় | |
| (b) **আগের ভ্যালু নেয় তারপর p কে এক বাড়ায়** | ✅ |
| (c) ভ্যালু বাড়িয়ে দেয় | |
| (d) কম্পাইল এরর | |
> **বিস্তারিত ব্যাখ্যা:** এখানে পোস্ট-ফিক্স `++` এর প্রেসিডেন্স `*` এর চেয়ে বেশি। তবে যেহেতু এটি পোস্ট-ফিক্স, পয়েন্টার ইনক্রিমেন্টের কাজ হবে সবার শেষে। প্রথমে `*p` দিয়ে বর্তমান ভ্যালুটি রিটার্ন হবে, এরপর `p` পয়েন্টারটি পরবর্তী অ্যাড্রেসে চলে যাবে।

**MCQ 8: 'Wild Pointer' বলতে কী বুঝায়?**
| Option | Answer |
|--------|--------|
| (a) NULL পয়েন্টার | |
| (b) **আন-ইনিশিয়ালাইজড পয়েন্টার** | ✅ |
| (c) ডিলিট করা পয়েন্টার | |
| (d) ইনভ্যালিড কাস্টিং | |
> **বিস্তারিত ব্যাখ্যা:** একটি পয়েন্টার ডিক্লেয়ার করার পর যদি তাকে কোনো অ্যাড্রেস বা NULL না দেওয়া হয়, তবে সে মেমোরির যেকোন যাতা (random) অ্যাড্রেস ধরে থাকে। একে Wild Pointer বলে। এতে ডাটা রাইট করলে প্রোগ্রাম ক্রাশ করতে পারে।

**MCQ 9: নিচের কোনটি ইনভ্যালিড পয়েন্টার ডিক্লারেশন?**
| Option | Answer |
|--------|--------|
| (a) `void *p;` | |
| (b) `int **q;` | |
| (c) **`float *f = 10;`** | ✅ |
| (d) `char *s = "hi";` | |
> **বিস্তারিত ব্যাখ্যা:** পয়েন্টারে সবসময় একটি মেমোরি অ্যাড্রেস থাকতে হবে। `10` একটি ডিরেক্ট ভ্যালু (ইন্টিজার)। কোন অ্যাড্রেস ছাড়া সরাসরি ভ্যালু অ্যাসাইন করা সিতে অনুমোদিত নয় (টাইপ মিসম্যাচ এরর দেবে)। অ্যাড্রেস দিতে হলে `&` ব্যবহার করতে হয়।

**MCQ 10: `int a = 5, *p = &a, **q = &p;` হলে `**q` এর ভ্যালু কত?**
| Option | Answer |
|--------|--------|
| (a) p এর অ্যাড্রেস | |
| (b) a এর অ্যাড্রেস | |
| (c) **5** | ✅ |
| (d) Error | |
> **বিস্তারিত ব্যাখ্যা:** `q` হলো পয়েন্টারের পয়েন্টার (Double Pointer)। প্রথমে `*q` করলে আমরা পাই `p` কে (যা `a` এর অ্যাড্রেস)। এরপর আরেকবার ডিরেফারেন্স `**q` করলে আমরা পাই `a` এর ভ্যালু, যা হলো ৫।

---

### 🔵 Group B: Written Questions (Solutions included)

**Q1: 'Dangling Pointer' কী? এটি কীভাবে প্রতিরোধ করা যায়?**
**উত্তরঃ** যখন কোনো মেমোরি ব্লক `free()` করে দেওয়া হয় কিন্তু ওই ব্লককে পয়েন্ট করে থাকা পয়েন্টারটিকে আর পরিবর্তন করা হয় না, তখন তাকে Dangling Pointer বলে। এটি বিপজ্জনক কারণ এটি এমন একটি জায়গা নির্দেশ করছে যা এখন আর প্রোগ্রামের দখলে নেই।
- **প্রতিরোধ:** মেমোরি `free()` করার সাথে সাথে পয়েন্টারটিতে `NULL` অ্যাসাইন করে দিতে হবে। যেমন: `free(p); p = NULL;`।

**Q2: `char *s = "Hello";` এবং `char s[] = "Hello";` এর মধ্যে প্রধান পার্থক্য কী?**
**উত্তরঃ** 
1. **সংশোধনযোগ্যতা:** `char s[]` একটি স্ট্যাক অ্যারে, এর এলিমেন্ট পরিবর্তন করা যায়। কিন্তু `char *s` একটি স্ট্রিং লিটারালের অ্যাড্রেস ধারণ করে (যা সাধারণত read-only memory তে থাকে), তাই `s[0] = 'M'` লিখলে ক্রাশ হতে পারে।
2. **সাইজ:** `sizeof(s)` অ্যারের ক্ষেত্রে ৬ হবে (৫+১ নাল ক্যারেক্টার)। পয়েন্টারের ক্ষেত্রে এটি ৪ বা ৮ বাইট হবে।

**Q3: Function Pointer কী? কেন এটি প্রয়োজন?**
**উত্তরঃ** যে পয়েন্টার মেমোরিতে ডাটার বদলে ফাংশনের শুরুর অ্যাড্রেস ধারণ করে তাকে Function Pointer বলে। 
- **প্রয়োজনীয়তা:** রানটাইমে ডিসিশন নেওয়ার জন্য (যেমন: `qsort()` এ কাস্টম কম্প্যারেটর পাস করা) এবং ইভেন্ট ড্রাইভেন প্রোগ্রামিং বা 'Callback' মেকানিজম ইমপ্লিমেন্ট করার জন্য এটি অত্যন্ত জরুরি।

**Q4: generic pointer (void*) এর সুবিধা ও অসুবিধা ব্যাখ্যা করুন।**
**উত্তরঃ** 
- **সুবিধা:** `void*` যেকোন টাইপের ডাটার অ্যাড্রেস ধারণ করতে পারে। এটি মেমোরিকে "অগনোস্টিক" বা টাইপ-হীন হিসেবে ট্রিট করে (যেমন: `malloc()` এর রিটার্ন টাইপ)। 
- **অসুবিধা:** একে সরাসরি ডিরেফারেন্স (`*p`) করা যায় না বা পয়েন্টার অ্যারিথমেটিক করা যায় না। ব্যবহারের আগে অবশ্যই ডাটা টাইপে 'Type Cast' করে নিতে হয়।

**Q5: নিচের কোডের আউটপুট ব্যাখ্যা করুন:**
```c
int a[5] = {1, 2, 3, 4, 5};
int *p = a;
printf("%d %d", *(p+1), *(p+3));
```
**উত্তরঃ** আউটপুট হবে `2 4`।
ব্যাখ্যা: `p` পয়েন্ট করছে অ্যারের প্রথম এলিমেন্ট (ইনডেক্স ০) কে। `p+1` করলে পয়েন্টারটি এক ইনডেক্স সামনে এগিয়ে গিয়ে ২য় এলিমেন্ট (ইনডেক্স ১) এর অ্যাড্রেসে যায়, তাই আউটপুট ২। একইভাবে `p+3` করলে পয়েন্টারটি ইনডেক্স ০ থেকে ৩ ধাপ এগিয়ে ইনডেক্স ৩ এ যায়, যার ভ্যালু ৪।

---
## 📝 17.7 Summary
- Pointer = **variable এর address** store করে। `&` = address of, `*` = dereference (value at address)।
- **`int *a, b`** → a = pointer, **b = int**! দুটো pointer = `int *a, *b`।
- **Pointer arithmetic:** `p+1` = next **element** (type size অনুযায়ী jump)। `int*` +1 = +4 bytes, `char*` +1 = +1 byte।
- **const + pointer:** const **BEFORE** `*` = value locked; const **AFTER** `*` = pointer locked। Right-to-left পড়ুন!
- **NULL** pointer dereference = **crash**। **Wild** pointer = uninitialized (random address)। **Dangling** = freed memory। Fix: always **NULL initialize** ও free পরে **NULL set**।
- **All pointer sizes same** (4/8 bytes) — type শুধু arithmetic ও dereference এ matter করে।
---
---
# Topic 18: Pointer with Array & String
<div align="center">
*"Array name = pointer, String = char pointer — pointer বুঝলে সব বোঝা যায়"*
</div>
---
## 📖 18.1 Array Access — 6 Equivalent Ways
```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

/* ALL IDENTICAL: */
arr[2]        /* subscript */
*(arr + 2)    /* pointer + offset */
*(2 + arr)    /* commutative */
2[arr]        /* ⚠️ valid! (exam trap) */
p[2]          /* pointer subscript */
*(p + 2)      /* pointer + offset */
/* All = 30 */
```
---
## 📖 18.2 *p++ vs (*p)++ vs ++*p — Master Table
```c
int arr[] = {10, 20, 30};
int *p = arr;

/* *p++    → read *p=10, THEN p moves to arr[1]  (pointer changes) */
/* (*p)++  → read *p=10, THEN arr[0] becomes 11  (value changes)   */
/* ++*p    → arr[0] becomes 11, THEN read 11      (value changes)   */
/* *++p    → p moves to arr[1], THEN read 20       (pointer changes) */
```
```
Expression │ Returns  │ Side Effect
───────────┼──────────┼─────────────
*p++       │ old *p   │ p moves forward
(*p)++     │ old *p   │ *p increments
++*p       │ new *p   │ *p increments
*++p       │ new *p   │ p moves forward
```
> **Exam এ সবচেয়ে বেশি আসে!** Precedence: postfix ++ > * > prefix ++
---
## 📖 18.3 arr vs &arr — Different Types, Same Address
```c
int arr[5];

/* arr   → int*       → arr+1 skips 1 element (4 bytes)  */
/* &arr  → int(*)[5]  → &arr+1 skips ENTIRE array (20 bytes!) */

printf("%p %p\n", arr, &arr);     /* same address! */
printf("%p %p\n", arr+1, &arr+1); /* DIFFERENT! +4 vs +20 */
```
---
## 📖 18.4 Pointer with String
