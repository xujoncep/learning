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
