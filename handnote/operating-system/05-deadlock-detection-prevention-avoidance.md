# 05 — Deadlock: Banker's Algorithm & Prevention

> Deadlock-এর ৪টি শর্ত, Banker's Algorithm (Safety Check) এবং Deadlock হ্যান্ডেল করার উপায়।

---

## Core Mechanics: Necessary Conditions

একটি সিস্টেমে ডেডলক হওয়ার জন্য ৪টি শর্ত **একসাথে** পূরণ হতে হবে:
1. **Mutual Exclusion:** অ্যাটলিস্ট একটি রিসোর্স শেয়ার করা যাবে না।
2. **Hold and Wait:** একটি ধরে রেখে অন্যটির জন্য ওয়েট করা।
3. **No Pre-emption:** জোর করে রিসোর্স কেড়ে নেওয়া যাবে না।
4. **Circular Wait:** প্রসেসগুলো সাইকেল তৈরি করবে ($P1 \to P2 \to P3 \to P1$)।

---

## Numerical Step-by-Step: Banker's Algorithm (Gold Standard)

এটি একটি **Deadlock Avoidance** অ্যালগরিদম যা চেক করে সিস্টেমটি **Safe State**-এ আছে কি না।

**Data:** 
- ৫টি প্রসেস ($P0$ to $P4$)
- ৩ ধরণের রিসোর্স ($A=10, B=5, C=7$)

| Process | Allocation (A B C) | Max Need (A B C) | Available (A B C) |
|---|---|---|---|
| P0 | 0 1 0 | 7 5 3 | **3 3 2** |
| P1 | 2 0 0 | 3 2 2 | |
| P2 | 3 0 2 | 9 0 2 | |
| P3 | 2 1 1 | 2 2 2 | |
| P4 | 0 0 2 | 4 3 3 | |

### 🛠️ Step-by-Step Solution:

**Step 1: Calculate Need Matrix ($Need = Max - Allocation$)**
- $P0: (7 5 3) - (0 1 0) = 7 4 3$
- $P1: (3 2 2) - (2 0 0) = 1 2 2$
- $P2: (9 0 2) - (3 0 2) = 6 0 0$
- $P3: (2 2 2) - (2 1 1) = 0 1 1$
- $P4: (4 3 3) - (0 0 2) = 4 3 1$

**Step 2: Safety Check (Available = 3 3 2)**
1. **Check P0:** Is $Need(7 4 3) \le Available(3 3 2)$? **No.**
2. **Check P1:** Is $Need(1 2 2) \le Available(3 3 2)$? **Yes.**
   - Execute P1, Release its Allocation.
   - New Available = $(3 3 2) + (2 0 0) = \mathbf{5\,3\,2}$
3. **Check P2:** Is $Need(6 0 0) \le Available(5 3 2)$? **No.**
4. **Check P3:** Is $Need(0 1 1) \le Available(5 3 2)$? **Yes.**
   - Execute P3, Release its Allocation.
   - New Available = $(5 3 2) + (2 1 1) = \mathbf{7\,4\,3}$
5. **Check P4:** Is $Need(4 3 1) \le Available(7 4 3)$? **Yes.**
   - Execute P4, Release its Allocation.
   - New Available = $(7 4 3) + (0 0 2) = \mathbf{7\,4\,5}$
6. **Re-check P0:** Is $Need(7 4 3) \le Available(7 4 5)$? **Yes.**
   - Execute P0, Release its Allocation.
   - New Available = $(7 4 5) + (0 1 0) = \mathbf{7\,5\,5}$
7. **Re-check P2:** Is $Need(6 0 0) \le Available(7 5 5)$? **Yes.**
   - Execute P2, Release its Allocation.
   - New Available = $(7 5 5) + (3 0 2) = \mathbf{10\,5\,7}$ (সব রিসোর্স হাতে ফিরে এল!)

**Safe Sequence:** $P1 \to P3 \to P4 \to P0 \to P2$। সিস্টেমটি নিরাপদ।

---

## MCQs (Practice Set - 12 Questions)

1. **ডেডলকের জন্য কয়টি শর্ত আবশ্যক?**
   - (A) 2 (B) 3 **(C) 4** (D) 5
2. **Banker's Algorithm কীসের জন্য ব্যবহৃত হয়?**
   - (A) Detection (B) Prevention **(C) Avoidance** (D) Recovery
3. **Circular Wait ভাঙার সবচেয়ে ভালো উপায় কী?**
   - **(A) Resource ordering** (B) Paging (C) Priority (D) Mutex
4. **সিস্টেম যদি Safe State-এ না থাকে তবে তাকে কী বলে?**
   - (A) Deadlock **(B) Unsafe State** (C) Critical Section (D) Starvation
5. **RAG-এ সাইকেল থাকলে সিঙ্গেল রিসোর্স ইনস্ট্যান্স সিস্টেমে কী হয়?**
   - (A) No deadlock **(B) Deadlock নিশ্চিত** (C) Maybe (D) Starvation
6. **নিচের কোনটি Deadlock Prevention টেকনিক নয়?**
   - (A) No pre-emption **(B) Banker's algorithm** (C) Eliminate Hold & Wait (D) Circular Wait Break
7. **Ostrich Algorithm মানে কী?**
   - (A) Fix it **(B) Ignore it** (C) Prevent it (D) Detect it
8. **Need matrix-এর ফর্মুলা কোনটি?**
   - (A) Alloc - Max **(B) Max - Alloc** (C) Alloc + Max (D) Available - Alloc
9. **Deadlock Recovery করার উপায় কোনটি?**
   - **(A) Process termination** (B) Paging (C) Caching (D) Waiting
10. **Hold and Wait দূর করার উপায় কী?**
    - **(A) একবারে সব রিসোর্স রিকোয়েস্ট করা** (B) প্রসেস কিল করা (C) বাফারিং (D) থ্রেডিং
11. **রিসোর্স রিকোয়েস্ট গ্রাফের এজ যখন রিসোর্স থেকে প্রসেসের দিকে যায় তখন তাকে কী বলে?**
    - (A) Request Edge **(B) Assignment Edge** (C) Claim Edge (D) Back Edge
12. **সিস্টেম সবসময় Safe State এ থাকলে কী হয়?**
    - **(A) ডেডলক হবে না** (B) থ্র্যাশিং হবে (C) প্রসেস ফাস্ট হবে (D) মেমোরি বাঁচবে

---

## Written Problems (5+ Gold Standard)

1. **Differences between Deadlock Prevention vs Avoidance.**
   - **Solution:** Prevention মানে শর্তগুলোকে অসম্ভব করে তোলা (Static), Avoidance মানে রানিং টাইমে চেক করা (Dynamic)।

2. **Wait-for Graph (WFG) কী?**
   - **Solution:** যখন Resource Allocation Graph থেকে রিসোর্স নোড সরিয়ে শুধু প্রসেস টু প্রসেস ওয়েটিং দেখানো হয়। এটি ডেডলক ডিটেকশনে ব্যবহৃত হয়।

3. **Can a system in Unsafe State be Deadlock-free?**
   - **Solution:** হ্যাঁ, আনসেফ স্টেট মানেই ডেডলক নয়, তবে সেখানে ডেডলক হওয়ার সম্ভাবনা থাকে।

4. **Resource Allocation Graph আঁক যখন P1 ওয়েট করছে R1 এর জন্য এবং R1 অলরেডি P2 কে দেওয়া হয়েছে।**
   - **Solution:** $P1 \to R1 \to P2$ (এটি একটি পাথ, সাইকেল নয়)।

5. **Explain 'No Preemption' in Deadlock.**
   - **Solution:** প্রসেস নিজে থেকে না ছাড়লে ওএস জোর করে রিসোর্স নিতে পারবে না। এটি দূর করতে ওএস প্রসেসকে সাসপেন্ড করে রিসোর্স কেড়ে নিতে পারে।

---

## Job Exam Special (BPSC/Bank)

- **GATE Note:** Banker's Algorithm-এর ম্যাথ প্রতি বছর আসে। প্রসেস আইডি সিকোয়েন্স ভুল করা যাবে না।
- **Bank Note:** ডেডলকের ৪টি শর্তের নাম খুব কমন প্রশ্ন।

---

## Interview Traps

- **Trap 1:** "Circular wait থাকলেই কি ডেডলক?" শুধু যদি রিসোর্সগুলোর মাল্টিপল ইনস্ট্যান্স থাকে তবে ডেডলক নাও হতে পারে। সিঙ্গেল রিসোর্স ইনস্ট্যান্সে সাইকেল মানেই ডেডলক।
- **Trap 2:** "Safe state মানে কি ডেডলক একদম হবে না?" হ্যাঁ, সেফ স্টেটে থাকলে সিস্টেম ডেডলক ফ্রি থাকবে।
- **Trap 3:** "Banker's algorithm কেন প্র্যাকটিকালি ব্যবহার হয় না?" কারণ প্রসেসের Max Need আগে থেকে জানা কঠিন।
