# Chapter 03 — SQL Core: DDL, DML & Join Mastery — DBMS 🌐

SQL (Structured Query Language) হলো ডেটাবেসের সাথে কথা বলার ভাষা। এই চ্যাপ্টারে আমরা কেবল কোড লেখা নয়, বরং ব্যাকএন্ডে কীভাবে বিভিন্ন কমান্ড এবং জয়েন কাজ করে তার লজিক শিখব।

---

## 1. SQL Commands: Deep Dive into Categories

SQL কমান্ডগুলোকে তাদের কাজের ধরন অনুযায়ী ৫টি ভাগে ভাগ করা যায়:

1. **DDL (Data Definition Language):** ডেটাবেসের স্ট্রাকচার বা স্কিমা নিয়ে কাজ করে।
   - *Commands:* `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.
   - *Nature:* এগুলো অটো-কমিট (Auto-commit) হয়, অর্থাৎ এদের রোলব্যাক করা যায় না।
2. **DML (Data Manipulation Language):** টেবিলের ভেতরে থাকা ডেটা নিয়ে কাজ করে।
   - *Commands:* `INSERT`, `UPDATE`, `DELETE`.
   - *Nature:* এগুলোকে রোলব্যাক করা সম্ভব।
3. **DQL (Data Query Language):** ডেটা রিট্রিভ করার জন্য।
   - *Command:* `SELECT`.
4. **DCL (Data Control Language):** সিকিউরিটি এবং পারমিশন।
   - *Commands:* `GRANT`, `REVOKE`.
5. **TCL (Transaction Control Language):** ট্রানজেকশন ম্যানেজ করার জন্য।
   - *Commands:* `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

---

## 2. Constraints: The Data Guards
ডেটার শুদ্ধতা বজায় রাখার জন্য কনস্ট্রেইন্ট ব্যবহার করা হয়।

- **Primary Key:** ইউনিক এবং নট-নাল। একটি টেবিলে একটিই থাকতে পারে।
- **Unique Key:** ইউনিক হতে হবে কিন্তু নাল (NULL) ভ্যালু নিতে পারে।
- **Composite Key:** যখন দুই বা ততোধিক কলাম মিলে একটি ইউনিক কি তৈরি করে।
- **Foreign Key:** অন্য টেবিলের প্রাইমারি কি-র সাথে রিলেশন তৈরি করে। এটি Referential Integrity নিশ্চিত করে।

---

## 3. SQL Joins: Visualized Logic
জয়েন ব্যবহার করা হয় একাধিক টেবিল থেকে ডেটা কম্বাইন করার জন্য।

```mermaid
graph TD
    subgraph "Logic of Joins"
    A[Table A] -- Inner Join -- B[Table B]
    A -- Left Join -- B
    A -- Right Join -- B
    A -- Full Join -- B
    end
```

### 3.1 Detailed Join Types
1. **Inner Join:** কেবল সেই শোগুলো দেখাবে যেগুলো দুই টেবিলের কন্ডিশন ম্যাচ করে। (Intersection)
2. **Left (Outer) Join:** বাম পাশের টেবিলের সব ডেটা + ডান পাশের ম্যাচ হওয়া ডেটা। ম্যাচ না হলে ডান পাশে `NULL` দেখাবে।
3. **Right (Outer) Join:** ডান পাশের সব ডেটা + বাম পাশের ম্যাচ হওয়া ডেটা।
4. **Full (Outer) Join:** দুই টেবিলের সব ডেটা। যেখানে ম্যাচ হবে না সেখানে `NULL` বসবে। (Union)
5. **Cross Join (Cartesian Product):** টেবিল A-র প্রতিটি রো-র সাথে টেবিল B-র প্রতিটি রো-র গুণফল। কন্ডিশন ছাড়াই কাজ করে।
6. **Self Join:** যখন একটি টেবিল নিজের সাথেই জয়েন হয়। (যেমন: একই টেবিলে ম্যানেজার এবং এমপ্লয়ি থাকলে)।

---

## 📝 Practice Zone

### MCQ Quiz (10 Questions)
1. কোনটি DDL কমান্ড নয়?
   (A) ALTER (B) TRUNCATE **(C) DELETE** (D) DROP
2. `TRUNCATE` এবং `DELETE`-এর মধ্যে মূল পার্থক্য কী?
   (A) Truncate slow **(B) Truncate is DDL, Delete is DML** (C) Delete is faster (D) None
3. একটি টেবিলে কয়টি Primary Key থাকতে পারে?
   **(A) 1** (B) 2 (C) Many (D) Depends on columns
4. Left Join-এ ডান পাশের টেবিলে ম্যাচ না পাওয়া গেলে কী ভ্যালু দেখায়?
   (A) 0 (B) Blank **(C) NULL** (D) Error
5. $\text{Table A (3 rows) CROSS JOIN Table B (4 rows)}$ - রেজাল্টে কয়টি রো থাকবে?
   (A) 7 **(B) 12** (C) 1 (D) 0
6. `TCL` কমান্ড কোনটি?
   (A) GRANT **(B) COMMIT** (C) SELECT (D) ALTER
7. Unique key কি NULL ভ্যালু নিতে পারে?
   **(A) Yes** (B) No (C) Only one (D) Unlimited
8. Referential Integrity নিশ্চিত করে কোনটি?
   (A) Primary Key **(B) Foreign Key** (C) Unique Key (D) Check
9. Self Join করার সময় কী ব্যবহার করা বাধ্যতামূলক?
   (A) Distinct **(B) Alias (AS)** (C) Group By (D) Join Table
10. `SELECT` স্টেটেমেন্টের এক্সিকিউশন অর্ডারে সবার আগে কোনটি কাজ করে?
    **(A) FROM** (B) WHERE (C) SELECT (D) ORDER BY

### Written/Numerical Problems (5 Tasks)
1. **Joins Resulting:**
   Table A: `{1, 2, 3}` | Table B: `{2, 3, 4}`.
   `A INNER JOIN B` এবং `A LEFT JOIN B`-এর রেজাল্ট সেট দেখাও।
   *Solution:* Inner: `{2, 3}`; Left: `{(1, NULL), (2, 2), (3, 3)}`.
2. **DDL vs DML:** ৩টি করে পার্থক্য লেখো।
3. **Composite Key Scenario:** একটি 'Enrollment' টেবিলে কেন `StudentID` এবং `CourseID` মিলে Composite Key হওয়া উচিত?
   *Solution:* কারণ একজন ছাত্র একাধিক কোর্সে থাকতে পারে এবং একটি কোর্সে অনেক ছাত্র থাকতে পারে। কিন্তু একজন ছাত্র একটি কোর্সে একবারই ইনরোল করতে পারবে।
4. **SQL Order of Execution:** একটি কোয়েরি দেওয়া হলো: `SELECT Dept, COUNT(*) FROM Student WHERE Age > 20 GROUP BY Dept HAVING COUNT(*) > 5`. এটি ব্যাকএন্ডে কোন অর্ডারে রান হবে?
   *Solution:* FROM → WHERE → GROUP BY → HAVING → SELECT.
5. **Self Join Logic:** একটি `Manager` সেলফ-জয়েন কোয়েরি লেখো যেখানে এমপ্লয়ি এবং তার ম্যানেজারের নাম একসাথে দেখাবে।
   *Solution:* `SELECT E.Name, M.Name FROM Emp E JOIN Emp M ON E.MgrID = M.ID`.

---

## 🎖️ Job Exam Special (BPSC/Bank)
- **BPSC Trend:** "Differentiate between DROP, TRUNCATE and DELETE." - ১০ মার্কের কমন প্রশ্ন।
- **Bank IT:** জয়েন টেবিল দিয়ে আউটপুট বের করতে দেওয়া হয়।
- **Key point:** `DELETE` করার পর `ROLLBACK` করা যায়, কিন্তু `TRUNCATE` করলে ডেটা চিরতরে হাওয়া!

---

## ⚠️ Interview Traps
- **Trap 1:** "Can a Foreign Key point to a Unique Key instead of a Primary Key?"
  - **Ans:** Yes, it can, as long as the target column is unique.
- **Trap 2:** "Does a Full Outer Join produce more rows than a Cross Join?"
  - **Ans:** No. Cross Join generates the maximum possible rows ($M \times N$).
- **Trap 3:** "Why is `SELECT *` discouraged in production?"
  - **Ans:** It consumes more bandwidth and may cause issues if the table schema changes (Performance & Maintenance).

---
**মনে রাখা জরুরি:** SQL কেবল সিনট্যাক্স মুখস্থ করা নয়, বরং ডেটার রিলেশনশিপ সেট থিওরির মাধ্যমে ফিল্টার করা।
