# Topic 22: Union & Enum

<div align="center">

*"Union = shared memory, Enum = named constants — দুটোই exam favourite"*

</div>

---

## 📖 22.1 Union — All Members Share Same Memory

```
struct Data { int i; float f; char c; };  → sizeof = 12 (separate)
union  Data { int i; float f; char c; };  → sizeof = 4  (shared!)

union Memory:
┌──────────────┐
│ i / f / c    │  ← ALL OVERLAP! Same memory!
│   4 bytes    │
└──────────────┘
sizeof(union) = sizeof(LARGEST member)
⚠️ Only LAST written member is valid!
```

```c
union Data d;
d.i = 42;    printf("%d\n", d.i);  /* 42 ✅ */
d.f = 3.14;  printf("%d\n", d.i);  /* ⚠️ GARBAGE! f overwrote i */
```

---

## 💻 22.2 Tagged Union — Practical Pattern

```c
typedef enum { TYPE_INT, TYPE_FLOAT, TYPE_STR } DataType;

typedef struct {
    DataType type;       /* "tag" — কোন member active? */
    union {
        int intVal;
        float floatVal;
        char strVal[50];
    };  /* anonymous union (C11) */
} Variant;

void print(const Variant *v) {
    switch (v->type) {
        case TYPE_INT:   printf("%d\n", v->intVal);     break;
        case TYPE_FLOAT: printf("%.2f\n", v->floatVal); break;
        case TYPE_STR:   printf("%s\n", v->strVal);     break;
    }
}
/* ⚡ This is how dynamic languages (Python, JS) store variables! */
```

---

## 📖 22.3 Enum — Named Integer Constants

```c
/* ══════ Basic enum ══════ */
enum Direction { NORTH, SOUTH, EAST, WEST };
/* NORTH=0, SOUTH=1, EAST=2, WEST=3 (auto from 0) */

/* ══════ Custom values ══════ */
enum Month { JAN = 1, FEB, MAR, APR, MAY, JUN,
             JUL, AUG, SEP, OCT, NOV, DEC };
/* JAN=1, FEB=2, ... DEC=12 (auto-increment after custom) */

/* ══════ Bit flags (powers of 2) ══════ */
typedef enum {
    PERM_READ    = 1,    /* 001 */
    PERM_WRITE   = 2,    /* 010 */
    PERM_EXECUTE = 4     /* 100 */
} Permission;

int perm = PERM_READ | PERM_WRITE;    /* combine: 011 */
if (perm & PERM_READ) { /* check */ }
perm &= ~PERM_WRITE;                  /* remove: 001 */
```

```
Enum Rules:
━━━━━━━━━━━
• sizeof(enum) = sizeof(int) = 4 (always in C!)
• ⚠️ No type safety! enum var = 999; → compiles!
• Duplicate values allowed: A=1, B=1 → OK!
• Values global scope → name collision possible!
• Auto-increment after custom value: A=5, B, C → B=6, C=7
```

---

## ❓ 22.4 MCQ Problems

---

**MCQ 1:** `union U{int i;float f;char c;}; sizeof(union U)` = ?

| Option | Answer |
|--------|--------|
| (a) 9 | |
| (b) **4** | ✅ |
| (c) 1 | |
| (d) 12 | |

> sizeof(union) = **largest member** = int/float = **4**

---

**MCQ 2:** `union U u; u.i=10; u.f=3.14; printf("%d",u.i);` — output?

| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 3 | |
| (c) **Garbage** | ✅ |
| (d) Error | |

> u.f overwrote u.i! Only **last written** member valid

---

**MCQ 3:** `enum E{A=5, B, C, D=20, E_val};` — C ও E_val = ?

| Option | Answer |
|--------|--------|
| (a) C=6, E_val=20 | |
| (b) **C=7, E_val=21** | ✅ |
| (c) C=2, E_val=4 | |
| (d) C=7, E_val=22 | |

> A=5, B=**6**, C=**7** (auto). D=20, E_val=**21** (auto after D)

---

**MCQ 4:** `union U{int i; char c;}; u.i=65; printf("%c",u.c);`

| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **A** | ✅ |
| (c) Garbage | |
| (d) Error | |

> Same memory! i=65 → c reads first byte = 65 = **'A'** (little-endian)

---

**MCQ 5:** `union{char c; int arr[10]; double d;}` — sizeof?

| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) 1 | |
| (c) **40** | ✅ |
| (d) 49 | |

> Largest member = int arr[10] = **40** bytes

---

## 📝 22.5 Summary

- **Union:** সব member **একই memory** share → একই সময়ে **শুধু একটি valid**। sizeof = **largest member**

- **Tagged union** (enum + union): কোন member active তা **tag দিয়ে track** — JSON parser, interpreter এ ব্যবহৃত

- **Enum:** named **integer constants** — readability বাড়ায়। Default 0 থেকে, auto-increment। sizeof = **sizeof(int) = 4**

- **Enum bit flags:** values = powers of 2 → combine `|`, check `&`, remove `&= ~flag`, toggle `^=`

- Enum **no type safety** — `enum Color c = 999;` compiles! Duplicate values **allowed**

---
---
