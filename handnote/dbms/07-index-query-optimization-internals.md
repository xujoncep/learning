# Chapter 07 — Indexing & Query Optimization Internals

---

## 1. Index Basics
- Clustered vs Non-clustered (SQL Server focus)
- B+ Tree index
- Hash index (concept)
- Composite index, covering index

## 2. Query Optimization Basics
- full table scan vs index seek
- selectivity
- cardinality estimation
- execution plan read করার basics

---

## 3. SSMS + PostgreSQL Snippet

```sql
-- SSMS
CREATE INDEX IX_Students_Dept_CGPA
ON Students(Dept, CGPA);

SELECT FullName, CGPA
FROM Students
WHERE Dept = 'CSE' AND CGPA >= 3.70;
```

```sql
-- PostgreSQL
CREATE INDEX idx_students_dept_cgpa
ON students(dept, cgpa);

SELECT full_name, cgpa
FROM students
WHERE dept = 'CSE' AND cgpa >= 3.70;
```

```sql
-- PostgreSQL plan check
EXPLAIN ANALYZE
SELECT full_name, cgpa
FROM students
WHERE dept = 'CSE' AND cgpa >= 3.70;
```

---

## 4. MCQ (15)
1. Index main purpose? → faster read ✅  
2. Too many index effect? → write slower ✅  
3. B+ tree ভাল কেন? → balanced + range scan efficient ✅  
4. Covering index কী? → query columns index-এই আছে ✅  
5. Selective column index better? → হ্যাঁ ✅  
6. Full scan কবে হয়? → useful index না থাকলে ✅  
7. Composite index order matter? → হ্যাঁ ✅  
8. Execution plan কী দেখায়? → query operator path ✅  
9. Hash index best for? → equality lookup ✅  
10. Range query best? → B-tree/B+ tree ✅  
11. Cardinality estimate ভুল হলে? → bad plan হতে পারে ✅  
12. Index maintenance needed? → হ্যাঁ ✅  
13. Clustered index table order effect? → হ্যাঁ ✅  
14. Primary key usually index? → হ্যাঁ ✅  
15. Optimization only query rewrite? → না, schema/indexও লাগে ✅

---

## 5. Written Problems (5) with Solution

### P1: কোন column index করবে?
**Solution:** বেশি filter/join/sort হওয়া high-selectivity column আগে।

### P2: Composite index order
Query: WHERE dept='CSE' AND cgpa>3.5  
**Solution:** `(dept, cgpa)` better than `(cgpa, dept)` এই workload-এ।

### P3: কেন write slow হলো
**Solution:** insert/update/delete-এ সব index update লাগে; অতিরিক্ত index কমাতে হবে।

### P4: Execution plan-এ scan দেখাচ্ছে
**Solution:** predicate, stats, index presence, data distribution চেক।

### P5: Covering index advantage
**Solution:** table lookup কমে; IO কমে; latency কমে।

---

## 6. Summary
- indexing tradeoff clear
- plan পড়ার basic foundation done
- query tuning mindset তৈরি

---

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 06](06-transactions-concurrency-recovery.md)
- ➡️ Chapter 08 — NoSQL & CAP

