# Topic 36: Output Prediction (Tricky Code Reading)

<div align="center">

*"Output prediction = exam এর ৫০%+ marks — code পড়ে output বলার ক্ষমতা"*

</div>

---

## 📖 36.1 Top 15 Output Prediction Patterns

```c
/* ══════ 1. Post/Pre increment ══════ */
int a = 5;
printf("%d ", a++);  /* 5 (use then increment) */
printf("%d", a);     /* 6 */

/* ══════ 2. Short-circuit ══════ */
int x = 0, y = 5;
x && (y++);          /* x=0 → y++ SKIPPED! y still 5 */

/* ══════ 3. Comma operator ══════ */
int z = (1, 2, 3);  /* z = 3 (last value) */

/* ══════ 4. sizeof expression NOT evaluated ══════ */
int n = 5;
sizeof(n++);         /* n still 5! */

/* ══════ 5. Nested printf ══════ */
printf("%d", printf("Hi")); /* Hi2 */

/* ══════ 6. Switch fall-through ══════ */
switch(2) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); }
/* BCD — no break! */

/* ══════ 7. Dangling else ══════ */
if (1) if (0) printf("A"); else printf("B");  /* B */

/* ══════ 8. String literal ══════ */
printf("%c", "Hello"[1]);   /* e */
printf("%s", "Hello" + 2);  /* llo */

/* ══════ 9. Pointer arithmetic ══════ */
int arr[] = {10,20,30};
int *p = arr;
printf("%d", *p++);  /* 10 (then p moves) */

/* ══════ 10. Static variable ══════ */
void f() { static int x=0; printf("%d ",++x); }
f(); f(); f();  /* 1 2 3 */

/* ══════ 11. Recursion print ══════ */
void r(int n) { if(!n)return; r(n-1); printf("%d ",n); }
r(3);  /* 1 2 3 (head recursion = ascending) */

/* ══════ 12. Array out of bounds ══════ */
int m[2][3] = {{1,2,3},{4,5,6}};
printf("%d", m[0][3]);  /* 4 (⚠️ UB but contiguous → next row!) */

/* ══════ 13. char arithmetic ══════ */
printf("%c", 'A' + 2);  /* C (65+2=67='C') */
printf("%d", '0');       /* 48 (ASCII of '0') */

/* ══════ 14. Octal literal ══════ */
printf("%d", 010);       /* 8 (octal 10 = decimal 8!) */

/* ══════ 15. Integer division ══════ */
printf("%d", 5/2);       /* 2 (not 2.5!) */
printf("%f", 5/2);       /* ⚠️ UB! (int passed as float) */
```

---

## 📝 36.2 Summary

- **Output prediction** = code পড়ে mentally execute করা। **Exam marks এর সবচেয়ে বড় অংশ!**

- **Top traps:** post/pre increment, short-circuit, comma, sizeof not-evaluate, nested printf, switch fall-through, dangling else, pointer arithmetic, static persist, recursion direction, octal literal, integer division

- **কৌশল:** প্রতিটি expression **step by step** evaluate করুন — shortcut নেবেন না। Variable এর **current value track** করুন (কাগজে লিখে)

---
---
