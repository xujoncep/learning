# Bangladesh Bank IT Exam — C Programming Problems

> **Exam context:** Bangladesh Bank Officer (IT) / AME / Programmer post-এর written exam-এ C programming থেকে এই ধরনের problem আসে। প্রতিটা problem নিজে হাতে লিখে practice করো।

---

## Problem 01 — তিনটি সংখ্যার মধ্যে সবচেয়ে বড়টা খোঁজো

> **Question:** Write a C program to find the largest among three numbers using function.

### সমস্যা বোঝো

তিনটা number দেওয়া থাকবে। আলাদা একটা **function** বানিয়ে সেটার মধ্যে compare করে সবচেয়ে বড়টা return করতে হবে।

### Sample Input / Output

```
Input:
Enter three numbers: 15 7 23

Output:
Largest number = 23
```

```
Input:
Enter three numbers: 100 200 150

Output:
Largest number = 200
```

### কাজের Logic ব্যাখ্যা

```
তিনটা number: a, b, c

ধাপ ১ → a কি b-র চেয়ে বড় এবং c-র চেয়েও বড়?
         যদি হ্যাঁ → a সবচেয়ে বড়

ধাপ ২ → b কি a-র চেয়ে বড় এবং c-র চেয়েও বড়?
         যদি হ্যাঁ → b সবচেয়ে বড়

ধাপ ৩ → উপরের দুটো না হলে → c সবচেয়ে বড়
```

মূল কৌশল: `&&` দিয়ে দুটো condition একসাথে check। `a >= b && a >= c` মানে a অন্য দুজনের চেয়ে ছোট না।

### Complete Code

```c
#include <stdio.h>

int findLargest(int a, int b, int c)
{
    if(a >= b && a >= c)
        return a;
    else if(b >= a && b >= c)
        return b;
    else
        return c;
}

int main()
{
    int x, y, z, largest;

    printf("Enter three numbers: ");
    scanf("%d %d %d", &x, &y, &z);

    largest = findLargest(x, y, z);

    printf("Largest number = %d\n", largest);

    return 0;
}
```

> **Exam tip:** function-এর parameter তিনটা `int`, return type-ও `int`। `main()`-এ শুধু call করলেই হয় — logic আলাদা রাখা ভালো practice।

---

## Problem 02 — সংখ্যাটা Prime কিনা বলো

> **Question:** Write a C program to check whether a number is prime or not.

### সমস্যা বোঝো

একটা number দেওয়া হবে। বলতে হবে সেটা **Prime** কিনা।

**Prime number:** যে সংখ্যাটা শুধু ১ এবং নিজের দিয়ে বিভাজ্য। যেমন: 2, 3, 5, 7, 11, 13…

### Sample Input / Output

```
Input:
Enter a number: 7

Output:
7 is a Prime Number.
```

```
Input:
Enter a number: 12

Output:
12 is not a Prime Number.
```

### কাজের Logic ব্যাখ্যা

```
n = input number
flag = 1  (শুরুতে ধরে নাও prime)

যদি n <= 1 → prime না (flag = 0)

loop: i = 2 থেকে n/2 পর্যন্ত
    যদি n % i == 0 হয়  →  কোনো একটা দিয়ে বিভাজ্য
                          prime না (flag = 0), loop break

শেষে:
    flag == 1 → Prime
    flag == 0 → Prime না
```

**কেন `n/2` পর্যন্ত?** কারণ n-এর বড় factor কখনো `n/2` এর বেশি হয় না — তাই অর্ধেক পর্যন্ত check করলেই যথেষ্ট।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i, flag = 1;

    printf("Enter a number: ");
    scanf("%d", &n);

    if(n <= 1)
        flag = 0;

    for(i = 2; i <= n / 2; i++)
    {
        if(n % i == 0)
        {
            flag = 0;
            break;
        }
    }

    if(flag == 1)
        printf("%d is a Prime Number.\n", n);
    else
        printf("%d is not a Prime Number.\n", n);

    return 0;
}
```

> **Exam tip:** `flag` variable-এর technique টা মনে রাখো — অনেক problem-এ এই pattern কাজে লাগে।

---

## Problem 03 — String উল্টো করো (strrev() ছাড়া)

> **Question:** Write a C program to reverse a string without using strrev().

### সমস্যা বোঝো

একটা string input নেওয়া হবে। Built-in `strrev()` function ব্যবহার না করে নিজে logic লিখে সেটা উল্টো করে print করতে হবে।

### Sample Input / Output

```
Input:
Enter a string: hello

Output:
Reversed string: olleh
```

```
Input:
Enter a string: Bangladesh

Output:
Reversed string: hsedalagnaB
```

### কাজের Logic ব্যাখ্যা

```
string: h e l l o
index:  0 1 2 3 4
length = 5

Two-pointer technique:
  i শুরু → 0 (বাম দিক)
  বিপরীত → length - i - 1 (ডান দিক)

Swap করো:
  i=0: str[0] ↔ str[4]  →  o e l l h
  i=1: str[1] ↔ str[3]  →  o l l e h  (wait: o e l l h → o l l e h)
  i=2: মাঝখানে, loop শেষ (length/2 = 2)

Result: o l l e h  →  olleh ✓
```

মূল কৌশল: **দুই প্রান্ত থেকে ভেতরের দিকে** আসতে আসতে swap।

### Complete Code

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100], temp;
    int i, length;

    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);

    /* fgets শেষে '\n' আসে, সেটা সরাই */
    length = strlen(str);
    if(str[length - 1] == '\n')
    {
        str[length - 1] = '\0';
        length--;
    }

    for(i = 0; i < length / 2; i++)
    {
        temp = str[i];
        str[i] = str[length - i - 1];
        str[length - i - 1] = temp;
    }

    printf("Reversed string: %s\n", str);

    return 0;
}
```

> **Exam tip:** Exam-এ `gets()` লেখা যাবে — কিন্তু জানো যে এটা unsafe। `fgets()` হলো safer alternative।

---

## Problem 04 — Factorial বের করো (Recursion দিয়ে)

> **Question:** Write a C program to find factorial of a number using recursion.

### সমস্যা বোঝো

একটা number n দেওয়া হবে। **Recursion** ব্যবহার করে `n!` বের করতে হবে।

**Factorial:** `5! = 5 × 4 × 3 × 2 × 1 = 120`

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
Factorial = 120
```

```
Input:
Enter a number: 0

Output:
Factorial = 1
```

### কাজের Logic ব্যাখ্যা

```
Recursion মানে: function নিজেকেই call করে

factorial(5)
  = 5 × factorial(4)
      = 4 × factorial(3)
          = 3 × factorial(2)
              = 2 × factorial(1)
                  = 1 × factorial(0)
                          ↓
                       return 1  ← Base case

এখন ফিরে আসে:
  1 × 1 = 1
  2 × 1 = 2
  3 × 2 = 6
  4 × 6 = 24
  5 × 24 = 120  ✓
```

**Base case:** `n == 0` বা `n == 1` হলে `return 1` — না হলে infinite loop হবে।

### Complete Code

```c
#include <stdio.h>

long long factorial(int n)
{
    if(n == 0 || n == 1)
        return 1;
    else
        return n * factorial(n - 1);
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Factorial = %lld\n", factorial(n));

    return 0;
}
```

> **Exam tip:** `long long` ব্যবহার করো কারণ factorial দ্রুত বড় হয়। `int` দিয়ে 13! এর পরেই overflow হয়। `%lld` হলো `long long`-এর format specifier।

---

## Problem 05 — Array Ascending Order-এ Sort করো (Bubble Sort)

> **Question:** Write a C program to sort an array in ascending order using Bubble Sort.

### সমস্যা বোঝো

n টা number-এর একটা array নেওয়া হবে। **Bubble Sort** algorithm দিয়ে সেগুলো ছোট থেকে বড় ক্রমে সাজাতে হবে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
64 34 25 12 22

Output:
Sorted array:
12 22 25 34 64
```

### কাজের Logic ব্যাখ্যা

```
Array: [64, 34, 25, 12, 22]

Pass 1 (i=0): পাশাপাশি compare করো, বড়টা ডানে পাঠাও
  64 > 34 → swap → [34, 64, 25, 12, 22]
  64 > 25 → swap → [34, 25, 64, 12, 22]
  64 > 12 → swap → [34, 25, 12, 64, 22]
  64 > 22 → swap → [34, 25, 12, 22, 64]  ← 64 শেষে গেছে ✓

Pass 2 (i=1): শেষ element বাদ দিয়ে আবার
  → [25, 12, 22, 34, 64]  ← 34 তার জায়গায় ✓

Pass 3, 4...: একইভাবে
  → [12, 22, 25, 34, 64]  ✓
```

**প্রতিটা pass-এ সবচেয়ে বড় element ডানে "bubble up" করে যায়** — তাই নাম Bubble Sort।

**Time Complexity:** O(n²) — exam-এ জিজ্ঞেস করতে পারে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, j, temp;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");
    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    /* Bubble Sort */
    for(i = 0; i < n - 1; i++)
    {
        for(j = 0; j < n - i - 1; j++)
        {
            if(arr[j] > arr[j + 1])
            {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    printf("Sorted array:\n");
    for(i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
```

> **Exam tip:** Inner loop `j < n - i - 1` কেন? কারণ প্রতিটা pass-এ শেষের `i` টা element ইতিমধ্যে sorted — তাদের আর compare করার দরকার নেই।

---

## সংক্ষিপ্ত Summary

| # | সমস্যা | মূল Concept | Time Complexity |
|---|--------|-------------|-----------------|
| 01 | Largest of three | Function, conditional | O(1) |
| 02 | Prime check | Loop, flag variable | O(n) |
| 03 | String reverse | Two-pointer, swap | O(n) |
| 04 | Factorial | Recursion, base case | O(n) |
| 05 | Bubble Sort | Nested loop, swap | O(n²) |

> **Practice tip:** প্রতিটা code কাগজে লেখো — exam-এ কম্পিউটার থাকবে না।
