# Topic 21: Structure

<div align="center">

*"Structure = বিভিন্ন type এর data একটি নামে group করা — custom data type"*

</div>

---

## 📖 21.1 ধারণা (Concept)

```
struct Student {
    char name[50];     /* string */
    int id;            /* integer */
    float gpa;         /* float */
};

Memory:
┌──────────────────────────────────────────┐
│  name (50 bytes)  │ id (4B) │ gpa (4B)   │  + padding!
└──────────────────────────────────────────┘

⚡ struct groups DIFFERENT types together
⚡ Array groups SAME type together
```

---

## 💻 21.2 Declaration, Initialization, Access

```c
#include <stdio.h>
#include <string.h>

/* ══════ typedef = cleaner (no "struct" keyword needed) ══════ */
typedef struct {
    char name[50];
    int id;
    float gpa;
} Student;

int main() {
    /* Initializer list */
    Student s1 = {"Rahim", 101, 3.75};

    /* Designated initializer (C99) — any order! */
    Student s2 = {.gpa = 3.92, .name = "Fatema", .id = 102};

    /* Member by member */
    Student s3;
    strcpy(s3.name, "Karim");   /* ⚠️ string = strcpy, not = */
    s3.id = 103;
    s3.gpa = 3.60;

    /* Access: dot (.) for variable, arrow (->) for pointer */
    printf("%s — GPA: %.2f\n", s1.name, s1.gpa);

    Student *p = &s1;
    printf("%s — ID: %d\n", p->name, p->id);
    /* p->member = (*p).member */

    return 0;
}
```

---

## 💻 21.3 struct in Function & Array of Structures

```c
/* ══════ Pass by pointer = cheap & can modify ══════ */
void updateGPA(Student *s, float newGPA) {
    s->gpa = newGPA;   /* modifies original! */
}

/* ══════ Pass by const pointer = cheap & safe ══════ */
void printStudent(const Student *s) {
    printf("[%d] %s — %.2f\n", s->id, s->name, s->gpa);
}

int main() {
    /* ══════ Array of Structures ══════ */
    Student class[] = {
        {"Rahim", 101, 3.75},
        {"Fatema", 102, 3.92},
        {"Karim", 103, 3.60}
    };
    int n = sizeof(class) / sizeof(class[0]);

    /* Sort by GPA (bubble sort) */
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (class[j].gpa < class[j+1].gpa) {
                Student temp = class[j];    /* ⚡ struct copy! */
                class[j] = class[j+1];
                class[j+1] = temp;
            }

    for (int i = 0; i < n; i++)
        printStudent(&class[i]);
}
```

---

## 💻 21.4 Nested Structure & Self-Referential

```c
/* ══════ Nested struct ══════ */
typedef struct { int day, month, year; } Date;

typedef struct {
    char name[50];
    Date dob;           /* nested! */
    Date admission;
} Student;

/* Access: s.dob.year, p->dob.month */

/* ══════ Self-referential (Linked List node) ══════ */
typedef struct Node {
    int data;
    struct Node *next;  /* ⚠️ must use "struct Node", not just "Node" */
} Node;                 /* typedef complete হওয়ার আগে body তে Node use করা যায় না */
```

---

## 💻 21.5 Structure Padding — sizeof Trap!

```c
struct A { char c; int i; char d; };
/* ⚠️ sizeof ≠ 1+4+1 = 6! */
/* Actual: 1 + 3(pad) + 4 + 1 + 3(pad) = 12! */

struct B { int i; char c; char d; };
/* Better: 4 + 1 + 1 + 2(pad) = 8 (less padding!) */

/* ⚡ Rule: order members LARGEST → SMALLEST to minimize padding */
/* ⚡ Struct total size = multiple of LARGEST member alignment */
```

```
Alignment Rules:
  char  → 1-byte aligned
  short → 2-byte aligned
  int   → 4-byte aligned
  double→ 8-byte aligned

struct { char c; double d; char e; }
→ 1 + 7(pad) + 8 + 1 + 7(pad) = 24 bytes!

struct { double d; char c; char e; }
→ 8 + 1 + 1 + 6(pad) = 16 bytes (better!)
```

---

## ❓ 21.6 MCQ Problems

---

**MCQ 1:** `struct S s1={10,20}; struct S s2=s1; s2.a=30;` — s1.a?

| Option | Answer |
|--------|--------|
| (a) 30 | |
| (b) **10** | ✅ |
| (c) Error | |
| (d) 20 | |

> `s2=s1` = **value copy**। s2 change → s1 **unchanged!**

---

**MCQ 2:** Struct comparison `s1 == s2` — কী হবে?

| Option | Answer |
|--------|--------|
| (a) Works | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) Compares content | |

> Struct `==` compare **illegal!** Member by member compare করতে হয়

---

**MCQ 3:** `struct { char c; int i; }` — sizeof? (4-byte alignment)

| Option | Answer |
|--------|--------|
| (a) 5 | |
| (b) 6 | |
| (c) **8** | ✅ |
| (d) 4 | |

> char(1) + pad(3) + int(4) = **8**

---

**MCQ 4:** `ptr->name` = ?

| Option | Answer |
|--------|--------|
| (a) *ptr.name | |
| (b) **(*ptr).name** | ✅ |
| (c) ptr.name | |
| (d) &ptr.name | |

> `ptr->x` = `(*ptr).x`। ⚠️ `*ptr.x` = `*(ptr.x)` — সম্পূর্ণ ভিন্ন!

---

**MCQ 5:** `struct{char c; double d; char e;}` — sizeof?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 16 | |
| (c) **24** | ✅ |
| (d) 17 | |

> 1+7(pad)+8+1+7(pad) = **24**। Struct size = multiple of largest (8)

---

## 📝 21.7 Summary

- **struct** = different types একটি নামে group করে। **typedef** দিলে `struct` keyword বারবার লিখতে হয় না।

- **Access:** variable → **dot (`.`)**, pointer → **arrow (`->`)**, `p->x` = `(*p).x`

- **Assignment** (`s2 = s1`) **allowed** (shallow copy)। **Comparison** (`==`) **illegal** — member by member compare

- **sizeof(struct) ≠ sum of members!** **Padding** alignment এর জন্য যোগ হয়। Minimize: members **largest → smallest** order

- **Self-referential:** `struct Node { struct Node *next; }` — **`struct Node`** tag body তে ব্যবহার করতে হয় (typedef complete হওয়ার আগে)

- Function এ **const pointer pass** (`const Student *s`) = cheap (4/8 bytes) ও safe (modify prevent)

---
---
