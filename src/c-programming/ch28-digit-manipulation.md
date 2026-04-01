# Topic 28: Digit Manipulation

<div align="center">

*"সংখ্যার digit নিয়ে খেলা — reverse, sum, Armstrong, count"*

</div>

---

## 💻 28.1 Essential Digit Operations

```c
#include <stdio.h>
#include <math.h>

int main() {
    int num = 12345;

    /* ══════ Extract last digit ══════ */
    int lastDigit = num % 10;        /* 5 */

    /* ══════ Remove last digit ══════ */
    int withoutLast = num / 10;      /* 1234 */

    /* ══════ Count digits ══════ */
    int n = num, count = 0;
    while (n > 0) { count++; n /= 10; }
    printf("Digits: %d\n", count);    /* 5 */

    /* ══════ Sum of digits ══════ */
    n = num; int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    printf("Digit sum: %d\n", sum);   /* 15 */

    /* ══════ Reverse number ══════ */
    n = num; int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed: %d\n", reversed); /* 54321 */

    /* ══════ Palindrome check ══════ */
    int original = 12321;
    n = original; reversed = 0;
    while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }
    printf("%d is %spalindrome\n", original,
           (original == reversed) ? "" : "not "); /* palindrome! */

    return 0;
}
```

---

## 💻 28.2 Armstrong & Special Numbers

```c
/* ══════ Armstrong: sum of digits^n = number ══════ */
/* 153 = 1³ + 5³ + 3³ = 1+125+27 = 153 ✅ */
int isArmstrong(int num) {
    int original = num, sum = 0;
    int digits = 0, n = num;
    while (n > 0) { digits++; n /= 10; }

    n = num;
    while (n > 0) {
        int d = n % 10;
        sum += (int)pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
/* Armstrong numbers: 1,2,...,9, 153, 370, 371, 407, 1634... */

/* ══════ Strong Number: sum of digit factorials = number ══════ */
/* 145 = 1! + 4! + 5! = 1+24+120 = 145 ✅ */
int factorial(int n) {
    int f = 1;
    for (int i = 2; i <= n; i++) f *= i;
    return f;
}
int isStrong(int num) {
    int sum = 0, n = num;
    while (n > 0) { sum += factorial(n % 10); n /= 10; }
    return sum == num;
}

/* ══════ Automorphic: n² ends with n ══════ */
/* 5² = 25 (ends with 5), 76² = 5776 (ends with 76) */
int isAutomorphic(int n) {
    int sq = n * n;
    while (n > 0) {
        if (n % 10 != sq % 10) return 0;
        n /= 10; sq /= 10;
    }
    return 1;
}
```

---

## ❓ 28.3 MCQ Problems

---

**MCQ 1:** `num % 10` কী দেয়?

| Option | Answer |
|--------|--------|
| (a) First digit | |
| (b) **Last digit** | ✅ |
| (c) Digit count | |
| (d) Digit sum | |

---

**MCQ 2:** 153 কি Armstrong number?

| Option | Answer |
|--------|--------|
| (a) **হ্যাঁ (1³+5³+3³ = 153)** | ✅ |
| (b) না | |
| (c) Depends | |
| (d) শুধু 2-digit এ | |

---

**MCQ 3:** 121 reverse করলে কত?

| Option | Answer |
|--------|--------|
| (a) 112 | |
| (b) **121 (palindrome!)** | ✅ |
| (c) 211 | |
| (d) 12 | |

---

**MCQ 4:** `num / 10` কী করে?

| Option | Answer |
|--------|--------|
| (a) First digit দেয় | |
| (b) **Last digit সরায়** | ✅ |
| (c) 10 দিয়ে গুণ | |
| (d) Decimal দেয় | |

---

## 📝 28.4 Summary

- **Two magic operations:** `num % 10` = **last digit** extract, `num / 10` = last digit **remove**। এই দুটো দিয়ে সব digit problem solve হয়

- **Reverse number:** `reversed = reversed * 10 + num % 10; num /= 10;` — loop শেষে reversed পাওয়া যায়

- **Palindrome:** reverse == original? Armstrong: digit^n sum == original? Strong: digit! sum == original?

- **Digit count:** `while(n>0) { count++; n/=10; }`। ⚠️ n=0 হলে count=0 — special case handle!

---
---
