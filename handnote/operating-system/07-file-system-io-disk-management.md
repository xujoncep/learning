# Chapter 07 — File System, I/O & Disk Management

---

## 1. File System Basics
- File, directory, metadata
- inode/FAT/NTFS style metadata models
- path resolution

## 2. Allocation Methods
- Contiguous
- Linked
- Indexed

## 3. Disk Scheduling
- FCFS
- SSTF
- SCAN
- C-SCAN

## 4. I/O Concepts
- Interrupt-driven I/O
- DMA
- Buffering, caching, spooling

## 5. MCQ (15)
1. inode stores? → metadata + block pointers ✅  
2. Contiguous allocation সুবিধা? → fast sequential access ✅  
3. Linked allocation issue? → random access poor ✅  
4. Indexed allocation সুবিধা? → direct block indexing ✅  
5. DMA purpose? → CPU offload for bulk transfer ✅  
6. SCAN alias? → elevator algorithm ✅  
7. C-SCAN pattern? → one direction service then jump ✅  
8. SSTF risk? → starvation ✅  
9. Spooling use case? → printer queue ✅  
10. Buffering helps? → speed mismatch handle ✅  
11. Journaling FS purpose? → crash consistency ✅  
12. Directory is? → special file structure ✅  
13. Hard link shares? → same inode/data ✅  
14. Soft link type? → path reference ✅  
15. Mounting meaning? → attach filesystem to directory tree ✅

## 6. Written Problems (5)
### P1: Allocation method compare
**Solution:** contiguous fast but fragmentation; linked simple but seek-heavy; indexed flexible.
### P2: SCAN vs C-SCAN
**Solution:** SCAN both direction; C-SCAN uniform wait fairness better।
### P3: DMA explain
**Solution:** device-memory transfer controller handles, CPU interrupted on completion।
### P4: Journaling কেন দরকার
**Solution:** crash-পর metadata consistency restore সহজ।
### P5: Hard link vs soft link
**Solution:** hard link same inode; soft link pathname pointer, target delete হলে broken link।

## 7. Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 06](06-memory-management-paging-virtual-memory.md)
- ➡️ Chapter 08 — Protection & Virtualization

