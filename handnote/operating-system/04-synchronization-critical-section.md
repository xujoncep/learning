# Chapter 04 — Synchronization & Critical Section

---

## 1. Critical Section Problem
Shared data একাধিক process/thread modify করলে race condition হতে পারে।

Requirements:
1. Mutual Exclusion
2. Progress
3. Bounded Waiting

## 2. Tools
- Mutex lock
- Semaphore (binary/counting)
- Monitor
- Condition variable

```c
// pseudo
lock(mutex);
critical_section();
unlock(mutex);
```

## 3. Classical Problems
- Producer-Consumer
- Reader-Writer
- Dining Philosophers

## 4. MCQ (15)
1. Race condition cause? → unsynchronized shared access ✅  
2. Mutual exclusion means? → one at a time in CS ✅  
3. Binary semaphore values? → 0/1 ✅  
4. Counting semaphore use? → multiple identical resource ✅  
5. Busy waiting issue? → CPU waste ✅  
6. Spinlock good where? → very short critical section ✅  
7. Monitor কী? → high-level synchronization construct ✅  
8. Deadlock possible with locks? → yes ✅  
9. Reader-writer goal? → concurrent readers, controlled writer ✅  
10. Producer-consumer needs? → buffer sync ✅  
11. Priority inversion fix? → priority inheritance ✅  
12. Atomic instruction example? → test-and-set ✅  
13. CS entry protocol purpose? → ensure synchronization ✅  
14. Starvation কী? → indefinite waiting ✅  
15. Fair lock helps? → starvation reduce ✅

## 5. Written Problems (5)
### P1: Race condition example
**Solution:** shared counter দুই thread increment করলে lost update হয়।
### P2: Mutex vs Semaphore
**Solution:** mutex ownership-based lock; semaphore signaling/count-based।
### P3: Producer-consumer semaphore logic
**Solution:** `empty/full/mutex` তিন semaphore pattern।
### P4: Reader-writer starvation
**Solution:** reader-preference হলে writer starvation হতে পারে; fair policy দরকার।
### P5: Dining philosopher deadlock avoid
**Solution:** resource ordering/arbiter/asymmetric pickup strategy।

## 6. Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 03](03-cpu-scheduling-algorithms.md)
- ➡️ Chapter 05 — Deadlock

