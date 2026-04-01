# Topic 13: 1D Array

<div align="center">

*"Array = contiguous memory তে same type এর data collection, 0-indexed"*

</div>

---

## 📖 13.1 ধারণা (Concept)

```
int arr[5] = {10, 20, 30, 40, 50};

Memory Layout:
Index:    [0]    [1]    [2]    [3]    [4]
        ┌──────┬──────┬──────┬──────┬──────┐
Value:  │  10  │  20  │  30  │  40  │  50  │
        └──────┴──────┴──────┴──────┴──────┘
Address: 1000   1004   1008   1012   1016

⚡ Index starts from 0!
⚡ arr[5] → OUT OF BOUNDS! (UB, no error in C)
⚡ sizeof(arr) = 5 × 4 = 20 bytes
⚡ Element count = sizeof(arr) / sizeof(arr[0]) = 5
```

---

## 💻 13.2 Declaration & Initialization

```c
int a[5] = {10, 20, 30, 40, 50};  /* full init */
int b[5] = {10, 20};              /* partial: {10,20,0,0,0} */
int c[5] = {0};                   /* all zeros: {0,0,0,0,0} */
int d[] = {10, 20, 30};           /* auto size: 3 elements */
int e[5] = {[0]=5, [3]=30};       /* designated (C99): {5,0,0,30,0} */

int f[5];                          /* ⚠️ local: GARBAGE values! */
static int g[5];                   /* ✅ static: all zeros */
```

> **Partial init rule:** explicitly initialized হলে বাকি = **0**। কিন্তু **uninitialized local** array = **garbage!**

---

## 💻 13.3 Array & Pointer Relationship

```c
/* arr[i] = *(arr + i) = *(i + arr) = i[arr] — ALL IDENTICAL! */

int arr[] = {10, 20, 30};
printf("%d\n", arr[1]);       /* 20 */
printf("%d\n", *(arr + 1));   /* 20 */
printf("%d\n", 1[arr]);       /* 20 ⚠️ valid! */

/* Array name = constant pointer to first element */
/* arr = &arr[0] */
/* arr++ → ❌ Error! arr is NOT modifiable */
/* int *p = arr; p++ → ✅ pointer variable is modifiable */
```

---

## 💻 13.4 Array in Function — Decay to Pointer

```c
void printArr(int arr[], int size) {
    /* ⚠️ sizeof(arr) = 4/8 (POINTER size, NOT array size!) */
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);

    arr[0] = 999;  /* ⚠️ ORIGINAL array modified! */
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);  /* 5 (correct in main) */
    printArr(arr, size);  /* must pass size separately! */
    printf("\narr[0] = %d\n", arr[0]);  /* 999 — changed! */
}
```

---

## ❓ 13.5 MCQ Problems

---

**MCQ 1:** `int arr[5] = {1, 2};` — `arr[3]` এর value?

| Option | Answer |
|--------|--------|
| (a) Garbage | |
| (b) **0** | ✅ |
| (c) 2 | |
| (d) Error | |

> Partial init: বাকি = **0**

---

**MCQ 2:** `arr[2]` ও `2[arr]` — সম্পর্ক?

| Option | Answer |
|--------|--------|
| (a) শুধু arr[2] valid | |
| (b) শুধু 2[arr] valid | |
| (c) **দুটোই identical** | ✅ |
| (d) দুটোই ভুল | |

> `arr[2]` = `*(arr+2)` = `*(2+arr)` = `2[arr]`

---

**MCQ 3:** Function এ array pass করলে `sizeof(arr)` কত?

| Option | Answer |
|--------|--------|
| (a) Array total bytes | |
| (b) Element count | |
| (c) **Pointer size (4 or 8)** | ✅ |
| (d) Error | |

> Array → pointer decay! sizeof = pointer size, NOT array size

---

**MCQ 4:** নিচের কোডে কী হবে?
```c
int arr[3] = {1,2,3};
arr = {4,5,6};
```

| Option | Answer |
|--------|--------|
| (a) arr updated | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) arr unchanged | |

> Array **re-assignment impossible!** Initializer শুধু declaration এ কাজ করে

---

**MCQ 5:** `int arr[] = {10,20,30,40}; int *p = arr+3; p[-1]` = ?

| Option | Answer |
|--------|--------|
| (a) 20 | |
| (b) **30** | ✅ |
| (c) 40 | |
| (d) Error | |

> p = &arr[3], p[-1] = *(p-1) = arr[2] = **30**

---

## 📝 13.6 Summary

- Array = **same type**, **contiguous memory**, **0-indexed**। `arr[5]` = 5 elements: index 0 to 4।

- **Partial init** → বাকি **0**; `{0}` = সব 0; **uninitialized local = garbage!**

- **`arr[i]` = `*(arr+i)` = `i[arr]`** — সব identical! Array name = &arr[0] (constant pointer)।

- **sizeof(arr)** main এ = total bytes; function এ = **pointer size** (4/8)! Size আলাদা pass করুন।

- Function এ array = **pointer** pass → modify করলে **original** ও change হয়! Protection: `const int arr[]`

- **Out of bounds** access → C তে **কোনো error নেই**, কিন্তু **Undefined Behavior!**

---
---
