# Chapter 06 — Memory Management, Paging & Virtual Memory

---

## 1. Core Ideas
- Logical vs Physical address
- MMU translation
- Paging
- Segmentation
- Virtual memory

## 2. Paging
- Fixed-size page/frame
- Page table দিয়ে mapping
- TLB for fast translation

Address split:
`Logical address = page_number + offset`

## 3. Page Replacement
- FIFO
- LRU
- Optimal (theoretical benchmark)

## 4. MCQ (15)
1. Paging goal? → external fragmentation কমানো ✅  
2. Segmentation size? → variable ✅  
3. TLB purpose? → fast translation cache ✅  
4. Page fault কবে? → page memory-তে না থাকলে ✅  
5. Belady anomaly দেখা যায়? → FIFO ✅  
6. LRU basis? → recent usage history ✅  
7. Virtual memory benefit? → larger logical space illusion ✅  
8. Internal fragmentation কোথায় বেশি? → fixed-size block system ✅  
9. External fragmentation কোথায় common? → variable partitioning ✅  
10. Thrashing কী? → excessive paging I/O ✅  
11. Working set concept? → active pages set ✅  
12. Demand paging মানে? → needed হলে page load ✅  
13. Dirty page কী? → modified page লিখে flush দরকার ✅  
14. Page table entry includes? → frame no + valid/protection bits ✅  
15. TLB miss হলে? → page table walk হয় ✅

## 5. Written Problems (5)
### P1: page fault handling steps
**Solution:** trap → locate page on disk → free frame নির্বাচন → load → table update → restart instruction।
### P2: FIFO vs LRU তুলনা
**Solution:** LRU usually better practical locality exploit করে; FIFO anomaly prone।
### P3: Thrashing কারণ/সমাধান
**Solution:** কম frame per process; fix via working set control / degree of multiprogramming কমানো।
### P4: Segmentation vs Paging
**Solution:** segmentation logical module-based variable; paging fixed block hardware-friendly।
### P5: TLB কেন দরকার
**Solution:** প্রতি access-এ memory translation cost কমাতে।

## 6. Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 05](05-deadlock-detection-prevention-avoidance.md)
- ➡️ Chapter 07 — File System & I/O

