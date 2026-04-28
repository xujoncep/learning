# Chapter 09 — Interview Prep (Beginner to Advanced)

> DBMS interview preparation ladder: beginner → intermediate → advanced.

---

## LEVEL A: Beginner (Core Fundamentals)

### Q1: DBMS কী?
**Answer:** DBMS (Database Management System) হলো এমন software যা data store, manage, query, secure এবং recover করতে সাহায্য করে।

### Q2: Database আর DBMS-এর পার্থক্য কী?
**Answer:** Database হলো data collection; DBMS হলো সেই data manage করার system/software।

### Q3: Primary Key কী?
**Answer:** এমন key যা table-এর প্রতিটি row uniquely identify করে; duplicate বা NULL হতে পারে না।

### Q4: Foreign Key কী?
**Answer:** এমন column যা অন্য table-এর primary/candidate key reference করে এবং referential integrity maintain করে।

### Q5: SQL-এর প্রধান command group কী কী?
**Answer:** DDL, DML, DQL, TCL, DCL।

### Q6: WHERE আর HAVING পার্থক্য?
**Answer:** WHERE aggregate-এর আগে row filter করে; HAVING aggregate/grouped result filter করে।

### Q7: JOIN কেন লাগে?
**Answer:** multiple table-এর related data combine করে meaningful result বের করতে।

### Q8: NULL মানে কি zero?
**Answer:** না। NULL মানে missing/unknown value, zero একটি numeric value।

### Q9: ACID কী?
**Answer:** Atomicity, Consistency, Isolation, Durability — transaction reliability rules।

### Q10: Normalization কেন?
**Answer:** redundancy কমাতে, anomaly কমাতে, data consistency বাড়াতে।

---

## LEVEL B: Intermediate (Design + Query + Transaction)

### Q11: 1NF, 2NF, 3NF short explain করো।
**Answer:**
- 1NF: atomic values  
- 2NF: partial dependency remove  
- 3NF: transitive dependency remove

### Q12: BCNF vs 3NF?
**Answer:** BCNF stricter; BCNF-এ every determinant must be candidate key।

### Q13: Lost Update কী?
**Answer:** concurrent transaction-এ এক transaction-এর update অন্যটা overwrite করে ফেলে।

### Q14: Dirty Read কী?
**Answer:** uncommitted data read করা।

### Q15: Non-repeatable Read কী?
**Answer:** একই row দুইবার read করে ভিন্ন value পাওয়া (অন্য transaction update করলে)।

### Q16: Phantom Read কী?
**Answer:** একই condition query দুইবার চালিয়ে row set change হওয়া (insert/delete এর কারণে)।

### Q17: Read Committed isolation কী prevent করে?
**Answer:** dirty read prevent করে।

### Q18: Composite Index order কেন important?
**Answer:** query predicate-এ leading column match না করলে index efficiently use নাও হতে পারে।

### Q19: Covering Index কী?
**Answer:** query-তে দরকারি সব column index-এই থাকলে table lookup কমে যায়।

### Q20: CTE কেন ব্যবহার করো?
**Answer:** complex query readable করা, reusable intermediate set তৈরি করা, recursive query চালানো।

---

## LEVEL C: Advanced (Internals + Architecture + Tradeoffs)

### Q21: Clustered vs Non-clustered Index (SQL Server focus)
**Answer:** Clustered index table data order define করে; non-clustered separate structure যেখানে key + locator থাকে।

### Q22: B+ Tree index কেন জনপ্রিয়?
**Answer:** balanced depth, range query efficient, predictable IO pattern।

### Q23: Optimizer কেন wrong plan choose করে?
**Answer:** stale statistics, bad cardinality estimate, skewed data, parameter sniffing।

### Q24: WAL (Write-Ahead Logging) concept?
**Answer:** data page disk-এ লেখার আগে log record disk-এ persist করতে হয় recovery guarantee করার জন্য।

### Q25: 2PL কী?
**Answer:** Two-Phase Locking: growing phase (lock acquire), shrinking phase (lock release) — serializability achieve করতে।

### Q26: Deadlock handle কিভাবে?
**Answer:** detection (wait-for graph), prevention/avoidance policies, victim transaction abort।

### Q27: Sharding vs Partitioning
**Answer:** partitioning সাধারণত same server logical split; sharding usually multiple server-এ horizontal data split।

### Q28: CAP practicalভাবে explain করো।
**Answer:** network partition হলে distributed system-এ strict consistency আর availability একসাথে full guarantee কঠিন; workload অনুযায়ী tradeoff নিতে হয়।

### Q29: OLTP vs OLAP schema approach?
**Answer:** OLTP normalized write-friendly; OLAP denormalized/star schema read-analytics friendly।

### Q30: Idempotency DB design-এ কেন important?
**Answer:** retry/replay scenario-তে duplicate write বা duplicate payment ঠেকাতে।

---

## Practical SQL Interview Tasks (SSMS + PostgreSQL)

### Task 1: Dept-wise top student বের করো

```sql
-- SSMS
SELECT FullName, Dept, CGPA
FROM (
    SELECT
        FullName, Dept, CGPA,
        ROW_NUMBER() OVER (PARTITION BY Dept ORDER BY CGPA DESC) AS rn
    FROM Students
) x
WHERE rn = 1;
```

```sql
-- PostgreSQL
SELECT full_name, dept, cgpa
FROM (
    SELECT
        full_name, dept, cgpa,
        ROW_NUMBER() OVER (PARTITION BY dept ORDER BY cgpa DESC) AS rn
    FROM students
) x
WHERE rn = 1;
```

### Task 2: যেসব student কোনো course নেয়নি

```sql
-- SSMS
SELECT s.StudentID, s.FullName
FROM Students s
LEFT JOIN Enrollments e ON e.StudentID = s.StudentID
WHERE e.StudentID IS NULL;
```

```sql
-- PostgreSQL
SELECT s.student_id, s.full_name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.student_id
WHERE e.student_id IS NULL;
```

---

## Revision Checklist

- Keys/constraints 100% clear
- JOIN + GROUP BY + HAVING fluent
- Window function basics ready
- Normalization interview explanation ready
- ACID + isolation anomalies with example ready
- Index tradeoff answer ready

---

## Navigation

- 🏠 Back to [DBMS — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 08](08-nosql-cap-theory-practical-design.md)

