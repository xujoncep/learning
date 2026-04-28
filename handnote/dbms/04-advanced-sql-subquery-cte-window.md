# Chapter 04 — Advanced SQL (Subquery, CTE, Window)

---

## 1. Topics
- Subquery (single/multi-row)
- Correlated subquery
- CTE
- Window functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`)

---

## 2. SSMS + PostgreSQL Snippets

```sql
-- SSMS
WITH DeptAvg AS (
  SELECT Dept, AVG(CGPA) AS AvgCGPA
  FROM Students
  GROUP BY Dept
)
SELECT s.FullName, s.Dept, s.CGPA
FROM Students s
JOIN DeptAvg d ON d.Dept = s.Dept
WHERE s.CGPA > d.AvgCGPA;
```

```sql
-- PostgreSQL
WITH dept_avg AS (
  SELECT dept, AVG(cgpa) AS avg_cgpa
  FROM students
  GROUP BY dept
)
SELECT s.full_name, s.dept, s.cgpa
FROM students s
JOIN dept_avg d ON d.dept = s.dept
WHERE s.cgpa > d.avg_cgpa;
```

```sql
-- Ranking (both engines)
SELECT
  FullName,
  Dept,
  CGPA,
  ROW_NUMBER() OVER (PARTITION BY Dept ORDER BY CGPA DESC) AS RN
FROM Students;
```

---

## 3. MCQ (15)
1. CTE শুরু হয়? → WITH ✅  
2. Correlated subquery execute? → outer row প্রতি ✅  
3. ROW_NUMBER duplicates এ? → unique sequence ✅  
4. RANK gap দেয়? → হ্যাঁ ✅  
5. DENSE_RANK gap দেয়? → না ✅  
6. OVER clause কিসের জন্য? → window define ✅  
7. PARTITION BY কাজ? → group-like window split ✅  
8. Scalar subquery result? → one value ✅  
9. EXISTS return? → true/false based on row existence ✅  
10. IN subquery use? → set membership ✅  
11. Top N per group best tool? → window function ✅  
12. Subquery কোথায় হয়? → SELECT/WHERE/FROM ✅  
13. Aggregate window-এ possible? → হ্যাঁ ✅  
14. CTE recursive হয়? → হ্যাঁ ✅  
15. Window function rows collapse করে? → না ✅

---

## 4. Written Problems (5) with Solution

### P1: প্রতিটি dept-এর topper বের করো
**Solution:** `ROW_NUMBER() OVER(PARTITION BY dept ORDER BY cgpa DESC)=1`

### P2: average-এর উপরে CGPA students
**Solution:** CTE + join on dept average

### P3: যেসব student enrollment নেয়নি
**Solution:** `NOT EXISTS` subquery

### P4: দ্বিতীয় সর্বোচ্চ CGPA
**Solution:** `DENSE_RANK() OVER(ORDER BY cgpa DESC)=2`

### P5: repeated email detect
**Solution:** group by email having count(*) > 1

---

## 5. Summary
- Advanced SQL interview-এর core অংশ covered
- CTE + window function mastery baseline done

---

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 03](03-sql-core-ddl-dml-dql.md)
- ➡️ Chapter 05 — Normalization

