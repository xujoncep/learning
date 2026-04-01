# Topic 35: Preprocessor Directives

<div align="center">

*"Preprocessor = compilation এর আগে code transform — #define, #include, #ifdef"*

</div>

---

## 💻 35.1 Essential Directives

```c
/* ══════ #include — header file include ══════ */
#include <stdio.h>       /* system header (< >) */
#include "myheader.h"    /* user header (" ") */

/* ══════ #define — macro ══════ */
#define PI 3.14159
#define MAX(a,b) ((a)>(b)?(a):(b))    /* ⚡ bracket everything! */
#define SQUARE(x) ((x)*(x))

/* ══════ #ifdef / #ifndef — conditional compilation ══════ */
#ifndef MYHEADER_H         /* include guard — prevent double include! */
#define MYHEADER_H
/* header content here */
#endif

/* ══════ #if / #elif / #else / #endif ══════ */
#define DEBUG 1
#if DEBUG
    printf("Debug mode ON\n");
#else
    printf("Release mode\n");
#endif

/* ══════ Predefined macros ══════ */
printf("File: %s\n", __FILE__);
printf("Line: %d\n", __LINE__);
printf("Date: %s\n", __DATE__);
printf("Time: %s\n", __TIME__);
printf("Function: %s\n", __func__);   /* C99 */

/* ══════ Stringize (#) and Token Paste (##) ══════ */
#define STR(x) #x               /* STR(hello) → "hello" */
#define CONCAT(a,b) a##b        /* CONCAT(var,1) → var1 */
```

---

## ❓ 35.2 MCQ Problems

---

**MCQ 1:** `#define SQ(x) x*x` — `SQ(2+3)` = ?

| Option | Answer |
|--------|--------|
| (a) 25 | |
| (b) **11** | ✅ |
| (c) 10 | |
| (d) Error | |

> Text replace: `2+3*2+3` = 2+6+3 = **11** ❌। Fix: `((x)*(x))` → 25

---

**MCQ 2:** `#include <file>` vs `#include "file"` পার্থক্য?

| Option | Answer |
|--------|--------|
| (a) একই | |
| (b) **<> = system path, "" = local path first** | ✅ |
| (c) <> faster | |
| (d) "" for C++ only | |

---

**MCQ 3:** Include guard (`#ifndef`) কেন ব্যবহার হয়?

| Option | Answer |
|--------|--------|
| (a) Speed | |
| (b) **Same header double include prevent** | ✅ |
| (c) Syntax requirement | |
| (d) Memory save | |

---

## 📝 35.3 Summary

- **`#define`** = text replacement (no type check!)। Macro parameter এ **সবসময় bracket** দিন: `((x)*(x))`

- **Include guard** (`#ifndef`/`#define`/`#endif`) = same header **double include prevent** — every header এ mandatory

- **Predefined macros:** `__FILE__`, `__LINE__`, `__DATE__`, `__TIME__`, `__func__` — debugging এ useful

- **`#` (stringize):** `#x` → `"x"` (string)। **`##` (token paste):** `a##b` → `ab` (concat identifiers)

---
---
