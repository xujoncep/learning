# 04 — Process Synchronization: Peterson & Semaphores

> Critical Section Problem, Peterson's Solution এবং Semaphores-এর মাধ্যমে Synchronization হ্যান্ডেল করার পদ্ধতি।

---

## Core Mechanics: The Critical Section

যখন একাধিক প্রসেস একটি shared resource (যেমন: global variable) এক্সেস করতে চায়, তখন **Race Condition** তৈরি হতে পারে। কোডের যে অংশে shared resource এক্সেস করা হয় তাকে **Critical Section (CS)** বলে।

### ৩টি শর্ত (Must fulfill):
1. **Mutual Exclusion:** কেউ CS-এ থাকলে অন্য কেউ ঢুকতে পারবে না।
2. **Progress:** কেউ CS-এ না থাকলে এবং কেউ ঢুকতে চাইলে তাকে বাধা দেওয়া প্রবেশ করার অনুমতি দেওয়া।
3. **Bounded Waiting:** একজন প্রসেসকে অনির্দিষ্টকাল অপেক্ষা করানো যাবে না।

---

## Technical Walkthrough: Peterson's Solution

এটি ২ প্রসেসের জন্য একটি pure software solution। এখানে ২টি ভেরিয়েবল ব্যবহার হয়: `flag[2]` এবং `turn`।

```c
// Process Pi
flag[i] = true;
turn = j; // Give chance to other process
while (flag[j] && turn == j); // Busy wait

// CRITICAL SECTION

flag[i] = false; // Exit section
```

**কেন এটি কাজ করে?**
- `flag` প্রসেসের ইচ্ছা (intent) প্রকাশ করে।
- `turn` প্রসেসের ভদ্রতা (politeness) প্রকাশ করে। যদি দুজন একসাথে ঢুকতে চায়, যে শেষে `turn` সেট করবে সে ওয়েট করবে।

---

## Numerical: Semaphore Values

**Semaphores** হলো একটি integer variable যা ২টি standard operation দিয়ে কন্ট্রোল হয়: `Wait() / P()` এবং `Signal() / V()`।

**Problem:** 
একটি counting semaphore-এর প্রাথমিক ভ্যালু ১০। এরপর তাতে ৬টি $P$ (wait) এবং ৪টি $V$ (signal) অপারেশন করা হলো। বর্তমান ভ্যালু কত?

**Solution:**
Starting value = $10$
After 6 $P$ operations: $10 - 6 = 4$
After 4 $V$ operations: $4 + 4 = 8$
**Final Value:** $8$

---

## MCQs (Practice Set - 10+ Gold Standard)

1. **Race Condition কোথায় দেখা যায়?**
   - (A) Single process
   - (B) Shared resources without control
   - (C) Large RAM
   - (D) Hard drive
   - **Ans: B**

2. **Peterson's solution কয়টি প্রসেসর জন্য প্রযোজ্য?**
   - (A) 1
   - (B) 2-process only
   - (C) 3
   - (D) Infinite
   - **Ans: B**

3. **Mutex-এর পূর্ণরূপ কী?**
   - (A) Multiple Execution
   - (B) Mutual Exclusion
   - (C) Multi-tasking
   - (D) Memory Exit
   - **Ans: B**

4. **Semaphore-এর $P$ (Wait) অপারেশন কী করে?**
   - (A) Increment
   - (B) Decrement
   - (C) Multiply
   - (D) Reset
   - **Ans: B**

5. **Binary Semaphore-এর ভ্যালু কত হতে পারে?**
   - (A) 0 to 1
   - (B) -1 to 1
   - (C) Any integer
   - (D) Only 1
   - **Ans: A**

6. **Busy Waiting-এর অন্য নাম কী?**
   - (A) Sleeping lock
   - (B) Spinlock
   - (C) Deadlock
   - (D) Livelock
   - **Ans: B**

7. **Critical Section-এর প্রথম শর্ত কোনটি?**
   - (A) Progress
   - (B) Bounded Waiting
   - (C) Mutual Exclusion
   - (D) Speed
   - **Ans: C**

8. **Producer-Consumer সমস্যায় কোন shared buffer ব্যবহৃত হয়?**
   - (A) Stack
   - (B) Bounded Buffer
   - (C) Queue
   - (D) Linked List
   - **Ans: B**

9. **Signal() - $V$ অপারেশন করলে সেমাফোরের ভ্যালু কী হয়?**
   - (A) কমে যায়
   - (B) বেড়ে যায়
   - (C) একই থাকে
   - (D) শূন্য হয়
   - **Ans: B**

10. **Dining Philosophers समस्या কিসের উদাহরণ?**
    - (A) CPU scheduling
    - (B) Synchronization & Deadlock
    - (C) Memory allocation
    - (D) Page replacement
    - **Ans: B**

11. **সেমাফোর ভেরিয়েবল $S$ এর ইনিশিয়াল ভ্যালু ৭। তারপর ২০টি $P$ এবং ১৫টি $V$ করা হলে বর্তমান ভ্যালু কত?**
    - (A) 1 (B) 0 **(C) 2** (D) 5
    - *Logic:* $7 - 20 + 15 = 2$

---

## Written Problems (5+ Gold Standard)

1. **What is Race Condition? Give an example.**
   - **Solution:** যখন মাল্টিপল প্রসেস একসাথে শেয়ারড ডাটা এক্সেস করে এবং আউটপুট তাদের এক্সিকিউশন অর্ডারের ওপর নির্ভর করে। উদাহরণ: ব্যাংক ব্যালেন্স আপডেট।

2. **Explain the 3 requirements of Critical Section Problem.**
   - **Solution:** 
     - **Mutual Exclusion:** একজন ভেতরে থাকলে অন্য কেউ ঢুকবে না।
     - **Progress:** ফালতু কেউ কাউকে বাধা দিবে না।
     - **Bounded Waiting:** নির্দিষ্ট সময় পর সুযোগ পেতে হবে।

3. **Why is Peterson's Solution limited?**
   - **Solution:** এটি শুধুমাত্র ২টো প্রসেসের জন্য কাজ করে এবং আধুনিক আর্কিটেকচারে (Out-of-order execution) এটি সবসময় নির্ভুল নাও হতে পারে।

4. **Explain Bounded Buffer (Producer-Consumer) problem.**
   - **Solution:** এখানে প্রডিউসার ডাটা তৈরি করে বাফারে রাখে এবং কনজিউমার তা নেয়। বাফার ফুল থাকলে প্রডিউসার ওয়েট করবে, খালি থাকলে কনজিউমার ওয়েট করবে।

5. **Solve: Initial value of counting semaphore is 10. Perform 6 $P$ and 4 $V$. Final value?**
   - **Solution:** Initial = 10. After 6 $P$: $10-6=4$. After 4 $V$: $4+4=8$. Result: 8.


---

## Job Exam Special (BPSC/Bank)

- **Key Point:** Semaphore-এর ভ্যালু নেগেটিভ হতে পারে যদি সেটি `counting semaphore` হয় (কিছু ইমপ্লিমেন্টেশনে ওয়েটিং প্রসেসের সংখ্যা বোঝাতে)।
- **Pattern:** মডার্ন ব্যাংকিং সফটওয়্যারে 'Transaction Isolation' বুঝাতে সিনক্রোনাইজেশন কনসেপ্ট থেকে প্রশ্ন আসে।

---

## Interview Traps

- **Trap 1:** "Semaphore কি ড্যাডলক ঠেকাতে পারে?" সবসময় না, ভুলভাবে ব্যবহার করলে সেমাফোর নিজেই ড্যাডলক তৈরি করতে পারে।
- **Trap 2:** "Spinlock কি ভালো?" যদি ওয়েটিং টাইম খুব কম হয় তবে ভালো, কারণ এটি Context switch-এর ওভারহেড বাঁচায়।
- **Trap 3:** "Mutex আর Binary Semaphore কি একদম এক?" না, Mutex-এর 'Ownership' কনসেপ্ট আছে (যে ল্ক করবে তাকেই রিলিজ করতে হবে), সেমাফোরে তা নেই।


