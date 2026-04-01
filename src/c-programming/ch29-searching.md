# Topic 29: Linear Search & Binary Search

<div align="center">

*"Search = data খোঁজা — Linear হলো সহজ, Binary হলো দ্রুত"*

</div>

---

## 💻 29.1 Linear Search — O(n)

```c
/* ══════ Simple: check every element ══════ */
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target)
            return i;          /* found! return index */
    return -1;                 /* not found */
}

/* ⚡ Works on: sorted OR unsorted array
   ⚡ Time: O(n) — worst case check all elements
   ⚡ Space: O(1) */
```

---

## 💻 29.2 Binary Search — O(log n)

```c
/* ══════ Iterative (preferred!) ══════ */
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;  /* ⚡ avoids overflow! */

        if (arr[mid] == target) return mid;      /* found! */
        else if (arr[mid] < target) low = mid + 1;   /* right half */
        else high = mid - 1;                          /* left half */
    }
    return -1;  /* not found */
}

/* ══════ Recursive ══════ */
int binarySearchRec(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;

    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, mid + 1, high, target);
    return binarySearchRec(arr, low, mid - 1, target);
}

/* ⚡ REQUIRES: SORTED array!
   ⚡ Time: O(log n) — halves search space each step
   ⚡ Space: O(1) iterative, O(log n) recursive */
```

```
Binary Search Visualization:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1: low=0, high=9, mid=4 → arr[4]=16 < 23 → low=5
Step 2: low=5, high=9, mid=7 → arr[7]=56 > 23 → high=6
Step 3: low=5, high=6, mid=5 → arr[5]=23 = 23 → FOUND! index 5

Only 3 steps for 10 elements! (log₂10 ≈ 3.3)
```

---

## 📖 29.3 Comparison

```
┌──────────────┬──────────────┬──────────────┐
│ Feature      │ Linear       │ Binary       │
├──────────────┼──────────────┼──────────────┤
│ Sorted needed│ ❌ No        │ ✅ Yes!       │
│ Time (worst) │ O(n)         │ O(log n)     │
│ Time (best)  │ O(1)         │ O(1)         │
│ Space        │ O(1)         │ O(1) iter    │
│ 1000 elements│ ~1000 checks │ ~10 checks!  │
│ 1M elements  │ ~1M checks   │ ~20 checks!  │
└──────────────┴──────────────┴──────────────┘
```

---

## ❓ 29.4 MCQ Problems

---

**MCQ 1:** Binary search এর prerequisite কী?

| Option | Answer |
|--------|--------|
| (a) Array must be large | |
| (b) **Array must be SORTED** | ✅ |
| (c) Array must have no duplicates | |
| (d) কোনো prerequisite নেই | |

---

**MCQ 2:** 1024 elements এ binary search → max কতবার compare?

| Option | Answer |
|--------|--------|
| (a) 1024 | |
| (b) 512 | |
| (c) **10** | ✅ |
| (d) 100 | |

> log₂(1024) = **10**

---

**MCQ 3:** `mid = (low + high) / 2` এর সমস্যা কী?

| Option | Answer |
|--------|--------|
| (a) কোনো সমস্যা নেই | |
| (b) **Integer overflow possible!** | ✅ |
| (c) Slower | |
| (d) Wrong result | |

> low+high overflow হতে পারে! Fix: `mid = low + (high - low) / 2`

---

**MCQ 4:** Unsorted array তে কোন search ব্যবহার করবেন?

| Option | Answer |
|--------|--------|
| (a) Binary | |
| (b) **Linear** | ✅ |
| (c) উভয়ই | |
| (d) কোনোটাই না | |

> Binary search **sorted array** এ কাজ করে! Unsorted → **linear** only

---

## 📝 29.5 Summary

- **Linear search:** O(n), unsorted/sorted দুটোতেই কাজ করে। Simple but slow for large data

- **Binary search:** O(log n), **sorted array mandatory!** প্রতি step এ search space **অর্ধেক** হয়। 1M elements → মাত্র ~20 comparisons!

- **mid calculation:** `mid = low + (high-low)/2` ব্যবহার করুন — `(low+high)/2` **overflow** হতে পারে!

- Binary search **iterative** version preferred — recursive এ O(log n) stack space লাগে

---
---
