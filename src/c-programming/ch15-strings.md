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
---
---
