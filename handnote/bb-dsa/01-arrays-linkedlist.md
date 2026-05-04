# DSA Topic: Arrays & Linked List — Bangladesh Bank IT Exam

---

# DSA Topic: Arrays

---

## 🟦 CONCEPT CARD — Arrays

**Array** হলো same data type-এর elements-এর একটি collection যেগুলো contiguous (পাশাপাশি) memory location-এ store হয়। অর্থাৎ একটি array-এর সব elements memory-তে একটার পর একটা সাজানো থাকে এবং প্রত্যেকটি element-কে তার **index** (position number) দিয়ে access করা যায়।

**মূল বৈশিষ্ট্য (Characteristics):**
Array-এর প্রতিটি element একই data type-এর হতে হবে (homogeneous)। Array-এর size declaration-এর সময়ই fix করতে হয় (static array-এর ক্ষেত্রে)। Memory-তে elements contiguous block-এ থাকে, তাই **random access** O(1) time-এ সম্ভব হয়। Indexing সাধারণত **0-based** (C, C++, Java, Python) তবে কিছু language-এ 1-based (MATLAB, Fortran)।

**Types of Arrays:**

1. **One-Dimensional Array (1D):** একটি row-তে সাজানো elements। যেমন: `int A[5] = {10, 20, 30, 40, 50};`
2. **Two-Dimensional Array (2D):** matrix বা table আকারে rows ও columns-এ সাজানো। যেমন: `int M[3][4];` মানে 3 rows ও 4 columns।
3. **Multi-Dimensional Array:** 3D, 4D ইত্যাদি — image processing, scientific computing-এ ব্যবহৃত হয়।

**Memory Representation:**

1D array-এর ক্ষেত্রে base address B থাকলে, index i-এর element-এর address হবে:

$$\text{Address}(A[i]) = B + i \times W$$

যেখানে W = একটি element-এর size byte-এ।

উদাহরণ: `int A[5]` যদি base address 1000 হয় এবং int = 4 bytes, তাহলে A[3]-এর address = 1000 + 3 × 4 = 1012।

**Memory layout:**
```
Index:      0      1      2      3      4
         +------+------+------+------+------+
Array A: |  10  |  20  |  30  |  40  |  50  |
         +------+------+------+------+------+
Address: 1000   1004   1008   1012   1016
```

**Operations on Array:**

- **Traversal:** সব elements একে একে visit করা — O(n)
- **Access (Indexing):** নির্দিষ্ট index-এর element পাওয়া — O(1)
- **Search:** Linear Search O(n), Binary Search (sorted) O(log n)
- **Insertion:** End-এ O(1), beginning বা middle-এ O(n) (shifting দরকার)
- **Deletion:** End থেকে O(1), beginning/middle থেকে O(n)
- **Update:** index দিয়ে value পরিবর্তন — O(1)

**Advantages:**
Random access O(1)-এ সম্ভব। Cache-friendly কারণ contiguous memory। Implementation simple এবং memory overhead কম (no extra pointer)। Mathematical operations (matrix) সহজে করা যায়।

**Disadvantages:**
Size fixed (static array)। Insertion/deletion costly (shifting দরকার)। Memory wastage হতে পারে যদি array partially filled থাকে। Contiguous memory allocation করতে হয় বলে large array-এর জন্য memory পাওয়া কঠিন।

**Applications:**
Lookup table, matrix operations, image processing (pixel grid), database records, hash table-এর underlying structure, stack ও queue-এর implementation, dynamic programming-এর memoization table।

**Key Points:**
- Array elements **contiguous memory** location-এ store হয়
- সব elements **same data type**-এর হতে হবে (homogeneous)
- **Random access** O(1) time-এ সম্ভব indexing-এর মাধ্যমে
- Array-এর **size** declaration-এর সময় fixed (static)
- **0-based indexing** common, address formula: $B + i \times W$
- 2D array memory-তে **row-major** বা **column-major** order-এ store হয়
- Insertion/deletion-এ **shifting** লাগে বলে O(n) time
- **Dynamic array** (vector, ArrayList) automatic resize হয়
- Searching: unsorted-এ O(n), sorted-এ Binary Search O(log n)
- Memory wastage হতে পারে — declared size > actually used

**Time & Space Complexity:**

| Operation | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Access (by index) | O(1) | O(1) | O(1) | O(n) |
| Search (linear) | O(1) | O(n) | O(n) | O(1) |
| Search (binary, sorted) | O(1) | O(log n) | O(log n) | O(1) |
| Insertion (end) | O(1) | O(1) | O(n)* | O(1) |
| Insertion (beginning/middle) | O(n) | O(n) | O(n) | O(1) |
| Deletion (end) | O(1) | O(1) | O(1) | O(1) |
| Deletion (beginning/middle) | O(n) | O(n) | O(n) | O(1) |

*Dynamic array-এর resizing-এর সময় worst case O(n), কিন্তু amortized O(1)।

---

## 📝 WRITTEN CARD — Arrays

**Important Written Questions (10-15 Marks):**

**Q1.** What is an Array? Explain its memory representation with diagram.

**Answer:**
Array হলো same data type-এর elements-এর একটি linear collection যেগুলো contiguous memory location-এ store থাকে এবং প্রতিটি element একটি unique index-এর মাধ্যমে access করা যায়।

Memory Representation: ধরা যাক, `int A[5] = {10, 20, 30, 40, 50};` এবং base address = 1000, প্রতিটি int = 4 bytes।

```
Index:      0      1      2      3      4
         +------+------+------+------+------+
Array A: |  10  |  20  |  30  |  40  |  50  |
         +------+------+------+------+------+
Address: 1000   1004   1008   1012   1016
```

প্রতিটি element-এর address calculate করার সূত্র: $\text{Address}(A[i]) = B + i \times W$

যেখানে B = base address (1000), i = index, W = element size (4 bytes)।

উদাহরণ: A[3]-এর address = 1000 + 3 × 4 = **1012**।

এই formula-র কারণেই array-তে **random access** O(1) time-এ সম্ভব হয় — কোনো element-এ পৌঁছাতে শুরু থেকে traverse করতে হয় না, সরাসরি address calculate করে যাওয়া যায়।

---

**Q2.** What are the advantages and disadvantages of Arrays? When would you prefer Array over Linked List?

**Answer:**

**Advantages of Arrays:**
1. **Random Access:** O(1) time-এ যেকোনো index-এর element পাওয়া যায়
2. **Cache Friendly:** Contiguous memory-র কারণে CPU cache efficiently কাজ করে
3. **Memory Efficient:** Extra pointer store করতে হয় না
4. **Simple Implementation:** Declaration ও use করা সহজ
5. **Mathematical Operations:** Matrix multiplication-এ natural fit

**Disadvantages of Arrays:**
1. **Fixed Size:** Runtime-এ বাড়ানো যায় না
2. **Costly Insertion/Deletion:** Middle বা beginning-এ O(n) time লাগে
3. **Memory Wastage:** Declared size > used size হলে waste
4. **Contiguous Memory Required:** Large array allocate করা কঠিন

**Array prefer করবো যখন:**
- Random access দরকার (lookup table, hash table)
- Data size আগে থেকেই জানা ও fixed
- Memory overhead কম রাখতে চাই
- Cache performance গুরুত্বপূর্ণ

**Linked List prefer করবো** যখন frequent insertion/deletion middle-এ হয় এবং size unpredictable।

---

**Q3.** Write an algorithm for Binary Search on a sorted array. Trace through an example.

**Answer:**

**Binary Search** শুধু **sorted array**-তে কাজ করে। প্রতিটি step-এ search space অর্ধেকে নেমে আসে — time complexity O(log n)।

**Algorithm (Iterative):**

```c
int binarySearch(int A[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (A[mid] == key) return mid;
        else if (A[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

**Worked Example:** `A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`, key = 23

| Step | low | high | mid | A[mid] | Action |
|------|-----|------|-----|--------|--------|
| 1 | 0 | 9 | 4 | 16 | 16 < 23, low = 5 |
| 2 | 5 | 9 | 7 | 56 | 56 > 23, high = 6 |
| 3 | 5 | 6 | 5 | 23 | Found at index 5 ✓ |

**Complexity:** Time = O(log n), Space = O(1) iterative।

---

**Q4.** Explain 2D array memory representation (row-major vs column-major order).

**Answer:**

2D array logically matrix form-এ থাকলেও, computer memory 1D — তাই linear-ভাবে store করতে হয়।

**Row-Major Order (C, C++, Java, Python):**
এক row-এর সব elements আগে, তারপর পরের row।

$$\text{Address}(A[i][j]) = B + (i \times n + j) \times W$$

যেখানে n = number of columns।

**Column-Major Order (Fortran, MATLAB):**
এক column-এর সব elements আগে, তারপর পরের column।

$$\text{Address}(A[i][j]) = B + (j \times m + i) \times W$$

যেখানে m = number of rows।

**উদাহরণ:** `int A[3][4]`, base = 2000, W = 4, A[2][3]-এর address (row-major):
- Address = 2000 + (2 × 4 + 3) × 4 = 2000 + 116 = **2116**

---

**Q5.** What is the difference between static and dynamic arrays? How does dynamic array resizing work?

**Answer:**

**Static Array:** Compile-time-এ size fix, runtime-এ পরিবর্তন করা যায় না।

**Dynamic Array:** Runtime-এ size ছোট-বড় করা যায় (C++ vector, Java ArrayList, Python list)।

**Dynamic Array Resizing কীভাবে কাজ করে:**
1. Capacity full হলে **2× বড় নতুন array** allocate
2. পুরনো elements **copy** করা হয় — O(n)
3. পুরনো array **deallocate**
4. নতুন element add করা হয়

**Amortized Analysis:**
n insertion-এ মোট copy কাজ: $1 + 2 + 4 + ... + n = 2n - 1 = O(n)$

প্রতি insertion-এ amortized cost = O(n)/n = **O(1)**।

---

## ❓ MCQ CARD — Arrays

**1.** In a 1D array of size n with base address B and element size W, what is the address of element at index i?
A) B + i
B) B + i × W
C) B × i + W
D) B + (i-1) × W
**Correct Answer:** B
**Explanation:** 0-based indexing-এ `B + i × W` formula ব্যবহৃত হয়। i সংখ্যক element আগে রয়েছে, প্রতিটি W bytes। Option D সঠিক হতো 1-based indexing-এ।

---

**2.** A 2D array `A[5][8]` is stored in row-major order with base address 1000 and each element occupying 4 bytes. What is the address of `A[3][5]`?
A) 1108
B) 1116
C) 1124
D) 1132
**Correct Answer:** B
**Explanation:** Row-major formula: `B + (i × n + j) × W` = 1000 + (3 × 8 + 5) × 4 = 1000 + 29 × 4 = **1116**।

---

**3.** What is the worst-case time complexity of inserting an element at the beginning of an array of n elements?
A) O(1)
B) O(log n)
C) O(n)
D) O(n²)
**Correct Answer:** C
**Explanation:** Beginning-এ insert করতে existing সব n elements-কে **এক position ডানে shift** করতে হয় — n বার operation, তাই O(n)।

---

**4.** What is the time complexity of searching an element in an unsorted array of n elements in the worst case?
A) O(1)
B) O(log n)
C) O(n)
D) O(n log n)
**Correct Answer:** C
**Explanation:** Unsorted array-তে **linear search** ছাড়া উপায় নেই। Worst case-এ element শেষে বা absent, n বার comparison — O(n)। Binary search শুধু sorted-এ কাজ করে।

---

**5.** Which of the following statements about arrays is FALSE?
A) Array elements are stored in contiguous memory locations
B) All elements of an array must be of the same data type
C) The size of a static array can be changed at runtime
D) Array provides random access to elements in O(1) time
**Correct Answer:** C
**Explanation:** **Static array-এর size runtime-এ পরিবর্তন করা যায় না** — compile-time-এ fixed। Runtime resize চাইলে dynamic array (vector, ArrayList) দরকার। বাকি A, B, D সব true।

---

---

# DSA Topic: Linked List

---

## 🟦 CONCEPT CARD — Linked List

**Linked List** হলো একটি linear data structure যেখানে elements memory-তে contiguous-ভাবে না থেকে **node** আকারে scatter হয়ে থাকে এবং প্রতিটি node-এ পরের node-এর **address (pointer)** store করা হয়।

**Node Structure:**
```
+------+------+
| data | next |  →  next node
+------+------+
```

**Types of Linked Lists:**

**1. Singly Linked List (SLL):**
```
[10|•] → [20|•] → [30|•] → [40|NULL]
HEAD
```

**2. Doubly Linked List (DLL):**
```
NULL ← [•|10|•] ⇄ [•|20|•] ⇄ [•|30|•] → NULL
        HEAD                    TAIL
```

**3. Circular Singly Linked List (CSLL):**
```
[10|•] → [20|•] → [30|•] ──┐
  ↑                         │
  └─────────────────────────┘
```

**4. Circular Doubly Linked List (CDLL):**
উভয় direction-এ circular — head-এর prev = last, last-এর next = head।

**Operations:**
- **Traversal:** HEAD থেকে NULL পর্যন্ত — O(n)
- **Search:** Linear search — O(n)
- **Insert at HEAD:** O(1)
- **Insert at TAIL:** O(n) বা O(1) যদি tail pointer থাকে
- **Insert at middle:** O(n)
- **Delete at HEAD:** O(1)
- **Delete at middle/tail:** O(n) for SLL, O(1) for DLL
- **Reversal:** তিনটা pointer (prev, curr, next) দিয়ে — O(n)

**Advantages:**
Dynamic size, insertion/deletion O(1) head-এ, no memory wastage।

**Disadvantages:**
Random access নেই O(n), extra pointer memory overhead, cache-unfriendly।

**Applications:**
Stack/Queue implementation, hash table chaining, browser history (DLL), music playlist (CDLL), undo-redo।

**Key Points:**
- Linked List **non-contiguous memory**-তে stored
- **Random access নেই** — O(n) sequential traversal
- **Dynamic size** — runtime-এ allocate/deallocate
- **Insert/delete at head** O(1)
- **DLL**-এ দুই দিকে traverse, extra memory
- **Circular LL**-এ কোনো NULL নেই
- **Floyd's algorithm** দিয়ে cycle detect করা যায়
- HEAD pointer হারালে পুরো list lost
- Cache performance array-র চেয়ে খারাপ

**Time & Space Complexity:**

| Operation | Singly LL | Doubly LL |
|-----------|-----------|-----------|
| Access (i-th) | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n)/O(1)* | O(1)* |
| Delete at head | O(1) | O(1) |
| Delete given node | O(n) | O(1) |
| Space | O(n) | O(n) |

*tail pointer থাকলে O(1)

---

## 📝 WRITTEN CARD — Linked List

**Q1.** What is a Linked List? How is it different from an Array? Draw the structure of a singly linked list node.

**Answer:**

**Linked List** হলো একটি linear data structure যেখানে node আকারে elements memory-তে scatter হয়ে থাকে এবং pointer দিয়ে chain বানানো হয়।

**SLL Node:**
```
+----------+----------+
|   data   |   next   |
+----------+----------+
  (value)   (pointer to next node)
```

**Full SLL:**
```
HEAD → [10|•] → [20|•] → [30|•] → [40|NULL]
```

**C-তে Node Definition:**
```c
struct Node {
    int data;
    struct Node *next;
};
```

**Array vs Linked List:**

| বৈশিষ্ট্য | Array | Linked List |
|-----------|-------|-------------|
| Memory | Contiguous | Non-contiguous |
| Size | Fixed | Dynamic |
| Access | O(1) random | O(n) sequential |
| Insert (start) | O(n) shifting | O(1) pointer change |
| Memory overhead | None | Pointer-এর জন্য extra |
| Cache | Friendly | Unfriendly |

---

**Q2.** Explain the types of Linked Lists with diagrams.

**Answer:**

**1. Singly Linked List:** প্রতি node-এ data + 1 pointer (next)। Forward-only।
```
HEAD → [10|•] → [20|•] → [30|NULL]
```

**2. Doubly Linked List:** data + 2 pointers (prev, next)। Bidirectional।
```
NULL ← [•|10|•] ⇄ [•|20|•] ⇄ [•|30|•] → NULL
```

**3. Circular Singly LL:** Last node HEAD-কে point করে।
```
HEAD → [10|•] → [20|•] → [30|•] ─┐
        ↑                         │
        └─────────────────────────┘
```

**4. Circular Doubly LL:** DLL + Circular।

| Type | Pointers/node | Direction | End marker |
|------|---------------|-----------|------------|
| SLL | 1 | Forward | NULL |
| DLL | 2 | Both | NULL |
| CSLL | 1 | Forward | Loops to HEAD |
| CDLL | 2 | Both | Loops |

---

**Q3.** Write the algorithm to reverse a singly linked list. Explain with example.

**Answer:**

তিনটি pointer ব্যবহার করে link উল্টানো হয়: **prev**, **curr**, **next**।

```c
struct Node* reverse(struct Node* head) {
    struct Node *prev = NULL, *curr = head, *next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

**Trace:** `1 → 2 → 3 → NULL`

| Step | next | Link after | prev | curr |
|------|------|-----------|------|------|
| 1 | 2 | `1 → NULL` | 1 | 2 |
| 2 | 3 | `2 → 1` | 2 | 3 |
| 3 | NULL | `3 → 2` | 3 | NULL |

**Result:** `3 → 2 → 1 → NULL` ✓

**Complexity:** Time O(n), Space O(1)।

---

**Q4.** How do you detect a cycle in a linked list? Explain Floyd's Cycle Detection Algorithm.

**Answer:**

**Floyd's Cycle Detection (Tortoise and Hare):**

দুটি pointer ব্যবহার করা হয়:
- **Slow:** প্রতি step-এ 1 node এগোয়
- **Fast:** প্রতি step-এ 2 node এগোয়

Cycle থাকলে fast কোনো এক সময় slow-কে ধরে ফেলবে। না থাকলে fast NULL-এ পৌঁছায়।

```c
bool hasCycle(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

**Example:** `1 → 2 → 3 → 4 → 5 → (back to 3)`

| Step | slow | fast |
|------|------|------|
| 0 | 1 | 1 |
| 1 | 2 | 3 |
| 2 | 3 | 5 |
| 3 | 4 | 4 ✓ |

**Complexity:** Time O(n), Space O(1)।

---

**Q5.** Compare Singly Linked List vs Doubly Linked List vs Circular Linked List.

**Answer:**

| Feature | Singly LL | Doubly LL | Circular LL |
|---------|-----------|-----------|-------------|
| Pointers/node | 1 | 2 | 1 |
| Memory | কম | বেশি | কম |
| Direction | Forward | Both | Forward loop |
| Reverse traversal | সম্ভব না | সরাসরি সম্ভব | সম্ভব না |
| Delete given node | O(n) | O(1) | O(n) |
| Implementation | সহজ | complex | tricky |

**কখন কোনটা:**
- Memory critical, simple forward → **SLL**
- Bidirectional, frequent middle delete → **DLL**
- Cyclic processing (round-robin) → **CLL**

---

## ❓ MCQ CARD — Linked List

**6.** Which of the following is NOT an advantage of Linked List over Array?
A) Dynamic size
B) Ease of insertion and deletion
C) Random access in O(1)
D) Memory is allocated as needed
**Correct Answer:** C
**Explanation:** Linked list-এ **random access নেই** — i-th element পেতে O(n) traverse করতে হয়। Array-তেই O(1) random access সম্ভব। A, B, D সব linked list-এর সুবিধা।

---

**7.** In a doubly linked list, each node contains how many pointer fields?
A) 1
B) 2
C) 3
D) Depends on data type
**Correct Answer:** B
**Explanation:** DLL-এর প্রতিটি node-এ **prev** এবং **next** — দুটো pointer। এই দুটো pointer-এর কারণে bidirectional traversal সম্ভব।

---

**8.** In a circular singly linked list, how do you detect that you have reached the end while traversing?
A) When `current->next == NULL`
B) When `current == NULL`
C) When `current->next == HEAD`
D) When `current == TAIL`
**Correct Answer:** C
**Explanation:** Circular list-এ **NULL নেই** — শেষ node HEAD-কে point করে। তাই `current->next == HEAD` check করে end detect হয়।

---

**9.** Given only a pointer to a node (not head) in a doubly linked list, what is the time complexity to delete that node?
A) O(1)
B) O(log n)
C) O(n)
D) Cannot be done
**Correct Answer:** A
**Explanation:** DLL-এ `prev` pointer আছে। `X->prev->next = X->next` এবং `X->next->prev = X->prev` — দুটো operation, **O(1)**। SLL-এ এটা O(n) কারণ previous node খুঁজতে traverse লাগে।

---

**10.** Compared to a singly linked list, what is the extra memory overhead per node in a doubly linked list (assuming pointer size = 4 bytes)?
A) 0 bytes
B) 4 bytes
C) 8 bytes
D) Depends on data size
**Correct Answer:** B
**Explanation:** SLL-এ 1 pointer = 4 bytes, DLL-এ 2 pointers = 8 bytes। **Extra = 4 bytes per node**। 64-bit system-এ pointer 8 bytes হলে extra হবে 8 bytes।
