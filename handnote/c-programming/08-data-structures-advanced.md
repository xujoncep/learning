# Chapter 08 — Data Structures & Advanced — C Programming 💻

> Linked list, stack, queue, bitwise, preprocessor, output-prediction।

---
# LEVEL 10-11: DATA STRUCTURES & ADVANCED

*Linked List, Stack, Queue, Bitwise, Preprocessor, Output Tricks — final frontier*


---
---

# Topic 31: Linked List (Singly)

<div align="center">

*"Linked List = dynamic data structure — node গুলো pointer দিয়ে connected"*

</div>

---

## 📖 31.1 ধারণা (Concept)

```
Array vs Linked List:
━━━━━━━━━━━━━━━━━━━━
Array:  [10|20|30|40|50]  ← contiguous, fixed size, O(1) access
List:   [10]→[20]→[30]→[40]→[50]→NULL  ← scattered, dynamic, O(n) access

Node Structure:
┌──────┬──────┐     ┌──────┬──────┐     ┌──────┬──────┐
│ data │ next ├────→│ data │ next ├────→│ data │ NULL │
└──────┴──────┘     └──────┴──────┘     └──────┴──────┘
   Node 1              Node 2              Node 3
```

---

## 💻 31.2 Implementation

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* ══════ Create node ══════ */
Node* createNode(int data) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = data;
    n->next = NULL;
    return n;
}

/* ══════ Insert at front — O(1) ══════ */
void insertFront(Node **head, int data) {
    Node *n = createNode(data);
    n->next = *head;
    *head = n;           /* ⚡ double pointer → modify caller's head! */
}

/* ══════ Insert at end — O(n) ══════ */
void insertEnd(Node **head, int data) {
    Node *n = createNode(data);
    if (*head == NULL) { *head = n; return; }
    Node *t = *head;
    while (t->next) t = t->next;
    t->next = n;
}

/* ══════ Delete node — O(n) ══════ */
void deleteNode(Node **head, int data) {
    if (!*head) return;
    if ((*head)->data == data) {
        Node *temp = *head;
        *head = (*head)->next;
        free(temp);
        return;
    }
    Node *t = *head;
    while (t->next && t->next->data != data)
        t = t->next;
    if (t->next) {
        Node *temp = t->next;
        t->next = temp->next;
        free(temp);
    }
}

/* ══════ Print list ══════ */
void printList(Node *head) {
    while (head) {
        printf("%d → ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

/* ══════ Free entire list ══════ */
void freeList(Node **head) {
    while (*head) {
        Node *temp = *head;
        *head = (*head)->next;
        free(temp);
    }
}

int main() {
    Node *list = NULL;
    insertEnd(&list, 10);
    insertEnd(&list, 20);
    insertEnd(&list, 30);
    insertFront(&list, 5);
    printList(list);          /* 5 → 10 → 20 → 30 → NULL */

    deleteNode(&list, 20);
    printList(list);          /* 5 → 10 → 30 → NULL */

    freeList(&list);
    return 0;
}
```

> **Why double pointer (`Node **head`)?** Function ভেতরে head pointer modify করতে হয় (insert at front, delete head) — single pointer দিয়ে caller's head change করা **যায় না!**

---

## ❓ 31.3 MCQ Problems

---

**MCQ 1:** Linked list এ insert front এর complexity?

| Option | Answer |
|--------|--------|
| (a) O(n) | |
| (b) **O(1)** | ✅ |
| (c) O(log n) | |
| (d) O(n²) | |

> Front insert: new node → link to head → update head → **O(1)** (কোনো traverse নেই!)

---

**MCQ 2:** Linked list এ n-th element access করতে complexity?

| Option | Answer |
|--------|--------|
| (a) O(1) | |
| (b) **O(n)** | ✅ |
| (c) O(log n) | |
| (d) O(n²) | |

> Sequential access — head থেকে n-1 বার traverse → **O(n)** (array = O(1))

---

**MCQ 3:** Linked list এ `insertFront(Node *head, ...)` কেন কাজ করে না?

| Option | Answer |
|--------|--------|
| (a) Syntax error | |
| (b) **head = local copy, caller's head unchanged** | ✅ |
| (c) Memory issue | |
| (d) কাজ করে | |

> Single pointer = **call by value**! head copy change হয়, caller's head **unchanged** → `Node **head` লাগে

---

## 📝 31.4 Summary

- **Linked List** = dynamic, non-contiguous nodes connected by **pointers**। Insert/delete = **O(1)** (if position known), access = **O(n)** (sequential)

- **Self-referential struct:** `struct Node { int data; struct Node *next; };` — must use **`struct Node`** tag inside body

- **Double pointer (`Node **head`)** = insert/delete operations এ **mandatory** — caller's head pointer modify করতে

- **Always free** entire list before program end — loop দিয়ে প্রতি node free করুন (`freeList`)

---
---

# Topic 32: Stack (Array-based)

<div align="center">

*"Stack = LIFO (Last In, First Out) — plate stack এর মতো"*

</div>

---

## 📖 32.1 ধারণা

```
Stack Operations:
  push(5)  push(3)  push(8)  pop()→8  pop()→3
  ┌───┐    ┌───┐    ┌───┐    ┌───┐    ┌───┐
  │   │    │   │    │ 8 │←top│   │    │   │
  │   │    │ 3 │←top│ 3 │    │ 3 │←top│   │
  │ 5 │←top│ 5 │    │ 5 │    │ 5 │    │ 5 │←top
  └───┘    └───┘    └───┘    └───┘    └───┘

LIFO: Last pushed = First popped
push = top এ add, pop = top থেকে remove, peek = top দেখো
```

---

## 💻 32.2 Implementation

```c
#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

void init(Stack *s)         { s->top = -1; }
int isEmpty(Stack *s)       { return s->top == -1; }
int isFull(Stack *s)        { return s->top == MAX - 1; }

void push(Stack *s, int val) {
    if (isFull(s)) { printf("Overflow!\n"); return; }
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    if (isEmpty(s)) { printf("Underflow!\n"); return -1; }
    return s->data[s->top--];
}

int peek(Stack *s) {
    if (isEmpty(s)) return -1;
    return s->data[s->top];
}

int main() {
    Stack s;
    init(&s);

    push(&s, 10); push(&s, 20); push(&s, 30);
    printf("Top: %d\n", peek(&s));    /* 30 */
    printf("Pop: %d\n", pop(&s));     /* 30 */
    printf("Pop: %d\n", pop(&s));     /* 20 */
    printf("Top: %d\n", peek(&s));    /* 10 */

    return 0;
}
```

---

## 📖 32.3 Stack Applications

```
Stack ব্যবহৃত হয়:
━━━━━━━━━━━━━━━━━━
• Function call management (call stack)
• Expression evaluation (postfix/infix)
• Parentheses matching: ({[]})
• Undo/Redo operations
• Browser back button
• Recursion implementation
• DFS (Depth-First Search)
```

---

## ❓ 32.4 MCQ

---

**MCQ 1:** Stack follow করে কোন principle?

| Option | Answer |
|--------|--------|
| (a) FIFO | |
| (b) **LIFO** | ✅ |
| (c) Random | |
| (d) Priority | |

---

**MCQ 2:** push ও pop এর complexity?

| Option | Answer |
|--------|--------|
| (a) O(n) | |
| (b) **O(1) both** | ✅ |
| (c) O(log n) | |
| (d) push O(1), pop O(n) | |

---

**MCQ 3:** Push: 1,2,3,4 → Pop 2 times → Top = ?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) **2** | ✅ |
| (c) 3 | |
| (d) 4 | |

> Push 1,2,3,4 (top=4). Pop→4, Pop→3. **Top = 2**

---

## 📝 32.5 Summary

- **Stack = LIFO** (Last In, First Out)। push = top এ add, pop = top থেকে remove — উভয়ই **O(1)**

- Array-based: `top = -1` (empty), `top = MAX-1` (full)। **Overflow** = full তে push, **Underflow** = empty তে pop

- **Applications:** function call stack, parentheses matching, expression evaluation, undo/redo, recursion, DFS

---
---

# Topic 33: Queue (Array-based)

<div align="center">

*"Queue = FIFO (First In, First Out) — bus queue এর মতো"*

</div>

---

## 📖 33.1 ধারণা

```
Queue Operations:
  enqueue(5)  enqueue(3)  enqueue(8)  dequeue()→5  dequeue()→3
  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ┌─────────┐
  │ 5       │ │ 5  3    │ │ 5  3  8 │ │    3  8 │  │       8 │
  └─────────┘ └─────────┘ └─────────┘ └─────────┘  └─────────┘
   front=rear  front  rear               front rear   front=rear

FIFO: First enqueued = First dequeued
enqueue = rear এ add, dequeue = front থেকে remove
```

---

## 💻 33.2 Circular Queue Implementation

```c
#include <stdio.h>
#define MAX 5

typedef struct {
    int data[MAX];
    int front, rear, count;
} Queue;

void init(Queue *q)       { q->front = 0; q->rear = -1; q->count = 0; }
int isEmpty(Queue *q)     { return q->count == 0; }
int isFull(Queue *q)      { return q->count == MAX; }

void enqueue(Queue *q, int val) {
    if (isFull(q)) { printf("Full!\n"); return; }
    q->rear = (q->rear + 1) % MAX;    /* ⚡ circular wrap! */
    q->data[q->rear] = val;
    q->count++;
}

int dequeue(Queue *q) {
    if (isEmpty(q)) { printf("Empty!\n"); return -1; }
    int val = q->data[q->front];
    q->front = (q->front + 1) % MAX;  /* ⚡ circular wrap! */
    q->count--;
    return val;
}

int main() {
    Queue q;
    init(&q);

    enqueue(&q, 10); enqueue(&q, 20); enqueue(&q, 30);
    printf("Dequeue: %d\n", dequeue(&q));  /* 10 (FIFO!) */
    printf("Dequeue: %d\n", dequeue(&q));  /* 20 */

    enqueue(&q, 40); enqueue(&q, 50);
    /* Circular: rear wraps around to reuse freed space! */

    return 0;
}
```

> **Circular Queue** advantage: linear queue তে front advance করলে space waste হয়। Circular এ `(index + 1) % MAX` = space **reuse!**

---

## ❓ 33.3 MCQ

---

**MCQ 1:** Queue follow করে কোন principle?

| Option | Answer |
|--------|--------|
| (a) LIFO | |
| (b) **FIFO** | ✅ |
| (c) Random | |
| (d) Priority | |

---

**MCQ 2:** Enqueue: 1,2,3,4 → Dequeue 2 times → Front = ?

| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) 2 | |
| (c) **3** | ✅ |
| (d) 4 | |

> Enqueue 1,2,3,4. Dequeue→1, Dequeue→2. **Front = 3** (FIFO!)

---

**MCQ 3:** Circular queue তে `(rear+1) % MAX` কেন?

| Option | Answer |
|--------|--------|
| (a) Speed | |
| (b) **Array শেষে পৌঁছালে শুরুতে wrap** | ✅ |
| (c) Error prevention | |
| (d) কোনো কারণ নেই | |

---

## 📝 33.4 Summary

- **Queue = FIFO** (First In, First Out)। enqueue = rear add, dequeue = front remove — **O(1)** both

- **Circular queue:** `(index + 1) % MAX` = wrap around। Space **reuse** করে — linear queue এর waste prevent

- **Applications:** BFS, printer queue, CPU scheduling, buffer management, keyboard input buffer

---
---

# Topic 34: Bitwise Operations & Bit Manipulation

<div align="center">

*"Bitwise = bit level manipulation — fastest operations in computer"*

</div>

---

## 📖 34.1 Operators & Truth Table

```
┌────┬────┬─────┬─────┬─────┐
│ A  │ B  │ A&B │ A|B │ A^B │
├────┼────┼─────┼─────┼─────┤
│ 0  │ 0  │  0  │  0  │  0  │
│ 0  │ 1  │  0  │  1  │  1  │
│ 1  │ 0  │  0  │  1  │  1  │
│ 1  │ 1  │  1  │  1  │  0  │
└────┴────┴─────┴─────┴─────┘

~A (NOT): flips all bits
A << n : left shift = A × 2ⁿ
A >> n : right shift = A ÷ 2ⁿ
```

---

## 💻 34.2 Common Bit Tricks

```c
/* ══════ Check even/odd ══════ */
if (n & 1) printf("Odd");       /* last bit = 1 → odd */
else       printf("Even");      /* last bit = 0 → even */

/* ══════ Multiply/Divide by 2 ══════ */
n << 1;     /* n × 2 */
n >> 1;     /* n ÷ 2 */
n << 3;     /* n × 8 (2³) */

/* ══════ Swap without temp ══════ */
a ^= b; b ^= a; a ^= b;       /* XOR swap! */

/* ══════ Check if power of 2 ══════ */
if (n > 0 && (n & (n-1)) == 0)  /* power of 2! */
/* 8=1000, 7=0111, 8&7=0000 → true! */

/* ══════ Set, Clear, Toggle, Check bit ══════ */
n |=  (1 << k);    /* SET bit k   (turn ON)  */
n &= ~(1 << k);    /* CLEAR bit k (turn OFF) */
n ^=  (1 << k);    /* TOGGLE bit k (flip)    */
(n >> k) & 1;      /* CHECK bit k (0 or 1)   */

/* ══════ Count set bits (Brian Kernighan) ══════ */
int countBits(int n) {
    int count = 0;
    while (n) { n &= (n-1); count++; }
    return count;
}
/* ⚡ Each iteration removes LOWEST set bit! */
```

---

## ❓ 34.3 MCQ Problems

---

**MCQ 1:** `12 & 10` = ?

| Option | Answer |
|--------|--------|
| (a) **8** | ✅ |
| (b) 14 | |
| (c) 6 | |
| (d) 2 | |

> 1100 & 1010 = **1000** = 8

---

**MCQ 2:** `5 << 3` = ?

| Option | Answer |
|--------|--------|
| (a) 15 | |
| (b) **40** | ✅ |
| (c) 8 | |
| (d) 2 | |

> 5 × 2³ = 5 × 8 = **40**

---

**MCQ 3:** `n & (n-1)` কী করে?

| Option | Answer |
|--------|--------|
| (a) n double করে | |
| (b) **Lowest set bit remove করে** | ✅ |
| (c) All bits flip | |
| (d) Nothing | |

> 12=**1100**, 11=1011, 12&11=**1000** (lowest set bit gone!)

---

**MCQ 4:** `~0` = ?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) 1 | |
| (c) **-1** | ✅ |
| (d) MAX_INT | |

> ~0 = all bits 1 = **-1** (2's complement)। Rule: `~x = -(x+1)`

---

## 📝 34.5 Summary

- **`n & 1`** = even/odd check (fastest!). **`n << k`** = n × 2ᵏ. **`n >> k`** = n ÷ 2ᵏ

- **Bit manipulation:** SET `n |= (1<<k)`, CLEAR `n &= ~(1<<k)`, TOGGLE `n ^= (1<<k)`, CHECK `(n>>k) & 1`

- **Power of 2 check:** `n & (n-1) == 0` (and n > 0). **XOR swap:** `a^=b; b^=a; a^=b;`

- **`~x = -(x+1)`**: `~0`=-1, `~5`=-6. **Count bits:** Brian Kernighan `n &= (n-1)` loop

---
---

# Topic 35: Preprocessor Directives

<div align="center">

*"Preprocessor = compilation এর আগে code transform — #define, #include, #ifdef"*

</div>

---

## 💻 35.1 Essential Directives

```c
/* ══════ #include — header file include ══════ */
#include <stdio.h>       /* system header (< >) */
#include "myheader.h"    /* user header (" ") */

/* ══════ #define — macro ══════ */
#define PI 3.14159
#define MAX(a,b) ((a)>(b)?(a):(b))    /* ⚡ bracket everything! */
#define SQUARE(x) ((x)*(x))

/* ══════ #ifdef / #ifndef — conditional compilation ══════ */
#ifndef MYHEADER_H         /* include guard — prevent double include! */
#define MYHEADER_H
/* header content here */
#endif

/* ══════ #if / #elif / #else / #endif ══════ */
#define DEBUG 1
#if DEBUG
    printf("Debug mode ON\n");
#else
    printf("Release mode\n");
#endif

/* ══════ Predefined macros ══════ */
printf("File: %s\n", __FILE__);
printf("Line: %d\n", __LINE__);
printf("Date: %s\n", __DATE__);
printf("Time: %s\n", __TIME__);
printf("Function: %s\n", __func__);   /* C99 */

/* ══════ Stringize (#) and Token Paste (##) ══════ */
#define STR(x) #x               /* STR(hello) → "hello" */
#define CONCAT(a,b) a##b        /* CONCAT(var,1) → var1 */
```

---

## ❓ 35.2 MCQ Problems

---

**MCQ 1:** `#define SQ(x) x*x` — `SQ(2+3)` = ?

| Option | Answer |
|--------|--------|
| (a) 25 | |
| (b) **11** | ✅ |
| (c) 10 | |
| (d) Error | |

> Text replace: `2+3*2+3` = 2+6+3 = **11** ❌। Fix: `((x)*(x))` → 25

---

**MCQ 2:** `#include <file>` vs `#include "file"` পার্থক্য?

| Option | Answer |
|--------|--------|
| (a) একই | |
| (b) **<> = system path, "" = local path first** | ✅ |
| (c) <> faster | |
| (d) "" for C++ only | |

---

**MCQ 3:** Include guard (`#ifndef`) কেন ব্যবহার হয়?

| Option | Answer |
|--------|--------|
| (a) Speed | |
| (b) **Same header double include prevent** | ✅ |
| (c) Syntax requirement | |
| (d) Memory save | |

---

## 📝 35.3 Summary

- **`#define`** = text replacement (no type check!)। Macro parameter এ **সবসময় bracket** দিন: `((x)*(x))`

- **Include guard** (`#ifndef`/`#define`/`#endif`) = same header **double include prevent** — every header এ mandatory

- **Predefined macros:** `__FILE__`, `__LINE__`, `__DATE__`, `__TIME__`, `__func__` — debugging এ useful

- **`#` (stringize):** `#x` → `"x"` (string)। **`##` (token paste):** `a##b` → `ab` (concat identifiers)

---
---

# Topic 36: Output Prediction (Tricky Code Reading)

<div align="center">

*"Output prediction = exam এর ৫০%+ marks — code পড়ে output বলার ক্ষমতা"*

</div>

---

## 📖 36.1 Top 15 Output Prediction Patterns

```c
/* ══════ 1. Post/Pre increment ══════ */
int a = 5;
printf("%d ", a++);  /* 5 (use then increment) */
printf("%d", a);     /* 6 */

/* ══════ 2. Short-circuit ══════ */
int x = 0, y = 5;
x && (y++);          /* x=0 → y++ SKIPPED! y still 5 */

/* ══════ 3. Comma operator ══════ */
int z = (1, 2, 3);  /* z = 3 (last value) */

/* ══════ 4. sizeof expression NOT evaluated ══════ */
int n = 5;
sizeof(n++);         /* n still 5! */

/* ══════ 5. Nested printf ══════ */
printf("%d", printf("Hi")); /* Hi2 */

/* ══════ 6. Switch fall-through ══════ */
switch(2) { case 1: printf("A"); case 2: printf("B"); case 3: printf("C"); }
/* BCD — no break! */

/* ══════ 7. Dangling else ══════ */
if (1) if (0) printf("A"); else printf("B");  /* B */

/* ══════ 8. String literal ══════ */
printf("%c", "Hello"[1]);   /* e */
printf("%s", "Hello" + 2);  /* llo */

/* ══════ 9. Pointer arithmetic ══════ */
int arr[] = {10,20,30};
int *p = arr;
printf("%d", *p++);  /* 10 (then p moves) */

/* ══════ 10. Static variable ══════ */
void f() { static int x=0; printf("%d ",++x); }
f(); f(); f();  /* 1 2 3 */

/* ══════ 11. Recursion print ══════ */
void r(int n) { if(!n)return; r(n-1); printf("%d ",n); }
r(3);  /* 1 2 3 (head recursion = ascending) */

/* ══════ 12. Array out of bounds ══════ */
int m[2][3] = {{1,2,3},{4,5,6}};
printf("%d", m[0][3]);  /* 4 (⚠️ UB but contiguous → next row!) */

/* ══════ 13. char arithmetic ══════ */
printf("%c", 'A' + 2);  /* C (65+2=67='C') */
printf("%d", '0');       /* 48 (ASCII of '0') */

/* ══════ 14. Octal literal ══════ */
printf("%d", 010);       /* 8 (octal 10 = decimal 8!) */

/* ══════ 15. Integer division ══════ */
printf("%d", 5/2);       /* 2 (not 2.5!) */
printf("%f", 5/2);       /* ⚠️ UB! (int passed as float) */
```

---

## 📝 36.2 Summary

- **Output prediction** = code পড়ে mentally execute করা। **Exam marks এর সবচেয়ে বড় অংশ!**

- **Top traps:** post/pre increment, short-circuit, comma, sizeof not-evaluate, nested printf, switch fall-through, dangling else, pointer arithmetic, static persist, recursion direction, octal literal, integer division

- **কৌশল:** প্রতিটি expression **step by step** evaluate করুন — shortcut নেবেন না। Variable এর **current value track** করুন (কাগজে লিখে)

---
---

# Topic 37: Miscellaneous

<div align="center">

*"Command line args, variable args, volatile, const — বিবিধ গুরুত্বপূর্ণ topics"*

</div>

---

## 💻 37.1 Command Line Arguments

```c
#include <stdio.h>

/* argc = argument count, argv = argument vector (string array) */
int main(int argc, char *argv[]) {
    printf("Total args: %d\n", argc);
    for (int i = 0; i < argc; i++)
        printf("argv[%d] = %s\n", i, argv[i]);
    return 0;
}

/* Run: ./program hello world 42
   Output:
   Total args: 4
   argv[0] = ./program
   argv[1] = hello
   argv[2] = world
   argv[3] = 42     ← string! atoi("42") for int
*/
```

> **argv[0]** = program name (always!)। argv[argc] = **NULL**। All arguments are **strings** — `atoi()` দিয়ে int এ convert

---

## 💻 37.2 Variable Arguments (stdarg.h)

```c
#include <stdio.h>
#include <stdarg.h>

/* ══════ Function with variable number of arguments ══════ */
int sum(int count, ...) {
    va_list args;
    va_start(args, count);     /* initialize after last fixed param */

    int total = 0;
    for (int i = 0; i < count; i++)
        total += va_arg(args, int);  /* get next arg as int */

    va_end(args);              /* cleanup */
    return total;
}

int main() {
    printf("Sum: %d\n", sum(3, 10, 20, 30));      /* 60 */
    printf("Sum: %d\n", sum(5, 1, 2, 3, 4, 5));   /* 15 */
    return 0;
}

/* ⚡ printf itself uses variable arguments! */
/* int printf(const char *format, ...); */
```

---

## 💻 37.3 volatile & const Keywords

```c
/* ══════ volatile — compiler optimization prevent ══════ */
volatile int sensorValue;
/* ⚡ Tells compiler: "this value can change ANY TIME!"
   → Don't cache in register
   → Always read from memory
   Used in: hardware registers, signal handlers, multi-threading */

/* ══════ const — various uses ══════ */
const int MAX = 100;               /* constant variable */
const int *p1;                     /* pointer to const int */
int * const p2 = &x;              /* const pointer to int */
const int * const p3 = &x;        /* const pointer to const int */

void func(const char *s) {        /* promise: won't modify string */
    /* s[0] = 'X'; ← ❌ Error! */
    printf("%s\n", s);             /* read-only access ✅ */
}
```

---

## 💻 37.4 Comma Operator, Ternary, typedef Tricks

```c
/* ══════ Comma as operator (not separator!) ══════ */
int x = (printf("A"), printf("B"), 5);  /* prints AB, x=5 */

/* ══════ Ternary chain ══════ */
int n = 75;
char *grade = (n>=90) ? "A+" :
              (n>=80) ? "A"  :
              (n>=70) ? "B"  :
              (n>=60) ? "C"  : "F";
printf("Grade: %s\n", grade);  /* B */

/* ══════ Useful macros ══════ */
#define ARRAY_SIZE(arr) (sizeof(arr)/sizeof(arr[0]))
#define MIN(a,b) ((a)<(b)?(a):(b))
#define MAX(a,b) ((a)>(b)?(a):(b))
#define SWAP(a,b) do { typeof(a) _t=a; a=b; b=_t; } while(0)
```

---

## ❓ 37.5 MCQ Problems

---

**MCQ 1:** `argv[0]` কী contain করে?

| Option | Answer |
|--------|--------|
| (a) First argument | |
| (b) **Program name** | ✅ |
| (c) NULL | |
| (d) Argument count | |

---

**MCQ 2:** `volatile` keyword কী বলে?

| Option | Answer |
|--------|--------|
| (a) Variable is constant | |
| (b) **Value যেকোনো সময় change হতে পারে** | ✅ |
| (c) Variable is fast | |
| (d) Variable is global | |

---

**MCQ 3:** `va_arg(args, int)` কী করে?

| Option | Answer |
|--------|--------|
| (a) Argument count দেয় | |
| (b) **Next argument (int হিসেবে) return করে** | ✅ |
| (c) Argument list শেষ করে | |
| (d) Error check করে | |

---

## 📝 37.6 Summary

- **Command line args:** `int main(int argc, char *argv[])` — argc = count, argv[0] = program name, সব **string** (atoi for int convert)

- **Variable args** (stdarg.h): `va_list`, `va_start`, `va_arg`, `va_end` — printf নিজেও এটা ব্যবহার করে!

- **volatile:** compiler optimization prevent — hardware register, multi-thread shared variable এ ব্যবহৃত

- **const** multiple uses: constant variable, pointer to const, const pointer — function parameter এ **const** = caller's data **safe**

---
---

---
---

# BONUS: 100 C Programming Interview Questions & Answers

<div align="center">

*Basic থেকে Advanced — চাকরির Interview ও Viva তে সবচেয়ে বেশি জিজ্ঞেস করা ১০০ প্রশ্ন*

</div>

---

## 🟢 BASIC LEVEL (Q1-Q35)

---

**Q1: C কোন ধরনের programming language?**

C হলো **procedural**, **mid-level**, **structured** programming language। Dennis Ritchie ১৯৭২ সালে Bell Labs এ তৈরি করেন। এটি hardware এর কাছাকাছি কাজ করতে পারে (low-level) আবার readable syntax আছে (high-level) — তাই **mid-level** বলা হয়।

---

**Q2: C তে header file কী?**

Header file (`.h`) এ **function declarations, macros, type definitions** থাকে। `#include <stdio.h>` preprocessor কে বলে stdio.h এর content code এ paste করতে। `< >` = system path, `" "` = local path আগে খোঁজে।

---

**Q3: `printf()` ও `scanf()` এর মধ্যে পার্থক্য কী?**

`printf()` = **output** (screen এ print)। `scanf()` = **input** (keyboard থেকে read)। printf format string অনুযায়ী data **display** করে, scanf format string অনুযায়ী data **store** করে (& দিয়ে address দিতে হয়)।

---

**Q4: `int`, `float`, `double`, `char` এর size কত?**

`char` = **1 byte**, `int` = **4 bytes**, `float` = **4 bytes** (6 decimal precision), `double` = **8 bytes** (15 decimal precision)। size platform dependent হতে পারে, তবে modern 32/64-bit system এ এই values standard।

---

**Q5: `signed` ও `unsigned` এর পার্থক্য কী?**

`signed` (default) = ধনাত্মক ও ঋণাত্মক উভয় value store করে (range: -128 to 127 for char)। `unsigned` = শুধু ধনাত্মক (range: 0 to 255 for char)। unsigned এ negative value assign করলে **wrap around** হয়।

---

**Q6: Variable declaration ও definition এর পার্থক্য কী?**

**Declaration** = compiler কে জানানো variable exist করবে (type ও name)। **Definition** = actual memory allocation। `extern int x;` = declaration only। `int x = 10;` = declaration + definition।

---

**Q7: `const` ও `#define` এর পার্থক্য কী?**

`const` = **type-safe** constant variable (memory নেয়, compiler check করে, scope আছে)। `#define` = **text replacement** macro (memory নেয় না, no type check, file scope)। `const` বেশি safe ও debuggable।

---

**Q8: `=` ও `==` এর পার্থক্য কী?**

`=` = **assignment** operator (value বসায়: `a = 5`)। `==` = **comparison** operator (check করে: `a == 5`)। `if(a = 5)` → a তে 5 বসে, always **true**! সবচেয়ে common bug।

---

**Q9: `++a` ও `a++` এর পার্থক্য কী?**

`++a` (pre-increment) = **আগে বাড়ায়**, তারপর value ব্যবহার করে। `a++` (post-increment) = আগে **value ব্যবহার** করে, তারপর বাড়ায়। `b = ++a;` → a বাড়ে, b = new value। `b = a++;` → b = old value, তারপর a বাড়ে।

---

**Q10: Short-circuit evaluation কী?**

`&&` এ left side **false** হলে right side **execute হয় না**। `||` এ left side **true** হলে right side **execute হয় না**। `(0) && (++x)` → x increment **হবে না!** Side effects skip হতে পারে।

---

**Q11: `break` ও `continue` এর পার্থক্য কী?**

`break` = loop বা switch থেকে **সম্পূর্ণ বের** হয়ে যায়। `continue` = বর্তমান iteration **skip** করে **পরের iteration** এ যায়। break = exit loop, continue = skip iteration।

---

**Q12: `while` ও `do-while` এর পার্থক্য কী?**

`while` = condition **আগে** check (0 বারও চলতে পারে)। `do-while` = body **আগে** execute, condition **পরে** check (**কমপক্ষে ১ বার** চলে)। do-while এ semicolon mandatory: `while(cond);`

---

**Q13: Array কী? Array এর index কত থেকে শুরু হয়?**

Array = **same type** এর elements **contiguous memory** তে। Index **0 থেকে** শুরু। `int arr[5]` = index 0 to 4। arr[5] = **out of bounds** (UB!)। C তে **no bound checking**।

---

**Q14: Array ও Pointer এর সম্পর্ক কী?**

Array name = **pointer to first element** (`arr = &arr[0]`)। `arr[i]` = `*(arr + i)`। কিন্তু array name **constant** (arr++ impossible), pointer variable **modifiable** (p++ OK)। Function এ array = pointer decay হয়।

---

**Q15: String কী? C তে string কিভাবে store হয়?**

C তে string = **null-terminated char array** (`'\0'` দিয়ে শেষ)। `"Hello"` = 6 bytes (5 chars + `'\0'`)। `sizeof("Hello")` = 6, `strlen("Hello")` = 5। C তে dedicated string type **নেই**।

---

**Q16: `char[]` ও `char*` এর পার্থক্য কী?**

`char s[] = "Hi"` = array **copy** (modifiable)। `char *s = "Hi"` = pointer to string **literal** (read-only!)। `s[0] = 'X'`: array → OK, pointer → **UB/crash!** sizeof: array = total, pointer = 4/8।

---

**Q17: `strlen()` ও `sizeof()` এর পার্থক্য কী?**

`strlen()` = runtime function, `'\0'` **exclude** করে (character count)। `sizeof()` = compile-time operator, `'\0'` **include** করে (byte count)। `sizeof("Hi")` = 3, `strlen("Hi")` = 2।

---

**Q18: `strcmp()` কী return করে?**

0 = strings **equal**। negative = first string comes **before** (lexicographically)। positive = first string comes **after**। `==` দিয়ে string compare **করবেন না!** (address compare হয়, content নয়)

---

**Q19: Pointer কী?**

Pointer = variable যা অন্য variable এর **memory address** store করে। `int *p = &a;` → p holds address of a। `*p` = dereference (value at address)। `&` = address-of, `*` = value-at।

---

**Q20: NULL pointer কী?**

NULL pointer কোনো valid memory address point করে **না** (`(void*)0`)। NULL dereference = **Segmentation Fault!** Always check: `if (p != NULL)` before `*p`। Initialize: `int *p = NULL;`

---

**Q21: Dangling pointer কী?**

Pointer যা **freed বা destroyed** memory তে point করে। কারণ: `free()` পরে ব্যবহার, local variable scope শেষ হওয়া। Fix: `p = NULL;` after free। Use-after-free = **UB!**

---

**Q22: `malloc()` ও `calloc()` এর পার্থক্য কী?**

`malloc(size)` = size bytes, **uninitialized** (garbage)। `calloc(count, size)` = count × size bytes, **zero-initialized**। calloc slightly slower (zeroing), কিন্তু safer। Both return `void*`, fail → **NULL**।

---

**Q23: Memory leak কী?**

`malloc()`/`calloc()` করে `free()` না করলে → memory **permanently occupied** but inaccessible → **memory leak**। Program চলতে থাকলে memory কমতে থাকে। Fix: প্রতি malloc এর matching free দিন।

---

**Q24: `struct` কী? কেন ব্যবহার করা হয়?**

Structure = **বিভিন্ন type** এর data **একটি নামে** group করে (user-defined type)। একজন student এর name, id, gpa — সব এক struct এ। Array = same type, struct = different types।

---

**Q25: `struct` ও `union` এর পার্থক্য কী?**

**struct:** প্রতি member **আলাদা memory** পায়। sizeof = **sum** (+ padding)। সব member **একসাথে valid**। **union:** সব member **একই memory** share। sizeof = **largest member**। শুধু **last written** member valid।

---

**Q26: `enum` কী?**

enum = **named integer constants**। `enum Color {RED, GREEN, BLUE}` → RED=0, GREEN=1, BLUE=2 (auto from 0)। Readability বাড়ায়: `color == RED` (not `color == 0`)। sizeof(enum) = sizeof(int) = 4। No type safety in C!

---

**Q27: `typedef` কী?**

`typedef` = existing type এর **alias** তৈরি করে। `typedef unsigned long ulong;` → `ulong x;`। struct সহজ করে: `typedef struct {...} Student;` → `Student s;` (no "struct" keyword)।

---

**Q28: File handling এ `fopen()` fail করলে কী হয়?**

`fopen()` fail করলে **NULL** return করে। কারণ: file not found, permission denied, disk full। **Always check:** `if (fp == NULL) { /* handle error */ }`। "w" mode = existing content **deleted!**

---

**Q29: Recursion কী? Base case কেন দরকার?**

Recursion = function **নিজেই নিজেকে** call করে। **Base case** = থামার শর্ত — ছাড়া **infinite recursion → Stack Overflow!** প্রতি call stack এ frame push হয় → memory শেষ → crash।

---

**Q30: `static` variable কী?**

`static` local variable = value function call এর মধ্যে **persist** করে, re-initialize হয় না। Lifetime = **program duration**, scope = **function only**। `static` global variable = **file-private** (internal linkage)।

---

**Q31: `extern` keyword কী করে?**

`extern` বলে: "এই variable **অন্যত্র define** করা আছে, আমি শুধু **refer** করছি"। Memory allocate করে **না**। Multi-file program এ global variable share করতে ব্যবহৃত।

---

**Q32: Local ও Global variable এর পার্থক্য কী?**

**Local:** function/block এর মধ্যে, scope limited, default = **garbage**, stack এ। **Global:** function এর বাইরে, program-wide accessible, default = **0**, data segment এ। Global এ name collision risk।

---

**Q33: `switch` এ `break` না দিলে কী হয়?**

**Fall-through!** Match হওয়া case থেকে **নিচের সব case** execute হতে থাকে (break বা switch end পর্যন্ত)। `switch(2){case 1:print("A"); case 2:print("B"); case 3:print("C");}` → **BC**

---

**Q34: `void` pointer কী?**

`void*` = **generic pointer** — যেকোনো type এ point করতে পারে। Dereference করতে **cast** করতে হয়: `*(int*)vp`। Arithmetic **illegal** (size unknown)। `malloc()` `void*` return করে।

---

**Q35: C তে function কয়টি value return করতে পারে?**

**সর্বোচ্চ 1টি** value return করতে পারে। Multiple value return করতে: **pointer parameter** (`void minMax(int *min, int *max)`), **struct return**, বা **global variable** (avoid!)।

---

## 🟡 INTERMEDIATE LEVEL (Q36-Q70)

---

**Q36: Call by value ও Call by reference এর পার্থক্য কী?**

**Value:** argument এর **copy** পাঠায় — original unchanged। **Reference (pointer):** argument এর **address** পাঠায় — function ভেতরে original **modify** হয়। C তে reference নেই, pointer দিয়ে simulate করা হয়।

---

**Q37: `sizeof` operator compile-time না runtime?**

**Compile-time!** VLA (Variable Length Array) ছাড়া sizeof সব ক্ষেত্রে compile time এ resolve হয়। `sizeof(x++)` → x **বাড়ে না!** sizeof expression **evaluate করে না**, শুধু type check করে।

---

**Q38: `sizeof('A')` C ও C++ এ কত?**

C তে = **4** (character constant = int type)। C++ এ = **1** (character constant = char type)। এটি C vs C++ এর fundamental difference — exam এ আসে!

---

**Q39: Dangling else problem কী?**

`else` সবসময় **nearest unmatched if** এর সাথে pair হয়, indentation যাই হোক। `if(a) if(b) print("X"); else print("Y");` → else = inner `if(b)` এর! Fix: **সবসময় `{}` ব্যবহার করুন**।

---

**Q40: `int (*p)[10]` ও `int *p[10]` এর পার্থক্য কী?**

`int (*p)[10]` = **pointer to array** of 10 ints (1 pointer)। `int *p[10]` = **array of 10 pointers** to int (10 pointers)। `()` changes binding completely!

---

**Q41: Function pointer কী?**

Function এর **address** store করা pointer। `int (*fp)(int, int) = add;` → `fp(3,5)` = `add(3,5)`। Uses: callback (qsort), strategy pattern, dispatch table। `int (*fp)(int)` ≠ `int *fp(int)`!

---

**Q42: `const int *p` ও `int * const p` এর পার্থক্য কী?**

`const int *p` = **pointer to constant** — value change ❌, pointer change ✅। `int * const p` = **constant pointer** — value change ✅, pointer change ❌। Read right-to-left! const before `*` = value locked, after `*` = pointer locked।

---

**Q43: Structure padding কী?**

Compiler **alignment** এর জন্য members এর মাঝে **extra bytes** যোগ করে। `struct {char c; int i;}` = 8 bytes (not 5!) → char(1) + pad(3) + int(4)। Minimize: members **largest to smallest** order। struct size = multiple of largest member alignment।

---

**Q44: `realloc()` fail করলে কী হয়?**

NULL return করে, কিন্তু **original block unchanged!** ⚠️ `p = realloc(p, sz)` dangerous — fail হলে p=NULL → original **leaked!** Fix: `temp = realloc(p, sz); if(temp) p = temp;`

---

**Q45: Stack overflow কী?**

Stack memory (limited: 1-8MB) শেষ হয়ে যাওয়া — সাধারণত **infinite recursion** বা **অতিরিক্ত deep recursion** এ হয়। প্রতি function call stack frame (local vars, return address) push হয় → memory full → crash (Segmentation Fault)।

---

**Q46: `printf("%d", printf("Hello"));` এর output কী?**

**Hello5**। Inner `printf("Hello")` আগে execute → "Hello" print, return **5** (char count)। Outer `printf("%d", 5)` → "5" print। Combined: **Hello5**।

---

**Q47: Octal literal `010` decimal এ কত?**

**8**। `0` prefix = **octal** (base 8)। `010` = 1×8 + 0 = **8** decimal। সবচেয়ে common exam trap! `int x = 010;` → x = 8, NOT 10!

---

**Q48: `a[i]` ও `i[a]` — দুটো কি valid?**

**হ্যাঁ, দুটোই identical!** `a[i]` = `*(a+i)` = `*(i+a)` = `i[a]`। Addition commutative, তাই index ও array swap করা যায়। Exam trap: `2["Hello"]` = `'l'`!

---

**Q49: Scope ও Lifetime এর পার্থক্য কী?**

**Scope** = কোথা থেকে **access** করা যায় (compile-time concept)। **Lifetime** = কতক্ষণ memory তে **exist** করে (runtime concept)। static local: scope = narrow (function), lifetime = **long** (program) → scope ≠ lifetime!

---

**Q50: Binary search এর prerequisite কী?**

Array অবশ্যই **sorted** হতে হবে! Time: O(log n) — প্রতি step এ search space অর্ধেক। 1 million elements → max ~20 comparisons! `mid = low + (high-low)/2` ব্যবহার করুন (overflow prevent)।

---

**Q51: Bubble, Selection, Insertion sort এর মধ্যে কোনটি কখন best?**

**Nearly sorted data** → **Insertion** (O(n) best case!)। **Swap costly** → **Selection** (minimum swaps)। **Simple implementation** → **Bubble** (কিন্তু worst practical performance)। সবগুলো O(n²) average।

---

**Q52: Stable sort কী?**

Equal value elements এর **original relative order** preserve করে। Bubble ✅, Insertion ✅, Merge ✅। Selection ❌, Quick ❌ (default)। Example: sort by GPA → same GPA students এর name order unchanged।

---

**Q53: Linked list এ insert front এ কেন double pointer লাগে?**

`insertFront(Node **head, ...)` — head pointer নিজেই **change** হয় (নতুন node head হয়)। Single pointer = local **copy**, caller's head **unchanged!** Double pointer = caller's head **modify** করতে পারে।

---

**Q54: Stack কোন principle follow করে? Queue?**

Stack = **LIFO** (Last In, First Out)। Queue = **FIFO** (First In, First Out)। Stack: plate pile। Queue: bus line। push/pop = O(1), enqueue/dequeue = O(1)।

---

**Q55: `#define` macro তে কেন bracket দিতে হয়?**

`#define SQ(x) x*x` → `SQ(2+3)` = `2+3*2+3` = 11 ❌ (চাই 25!)। Fix: `#define SQ(x) ((x)*(x))`। Macro = **text replacement** — bracket ছাড়া operator precedence ভুল হয়!

---

**Q56: Include guard কী?**

```c
#ifndef HEADER_H
#define HEADER_H
/* content */
#endif
```
Same header **multiple include** prevent করে। ছাড়া redefinition error আসে। প্রতিটি `.h` file এ **mandatory**!

---

**Q57: `register` variable কী?**

CPU **register** এ store এর **request** (guarantee নয়!)। `&` operator ব্যবহার **illegal!** Modern compiler নিজেই register optimize করে — keyword practically **obsolete**।

---

**Q58: `volatile` keyword কেন ব্যবহার হয়?**

Compiler কে বলে: "এই variable **যেকোনো সময় বাইরে থেকে change** হতে পারে"। Compiler optimization **prevent** করে (register caching বন্ধ)। Uses: **hardware registers, ISR, multi-thread** shared variables।

---

**Q59: `fgets()` ও `scanf()` string input এ পার্থক্য কী?**

`scanf("%s")` = whitespace এ **stop** ("John Doe" → "John" only!)। `fgets()` = পুরো **line** পড়ে (spaces সহ)। ⚠️ fgets `'\n'` **include** করে! Remove: `s[strcspn(s, "\n")] = '\0';`

---

**Q60: `free()` এর পরে pointer কী হয়?**

Pointer **dangling** হয়ে যায় (old address hold করে, কিন্তু memory **invalid**)। `*p` = **UB!** Fix: `p = NULL;` after free। `free(NULL)` = safe (no-op)। `free(p); free(p);` = **double free = crash!**

---

**Q61: `int **pp` কী? কখন ব্যবহার হয়?**

**Pointer to pointer** (double pointer)। `**pp` = original value, `*pp` = original pointer। ব্যবহার: function এ **caller's pointer modify** করতে (malloc, linked list head change), 2D **dynamic array**, string array (`char**`)।

---

**Q62: `strtok()` কী করে? কী সমস্যা আছে?**

String কে delimiter দিয়ে **token** এ ভাগ করে। ⚠️ **Original string modify** করে (delimiter → `'\0'`)! ⚠️ **Static internal state** — re-entrant নয়। `strtok(str, ",")` first call, `strtok(NULL, ",")` next calls।

---

**Q63: Text file ও Binary file এর পার্থক্য কী?**

**Text:** human readable, portable, `fprintf/fscanf/fgets`। `25` = 2 bytes ('2','5')। **Binary:** machine readable, compact, fast, `fwrite/fread`। `25` = 4 bytes (int binary)। Binary তে struct directly save/load পারা যায়।

---

**Q64: `strncpy()` কী সমস্যা করতে পারে?**

Source length ≥ n হলে `strncpy` destination **null-terminate করে না!** `strncpy(dest, "Hello", 3)` → dest = `{'H','e','l'}` — **no `'\0'`!** Fix: `dest[3] = '\0';` manually দিতে হবে।

---

**Q65: `gets()` কেন ব্যবহার করা উচিত না?**

**Buffer overflow!** `gets()` কোনো **size limit** check করে না — input buffer size exceed করলে adjacent memory **corrupt** হয় → security vulnerability! C11 থেকে **removed!** Use: `fgets(buf, size, stdin)`।

---

**Q66: Implicit ও Explicit type casting এর পার্থক্য কী?**

**Implicit:** compiler automatic করে (int→float, char→int)। **Explicit:** programmer force করে: `(float)a/b`। ⚠️ `(float)(a/b)` ≠ `(float)a/b`! Cast position changes result!

---

**Q67: `-1 < 1u` — result কী? কেন?**

**False (0)!** signed vs unsigned comparison → -1 converts to unsigned → **4294967295** (UINT_MAX)। 4294967295 > 1 = true → expression = **false!** সবচেয়ে dangerous trap in C!

---

**Q68: 2D array function parameter এ column size কেন mandatory?**

Compiler কে **address calculation** করতে column size জানতে হয়: `&m[i][j] = base + (i × cols + j) × sizeof(type)`। Row size না জানলেও চলে (traverse by pointer)। `void func(int m[][4], int rows)` — 4 mandatory!

---

**Q69: `int** m` ও `int m[][4]` কি same?**

**না!** `int**` = pointer-to-pointer (rows **non-contiguous**, separate malloc)। `int m[][4]` = pointer-to-array-of-4 (rows **contiguous**)। 2D array কে `int**` তে pass করলে **crash!** সম্পূর্ণ ভিন্ন memory layout।

---

**Q70: Prime check এ কেন √n পর্যন্ত check যথেষ্ট?**

কোনো composite number n = a × b হলে, a বা b অবশ্যই **≤ √n**। কারণ a > √n **ও** b > √n হলে a × b > n — contradiction! তাই √n পর্যন্ত কোনো factor না পেলে n **prime**। O(√n) = efficient!

---

## 🔴 ADVANCED LEVEL (Q71-Q100)

---

**Q71: `*p++` vs `(*p)++` vs `++*p` — পার্থক্য কী?**

`*p++` = read `*p`, then **p moves** forward (postfix on pointer)। `(*p)++` = read `*p`, then **value increments** (postfix on value)। `++*p` = **value increments** first, then read (prefix on value)। Precedence: postfix > dereference > prefix।

---

**Q72: `arr` ও `&arr` এর পার্থক্য কী?**

Same **address**, different **types!** `arr` = `int*` → `arr+1` = +4 bytes (next element)। `&arr` = `int(*)[N]` → `&arr+1` = +N×4 bytes (skip **entire array!**)। Type determines pointer arithmetic step size।

---

**Q73: Tagged union কী?**

struct এ enum **tag** + union combine করে → কোন union member active তা **track** করা যায়। JSON parser, interpreter, variant type system এ ব্যবহৃত। `struct { enum Type tag; union { int i; float f; } data; };`

---

**Q74: Bit fields কী?**

struct member এ **specific bit count** allocate: `unsigned int flag : 1;` (1 bit, 0 or 1)। Memory **save** করে। ⚠️ **Address নেওয়া যায় না** (`&s.flag` → Error!)। Hardware register mapping এ useful।

---

**Q75: `typedef` ও `#define` এর subtle পার্থক্য কী?**

`typedef char* String; String a, b;` → both **char*** ✅। `#define String char*` → `String a, b;` = `char *a, b;` → a=char*, **b=char** ⚠️! typedef = **true type alias** (compiler-processed), #define = **text substitution**।

---

**Q76: Circular queue কেন ব্যবহার হয়?**

Linear queue তে dequeue করলে front advance হয় → সামনের space **waste**। Circular queue: `(index+1) % MAX` = wrap around → **space reuse!** Same array, more efficient memory utilization।

---

**Q77: GCD এর Euclidean algorithm এর complexity কত?**

**O(log(min(a,b)))**। `gcd(a,b) = gcd(b, a%b)` → প্রতি step এ number প্রায় **অর্ধেক** হয় → logarithmic। Very efficient — billion-size numbers এও দ্রুত!

---

**Q78: `fseek()`, `ftell()`, `rewind()` কী করে?**

`fseek(fp, offset, origin)` = file position **set** (SEEK_SET/CUR/END)। `ftell(fp)` = current position **return** (bytes from start)। `rewind(fp)` = **beginning** এ ফিরে যায়। File size: `fseek(fp,0,SEEK_END); ftell(fp)`!

---

**Q79: Self-referential structure কী?**

struct যার member **নিজের type এর pointer**: `struct Node { int data; struct Node *next; };`। Linked list, tree, graph এর **ভিত্তি**। body তে `struct Node` tag ব্যবহার করতে হয় (typedef complete হওয়ার আগে)।

---

**Q80: Shallow copy ও Deep copy এর পার্থক্য কী?**

**Shallow:** `s2 = s1` → pointer members **same address** point করে → modify one = modify both! **Deep:** manually malloc + copy → **independent** copies। Shallow = fast but dangerous, Deep = safe but manual work।

---

**Q81: `memcpy()` ও `memmove()` এর পার্থক্য কী?**

`memcpy()` = source ও destination **overlap** করলে **UB!** `memmove()` = overlap **safe** (temporary buffer ব্যবহার করে)। Non-overlapping → memcpy (faster)। Overlapping → memmove (safer)।

---

**Q82: Variable Length Array (VLA) কী?**

C99 feature: runtime এ size দিয়ে array declare: `int n = 5; int arr[n];`। ⚠️ **Initializer দেওয়া যায় না!** `int arr[n] = {0};` → Error! Stack allocate হয় → বড় size → stack overflow risk।

---

**Q83: `va_list`, `va_start`, `va_arg`, `va_end` কী?**

`<stdarg.h>` এর macros — **variable number of arguments** handle করে। `printf()` নিজেও এটা ব্যবহার করে! `va_start(args, last_fixed)` → init, `va_arg(args, type)` → next arg, `va_end(args)` → cleanup।

---

**Q84: Command line arguments কিভাবে কাজ করে?**

`int main(int argc, char *argv[])` — `argc` = argument count, `argv[]` = string array। `argv[0]` = **program name** (always!)। সব argument = **string** — `atoi(argv[1])` for integer conversion।

---

**Q85: `n & (n-1)` কী করে?**

**Lowest set bit remove** করে! n=12 (1100), n-1=11 (1011) → n&(n-1)=8 (1000)। **Power of 2 check:** `n > 0 && (n & (n-1)) == 0`। **Count set bits** (Brian Kernighan): loop `n &= (n-1)` until 0 → count iterations।

---

**Q86: Tower of Hanoi তে n disk এ কত moves লাগে?**

**2ⁿ - 1** moves। n=3 → 7, n=4 → 15, n=10 → 1023। Algorithm: (1) n-1 disks → auxiliary, (2) nth disk → destination, (3) n-1 disks → destination। Recursive solution natural।

---

**Q87: `realloc(NULL, size)` কী return করে?**

**`malloc(size)` এর equivalent!** realloc special cases: `realloc(NULL, sz)` = malloc(sz)। `realloc(ptr, 0)` = implementation-defined (may free)। realloc **may move** block → always use **temp pointer!**

---

**Q88: Fibonacci naive recursion কেন O(2ⁿ)?**

প্রতি call **2টি নতুন call** তৈরি করে → **binary tree** of calls → exponential growth। fib(5) = 15 calls! fib(40) = **seconds** লাগে! Fix: **memoization** (cache results) → O(n), বা **iterative** → O(n) time, O(1) space।

---

**Q89: Head recursion ও Tail recursion এর output পার্থক্য কী?**

**Head** (call আগে, work পরে) → output **ascending** (1,2,3,4)। **Tail** (work আগে, call পরে) → output **descending** (4,3,2,1)। **Both sides** → output **mirror** (3,2,1,1,2,3)। Output prediction এর key knowledge!

---

**Q90: `strstr()` কী করে?**

**Substring** search — haystack এ needle খোঁজে। Found → pointer to first occurrence। Not found → **NULL**। `strstr("Hello World", "World")` → pointer to "World" (index 6)। Rotation check: `strstr(s1s1, s2)` trick!

---

**Q91: Compilation ও Linking এর পার্থক্য কী?**

**Compilation:** source → object file (`.o`)। Syntax check, type check। Prototype আছে → compile OK। **Linking:** object files → executable। Definition খোঁজে। Prototype আছে কিন্তু definition নেই → **Linker Error** (not compilation error!)।

---

**Q92: `static` function কী করে?**

Function কে **file-private** করে (internal linkage)। অন্য file থেকে call করা **যায় না** — `extern` দিয়েও না। **Encapsulation** এর জন্য useful — helper functions private রাখুন।

---

**Q93: `for` loop এ continue vs `while` loop এ continue?**

`for` loop: continue → **update part (i++) execute হয়** → safe! `while` loop: continue → **manual increment skip হতে পারে** → **infinite loop risk!** `while(i<5) { if(i==3) continue; i++; }` → infinite at i=3!

---

**Q94: `sprintf()` ও `snprintf()` এর পার্থক্য কী?**

`sprintf(buf, fmt, ...)` = formatted string বানায় — **no size limit** → buffer overflow risk! `snprintf(buf, size, fmt, ...)` = max `size-1` chars + `'\0'` → **safe!** Always prefer `snprintf`।

---

**Q95: Endianness কী?**

Multi-byte data **byte order** — **Little-endian:** LSB first (x86, ARM)। **Big-endian:** MSB first (network byte order)। `int x = 0x12345678;` → little: `78 56 34 12`, big: `12 34 56 78`। Union দিয়ে detect: `union{int i; char c;} u={1}; u.c==1 → little`।

---

**Q96: `n << k` ও `n >> k` কী করে?**

Left shift `<<` = n × 2ᵏ (multiply by power of 2)। Right shift `>>` = n ÷ 2ᵏ (integer divide by power of 2)। `5 << 3` = 5 × 8 = **40**। `40 >> 3` = 40 ÷ 8 = **5**। Bitwise operations CPU level এ fastest!

---

**Q97: `~x` = কত?**

**`-(x+1)`** (2's complement rule)। `~0` = **-1** (all bits 1)। `~5` = **-6**। `~(-1)` = **0**। Bitwise NOT = সব bit **flip**। 5 = `00000101` → ~5 = `11111010` = -6 (2's complement)।

---

**Q98: `qsort()` কিভাবে কাজ করে?**

Standard library sort function। `qsort(base, count, size, compare_func)`। **Function pointer** দিয়ে compare function pass করা হয়। `const void*` parameter → **any type** sort পারে। Compare: negative = a first, 0 = equal, positive = b first।

---

**Q99: Stringize (`#`) ও Token paste (`##`) macro কী?**

`#` = argument কে **string** এ convert: `#define STR(x) #x` → `STR(hello)` = `"hello"`। `##` = দুটো token **join** করে: `#define CONCAT(a,b) a##b` → `CONCAT(var,1)` = `var1`। Macro metaprogramming এ useful।

---

**Q100: C program এর compilation stages কয়টি ও কী কী?**

**4 stages:**

```
1. Preprocessing  → #include, #define expand → .i file
2. Compilation    → C code → Assembly code → .s file
3. Assembly       → Assembly → Machine code → .o file
4. Linking        → .o files + libraries → executable

Command: gcc -E (preprocess) → gcc -S (compile) → gcc -c (assemble) → gcc (link)
```

Preprocessor → Compiler → Assembler → **Linker** = final executable!

---
---

<div align="center">

# 🎉 সম্পূর্ণ!

## C Programming — Competitive Job Exam Complete Guide

**37 Topics + 100 Interview Q&A | 300+ MCQ | 150+ Written Problems**

</div>

---

<div align="center">

**Author: Md. Sahabuddin Hossain**

Version 1.0 | April 2026

<br>

<img src="https://img.shields.io/badge/Language-C-blue?style=flat-square&logo=c&logoColor=white" alt="C" />
<img src="https://img.shields.io/badge/Topics-37-green?style=flat-square" alt="37" />
<img src="https://img.shields.io/badge/License-Free_for_Learning-brightgreen?style=flat-square" alt="Free" />

<br><br>

*Basic থেকে Advanced পর্যন্ত সম্পূর্ণ guide — BCS, Bank, IT Company, Govt & Private Job Exam*

**[Back to Top](#c-programming)**

</div>

---

## 🔗 Navigation

- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 07 — Math, Search & Sort](07-math-search-sort.md)
