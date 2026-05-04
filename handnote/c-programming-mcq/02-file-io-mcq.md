# File I/O, CLI & Preprocessor — MCQ Practice

> **Exam context:** Bangladesh Bank IT / AME / Programmer পরীক্ষায় File Handling, Command Line Arguments এবং Preprocessor Macros থেকে এই ধরনের প্রশ্ন আসে। প্রতিটা প্রশ্নে ব্যাখ্যা দেওয়া আছে — শুধু উত্তর মুখস্থ না করে কারণটা বোঝো।

**মোট প্রশ্ন:** ১০টা  
**বিভাগ:** File Handling (Q1–Q9) · Preprocessor Macro (Q10)

---

## 📁 File Handling MCQ

**Q1. ফাইলে স্ট্রিং রাইট করার জন্য নিচের কোন ফাংশনটি ব্যবহৃত হয়?**

- A) `fprintf()` only
- B) `fputs()` only
- C) **উভয়ই (Both)** ✅
- D) `fwrite()`

> **ব্যাখ্যা:** `fputs()` plain string রাইট করে। `fprintf()` দিয়ে formatted string (`%d`, `%f` সহ) রাইট করা যায়। `fwrite()` binary data-র জন্য।

---

**Q2. `fopen()` ফাংশন যদি ফাইল ওপেন করতে ব্যর্থ হয়, তবে এটি কী রিটার্ন করে?**

- A) 0
- B) -1
- C) **NULL** ✅
- D) EOF

> **ব্যাখ্যা:** ফাইল না থাকলে বা permission না থাকলে `fopen()` একটি `NULL` পয়েন্টার return করে। NULL check না করে file operation করলে **Segmentation Fault** হয়।

---

**Q3. `"r+"` মোডের কাজ কী?**

- A) শুধু পড়ার জন্য
- B) **পড়া এবং লেখা — কিন্তু ফাইল আগে থেকে থাকতে হবে** ✅
- C) পড়ার জন্য নতুন ফাইল তৈরি করা
- D) ফাইলের শেষে নতুন ডাটা যোগ করা

> **ব্যাখ্যা:** `"r"` = শুধু Read। `"r+"` = Read এবং Write দুটোই, কিন্তু ফাইল already exist করতে হবে। ফাইল না থাকলে নতুন তৈরি করে না (সেটা `"w+"` করে)।

---

**Q4. ফাইলের যেকোনো পজিশনে সরাসরি যাওয়ার জন্য কোন ফাংশন ব্যবহার করা হয়?**

- A) `ftell()`
- B) `rewind()`
- C) **`fseek()`** ✅
- D) `fgetpos()`

> **ব্যাখ্যা:** `fseek()` দিয়ে file-এর শুরু (`SEEK_SET`), বর্তমান পজিশন (`SEEK_CUR`) বা শেষ (`SEEK_END`) থেকে নির্দিষ্ট offset-এ cursor সরানো যায় — এটাকে **Random Access** বলে।

---

**Q5. বাইনারি ফাইল ওপেন করার সময় mode-এর সাথে কোন letter যুক্ত করতে হয়?**

- A) `x`
- B) **`b`** ✅
- C) `t`
- D) `binary`

> **ব্যাখ্যা:** Text file-এর জন্য `"r"` বা `"w"` যথেষ্ট। Binary file (ছবি, executable) handle করতে `"rb"` বা `"wb"` ব্যবহার করতে হয় — যেন OS কোনো newline translation না করে।

---

**Q6. `EOF`-এর পুরো নাম এবং সাধারণ মান কত?**

- A) End of Format (0)
- B) **End of File (-1)** ✅
- C) End of Function (NULL)
- D) End of File (0)

> **ব্যাখ্যা:** `EOF` একটি constant যা `stdio.h`-এ define করা — সাধারণত মান **-1**। `fgetc()` বা অন্য read function file-এর শেষে পৌঁছালে `EOF` return করে।

---

**Q7. `rewind(fp)` ফাংশনটি নিচের কোনটির সমতুল্য?**

- A) `fseek(fp, 0, SEEK_END)`
- B) **`fseek(fp, 0, SEEK_SET)`** ✅
- C) `ftell(fp)`
- D) `fclose(fp)`

> **ব্যাখ্যা:** `rewind()` file-এর read/write pointer-কে একেবারে শুরুতে নিয়ে আসে। এটি `fseek(fp, 0, SEEK_SET)` — ফাইলের শুরু থেকে 0 offset — এর সমান।

---

**Q8. `ftell()` ফাংশন কী return করে?**

- A) ফাইলের মোট size
- B) ফাইলের শেষ character
- C) **বর্তমান file pointer-এর position (byte offset)** ✅
- D) ফাইল open হওয়ার সময়

> **ব্যাখ্যা:** `ftell(fp)` বর্তমান position (ফাইলের শুরু থেকে কত byte দূরে আছি) return করে। `fseek(fp, 0, SEEK_END)` করার পর `ftell(fp)` call করলে file-এর **total size** পাওয়া যায়।

---

**Q9. কোড রান করার সময় `main(int argc, char *argv[])` এ `argc`-এর নূন্যতম মান কত?**

- A) 0
- B) **1** ✅
- C) প্রোগ্রামের উপর নির্ভর করে
- D) -1

> **ব্যাখ্যা:** কোনো argument না দিলেও `argc`-এর মান সর্বদা **1** — কারণ program-এর নিজের নাম (executable name) `argv[0]` হিসেবে first argument হয়।

---

## ⚙️ Preprocessor Macro MCQ

**Q10. `#define SQUARE(x) x*x` হলে `SQUARE(3+2)` এর রেজাল্ট কত হবে?**

- A) 25
- B) **11** ✅
- C) 13
- D) Error

> **ব্যাখ্যা:** এটা একটা classic trap! Preprocessor শুধু text replace করে। `SQUARE(3+2)` হবে `3+2*3+2`। Operator precedence অনুযায়ী: `3 + (2×3) + 2 = 3 + 6 + 2 = 11`।
> সঠিকভাবে লিখতে হয়: `#define SQUARE(x) ((x)*(x))`

---

## 📝 দ্রুত মনে রাখার Points

| Function | কাজ | Return Value |
|----------|-----|-------------|
| `fopen()` | ফাইল open | `FILE*` অথবা `NULL` (error) |
| `fclose()` | ফাইল close ও buffer flush | 0 (success) বা EOF (error) |
| `fseek()` | cursor move | 0 (success) বা non-zero (error) |
| `ftell()` | current position | byte offset (long) |
| `rewind()` | শুরুতে ফিরে যাও | void |
| `feof()` | file শেষ হয়েছে? | non-zero যদি EOF হয় |

> **Exam tip:** `fopen()` এর return value সবসময় check করো (`if(fp == NULL)`) — এটাই professional C code-এর mark।
