# Chapter 04 — Arrays & Strings — C Programming 💻

> 1D / 2D array, matrix, string basics, advanced string problems।

---
# LEVEL 4: ARRAYS & STRINGS

*Data collection — একই type এর অনেক data একটি নামে manage করা*


---
---

# Topic 13: 1D Array

<div align="center">

*"Array = contiguous memory তে same type এর data collection, 0-indexed"*

</div>

---

## 📖 13.1 ধারণা (Concept)

```
int arr[5] = {10, 20, 30, 40, 50};

Memory Layout:
Index:    [0]    [1]    [2]    [3]    [4]
        ┌──────┬──────┬──────┬──────┬──────┐
Value:  │  10  │  20  │  30  │  40  │  50  │
        └──────┴──────┴──────┴──────┴──────┘
Address: 1000   1004   1008   1012   1016

⚡ Index starts from 0!
⚡ arr[5] → OUT OF BOUNDS! (UB, no error in C)
⚡ sizeof(arr) = 5 × 4 = 20 bytes
⚡ Element count = sizeof(arr) / sizeof(arr[0]) = 5
```

---

## 💻 13.2 Declaration & Initialization

```c
int a[5] = {10, 20, 30, 40, 50};  /* full init */
int b[5] = {10, 20};              /* partial: {10,20,0,0,0} */
int c[5] = {0};                   /* all zeros: {0,0,0,0,0} */
int d[] = {10, 20, 30};           /* auto size: 3 elements */
int e[5] = {[0]=5, [3]=30};       /* designated (C99): {5,0,0,30,0} */

int f[5];                          /* ⚠️ local: GARBAGE values! */
static int g[5];                   /* ✅ static: all zeros */
```

> **Partial init rule:** explicitly initialized হলে বাকি = **0**। কিন্তু **uninitialized local** array = **garbage!**

---

## 💻 13.3 Array & Pointer Relationship

```c
/* arr[i] = *(arr + i) = *(i + arr) = i[arr] — ALL IDENTICAL! */

int arr[] = {10, 20, 30};
printf("%d\n", arr[1]);       /* 20 */
printf("%d\n", *(arr + 1));   /* 20 */
printf("%d\n", 1[arr]);       /* 20 ⚠️ valid! */

/* Array name = constant pointer to first element */
/* arr = &arr[0] */
/* arr++ → ❌ Error! arr is NOT modifiable */
/* int *p = arr; p++ → ✅ pointer variable is modifiable */
```

---

## 💻 13.4 Array in Function — Decay to Pointer

```c
void printArr(int arr[], int size) {
    /* ⚠️ sizeof(arr) = 4/8 (POINTER size, NOT array size!) */
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);

    arr[0] = 999;  /* ⚠️ ORIGINAL array modified! */
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);  /* 5 (correct in main) */
    printArr(arr, size);  /* must pass size separately! */
    printf("\narr[0] = %d\n", arr[0]);  /* 999 — changed! */
}
```

---

## ❓ 13.5 MCQ Problems

---

**MCQ 1:** `int arr[5] = {1, 2};` — `arr[3]` এর value?

| Option | Answer |
|--------|--------|
| (a) Garbage | |
| (b) **0** | ✅ |
| (c) 2 | |
| (d) Error | |

> Partial init: বাকি = **0**

---

**MCQ 2:** `arr[2]` ও `2[arr]` — সম্পর্ক?

| Option | Answer |
|--------|--------|
| (a) শুধু arr[2] valid | |
| (b) শুধু 2[arr] valid | |
| (c) **দুটোই identical** | ✅ |
| (d) দুটোই ভুল | |

> `arr[2]` = `*(arr+2)` = `*(2+arr)` = `2[arr]`

---

**MCQ 3:** Function এ array pass করলে `sizeof(arr)` কত?

| Option | Answer |
|--------|--------|
| (a) Array total bytes | |
| (b) Element count | |
| (c) **Pointer size (4 or 8)** | ✅ |
| (d) Error | |

> Array → pointer decay! sizeof = pointer size, NOT array size

---

**MCQ 4:** নিচের কোডে কী হবে?
```c
int arr[3] = {1,2,3};
arr = {4,5,6};
```

| Option | Answer |
|--------|--------|
| (a) arr updated | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) arr unchanged | |

> Array **re-assignment impossible!** Initializer শুধু declaration এ কাজ করে

---

**MCQ 5:** `int arr[] = {10,20,30,40}; int *p = arr+3; p[-1]` = ?

| Option | Answer |
|--------|--------|
| (a) 20 | |
| (b) **30** | ✅ |
| (c) 40 | |
| (d) Error | |

> p = &arr[3], p[-1] = *(p-1) = arr[2] = **30**

---

## 📝 13.6 Summary

- Array = **same type**, **contiguous memory**, **0-indexed**। `arr[5]` = 5 elements: index 0 to 4।

- **Partial init** → বাকি **0**; `{0}` = সব 0; **uninitialized local = garbage!**

- **`arr[i]` = `*(arr+i)` = `i[arr]`** — সব identical! Array name = &arr[0] (constant pointer)।

- **sizeof(arr)** main এ = total bytes; function এ = **pointer size** (4/8)! Size আলাদা pass করুন।

- Function এ array = **pointer** pass → modify করলে **original** ও change হয়! Protection: `const int arr[]`

- **Out of bounds** access → C তে **কোনো error নেই**, কিন্তু **Undefined Behavior!**

---
---

# Topic 14: 2D Array & Matrix Operations

<div align="center">

*"2D Array = array of arrays = matrix = table of rows and columns"*

</div>

---

## 📖 14.1 ধারণা (Concept)

```
int m[3][4] — 3 rows × 4 columns

         Col0  Col1  Col2  Col3
Row 0  [  1     2     3     4  ]
Row 1  [  5     6     7     8  ]
Row 2  [  9    10    11    12  ]

Memory (Row-Major — C default):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
     Row 0          Row 1           Row 2

Size: rows = sizeof(m)/sizeof(m[0])       = 3
      cols = sizeof(m[0])/sizeof(m[0][0]) = 4
```

---

## 💻 14.2 Declaration & Function Parameter

```c
/* ═══ Declaration ═══ */
int a[2][3] = {{1,2,3}, {4,5,6}};     /* nested init */
int b[2][3] = {1,2,3,4,5,6};          /* flat init (same!) */
int c[][3]  = {{1,2,3}, {4,5,6}};     /* row auto, column MUST specify! */
/* int d[2][] = {...};  ← ❌ Error! column size MANDATORY! */

/* ═══ Function parameter — column size REQUIRED! ═══ */
void print(int m[][4], int rows) { }   /* ✅ */
void print(int (*m)[4], int rows) { }  /* ✅ same thing */
/* void print(int m[][], int r, int c); ← ❌ Error! */
/* void print(int **m, int r, int c);   ← ❌ int** ≠ int[][N]! */
```

---

## 💻 14.3 Matrix Multiplication — Exam Classic

```c
/* A[m×n] × B[n×p] = C[m×p] — n MUST match! */

void multiply(int A[][3], int B[][2], int C[][2], int m, int n, int p) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < p; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
        }
}
/* Triple nested loop: i(rows A), j(cols B), k(common dimension) */
```

---

## 💻 14.4 Pointer & 2D Array

```c
int m[3][4];

/* Type hierarchy: */
/* m       → int (*)[4]   (pointer to row of 4 ints)     */
/* m[i]    → int *         (pointer to element)           */
/* m[i][j] → int           (value)                        */

/* m + 1    → skips ENTIRE ROW (16 bytes for int[4])      */
/* m[0] + 1 → skips ONE ELEMENT (4 bytes)                 */

/* Access: m[i][j] = *(*(m+i)+j) = *(m[i]+j)             */
```

---

## ❓ 14.5 MCQ Problems

---

**MCQ 1:** `int a[2][3] = {1,2,3,4,5,6}; a[1][1]` = ?

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **5** | ✅ |
| (c) 2 | |
| (d) Error | |

> Flat init: Row0={1,2,3}, Row1={4,5,6}। a[1][1] = **5**

---

**MCQ 2:** `int a[2][3] = {{1,2},{4}};` — `a[1][1]` = ?

| Option | Answer |
|--------|--------|
| (a) 4 | |
| (b) **0** | ✅ |
| (c) Garbage | |
| (d) 2 | |

> Partial: Row0={1,2,**0**}, Row1={4,**0**,0}। a[1][1] = **0**

---

**MCQ 3:** 2D array function parameter এ কোনটি mandatory?

| Option | Answer |
|--------|--------|
| (a) Row size | |
| (b) **Column size** | ✅ |
| (c) দুটোই | |
| (d) কোনোটাই না | |

---

**MCQ 4:** `int m[3][3]; *(*(m+1)+2)` = ?

| Option | Answer |
|--------|--------|
| (a) m[2][1] | |
| (b) **m[1][2]** | ✅ |
| (c) m[1][1] | |
| (d) Error | |

> `*(m+1)` = m[1], `*(m[1]+2)` = m[1][2]

---

## 📝 14.6 Summary

- 2D Array = **rows × columns**, **row-major** order এ memory তে store। **Column size mandatory** — row omit করা যায়।

- **`int**` ≠ `int[][N]`!** Dynamic 2D (pointer-to-pointer) ও static 2D array **সম্পূর্ণ ভিন্ন** memory layout।

- **m+1** = next **row** (big jump), **m[0]+1** = next **element** (small jump) — exam এ আসে।

- **Matrix multiply:** A[m×n] × B[n×p] = C[m×p]। Triple loop (i, j, k)। **n must match!**

- **Transpose:** `t[j][i] = m[i][j]`। In-place: **j = i+1** থেকে শুরু (double-swap prevent)।

---
---

# Topic 15: String Basics

<div align="center">

*"C তে string = null-terminated char array — '\0' ই string এর প্রাণ"*

</div>

---

## 📖 15.1 ধারণা (Concept)

```
char name[] = "Hello";

Memory:
Index:  [0]  [1]  [2]  [3]  [4]  [5]
       ┌────┬────┬────┬────┬────┬────┐
Value: │ 'H'│ 'e'│ 'l'│ 'l'│ 'o'│'\0'│
       └────┴────┴────┴────┴────┴────┘

⚡ "Hello" = 5 chars + 1 null = 6 BYTES total!
⚡ sizeof("Hello") = 6 (includes '\0')
⚡ strlen("Hello") = 5 (excludes '\0')
```

---

## 💻 15.2 char[] vs char* — Critical Difference!

```c
char arr[] = "Hello";   /* Array COPY — modifiable! ✅ */
char *ptr  = "Hello";   /* Pointer to LITERAL — READ-ONLY! ⚠️ */

arr[0] = 'J';           /* ✅ "Jello" */
/* ptr[0] = 'J';        ← ❌ UB! string literal read-only! */

/* sizeof difference: */
printf("%lu\n", sizeof(arr));  /* 6 (array size) */
printf("%lu\n", sizeof(ptr));  /* 4/8 (pointer size!) */
```

> **Golden Rule:** `char s[]` = modifiable copy, `char *s` = read-only pointer to literal!

---

## 💻 15.3 Input Methods

```c
char name[50];

/* ══════ scanf %s — STOPS AT WHITESPACE! ══════ */
scanf("%s", name);
/* "John Doe" → name = "John" ONLY! ⚠️ */

/* ══════ fgets — reads FULL LINE (BEST!) ══════ */
fgets(name, 50, stdin);
/* ⚠️ includes '\n'! Remove: */
name[strcspn(name, "\n")] = '\0';

/* ══════ scanf scanset ══════ */
scanf(" %[^\n]", name);   /* reads until newline */
```

```
┌──────────────┬──────────┬──────────┬──────────────┐
│ Method       │ Spaces?  │ Safe?    │ '\n' in str? │
├──────────────┼──────────┼──────────┼──────────────┤
│ scanf("%s")  │ ❌ stops │ ⚠️        │ ❌            │
│ fgets()      │ ✅ reads │ ✅ safe   │ ⚠️ includes!  │
│ gets()       │ ✅       │ ❌ NEVER! │ ❌            │
└──────────────┴──────────┴──────────┴──────────────┘
```

---

## 💻 15.4 Essential String Functions (string.h)

```c
#include <string.h>

strlen(s)           /* length (excluding '\0') */
strcpy(dest, src)   /* copy src → dest */
strcat(dest, src)   /* append src to end of dest */
strcmp(s1, s2)      /* compare: 0=equal, <0 s1 first, >0 s2 first */
strchr(s, c)        /* find first occurrence of char c */
strstr(hay, needle) /* find substring */
strncpy(d, s, n)    /* copy max n chars ⚠️ may NOT null-terminate! */
strtok(s, delim)    /* tokenize ⚠️ modifies original string! */
```

> **strcmp return:** 0 = **equal**, negative = s1 comes first, positive = s2 comes first। `==` দিয়ে string compare **করবেন না!** (address compare হয়)

---

## 💻 15.5 Implement strlen & strcpy with Pointer

```c
int myStrlen(const char *s) {
    const char *start = s;
    while (*s) s++;
    return s - start;
}

char* myStrcpy(char *dest, const char *src) {
    char *d = dest;
    while ((*d++ = *src++));   /* copy + advance + check '\0' */
    return dest;
}
```

---

## ❓ 15.6 MCQ Problems

---

**MCQ 1:** `char s[] = "Hello"; sizeof(s)` vs `strlen(s)` ?

| Option | Answer |
|--------|--------|
| (a) 5, 5 | |
| (b) **6, 5** | ✅ |
| (c) 6, 6 | |
| (d) 5, 6 | |

> sizeof includes '\0' → **6**। strlen excludes → **5**

---

**MCQ 2:** `char *s = "Hello"; s[0] = 'J';` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) "Jello" | |
| (b) "Hello" | |
| (c) **UB / Crash** | ✅ |
| (d) Error | |

> `char *s` = pointer to **read-only** literal। Modify = **UB!**

---

**MCQ 3:** `printf("%d", strcmp("abc","abc"))` এর output?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) **0** | ✅ |
| (c) -1 | |
| (d) true | |

> Equal strings → strcmp returns **0**!

---

**MCQ 4:** `char s[] = "Hello\0World"; strlen(s)` = ?

| Option | Answer |
|--------|--------|
| (a) 11 | |
| (b) 10 | |
| (c) **5** | ✅ |
| (d) Error | |

> `'\0'` = null terminator → strlen **stops** → **5**। "World" invisible!

---

**MCQ 5:** নিচের কোডে কী হবে?
```c
char s[20]; s = "Hello";
```

| Option | Answer |
|--------|--------|
| (a) s = "Hello" | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) s empty | |

> Array **assignment impossible!** `strcpy(s, "Hello")` ব্যবহার করুন

---

**MCQ 6:** `scanf("%s", name)` — "John Doe" input দিলে name = ?

| Option | Answer |
|--------|--------|
| (a) "John Doe" | |
| (b) **"John"** | ✅ |
| (c) "Doe" | |
| (d) Error | |

> scanf %s whitespace এ **stop** করে!

---

## 📝 15.7 Summary

- C তে string = **null-terminated char array** (`'\0'` দিয়ে শেষ)। **sizeof** includes '\0', **strlen** excludes — buffer = `strlen + 1`।

- **`char s[]`** = modifiable array copy; **`char *s`** = read-only pointer to literal! `s[0] = 'X'` → array ✅, pointer ❌ (UB)। এই পার্থক্য exam এ **সবচেয়ে বেশি** আসে।

- **scanf("%s")** whitespace এ stop করে — "John Doe" → শুধু "John"। Full line পড়তে **fgets()** best, তবে **'\n' include** করে — remove করতে হয়।

- **strcmp()** = 0 মানে **equal**। `==` দিয়ে string compare **করবেন না** — address compare হয়, content নয়!

- **strncpy** n chars copy করে কিন্তু **null terminate নাও করতে পারে** — manual '\0' দিতে হয়। **strtok** original string **modify** করে — delimiter '\0' দিয়ে replace হয়।

- Declaration পরে **`s = "Hello"` illegal!** — `strcpy(s, "Hello")` ব্যবহার বাধ্যতামূলক।

- **`"Hello\0World"`** — '\0' string functions কে **stop** করে। strlen = 5, sizeof = 12। "World" invisible but memory তে আছে।

---
---

<div align="center">

## পরবর্তী অধ্যায়

**Topic 16-20:** String Problems, Pointer Basics, Pointer+Array, Double Pointer & Function Pointer, Dynamic Memory

*Topic 16-20: String Problems, Pointers, Dynamic Memory — নিচে দেখুন*

</div>

---
---

# Topic 16: String Problems (Advanced)

<div align="center">

*"String manipulation = interview ও exam এর হাতিয়ার"*

</div>

---

## 📖 16.1 Essential String Algorithms

### Palindrome Check

```c
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

### Anagram Check (Frequency Array)

```c
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

### Reverse Words in String

```c
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

### First Non-Repeating Character

```c
char firstNonRepeating(const char *s) {
    int freq[256] = {0};
    for (int i = 0; s[i]; i++) freq[(unsigned char)s[i]]++;
    for (int i = 0; s[i]; i++)
        if (freq[(unsigned char)s[i]] == 1) return s[i];
    return '\0';
}
/* "aabcbd" → 'c' */
```

### String Rotation Check

```c
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

---

## ❓ 16.2 MCQ Problems

---

**MCQ 1:** n দৈর্ঘ্যের string এ মোট substring কতটি?

| Option | Answer |
|--------|--------|
| (a) n² | |
| (b) **n(n+1)/2** | ✅ |
| (c) 2ⁿ | |
| (d) n! | |

> Length 1: n, Length 2: n-1, ... Length n: 1 → Total = **n(n+1)/2**

---

**MCQ 2:** `char a[]="Hi"; char b[]="Hi"; a==b` result?

| Option | Answer |
|--------|--------|
| (a) 1 (true) | |
| (b) **0 (false)** | ✅ |
| (c) Error | |
| (d) Depends | |

> `==` compares **addresses**, not content! Different arrays = different addresses = **false!** Use `strcmp(a,b)==0`

---

**MCQ 3:** `"Hello\0World"` — `sizeof` vs `strlen`?

| Option | Answer |
|--------|--------|
| (a) 11, 11 | |
| (b) **12, 5** | ✅ |
| (c) 6, 5 | |
| (d) 12, 12 | |

> sizeof = 12 (all chars + final '\0'). strlen = **5** (stops at first '\0')

---

## 📝 16.3 Summary

- **Frequency array** `int freq[256]` = string problem এর **universal tool** — anagram, duplicate, count সব solve করে।
- **Palindrome**: two-pointer (left, right) approach — O(n)
- **Word reverse**: entire string reverse → each word reverse → O(n)
- **Rotation check**: s1+s1 concatenate → s2 খুঁজুন (strstr) — elegant O(n) trick
- **`==` দিয়ে string compare করবেন না!** Address compare হয়, content নয়। `strcmp()` ব্যবহার করুন।

---
---


---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 03 — Functions — Deep Dive](03-functions-deep.md)
- ➡️ Next: [Chapter 05 — Pointers](05-pointers.md)
