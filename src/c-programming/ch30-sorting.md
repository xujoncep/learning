# Topic 30: Bubble Sort, Selection Sort, Insertion Sort

<div align="center">

*"Sorting = data সাজানো — exam এ algorithm, complexity, ও trace জিজ্ঞেস করা হয়"*

</div>

---

## 💻 30.1 Bubble Sort — O(n²)

```c
/* ══════ Adjacent elements compare & swap ══════ */
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {  /* ⚡ n-i-1: already sorted! */
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;   /* ⚡ early exit: already sorted! */
    }
}

/* Pass 1: largest element → end
   Pass 2: 2nd largest → 2nd last
   ...continues until sorted */
```

```
Trace: [64, 34, 25, 12, 22]
Pass 1: [34,25,12,22,64]  ← 64 bubbled to end
Pass 2: [25,12,22,34,64]  ← 34 in place
Pass 3: [12,22,25,34,64]  ← sorted!
(early exit — no swaps needed in pass 4)
```

---

## 💻 30.2 Selection Sort — O(n²)

```c
/* ══════ Find min, swap to front ══════ */
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx])
                minIdx = j;

        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

/* Pass 1: find min → swap to index 0
   Pass 2: find min in remaining → swap to index 1
   ...continues */
```

---

## 💻 30.3 Insertion Sort — O(n²)

```c
/* ══════ Insert each element into sorted portion ══════ */
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];   /* shift right */
            j--;
        }
        arr[j + 1] = key;          /* insert at correct position */
    }
}

/* ⚡ Best for: nearly sorted data → O(n) best case!
   ⚡ Stable sort (preserves equal elements' order)
   ⚡ Online sort (can sort as data arrives) */
```

---

## 📖 30.4 Comparison Table

```
┌──────────────┬──────────┬──────────┬──────────┬────────┬────────┐
│ Algorithm    │ Best     │ Average  │ Worst    │ Stable │ Space  │
├──────────────┼──────────┼──────────┼──────────┼────────┼────────┤
│ Bubble       │ O(n)     │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
│ Selection    │ O(n²)    │ O(n²)   │ O(n²)   │ ❌ No   │ O(1)   │
│ Insertion    │ O(n) ⚡  │ O(n²)   │ O(n²)   │ ✅ Yes  │ O(1)   │
└──────────────┴──────────┴──────────┴──────────┴────────┴────────┘

⚡ Insertion sort best case O(n) — nearly sorted data তে fastest!
⚡ Selection sort — minimum number of SWAPS (useful when swap costly)
⚡ Bubble sort — simplest to understand, worst practical performance
```

---

## ❓ 30.5 MCQ Problems

---

**MCQ 1:** Bubble sort এর best case complexity?

| Option | Answer |
|--------|--------|
| (a) O(n²) | |
| (b) **O(n)** | ✅ |
| (c) O(n log n) | |
| (d) O(1) | |

> Already sorted + **swapped flag** → 1 pass, no swaps → **O(n)**

---

**MCQ 2:** কোন sort এ minimum number of swaps হয়?

| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) **Selection** | ✅ |
| (c) Insertion | |
| (d) সবাই equal | |

> Selection sort: প্রতি pass এ **সর্বোচ্চ 1 swap** (min element কে swap)

---

**MCQ 3:** Nearly sorted data তে কোন sort সবচেয়ে ভালো?

| Option | Answer |
|--------|--------|
| (a) Bubble | |
| (b) Selection | |
| (c) **Insertion** | ✅ |
| (d) সবাই equal | |

> Insertion sort nearly sorted → **O(n)** (best case!)

---

**MCQ 4:** কোনটি stable sort?

| Option | Answer |
|--------|--------|
| (a) Selection | |
| (b) **Bubble ও Insertion দুটোই** | ✅ |
| (c) শুধু Bubble | |
| (d) কোনোটাই না | |

> Stable = equal elements এর relative order preserve। Bubble ✅, Insertion ✅, Selection ❌

---

**MCQ 5:** তিনটি sort এর space complexity?

| Option | Answer |
|--------|--------|
| (a) O(n) | |
| (b) **O(1) সবগুলো** | ✅ |
| (c) O(n²) | |
| (d) O(log n) | |

> তিনটিই **in-place** — extra array লাগে না → O(1) space

---

## 📝 30.6 Summary

- **Bubble sort:** adjacent elements compare ও swap করে। বড় element ধীরে ধীরে "bubble up"। `swapped` flag দিলে best case **O(n)** (already sorted detection)। Simplest but slowest practically

- **Selection sort:** প্রতি pass এ **minimum** element খুঁজে front এ swap করে। Swap count **minimum** (per pass max 1)। Swap costly হলে best choice। **Not stable!**

- **Insertion sort:** প্রতিটি element কে sorted portion এ correct position এ **insert** করে। **Nearly sorted data** তে **O(n)** — best among three! **Stable ও online** (streaming data sort possible)

- তিনটিই **O(n²)** average/worst, **O(1)** space (in-place)। বড় data (n > 10000) এ **merge sort** বা **quick sort** (O(n log n)) ব্যবহার করুন

- **Stable sort** = equal value elements এর original **relative order preserve** করে। Bubble ✅, Insertion ✅, Selection ❌

---
---

<div align="center">


*Linked List, Stack, Queue, Bitwise, Preprocessor, Output Tricks — final frontier*

</div>

---
---
