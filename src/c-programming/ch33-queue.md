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
