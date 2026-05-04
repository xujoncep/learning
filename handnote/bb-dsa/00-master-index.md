# Bangladesh Bank IT/AME/Programmer — DSA Complete Course

**50 MCQ + Written Questions + Concept Cards | সম্পূর্ণ পরীক্ষা-প্রস্তুতি গাইড**

---

## কোর্স পরিচিতি

এই কোর্সটি Bangladesh Bank IT Officer, AME, এবং Programmer পদের পরীক্ষার জন্য Data Structures & Algorithms (DSA)-এর সম্পূর্ণ প্রস্তুতি। প্রতিটি topic-এ তিনটি card রয়েছে:

- 🟦 **Concept Card** — পূর্ণ theory (Bangla-তে, English keywords সহ)
- 📝 **Written Card** — 10-15 marks-এর প্রশ্নোত্তর
- ❓ **MCQ Card** — Exam-standard tricky MCQ

---

## Topics ও MCQ বিভাজন

| # | Topic | MCQ Range | File |
|---|-------|-----------|------|
| 1 | Arrays | Q1–Q5 | [bb-dsa-arrays-linkedlist](/docs/bb-dsa-arrays-linkedlist) |
| 2 | Linked List | Q6–Q10 | [bb-dsa-arrays-linkedlist](/docs/bb-dsa-arrays-linkedlist) |
| 3 | Stack | Q11–Q15 | [bb-dsa-stack-queue](/docs/bb-dsa-stack-queue) |
| 4 | Queue | Q16–Q20 | [bb-dsa-stack-queue](/docs/bb-dsa-stack-queue) |
| 5 | Tree | Q21–Q25 | [bb-dsa-tree-bst](/docs/bb-dsa-tree-bst) |
| 6 | Binary Search Tree (BST) | Q26–Q30 | [bb-dsa-tree-bst](/docs/bb-dsa-tree-bst) |
| 7 | Sorting Algorithms | Q31–Q35 | [bb-dsa-sorting-searching](/docs/bb-dsa-sorting-searching) |
| 8 | Searching Algorithms | Q36–Q40 | [bb-dsa-sorting-searching](/docs/bb-dsa-sorting-searching) |
| 9 | Graph | Q41–Q45 | [dsa-graph-hashing-dp](/docs/dsa-graph-hashing-dp) |
| 10 | Hashing & Dynamic Programming | Q46–Q50 | [dsa-graph-hashing-dp](/docs/dsa-graph-hashing-dp) |

**মোট MCQ: 50 | Written Questions: 47 | Topics: 10**

---

## দ্রুত Complexity Reference

| Data Structure | Access | Search | Insert | Delete |
|---------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Singly Linked List | O(n) | O(n) | O(1)* | O(1)* |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Binary Search Tree | O(log n) | O(log n) | O(log n) | O(log n) |
| Hash Table | O(1) | O(1) | O(1) | O(1) |

*at head

| Algorithm | Best | Average | Worst | Stable |
|-----------|------|---------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | ❌ |
| Binary Search | O(1) | O(log n) | O(log n) | — |

---

## পরীক্ষার জন্য Must-Know তথ্য

### Key Formulas
- **1D Array address:** $B + i \times W$
- **2D Row-major:** $B + (i \times n + j) \times W$
- **2D Column-major:** $B + (j \times m + i) \times W$
- **Binary Search max comparisons:** $\lceil \log_2 n \rceil$
- **Complete binary tree height:** $\lfloor \log_2 n \rfloor$
- **Nodes at level k:** $2^k$
- **Full binary tree with n leaves:** $2n - 1$ total nodes
- **Circular queue full:** $(rear + 1) \% n == front$
- **Hash load factor:** $\lambda = n/m$

### Important Rules to Remember
1. Stack = **LIFO** | Queue = **FIFO**
2. BST Inorder = **Sorted ascending**
3. Merge Sort = **Always O(n log n)**, stable, needs extra space
4. Quick Sort = **O(n²) worst** (sorted input with bad pivot)
5. Binary Search = **Sorted array** আবশ্যক
6. Hash Table avg = **O(1)**, worst = O(n)
7. DFS uses **Stack** | BFS uses **Queue**
8. AVL balance factor = **{-1, 0, 1}**
9. Graph BFS/DFS time = **O(V + E)**
10. Adjacency Matrix space = **O(V²)** | List = **O(V + E)**

---

## পড়ার পরামর্শ

```
Week 1: Arrays + Linked List (Topic 1-2)
Week 2: Stack + Queue (Topic 3-4)
Week 3: Tree + BST (Topic 5-6)
Week 4: Sorting + Searching (Topic 7-8)
Week 5: Graph + Hashing + DP (Topic 9-10)
Week 6: সব MCQ practice + Revision
```

---

*Bangladesh Bank DSA Course | Porhi Learning Platform*
