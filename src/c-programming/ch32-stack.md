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
