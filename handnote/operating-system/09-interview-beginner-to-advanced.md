# Chapter 09 — Interview Prep (Beginner to Advanced)

> Operating System interview ladder: concept clarity → problem solving → advanced systems thinking।

---

## LEVEL A: Beginner

### Q1: Operating System কী?
**Answer:** OS হলো software layer যা hardware resources manage করে এবং application-কে execution environment দেয়।

### Q2: Kernel কী?
**Answer:** OS-এর core অংশ যা privileged mode-এ run করে এবং memory, process, device manage করে।

### Q3: Process কী?
**Answer:** Program in execution; runtime state + resources সহ active entity।

### Q4: Thread কী?
**Answer:** Process-এর smallest schedulable execution unit।

### Q5: Process আর Thread পার্থক্য?
**Answer:** Process isolated address space; thread same process memory share করে।

### Q6: Context switch কী?
**Answer:** CPU এক process/thread থেকে অন্যটায় গেলে context save-restore operation।

### Q7: System call কী?
**Answer:** user mode program থেকে kernel service invoke করার interface।

### Q8: User mode vs kernel mode?
**Answer:** user mode restricted; kernel mode privileged।

### Q9: Deadlock কী?
**Answer:** processes cyclic wait করে এবং কেউ progress করতে পারে না।

### Q10: Virtual memory কী?
**Answer:** logical memory abstraction যেখানে disk backing দিয়ে বড় address space emulate করা হয়।

---

## LEVEL B: Intermediate

### Q11: CPU scheduling metrics কী কী?
**Answer:** Waiting time, Turnaround time, Response time, Throughput, CPU utilization।

### Q12: FCFS issue?
**Answer:** convoy effect; short job long job-এর পেছনে অযথা wait করে।

### Q13: SJF কেন optimal (avg WT)?
**Answer:** shortest burst আগে run করলে average waiting time theoretical minimum হয় (future burst জানা থাকলে)।

### Q14: RR time quantum tradeoff?
**Answer:** ছোট quantum = responsive but overhead বেশি; বড় quantum = FCFS-like behavior।

### Q15: Race condition কী?
**Answer:** unsynchronized shared data access-এ output execution order-এর উপর নির্ভরশীল হয়ে যায়।

### Q16: Semaphore vs Mutex?
**Answer:** Mutex ownership-based lock; semaphore signaling/counting synchronization primitive।

### Q17: Starvation কীভাবে হয়?
**Answer:** low-priority process indefinite delay হলে starvation।

### Q18: Aging কেন?
**Answer:** starvation কমাতে waiting process-এর priority ধীরে ধীরে বাড়ানো।

### Q19: Paging advantage?
**Answer:** external fragmentation reduce করে এবং memory allocation flexible করে।

### Q20: Page fault handling summary?
**Answer:** trap → disk read page → frame assign → page table update → instruction restart।

---

## LEVEL C: Advanced

### Q21: Thrashing কীভাবে detect/mitigate?
**Ans:** High page fault rate + Low CPU utilization দেখা দিলে বুঝতে হবে সিস্টেম থ্র্যাশিং করছে। 
- **Under the Hood:** ওএস তখন শুধু এক পেজ সোয়্যাপ করে অন্যটা আনতে ব্যস্ত থাকে, রিয়েল কাজ (CPU) কিছুই হয় না। 
- **Mitigation:** "Degree of Multiprogramming" কমানো (মানে কিছু প্রসেস সাসপেন্ড করা) অথবা র‍্যাম বাড়ানো।

---

### Q22: TLB miss হলে কী হয়?
**Ans:** একে "Translation Lookaside Buffer" বলে। মিস হলে ওএসকে মেইন মেমোরির "Page Table" চেক করতে হয়। 
- **Logic:** TLB হলো পেজ টেবিলের ক্যাশ। মিস হওয়া মানে মেমোরি এক্সেস টাইম দ্বিগুণ হওয়া।

---

### Q23: "How to detect a deadlock in a running production server?"
**Ans:** 
- **Resource Allocation Graph (RAG):** সিস্টেমে রিসোর্স অ্যালোকেশন এবং রিকোয়েস্টের একটি সাইকেল তৈরি হয়েছে কি না তা চেক করা।
- **OS Tools:** লিনাক্সে `top`, `ps` বা ডাটাবেসের ক্ষেত্রে `SHOW ENGINE INNODB STATUS` দিয়ে লকিং অবস্থা দেখা।
- **Practical Fix:** ডেডলক হলে সাধারণত ওএস (বা প্রোগ্রামার) যেকোনো একটি প্রসেস কিল করে রিসোর্স ফ্রি করে দেয়।

---

### Q24: Virtual Memory র‍্যামের চেয়ে বড় হলে কী হবে?
**Ans:** এটি সম্ভব, কিন্তু প্রোসেস স্লো হয়ে যাবে।
- **Deep Dive:** ওএস ডিস্কের একটি অংশ (Swap/Page file) ব্যবহার করে র‍্যাম হিসেবে। যেহেতু ডিস্ক র‍্যামের চেয়ে হাজার গুণ স্লো, তাই সিস্টেম "I/O bound" হয়ে যাবে। একেই আমরা কম্পিউটার 'হ্যাঙ' করা বলি।

---

### Q25: Journaling file system লাভ?
**Ans:** Crash-এর পরে metadata consistency দ্রুত recover হয়। 
- **Why?**: এক্সট্রা রাইট কেন করছি? কারণ এটি একটি 'Log' রাখে। হুট করে পাওয়ার চলে গেলে ওএস লগ দেখে বুঝতে পারে কোন ফাইলটি ঠিকমতো রাইট হয়নি, পুরো ডিস্ক স্ক্যান করে এরর খুঁজতে হয় না।

---

## Practical Interview Tasks

### Task 1: Scheduling quick compute
Given:
- P1(AT=0, BT=5)
- P2(AT=1, BT=3)
- P3(AT=2, BT=1)

**Ask:** FCFS আর SJF-এ avg WT compare করো।  
**Expected:** SJF-এ avg WT কম হওয়া দেখাতে হবে। (Logic: Short jobs are cleared early, reducing wait time for later jobs).

### Task 2: Synchronization pseudo fix
Shared counter increment code-এ race condition আছে।  
**Expected fix:** `lock()` এবং `unlock()` ফাংশন দিয়ে Critical Section প্রটেক্ট করা। কেন? যাতে এক থ্রেড যখন রাইট করছে তখন অন্য থ্রেড ইন্টারফেয়ার না করে।

---

## 🚀 Scenario Debugging Challenge
- **Memory Leak in Loop:** যদি `malloc()` করে `free()` না হয়, তবে র‍্যাম এক সময় শেষ হয়ে যাবে।
- **Starvation Example:** হাই প্রায়োরিটি প্রসেস বারবার আসলে লো প্রায়োরিটি প্রসেসর ভাগ্য কি? (Ans: **Aging** ব্যবহার করে তার প্রায়োরিটি বাড়াতে হবে)।
- **Zombie vs Orphan Process:** জম্বি প্রসেস মেমোরি খায় না, কিন্তু প্রসেস আইডি (PID) স্লট দখল করে রাখে। অনেক জম্বি থাকলে নতুন প্রসেস শুরু হবে না।

### Task 3: Page replacement reasoning
Reference string দিয়ে FIFO vs LRU page fault compare।  
**Expected:** LRU সাধারণত better locality capture করে।

---

## Rapid Revision Checklist

- process/thread/context switch clear
- scheduling formulas মুখস্থ + apply করতে পারো
- race/deadlock/starvation আলাদা করে explain করতে পারো
- paging/virtual memory + page fault path clear
- file system allocation methods compare করতে পারো
- VM vs container practical tradeoff বলতে পারো

---

## Navigation

- 🏠 Back to [Operating System — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 08](08-protection-security-virtualization-containers.md)

