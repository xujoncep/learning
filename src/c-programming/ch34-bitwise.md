# Topic 34: Bitwise Operations & Bit Manipulation

<div align="center">

*"Bitwise = bit level manipulation — fastest operations in computer"*

</div>

---

## 📖 34.1 Operators & Truth Table

```
┌────┬────┬─────┬─────┬─────┐
│ A  │ B  │ A&B │ A|B │ A^B │
├────┼────┼─────┼─────┼─────┤
│ 0  │ 0  │  0  │  0  │  0  │
│ 0  │ 1  │  0  │  1  │  1  │
│ 1  │ 0  │  0  │  1  │  1  │
│ 1  │ 1  │  1  │  1  │  0  │
└────┴────┴─────┴─────┴─────┘

~A (NOT): flips all bits
A << n : left shift = A × 2ⁿ
A >> n : right shift = A ÷ 2ⁿ
```

---

## 💻 34.2 Common Bit Tricks

```c
/* ══════ Check even/odd ══════ */
if (n & 1) printf("Odd");       /* last bit = 1 → odd */
else       printf("Even");      /* last bit = 0 → even */

/* ══════ Multiply/Divide by 2 ══════ */
n << 1;     /* n × 2 */
n >> 1;     /* n ÷ 2 */
n << 3;     /* n × 8 (2³) */

/* ══════ Swap without temp ══════ */
a ^= b; b ^= a; a ^= b;       /* XOR swap! */

/* ══════ Check if power of 2 ══════ */
if (n > 0 && (n & (n-1)) == 0)  /* power of 2! */
/* 8=1000, 7=0111, 8&7=0000 → true! */

/* ══════ Set, Clear, Toggle, Check bit ══════ */
n |=  (1 << k);    /* SET bit k   (turn ON)  */
n &= ~(1 << k);    /* CLEAR bit k (turn OFF) */
n ^=  (1 << k);    /* TOGGLE bit k (flip)    */
(n >> k) & 1;      /* CHECK bit k (0 or 1)   */

/* ══════ Count set bits (Brian Kernighan) ══════ */
int countBits(int n) {
    int count = 0;
    while (n) { n &= (n-1); count++; }
    return count;
}
/* ⚡ Each iteration removes LOWEST set bit! */
```

---

## ❓ 34.3 MCQ Problems

---

**MCQ 1:** `12 & 10` = ?

| Option | Answer |
|--------|--------|
| (a) **8** | ✅ |
| (b) 14 | |
| (c) 6 | |
| (d) 2 | |

> 1100 & 1010 = **1000** = 8

---

**MCQ 2:** `5 << 3` = ?

| Option | Answer |
|--------|--------|
| (a) 15 | |
| (b) **40** | ✅ |
| (c) 8 | |
| (d) 2 | |

> 5 × 2³ = 5 × 8 = **40**

---

**MCQ 3:** `n & (n-1)` কী করে?

| Option | Answer |
|--------|--------|
| (a) n double করে | |
| (b) **Lowest set bit remove করে** | ✅ |
| (c) All bits flip | |
| (d) Nothing | |

> 12=**1100**, 11=1011, 12&11=**1000** (lowest set bit gone!)

---

**MCQ 4:** `~0` = ?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) 1 | |
| (c) **-1** | ✅ |
| (d) MAX_INT | |

> ~0 = all bits 1 = **-1** (2's complement)। Rule: `~x = -(x+1)`

---

## 📝 34.5 Summary

- **`n & 1`** = even/odd check (fastest!). **`n << k`** = n × 2ᵏ. **`n >> k`** = n ÷ 2ᵏ

- **Bit manipulation:** SET `n |= (1<<k)`, CLEAR `n &= ~(1<<k)`, TOGGLE `n ^= (1<<k)`, CHECK `(n>>k) & 1`

- **Power of 2 check:** `n & (n-1) == 0` (and n > 0). **XOR swap:** `a^=b; b^=a; a^=b;`

- **`~x = -(x+1)`**: `~0`=-1, `~5`=-6. **Count bits:** Brian Kernighan `n &= (n-1)` loop

---
---
