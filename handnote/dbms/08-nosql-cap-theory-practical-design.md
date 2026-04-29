# Chapter 08 — NoSQL & CAP Theory — DBMS 🌐

*মডার্ন বিগ-ডাটা যুগে যখন রিলেশনাল ডাটাবেস ফেল করে, তখন NoSQL এবং CAP থিওরি আমাদের উদ্ধার করে।*

---

# Topic 35: CAP Theorem & PACELC
ডিস্ট্রিবিউটেড সিস্টেমে আপনি একসাথে ৩টি জিনিস পাবেন না।

### 35.1 CAP Components
1.  **Consistency (C):** সব ইউজার একই সময়ে একই ডাটা দেখবে।
2.  **Availability (A):** সিস্টেম কখনো ডাউন হবে না, সবসময় রেসপন্স করবে।
3.  **Partition Tolerance (P):** নেটওয়ার্ক ব্রেক করলেও সিস্টেম চলবে।

**রুল:** যেকোনো ২টিকে বেছে নিতে হবে। ইন্টারনেটে **P** মাস্ট, তাই লড়াই হয় **CP** (যেমন: HBase, MongoDB) বনাম **AP** (যেমন: Cassandra, DynamoDB) এর মধ্যে।

---

# Topic 36: NoSQL Data Models
NoSQL মানে "Not Only SQL"। এটি ৪ প্রকার:

| Type | Use Case | Example |
| :--- | :--- | :--- |
| **Document** | Content Management, Catalogs | MongoDB |
| **Key-Value** | Caching, Session Management | Redis |
| **Columnar** | Data Analytics, Logging | Cassandra |
| **Graph** | Social Network, Recommendation | Neo4j |

---

### ⚠️ Interview Traps
- **প্রশ্ন:** "ACID বনাম BASE এর পার্থক্য কী?" 
- **উত্তর:** ACID হলো স্ট্রং কনসিস্টেন্সি (SQL), আর BASE হলো ইভেনচুয়াল কনসিস্টেন্সি (NoSQL)। NoSQL সিস্টেমে ডাটা সাথে সাথে সব জায়গায় আপডেট না-ও হতে পারে, কিন্তু কিছুক্ষণ পর হয়ে যাবে।

---

### 🧠 Practice Zone (Job Exam Prep)

#### MCQ Drill
1. MongoDB কোন ধরনের NoSQL ডাটাবেস?
   - (ক) Graph **(খ) Document** (গ) Key-Value (ঘ) Columnar
2. CAP থিওরি অনুযায়ী ডিস্ট্রিবিউটেড সিস্টেমে কোনটি বাদ দেওয়া প্রায় অসম্ভব? 
   - (ক) Consistency (খ) Availability **(গ) Partition Tolerance** (ঘ) None
3. Graph DB-র প্রধান এলিমেন্ট দুটি কী কী? 
   - **(ক) Nodes, Edges** (খ) Tables, Rows (গ) Keys, Values (ঘ) Binary, Text
4. Cassandra কোন NoSQL মডেলের উদাহরণ?
   - (ক) Document (খ) Graph **(গ) Column-Family** (ঘ) Key-Value
5. BASE-এ 'E' দ্বারা কী বোঝানো হয়?
   - (ক) Error **(খ) Eventual Consistency** (গ) Endpoint (ঘ) Execution
6. Redis ডাটাবেসটি মূলত কোথায় ডাটা স্টোর করে?
   - (ক) Disk **(খ) In-Memory (RAM)** (গ) SSD (ঘ) Cloud
7. হোরাইজন্টাল স্কেলিং (Horizontal Scaling) বলতে কী বোঝায়?
   - **(ক) নতুন সার্ভার বা নোড যোগ করা** (খ) বর্তমান সার্ভারের র‍্যাম বাড়ানো (গ) CPU স্পিড বাড়ানো (ঘ) ডাটা ডিলিট করা
8. সোশ্যাল মিডিয়া ফ্রেন্ড রিকমেন্ডেশনের জন্য কোনটি সেরা?
   - (ক) MySQL (খ) Redis **(গ) Neo4j** (ঘ) MongoDB
9. MongoDB-তে ডাটা কোন ফরম্যাটে থাকে?
   - (ক) XML **(খ) BSON/JSON** (গ) CSV (ঘ) SQL
10. CAP থিওরি অনুযায়ী রিলেশনাল ডাটাবেস (RDBMS) সাধারণত কোন ক্যাটাগরিতে পড়ে?
    - **(ক) CA (যদি ডিস্ট্রিবিউটেড না হয়)** (খ) CP (গ) AP (ঘ) কোনোটিই নয়

#### Written Challenge
1. **Consistency** এবং **Available** সিস্টেমের মধ্যে পার্থক্য করো। কেন ব্যাংকিং সিস্টেমে Consistency বেশি প্রয়োজন?
   - *Explaining Details:* Consistency মানে সব জায়গায় ডাটা সেইম থাকা। Availability মানে সিস্টেম সবসময় আপ থাকা। ব্যাংকিংয়ে যদি Consistency না থাকে, তবে এক একাউন্ট থেকে টাকা কাটলে অন্য একাউন্টে সেটা রিফ্লেক্ট নাও হতে পারে, যা ফ্রড বা লোকসানের কারণ হবে। 
2. **BASE** প্রপার্টিজের পূর্ণরূপ ব্যাখ্যা করো। (Basically Available, Soft state, Eventual consistency)
3. **Difference between SQL and NoSQL.**
   - *Comparison:* SQL হলো স্ট্রাকচার্ড, রিলেশনাল এবং ভার্টিকালি স্কেলেবল। NoSQL হলো আন-স্ট্রাকচার্ড, ডায়নামিক স্কেমা এবং হোরাইজন্টালি স্কেলেবল।
4. **Sharding** কীভাবে NoSQL-এ ডাটা ডিস্ট্রিবিউশনে সাহায্য করে?
   - *Mechanic:* শার্ডিং ডাটাকে ছোট ছোট টুকরো করে বিভিন্ন সার্ভারে ছড়িয়ে দেয়। এতে কোনো একটি সিঙ্গেল সার্ভারের ওপর প্রেসার পড়ে না।
5. **JSON vs BSON** এর পার্থক্য এবং কেন MongoDB BSON ব্যবহার করে?
   - *Logic:* BSON হলো বাইনারি ফরম্যাট যা JSON এর চেয়ে আরও ফাস্ট স্ক্যান এবং ট্রাভার্স করা যায়। এটি স্পেস ও স্পিড দুটোই সেভ করে।

