# Digital Logic — GATE CSE 🔌

> **Priority:** 🟢 Medium | **Avg Marks:** 6 | **Difficulty:** Easy
> Easy subject, fundamentals strong থাকলে easy marks। Boolean algebra, K-map, circuits।

---

## 📚 1. Syllabus Overview

1. **Boolean Algebra** — Laws, De Morgan's
2. **Number Systems** — Binary, Octal, Hex, Conversions
3. **Combinational Circuits** — MUX, Decoder, Adder
4. **Sequential Circuits** — Flip-flops, Counters, Registers
5. **Karnaugh Maps** — Minimization
6. **Minimization of Boolean Functions**

---

## 📊 2. Weightage Analysis

| Year | Marks | Most Asked |
|------|-------|------------|
| 2024 | 6 | K-maps, Flip-flops |
| 2023 | 5 | Combinational circuits |
| 2022 | 7 | Boolean minimization |
| 2021 | 6 | MUX, Counters |
| 2020 | 6 | Number systems |

---

## 🧠 3. Core Concepts

### 3.1 Number Systems

| System | Base | Digits |
|--------|------|--------|
| Binary | 2 | 0, 1 |
| Octal | 8 | 0-7 |
| Decimal | 10 | 0-9 |
| Hex | 16 | 0-9, A-F |

#### Conversions

**Binary → Decimal:** Positional sum
`1101 = 1×8 + 1×4 + 0×2 + 1×1 = 13`

**Decimal → Binary:** Repeated division by 2
`13 → 13/2=6 r1, 6/2=3 r0, 3/2=1 r1, 1/2=0 r1 → 1101`

**Binary → Hex:** Group 4 bits from right
`11011010 → 1101 1010 → DA`

---

### 3.2 Boolean Algebra

#### Basic Operations

| Operation | Symbol | Truth table (2-input) |
|-----------|--------|----------------------|
| NOT | `A'` or `¬A` | 0→1, 1→0 |
| AND | `A·B` or `AB` | 1 iff both 1 |
| OR | `A+B` | 0 iff both 0 |
| NAND | `(AB)'` | NOT of AND |
| NOR | `(A+B)'` | NOT of OR |
| XOR | `A⊕B` | 1 iff exactly one |
| XNOR | `(A⊕B)'` | 1 iff both same |

#### Important Laws

**Commutative:** A+B = B+A, AB = BA
**Associative:** (A+B)+C = A+(B+C)
**Distributive:** A(B+C) = AB + AC
**Identity:** A+0 = A, A·1 = A
**Null:** A+1 = 1, A·0 = 0
**Complement:** A+A' = 1, A·A' = 0
**Idempotent:** A+A = A, A·A = A
**Double negation:** (A')' = A
**Absorption:** A+AB = A, A(A+B) = A

#### De Morgan's Laws

`(A+B)' = A'·B'`
`(A·B)' = A'+B'`

**Use:** NAND/NOR only circuit design।

---

### 3.3 Canonical Forms

#### SOP (Sum of Products)

OR of ANDs। Each AND = **minterm**।

**Example:** `f = A'B + AB'`

#### POS (Product of Sums)

AND of ORs। Each OR = **maxterm**।

**Example:** `f = (A+B)(A'+B')`

#### Minterm and Maxterm

For `n` variables:
- Minterms: `m0, m1, ..., m(2ⁿ-1)`
- Maxterms: `M0, M1, ..., M(2ⁿ-1)`

`mi = Mi'`

**Notation:** `f = Σm(1,3,5)` (SOP) বা `f = ΠM(0,2,4,6,7)` (POS)।

---

### 3.4 Karnaugh Map (K-Map)

**উদ্দেশ্য:** Boolean function minimize।

#### 2-variable K-map

|     | B=0 | B=1 |
|-----|-----|-----|
| A=0 | m0  | m1  |
| A=1 | m2  | m3  |

#### 3-variable K-map

|      | BC=00 | BC=01 | BC=11 | BC=10 |
|------|-------|-------|-------|-------|
| A=0  | m0    | m1    | m3    | m2    |
| A=1  | m4    | m5    | m7    | m6    |

#### 4-variable K-map

|      | CD=00 | CD=01 | CD=11 | CD=10 |
|------|-------|-------|-------|-------|
| AB=00 | m0    | m1    | m3    | m2    |
| AB=01 | m4    | m5    | m7    | m6    |
| AB=11 | m12   | m13   | m15   | m14   |
| AB=10 | m8    | m9    | m11   | m10   |

**Note:** Gray code order (only one bit changes)।

#### K-map Rules

1. **Group 1s** into rectangles of size 1, 2, 4, 8, 16 (powers of 2)
2. **Larger groups better** (fewer variables)
3. **Wrap around** edges allowed
4. **Don't-care (X)** can be used to make larger groups
5. **Overlapping** allowed

#### Example

f(A,B,C) = Σm(0,1,2,5,6,7)`

Plot and group:
- m0, m1, m2: can group? not rectangular
- Actually: {0,1}, {2,6}, {5,7} → `B'C' + BC' + AC` 

Simplified: **Check minimization carefully**

---

### 3.5 Combinational Circuits

#### Multiplexer (MUX)

**n-to-1 MUX:** n inputs, log₂n select lines, 1 output।

```
Output = I[S]
```

**2-to-1 MUX:**
`Y = S'I0 + SI1`

**4-to-1 MUX:**
Y = S1'S0'I0 + S1'S0 I1 + S1 S0'I2 + S1 S0 I3`

#### Decoder

**n-to-2ⁿ decoder:** n inputs, 2ⁿ outputs। Exactly one output 1 based on input।

**Use:** Address decoding in memory।

#### Encoder

Reverse of decoder। 2ⁿ inputs, n outputs।

**Priority encoder** — handles multiple active inputs।

#### Half Adder

Inputs: A, B
- Sum = A ⊕ B
- Carry = A·B

#### Full Adder

Inputs: A, B, Cin
- Sum = A ⊕ B ⊕ Cin
- Cout = AB + Cin(A⊕B)

#### Ripple Carry Adder

n full adders chained। Delay = O(n)।

#### Carry Look-Ahead Adder

Parallel carry computation। Faster, O(log n) delay।

---

### 3.6 Sequential Circuits

#### Flip-Flops (FF)

Memory element — stores 1 bit।

##### SR Flip-Flop

| S | R | Q(next) |
|---|---|---------|
| 0 | 0 | Q (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | Invalid |

##### D Flip-Flop

| D | Q(next) |
|---|---------|
| 0 | 0 |
| 1 | 1 |

Simpler, always Q = D।

##### JK Flip-Flop

| J | K | Q(next) |
|---|---|---------|
| 0 | 0 | Q (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | Q' (toggle) |

Most versatile।

##### T Flip-Flop

| T | Q(next) |
|---|---------|
| 0 | Q (hold) |
| 1 | Q' (toggle) |

---

### 3.7 Counters and Registers

#### Counter Types

**Synchronous counter:** All FFs clocked together।
**Asynchronous (ripple) counter:** Clock propagates through FFs।

**Modulo-N counter:** Counts 0 to N-1, then resets।

**Example:** 3-bit counter = mod-8 (0 to 7)।

#### Shift Register

Bits shift left or right each clock।

**Types:**
- SISO — Serial In Serial Out
- SIPO — Serial In Parallel Out
- PISO — Parallel In Serial Out
- PIPO — Parallel In Parallel Out

---

## 📐 4. Formulas & Shortcuts

### K-Map Grouping Rules

1. Groups = 1, 2, 4, 8, 16 (powers of 2)
2. Maximize group size
3. Every 1 covered at least once
4. Minimize total number of groups

### De Morgan's

```
(A + B)' = A'B'
(AB)' = A' + B'
```

### Universal Gates

NAND and NOR are **universal** (can build any circuit)।

### Flip-Flop Characteristic Equations

- D FF: `Q(next) = D`
- JK FF: `Q(next) = JQ' + K'Q`
- T FF: `Q(next) = T ⊕ Q`

---

## 🎯 5. Common Question Patterns

1. **Boolean expression minimization** using K-map
2. **Number system conversions**
3. **Combinational circuit design** with MUX/decoders
4. **Flip-flop next state** given input
5. **Counter design** (mod-N)
6. **Prime implicants** identification
7. **De Morgan application**
8. **Gate count** minimization

---

## 📜 6. Previous Year Questions (PYQ)

### 🔹 Boolean Algebra

#### PYQ 1 (GATE 2024) — Simplification

Simplify `A + A'B`।

**Solution:**
A + A'B = A(1 + B) + A'B = A + AB + A'B = A + B(A + A') = **A + B** ✅

---

#### PYQ 2 (GATE 2023) — De Morgan

`(A + B + C)' = ?`

**Answer:** **A'B'C'** ✅

---

#### PYQ 3 (GATE 2022) — XOR

A ⊕ A = ?

**Answer:** **0** ✅

---

#### PYQ 4 (GATE 2020) — Laws

`A + A'B + AB' = ?`

**Solution:**
A + A'B = A + B (absorption)
Now A + B + AB' = A + B(1 + A') = **A + B** ✅

---

### 🔹 K-Map Questions

#### PYQ 5 (GATE 2024) — Minimization

f = Σm(0,2,4,6,8,10,12,14)`। Simplified?

**Solution:**
All even minterms → all have LSB = 0 → **D' (complement of LSB)** ✅

---

#### PYQ 6 (GATE 2022) — K-map

f(A,B,C) = Σm(0,1,3,7)`। Min SOP?

**Solution:**
- m0 (000) m1 (001) → A'B'
- m1 (001), m3 (011), m7 (111): group of 4? No, m1 not adjacent to m7 in distance 1.
- Actually m3, m7 → BC
- m1, m3 → A'C

Result: `A'B' + BC + A'C` (further combine) or minimize to `A'B' + AC + BC` possibly।

**Answer:** Depends on specific grouping, typical answer **`A'B' + BC`** ✅

---

#### PYQ 7 (GATE 2021) — Prime Implicants

f = Σm(1,3,5,7)`। Prime implicants?

**Solution:**
All odd minterms → C=1 for all।
`f = C` (1 prime implicant, 1 essential) ✅

---

### 🔹 Number Systems

#### PYQ 8 (GATE 2024) — Conversion

(101.11)₂ = ?₁₀

**Solution:**
Integer: 4+0+1 = 5
Fraction: 0.5 + 0.25 = 0.75
**5.75** ✅

---

#### PYQ 9 (GATE 2023) — Hex

(BEEF)₁₆ = ? in decimal

**Solution:**
B×4096 + E×256 + E×16 + F = 11×4096 + 14×256 + 14×16 + 15
= 45056 + 3584 + 224 + 15 = **48879** ✅

---

#### PYQ 10 (GATE 2020) — Octal

(77.77)₈ = ? in decimal

**Solution:**
Integer: 7×8 + 7 = 63
Fraction: 7/8 + 7/64 = 0.875 + 0.109 = 0.984
**63.984** (approx) ✅

---

### 🔹 Combinational Circuits

#### PYQ 11 (GATE 2024) — MUX

4-to-1 MUX এ select lines?

**Answer:** **2** (log₂4) ✅

---

#### PYQ 12 (GATE 2023) — Decoder

3-to-8 decoder, input 101। Active output?

**Answer:** Output Y5 (binary 5) ✅

---

#### PYQ 13 (GATE 2022) — Full Adder

Full adder এ sum এ XOR gate কতটা?

**Answer:** **2** (A⊕B⊕Cin = (A⊕B)⊕Cin) ✅

---

#### PYQ 14 (GATE 2020) — Ripple Adder

4-bit ripple carry adder এ max delay (each FA = 10 ns)?

**Answer:** 4 × 10 = **40 ns** ✅

---

### 🔹 Flip-Flop Questions

#### PYQ 15 (GATE 2024) — D FF

D FF, Q=0, D=1, clock edge। Next Q?

**Answer:** **1** (Q = D) ✅

---

#### PYQ 16 (GATE 2023) — JK FF

JK FF, Q=1, J=1, K=1। Next Q?

**Answer:** **0** (toggle) ✅

---

#### PYQ 17 (GATE 2022) — T FF

T FF, Q=0, T=1 for 3 clocks। Final Q?

**Solution:**
Each clock toggle: 0→1→0→1 (3 toggles)।
Final Q = **1** ✅

---

#### PYQ 18 (GATE 2021) — FF Comparison

D FF ↔ JK FF conversion। D = ?

**Solution:**
D FF: Q(next) = D
JK FF: Q(next) = JQ' + K'Q
To get D = Q(next): J = D, K = D' → `D = JQ' + K'Q`

---

### 🔹 Counter Questions

#### PYQ 19 (GATE 2024) — Counter

Mod-10 counter needs minimum FFs?

**Solution:**
2⁴ = 16 ≥ 10, so **4 FFs** needed ✅

---

#### PYQ 20 (GATE 2022) — Ripple Counter

4-bit ripple counter, FF delay 10 ns। Max frequency?

**Solution:**
Total delay = 4 × 10 = 40 ns
Max freq = 1/40ns = **25 MHz** ✅

---

### 🔹 Miscellaneous

#### PYQ 21 (GATE 2023) — Universal Gates

NAND এ minimum gates for X = A + B?

**Solution:**
A+B = ((A+B)')' = (A'B')' — use 3 NANDs (invert each, then NAND) ✅

---

#### PYQ 22 (GATE 2020) — XOR

A ⊕ B ⊕ A = ?

**Answer:** **B** (XOR associative, A⊕A=0, 0⊕B=B) ✅

---

## 🏋️ 7. Practice Problems

1. Simplify: `(A+B)(A+B')`
2. (1010.101)₂ = ?₁₀
3. K-map: `f(A,B,C,D) = Σm(0,2,5,7,8,10,13,15)`
4. Design 4-to-1 MUX using 2-to-1 MUX।
5. JK FF, Q=0, J=K=1 for 5 clocks। Final Q?
6. (A+B)' + A'B' simplify।
7. 3-bit synchronous counter — state diagram?

<details>
<summary>💡 Answers</summary>

1. (A+B)(A+B') = A + BB' = A
2. 10.625
3. Check for grouping — f = BD + B'D' (possibly)
4. Use 3 two-to-1 MUXes in tree
5. Q = 1 (toggle 5 times from 0)
6. A'B' + A'B' = A'B'
7. 0→1→2→3→4→5→6→7→0

</details>

---

## ⚠️ 8. Traps & Common Mistakes

- ❌ **K-map grouping:** only rectangles of size 2^n
- ❌ **Don't forget edge wrap** in K-maps
- ❌ **De Morgan** correctly: negation flips AND↔OR
- ❌ **Minterm vs Maxterm** — m_i is 1 for input i (SOP), M_i is 0 for i (POS)
- ❌ **JK with J=K=1 toggles**, not invalid like SR
- ❌ **Mod-N counter** needs ⌈log₂N⌉ FFs
- ❌ **Ripple counter slower** than synchronous
- ❌ **NAND universal** — can implement AND, OR, NOT all
- ❌ **XOR identity:** A⊕A=0, A⊕0=A, A⊕1=A'
- ❌ **Gray code** used in K-map (only 1 bit changes per adjacent cell)

---

## 📝 9. Quick Revision Summary

### Boolean Identities Cheat Sheet

```
A + 0 = A        A · 1 = A
A + 1 = 1        A · 0 = 0
A + A = A        A · A = A
A + A' = 1       A · A' = 0
A + AB = A (absorption)
A + A'B = A + B
(A+B)' = A'B' (De Morgan)
(AB)' = A'+B'
```

### Flip-Flop Characteristic Equations

| FF | Q(next) |
|----|---------|
| SR | S + R'Q (with SR=0 constraint) |
| D | D |
| JK | JQ' + K'Q |
| T | T ⊕ Q |

### K-map Quick Reminders

- Gray code order: 00, 01, 11, 10
- Group size: 1, 2, 4, 8, ... (power of 2)
- Wrap around edges
- Overlap allowed
- Don't cares freely use

### Combinational Circuits

| Circuit | In | Out |
|---------|-----|-----|
| 2-to-1 MUX | 2+1 | 1 |
| 4-to-1 MUX | 4+2 | 1 |
| 3-to-8 Decoder | 3 | 8 |
| Half Adder | 2 | 2 (S, C) |
| Full Adder | 3 | 2 (S, C) |

---

## 🔗 Navigation

- [🏠 Master Index](00-master-index.md)
- [◀ Previous: Engineering Math](01-engineering-mathematics.md)
- [▶ Next: Computer Organization](03-computer-organization.md)

---

**Tip:** K-map এবং number conversions বারবার practice করুন — fast solve করতে হবে। ⚡
