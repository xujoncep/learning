# Topic 8: Pattern Printing

<div align="center">

*"Pattern = nested loop + formula — row ও column এর সম্পর্ক বুঝতে পারলেই হলো"*

</div>

---

## 📖 8.1 ধারণা (Concept)

Pattern printing = **nested loop** এর সবচেয়ে practical application। প্রতিটি pattern বুঝতে হলে **row (i)** এর সাথে **space ও star count** এর formula বের করতে হয়।

```
Pattern বোঝার Master Formula:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Outer loop → ROW control (কতটি লাইন)
Inner loop(s) → COLUMN control (space + star)

Pyramid Example (n=5):
Row │ Spaces │ Stars   │ Formula
────┼────────┼─────────┼──────────
 1  │   4    │   1     │ spaces = n-i
 2  │   3    │   3     │ stars  = 2*i-1
 3  │   2    │   5     │
 4  │   1    │   7     │
 5  │   0    │   9     │
```

---

## 💻 8.2 Essential Patterns

### Pattern 1: Left-Aligned Triangle

```
*
* *
* * *
* * * *
* * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++)   /* stars = i */
        printf("* ");
    printf("\n");
}
```

### Pattern 2: Right-Aligned Triangle

```
        *
      * *
    * * *
  * * * *
* * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)  /* spaces = n-i */
        printf("  ");
    for (int j = 1; j <= i; j++)      /* stars = i */
        printf("* ");
    printf("\n");
}
```

### Pattern 3: Pyramid

```
        *
      * * *
    * * * * *
  * * * * * * *
* * * * * * * * *
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)       /* spaces = n-i */
        printf("  ");
    for (int j = 1; j <= 2 * i - 1; j++)   /* stars = 2*i-1 */
        printf("* ");
    printf("\n");
}
```

### Pattern 4: Number Pyramid

```
    1
   1 2 1
  1 2 3 2 1
 1 2 3 4 3 2 1
```

```c
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++)
        printf(" ");
    for (int j = 1; j <= i; j++)       /* increasing: 1 to i */
        printf("%d ", j);
    for (int j = i - 1; j >= 1; j--)   /* decreasing: i-1 to 1 */
        printf("%d ", j);
    printf("\n");
}
```

### Pattern 5: Diamond

```c
/* Upper half (1 to n) */
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++) printf("  ");
    for (int j = 1; j <= 2*i-1; j++) printf("* ");
    printf("\n");
}
/* Lower half (n-1 to 1) — middle row একবারই! */
for (int i = n-1; i >= 1; i--) {
    for (int j = 1; j <= n - i; j++) printf("  ");
    for (int j = 1; j <= 2*i-1; j++) printf("* ");
    printf("\n");
}
```

### Pattern 6: Pascal's Triangle

```
         1
        1 1
       1 2 1
      1 3 3 1
     1 4 6 4 1
```

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++)
        printf("  ");
    int val = 1;
    for (int j = 0; j <= i; j++) {
        printf("%3d ", val);
        val = val * (i - j) / (j + 1);   /* nCr formula */
    }
    printf("\n");
}
```

---

## 📖 8.3 Master Formula Sheet

```
┌──────────────────────────┬──────────────┬──────────────┐
│ Pattern                  │ Spaces       │ Stars/Nums   │
├──────────────────────────┼──────────────┼──────────────┤
│ Left triangle            │ 0            │ i            │
│ Right triangle           │ n - i        │ i            │
│ Inverted left            │ 0            │ n - i + 1    │
│ Inverted right           │ i - 1        │ n - i + 1    │
│ Pyramid                  │ n - i        │ 2*i - 1      │
│ Inverted pyramid         │ i - 1        │ 2*(n-i) + 1  │
│ Diamond                  │ |n - i|      │ 2*min - 1    │
│ Hollow: star at edges    │ same         │ first/last   │
└──────────────────────────┴──────────────┴──────────────┘

Diamond total rows = 2n - 1
Pyramid stars always ODD (1, 3, 5, 7...)
```

---

## 📝 8.4 Summary

- **Outer loop = rows**, **Inner loop(s) = columns** (spaces + stars/numbers)
- **Pyramid:** spaces = `n-i`, stars = **`2*i-1`** (সবসময় odd সংখ্যা)
- **Diamond** = pyramid (1 to n) + inverted pyramid (**n-1** to 1) — middle row **একবারই**
- **Hollow pattern:** star শুধু **edge** এ (first/last row/column), বাকি space
- **Number pattern:** `j` print = sequential, `i` print = same number per row
- Pattern solve কৌশল: **কাগজে row-by-row count** → formula → code

---
---
