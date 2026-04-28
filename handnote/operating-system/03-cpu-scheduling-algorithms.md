# Chapter 03 — CPU Scheduling Algorithms

---

## 1. Core Terms
- Arrival Time (AT)
- Burst Time (BT)
- Completion Time (CT)
- Turnaround Time (TAT = CT - AT)
- Waiting Time (WT = TAT - BT)
- Response Time (RT = first_run - AT)

## 2. Algorithms
- FCFS
- SJF (non-preemptive)
- SRTF (preemptive SJF)
- Priority
- Round Robin

```mermaid
flowchart LR
  A[Ready Queue] --> B[Scheduler]
  B --> C[CPU]
  C --> D[Complete or Block]
```

## 3. Quick Numeric Example (FCFS)
P1(AT0,BT5), P2(AT1,BT3), P3(AT2,BT2)
Gantt: `P1 | P2 | P3` => 0-5-8-10  
CT: P1=5, P2=8, P3=10  
TAT: 5,7,8  
WT: 0,4,6

## 4. MCQ (15)
1. FCFS nature? → non-preemptive ✅  
2. SRTF nature? → preemptive ✅  
3. RR needs? → time quantum ✅  
4. Lowest avg WT ideal (theoretical) → SJF ✅  
5. FCFS issue → convoy effect ✅  
6. Priority scheduling issue → starvation ✅  
7. Starvation fix → aging ✅  
8. TAT formula → CT-AT ✅  
9. WT formula → TAT-BT ✅  
10. RT measures → first response delay ✅  
11. RR খুব ছোট quantum হলে → more context switch ✅  
12. RR খুব বড় quantum হলে → FCFS-like ✅  
13. Preemptive scheduling-এ switch কখন? → higher priority/shorter remaining arrival ✅  
14. Throughput মানে → jobs completed per unit time ✅  
15. CPU utilization মানে → CPU busy fraction ✅

## 5. Written Problems (5)
### P1: FCFS schedule করো (3 process)
**Solution:** arrival order-এ execute, তারপর CT/TAT/WT বের করো।

### P2: SJF vs FCFS avg WT compare
**Solution:** same set-এ SJF-এ short jobs আগে চালালে WT কমে।

### P3: RR quantum impact explain
**Solution:** ছোট quantum => responsive but overhead বেশি; বড় quantum => overhead কম but response খারাপ।

### P4: Priority starvation example
**Solution:** low-priority process indefinitely wait করে; aging দিলে priority বাড়িয়ে execute করানো যায়।

### P5: RT vs WT পার্থক্য
**Solution:** RT only first CPU access পর্যন্ত delay; WT total ready-queue waiting sum।

## 6. Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 02](02-process-thread-context-switch.md)
- ➡️ Chapter 04 — Synchronization

