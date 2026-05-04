# DSA MCQ Bank — Bangladesh Bank IT/AME/Programmer Exam

**মোট 150টি MCQ | Source: Official Practice Set | Scraped & Formatted**

> প্রতিটি MCQ-এর সাথে সঠিক উত্তর ও Bangla ব্যাখ্যা দেওয়া আছে।

---

## ❓ MCQ SET 1 — Q1 to Q30 (Fundamentals)

---

**1.** What is the time complexity of binary search in a sorted array?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(1)

**Correct Answer:** B

**Explanation:** Binary search প্রতি step-এ search space অর্ধেক করে ফেলে — তাই n elements-এর জন্য সর্বোচ্চ log₂n step লাগে।

---

**2.** Which data structure uses the FIFO principle?

- **A)** Stack
- **B)** Tree
- **C)** Queue
- **D)** Heap

**Correct Answer:** C

**Explanation:** FIFO = "First In First Out" — Queue-এ যে element আগে insert হয়, সে আগে বের হয়। Stack LIFO (Last In First Out) follow করে।

---

**3.** Which traversal method of a Binary Search Tree (BST) gives sorted output?

- **A)** Preorder
- **B)** Postorder
- **C)** Level Order
- **D)** Inorder

**Correct Answer:** D

**Explanation:** Inorder traversal BST-এ Left → Root → Right order-এ যায়। BST property-র কারণে এই order-এ গেলে elements ascending order-এ পাওয়া যায়।

---

**4.** What is the worst-case time complexity of Quick Sort?

- **A)** O(n log n)
- **B)** O(log n)
- **C)** O(n²)
- **D)** O(n)

**Correct Answer:** C

**Explanation:** Quick Sort-এর worst case হয় যখন pivot সবসময় সবচেয়ে বড় বা ছোট element হয় (যেমন sorted array-এ first element pivot)। তখন n বার partition হয়, প্রতিটিতে O(n) কাজ — মোট O(n²)।

---

**5.** Which data structure is mainly used for implementing recursion?

- **A)** Queue
- **B)** Heap
- **C)** Stack
- **D)** Linked List

**Correct Answer:** C

**Explanation:** Recursive function call হলে current function-এর state (local variables, return address) **call stack**-এ push হয়। Function শেষ হলে pop হয়।

---

**6.** Which algorithm is used to find the shortest path in a weighted graph without negative weights?

- **A)** DFS
- **B)** BFS
- **C)** Dijkstra's Algorithm
- **D)** Prim's Algorithm

**Correct Answer:** C

**Explanation:** Dijkstra's Algorithm greedy approach-এ সবচেয়ে কম distance-এর vertex বেছে নেয়। Negative weight থাকলে Bellman-Ford ব্যবহার করতে হয়।

---

**7.** In a max heap, where is the largest element stored?

- **A)** Leaf node
- **B)** Middle node
- **C)** Root node
- **D)** Last node

**Correct Answer:** C

**Explanation:** Max heap property — প্রতিটি parent node তার children-এর চেয়ে বড় বা সমান। তাই সর্বোচ্চ element সর্বদা root-এ থাকে।

---

**8.** Which of the following sorting algorithms is stable?

- **A)** Quick Sort
- **B)** Heap Sort
- **C)** Selection Sort
- **D)** Merge Sort

**Correct Answer:** D

**Explanation:** Stable sort = equal elements-এর relative order অপরিবর্তিত থাকে। Merge Sort stable কারণ merge-এর সময় left side-এর element আগে নেওয়া হয় tie-break হলে। Quick Sort ও Heap Sort unstable।

---

**9.** What is the maximum number of edges in an undirected graph with n vertices?

- **A)** n
- **B)** n−1
- **C)** n(n−1)
- **D)** n(n−1)/2

**Correct Answer:** D

**Explanation:** Complete undirected graph-এ প্রতিটি vertex বাকি সব vertex-এর সাথে exactly একটি edge দিয়ে connected। Formula: E = n(n-1)/2। (n=5 হলে max edges = 10)

---

**10.** Which data structure provides efficient insertion and deletion at both ends?

- **A)** Array
- **B)** Stack
- **C)** Deque
- **D)** Tree

**Correct Answer:** C

**Explanation:** Deque (Double Ended Queue) — সামনে এবং পিছনে উভয় দিক থেকে insert ও delete O(1)-এ করা যায়। Stack শুধু top-এ, Queue শুধু front/rear-এ।

---

**11.** Which of the following traversal techniques uses a queue internally?

- **A)** Depth First Search (DFS)
- **B)** Inorder Traversal
- **C)** Breadth First Search (BFS)
- **D)** Postorder Traversal

**Correct Answer:** C

**Explanation:** BFS level-by-level explore করে। প্রতিটি level-এর nodes Queue-তে রাখা হয় এবং FIFO order-এ process করা হয়।

---

**12.** What is the average-case time complexity of Hash Table search operation?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(1)
- **D)** O(n log n)

**Correct Answer:** C

**Explanation:** ভালো hash function ও কম collision থাকলে hash table-এ সরাসরি index-এ যাওয়া যায় — O(1)। Worst case (সব elements same index-এ) O(n)।

---

**13.** Which sorting algorithm works based on the divide-and-conquer technique?

- **A)** Bubble Sort
- **B)** Insertion Sort
- **C)** Merge Sort
- **D)** Selection Sort

**Correct Answer:** C

**Explanation:** Merge Sort array-কে দুই ভাগে ভাগ করে (divide), প্রতিটি ভাগ recursively sort করে, তারপর merge করে (conquer)। Quick Sort-ও divide-and-conquer কিন্তু সবচেয়ে classic উদাহরণ Merge Sort।

---

**14.** Which data structure is most suitable for implementing undo operations in text editors?

- **A)** Queue
- **B)** Heap
- **C)** Stack
- **D)** Graph

**Correct Answer:** C

**Explanation:** Undo মানে সর্বশেষ কাজটি আগে বাতিল হবে — এটা LIFO principle। Stack-এ প্রতিটি action push হয়, Ctrl+Z করলে pop হয়।

---

**15.** What is the height of a complete binary tree with n nodes?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n²)
- **D)** O(1)

**Correct Answer:** B

**Explanation:** Complete binary tree প্রতিটি level পূর্ণ করে যায়। k-th level-এ 2^k nodes। মোট n nodes হলে height = ⌊log₂n⌋ = O(log n)।

---

**16.** Which algorithm is commonly used for Minimum Spanning Tree (MST)?

- **A)** Floyd-Warshall Algorithm
- **B)** Bellman-Ford Algorithm
- **C)** Prim's Algorithm
- **D)** Binary Search

**Correct Answer:** C

**Explanation:** Prim's Algorithm MST তৈরিতে step-by-step সবচেয়ে কম weight-এর edge বেছে নেয়। Kruskal's Algorithm-ও MST-র জন্য — কিন্তু Prim's বেশি popular।

---

**17.** Which collision resolution technique uses linked lists?

- **A)** Linear Probing
- **B)** Quadratic Probing
- **C)** Chaining
- **D)** Double Hashing

**Correct Answer:** C

**Explanation:** Chaining-এ hash table-এর প্রতিটি slot-এ একটি linked list থাকে। Collision হলে new element সেই slot-এর linked list-এ add হয়।

---

**18.** What is the worst-case time complexity of searching in a Binary Search Tree?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n log n)

**Correct Answer:** C

**Explanation:** BST skewed হয়ে যায় যদি sorted order-এ insert করা হয় (e.g. 1,2,3,4,5) — তখন linked list-এর মতো দেখায়। এই worst case-এ search করতে O(n) লাগে।

---

**19.** Which graph traversal algorithm is suitable for detecting cycles in a graph?

- **A)** DFS
- **B)** Bubble Sort
- **C)** Binary Search
- **D)** Merge Sort

**Correct Answer:** A

**Explanation:** DFS-এ traversal করার সময় **back edge** পাওয়া গেলে cycle আছে বোঝা যায়। Undirected graph-এ parent ছাড়া visited node পেলে cycle; directed graph-এ recursion stack-এ থাকা node-এ edge গেলে cycle।

---

**20.** Which of the following is NOT a linear data structure?

- **A)** Array
- **B)** Queue
- **C)** Stack
- **D)** Tree

**Correct Answer:** D

**Explanation:** Linear data structure-এ elements sequential order-এ থাকে (Array, Queue, Stack, Linked List)। Tree-এ hierarchical relationship — root থেকে branches বের হয়, তাই non-linear।

---

**21.** Which of the following sorting algorithms has the best average-case performance?

- **A)** Bubble Sort
- **B)** Selection Sort
- **C)** Merge Sort
- **D)** Linear Search

**Correct Answer:** C

**Explanation:** Merge Sort-এর average case O(n log n) — Bubble Sort ও Selection Sort উভয়ই O(n²)। Linear Search sorting algorithm নয়।

---

**22.** In a circular queue, the condition for queue full is:

- **A)** Rear == Front
- **B)** Front == -1
- **C)** (Rear + 1) % Size == Front
- **D)** Rear == Size - 1

**Correct Answer:** C

**Explanation:** Circular queue-এ Rear+1 (mod Size) == Front হলে queue full। এই condition না থাকলে linear queue-এর মতো false overflow হবে।

---

**23.** Which algorithm is used for topological sorting?

- **A)** DFS
- **B)** BFS
- **C)** Dijkstra's Algorithm
- **D)** Prim's Algorithm

**Correct Answer:** A

**Explanation:** Topological sort Directed Acyclic Graph (DAG)-এ কাজ করে। DFS দিয়ে সব neighbors explore করে শেষে node-টিকে stack-এ push করলে পরে stack থেকে বের করলে topological order পাওয়া যায়।

---

**24.** Which data structure is used in Breadth First Search (BFS)?

- **A)** Stack
- **B)** Queue
- **C)** Heap
- **D)** Linked List

**Correct Answer:** B

**Explanation:** BFS level-by-level যায়। প্রতিটি visited node-এর unvisited neighbors Queue-তে add হয়। FIFO property নিশ্চিত করে যে আগে যোগ হওয়া node আগে process হয়।

---

**25.** What is the space complexity of Merge Sort?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n²)

**Correct Answer:** C

**Explanation:** Merge Sort merge step-এ দুটো subarray merge করতে temporary array দরকার। মোট extra space O(n)। তাই in-place নয়। (Quick Sort O(log n) stack space নেয়।)

---

**26.** Which of the following is an application of stack?

- **A)** CPU Scheduling
- **B)** Function Call Management
- **C)** Shortest Path Finding
- **D)** Database Indexing

**Correct Answer:** B

**Explanation:** Function call হলে return address ও local variables **stack frame** আকারে call stack-এ push হয়। Function return করলে pop হয়। CPU Scheduling-এ Queue ব্যবহৃত হয়।

---

**27.** In an adjacency matrix representation of a graph with n vertices, the space complexity is:

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n²)
- **D)** O(n³)

**Correct Answer:** C

**Explanation:** Adjacency matrix n×n size-এর — প্রতিটি vertex pair-এর জন্য 0/1 store হয়। মোট n² space। Sparse graph-এ এটা inefficient — adjacency list O(V+E) space নেয়।

---

**28.** Which searching algorithm requires the data to be sorted?

- **A)** Linear Search
- **B)** DFS
- **C)** Binary Search
- **D)** BFS

**Correct Answer:** C

**Explanation:** Binary Search sorted array-এ middle element দিয়ে compare করে half eliminate করে। Unsorted array-তে এটা ভুল result দেবে।

---

**29.** What is the minimum number of edges in a connected graph with n vertices?

- **A)** n
- **B)** n−1
- **C)** n+1
- **D)** n(n−1)/2

**Correct Answer:** B

**Explanation:** Minimum connected graph = **tree**। Tree-তে সবসময় exactly n-1 edges থাকে। n-1 এর কম হলে graph disconnected হবে।

---

**30.** Which traversal method visits the root node first?

- **A)** Inorder
- **B)** Postorder
- **C)** Preorder
- **D)** Level Order

**Correct Answer:** C

**Explanation:** Preorder = Root → Left → Right। Root সবার আগে visit হয়। Inorder-এ Root মাঝে (Left → Root → Right), Postorder-এ Root সবার শেষে।

---

## ❓ MCQ SET 2 — Q31 to Q60

---

**31.** Which data structure is best suited for implementing priority scheduling?

- **A)** Queue
- **B)** Stack
- **C)** Heap
- **D)** Linked List

**Correct Answer:** C

**Explanation:** Priority Queue (Heap দিয়ে implement) সর্বোচ্চ বা সর্বনিম্ন priority-র element O(log n)-এ extract করতে পারে। CPU scheduling-এ highest priority process আগে run করে।

---

**32.** What is the worst-case time complexity of Bubble Sort?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(n²)

**Correct Answer:** D

**Explanation:** Bubble Sort nested loop ব্যবহার করে। Outer loop n-1 বার, inner loop (n-1), (n-2)... বার। মোট comparisons = n(n-1)/2 = O(n²)।

---

**33.** Which of the following is a self-balancing Binary Search Tree?

- **A)** Binary Heap
- **B)** AVL Tree
- **C)** Graph
- **D)** Queue

**Correct Answer:** B

**Explanation:** AVL Tree প্রতিটি insertion ও deletion-এর পর balance factor check করে এবং rotation দিয়ে balance maintain করে। Height সর্বদা O(log n) থাকে।

---

**34.** Which algorithm is used to detect the shortest path in graphs with negative edge weights?

- **A)** Dijkstra's Algorithm
- **B)** Prim's Algorithm
- **C)** Bellman-Ford Algorithm
- **D)** Kruskal's Algorithm

**Correct Answer:** C

**Explanation:** Dijkstra negative weight handle করতে পারে না (greedy assumption ভেঙে যায়)। Bellman-Ford সব edges n-1 বার relax করে, negative weight সহ কাজ করে।

---

**35.** The postfix expression of A+B∗C is:

- **A)** +ABC
- **B)** ABC\*+
- **C)** AB+C\*
- **D)** \*+ABC

**Correct Answer:** B

**Explanation:** Infix A+B\*C — precedence অনুযায়ী \* আগে evaluate হয়। Postfix conversion: B\*C → BC\*, তারপর A+BC\* → ABC\*+।

---

**36.** Which data structure is used for recursion internally?

- **A)** Queue
- **B)** Stack
- **C)** Tree
- **D)** Graph

**Correct Answer:** B

**Explanation:** প্রতিটি recursive call system-এর **call stack**-এ push হয়। Function complete হলে pop হয়। Stack overflow তখনই হয় যখন recursion অনেক গভীর হয়।

---

**37.** Which sorting algorithm repeatedly selects the minimum element?

- **A)** Bubble Sort
- **B)** Quick Sort
- **C)** Selection Sort
- **D)** Merge Sort

**Correct Answer:** C

**Explanation:** Selection Sort প্রতিটি pass-এ unsorted অংশের minimum element খুঁজে সঠিক position-এ রাখে। n-1 বার এই কাজ করলে array sorted হয়।

---

**38.** In a doubly linked list, each node contains:

- **A)** Only data
- **B)** Data and one pointer
- **C)** Data and two pointers
- **D)** Only pointers

**Correct Answer:** C

**Explanation:** Doubly linked list-এর প্রতিটি node-এ: **data**, **prev pointer** (আগের node), **next pointer** (পরের node)। এই কারণে দুই দিকে traverse করা যায়।

---

**39.** Which graph algorithm uses greedy strategy?

- **A)** Merge Sort
- **B)** Prim's Algorithm
- **C)** DFS
- **D)** Binary Search

**Correct Answer:** B

**Explanation:** Prim's Algorithm প্রতিটি step-এ current MST থেকে সবচেয়ে কম weight-এর edge বেছে নেয় — এটাই greedy strategy। Dijkstra-ও greedy।

---

**40.** The best-case time complexity of Insertion Sort is:

- **A)** O(n)
- **B)** O(n²)
- **C)** O(log n)
- **D)** O(n log n)

**Correct Answer:** A

**Explanation:** Already sorted array-তে Insertion Sort প্রতিটি element শুধু একবার compare করে (পিছনের element ছোট না) — n elements-এ n comparisons — O(n)।

---

**41.** Which of the following data structures allows dynamic memory allocation?

- **A)** Array
- **B)** Linked List
- **C)** Matrix
- **D)** Static Queue

**Correct Answer:** B

**Explanation:** Linked List runtime-এ node allocate করে — যতটুকু দরকার ততটুকুই। Array-এর মতো আগে থেকে fixed size declare করতে হয় না।

---

**42.** Which traversal technique is used in Depth First Search (DFS)?

- **A)** Queue
- **B)** Stack
- **C)** Heap
- **D)** Array

**Correct Answer:** B

**Explanation:** DFS গভীরে যায় এবং backtrack করে। এটা Stack (অথবা recursion = implicit stack) দিয়ে implement হয়। BFS-এ Queue ব্যবহৃত হয়।

---

**43.** What is the time complexity of inserting an element at the beginning of a linked list?

- **A)** O(1)
- **B)** O(n)
- **C)** O(log n)
- **D)** O(n²)

**Correct Answer:** A

**Explanation:** Linked list-এর শুরুতে insert করতে শুধু new node-এর next = old head এবং head = new node — মাত্র কয়েকটি pointer operation, তাই O(1)।

---

**44.** Which sorting algorithm compares adjacent elements?

- **A)** Merge Sort
- **B)** Bubble Sort
- **C)** Quick Sort
- **D)** Heap Sort

**Correct Answer:** B

**Explanation:** Bubble Sort প্রতিটি pass-এ পাশাপাশি দুটো element compare করে এবং wrong order হলে swap করে। বড় elements "bubble up" করে উপরে যায়।

---

**45.** Which of the following is NOT a tree traversal method?

- **A)** Inorder
- **B)** Preorder
- **C)** Postorder
- **D)** Binary Search

**Correct Answer:** D

**Explanation:** Binary Search একটি searching technique, tree traversal নয়। Tree traversal methods: Inorder, Preorder, Postorder, Level-order (BFS)।

---

**46.** Which data structure is used to represent hierarchical relationships?

- **A)** Stack
- **B)** Queue
- **C)** Tree
- **D)** Array

**Correct Answer:** C

**Explanation:** Tree parent-child hierarchical relationship represent করে — file system (folder/file), HTML DOM, organization chart, expression tree — সব Tree structure।

---

**47.** What is the maximum number of children in a binary tree node?

- **A)** 1
- **B)** 2
- **C)** 3
- **D)** Unlimited

**Correct Answer:** B

**Explanation:** Binary tree-এর সংজ্ঞাই হলো প্রতিটি node-এ **সর্বোচ্চ 2টি** child (left child এবং right child)। দুইয়ের বেশি হলে সেটা binary tree নয়।

---

**48.** Which sorting algorithm is generally fastest for large datasets?

- **A)** Bubble Sort
- **B)** Selection Sort
- **C)** Quick Sort
- **D)** Linear Search

**Correct Answer:** C

**Explanation:** Quick Sort average case O(n log n) এবং cache-friendly — large dataset-এ প্রায়ই Merge Sort-এর চেয়েও দ্রুত কাজ করে। Linear Search sorting নয়।

---

**49.** Which graph representation is more space efficient for sparse graphs?

- **A)** Adjacency Matrix
- **B)** Adjacency List
- **C)** 2D Array
- **D)** Heap

**Correct Answer:** B

**Explanation:** Sparse graph-এ edges কম। Adjacency Matrix-এ O(V²) space লাগে সব সম্ভাব্য connection-এর জন্য। Adjacency List শুধু existing edges store করে — O(V+E)।

---

**50.** Which of the following algorithms is NOT a sorting algorithm?

- **A)** Merge Sort
- **B)** Heap Sort
- **C)** DFS
- **D)** Quick Sort

**Correct Answer:** C

**Explanation:** DFS (Depth First Search) একটি graph traversal algorithm — data sort করে না। Merge Sort, Heap Sort, Quick Sort সবই sorting algorithms।

---

## ❓ MCQ SET 3 — Q51 to Q80

---

**51.** Which data structure follows the LIFO principle?

- **A)** Queue
- **B)** Stack
- **C)** Tree
- **D)** Graph

**Correct Answer:** B

**Explanation:** LIFO = "Last In First Out" — Stack-এ সর্বশেষ inserted element প্রথমে বের হয়। বই-এর stack বা প্লেটের stack-এর মতো।

---

**52.** What is the average-case time complexity of Quick Sort?

- **A)** O(n²)
- **B)** O(n)
- **C)** O(n log n)
- **D)** O(log n)

**Correct Answer:** C

**Explanation:** Random pivot selection-এ Quick Sort balanced partition তৈরি করে। Recurrence: T(n) = 2T(n/2) + O(n) → O(n log n)।

---

**53.** Which data structure is used in Dijkstra's Algorithm for efficient implementation?

- **A)** Queue
- **B)** Stack
- **C)** Priority Queue
- **D)** Linked List

**Correct Answer:** C

**Explanation:** Dijkstra প্রতিটি step-এ minimum distance vertex select করে। Priority Queue (Min-Heap) এই selection O(log V)-এ করতে পারে।

---

**54.** Which searching technique checks every element one by one?

- **A)** Binary Search
- **B)** Linear Search
- **C)** Hashing
- **D)** DFS

**Correct Answer:** B

**Explanation:** Linear Search = sequential search। Array-এর শুরু থেকে এক এক করে check করে target খোঁজে। Unsorted data-তেও কাজ করে।

---

**55.** In a BST, the left child contains values:

- **A)** Greater than parent
- **B)** Equal to parent
- **C)** Smaller than parent
- **D)** Random values

**Correct Answer:** C

**Explanation:** BST property: left subtree-তে সব values parent-এর চেয়ে **ছোট**, right subtree-তে সব values parent-এর চেয়ে **বড়**। এই property-র কারণে efficient search সম্ভব।

---

**56.** Which algorithm is best suited for finding connected components in a graph?

- **A)** DFS
- **B)** Bubble Sort
- **C)** Binary Search
- **D)** Selection Sort

**Correct Answer:** A

**Explanation:** DFS একটি node থেকে শুরু করে সব reachable nodes visit করে। একটি component শেষ হলে unvisited node থেকে নতুন DFS শুরু করলে নতুন component পাওয়া যায়।

---

**57.** Which of the following is a non-linear data structure?

- **A)** Queue
- **B)** Stack
- **C)** Array
- **D)** Graph

**Correct Answer:** D

**Explanation:** Graph-এ nodes arbitrary relationship দিয়ে connected — linear নয়। Tree-ও non-linear। Array, Stack, Queue সব linear (sequential order)।

---

**58.** What is the minimum height of a binary tree with 15 nodes?

- **A)** 3
- **B)** 4
- **C)** 5
- **D)** 15

**Correct Answer:** B

**Explanation:** Minimum height হয় complete binary tree-তে। 2⁴ - 1 = 15, তাই height = 4। অর্থাৎ 4 level-এর perfect binary tree-তে 15 nodes ধরে।

---

**59.** Which sorting algorithm is based on partitioning?

- **A)** Merge Sort
- **B)** Bubble Sort
- **C)** Quick Sort
- **D)** Insertion Sort

**Correct Answer:** C

**Explanation:** Quick Sort pivot বেছে array-কে দুই ভাগ করে — pivot-এর বাম দিকে ছোট, ডান দিকে বড় elements। এই partition recursively চলে।

---

**60.** Which traversal visits Left → Right → Root?

- **A)** Preorder
- **B)** Inorder
- **C)** Postorder
- **D)** Level Order

**Correct Answer:** C

**Explanation:** Postorder traversal: Left subtree → Right subtree → Root। Expression tree-এ postfix notation বের করতে ব্যবহৃত হয়।

---

**61.** Which of the following is true about a complete binary tree?

- **A)** Every node has exactly two children
- **B)** All levels are completely filled except possibly the last
- **C)** Nodes are connected cyclically
- **D)** Every node has one child

**Correct Answer:** B

**Explanation:** Complete binary tree-এ সব level পূর্ণ থাকে শেষ level ছাড়া, এবং শেষ level left থেকে ডানে fill হয়। Array-তে store করার জন্য efficient।

---

**62.** Which data structure is most appropriate for implementing BFS in graphs?

- **A)** Stack
- **B)** Queue
- **C)** Tree
- **D)** Heap

**Correct Answer:** B

**Explanation:** BFS প্রতিটি vertex-এর neighbors Queue-তে add করে level-by-level explore করে। Queue FIFO property নিশ্চিত করে nearest neighbors আগে process হয়।

---

**63.** What is the worst-case time complexity of Linear Search?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n log n)

**Correct Answer:** C

**Explanation:** Worst case = element শেষে আছে অথবা নেই। তখন সব n elements check করতে হয় → O(n)।

---

**64.** Which sorting algorithm builds a heap structure before sorting?

- **A)** Bubble Sort
- **B)** Heap Sort
- **C)** Merge Sort
- **D)** Insertion Sort

**Correct Answer:** B

**Explanation:** Heap Sort প্রথমে array থেকে max-heap তৈরি করে (O(n)), তারপর root extract করে array-তে রাখে এবং heap re-adjust করে (O(log n) প্রতিবার)।

---

**65.** In graph theory, a tree with n vertices contains how many edges?

- **A)** n
- **B)** n+1
- **C)** n−1
- **D)** n²

**Correct Answer:** C

**Explanation:** Tree = connected acyclic graph। n vertices-এর tree-তে সর্বদা n-1 edges। কম হলে disconnected, বেশি হলে cycle তৈরি হবে।

---

**66.** Which data structure is best for representing recursive hierarchical data?

- **A)** Queue
- **B)** Stack
- **C)** Tree
- **D)** Array

**Correct Answer:** C

**Explanation:** Tree-এর recursive structure (node → children → grandchildren) hierarchical data স্বাভাবিকভাবে represent করে — file system, XML/HTML, organization chart।

---

**67.** Which algorithm is used to sort elements by repeatedly inserting them into the correct position?

- **A)** Selection Sort
- **B)** Bubble Sort
- **C)** Insertion Sort
- **D)** Quick Sort

**Correct Answer:** C

**Explanation:** Insertion Sort প্রতিটি element নিয়ে sorted অংশে সঠিক position-এ insert করে। Cards sort করার মানুষিক পদ্ধতির মতো।

---

**68.** Which graph traversal algorithm guarantees the shortest path in an unweighted graph?

- **A)** DFS
- **B)** BFS
- **C)** Prim's Algorithm
- **D)** Kruskal's Algorithm

**Correct Answer:** B

**Explanation:** Unweighted graph-এ BFS level-by-level traverse করে, তাই first time কোনো vertex reach করলে সেটাই shortest path। Weighted graph-এ Dijkstra লাগে।

---

**69.** Which operation is NOT efficient in an array?

- **A)** Random access
- **B)** Access by index
- **C)** Insertion at beginning
- **D)** Reading elements

**Correct Answer:** C

**Explanation:** Array-তে beginning-এ insert করতে সব existing elements এক position ডানে shift করতে হয় → O(n)। Random access ও index access O(1)-এ।

---

**70.** Which of the following uses recursion extensively?

- **A)** Merge Sort
- **B)** Linear Search
- **C)** Array Traversal
- **D)** Queue Operations

**Correct Answer:** A

**Explanation:** Merge Sort recursively array-কে half করে এবং merge করে। Recursion depth O(log n)। Linear Search ও Array Traversal iterative।

---

**71.** Which of the following sorting algorithms is in-place?

- **A)** Merge Sort
- **B)** Quick Sort
- **C)** Counting Sort
- **D)** Radix Sort

**Correct Answer:** B

**Explanation:** In-place = extra O(n) memory ছাড়া original array-এ sort। Quick Sort partitioning-এ শুধু O(log n) stack space নেয়। Merge Sort O(n) extra space নেয়।

---

**72.** In a hash table, collision occurs when:

- **A)** Two keys are identical
- **B)** Two keys produce the same hash value
- **C)** The table becomes full
- **D)** A key is deleted

**Correct Answer:** B

**Explanation:** Collision = ভিন্ন keys একই hash index পায়। e.g. h(k) = k % 10 হলে 15 ও 25 উভয়ই index 5-এ যায় → collision।

---

**73.** What is the time complexity of deleting a node from the beginning of a singly linked list?

- **A)** O(1)
- **B)** O(n)
- **C)** O(log n)
- **D)** O(n²)

**Correct Answer:** A

**Explanation:** Head থেকে delete করতে শুধু head = head→next করতে হয় — O(1)। Middle বা end থেকে delete করতে O(n) লাগে।

---

**74.** Which traversal method is used to create a copy of a tree?

- **A)** Inorder
- **B)** Preorder
- **C)** Postorder
- **D)** BFS

**Correct Answer:** B

**Explanation:** Preorder (Root → Left → Right) দিয়ে tree copy করলে root আগে create হয়, তারপর children। Postorder দিয়ে tree delete করা হয় (children আগে delete)।

---

**75.** Which algorithm is suitable for finding all-pairs shortest paths?

- **A)** Dijkstra's Algorithm
- **B)** Prim's Algorithm
- **C)** Floyd-Warshall Algorithm
- **D)** DFS

**Correct Answer:** C

**Explanation:** Floyd-Warshall O(V³) time-এ সব vertex pair-এর shortest path বের করে। Dijkstra একটি source থেকে single-source shortest path।

---

**76.** The postfix expression "AB+CD-\*" evaluates which infix expression?

- **A)** (A+B)∗(C−D)
- **B)** (A+B)−(C∗D)
- **C)** A+B∗(C−D)
- **D)** (A+B)−(C−D)

**Correct Answer:** A

**Explanation:** AB+ = (A+B), CD- = (C-D), তারপর \* apply → (A+B)\*(C-D)। Postfix evaluation: stack-এ push করতে থাকো, operator পেলে দুটো operand pop করো।

---

**77.** Which of the following data structures provides fastest search on average?

- **A)** Linked List
- **B)** Stack
- **C)** Hash Table
- **D)** Queue

**Correct Answer:** C

**Explanation:** Hash Table average O(1) search। Linked List, Stack, Queue সব O(n) sequential search।

---

**78.** In a min heap:

- **A)** Parent node is greater than children
- **B)** Parent node is smaller than children
- **C)** All nodes are sorted
- **D)** Root contains maximum value

**Correct Answer:** B

**Explanation:** Min heap property — parent সর্বদা children-এর চেয়ে ছোট বা সমান। Root-এ সবচেয়ে ছোট element থাকে। Priority Queue (min priority) implement করতে ব্যবহৃত।

---

**79.** What is the maximum number of nodes at level k in a binary tree?

- **A)** k
- **B)** 2^k
- **C)** k²
- **D)** 2k

**Correct Answer:** B

**Explanation:** Level 0 (root) = 1 = 2⁰ node। Level 1 = 2 = 2¹ nodes। Level k = 2^k nodes। প্রতি level-এ node count দ্বিগুণ।

---

**80.** Which sorting algorithm is NOT comparison based?

- **A)** Quick Sort
- **B)** Merge Sort
- **C)** Heap Sort
- **D)** Counting Sort

**Correct Answer:** D

**Explanation:** Counting Sort elements compare করে না — counting array তৈরি করে frequency count রাখে। তাই O(n+k) সম্ভব, comparison-based-এর O(n log n) lower bound ভেঙে।

---

## ❓ MCQ SET 4 — Q81 to Q110

---

**81.** Which graph representation is better for dense graphs?

- **A)** Adjacency List
- **B)** Adjacency Matrix
- **C)** Linked List
- **D)** Queue

**Correct Answer:** B

**Explanation:** Dense graph-এ edges অনেক বেশি (E ≈ V²)। Adjacency Matrix-এ edge check O(1)। Adjacency List-এ edge check O(degree) — dense graph-এ inefficient।

---

**82.** Which of the following is true for AVL trees?

- **A)** Balance factor can be more than 2
- **B)** Tree is always complete
- **C)** Height difference between subtrees is at most 1
- **D)** Root contains minimum value

**Correct Answer:** C

**Explanation:** AVL tree-এ প্রতিটি node-এর balance factor = height(left) - height(right) = {-1, 0, +1}। এর বাইরে হলে rotation দিয়ে balance করতে হয়।

---

**83.** What is the time complexity of inserting an element into a heap?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n log n)

**Correct Answer:** B

**Explanation:** Heap-এ insert করলে leaf-এ add হয়, তারপর heap property maintain করতে parent-এর সাথে compare করে উপরে উঠতে হয় (heapify-up)। Height O(log n)।

---

**84.** Which technique is used by Merge Sort?

- **A)** Greedy
- **B)** Dynamic Programming
- **C)** Divide and Conquer
- **D)** Backtracking

**Correct Answer:** C

**Explanation:** Merge Sort তিনটি step follow করে: Divide (array দুই ভাগ), Conquer (recursively sort), Combine (merge)। এটাই classic Divide and Conquer।

---

**85.** Which data structure can efficiently check balanced parentheses?

- **A)** Queue
- **B)** Stack
- **C)** Graph
- **D)** Tree

**Correct Answer:** B

**Explanation:** Opening bracket '(' বা '{' বা '[' stack-এ push হয়। Closing bracket পেলে stack-এর top-এর সাথে match করে। Mismatch বা empty stack হলে unbalanced।

---

**86.** Which graph algorithm finds Minimum Spanning Tree?

- **A)** BFS
- **B)** DFS
- **C)** Kruskal's Algorithm
- **D)** Binary Search

**Correct Answer:** C

**Explanation:** Kruskal's Algorithm সব edges weight অনুযায়ী sort করে, তারপর cycle তৈরি না করে ছোট থেকে edge যোগ করে MST তৈরি করে। Union-Find ব্যবহার করে cycle detect করা হয়।

---

**87.** Which case causes worst performance in Quick Sort?

- **A)** Random pivot
- **B)** Balanced partition
- **C)** Sorted input with poor pivot selection
- **D)** Duplicate values

**Correct Answer:** C

**Explanation:** Already sorted array-এ first বা last element pivot নিলে প্রতিটি partition-এ একটি ভাগে 0 elements এবং অন্যটিতে n-1 elements। n বার এই হলে O(n²)।

---

**88.** A circular linked list differs from a singly linked list because:

- **A)** It has two pointers
- **B)** Last node points to first node
- **C)** It contains sorted data
- **D)** Nodes are indexed

**Correct Answer:** B

**Explanation:** Circular linked list-এ শেষ node-এর next = head। এতে NULL নেই। Round-robin scheduling, circular buffer-এ ব্যবহৃত হয়।

---

**89.** Which traversal uses recursion most naturally?

- **A)** BFS
- **B)** DFS
- **C)** Linear Search
- **D)** Queue Traversal

**Correct Answer:** B

**Explanation:** DFS গভীরে recursively যায় এবং backtrack করে। Recursive implementation স্বাভাবিক। BFS iterative (Queue ব্যবহার করে)।

---

**90.** Which sorting algorithm performs best on nearly sorted data?

- **A)** Bubble Sort
- **B)** Insertion Sort
- **C)** Selection Sort
- **D)** Heap Sort

**Correct Answer:** B

**Explanation:** Nearly sorted array-এ Insertion Sort প্রায় O(n) performance দেয় কারণ প্রতিটি element insert করতে খুব কম shifting লাগে।

---

**91.** In a Binary Search Tree, searching depends on:

- **A)** Sequential traversal only
- **B)** Comparing values with current node
- **C)** Hash functions
- **D)** Graph traversal

**Correct Answer:** B

**Explanation:** BST search: target < current → left-এ যাও; target > current → right-এ যাও; target == current → found। Comparison-based navigation।

---

**92.** What is the degree of a leaf node in a tree?

- **A)** 0
- **B)** 1
- **C)** 2
- **D)** Depends on tree height

**Correct Answer:** A

**Explanation:** Degree = number of children। Leaf node = যে node-এর কোনো child নেই। তাই degree = 0।

---

**93.** Which data structure is used in recursive Depth First Search?

- **A)** Queue
- **B)** Stack
- **C)** Heap
- **D)** Array

**Correct Answer:** B

**Explanation:** DFS recursive implementation-এ function call stack ব্যবহৃত হয়। Iterative DFS-এ explicit Stack ব্যবহার করা হয়।

---

**94.** Which of the following algorithms is stable?

- **A)** Heap Sort
- **B)** Quick Sort
- **C)** Merge Sort
- **D)** Selection Sort

**Correct Answer:** C

**Explanation:** Merge Sort stable কারণ merge step-এ equal elements-এর ক্ষেত্রে left array-এর element আগে নেওয়া হয় — relative order preserve হয়।

---

**95.** Which operation is costly in a singly linked list?

- **A)** Insertion at head
- **B)** Deletion at head
- **C)** Random access
- **D)** Traversal

**Correct Answer:** C

**Explanation:** Singly linked list-এ i-th element পেতে head থেকে i বার traverse করতে হয় — O(n)। Array-র মতো index দিয়ে সরাসরি যাওয়া যায় না।

---

**96.** Which graph concept represents a path starting and ending at the same vertex?

- **A)** Tree
- **B)** Cycle
- **C)** Forest
- **D)** Edge

**Correct Answer:** B

**Explanation:** Cycle = path যা একই vertex থেকে শুরু এবং শেষ হয়। Undirected graph-এ cycle detection important (spanning tree, MST)।

---

**97.** What is the auxiliary space complexity of recursive Binary Search?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n²)

**Correct Answer:** B

**Explanation:** Recursive Binary Search প্রতিটি call stack-এ push হয়। Recursion depth O(log n) — তাই O(log n) extra space। Iterative Binary Search O(1)।

---

**98.** Which sorting algorithm repeatedly divides data around a pivot?

- **A)** Merge Sort
- **B)** Bubble Sort
- **C)** Quick Sort
- **D)** Counting Sort

**Correct Answer:** C

**Explanation:** Quick Sort pivot বেছে partition করে — left side এ ছোট, right side-এ বড় elements রাখে। তারপর recursively দুই ভাগে same কাজ করে।

---

**99.** Which property is maintained in a Binary Search Tree?

- **A)** Parent always equals children
- **B)** Left subtree < Root < Right subtree
- **C)** Root contains minimum value
- **D)** Tree is always balanced

**Correct Answer:** B

**Explanation:** BST-এর fundamental property: left subtree-র সব values < root < right subtree-র সব values। এই property inorder traversal-এ sorted output দেয়।

---

**100.** Which data structure is most suitable for implementing expression evaluation?

- **A)** Queue
- **B)** Heap
- **C)** Stack
- **D)** Graph

**Correct Answer:** C

**Explanation:** Postfix/prefix expression evaluate করতে Stack ব্যবহৃত হয়। Operand push হয়, operator পেলে দুটো operand pop করে evaluate করে result push করা হয়।

---

## ❓ MCQ SET 5 — Q101 to Q130 (Advanced)

---

**101.** What is the worst-case time complexity of inserting n elements into an initially empty Binary Search Tree?

- **A)** O(n)
- **B)** O(n log n)
- **C)** O(n²)
- **D)** O(log n)

**Correct Answer:** C

**Explanation:** Sorted order-এ insert করলে BST right-skewed হয় (1→2→3→...→n)। প্রতিটি insert O(n) → মোট O(n²)। Random order-এ average O(n log n)।

---

**102.** Which of the following sorting algorithms guarantees O(n log n) time complexity in the worst case?

- **A)** Quick Sort
- **B)** Bubble Sort
- **C)** Merge Sort
- **D)** Insertion Sort

**Correct Answer:** C

**Explanation:** Merge Sort সর্বদা array সমানভাবে ভাগ করে — worst, average, best সব case-এ O(n log n)। Quick Sort worst case O(n²)।

---

**103.** In an AVL tree, rebalancing is performed using:

- **A)** Swapping
- **B)** Hashing
- **C)** Rotations
- **D)** Traversal

**Correct Answer:** C

**Explanation:** AVL tree 4 ধরনের rotation ব্যবহার করে: LL Rotation (Right rotate), RR Rotation (Left rotate), LR Rotation (Left then Right), RL Rotation (Right then Left)।

---

**104.** What is the maximum number of edges in a directed graph with n vertices (without self-loops)?

- **A)** n(n−1)/2
- **B)** n(n−1)
- **C)** n²
- **D)** 2n

**Correct Answer:** B

**Explanation:** Directed graph-এ (u,v) এবং (v,u) আলাদা edge। প্রতিটি vertex বাকি n-1 vertex-এ edge দিতে পারে → n(n-1)। Undirected-এ n(n-1)/2।

---

**105.** Which algorithm is used to detect cycles in a directed graph using indegree?

- **A)** DFS
- **B)** Prim's Algorithm
- **C)** Kahn's Algorithm
- **D)** Dijkstra's Algorithm

**Correct Answer:** C

**Explanation:** Kahn's Algorithm BFS-based topological sort। Indegree=0 nodes থেকে শুরু করে। শেষে সব nodes process না হলে cycle আছে।

---

**106.** What is the average-case time complexity of searching in a balanced BST?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n log n)

**Correct Answer:** B

**Explanation:** Balanced BST height O(log n)। Search করতে root থেকে leaf পর্যন্ত যেতে হয় — O(log n)। AVL, Red-Black Tree balanced BST-এর উদাহরণ।

---

**107.** Which data structure is used in Heap Sort?

- **A)** Queue
- **B)** Binary Heap
- **C)** Stack
- **D)** Graph

**Correct Answer:** B

**Explanation:** Heap Sort Binary Heap ব্যবহার করে। প্রথমে max-heap build করে, তারপর root extract করে array-র শেষে রাখে এবং heap re-adjust করে।

---

**108.** Which algorithm can detect negative weight cycles?

- **A)** Dijkstra's Algorithm
- **B)** BFS
- **C)** Bellman-Ford Algorithm
- **D)** Prim's Algorithm

**Correct Answer:** C

**Explanation:** Bellman-Ford n-1 বার edge relax করে। n-তম বারেও relax হলে negative weight cycle আছে। Dijkstra negative weight cycle-এ infinite loop-এ পড়ে।

---

**109.** In a complete binary tree stored as an array, the left child of index i is:

- **A)** 2i
- **B)** 2i+1
- **C)** 2i+2
- **D)** Both B and C depending on indexing

**Correct Answer:** D

**Explanation:** 0-based indexing: left child = 2i+1, right = 2i+2। 1-based indexing: left child = 2i, right = 2i+1। উভয় convention ব্যবহৃত হয়।

---

**110.** Which graph traversal uses backtracking naturally?

- **A)** BFS
- **B)** DFS
- **C)** Dijkstra's Algorithm
- **D)** Kruskal's Algorithm

**Correct Answer:** B

**Explanation:** DFS path-এ যতদূর যাওয়া যায় যায়, তারপর dead-end হলে backtrack করে অন্য path নেয়। Maze solving, N-Queens-এ DFS backtracking ব্যবহৃত হয়।

---

**111.** What is the minimum number of nodes in an AVL tree of height 3?

- **A)** 4
- **B)** 5
- **C)** 7
- **D)** 15

**Correct Answer:** A

**Explanation:** AVL minimum nodes: N(h) = N(h-1) + N(h-2) + 1। N(0)=1, N(1)=2, N(2)=4, N(3)=7। কিন্তু height 3 বলতে root level থেকে গণনায় N(3)=7। (Convention অনুযায়ী উত্তর 4 যদি height = edges count হয়।)

---

**112.** Which sorting algorithm has the least number of swaps?

- **A)** Bubble Sort
- **B)** Selection Sort
- **C)** Quick Sort
- **D)** Merge Sort

**Correct Answer:** B

**Explanation:** Selection Sort প্রতিটি pass-এ exactly একটি swap করে (minimum element-কে সঠিক position-এ রাখতে)। মোট n-1 swap — অন্য algorithms-এর চেয়ে কম।

---

**113.** The amortized time complexity of insertion in a dynamic array is:

- **A)** O(1)
- **B)** O(n)
- **C)** O(log n)
- **D)** O(n log n)

**Correct Answer:** A

**Explanation:** Dynamic array (vector) resize হলে O(n) কিন্তু 2× growth strategy-তে n insertion-এ মোট কাজ O(n) → amortized per insertion O(1)।

---

**114.** Which algorithm is best suited for sparse graphs?

- **A)** Floyd-Warshall Algorithm
- **B)** Adjacency Matrix BFS
- **C)** Dijkstra with Priority Queue
- **D)** Bubble Sort

**Correct Answer:** C

**Explanation:** Sparse graph-এ E << V²। Dijkstra with Priority Queue (Min-Heap) = O((V+E) log V) — Floyd-Warshall O(V³) sparse graph-এ অনেক বেশি।

---

**115.** Which tree traversal gives postfix expression from an expression tree?

- **A)** Preorder
- **B)** Inorder
- **C)** Postorder
- **D)** BFS

**Correct Answer:** C

**Explanation:** Expression tree-এ: Inorder = infix, Preorder = prefix, Postorder = postfix। Postorder (Left→Right→Root) operands আগে, operator পরে — postfix notation।

---

**116.** The height of a balanced BST containing n nodes is:

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n²)

**Correct Answer:** B

**Explanation:** Balanced BST (AVL, Red-Black) height = O(log n)। Unbalanced/skewed BST height = O(n)।

---

**117.** Which hashing technique resolves collisions by searching sequentially?

- **A)** Chaining
- **B)** Linear Probing
- **C)** Double Hashing
- **D)** AVL Tree

**Correct Answer:** B

**Explanation:** Linear Probing-এ collision হলে পরের slot check করে (h(k)+1, h(k)+2, ...) যতক্ষণ empty slot না পায়। Primary clustering সমস্যা হতে পারে।

---

**118.** What is the maximum number of nodes in a binary tree of height h?

- **A)** 2^h
- **B)** 2^h − 1
- **C)** h²
- **D)** 2h

**Correct Answer:** B

**Explanation:** Height h-র perfect binary tree-তে সব levels পূর্ণ। Total nodes = 2⁰+2¹+2²+...+2^(h-1) = 2^h - 1। (root থেকে h levels, 0-indexed হলে 2^(h+1)-1।)

---

**119.** Which algorithm uses relaxation technique?

- **A)** Bubble Sort
- **B)** Bellman-Ford Algorithm
- **C)** DFS
- **D)** Heap Sort

**Correct Answer:** B

**Explanation:** Relaxation: if dist[u] + weight(u,v) < dist[v], then dist[v] = dist[u] + weight(u,v)। Bellman-Ford সব edges-এ এই relaxation n-1 বার করে।

---

**120.** Which of the following is true for Red-Black Trees?

- **A)** Every node is red
- **B)** Longest path is at most twice the shortest path
- **C)** Tree is always complete
- **D)** Root is always leaf

**Correct Answer:** B

**Explanation:** Red-Black Tree balance guarantee: longest path ≤ 2 × shortest path। Root সর্বদা Black, Red node-এর children Black। Height O(log n) নিশ্চিত।

---

**121.** Which data structure efficiently supports range queries?

- **A)** Stack
- **B)** Queue
- **C)** Segment Tree
- **D)** Linked List

**Correct Answer:** C

**Explanation:** Segment Tree range sum, range min/max O(log n)-এ query করতে পারে। Array-এ O(n) লাগে। Competitive programming-এ অত্যন্ত গুরুত্বপূর্ণ।

---

**122.** What is the time complexity of heapify operation?

- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n log n)

**Correct Answer:** B

**Explanation:** Heapify একটি node থেকে শুরু করে tree-র নিচে নামে (sift-down) বা উপরে ওঠে (sift-up)। Height O(log n) → heapify O(log n)।

---

**123.** Which traversal of a BST produces descending order?

- **A)** Inorder
- **B)** Reverse Inorder
- **C)** Preorder
- **D)** Postorder

**Correct Answer:** B

**Explanation:** Normal Inorder (Left→Root→Right) ascending order দেয়। Reverse Inorder (Right→Root→Left) descending order দেয়।

---

**124.** Which shortest path algorithm works using dynamic programming?

- **A)** DFS
- **B)** BFS
- **C)** Floyd-Warshall Algorithm
- **D)** Prim's Algorithm

**Correct Answer:** C

**Explanation:** Floyd-Warshall: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]) সব intermediate vertex k-এর জন্য। এটা bottom-up DP।

---

**125.** In disjoint set union, path compression improves:

- **A)** Sorting speed
- **B)** Tree balancing
- **C)** Find operation efficiency
- **D)** Heap insertion

**Correct Answer:** C

**Explanation:** Path compression — Find operation-এ root পর্যন্ত যাওয়ার সময় সব nodes সরাসরি root-এ attach করে দেয়। পরবর্তী Find অনেক দ্রুত হয়।

---

**126.** Which sorting algorithm is adaptive?

- **A)** Heap Sort
- **B)** Merge Sort
- **C)** Insertion Sort
- **D)** Selection Sort

**Correct Answer:** C

**Explanation:** Adaptive sort = input nearly sorted থাকলে কম কাজ করে। Insertion Sort nearly sorted-এ O(n) performance দেয়। Heap ও Selection Sort সব case-এ same কাজ করে।

---

**127.** What is the diameter of a tree?

- **A)** Number of leaves
- **B)** Height of root
- **C)** Longest path between two vertices
- **D)** Total edges

**Correct Answer:** C

**Explanation:** Tree diameter = যেকোনো দুটো node-এর মধ্যে সবচেয়ে দীর্ঘ path। DFS দিয়ে efficiently বের করা যায়।

---

**128.** Which data structure is used in recursion elimination?

- **A)** Queue
- **B)** Stack
- **C)** Heap
- **D)** Tree

**Correct Answer:** B

**Explanation:** Recursive algorithm-কে iterative-এ convert করতে explicit Stack ব্যবহার করা হয়। Function call stack-এর replacement।

---

**129.** Which graph algorithm is based on Union-Find data structure?

- **A)** BFS
- **B)** DFS
- **C)** Kruskal's Algorithm
- **D)** Dijkstra's Algorithm

**Correct Answer:** C

**Explanation:** Kruskal's MST algorithm Union-Find ব্যবহার করে cycle detect করে। Edge add করার আগে দুই vertices একই component-এ আছে কিনা Find দিয়ে check, না থাকলে Union করে edge add।

---

**130.** What is the best-case time complexity of Quick Sort?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(n²)

**Correct Answer:** C

**Explanation:** Best case = প্রতিটি partition সমান দুই ভাগ করে। Recurrence: T(n) = 2T(n/2) + O(n) → O(n log n)। Average case-ও O(n log n)।

---

## ❓ MCQ SET 6 — Q131 to Q150 (Math & Formula Based)

---

**131.** What is the total number of comparisons in the worst case for Linear Search on an array of size n?

- **A)** 1
- **B)** log n
- **C)** n
- **D)** n log n

**Correct Answer:** C

**Explanation:** Worst case-এ target element শেষে বা absent। প্রতিটি element একবার check → n comparisons। T(n) = n।

---

**132.** What is the recurrence relation of Merge Sort?

- **A)** T(n) = T(n−1) + n
- **B)** T(n) = 2T(n/2) + n
- **C)** T(n) = nT(n−1)
- **D)** T(n) = T(√n) + 1

**Correct Answer:** B

**Explanation:** Merge Sort array দুই ভাগে ভাগ করে → 2T(n/2)। তারপর merge → O(n)। Master Theorem: a=2, b=2, f(n)=n → O(n log n)।

---

**133.** What is the height of a complete binary tree containing 31 nodes?

- **A)** 4
- **B)** 5
- **C)** 6
- **D)** 31

**Correct Answer:** B

**Explanation:** 2^h - 1 = n → 2^h = 32 → h = 5। অর্থাৎ 5-level-এর perfect binary tree-তে 31 nodes।

---

**134.** What is the time complexity of Binary Search?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n²)
- **D)** O(1)

**Correct Answer:** B

**Explanation:** Binary Search প্রতি step-এ search space half করে। n থেকে শুরু করে 1-এ আসতে log₂n steps। T(n) = T(n/2) + 1 → O(log n)।

---

**135.** What is the maximum number of edges in an undirected graph with n vertices?

- **A)** n
- **B)** n−1
- **C)** n(n−1)/2
- **D)** n²

**Correct Answer:** C

**Explanation:** Complete undirected graph: প্রতিটি vertex pair-এর একটি edge। C(n,2) = n(n-1)/2। n=5 হলে max = 10 edges।

---

**136.** What is the maximum number of nodes at level k in a binary tree?

- **A)** k
- **B)** 2k
- **C)** 2^k
- **D)** k²

**Correct Answer:** C

**Explanation:** Level 0 = 1 node, level 1 = 2, level 2 = 4, level k = 2^k। প্রতি level-এ node count দ্বিগুণ হয়।

---

**137.** What is the worst-case time complexity of Bubble Sort?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(n²)

**Correct Answer:** D

**Explanation:** Bubble Sort-এ total comparisons = (n-1)+(n-2)+...+1 = n(n-1)/2 = O(n²)।

---

**138.** In a full binary tree, if the number of internal nodes is i, then total nodes are:

- **A)** i+1
- **B)** 2i
- **C)** 2i+1
- **D)** i²

**Correct Answer:** C

**Explanation:** Full binary tree: leaf nodes = internal nodes + 1 = i+1। Total = internal + leaf = i + (i+1) = 2i+1।

---

**139.** What is the space complexity of an adjacency matrix for a graph with n vertices?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n²)
- **D)** O(2^n)

**Correct Answer:** C

**Explanation:** Adjacency matrix n×n size। প্রতিটি cell A[i][j] = 1 যদি edge (i,j) থাকে। মোট n² space।

---

**140.** What is the minimum number of edges required for a connected graph with n vertices?

- **A)** n
- **B)** n−1
- **C)** n+1
- **D)** n²

**Correct Answer:** B

**Explanation:** Minimum connected graph = spanning tree = n-1 edges। n-1 এর কম হলে graph disconnected হবে।

---

**141.** If a BST has height h, what is the maximum number of nodes?

- **A)** h
- **B)** 2h
- **C)** 2^h − 1
- **D)** h²

**Correct Answer:** C

**Explanation:** Height h-র perfect binary tree: level 0 থেকে h-1 পর্যন্ত সব পূর্ণ। Total = 2⁰+2¹+...+2^(h-1) = 2^h - 1।

---

**142.** What is the average-case complexity of Quick Sort?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(n²)

**Correct Answer:** C

**Explanation:** Average case-এ pivot balanced partition তৈরি করে। T(n) = 2T(n/2) + n → O(n log n)।

---

**143.** In a heap stored as an array, the parent index of node i (0-based indexing) is:

- **A)** i/2
- **B)** (i−1)/2
- **C)** 2i+1
- **D)** 2i+2

**Correct Answer:** B

**Explanation:** 0-based indexing: parent(i) = (i-1)/2 (integer division)। child(i) = 2i+1 (left), 2i+2 (right)। 1-based: parent(i) = i/2।

---

**144.** What is the recurrence relation of Binary Search?

- **A)** T(n) = T(n−1) + 1
- **B)** T(n) = 2T(n/2)
- **C)** T(n) = T(n/2) + 1
- **D)** T(n) = nT(n−1)

**Correct Answer:** C

**Explanation:** Binary Search প্রতি step-এ half করে (T(n/2)) এবং একটি comparison করে (+1)। Solving: O(log n)।

---

**145.** What is the number of edges in a complete graph with 10 vertices?

- **A)** 20
- **B)** 45
- **C)** 90
- **D)** 100

**Correct Answer:** B

**Explanation:** E = n(n-1)/2 = 10×9/2 = 45। Complete graph-এ প্রতিটি vertex pair-এ edge আছে।

---

**146.** What is the height of a binary tree with only root node?

- **A)** 0
- **B)** 1
- **C)** 2
- **D)** Undefined

**Correct Answer:** B

**Explanation:** Height = number of levels। Root-only tree = 1 level। কিছু convention-এ height = edges = 0 (root node থেকে leaf-এর edges)।

---

**147.** What is the total number of leaf nodes in a full binary tree with 15 total nodes?

- **A)** 6
- **B)** 7
- **C)** 8
- **D)** 15

**Correct Answer:** C

**Explanation:** Full binary tree: leaf nodes = (n+1)/2 = (15+1)/2 = 8। Internal nodes = n - leaf = 15 - 8 = 7।

---

**148.** Which complexity grows faster?

- **A)** O(n)
- **B)** O(log n)
- **C)** O(n log n)
- **D)** O(1)

**Correct Answer:** C

**Explanation:** Growth order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)। O(n log n) সবার মধ্যে সবচেয়ে দ্রুত বাড়ে।

---

**149.** What is the total number of comparisons in Selection Sort?

- **A)** n
- **B)** log n
- **C)** n(n−1)/2
- **D)** n² + n

**Correct Answer:** C

**Explanation:** Selection Sort: 1st pass = n-1 comparisons, 2nd = n-2, ..., last = 1। Total = (n-1)+(n-2)+...+1 = n(n-1)/2।

---

**150.** What is the maximum number of leaf nodes in a binary tree of height h?

- **A)** h
- **B)** 2h
- **C)** 2^(h−1)
- **D)** 2^h

**Correct Answer:** C

**Explanation:** Height h (h levels, root = level 1) → last level h-তে maximum 2^(h-1) nodes। সব nodes leaf হলে এটাই max leaf count।

---

## 📊 Quick Topic-wise MCQ Index

| Topic | Questions |
|-------|-----------|
| Sorting Algorithms | Q4, Q8, Q13, Q21, Q25, Q31, Q32, Q35, Q37, Q40, Q44, Q48, Q50, Q52, Q59, Q67, Q71, Q80, Q84, Q87, Q90, Q98, Q101, Q102, Q112, Q126, Q130, Q131, Q137, Q142, Q149 |
| Binary Search Tree | Q3, Q18, Q33, Q55, Q91, Q99, Q101, Q106, Q116, Q123, Q141 |
| Graph | Q6, Q9, Q16, Q19, Q23, Q24, Q27, Q29, Q34, Q39, Q41, Q49, Q53, Q56, Q65, Q68, Q75, Q81, Q86, Q96, Q104, Q105, Q108, Q110, Q114, Q119, Q120, Q124, Q125, Q129, Q135, Q139, Q140, Q145 |
| Stack & Queue | Q2, Q5, Q10, Q11, Q14, Q22, Q24, Q26, Q36, Q51, Q62, Q85, Q93, Q100 |
| Tree | Q7, Q15, Q21, Q30, Q45, Q46, Q47, Q58, Q61, Q66, Q74, Q79, Q83, Q92, Q107, Q115, Q118, Q121, Q127, Q133, Q136, Q138, Q146, Q147, Q150 |
| Linked List | Q38, Q41, Q43, Q73, Q88, Q95 |
| Hashing | Q12, Q17, Q72, Q77, Q117 |
| Searching | Q1, Q28, Q54, Q63, Q134, Q144 |
| Arrays | Q69, Q113 |
| Misc / Complexity | Q20, Q57, Q97, Q103, Q148 |

---

*DSA MCQ Bank 150 | Bangladesh Bank IT/AME/Programmer Exam | Scraped from Official Practice Set*
