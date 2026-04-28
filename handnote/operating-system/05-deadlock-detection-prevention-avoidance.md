# Chapter 05 — Deadlock: Detection, Prevention, Avoidance

---

## 1. Deadlock Conditions (Coffman)
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

একসাথে চারটি true হলে deadlock possible।

## 2. Resource Allocation Graph (RAG)
- cycle থাকলে deadlock সম্ভাবনা
- single-instance case-এ cycle => deadlock

## 3. Strategies
- Prevention (এক condition break)
- Avoidance (safe state, Banker’s Algorithm)
- Detection + Recovery

## 4. MCQ (15)
1. Deadlock-এর condition কয়টি? → 4 ✅  
2. Circular wait না থাকলে deadlock? → না ✅  
3. Banker’s algorithm লক্ষ্য? → safe allocation ✅  
4. Prevention করে কী? → necessary condition break ✅  
5. Detection strategy? → allow then detect ✅  
6. Recovery method? → terminate/rollback/preempt ✅  
7. Safe state মানে? → completion sequence exists ✅  
8. Unsafe মানে deadlock এখনই? → না, risk state ✅  
9. RAG cycle significance? → deadlock indicator/context-dependent ✅  
10. Hold-and-wait avoid কিভাবে? → request-all-at-once ✅  
11. Circular wait avoid? → resource ordering ✅  
12. No-preemption break? → resource takeback policy ✅  
13. Detection overhead? → periodically graph/matrix check ✅  
14. Victim selection criteria? → minimal cost ✅  
15. Starvation risk recovery-তে? → হ্যাঁ, repeated victim হলে ✅

## 5. Written Problems (5)
### P1: চার condition example দাও
**Solution:** printer+file lock scenario map করে চার condition দেখাও।
### P2: Resource ordering দিয়ে prevention
**Solution:** global order follow করলে cycle তৈরি কঠিন হয়।
### P3: Safe sequence explain
**Solution:** যেই order-এ সব process finish করতে পারে সেটাই safe sequence।
### P4: Detection বনাম avoidance tradeoff
**Solution:** avoidance runtime check-heavy; detection simpler but rollback cost আছে।
### P5: Recovery victim নির্বাচন
**Solution:** low progress, low priority, low rollback cost process বাছাই better।

## 6. Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 04](04-synchronization-critical-section.md)
- ➡️ Chapter 06 — Memory Management

