# Topic 25: Prime Number, GCD/LCM, Factorial

<div align="center">

*"Number theory = সবচেয়ে classic programming topic — প্রতিটি exam এ আসে"*

</div>

---

## 💻 25.1 Prime Number

```c
/* ══════ Basic prime check — O(√n) ══════ */
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return 0;
    }
    return 1;
}

/* ══════ Print primes up to N ══════ */
void printPrimes(int n) {
    for (int i = 2; i <= n; i++)
        if (isPrime(i))
            printf("%d ", i);
}
/* 2 3 5 7 11 13 17 19 23 29 ... */

/* ══════ Count primes up to N ══════ */
int countPrimes(int n) {
    int count = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) count++;
    return count;
}
```

```
Prime Check Optimization:
━━━━━━━━━━━━━━━━━━━━━━━━
Naive:     for(i=2; i<n; i++)        → O(n)
Better:    for(i=2; i<=sqrt(n); i++) → O(√n)
Best:      check 2,3 then i=5,i+=6  → O(√n/3)

⚡ Why √n? If n = a×b, one of a,b must be ≤ √n
⚡ Why i+=6? All primes > 3 are of form 6k±1
```

---

## 💻 25.2 GCD & LCM

```c
/* ══════ GCD — Euclidean Algorithm ══════ */
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
/* gcd(48, 18): 48%18=12 → 18%12=6 → 12%6=0 → return 6 */

/* ══════ GCD — Recursive ══════ */
int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}

/* ══════ LCM using GCD ══════ */
int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;   /* a/gcd first to avoid overflow! */
}
/* lcm(12, 8) = (12/4)*8 = 24 */

/* ⚡ Relationship: a × b = GCD(a,b) × LCM(a,b) */
```

---

## 💻 25.3 Factorial

```c
/* ══════ Iterative (better — no stack overflow) ══════ */
long long factorialIter(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++)
        result *= i;
    return result;
}

/* ══════ Recursive ══════ */
long long factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

/* ⚠️ Factorial grows FAST! */
/* 10! = 3,628,800 */
/* 13! = 6,227,020,800 (exceeds int range!) */
/* 20! = 2,432,902,008,176,640,000 (needs long long!) */
/* 21! exceeds even long long! */
```

---

## 💻 25.4 Related Problems

```c
/* ══════ Perfect Number (sum of divisors = number) ══════ */
int isPerfect(int n) {
    int sum = 1;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0)
            sum += i + (i != n/i ? n/i : 0);
    return sum == n && n != 1;
}
/* 6 = 1+2+3, 28 = 1+2+4+7+14 */

/* ══════ Prime Factorization ══════ */
void primeFactors(int n) {
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            printf("%d ", i);
            n /= i;
        }
    }
    if (n > 1) printf("%d", n);
}
/* 60 → 2 2 3 5 */

/* ══════ nCr (Combination) ══════ */
long long nCr(int n, int r) {
    if (r > n - r) r = n - r;    /* optimization */
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
```

---

## ❓ 25.5 MCQ Problems

---

**MCQ 1:** 1 কি prime number?

| Option | Answer |
|--------|--------|
| (a) হ্যাঁ | |
| (b) **না** | ✅ |
| (c) Depends | |
| (d) 0 ও 1 দুটোই prime | |

> **1 prime নয়!** Prime definition: exactly **2** distinct divisors (1 ও নিজে)। 1 এর শুধু 1টি divisor

---

**MCQ 2:** `gcd(0, 5)` = ?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) **5** | ✅ |
| (c) 1 | |
| (d) Error | |

> gcd(0, 5): b=5≠0 → gcd(5, 0%5=0) → b=0 → return a=**5**

---

**MCQ 3:** `lcm(4, 6)` = ?

| Option | Answer |
|--------|--------|
| (a) 24 | |
| (b) **12** | ✅ |
| (c) 2 | |
| (d) 10 | |

> gcd(4,6)=2. lcm = (4/2)*6 = **12**

---

**MCQ 4:** 13! int এ store করা যাবে?

| Option | Answer |
|--------|--------|
| (a) হ্যাঁ | |
| (b) **না (overflow!)** | ✅ |
| (c) Depends | |
| (d) Always works | |

> 13! = 6,227,020,800 > INT_MAX (2,147,483,647)! **long long** লাগবে

---

**MCQ 5:** Prime check এ কেন `i*i <= n` পর্যন্ত check করলেই যথেষ্ট?

| Option | Answer |
|--------|--------|
| (a) Performance | |
| (b) **n = a×b হলে a বা b অবশ্যই ≤ √n** | ✅ |
| (c) Tradition | |
| (d) কোনো কারণ নেই | |

> কোনো factor √n এর বেশি হলে অন্যটি অবশ্যই √n এর কম — তাই √n পর্যন্ত check **যথেষ্ট**

---

**MCQ 6:** `a × b = gcd(a,b) × lcm(a,b)` — True?

| Option | Answer |
|--------|--------|
| (a) **True (always!)** | ✅ |
| (b) False | |
| (c) Sometimes | |
| (d) Only for primes | |

> **Mathematical identity!** সবসময় সত্য। lcm = a*b/gcd = (a/gcd)*b

---

## 📝 25.7 Summary

- **Prime:** exactly 2 divisors (1 ও নিজে)। **1 prime নয়!** Check √n পর্যন্ত — O(√n)। All primes > 3 are **6k±1** form

- **GCD (Euclidean):** `gcd(a,b) = gcd(b, a%b)`, base: `b==0 → return a`। **O(log(min(a,b)))** — খুবই efficient

- **LCM:** `lcm(a,b) = (a / gcd(a,b)) * b`। **a/gcd আগে** করুন overflow এড়াতে! **Identity:** `a × b = gcd × lcm`

- **Factorial:** n! grows **extremely fast**! 13! > INT_MAX → **long long** ব্যবহার করুন। 21! > LLONG_MAX! Iterative version = safe (no stack overflow), recursive = elegant

- **Perfect number:** divisors এর sum = number itself। 6, 28, 496, 8128...

- **nCr formula:** `nCr = n!/(r!(n-r)!)` — কিন্তু **iterative multiplication/division** ব্যবহার করুন overflow এড়াতে

---
---

<div align="center">


*Number crunching, searching, sorting — algorithm fundamentals*

</div>

---
---
