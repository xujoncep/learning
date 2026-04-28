# Chapter 03 — SQL Core (DDL, DML, DQL, TCL, DCL)

> SQL fundamentals with SSMS + PostgreSQL side-by-side।

---

## 1. SQL Command Groups
- DDL: CREATE, ALTER, DROP
- DML: INSERT, UPDATE, DELETE
- DQL: SELECT
- TCL: COMMIT, ROLLBACK
- DCL: GRANT, REVOKE

---

## 2. Core Query Patterns

```sql
-- SSMS
SELECT Dept, COUNT(*) AS TotalStudents, AVG(CGPA) AS AvgCGPA
FROM Students
GROUP BY Dept
HAVING AVG(CGPA) >= 3.50
ORDER BY AvgCGPA DESC;
```

```sql
-- PostgreSQL
SELECT dept, COUNT(*) AS total_students, AVG(cgpa) AS avg_cgpa
FROM students
GROUP BY dept
HAVING AVG(cgpa) >= 3.50
ORDER BY avg_cgpa DESC;
```

### JOIN Example

```sql
-- SSMS
SELECT s.FullName, c.CourseName
FROM Enrollments e
JOIN Students s ON s.StudentID = e.StudentID
JOIN Courses c ON c.CourseID = e.CourseID;
```

```sql
-- PostgreSQL
SELECT s.full_name, c.course_name
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id;
```

---

## 3. MCQ (15)
1. DDL command কোনটা? → CREATE ✅  
2. DML command কোনটা? → UPDATE ✅  
3. DQL command? → SELECT ✅  
4. HAVING কবে? → aggregate filter ✅  
5. WHERE vs HAVING? → WHERE before group, HAVING after group ✅  
6. INNER JOIN কী দেয়? → matching rows only ✅  
7. LEFT JOIN কী দেয়? → left all + matched right ✅  
8. COUNT(*) কী গুনে? → all rows ✅  
9. DISTINCT কী করে? → duplicates remove ✅  
10. ORDER BY default? → ASC ✅  
11. NULL check? → IS NULL ✅  
12. Transaction undo? → ROLLBACK ✅  
13. Permanent save? → COMMIT ✅  
14. Permission দেয়? → GRANT ✅  
15. Permission তুলে? → REVOKE ✅

---

## 4. Written Problems (5) with Solution

### P1: Dept-wise student count
**Solution:** `GROUP BY dept` + `COUNT(*)`

### P2: 3.70+ CGPA students list
**Solution:** `WHERE cgpa >= 3.70 ORDER BY cgpa DESC`

### P3: No enrollment students বের করো
**Solution:** `LEFT JOIN enrollments ... WHERE e.student_id IS NULL`

### P4: ভুল update undo
**Solution:** `BEGIN TRAN` → ভুল হলে `ROLLBACK`, ঠিক হলে `COMMIT`

### P5: Course-wise student সংখ্যা
**Solution:** enrollments + courses join, group by course

---

## 5. Summary
- SQL command families clear
- Join + aggregate + filter flow clear
- Transaction basics complete

---

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 02](02-relational-model-er-mapping.md)
- ➡️ Chapter 04 — Advanced SQL

