# Topic 26: Number System Conversion

<div align="center">

*"Decimal ↔ Binary ↔ Octal ↔ Hex — computer এর ভাষা বুঝতে হলে base conversion জানতেই হবে"*

</div>

---

## 📖 26.1 Number Systems Overview

```
┌──────────┬──────┬──────────┬──────────────────┐
│ System   │ Base │ Digits   │ C Prefix         │
├──────────┼──────┼──────────┼──────────────────┤
│ Binary   │  2   │ 0, 1     │ 0b (0b1010)      │
│ Octal    │  8   │ 0-7      │ 0  (012)         │
│ Decimal  │ 10   │ 0-9      │ none (10)        │
│ Hex      │ 16   │ 0-9, A-F │ 0x (0xA)         │
└──────────┴──────┴──────────┴──────────────────┘

Quick Table:
Dec │ Bin  │ Oct │ Hex
────┼──────┼─────┼────
 0  │ 0000 │  0  │  0
 5  │ 0101 │  5  │  5
 10 │ 1010 │ 12  │  A
 15 │ 1111 │ 17  │  F
 16 │10000 │ 20  │ 10
255 │11111111│377│ FF
```

---

## 💻 26.2 Conversion Functions

```c
#include <stdio.h>

/* ══════ Decimal → Binary (print) ══════ */
void decToBin(int n) {
    if (n == 0) { printf("0"); return; }
    int bits[32], count = 0;
    while (n > 0) {
        bits[count++] = n % 2;
        n /= 2;
    }
    for (int i = count - 1; i >= 0; i--)
        printf("%d", bits[i]);
}
/* 13 → 1101 */

/* ══════ Binary → Decimal ══════ */
int binToDec(long long bin) {
    int dec = 0, base = 1;
    while (bin > 0) {
        dec += (bin % 10) * base;
        base *= 2;
        bin /= 10;
    }
    return dec;
}
/* 1101 → 13 */

/* ══════ Decimal → Octal ══════ */
void decToOct(int n) {
    printf("%o", n);          /* built-in! */
}

/* ══════ Decimal → Hex ══════ */
void decToHex(int n) {
    printf("%X", n);          /* built-in! */
}

/* ══════ printf built-in conversions ══════ */
int main() {
    int n = 255;
    printf("Decimal: %d\n", n);     /* 255 */
    printf("Octal:   %o\n", n);     /* 377 */
    printf("Hex:     %X\n", n);     /* FF */
    printf("Hex(0x): %#x\n", n);    /* 0xff */

    return 0;
}
```

---

## ❓ 26.3 MCQ Problems

---

**MCQ 1:** Binary `1011` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) **11** | ✅ |
| (c) 13 | |
| (d) 9 | |

> 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = **11**

---

**MCQ 2:** Decimal `25` = Binary?

| Option | Answer |
|--------|--------|
| (a) 10101 | |
| (b) **11001** | ✅ |
| (c) 10011 | |
| (d) 11010 | |

> 25÷2: 1,0,0,1,1 (bottom-up) → **11001**

---

**MCQ 3:** `0xFF` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 16 | |
| (b) **255** | ✅ |
| (c) 15 | |
| (d) 256 | |

> F=15. 15×16+15 = 240+15 = **255**

---

**MCQ 4:** Octal `17` = Decimal?

| Option | Answer |
|--------|--------|
| (a) 17 | |
| (b) **15** | ✅ |
| (c) 14 | |
| (d) 8 | |

> 1×8 + 7×1 = **15**

---

## 📝 26.4 Summary

- **Binary** (base 2): computer এর native language। C prefix: `0b`। **Octal** (base 8): prefix `0`। **Hex** (base 16): prefix `0x`

- **Decimal → Binary:** বারবার 2 দিয়ে ভাগ, remainder নিচ থেকে পড়ুন। **Binary → Decimal:** প্রতিটি bit × 2^position

- **printf** built-in conversion: `%o`=octal, `%x`=hex, `%d`=decimal। `%#x` = "0x" prefix সহ

- **Quick trick:** 4-bit group = 1 hex digit। `1111` = F, `1010` = A। Binary ↔ Hex দ্রুত convert হয়

---
---
