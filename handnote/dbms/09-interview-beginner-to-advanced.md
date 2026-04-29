# Chapter 09 — DBMS Interview Mastery — DBMS 🌐

# Topic 40: Master Q&A (Scenario Based)

### Q1. একটা ১ মিলিয়ন রো এর টেবিলে SELECT কুয়েরি ফাস্ট করার জন্য কী করবেন?
**Ans:** 
১. প্রয়োজনীয় কলামে **Indexing** করব। 
২. **Execution Plan** চেক করে দেখব "Full Table Scan" হচ্ছে কি না। 
৩. কুয়েরিতে `SELECT *` ব্যবহার না করে নির্দিষ্ট কলাম সিলেক্ট করব।

**Deep Dive:** ১ মিলিয়ন ডাটা মানে ইন্ডেক্স ছাড়া ডাটাবেসকে র‍্যামে ১ মিলিয়ন ফাইল সার্চ করতে হবে (O(n))। ইন্ডেক্স দিলে এটি B+ Tree স্ট্রাকচার ফলো করে লগারদমিক (O(log n)) সময়ে রেজাল্ট দিবে। 

**Pro Tip:** ইন্ডেক্স শুধুমাত্র সেই কলামে দিন যা `WHERE` বা `JOIN`-এ প্রচুর ব্যবহৃত হয়। অতিরিক্ত ইন্ডেক্স `INSERT/UPDATE` স্লো করে দেয় কারণ প্রতিবার ডাটা রাইট করার সময় ইন্ডেক্সও আপডেট করতে হয়।

---

### Q2. Primary Key ও Unique Key এর আসল পার্থক্য কী?
**Ans:** 
- **Primary Key:** এক টেবিলে একটাই থাকে, NULL ভ্যালু নিতে পারে না। 
- **Unique Key:** এক টেবিলে অনেকগুলো হতে পারে, এবং এটি NULL ভ্যালু নিতে পারে।

**Under the Hood:** ফিজিকালি, PK সাধারণত একটি **Clustered Index** তৈরি করে (যা টেবিলের ডাটা অর্গানাইজ করে), যেখানে Unique Key একটি **Non-Clustered Index** তৈরি করে।

---

### Q3. "Why B+ Tree over B-Tree for RDBMS indexing?"
**Ans:** ডাটাবেস ইঞ্জিনে (যেমন MyISAM/InnoDB) B+ Tree ব্যবহার করা হয় কারণ:
1.  **Full Data in Leaf Nodes:** B+ Tree-তে সব আসল ডাটা শুধুমাত্র লিফ নোডে থাকে। এর ফলে নন-লিফ নোডগুলো আরও বেশি কি (keys) হোল্ড করতে পারে এবং ট্রি-র হাইট কম থাকে।
2.  **Range Query:** লিফ নোডগুলো লিঙ্কেড লিস্ট দিয়ে যুক্ত থাকে। তাই `WHERE salary BETWEEN 10 AND 100` এর মতো রেঞ্জ কুয়েরি বি+ ট্রি-তে অনেক ফাস্টার হয়।
3.  **Logical Reasoning:** বি-ট্রিতে প্রতি লেভেলে পয়েন্টার থাকে, যা ডিস্ক থেকে ডাটা রিড করার সময় বেশি "Seek" ডিমান্ড করে।

---

### Q4. "When would you choose NoSQL over SQL?"
**Ans:** যখন Schema ফিক্সড নয় এবং হাই স্ফেলাবিলিটি দরকার।
- **Scenario:** ইনভেন্টরি ম্যানেজমেন্টের জন্য SQL সেরা (Strict Relations)। কিন্তু সোশ্যাল মিডিয়া ফিড বা ইউজারের অ্যাক্টিভিটি লগের জন্য (যেখানে রিড/রাইট অনেক বেশি এবং ডাটা ফরম্যাট চেইঞ্জ হয়) NoSQL সেরা।

---

### 🎯 Job Exam Summary (BPSC/Bank)
- **SQL Execution Order:** FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY।
- **ACID:** ট্রানজ্যাকশনের মূলমন্ত্র। Isolation লেভেল ৪টি: Read Uncommitted, Read Committed, Repeatable Read, Serializable।
- **Relational Algebra:** প্রোজেকশন ($\pi$) মানে কলাম সিলেক্ট করা, সিলেক্ট ($\sigma$) মানে রো ফিল্টার করা।
- **Deadlock logic:** দুটি ট্রানজ্যাকশন যখন একে অপরের লক করা রিসোর্স হোল্ড করে বসে থাকে। ডিবিএমএস এটি ডিটেক্ট করে এবং একটি ভিক্টিম সিলেক্ট করে রোলব্যাক করে দেয়।

---

### 🧠 Practice Zone (MCQ Drill)
1. নিচের কোনটি DDL কমান্ড?
   - (ক) UPDATE (খ) DELETE **(গ) TRUNCATE** (ঘ) INSERT
2. ACID-এর 'I' দিয়ে কী বোঝায়?
   - (ক) Integrity **(খ) Isolation** (গ) Index (ঘ) Identity
3. NoSQL ডাটাবেস কোনটির জন্য সেরা?
   - (ক) Structured Data **(খ) Unstructured Data** (গ) Relational Data (ঘ) Linear Data
4. SQL-এ 'JOIN' অপারেশন কোন ধরনের রিলেশনাল অ্যালজেব্রা?
   - (ক) Unary **(খ) Binary** (গ) Ternary (ঘ) Tertiary
5. 'GROUP BY' ক্লোজটি কোনটির সাথে ব্যবহৃত হয়?
   - (ক) WHERE **(খ) Aggregate Functions** (গ) ORDER BY (ঘ) LIMIT
6. 'HAVING' এবং 'WHERE' এর মূল পার্থক্য কী?
   - (ক) কোনো পার্থক্য নেই **(খ) HAVING গ্রুপ লেভেলে কাজ করে, WHERE রো লেভেলে** (গ) WHERE ফাস্টার (ঘ) HAVING ডিলিট করে
7. ডাটাবেসে 'Views' ব্যবহার করার প্রধান উদ্দেশ্য কী?
   - (ক) স্টোরেজ কমানো **(খ) সিকিউরিটি এবং সিম্প্লিসিটি** (গ) ইন্ডেক্স ফাস্ট করা (ঘ) ব্যাকআপ নেওয়া
8. 'Denormalization' কখন করা হয়?
   - (ক) ডাটা স্ট্রাকচার করার সময় **(খ) রিড পারফরম্যান্স বাড়ানোর জন্য** (গ) রাইট অপ্টিমাইজ করার জন্য (ঘ) মেমোরি কমানোর জন্য
9. 'B-Tree' ইনডেক্সিং মূলত কোন কাজে ব্যবহৃত হয়?
   - (ক) গ্রাফ ট্রাভার্সাল **(খ) রেঞ্জ কুয়েরি এবং সার্চ** (গ) ইমেজ প্রসেসিং (ঘ) অডিও স্ট্রিমিং
10. 'Checkpoint' মেকানিজম কোনটিতে ব্যবহৃত হয়?
    - **(ক) Database Recovery** (খ) User Login (গ) SQL Injection prevention (ঘ) Sorting

---

### 📝 Final Written Challenge
1. **Explain the differences between OLTP and OLAP.**
   - *Logic:* OLTP ট্রানজ্যাকশন রিলেটেড (Operational DB), আর OLAP অ্যানালিটিক্স রিলেটেড (Data Warehouse)।
2. **What is SQL Injection and how to prevent it?**
   - *Security:* এটি একটি অ্যাটাক যেখানে ইনপুট ফিল্ডের মাধ্যমে হার্মফুল SQL কোড পাঠানো হয়। এটি প্রিভেন্ট করতে **Prepared Statements** বা **Parameterized Queries** ব্যবহার করতে হয়।
3. **What is the difference between TRUNCATE and DELETE?**
   - *Proof:* DELETE রো ডিলিট করে এবং এটি রোলব্যাক করা যায়। TRUNCATE পুরো টেবিল খালি করে এবং এটি DDL হওয়ায় ফাস্ট এবং রোলব্যাক করা যায় না (সচরাচর)।
4. **Explain the concept of 'Cold Backup' vs 'Hot Backup'.**
   - *Maintenance:* Cold Backup করা হয় যখন ডাটাবেস অফলাইন থাকে। Hot Backup করা হয় যখন ডাটাবেস রানিং থাকে।
5. **Describe the 'Star Schema' vs 'Snowflake Schema' in Data Warehousing.**
   - *Design:* Star Schema সহজ এবং ডেনরমালাইজড। Snowflake Schema নরমালাইজড এবং কমপ্লেক্স জয়েন ডিমান্ড করে।

