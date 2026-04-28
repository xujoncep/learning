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
**Answer:** high page fault rate + low CPU utilization; mitigation: working set control, multiprogramming degree reduce।

### Q22: TLB miss হলে কী হয়?
**Answer:** page table walk হয়; translation latency বাড়ে।

### Q23: 2PL আর serializability সম্পর্ক?
**Answer:** strict 2PL conflict-serializable schedules enforce করে।

### Q24: Deadlock detection vs prevention tradeoff?
**Answer:** prevention conservative resource utilization কমাতে পারে; detection flexible but recovery overhead আছে।

### Q25: Copy-on-write fork optimization কী?
**Answer:** fork-এর পর pages initially share হয়; write হলে only তখন copy হয়।

### Q26: Kernel threads vs user threads in blocking I/O?
**Answer:** user-level thread model-এ blocking syscall পুরো process block করতে পারে; kernel thread model এ অন্য thread run করতে পারে।

### Q27: SCAN vs C-SCAN fairness?
**Answer:** C-SCAN waiting time distribution আরও uniform।

### Q28: Journaling file system লাভ?
**Answer:** crash-এর পরে metadata consistency দ্রুত recover হয়।

### Q29: Hypervisor Type-1 vs Type-2?
**Answer:** Type-1 bare-metal (better isolation/perf), Type-2 host OS উপর run (more convenient)।

### Q30: Container vs VM selection guideline?
**Answer:** fast deployment + low overhead চাইলে container; strong isolation + custom kernel চাইলে VM।

---

## Practical Interview Tasks

### Task 1: Scheduling quick compute
Given:
- P1(AT=0, BT=5)
- P2(AT=1, BT=3)
- P3(AT=2, BT=1)

**Ask:** FCFS আর SJF-এ avg WT compare করো।  
**Expected:** SJF-এ avg WT কম হওয়া দেখাতে হবে।

### Task 2: Synchronization pseudo fix
Shared counter increment code-এ race condition আছে।  
**Expected fix:** lock/unlock critical section।

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

