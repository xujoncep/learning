# Chapter 03 — Data Containers (Arrays, Strings & Math) — C Programming 💻
``n> 1D/2D array, matrix, string manipulation এবং গাণিতিক সমস্যার সমাধান।
``n---
# LEVEL 3: DATA CONTAINERS (ARRAYS, STRINGS & MATH)
``n*Data collection — একই type এর অনেক data একটি নামে manage করা*
``n---
---
``n# Topic 13: 1D Array
``n<div align="center">
``n*"Array = contiguous memory তে same type এর data collection, 0-indexed"*
``n</div>
``n---
``n## 📖 13.1 ধারণা (Concept)
``n```
int arr[5] = {10, 20, 30, 40, 50};
``nMemory Layout:
Index:    [0]    [1]    [2]    [3]    [4]
        ┌──────┬──────┬──────┬──────┬──────┐
Value:  │  10  │  20  │  30  │  40  │  50  │
        └──────┴──────┴──────┴──────┴──────┘
Address: 1000   1004   1008   1012   1016
``n⚡ Index starts from 0!
⚡ arr[5] → OUT OF BOUNDS! (UB, no error in C)
⚡ sizeof(arr) = 5 × 4 = 20 bytes
⚡ Element count = sizeof(arr) / sizeof(arr[0]) = 5
```
``n---
``n## 💻 13.2 Declaration & Initialization
``n```c
int a[5] = {10, 20, 30, 40, 50};  /* full init */
int b[5] = {10, 20};              /* partial: {10,20,0,0,0} */
int c[5] = {0};                   /* all zeros: {0,0,0,0,0} */
int d[] = {10, 20, 30};           /* auto size: 3 elements */
int e[5] = {[0]=5, [3]=30};       /* designated (C99): {5,0,0,30,0} */
``nint f[5];                          /* ⚠️ local: GARBAGE values! */
static int g[5];                   /* ✅ static: all zeros */
```
``n> **Partial init rule:** explicitly initialized হলে বাকি = **0**। কিন্তু **uninitialized local** array = **garbage!**
``n---
``n## 💻 13.3 Array & Pointer Relationship
``n```c
/* arr[i] = *(arr + i) = *(i + arr) = i[arr] — ALL IDENTICAL! */
``nint arr[] = {10, 20, 30};
printf("%d\n", arr[1]);       /* 20 */
printf("%d\n", *(arr + 1));   /* 20 */
printf("%d\n", 1[arr]);       /* 20 ⚠️ valid! */
``n/* Array name = constant pointer to first element */
/* arr = &arr[0] */
/* arr++ → ❌ Error! arr is NOT modifiable */
/* int *p = arr; p++ → ✅ pointer variable is modifiable */
```
``n---
``n## 💻 13.4 Array in Function — Decay to Pointer
``n```c
void printArr(int arr[], int size) {
    /* ⚠️ sizeof(arr) = 4/8 (POINTER size, NOT array size!) */
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
``n    arr[0] = 999;  /* ⚠️ ORIGINAL array modified! */
}
``nint main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);  /* 5 (correct in main) */
    printArr(arr, size);  /* must pass size separately! */
    printf("\narr[0] = %d\n", arr[0]);  /* 999 — changed! */
}
```
``n---
``n## ❓ 13.5 MCQ Problems
``n---
``n**MCQ 1:** `int arr[5] = {1, 2};` — `arr[3]` এর value?
``n| Option | Answer |
|--------|--------|
| (a) Garbage | |
| (b) **0** | ✅ |
| (c) 2 | |
| (d) Error | |
``n> Partial init: বাকি = **0**
``n---
``n**MCQ 2:** `arr[2]` ও `2[arr]` — সম্পর্ক?
``n| Option | Answer |
|--------|--------|
| (a) শুধু arr[2] valid | |
| (b) শুধু 2[arr] valid | |
| (c) **দুটোই identical** | ✅ |
| (d) দুটোই ভুল | |
``n> `arr[2]` = `*(arr+2)` = `*(2+arr)` = `2[arr]`
``n---
``n**MCQ 3:** Function এ array pass করলে `sizeof(arr)` কত?
``n| Option | Answer |
|--------|--------|
| (a) Array total bytes | |
| (b) Element count | |
| (c) **Pointer size (4 or 8)** | ✅ |
| (d) Error | |
``n> Array → pointer decay! sizeof = pointer size, NOT array size
``n---
``n**MCQ 4:** নিচের কোডে কী হবে?
```c
int arr[3] = {1,2,3};
arr = {4,5,6};
```
``n| Option | Answer |
|--------|--------|
| (a) arr updated | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) arr unchanged | |
``n> Array **re-assignment impossible!** Initializer শুধু declaration এ কাজ করে
``n---
``n**MCQ 5:** `int arr[] = {10,20,30,40}; int *p = arr+3; p[-1]` = ?
``n| Option | Answer |
|--------|--------|
| (a) 20 | |
| (b) **30** | ✅ |
| (c) 40 | |
| (d) Error | |
``n> p = &arr[3], p[-1] = *(p-1) = arr[2] = **30**
``n---
``n## 📝 13.6 Summary
``n- Array = **same type**, **contiguous memory**, **0-indexed**। `arr[5]` = 5 elements: index 0 to 4।
``n- **Partial init** → বাকি **0**; `{0}` = সব 0; **uninitialized local = garbage!**
``n- **`arr[i]` = `*(arr+i)` = `i[arr]`** — সব identical! Array name = &arr[0] (constant pointer)।
``n- **sizeof(arr)** main এ = total bytes; function এ = **pointer size** (4/8)! Size আলাদা pass করুন।
``n- Function এ array = **pointer** pass → modify করলে **original** ও change হয়! Protection: `const int arr[]`
``n- **Out of bounds** access → C তে **কোনো error নেই**, কিন্তু **Undefined Behavior!**
``n---
---
``n# Topic 14: 2D Array & Matrix Operations
``n<div align="center">
``n*"2D Array = array of arrays = matrix = table of rows and columns"*
``n</div>
``n---
``n## 📖 14.1 ধারণা (Concept)
``n```
int m[3][4] — 3 rows × 4 columns
``n         Col0  Col1  Col2  Col3
Row 0  [  1     2     3     4  ]
Row 1  [  5     6     7     8  ]
Row 2  [  9    10    11    12  ]
``nMemory (Row-Major — C default):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
     Row 0          Row 1           Row 2
``nSize: rows = sizeof(m)/sizeof(m[0])       = 3
      cols = sizeof(m[0])/sizeof(m[0][0]) = 4
```
``n---
``n## 💻 14.2 Declaration & Function Parameter
``n```c
/* ═══ Declaration ═══ */
int a[2][3] = {{1,2,3}, {4,5,6}};     /* nested init */
int b[2][3] = {1,2,3,4,5,6};          /* flat init (same!) */
int c[][3]  = {{1,2,3}, {4,5,6}};     /* row auto, column MUST specify! */
/* int d[2][] = {...};  ← ❌ Error! column size MANDATORY! */
``n/* ═══ Function parameter — column size REQUIRED! ═══ */
void print(int m[][4], int rows) { }   /* ✅ */
void print(int (*m)[4], int rows) { }  /* ✅ same thing */
/* void print(int m[][], int r, int c); ← ❌ Error! */
/* void print(int **m, int r, int c);   ← ❌ int** ≠ int[][N]! */
```
``n---
``n## 💻 14.3 Matrix Multiplication — Exam Classic
``n```c
/* A[m×n] × B[n×p] = C[m×p] — n MUST match! */
``nvoid multiply(int A[][3], int B[][2], int C[][2], int m, int n, int p) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < p; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
        }
}
/* Triple nested loop: i(rows A), j(cols B), k(common dimension) */
```
``n---
``n## 💻 14.4 Pointer & 2D Array
``n```c
int m[3][4];
``n/* Type hierarchy: */
/* m       → int (*)[4]   (pointer to row of 4 ints)     */
/* m[i]    → int *         (pointer to element)           */
/* m[i][j] → int           (value)                        */
``n/* m + 1    → skips ENTIRE ROW (16 bytes for int[4])      */
/* m[0] + 1 → skips ONE ELEMENT (4 bytes)                 */
``n/* Access: m[i][j] = *(*(m+i)+j) = *(m[i]+j)             */
```
``n---
``n## ❓ 14.5 MCQ Problems
``n---
``n**MCQ 1:** `int a[2][3] = {1,2,3,4,5,6}; a[1][1]` = ?
``n| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 2 | |
| (d) Error | |
``n> Flat init: Row0={1,2,3}, Row1={4,5,6}। a[1][1] = **5**
``n---
``n**MCQ 2:** `int a[2][3] = {{1,2},{4}};` — `a[1][1]` = ?
``n| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **0** | ✅ |
| (c) Garbage | |
| (d) 2 | |
``n> Partial: Row0={1,2,**0**}, Row1={4,**0**,0}। a[1][1] = **0**
``n---
``n**MCQ 3:** 2D array function parameter এ কোনটি mandatory?
``n| Option | Answer |
|--------|--------|
| (a) Row size | |
| (b) **Column size** | ✅ |
| (c) দুটোই | |
| (d) কোনোটাই না | |
``n---
``n**MCQ 4:** `int m[3][3]; *(*(m+1)+2)` = ?
``n| Option | Answer |
|--------|--------|
| (a) m[2][1] | |
| (b) **m[1][2]** | ✅ |
| (c) m[1][1] | |
| (d) Error | |
``n> `*(m+1)` = m[1], `*(m[1]+2)` = m[1][2]
``n---
``n## 📝 14.6 Summary
``n- 2D Array = **rows × columns**, **row-major** order এ memory তে store। **Column size mandatory** — row omit করা যায়।
``n- **`int**` ≠ `int[][N]`!** Dynamic 2D (pointer-to-pointer) ও static 2D array **সম্পূর্ণ ভিন্ন** memory layout।
``n- **m+1** = next **row** (big jump), **m[0]+1** = next **element** (small jump) — exam এ আসে।
``n- **Matrix multiply:** A[m×n] × B[n×p] = C[m×p]। Triple loop (i, j, k)। **n must match!**
``n- **Transpose:** `t[j][i] = m[i][j]`। In-place: **j = i+1** থেকে শুরু (double-swap prevent)।
``n---
---
``n# Topic 15: String Basics
``n<div align="center">
``n*"C তে string = null-terminated char array — '\0' ই string এর প্রাণ"*
``n</div>
``n---
``n## 📖 15.1 ধারণা (Concept)
``n```
char name[] = "Hello";
``nMemory:
Index:  [0]  [1]  [2]  [3]  [4]  [5]
       ┌────┬────┬────┬────┬────┬────┐
Value: │ 'H'│ 'e'│ 'l'│ 'l'│ 'o'│'\0'│
       └────┴────┴────┴────┴────┴────┘
``n⚡ "Hello" = 5 chars + 1 null = 6 BYTES total!
⚡ sizeof("Hello") = 6 (includes '\0')
⚡ strlen("Hello") = 5 (excludes '\0')
```
``n---
``n## 💻 15.2 char[] vs char* — Critical Difference!
``n```c
char arr[] = "Hello";   /* Array COPY — modifiable! ✅ */
char *ptr  = "Hello";   /* Pointer to LITERAL — READ-ONLY! ⚠️ */
``narr[0] = 'J';           /* ✅ "Jello" */
/* ptr[0] = 'J';        ← ❌ UB! string literal read-only! */
``n/* sizeof difference: */
printf("%lu\n", sizeof(arr));  /* 6 (array size) */
printf("%lu\n", sizeof(ptr));  /* 4/8 (pointer size!) */
```
``n> **Golden Rule:** `char s[]` = modifiable copy, `char *s` = read-only pointer to literal!
``n---
``n## 💻 15.3 Input Methods
``n```c
char name[50];
``n/* ══════ scanf %s — STOPS AT WHITESPACE! ══════ */
scanf("%s", name);
/* "John Doe" → name = "John" ONLY! ⚠️ */
``n/* ══════ fgets — reads FULL LINE (BEST!) ══════ */
fgets(name, 50, stdin);
/* ⚠️ includes '\n'! Remove: */
name[strcspn(name, "\n")] = '\0';
``n/* ══════ scanf scanset ══════ */
scanf(" %[^\n]", name);   /* reads until newline */
```
``n```
┌──────────────┬──────────┬──────────┬──────────────┐
│ Method       │ Spaces?  │ Safe?    │ '\n' in str? │
├──────────────┼──────────┼──────────┼──────────────┤
│ scanf("%s")  │ ❌ stops │ ⚠️        │ ❌            │
│ fgets()      │ ✅ reads │ ✅ safe   │ ⚠️ includes!  │
│ gets()       │ ✅       │ ❌ NEVER! │ ❌            │
└──────────────┴──────────┴──────────┴──────────────┘
```
``n---
``n## 💻 15.4 Essential String Functions (string.h)
``n```c
#include `string.h`
``nstrlen(s)           /* length (excluding '\0') */
strcpy(dest, src)   /* copy src → dest */
strcat(dest, src)   /* append src to end of dest */
strcmp(s1, s2)      /* compare: 0=equal, <0 s1 first, >0 s2 first */
strchr(s, c)        /* find first occurrence of char c */
strstr(hay, needle) /* find substring */
strncpy(d, s, n)    /* copy max n chars ⚠️ may NOT null-terminate! */
strtok(s, delim)    /* tokenize ⚠️ modifies original string! */
```
``n> **strcmp return:** 0 = **equal**, negative = s1 comes first, positive = s2 comes first। `==` দিয়ে string compare **করবেন না!** (address compare হয়)
``n---
``n## 💻 15.5 Implement strlen & strcpy with Pointer
``n```c
int myStrlen(const char *s) {
    const char *start = s;
    while (*s) s++;
    return s - start;
}
``nchar* myStrcpy(char *dest, const char *src) {
    char *d = dest;
    while ((*d++ = *src++));   /* copy + advance + check '\0' */
    return dest;
}
```
``n---
``n## ❓ 15.6 MCQ Problems
``n---
``n**MCQ 1:** `char s[] = "Hello"; sizeof(s)` vs `strlen(s)` ?
``n| Option | Answer |
|--------|--------|
| (a) 5, 5 | |
| (b) **6, 5** | ✅ |
| (c) 6, 6 | |
| (d) 5, 6 | |
``n> sizeof includes '\0' → **6**। strlen excludes → **5**
``n---
``n**MCQ 2:** `char *s = "Hello"; s[0] = 'J';` — কী হবে?
``n| Option | Answer |
|--------|--------|
| (a) "Jello" | |
| (b) "Hello" | |
| (c) **UB / Crash** | ✅ |
| (d) Error | |
``n> `char *s` = pointer to **read-only** literal। Modify = **UB!**
``n---
``n**MCQ 3:** `printf("%d", strcmp("abc","abc"))` এর output?
``n| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) **0** | ✅ |
| (c) -1 | |
| (d) true | |
``n> Equal strings → strcmp returns **0**!
``n---
``n**MCQ 4:** `char s[] = "Hello\0World"; strlen(s)` = ?
``n| Option | Answer |
|--------|--------|
| (a) 11 | |
| (b) 10 | |
| (c) **5** | ✅ |
| (d) Error | |
``n> `'\0'` = null terminator → strlen **stops** → **5**। "World" invisible!
``n---
``n**MCQ 5:** নিচের কোডে কী হবে?
```c
char s[20]; s = "Hello";
```
``n| Option | Answer |
|--------|--------|
| (a) s = "Hello" | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) s empty | |
``n> Array **assignment impossible!** `strcpy(s, "Hello")` ব্যবহার করুন
``n---
``n**MCQ 6:** `scanf("%s", name)` — "John Doe" input দিলে name = ?
``n| Option | Answer |
|--------|--------|
| (a) "John Doe" | |
| (b) **"John"** | ✅ |
| (c) "Doe" | |
| (d) Error | |
``n> scanf %s whitespace এ **stop** করে!
``n---
``n## 📝 15.7 Summary
``n- C তে string = **null-terminated char array** (`'\0'` দিয়ে শেষ)। **sizeof** includes '\0', **strlen** excludes — buffer = `strlen + 1`।
``n- **`char s[]`** = modifiable array copy; **`char *s`** = read-only pointer to literal! `s[0] = 'X'` → array ✅, pointer ❌ (UB)। এই পার্থক্য exam এ **সবচেয়ে বেশি** আসে।
``n- **scanf("%s")** whitespace এ stop করে — "John Doe" → শুধু "John"। Full line পড়তে **fgets()** best, তবে **'\n' include** করে — remove করতে হয়।
``n- **strcmp()** = 0 মানে **equal**। `==` দিয়ে string compare **করবেন না** — address compare হয়, content নয়!
``n- **strncpy** n chars copy করে কিন্তু **null terminate নাও করতে পারে** — manual '\0' দিতে হয়। **strtok** original string **modify** করে — delimiter '\0' দিয়ে replace হয়।
``n- Declaration পরে **`s = "Hello"` illegal!** — `strcpy(s, "Hello")` ব্যবহার বাধ্যতামূলক।
``n- **`"Hello\0World"`** — '\0' string functions কে **stop** করে। strlen = 5, sizeof = 12। "World" invisible but memory তে আছে।
``n---
---
``n<div align="center">
``n## পরবর্তী অধ্যায়
``n**Topic 16-20:** String Problems, Pointer Basics, Pointer+Array, Double Pointer & Function Pointer, Dynamic Memory
``n*Topic 16-20: String Problems, Pointers, Dynamic Memory — নিচে দেখুন*
``n</div>
``n---
---
``n# Topic 16: String Problems (Advanced)
``n<div align="center">
``n*"String manipulation = interview ও exam এর হাতিয়ার"*
``n</div>
``n---
``n## 📖 16.1 Essential String Algorithms
``n### Palindrome Check
``n```c
int isPalindrome(const char *s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        if (s[left] != s[right]) return 0;
        left++; right--;
    }
    return 1;
}
/* "madam" → Yes, "hello" → No */
```
``n### Anagram Check (Frequency Array)
``n```c
int isAnagram(const char *s1, const char *s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    int freq[256] = {0};
    for (int i = 0; s1[i]; i++) freq[(unsigned char)s1[i]]++;
    for (int i = 0; s2[i]; i++) freq[(unsigned char)s2[i]]--;
    for (int i = 0; i < 256; i++)
        if (freq[i] != 0) return 0;
    return 1;
}
/* "listen"/"silent" → Anagram ✅ */
```
``n### Reverse Words in String
``n```c
void reverseRange(char *s, int start, int end) {
    while (start < end) {
        char t = s[start]; s[start] = s[end]; s[end] = t;
        start++; end--;
    }
}
void reverseWords(char *s) {
    int len = strlen(s);
    reverseRange(s, 0, len - 1);       /* reverse entire string */
    int start = 0;
    for (int i = 0; i <= len; i++) {
        if (s[i] == ' ' || s[i] == '\0') {
            reverseRange(s, start, i - 1); /* reverse each word */
            start = i + 1;
        }
    }
}
/* "Hello World" → "World Hello" */
```
``n### First Non-Repeating Character
``n```c
char firstNonRepeating(const char *s) {
    int freq[256] = {0};
    for (int i = 0; s[i]; i++) freq[(unsigned char)s[i]]++;
    for (int i = 0; s[i]; i++)
        if (freq[(unsigned char)s[i]] == 1) return s[i];
    return '\0';
}
/* "aabcbd" → 'c' */
```
``n### String Rotation Check
``n```c
int isRotation(const char *s1, const char *s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    char doubled[200];
    strcpy(doubled, s1);
    strcat(doubled, s1);           /* s1+s1 contains ALL rotations! */
    return strstr(doubled, s2) != NULL;
}
/* "abcde" / "cdeab" → Rotation ✅ */
/* Trick: "abcdeabcde" contains "cdeab"! */
```
``n---
``n## ❓ 16.2 MCQ Problems
``n---
``n**MCQ 1:** n দৈর্ঘ্যের string এ মোট substring কতটি?
``n| Option | Answer |
|--------|--------|
| (a) n² | |
| (b) **n(n+1)/2** | ✅ |
| (c) 2ⁿ | |
| (d) n! | |
``n> Length 1: n, Length 2: n-1, ... Length n: 1 → Total = **n(n+1)/2**
``n---
``n**MCQ 2:** `char a[]="Hi"; char b[]="Hi"; a==b` result?
``n| Option | Answer |
|--------|--------|
| (a) 1 (true) | |
| (b) **0 (false)** | ✅ |
| (c) Error | |
| (d) Depends | |
``n> `==` compares **addresses**, not content! Different arrays = different addresses = **false!** Use `strcmp(a,b)==0`
``n---
``n**MCQ 3:** `"Hello\0World"` — `sizeof` vs `strlen`?
``n| Option | Answer |
|--------|--------|
| (a) 11, 11 | |
| (b) **12, 5** | ✅ |
| (c) 6, 5 | |
| (d) 12, 12 | |
``n> sizeof = 12 (all chars + final '\0'). strlen = **5** (stops at first '\0')
``n---
``n## 📝 16.3 Summary
``n- **Frequency array** `int freq[256]` = string problem এর **universal tool** — anagram, duplicate, count সব solve করে।
- **Palindrome**: two-pointer (left, right) approach — O(n)
- **Word reverse**: entire string reverse → each word reverse → O(n)
- **Rotation check**: s1+s1 concatenate → s2 খুঁজুন (strstr) — elegant O(n) trick
- **`==` দিয়ে string compare করবেন না!** Address compare হয়, content নয়। `strcmp()` ব্যবহার করুন।
``n---
---
``n---
``n## 🔗 Navigation
``n- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 03 — Functions — Deep Dive](03-functions-deep.md)
- ➡️ Next: [Chapter 05 — Pointers](05-pointers.md)
``n---
``n# 🇧🇩 Job Exam Special (Bangladesh Context)
``n> বিপিএসসি (BPSC), ব্যাংক আইটি এবং এ্যাসিস্ট্যান্ট প্রোগ্রামার পরীক্ষার বিগত বছরের প্রশ্নের লজিক ও সমাধান।
``n### Problem 01: Matrix Multiplication
**পরীক্ষা:** সোনালী ব্যাংক আইটি (২০২১), জনতা ব্যাংক আইটি (২০১৮)
``n<details>
<summary><b>💻 Solution in C</b></summary>
``n`c
#include `stdio.h`
``nint main() {
    int a[2][2] = {{1, 2}, {3, 4}}, b[2][2] = {{5, 6}, {7, 8}}, c[2][2] = {0};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                c[i][j] += a[i][k] * b[k][j];
``n    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%d ", c[i][j]);
        printf("\n");
    }
    return 0;
}
`
</details>
``n<details>
<summary><b>💻 Solution in C#</b></summary>
``n`csharp
using System;
``nclass Program {
    static void Main() {
        int[,] a = {{1, 2}, {3, 4}}, b = {{5, 6}, {7, 8}}, c = new int[2, 2];
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                for (int k = 0; k < 2; k++)
                    c[i, j] += a[i, k] * b[k, j];
        // Print output...
    }
}
`
</details>
``n<details>
<summary><b>💻 Solution in Java</b></summary>
``n`java
public class Main {
    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}}, b = {{5, 6}, {7, 8}}, c = new int[2][2];
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                for (int k = 0; k < 2; k++)
                    c[i][j] += a[i][k] * b[k][j];
    }
}
`
</details>
``n<details>
<summary><b>💻 Solution in Python</b></summary>
``n`python
import numpy as np
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
`c = np.dot(a, b)
print(c)
`
</details>
``n### Problem 02: Check if a string is Palindrome
**পরীক্ষা:** বিপিএসসি - এ্যাসিস্ট্যান্ট প্রোগ্রামার (২০২৩)
``n<details>
<summary><b>💻 Solution in C</b></summary>
``n`c
#include `stdio.h`
#include `string.h`
``nint main() {
    char str[] = "madam";
    int l = 0, h = strlen(str) - 1, isPalindrome = 1;
    while (h > l) {
        if (str[l++] != str[h--]) { isPalindrome = 0; break; }
    }
    printf(isPalindrome ? "Palindrome" : "Not Palindrome");
    return 0;
}
`
</details>
``n<details>
<summary><b>💻 Solution in Python</b></summary>
``n`python
s = "madam"
print("Palindrome" if s == s[::-1] else "Not Palindrome")
`
</details>
``n---
``n# ✍️ Written Questions
``n**Q1: What is Row-Major ordering in C?**
**Answer:** C ল্যাঙ্গুয়েজ মাল্টি-ডাইমেনশনাল অ্যারের এলিমেন্টগুলোকে মেমোরিতে লাইন বাই লাইন (একই রো এর সব এলিমেন্ট আগে) রাখে। একেই Row-Major অর্ডার বলে।
``n**Q2: Difference between 'A' and "A" in C?**
**Answer:** 'A' একটি ক্যারেক্টার লিটারাল (১ বাইট)। অন্যদিকে "A" একটি স্ট্রিং লিটারাল যাতে 'A' এবং এর শেষে একটি নাল ক্যারেক্টার (\0) থাকে (মোট ২ বাইট)।
``n**Q3: Why C doesn't provide array bound checking?**
**Answer:** C ল্যাঙ্গুয়েজ মূলত পারফরম্যান্স এবং স্পিডকে প্রাধান্য দেয়। বাউন্ড চেকিং করলে প্রতি বার অ্যাক্সেসের সময় ওভারহেড বাড়ত, তাই এই দায়িত্বটি প্রোগ্রামারের ওপর ছেড়ে দেওয়া হয়েছে।
``n# Chapter 07 — Math, Search & Sort — C Programming 💻
``n> Number system, series, digit manipulation, linear/binary search, basic sorts।
``n---
# LEVEL 8-9: MATH, SEARCH & SORT
``n*Number crunching, searching, sorting — algorithm fundamentals*
``n---
---
``n# Topic 26: Number System Conversion
``n<div align="center">
``n*"Decimal ↔ Binary ↔ Octal ↔ Hex — computer এর ভাষা বুঝতে হলে base conversion জানতেই হবে"*
``n</div>
``n---
``n## 📖 26.1 Number Systems Overview
``n```
┌──────────┬──────┬──────────┬──────────────────┐
│ System   │ Base │ Digits   │ C Prefix         │
├──────────┼──────┼──────────┼──────────────────┤
│ Binary   │  2   │ 0, 1     │ 0b (0b1010)      │
│ Octal    │  8   │ 0-7      │ 0  (012)         │
│ Decimal  │ 10   │ 0-9      │ none (10)        │
│ Hex      │ 16   │ 0-9, A-F │ 0x (0xA)         │
└──────────┴──────┴──────────┴──────────────────┘
``nQuick Table:
Dec │ Bin  │ Oct │ Hex
────┼──────┼─────┼────
 0  │ 0000 │  0  │  0
 5  │ 0101 │  5  │  5
 10 │ 1010 │ 12  │  A
 15 │ 1111 │ 17  │  F
 16 │10000 │ 20  │ 10
255 │11111111│377│ FF
```
``n---
``n## 💻 26.2 Conversion Functions
``n```c
#include `stdio.h`
``n/* ══════ Decimal → Binary (print) ══════ */
void decToBin(int n) {
    if (n == 0) { printf("0"); return; }
    int bits[32], count = 0;
    while (n > 0) {
        bits[count++] = n % 2;
        n /= 2;
    }
    for (int i = count - 1; i >= 0; i--)
        printf("%d", bits[i]);
}
/* 13 → 1101 */
``n/* ══════ Binary → Decimal ══════ */
int binToDec(long long bin) {
    int dec = 0, base = 1;
    while (bin > 0) {
        dec += (bin % 10) * base;
        base *= 2;
        bin /= 10;
    }
    return dec;
}
/* 1101 → 13 */
``n/* ══════ Decimal → Octal ══════ */
void decToOct(int n) {
    printf("%o", n);          /* built-in! */
}
``n/* ══════ Decimal → Hex ══════ */
void decToHex(int n) {
    printf("%X", n);          /* built-in! */
}
``n/* ══════ printf built-in conversions ══════ */
int main() {
    int n = 255;
    printf("Decimal: %d\n", n);     /* 255 */
    printf("Octal:   %o\n", n);     /* 377 */
    printf("Hex:     %X\n", n);     /* FF */
    printf("Hex(0x): %#x\n", n);    /* 0xff */
``n    return 0;
}
```
``n---
``n## ❓ 26.3 MCQ Problems
``n---
``n**MCQ 1:** Binary `1011` = Decimal?
``n| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **11** | ✅ |
| (c) 13 | |
| (d) 9 | |
``n> 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = **11**
``n---
``n**MCQ 2:** Decimal `25` = Binary?
``n| Option | Answer |
|--------|--------|
| (a) 10101 | |
| (b) **11001** | ✅ |
| (c) 10011 | |
| (d) 11010 | |
``n> 25÷2: 1,0,0,1,1 (bottom-up) → **11001**
``n---
``n**MCQ 3:** `0xFF` = Decimal?
``n| Option | Answer |
|--------|--------|
| (a) 16 | |
| (b) **255** | ✅ |
| (c) 15 | |
| (d) 256 | |
``n> F=15. 15×16+15 = 240+15 = **255**
``n---
``n**MCQ 4:** Octal `17` = Decimal?
``n| Option | Answer |
|--------|--------|
| (a) 17 | |
| (b) **15** | ✅ |
| (c) 14 | |
| (d) 8 | |
``n> 1×8 + 7×1 = **15**
``n---
``n## 📝 26.4 Summary
``n- **Binary** (base 2): computer এর native language। C prefix: `0b`। **Octal** (base 8): prefix `0`। **Hex** (base 16): prefix `0x`
``n- **Decimal → Binary:** বারবার 2 দিয়ে ভাগ, remainder নিচ থেকে পড়ুন। **Binary → Decimal:** প্রতিটি bit × 2^position
``n- **printf** built-in conversion: `%o`=octal, `%x`=hex, `%d`=decimal। `%#x` = "0x" prefix সহ
``n- **Quick trick:** 4-bit group = 1 hex digit। `1111` = F, `1010` = A। Binary ↔ Hex দ্রুত convert হয়
``n---
---
``n# Topic 27: Series & Sequences
``n<div align="center">
``n*"Series = pattern চিনে formula বের করো — exam এ সিরিজের sum ও nth term আসে"*
``n</div>
``n---
``n## 💻 27.1 Common Series
``n```c
#include `stdio.h`
``nint main() {
    int n = 10;
``n    /* ══════ Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13... ══════ */
    int a = 0, b = 1;
    printf("Fibonacci: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b; b = next;
    }
    printf("\n");
``n    /* ══════ AP: a, a+d, a+2d... ══════ */
    int first = 2, d = 3;
    printf("AP: ");
    for (int i = 0; i < n; i++)
        printf("%d ", first + i * d);    /* 2, 5, 8, 11... */
    printf("\n");
    /* Sum = n/2 * (2a + (n-1)d)  OR  n/2 * (first + last) */
``n    /* ══════ GP: a, a*r, a*r²... ══════ */
    float a_gp = 2, r = 3;
    printf("GP: ");
    float term = a_gp;
    for (int i = 0; i < 6; i++) {
        printf("%.0f ", term);          /* 2, 6, 18, 54... */
        term *= r;
    }
    printf("\n");
    /* Sum = a*(r^n - 1)/(r - 1) */
``n    /* ══════ Special: 1² + 2² + 3²... ══════ */
    int sumSq = 0;
    for (int i = 1; i <= n; i++) sumSq += i * i;
    printf("Sum of squares(10) = %d\n", sumSq);   /* 385 */
    /* Formula: n(n+1)(2n+1)/6 */
``n    /* ══════ Special: 1³ + 2³ + 3³... ══════ */
    int sumCube = 0;
    for (int i = 1; i <= n; i++) sumCube += i * i * i;
    printf("Sum of cubes(10) = %d\n", sumCube);     /* 3025 */
    /* Formula: [n(n+1)/2]² */
``n    /* ══════ Harmonic: 1 + 1/2 + 1/3 + 1/4... ══════ */
    float harmonic = 0;
    for (int i = 1; i <= n; i++) harmonic += 1.0f / i;
    printf("Harmonic(10) = %.4f\n", harmonic);      /* 2.9290 */
``n    return 0;
}
```
``n---
``n## 📖 27.2 Formula Sheet
``n```
┌─────────────────────┬─────────────────────────────────┐
│ Series              │ Sum Formula                     │
├─────────────────────┼─────────────────────────────────┤
│ 1+2+3+...+n        │ n(n+1)/2                        │
│ 1²+2²+...+n²       │ n(n+1)(2n+1)/6                  │
│ 1³+2³+...+n³       │ [n(n+1)/2]²                     │
│ AP sum              │ n/2 × (2a + (n-1)d)             │
│ GP sum              │ a(rⁿ - 1)/(r - 1)              │
│ AP nth term         │ a + (n-1)d                      │
│ GP nth term         │ a × r^(n-1)                     │
│ Fibonacci           │ F(n) = F(n-1) + F(n-2)         │
└─────────────────────┴─────────────────────────────────┘
```
``n---
``n## ❓ 27.3 MCQ Problems
``n---
``n**MCQ 1:** `1+2+3+...+100` = ?
``n| Option | Answer |
|--------|--------|
| (a) 5000 | |
| (b) **5050** | ✅ |
| (c) 10000 | |
| (d) 10100 | |
``n> n(n+1)/2 = 100×101/2 = **5050**
``n---
``n**MCQ 2:** AP: first=3, d=5, 10th term = ?
``n| Option | Answer |
|--------|--------|
| (a) 50 | |
| (b) **48** | ✅ |
| (c) 53 | |
| (d) 45 | |
``n> a + (n-1)d = 3 + 9×5 = 3+45 = **48**
``n---
``n**MCQ 3:** Fibonacci 7th term (0-indexed: F(7)) = ?
``n| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) **13** | ✅ |
| (c) 21 | |
| (d) 11 | |
``n> 0,1,1,2,3,5,8,**13** (index 0-7)
``n---
``n## 📝 27.4 Summary
``n- **AP:** nth term = `a + (n-1)d`, sum = `n/2 × (first + last)`। **GP:** nth term = `a × r^(n-1)`, sum = `a(rⁿ-1)/(r-1)`
``n- **Sum formulas মুখস্থ:** 1+2+...+n = `n(n+1)/2`, squares = `n(n+1)(2n+1)/6`, cubes = `[n(n+1)/2]²`
``n- **Fibonacci** iterative: O(n) time, O(1) space — exam এ iterative ই চাওয়া হয়। Recursive = O(2ⁿ) — avoid!
``n---
---
``n# Topic 28: Digit Manipulation
``n<div align="center">
``n*"সংখ্যার digit নিয়ে খেলা — reverse, sum, Armstrong, count"*
``n</div>
``n---
``n## 💻 28.1 Essential Digit Operations
``n```c
#include `stdio.h`
#include `math.h`
``nint main() {
    int num = 12345;
``n    /* ══════ Extract last digit ══════ */
    int lastDigit = num % 10;        /* 5 */
``n    /* ══════ Remove last digit ══════ */
    int withoutLast = num / 10;      /* 1234 */
``n    /* ══════ Count digits ══════ */
    int n = num, count = 0;
    while (n > 0) { count++; n /= 10; }
    printf("Digits: %d\n", count);    /* 5 */
``n    /* ══════ Sum of digits ══════ */
    n = num; int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    printf("Digit sum: %d\n", sum);   /* 15 */
``n    /* ══════ Reverse number ══════ */
    n = num; int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed: %d\n", reversed); /* 54321 */
``n    /* ══════ Palindrome check ══════ */
    int original = 12321;
    n = original; reversed = 0;
    while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }
    printf("%d is %spalindrome\n", original,
           (original == reversed) ? "" : "not "); /* palindrome! */
``n    return 0;
}
```
``n---
``n## 💻 28.2 Armstrong & Special Numbers
``n```c
/* ══════ Armstrong: sum of digits^n = number ══════ */
/* 153 = 1³ + 5³ + 3³ = 1+125+27 = 153 ✅ */
int isArmstrong(int num) {
    int original = num, sum = 0;
    int digits = 0, n = num;
    while (n > 0) { digits++; n /= 10; }
``n    n = num;
    while (n > 0) {
        int d = n % 10;
        sum += (int)pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
/* Armstrong numbers: 1,2,...,9, 153, 370, 371, 407, 1634... */
``n/* ══════ Strong Number: sum of digit factorials = number ══════ */
/* 145 = 1! + 4! + 5! = 1+24+120 = 145 ✅ */
int factorial(int n) {
    int f = 1;
    for (int i = 2; i <= n; i++) f *= i;
    return f;
}
int isStrong(int num) {
    int sum = 0, n = num;
    while (n > 0) { sum += factorial(n % 10); n /= 10; }
    return sum == num;
}
``n/* ══════ Automorphic: n² ends with n ══════ */
/* 5² = 25 (ends with 5), 76² = 5776 (ends with 76) */
int isAutomorphic(int n) {
    int sq = n * n;
    while (n > 0) {
        if (n % 10 != sq % 10) return 0;
        n /= 10; sq /= 10;
    }
    return 1;
}
```
``n---
``n## ❓ 28.3 MCQ Problems
``n---
``n**MCQ 1:** `num % 10` কী দেয়?
``n| Option | Answer |
|--------|--------|
| (a) First digit | |
| (b) **Last digit** | ✅ |
| (c) Digit count | |
| (d) Digit sum | |
``n---
``n**MCQ 2:** 153 কি Armstrong number?
``n| Option | Answer |
|--------|--------|
| (a) **হ্যাঁ (1³+5³+3³ = 153)** | ✅ |
| (b) না | |
| (c) Depends | |
| (d) শুধু 2-digit এ | |
``n---
``n**MCQ 3:** 121 reverse করলে কত?
``n| Option | Answer |
|--------|--------|
| (a) 112 | |
| (b) **121 (palindrome!)** | ✅ |
| (c) 211 | |
| (d) 12 | |
``n---
``n**MCQ 4:** `num / 10` কী করে?
``n| Option | Answer |
|--------|--------|
| (a) First digit দেয় | |
| (b) **Last digit সরায়** | ✅ |
| (c) 10 দিয়ে গুণ | |
| (d) Decimal দেয় | |
``n---
``n## 📝 28.4 Summary
``n- **Two magic operations:** `num % 10` = **last digit** extract, `num / 10` = last digit **remove**। এই দুটো দিয়ে সব digit problem solve হয়
``n- **Reverse number:** `reversed = reversed * 10 + num % 10; num /= 10;` — loop শেষে reversed পাওয়া যায়
``n- **Palindrome:** reverse == original? Armstrong: digit^n sum == original? Strong: digit! sum == original?
``n- **Digit count:** `while(n>0) { count++; n/=10; }`। ⚠️ n=0 হলে count=0 — special case handle!
``n---
---
``n# Topic 29: Linear Search & Binary Search
``n<div align="center">
``n*"Search = data খোঁজা — Linear হলো সহজ, Binary হলো দ্রুত"*
``n</div>
``n---
``n## 💻 29.1 Linear Search — O(n)
``n```c
/* ══════ Simple: check every element ══════ */
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target)
            return i;          /* found! return index */
    return -1;                 /* not found */
}
``n/* ⚡ Works on: sorted OR unsorted array
   ⚡ Time: O(n) — worst case check all elements
   ⚡ Space: O(1) */
```
``n---
``n## 💻 29.2 Binary Search — O(log n)
``n```c
/* ══════ Iterative (preferred!) ══════ */
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
``n    while (low <= high) {
        int mid = low + (high - low) / 2;  /* ⚡ avoids overflow! */
``n        if (arr[mid] == target) return mid;      /* found! */
        else if (arr[mid] < target) low = mid + 1;   /* right half */
        else high = mid - 1;                          /* left half */
    }
    return -1;  /* not found */
}
``n/* ══════ Recursive ══════ */
int binarySearchRec(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
``n    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, mid + 1, high, target);
    return binarySearchRec(arr, low, mid - 1, target);
}
``n/* ⚡ REQUIRES: SORTED array!
   ⚡ Time: O(log n) — halves search space each step
   ⚡ Space: O(1) iterative, O(log n) recursive */
```
``n```
Binary Search Visualization:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23
``nStep 1: low=0, high=9, mid=4 → arr[4]=16 < 23 → low=5
Step 2: low=5, high=9, mid=7 → arr[7]=56 > 23 → high=6
Step 3: low=5, high=6, mid=5 → arr[5]=23 = 23 → FOUND! index 5
``nOnly 3 steps for 10 elements! (log₂10 ≈ 3.3)
```
``n---
``n## 📖 29.3 Comparison
``n```
┌──────────────┬──────────────┬──────────────┐
│ Feature      │ Linear       │ Binary       │
├──────────────┼──────────────┼──────────────┤
│ Sorted needed│ ❌ No        │ ✅ Yes!       │
│ Time (worst) │ O(n)         │ O(log n)     │
│ Time (best)  │ O(1)         │ O(1)         │
│ Space        │ O(1)         │ O(1) iter    │
│ 1000 elements│ ~1000 checks │ ~10 checks!  │
│ 1M elements  │ ~1M checks   │ ~20 checks!  │
└──────────────┴──────────────┴──────────────┘
```
``n---
``n## ❓ 29.4 MCQ Problems
``n---
``n**MCQ 1:** Binary search এর prerequisite কী?
``n| Option | Answer |
|--------|--------|
| (a) Array must be large | |
| (b) **Array must be SORTED** | ✅ |
| (c) Array must have no duplicates | |
| (d) কোনো prerequisite নেই | |
``n---
``n**MCQ 2:** 1024 elements এ binary search → max কতবার compare?
``n| Option | Answer |
|--------|--------|
| (a) 1024 | |
| (b) 512 | |
| (c) **10** | ✅ |
| (d) 100 | |
``n> log₂(1024) = **10**
``n---
``n**MCQ 3:** `mid = (low + high) / 2` এর সমস্যা কী?
``n| Option | Answer |
|--------|--------|
| (a) কোনো সমস্যা নেই | |
| (b) **Integer overflow possible!** | ✅ |
| (c) Slower | |
| (d) Wrong result | |
``n> low+high overflow হতে পারে! Fix: `mid = low + (high - low) / 2`
``n---
``n**MCQ 4:** Unsorted array তে কোন search ব্যবহার করবেন?
``n| Option | Answer |
|--------|--------|
| (a) Binary | |
| (b) **Linear** | ✅ |
| (c) উভয়ই | |
| (d) কোনোটাই না | |
``n> Binary search **sorted array** এ কাজ করে! Unsorted → **linear** only
``n---
``n## 📝 29.5 Summary
``n- **Linear search:** O(n), unsorted/sorted দুটোতেই কাজ করে। Simple but slow for large data
``n- **Binary search:** O(log n), **sorted array mandatory!** প্রতি step এ search space **অর্ধেক** হয়। 1M elements → মাত্র ~20 comparisons!
``n- **mid calculation:** `mid = low + (high-low)/2` ব্যবহার করুন — `(low+high)/2` **overflow** হতে পারে!
``n- Binary search **iterative** version preferred — recursive এ O(log n) stack space লাগে
``n---
---
``n# Topic 30: Bubble Sort, Selection Sort, Insertion Sort
``n<div align="center">
``n*"Sorting = data সাজানো — exam এ algorithm, complexity, ও trace জিজ্ঞেস করা হয়"*
``n</div>
``n---
``n## 💻 30.1 Bubble Sort — O(n²)
``n```c
/* ══════ Adjacent elements compare & swap ══════ */
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {  /* ⚡ n-i-1: already sorted! */
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;   /* ⚡ early exit: already sorted! */
    }
}
``n/* Pass 1: largest element → end
   Pass 2: 2nd largest → 2nd last
   ...continues until sorted */
```
``n```
Trace: [64, 34, 25, 12, 22]
Pass 1: [34,25,12,22,64]  ← 64 bubbled to end
Pass 2: [25,12,22,34,64]  ← 34 in place
Pass 3: [12,22,25,34,64]  ← sorted!
(early exit — no swaps needed in pass 4)
```
``n---
``n## 💻 30.2 Selection Sort — O(n²)
``n```c
/* ══════ Find min, swap to front ══════ */
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx])
                minIdx = j;
``n        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}
``n/* Pass 1: find min → swap to index 0
   Pass 2: find min in remaining → swap to index 1
   ...continues */
```
``n---
``n## 💻 30.3 Insertion Sort — O(n²)
``n```c
/* ══════ Insert each element into sorted portion ══════ */
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];   /* shift right */
            j--;
        }
        arr[j + 1] = key;          /* insert at correct position */
    }
}
``n/* ⚡ Best for: nearly sorted data → O(n) best case!
   ⚡ Stable sort (preserves equal elements' order)
   ⚡ Online sort (can sort as data arrives) */
```
``n---
``n## 📖 30.4 Comparison Table
``n```
┌──────────────┬──────────┬──────────┬──────────┬────────┬────────┐
│ Algorithm    │ Best     │ Average  │ Worst    │ Stable │ Space  │
├──────────────┼──────────┼──────────┼──────────┼────────┼────────┤
│ Bubble       │ O(n)     │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
│ Selection    │ O(n²)    │ O(n²)   │ O(n²)   │ ❌ No   │ O(1)   │
│ Insertion    │ O(n) ⚡  │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
└──────────────┴──────────┴──────────┴──────────┴────────┴────────┘
``n⚡ Insertion sort best case O(n) — nearly sorted data তে fastest!
⚡ Selection sort — minimum number of SWAPS (useful when swap costly)
⚡ Bubble sort — simplest to understand, worst practical performance
```
``n---
``n## ❓ 30.5 MCQ Problems
``n---
``n**MCQ 1:** Bubble sort এর best case complexity?
``n| Option | Answer |
|--------|--------|
| (a) O(n²) | |
| (b) **O(n)** | ✅ |
| (c) O(n log n) | |
| (d) O(1) | |
``n> Already sorted + **swapped flag** → 1 pass, no swaps → **O(n)**
``n---
``n**MCQ 2:** কোন sort এ minimum number of swaps হয়?
``n| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) **Selection** | ✅ |
| (c) Insertion | |
| (d) সবাই equal | |
``n> Selection sort: প্রতি pass এ **সর্বোচ্চ 1 swap** (min element কে swap)
``n---
``n**MCQ 3:** Nearly sorted data তে কোন sort সবচেয়ে ভালো?
``n| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) Selection | |
| (c) **Insertion** | ✅ |
| (d) সবাই equal | |
``n> Insertion sort nearly sorted → **O(n)** (best case!)
``n---
``n**MCQ 4:** কোনটি stable sort?
``n| Option | Answer |
|--------|--------|
| (a) Selection | |
| (b) **Bubble ও Insertion দুটোই** | ✅ |
| (c) শুধু Bubble | |
| (d) কোনোটাই না | |
``n> Stable = equal elements এর relative order preserve। Bubble ✅, Insertion ✅, Selection ❌
``n---
``n**MCQ 5:** তিনটি sort এর space complexity?
``n| Option | Answer |
|--------|--------|
| (a) O(n) | |
| (b) **O(1) সবগুলো** | ✅ |
| (c) O(n²) | |
| (d) O(log n) | |
``n> তিনটিই **in-place** — extra array লাগে না → O(1) space
``n---
``n## 📝 30.6 Summary
``n- **Bubble sort:** adjacent elements compare ও swap করে। বড় element ধীরে ধীরে "bubble up"। `swapped` flag দিলে best case **O(n)** (already sorted detection)। Simplest but slowest practically
``n- **Selection sort:** প্রতি pass এ **minimum** element খুঁজে front এ swap করে। Swap count **minimum** (per pass max 1)। Swap costly হলে best choice। **Not stable!**
``n- **Insertion sort:** প্রতিটি element কে sorted portion এ correct position এ **insert** করে। **Nearly sorted data** তে **O(n)** — best among three! **Stable ও online** (streaming data sort possible)
``n- তিনটিই **O(n²)** average/worst, **O(1)** space (in-place)। বড় data (n > 10000) এ **merge sort** বা **quick sort** (O(n log n)) ব্যবহার করুন
``n- **Stable sort** = equal value elements এর original **relative order preserve** করে। Bubble ✅, Insertion ✅, Selection ❌
``n---
---
``n---
``n## 🔗 Navigation
``n- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 06 — Structures, Unions & File I/O](06-structures-unions.md)
- ➡️ Next: [Chapter 08 — Data Structures & Advanced](08-data-structures-advanced.md)
``n