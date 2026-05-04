# Bangladesh Bank IT Exam — C Programming Written Questions

> **Exam context:** Bangladesh Bank Officer (IT) / AME / Programmer পদের written exam-এ C programming theory থেকে এই ধরনের question আসে। প্রতিটা answer নিজে হাতে practice করো।

**মোট topic:** ২০টা
**বিষয়:** Memory management, Pointers, Storage classes, File handling, Bitwise ops, Recursion, Strings, Type casting, Bit-fields, Command line arguments

---

## Topic 01 — Stack vs. Queue

> **Question:** Explain the core concepts of Stack and Queue. Provide a technical comparison between them and discuss their significance in computer memory management.

### Answer

**1. Conceptual Overview**

- **Stack:** A Stack is a linear data structure that follows the **LIFO (Last-In-First-Out)** principle. In this structure, the element that is added last is the first one to be removed. All insertions and deletions take place at a single end, known as the **Top**.
- **Queue:** A Queue is a linear data structure that follows the **FIFO (First-In-First-Out)** principle. Here, the element that is added first is the one removed first. It involves two ends: the **Rear** (for insertion) and the **Front** (for deletion).

**2. Comparison Table**

| Feature | Stack | Queue |
|---------|-------|-------|
| Working Principle | LIFO (Last-In-First-Out) | FIFO (First-In-First-Out) |
| Basic Operations | `Push` (Insertion) and `Pop` (Deletion) | `Enqueue` (Insertion) and `Dequeue` (Deletion) |
| Access Points | Only one end called the `Top` | Two ends: `Front` and `Rear` |
| Data Flow | Vertical (conceptual) | Horizontal (conceptual) |
| Complexity | O(1) for both Push and Pop | O(1) for both Enqueue and Dequeue |

**3. Significance in Memory Management**

- **Stack Memory:** Stacks are used for **Static Memory Allocation**. When a function is called, a "stack frame" is created to store local variables and return addresses. Once the function completes, the memory is automatically cleared in a LIFO manner.
- **Queue Applications:** Queues are vital for **Asynchronous Data Transfer**. For example, the CPU uses queues for task scheduling (Ready Queue) and handling interrupts to ensure tasks are processed in the order they arrive.

**4. Real-World Applications**

- **Stack:** Used in expression evaluation (Infix to Postfix conversion), backtracking algorithms (like solving a maze), and the "Undo" feature in software.
- **Queue:** Used in shared resources like Disk Scheduling, Printer buffering, and Breadth-First Search (BFS) in graphs.

**Technical Explanation for Exam:** Mentioning **Stack Overflow** (when the stack exceeds its allocated memory) or **Underflow** (attempting to pop from an empty stack) adds significant value. For Queues, mentioning **Circular Queues** as a way to prevent memory wastage is a high-scoring point.

### সংক্ষিপ্ত সারাংশ

Stack হলো এমন একটা data structure যেখানে যেটা শেষে রাখা হয় সেটা আগে বের হয় — যেমন প্লেটের stack, উপর থেকে নাও, উপরে রাখো। Queue হলো ঠিক উল্টো — line-এ দাঁড়ানোর মতো, যে আগে আসছে সে আগে service পাবে। Stack-এ insert/delete একই দিক (Top) থেকে হয়, কিন্তু Queue-তে দুই দিক — Rear-এ ঢোকে, Front দিয়ে বের হয়। Function call হলে CPU একটা `stack frame` বানায় local variable রাখার জন্য, আর CPU scheduling-এ task গুলোকে queue-তে রাখে।

> **Exam tip:** Always mention `Stack Overflow`, `Underflow`, and `Circular Queue` — these single keywords push your marks up.

---

## Topic 02 — Process vs. Thread

> **Question:** Differentiate between a Process and a Thread. Why is a thread often referred to as a "Lightweight Process"?

### Answer

**1. Definition**

- **Process:** A process is an instance of a program in execution. It is an independent entity to which system resources (like memory and CPU time) are allocated.
- **Thread:** A thread is a subset of a process. It is the smallest unit of execution within a process that can be managed independently by a scheduler.

**2. Key Differences**

| Feature | Process | Thread |
|---------|---------|--------|
| Resource Sharing | Processes do not share memory with other processes | Threads share the memory and resources of the process they belong to |
| Creation Time | More time is required to create and terminate | Much faster to create and terminate |
| Context Switching | High overhead due to switching between memory spaces | Low overhead as they share the same address space |
| Communication | Requires `IPC` (Inter-Process Communication) | Can communicate directly as they share data |
| Isolation | If one process crashes, it doesn't affect others | If one thread crashes, it may crash the entire process |

**3. Why is a Thread called a "Lightweight Process"?**

A thread is called a Lightweight Process (LWP) because:

- It does not require its own separate address space or stack of resources from the OS.
- The overhead for context switching between threads is significantly lower than between processes.
- Threads share the same code, data, and OS resources (like open files) of the parent process, making them more efficient for multitasking within a single application.

**Exam Tips:**
- **Diagram:** Draw two boxes — "Process A" and "Process B". Inside Process A, draw multiple squiggly lines to represent threads sharing the same boundary.
- **Keywords:** Always use terms like "Address Space," "Context Switching," and "IPC."
- **Real-world:** Chrome uses processes for different tabs (isolation), Word Processor uses threads for simultaneous typing and spell-checking.

### সংক্ষিপ্ত সারাংশ

Process হলো একটা চলমান program — তার নিজের memory, নিজের resources সব আলাদা থাকে। Thread হলো process-এর ভিতরে একটা ছোট execution unit, যে process-এর memory share করে চলে। এজন্যই thread-কে "Lightweight Process" বলা হয় — কারণ আলাদা memory লাগে না, তৈরি করা দ্রুত, এবং context switching-এ overhead কম। Chrome-এর প্রতিটা tab আলাদা process (একটা crash করলে অন্যটা বাঁচে), কিন্তু MS Word-এ typing আর spell-check দুইটা thread হিসেবে চলে একই process-এর ভিতরে।

> **Exam tip:** Memorize the line — "A thread shares the address space of its parent process, hence lightweight."

---

## Topic 03 — Dynamic Memory Allocation in C

> **Question:** Explain the functions used for Dynamic Memory Allocation in C. Differentiate between `malloc()` and `calloc()`, and explain why `free()` is essential in this context.

### Answer

**1. Overview**

Dynamic Memory Allocation allows a program to request memory space from the **Heap** during runtime. This is crucial when the size of data is not known at compile time. Functions are defined in `<stdlib.h>`.

**2. Key Functions**

- `malloc()` (Memory Allocation): Allocates a single block of requested memory.
- `calloc()` (Contiguous Allocation): Allocates multiple blocks of memory and initializes them to zero.
- `realloc()` (Re-allocation): Changes the size of previously allocated memory.
- `free()`: Releases the allocated memory back to the system.

**3. Comparison: `malloc()` vs. `calloc()`**

| Feature | `malloc()` | `calloc()` |
|---------|------------|------------|
| Arguments | Takes 1 argument (total size in bytes) | Takes 2 arguments (number of blocks and size per block) |
| Initialization | Does not initialize memory (contains garbage values) | Initializes all bytes to zero |
| Speed | Relatively faster | Slower because it performs initialization |
| Syntax | `ptr = (cast-type*) malloc(byte-size);` | `ptr = (cast-type*) calloc(n, element-size);` |

**4. The Importance of `free()` and Memory Leaks**

If `malloc()` or `calloc()` is used but memory is not released using `free()` after use, it leads to a **Memory Leak**. In long-running banking server processes, memory leaks can consume all RAM causing system crashes.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr;
    int n = 5;
    ptr = (int*) malloc(n * sizeof(int));

    if (ptr == NULL) {
        printf("Memory not allocated.\n");
    } else {
        // ... use the memory ...
        free(ptr); // Always release memory
    }
    return 0;
}
```

**Common question:** "What does `malloc` return if it fails?" — Answer: `NULL` pointer. Always check for `NULL` after allocation to prevent **segmentation fault**.

### সংক্ষিপ্ত সারাংশ

Dynamic Memory Allocation মানে runtime-এ Heap থেকে memory চেয়ে নেওয়া — যখন আগে থেকে জানি না কতটুকু memory লাগবে। `malloc()` শুধু memory দেয় কিন্তু garbage value থাকে, আর `calloc()` memory দিয়ে সব 0 দিয়ে initialize করে দেয়। কাজ শেষে অবশ্যই `free()` করতে হবে নাহলে **memory leak** হবে — অনেকক্ষণ চলতে থাকা bank server-এ এটা একটা বড় সমস্যা। `malloc` fail করলে `NULL` return করে, তাই allocation-এর পরে সবসময় `NULL` check করতে হবে।

> **Exam tip:** Remember — `malloc(size)` vs `calloc(n, size)` and always pair every allocation with a matching `free()`.

---

## Topic 04 — Call by Value vs. Call by Reference

> **Question:** Distinguish between Call by Value and Call by Reference with respect to function calls in C. Provide a short code example to demonstrate how values are swapped using pointers.

### Answer

**1. Definitions**

- **Call by Value:** A copy of the actual variable's value is passed to the function. Changes inside the function do not affect the original variables.
- **Call by Reference:** The address (memory location) of the variables is passed using pointers. Changes inside the function directly affect the original variables.

**2. Comparison Table**

| Feature | Call by Value | Call by Reference |
|---------|---------------|-------------------|
| Arguments Passed | A copy of the actual data | The memory address of the data |
| Memory Efficiency | Less efficient for large data (creates copies) | More efficient (no copies created) |
| Original Value | Remains unchanged | Can be modified within the function |
| Pointer Requirement | No pointers are required | Pointers are mandatory |

**3. Swapping Example (Call by Reference)**

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("After swap: x = %d, y = %d", x, y);
    return 0;
}
```

**When to use Call by Value:** When you want original data to remain secure.

**When to use Call by Reference:** When you need to return multiple values from a function, or when passing large structures/arrays to save memory.

### সংক্ষিপ্ত সারাংশ

Call by Value-তে variable-এর একটা **copy** function-এ যায় — তাই ভিতরে যাই করো, বাইরের variable অপরিবর্তিত থাকে। Call by Reference-এ variable-এর **address** (pointer) পাঠানো হয়, তাই function ভিতরে value change করলে আসল variable-ও change হয়ে যায়। এজন্যই দুইটা variable swap করতে হলে pointer (`int *a`) লাগে — শুধু value পাঠালে swap কাজ করবে না। বড় structure/array পাঠানোর সময় reference দিয়ে পাঠানো ভালো — copy বানাতে হয় না, memory বাঁচে।

> **Exam tip:** The classic exam question is "Write a `swap()` function that actually works" — only Call by Reference works, not Call by Value.

---

## Topic 05 — Storage Classes in C

> **Question:** What are the different Storage Classes in C? Discuss the scope, default value, and lifetime of each class.

### Answer

**1. Definition**

Storage classes in C define the **scope** (visibility), **lifetime**, and **initial value** of a variable. They also determine where in the memory the variable will be stored.

**2. The Four Storage Classes**

| Storage Class | Storage Location | Default Value | Scope | Lifetime |
|---------------|------------------|---------------|-------|----------|
| `auto` | RAM (Stack) | Garbage Value | Local to the block | Till the end of the block |
| `register` | CPU Register | Garbage Value | Local to the block | Till the end of the block |
| `static` | RAM (Data Segment) | Zero (0) | Local to the block | Till the end of the program |
| `extern` | RAM (Data Segment) | Zero (0) | Global (Multiple files) | Till the end of the program |

**3. Key Distinctions**

- `auto`: Default storage class for all local variables.
- `register`: For variables requiring fast access (like loop counters). Cannot get memory address (`&`) of a register variable.
- `static`: Retains its value between function calls. Initialized only once.
- `extern`: Declares a global variable defined in another file.

**4. Example of `static`**

```c
#include <stdio.h>

void func() {
    static int count = 0;
    count++;
    printf("%d ", count);
}

int main() {
    func(); // Output: 1
    func(); // Output: 2
    return 0;
}
```

**Exam question:** "Why can't we use the `&` operator with a `register` variable?" — Because register variable is stored in CPU register, not in standard RAM.

### সংক্ষিপ্ত সারাংশ

Storage class বলে দেয় variable কোথায় থাকবে, কতদিন বাঁচবে, এবং কে কে access করতে পারবে। `auto` হলো default — function-এ ঢুকলে stack-এ তৈরি, function শেষ হলে শেষ। `register` CPU-র register-এ থাকে তাই দ্রুত, কিন্তু address নেওয়া যায় না। `static` সবচেয়ে গুরুত্বপূর্ণ — function থেকে বের হলেও value হারায় না, পরের call-এ আগের value পাওয়া যায়। `extern` দিয়ে অন্য file-এর global variable use করা যায়।

> **Exam tip:** Static variables live in the `Data Segment`, not the Stack — that's why their value persists between function calls.

---

## Topic 06 — Structures vs. Unions

> **Question:** Define Structure and Union in C. Compare them based on memory allocation and usage. Why would a programmer prefer a Union over a Structure in a resource-constrained environment?

### Answer

**1. Definitions**

- **Structure (`struct`):** A user-defined data type that allows grouping variables of different data types under a single name. Every member has its own unique memory location.
- **Union (`union`):** A user-defined data type where all members share the same memory location. Only one member can contain a value at any given time.

**2. Key Differences**

| Feature | Structure (`struct`) | Union (`union`) |
|---------|---------------------|-----------------|
| Keyword | `struct` | `union` |
| Memory | Each member is assigned a separate storage location | All members share the same memory location |
| Total Size | Sum of the size of all members (plus padding) | Size of the largest member |
| Value Access | Multiple members can be accessed simultaneously | Only one member can be accessed at a time |
| Memory Efficiency | Uses more memory | Extremely memory-efficient |

**3. Code Example**

```c
struct MyStruct {
    int x;    // 4 bytes
    char y;   // 1 byte
}; // Total size = 5 bytes (ignoring padding)

union MyUnion {
    int x;    // 4 bytes
    char y;   // 1 byte
}; // Total size = 4 bytes (size of the largest member)
```

**4. Why use a Union?**

In resource-constrained environments (embedded systems, low-level bank network maintenance), if you need to store different types at different times but never simultaneously, Union saves significant RAM.

**Pro-Tip:** Mention that the compiler adds **padding** bytes to structures to align data with the processor's word size. Unions generally don't have this issue.

### সংক্ষিপ্ত সারাংশ

Structure-এ প্রতিটা member-এর জন্য আলাদা memory থাকে, তাই সবার size যোগ করলে total size পাওয়া যায়। Union-এ সব member একই memory share করে, তাই size = সবচেয়ে বড় member-এর size। অর্থাৎ Union memory অনেক বাঁচায়, কিন্তু এক সাথে একটাই member-এ value রাখা যায়। Embedded system বা কম RAM-এর জায়গায় Union ব্যবহার লাভজনক, যেখানে একই variable-এ কখনো int কখনো char রাখতে হয় কিন্তু একসাথে না।

> **Exam tip:** `sizeof(struct)` = sum of members + padding; `sizeof(union)` = size of largest member.

---

## Topic 07 — `#define` vs. `const` in C

> **Question:** Compare and contrast the `#define` pre-processor directive and the `const` keyword in C. Which one is generally preferred in modern C programming, and why?

### Answer

**1. Definitions**

- `#define`: A pre-processor directive used to define macros. The pre-processor replaces every occurrence with the defined value before actual compilation starts.
- `const`: A type qualifier used to declare a variable whose value cannot be changed after initialization. Handled by the compiler, not the pre-processor.

**2. Comparison Table**

| Feature | `#define` | `const` |
|---------|-----------|---------|
| Stage of Execution | Pre-processing stage (Text replacement) | Compilation stage (Variable handling) |
| Type Checking | No type checking (can lead to errors) | Strong type checking (safer) |
| Scope | Global (until `#undef` or end of file) | Follows standard scoping rules |
| Memory Allocation | No memory allocated (stored in code segment) | Memory allocated in data/stack segment |
| Debugging | Difficult to debug (not in symbol table) | Easier to debug (visible in debugger) |

**3. Code Example**

```c
#define PI 3.1416        // Macro: Pre-processor replaces PI with 3.1416
const float pi = 3.1416; // Variable: Compiler treats 'pi' as a read-only float
```

**4. Why `const` is preferred**

- **Safety:** Compiler checks data types.
- **Debugging:** Symbol visible in symbol table.
- **Scoping:** Can be limited to a specific function.

However, `#define` is still used for **Header Guards** and **Conditional Compilation** (`#ifdef DEBUG`).

### সংক্ষিপ্ত সারাংশ

`#define` হলো pre-processor directive — compile-এর আগেই সব জায়গায় text replace হয়ে যায়, কোনো type check হয় না, memory লাগে না। `const` হলো compiler-এর handle করা একটা read-only variable — type safe, debugger-এ দেখা যায়, scope নিয়ম মেনে চলে। আজকাল `const` বেশি ব্যবহার হয় কারণ এটা safer এবং debug করা সহজ। তবে header guard বা conditional compilation-এ `#define` এখনো অপরিহার্য।

> **Exam tip:** "Type safety" is the magic phrase — `const` has it, `#define` does not.

---

## Topic 08 — File Handling in C

> **Question:** What are the different modes of opening a file in C using the `fopen()` function? Explain the significance of the File Pointer and the `fclose()` function in maintaining data integrity.

### Answer

**1. The File Pointer (`FILE *`)**

All file operations are performed through a special pointer of type `FILE` (defined in `<stdio.h>`) that contains information about the file (current position, buffer details, status flags).

**2. File Opening Modes in `fopen()`**

| Mode | Description | Action if File Exists | Action if File Missing |
|------|-------------|----------------------|------------------------|
| `"r"` | Read | Opens for reading | Returns `NULL` |
| `"w"` | Write | Overwrites existing content | Creates a new file |
| `"a"` | Append | Adds data to the end of the file | Creates a new file |
| `"r+"` | Read/Write | Opens for both reading and writing | Returns `NULL` |
| `"w+"` | Write/Read | Opens for both reading and writing | Overwrites existing content |

**3. The Significance of `fclose()`**

- **Buffer Flushing:** When you write data, it is stored in a temporary buffer. `fclose()` ensures all buffered data is physically written to disk.
- **Resource Management:** OS has a limit on open files. Failing to close files leads to "Too many open files" errors and memory leaks.

**4. Example**

```c
#include <stdio.h>

int main() {
    FILE *fp;
    fp = fopen("bank_log.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!");
    } else {
        fprintf(fp, "Transaction Successful\n");
        fclose(fp); // Vital for saving data
    }
    return 0;
}
```

`fopen()` returns `NULL` if it fails. Checking for `NULL` is a sign of a professional programmer.

### সংক্ষিপ্ত সারাংশ

C-তে file handle করা হয় একটা special `FILE *` pointer দিয়ে যেটা `fopen()` থেকে পাওয়া যায়। Mode গুলা মুখস্থ রাখো — `"r"` শুধু read, `"w"` write (পুরাতন data মুছে দেয়), `"a"` append (শেষে add করে)। `fclose()` খুবই জরুরি কারণ data প্রথমে buffer-এ থাকে — close না করলে disk-এ লেখা হবে না, data হারিয়ে যেতে পারে। এছাড়া OS-এর open file limit থাকে, close না করলে "Too many open files" error আসে।

> **Exam tip:** Always check `if (fp == NULL)` before reading/writing — this is a classic "professional C code" marker.

---

## Topic 09 — Bitwise Operators in C

> **Question:** List the common Bitwise Operators in C and explain their functionality. Why are bitwise operations preferred in system-level programming?

### Answer

**1. Definition**

Bitwise operators perform operations at the bit level (0s and 1s). They are significantly faster than arithmetic operators because they are processed directly by the CPU.

**2. Common Bitwise Operators**

| Operator | Name | Description | Example (5=101, 3=011) |
|----------|------|-------------|------------------------|
| `&` | Bitwise AND | Result is 1 if both bits are 1 | `5 & 3` = 1 (001) |
| `|` | Bitwise OR | Result is 1 if at least one bit is 1 | `5 | 3` = 7 (111) |
| `^` | Bitwise XOR | Result is 1 if bits are different | `5 ^ 3` = 6 (110) |
| `~` | One's Complement | Flips all bits | `~5` = depends on bit-length |
| `<<` | Left Shift | Shifts bits left (Multiplies by 2) | `5 << 1` = 10 |
| `>>` | Right Shift | Shifts bits right (Divides by 2) | `5 >> 1` = 2 |

**3. Why Bitwise Operations are Preferred**

- **Efficiency:** `x << 1` is faster than `x * 2`.
- **Memory Optimization:** Multiple boolean flags packed into a single byte.
- **Hardware Interaction:** Reading/setting specific bits in hardware registers (masking).
- **Security:** Foundation of many encryption and hashing algorithms.

**4. Example of Masking (check if n-th bit is set)**

```c
if (number & (1 << n)) {
    printf("Bit is Set");
}
```

**XOR can be used for swapping two variables without a third temporary variable.**

```c
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

### সংক্ষিপ্ত সারাংশ

Bitwise operator গুলা bit level-এ (0 আর 1) কাজ করে, তাই সাধারণ arithmetic-এর চেয়ে অনেক দ্রুত। `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), আর `<<` `>>` (shift) — এই ছয়টা মূল operator। Left shift দিয়ে দ্রুত গুণ (`x << 1` মানে `x * 2`), right shift দিয়ে দ্রুত ভাগ। Embedded system, hardware register, encryption — সব জায়গায় bitwise লাগে কারণ memory আর CPU দুইটাই বাঁচে।

> **Exam tip:** Memorize `(1 << n)` for setting/checking the n-th bit — this is a classic interview pattern.

---

## Topic 10 — Recursion vs. Iteration

> **Question:** Compare Recursion and Iteration in C programming. Discuss their performance implications in terms of CPU time and memory (stack) usage.

### Answer

**1. Definitions**

- **Recursion:** A function calls itself directly or indirectly to solve a smaller version of the same problem. Requires a **base case** to terminate.
- **Iteration:** Uses loops (`for`, `while`, or `do-while`) to repeat a block of code until a condition is met.

**2. Comparison Table**

| Feature | Recursion | Iteration |
|---------|-----------|-----------|
| Basic Approach | Uses a function call within the same function | Uses loops to repeat code |
| Termination | Reaches a base case | Condition in the loop becomes false |
| Memory | High (uses the Stack for every call) | Low (uses a fixed amount of memory) |
| Speed | Slower (due to overhead of function calls) | Faster (no function call overhead) |
| Code Length | Usually shorter and more elegant | Can be longer and more complex |
| Stack Overflow | Risk if recursion is deep | No risk of stack overflow |

**3. Performance Implications**

- **Time Complexity:** Both can have same `O(n)` but recursion is practically slower due to stack push/pop overhead.
- **Space Complexity:** Iteration is more space-efficient. Recursion uses `O(n)` stack space.

**4. Example: Factorial of a Number**

**Recursive:**

```c
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

**Iterative:**

```c
int factorial(int n) {
    int res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}
```

**Pro-Tip:** **Tail Recursion** is a specific type where the recursive call is the very last action. Modern compilers can optimize it to be as efficient as iteration.

### সংক্ষিপ্ত সারাংশ

Recursion-এ function নিজেই নিজেকে call করে — code ছোট সুন্দর হয়, কিন্তু প্রতিটা call-এর জন্য stack-এ frame তৈরি হয়, তাই memory বেশি লাগে এবং একটু slow। Iteration-এ loop ব্যবহার হয় — fixed memory, fast, কিন্তু code কিছুটা বড় হতে পারে। Recursion-এ অবশ্যই **base case** থাকতে হবে, না হলে infinite call হয়ে **Stack Overflow** হবে। Factorial, Fibonacci, Tree traversal — recursion দিয়ে সহজ; কিন্তু performance-critical জায়গায় iteration ভালো।

> **Exam tip:** Always mention "every recursive call adds a frame to the call stack" — this explains both the elegance and the danger.

---

## Topic 11 — Array and Pointer Relationship

> **Question:** Explain the relationship between Arrays and Pointers in C. How does the compiler treat an array name differently from a pointer variable?

### Answer

**1. The Core Relationship**

The name of an array acts as a **constant pointer to the first element**. `arr[i]` is internally converted to `*(arr + i)` by the compiler. Both can be used with subscript `[]` or indirection `*` notation.

**2. Key Differences**

| Feature | Array (`int arr[5]`) | Pointer (`int *ptr`) |
|---------|---------------------|----------------------|
| Nature | A collection of homogeneous elements | A variable that stores a memory address |
| Memory Allocation | Space for all elements is allocated immediately | Space only for the address is allocated |
| Re-assignment | Cannot be reassigned (`arr = &x` is an error) | Can be reassigned to point to different locations |
| `sizeof` operator | Returns total size of the array (elements × size) | Returns the size of the pointer (usually 4 or 8 bytes) |

**3. Arrays as Function Arguments**

When passed to a function, an array **decays** into a pointer (the function receives address of the first element, not a copy of the entire array).

```c
void printArray(int *p, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", *(p + i));
    }
}
```

**Pointer Arithmetic Rule:** When you increment a pointer (`ptr++`), it moves by `sizeof(data_type)`, not by 1 byte. If `int` is 4 bytes and `ptr` is at address 1000, `ptr+1` points to 1004.

### সংক্ষিপ্ত সারাংশ

C-তে array-এর নাম আসলে first element-এর address — তাই `arr[i]` আর `*(arr + i)` একই জিনিস। কিন্তু পার্থক্য আছে — array-এর জন্য সব element-এর memory আগেই allocate হয়, আর pointer শুধু একটা address রাখার জন্য জায়গা নেয়। Array-কে আবার অন্য address দেওয়া যায় না, কিন্তু pointer-কে যেকোনো সময় new address-এ পাঠানো যায়। `sizeof` দিয়ে array-এর total size পাওয়া যায়, কিন্তু pointer-এর ক্ষেত্রে শুধু pointer-এর নিজের size (4 বা 8 byte) পাওয়া যায়।

> **Exam tip:** Pointer arithmetic moves in steps of `sizeof(type)` — `int *ptr; ptr++` jumps 4 bytes, not 1.

---

## Topic 12 — Constant Pointers vs. Pointers to Constants

> **Question:** Explain the difference between a Pointer to a Constant and a Constant Pointer. Provide the syntax for each and describe a scenario where they would be used to ensure data security.

### Answer

**1. Pointer to a Constant**

The pointer can change address it points to, but the value at that address cannot be modified through the pointer.

- **Syntax:** `const int *ptr;` or `int const *ptr;`
- **Behavior:** `ptr++` is **Allowed**; `*ptr = 10` is **NOT Allowed**.

**2. Constant Pointer**

The address stored is fixed. Cannot point to another address, but the value at current address can be modified.

- **Syntax:** `int *const ptr = &var;`
- **Behavior:** `ptr++` is **NOT Allowed**; `*ptr = 10` is **Allowed**.

**3. Constant Pointer to a Constant**

Neither the address nor the value can be changed.

- **Syntax:** `const int *const ptr = &var;`

**4. Comparison Table**

| Type | Syntax | Change Address? | Change Value? |
|------|--------|-----------------|---------------|
| Pointer to Constant | `const int *ptr` | Yes | No |
| Constant Pointer | `int *const ptr` | No | Yes |
| Const Pointer to Const | `const int *const ptr` | No | No |

**5. Real-World Application**

- **Pointer to Constant:** Passing sensitive balance to a "Display" function — function can read but cannot modify.
- **Constant Pointer:** In hardware-level programming, pointing to a specific memory-mapped I/O register.

**Trap question:** `int x = 5; const int *ptr = &x; x = 10;` — This **IS valid** because `const int *ptr` only prevents modification *through the pointer*, not direct modification of `x`.

### সংক্ষিপ্ত সারাংশ

`const int *ptr` মানে "value change করা যাবে না, কিন্তু pointer-কে অন্য address-এ পাঠানো যাবে"। `int *const ptr` মানে উল্টো — "address fix, কিন্তু value change করা যাবে"। `const int *const ptr` দুইটাই lock করে দেয়। সহজে মনে রাখার নিয়ম — `const`-টা যার আগে বসে সেই lock হয়; `*`-এর আগে `const` থাকলে value lock, `*`-এর পরে থাকলে pointer lock। Banking application-এ user-এর balance read-only function-এ পাঠাতে `const int *` ব্যবহার হয়।

> **Exam tip:** Read declarations right-to-left — `int *const ptr` reads "ptr is a const pointer to int."

---

## Topic 13 — The `volatile` Keyword in C

> **Question:** What is the purpose of the `volatile` qualifier in C? Provide an example of where it is used in system-level programming and explain why the compiler's "Optimization" process makes it necessary.

### Answer

**1. Definition**

The `volatile` keyword informs the C compiler that a variable's value can be changed at any time by something outside the program's control. This prevents "aggressive optimizations" on that variable.

**2. The Problem: Compiler Optimization**

If a variable is read multiple times without being modified, the compiler might store the value in a CPU Register rather than reading from RAM every time.

- **Without `volatile`:** Program might use a stale (old) value from the register.
- **With `volatile`:** Compiler is forced to reload the variable from original memory address every time.

**3. Common Use Cases**

- **Memory-Mapped I/O (MMIO):** A variable representing a hardware register — hardware might change that bit independently of the software.
- **Interrupt Service Routines (ISR):** A variable modified inside an ISR and read in `main()` must be `volatile`.
- **Multi-threaded Applications:** A global variable modified by one thread and observed by another.

**4. Code Example**

```c
volatile int status_reg;

void wait_for_hardware() {
    while (status_reg == 0) {
        // Wait until hardware sets the status to 1
    }
}
```

**Distinction:**
- `const` says "the program cannot change this."
- `volatile` says "the value can change unexpectedly (outside the program)."

**Bonus:** A variable can be both — `const volatile int port = 0x40;` means the program cannot change it, but hardware can.

### সংক্ষিপ্ত সারাংশ

`volatile` হলো compiler-কে warning — "এই variable-এর value প্রোগ্রামের বাইরে থেকে পরিবর্তন হতে পারে, তাই optimize করো না, প্রতিবার RAM থেকেই পড়ো।" Compiler যদি জানে variable change হচ্ছে না তাহলে CPU register-এ cache করে রাখে, কিন্তু hardware বা অন্য thread যদি RAM-এ value বদলে দেয় তাহলে cache-এর পুরাতন value নিয়ে কাজ করবে — bug হবে। Hardware register, interrupt handler, multi-thread shared variable — এই সব জায়গায় `volatile` লাগবেই। `const` মানে "আমি change করব না", `volatile` মানে "অন্য কেউ change করতে পারে"।

> **Exam tip:** Memorize "`volatile` disables compiler optimization for that variable" — examiner loves this exact phrase.

---

## Topic 14 — Double Pointers (Pointer to Pointer)

> **Question:** Define a Double Pointer in C. Explain its memory representation and provide a practical use case, such as dynamic memory allocation for a 2D array.

### Answer

**1. Definition**

A **Double Pointer** stores the memory address of another pointer.

**2. Syntax and Memory Representation**

```c
int x = 10;
int *ptr = &x;     // Pointer to integer
int **pptr = &ptr; // Pointer to pointer (Double Pointer)
```

- `x` contains 10.
- `ptr` contains address of `x`.
- `pptr` contains address of `ptr`.
- To access value of `x` through `pptr`: use `**pptr` (double dereferencing).

**3. Dynamic 2D Array**

```c
int rows = 3, cols = 4;
int **matrix;

matrix = (int **)malloc(rows * sizeof(int *));
for (int i = 0; i < rows; i++) {
    matrix[i] = (int *)malloc(cols * sizeof(int));
}
```

**4. Why use Double Pointers in Functions?**

If you want to change the address a pointer is pointing to **inside a function** (e.g., in a Linked List to update the Head), you must pass the address of the pointer. If you pass only the pointer, the address change will not reflect outside the function.

**Safety Tip:** When freeing a dynamically allocated 2D array, free individual rows first in a loop, then free the double pointer itself.

```c
for (int i = 0; i < rows; i++) free(matrix[i]);
free(matrix);
```

### সংক্ষিপ্ত সারাংশ

Double pointer (`int **pptr`) মানে — pointer-এর address রাখার জন্য আরেকটা pointer। `*pptr` দিলে প্রথম pointer-এর value (যেটা একটা address), `**pptr` দিলে আসল variable-এর value পাওয়া যায়। Dynamic 2D array বানাতে double pointer লাগে — প্রথমে row count অনুযায়ী pointer array বানাও, তারপর প্রতিটা row-এর জন্য আলাদাভাবে memory allocate করো। Linked list-এ head node update করার সময়ও double pointer লাগে, কারণ function-এর ভিতরে pointer-এর address change করতে হবে।

> **Exam tip:** Linked list-এ "modify head pointer" এর জন্য `void insert(Node **head)` লেখা সবচেয়ে high-scoring pattern।

---

## Topic 15 — The `extern` Keyword and Multi-file Programming

> **Question:** What is the purpose of the `extern` keyword in C? Explain how it facilitates the sharing of variables across multiple source files and distinguish between Declaration and Definition.

### Answer

**1. Definition**

The `extern` keyword extends the visibility of a variable or function. It tells the compiler: "This variable exists somewhere else — don't allocate new memory here; look for its definition during linking."

**2. Declaration vs. Definition**

- **Definition:** Memory is allocated for the variable, may be initialized. (e.g., `int account_count = 100;`)
- **Declaration:** No memory allocated. Informs compiler about type and name. (e.g., `extern int account_count;`)

**3. Multi-file Scenario**

**File 1 (`database.c`):**

```c
int total_transactions = 500; // Definition (Memory allocated here)
```

**File 2 (`main.c`):**

```c
#include <stdio.h>
extern int total_transactions; // Declaration (Tells compiler to look elsewhere)

int main() {
    printf("Transactions today: %d", total_transactions);
    return 0;
}
```

**4. Why use `extern`?**

- **Modularity:** Organize code into different modules while sharing global state.
- **Memory Efficiency:** Global variable defined only once — prevents "multiple definition" errors.

**Exam question:** "What happens if you initialize an `extern` variable inside a function?" — **Compilation error.** `extern` variable can only be initialized where it is **defined** (global scope of its home file).

### সংক্ষিপ্ত সারাংশ

`extern` keyword compiler-কে বলে — "এই variable অন্য file-এ define করা আছে, এখানে নতুন memory দিও না, linking-এর সময় খুঁজে নিও"। **Definition** মানে memory allocate হয় (একবারই করতে হয়), আর **Declaration** শুধু compiler-কে জানায় variable আছে। Multi-file project-এ একটা file-এ variable define করো (`int x = 5;`), অন্য file-এ `extern int x;` দিয়ে use করো। তাহলে একই variable পুরা program জুড়ে share হবে।

> **Exam tip:** "Definition allocates memory; declaration just announces" — single sentence, full marks.

---

## Topic 16 — The `static` Keyword (Local vs. Global)

> **Question:** Explain the dual role of the `static` keyword in C. How does it affect the lifetime and visibility (scope) of a variable when used locally versus globally?

### Answer

**1. Static Local Variables (Inside a Function)**

Lifetime extended to entire duration of the program, but visibility remains restricted to that function.

- Initialized only **once**, the first time the function is called.
- Retains value between multiple function calls.

**2. Static Global Variables (Outside all Functions)**

Limits visibility of that variable to that specific file only.

- Cannot be accessed by other files, even with `extern`.
- Used to create "private" global variables, preventing name conflicts.

**3. Comparison Summary**

| Usage | Lifetime | Scope (Visibility) | Purpose |
|-------|----------|-------------------|---------|
| Normal Local | Function execution | Inside the function | Temporary storage |
| Static Local | Entire program | Inside the function | Retaining state between calls |
| Normal Global | Entire program | All files (via `extern`) | Shared global data |
| Static Global | Entire program | Only the current file | Data hiding/Encapsulation |

**4. Code Example**

```c
#include <stdio.h>

void counterFunction() {
    static int count = 0;
    count++;
    printf("%d ", count);
}

int main() {
    counterFunction(); // Outputs: 1
    counterFunction(); // Outputs: 2
    counterFunction(); // Outputs: 3
    return 0;
}
```

**Exam question:** "Where are static variables stored in memory?" — In the **Data Segment**, not on the Stack. This is why they persist even after a function returns.

### সংক্ষিপ্ত সারাংশ

`static` keyword-এর দুইটা ভিন্ন কাজ আছে। Function-এর ভিতরে `static` দিলে variable পুরো program জুড়ে বেঁচে থাকে, কিন্তু শুধু সেই function থেকে access করা যায় — call-to-call value ধরে রাখে। Function-এর বাইরে (global) `static` দিলে variable শুধু সেই file-এর জন্য private হয়ে যায়, অন্য file `extern` দিয়েও access করতে পারবে না। Static variable Stack-এ না, Data Segment-এ থাকে — এজন্যই function থেকে বের হয়ে গেলেও value হারায় না।

> **Exam tip:** Static = "local lifetime extension" or "global visibility restriction" depending on placement.

---

## Topic 17 — Typecasting in C (Implicit vs. Explicit)

> **Question:** What is Typecasting in C? Distinguish between Implicit Type Conversion and Explicit Type Casting with relevant examples.

### Answer

**1. Definition**

Typecasting is the process of converting a variable from one data type to another.

**2. Implicit Type Conversion (Automatic)**

Done automatically by the compiler when a "smaller" data type is promoted to a "larger" one to prevent data loss. Also known as **Type Promotion**.

**Rule:** `char` → `int` → `float` → `double`.

```c
int x = 10;
float y = 5.5;
float sum = x + y; // x is implicitly promoted to float (10.0)
```

**3. Explicit Type Casting (Manual)**

Performed by the programmer using the cast operator `(type)`. Required when converting "larger" to "smaller" type.

**Risk:** May lead to **data loss**.

```c
float pi = 3.14;
int x = (int)pi; // x becomes 3; decimal part (.14) is lost
```

**4. Comparison Table**

| Feature | Implicit Conversion | Explicit Casting |
|---------|--------------------|-----------------|
| Performed By | The Compiler | The Programmer |
| Alternative Name | Type Promotion / Coercion | Type Casting |
| Direction | Lower to Higher type | Higher to Lower type (usually) |
| Data Loss | No risk of data loss | High risk of data loss/truncation |
| Syntax | Automatic (No operator needed) | Uses cast operator `(type)` |

**5. Why important in Banking**

In financial applications, dividing two integers like `5/2` results in `2` (integer division). To get `2.5`, you must use explicit casting: `(float)5 / 2`.

```c
float result = (float)5 / 2; // 2.5
int wrong  = 5 / 2;          // 2 (integer division — loses decimals)
```

**Exam question** about `sizeof('A' + 1.0)` — result is size of `double`, because `1.0` is double, so `char` and `int` are promoted to double.

### সংক্ষিপ্ত সারাংশ

Typecasting মানে এক data type-কে অন্য type-এ convert করা। Implicit conversion compiler নিজেই করে — ছোট type থেকে বড় type-এ (যেমন `int + float` হলে int-কে float বানিয়ে নেয়) — data loss হয় না। Explicit casting programmer নিজে `(type)value` দিয়ে করে — সাধারণত বড় থেকে ছোট, এবং decimal বা precision loss হতে পারে। Banking calculation-এ `5/2` = 2 হয়ে যাবে integer division-এ, তাই `(float)5/2` = 2.5 পাওয়ার জন্য explicit cast করতে হয়।

> **Exam tip:** Integer division trap — always cast at least one operand to `float` for accurate financial division.

---

## Topic 18 — `strlen()` vs. `sizeof()` for Strings

> **Question:** Distinguish between the `strlen()` function and the `sizeof()` operator when applied to a string in C. Explain why their outputs differ and the role of the Null Terminator in this context.

### Answer

**1. Definitions**

- `sizeof()`: A **compile-time unary operator** that returns the total size (in bytes) of the memory allocated. For a `char` array, it counts every byte reserved, including the null character.
- `strlen()`: A **library function** (from `<string.h>`) that counts characters from the first address until the **Null Terminator** (`\0`). Does NOT count the null terminator.

**2. Key Differences**

| Feature | `sizeof()` | `strlen()` |
|---------|-----------|-----------|
| Type | Operator | Function |
| Evaluation Time | Compile-time | Run-time |
| What it measures | Total memory allocated | Actual number of characters |
| Null Terminator | Includes `\0` in the count | Excludes `\0` from the count |

**3. Code Example**

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[20] = "Bangladesh";
    printf("strlen(str): %zu\n", strlen(str)); // Output: 10
    printf("sizeof(str): %zu\n", sizeof(str)); // Output: 20
    return 0;
}
```

**4. The Role of the Null Terminator (`\0`)**

In C, strings are character arrays ending in `\0`. Without `\0`, functions like `printf` or `strlen` would continue reading adjacent memory until they crash (segmentation fault).

**Trap question:** `char *ptr = "Hello"; printf("%zu", sizeof(ptr));` — Result will be **4 or 8** (pointer size), not 6. Use `strlen(ptr)` to get string length.

### সংক্ষিপ্ত সারাংশ

`sizeof()` হলো compile-time operator যেটা allocate করা মোট memory দেখায় (null terminator সহ)। `strlen()` হলো runtime function যেটা শুধু আসল character গুলা গুনে (`\0` বাদে)। `char str[20] = "Bangladesh";` লিখলে `strlen` দেবে 10, `sizeof` দেবে 20। Pointer-এর ক্ষেত্রে `sizeof(ptr)` দেবে 4 বা 8 (pointer-এর size), string-এর length না — তাই string length-এর জন্য সবসময় `strlen` ব্যবহার করতে হবে।

> **Exam tip:** `sizeof` counts bytes including `\0`; `strlen` counts characters excluding `\0`.

---

## Topic 19 — Bit-fields in C

> **Question:** What are Bit-fields in C? How are they used within a Structure to optimize memory, and what are their limitations in system-level programming?

### Answer

**1. Definition**

A **Bit-field** is a set of adjacent bits within a single storage unit (usually an `int`). It allows a programmer to specify exactly how many bits a struct member should occupy.

**2. Purpose and Optimization**

The smallest data type in C is `char` (1 byte/8 bits). Many status flags only need 1 bit. Without bit-fields, using an `int` for a flag wastes 31 bits. With bit-fields, multiple flags can be packed into a single byte.

**3. Syntax Example**

```c
struct SystemStatus {
    unsigned int is_active  : 1;  // Occupies 1 bit
    unsigned int error_code : 3;  // Occupies 3 bits (values 0-7)
    unsigned int power_mode : 2;  // Occupies 2 bits (values 0-3)
};
```

This entire structure can fit into a single byte.

**4. Limitations**

- **Addressability:** Cannot use `&` (address-of) operator on a bit-field member — bits don't have individual memory addresses.
- **Portability:** Ordering of bits is compiler-dependent (**Endianness**), causing issues when transferring data between different systems.
- **Arrays:** Cannot create an array of bit-fields.

**Why used in Network Headers:** Network protocols need to be as small as possible to save bandwidth. Bit-fields allow mapping C structures directly onto protocol specifications.

### সংক্ষিপ্ত সারাংশ

Bit-field হলো structure-এর ভিতরে exact bit count দিয়ে member declare করার সুবিধা — `unsigned int flag : 1;` মানে শুধু 1 bit লাগবে। সাধারণত একটা flag-এর জন্য পুরা `int` (32 bit) লাগে — bit-field দিয়ে সেটা 1 bit-এ namiye memory অনেক বাঁচানো যায়। Embedded system বা network protocol header-এ এটা খুব দরকারি কারণ bandwidth/RAM সীমিত। তবে limitations আছে — bit-field-এর address (`&`) নেওয়া যায় না, array বানানো যায় না, এবং compiler-ভেদে bit ordering বদলায় (portability issue)।

> **Exam tip:** "Cannot take address of a bit-field member" — this is the most common viva question.

---

## Topic 20 — Command Line Arguments

> **Question:** What are Command Line Arguments in C? Explain the significance of the parameters `argc` and `argv` in the `main()` function and provide a simple code example to demonstrate their usage.

### Answer

**1. Definition**

Command line arguments are parameters supplied to a program when invoked from the command line. Allows users to pass information to the program at runtime without hardcoding values.

**2. The `main()` Signature**

```c
int main(int argc, char *argv[])
```

**3. Understanding the Parameters**

- `argc` (**Argument Count**): An integer storing the number of arguments, including the program name. Always at least 1.
- `argv` (**Argument Vector**): An array of character pointers (strings).
  - `argv[0]` is the name of the program.
  - `argv[1]` is the first argument.
  - `argv[n]` is the n-th argument.
  - `argv[argc]` is always a `NULL` pointer.

**4. Example**

If you run `./bank_tool update 101`:

- `argc` = 3
- `argv[0]` = `"./bank_tool"`
- `argv[1]` = `"update"`
- `argv[2]` = `"101"`

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Program Name: %s\n", argv[0]);
    if (argc < 2) {
        printf("No arguments provided.\n");
    } else {
        printf("First Argument: %s\n", argv[1]);
    }
    return 0;
}
```

**Exam question:** "What is the data type of command line arguments?" — They are always **strings**. If you pass a number (like `101`), you must convert using `atoi()` (from `<stdlib.h>`) before mathematical operations.

```c
int id = atoi(argv[2]); // converts "101" to integer 101
```

### সংক্ষিপ্ত সারাংশ

Command line argument হলো program চালানোর সময় terminal থেকে যে value গুলা পাঠানো হয় — যেমন `./prog file.txt 5`। `main` function এই value গুলা পায় দুইটা parameter দিয়ে — `argc` (কতটা argument আসছে, program name সহ) আর `argv` (string array — argument গুলা)। `argv[0]` সবসময় program-এর নাম, `argv[1]` থেকে আসল argument শুরু। সব argument **string** হিসেবে আসে, তাই number লাগলে `atoi()` দিয়ে convert করতে হবে।

> **Exam tip:** Remember `argv[0]` = program name, and use `atoi(argv[i])` for numeric arguments.

---

---

## Topic 21 — Linear Search vs. Binary Search

> **Question:** Explain Linear Search and Binary Search algorithms. Compare their time complexity and describe when each should be used with code examples in C.

### Answer

**1. Linear Search**

Linear Search sequentially checks each element of the array until the target is found or the list ends.

```c
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;  // found at index i
    }
    return -1;  // not found
}
```

- **Works on:** Unsorted and sorted arrays
- **Time Complexity:** O(n) — worst case scans all elements
- **Space Complexity:** O(1)

**2. Binary Search**

Binary Search repeatedly divides the search space in half. The array **must be sorted**.

```c
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

- **Works on:** Sorted arrays only
- **Time Complexity:** O(log n) — halves the search space each step
- **Space Complexity:** O(1) iterative / O(log n) recursive

**3. Comparison Table**

| Feature | Linear Search | Binary Search |
|---------|---------------|---------------|
| Prerequisite | None (works on unsorted) | Array must be sorted |
| Time — Best | O(1) — target at index 0 | O(1) — target is the mid |
| Time — Worst | O(n) | O(log n) |
| Time — Average | O(n/2) ≈ O(n) | O(log n) |
| Space | O(1) | O(1) iterative |
| Implementation | Simple | Slightly complex |
| Use case | Small or unsorted data | Large sorted datasets |

**4. When to Use Which**

- Use **Linear Search** when the array is small, unsorted, or linked list (random access not possible).
- Use **Binary Search** when the array is large and already sorted — it is exponentially faster (e.g., 1,000,000 elements: Linear needs 1M steps, Binary needs ~20 steps).

**5. Bangla সারাংশ**

Linear Search একের পর এক দেখে — সহজ কিন্তু ধীর। Binary Search প্রতিবার অর্ধেক কেটে দেয় — sorted array হলে অনেক দ্রুত। Bangladesh Bank exam-এ time complexity জিজ্ঞেস করে, তাই O(n) vs O(log n) এবং "sorted array required" — এই দুটো মনে রাখো।

---

## Quick Revision Summary

| # | Topic | মূল Concept |
|---|-------|------------|
| 01 | Stack vs. Queue | LIFO vs FIFO, memory management |
| 02 | Process vs. Thread | LWP, IPC, context switching |
| 03 | Dynamic Memory Allocation | malloc, calloc, free, memory leak |
| 04 | Call by Value vs. Reference | Pointers, address passing |
| 05 | Storage Classes | auto, register, static, extern |
| 06 | Structures vs. Unions | Memory allocation, padding |
| 07 | `#define` vs. `const` | Pre-processor, type safety |
| 08 | File Handling | fopen modes, fclose, buffer flush |
| 09 | Bitwise Operators | AND, OR, XOR, shift, masking |
| 10 | Recursion vs. Iteration | Stack overhead, base case |
| 11 | Array & Pointer | Decay, pointer arithmetic |
| 12 | Const Pointers | Pointer to const vs const pointer |
| 13 | `volatile` Keyword | Compiler optimization, hardware I/O |
| 14 | Double Pointers | `**ptr`, dynamic 2D array |
| 15 | `extern` Keyword | Multi-file, declaration vs definition |
| 16 | `static` Keyword | Local retention, file-private global |
| 17 | Typecasting | Implicit promotion, explicit cast |
| 18 | `strlen` vs `sizeof` | Null terminator, compile vs run-time |
| 19 | Bit-fields | Memory-efficient flags, protocol headers |
| 20 | Command Line Args | argc, argv, atoi() |
| 21 | Linear vs Binary Search | O(n) vs O(log n), sorted array required |

---

> **শেষ কথা:** এই ২১টা topic Bangladesh Bank IT exam-এর written part-এর backbone। প্রতিটা answer-এর code নিজে compile করে দেখো, comparison table গুলা মুখস্থ করো, আর সংক্ষিপ্ত সারাংশ-এর বাংলা ব্যাখ্যা viva-তে কাজে লাগবে। Best of luck!
