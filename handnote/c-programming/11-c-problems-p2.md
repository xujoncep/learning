# Bangladesh Bank IT Exam — C Programming Problems (Set 2)

> **Problems 06–35** | Topics: String, Fibonacci, Matrix, Search, Swap, Armstrong, GCD, Merge, Power, Recursion, Pointer, Structure

---

## Problem 06 — String-এ Vowel ও Consonant গণনা

> **Question:** Write a C program to count vowels and consonants in a string.

### সমস্যা বোঝো

User একটা string দিবে, আমাদের কাজ হলো সেই string-এ কতগুলো vowel (a, e, i, o, u) এবং কতগুলো consonant (বাকি letters) আছে সেটা গুনে বের করা। Space, digit, special character এগুলো গণনায় ধরা হবে না।

### Sample Input / Output

```
Input:
Enter a string: Hello World

Output:
Vowels = 3
Consonants = 7
```

```
Input:
Enter a string: Bangladesh Bank

Output:
Vowels = 4
Consonants = 10
```

### কাজের Logic ব্যাখ্যা

Step-by-step যা করছি:

1. `gets()` দিয়ে পুরো line input নিলাম (space সহ)।
2. Loop-এ এক এক করে প্রতিটা character check করছি যতক্ষণ না `'\0'` (null terminator) পাই।
3. প্রথমে দেখছি character টা letter কি না — অর্থাৎ A-Z বা a-z এর মধ্যে আছে কি না। এতে digit, space, punctuation বাদ পড়ে যায়।
4. Letter হলে এবার দেখছি সেটা vowel কি না — `a, e, i, o, u` (uppercase + lowercase)। হ্যাঁ হলে `vowels++`, না হলে `consonants++`।

```text
H e l l o   W o r l d
↓ ↓ ↓ ↓ ↓   ↓ ↓ ↓ ↓ ↓
C V C C V   C V C C C   → Vowels=3, Consonants=7
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[100];
    int i = 0, vowels = 0, consonants = 0;

    printf("Enter a string: ");
    gets(str);

    while(str[i] != '\0')
    {
        if((str[i] >= 'A' && str[i] <= 'Z') ||
           (str[i] >= 'a' && str[i] <= 'z'))
        {
            if(str[i] == 'A' || str[i] == 'E' || str[i] == 'I' ||
               str[i] == 'O' || str[i] == 'U' || str[i] == 'a' ||
               str[i] == 'e' || str[i] == 'i' || str[i] == 'o' ||
               str[i] == 'u')
            {
                vowels++;
            }
            else
            {
                consonants++;
            }
        }

        i++;
    }

    printf("Vowels = %d\n", vowels);
    printf("Consonants = %d\n", consonants);

    return 0;
}
```

> **Exam tip:** `gets()` deprecated — exam-এ `gets()` ব্যবহার করলেও পাশে comment করে দাও যে production code-এ `fgets(str, 100, stdin)` use করা উচিত। Examiner impressed হবে।

---

## Problem 07 — Fibonacci Series

> **Question:** Write a C program to find Fibonacci series up to n terms.

### সমস্যা বোঝো

Fibonacci series হলো এমন একটা sequence যেখানে প্রতিটা সংখ্যা তার আগের দুইটা সংখ্যার যোগফল। শুরু হয় `0, 1` দিয়ে — তারপর `0+1=1`, `1+1=2`, `1+2=3`, `2+3=5` এভাবে চলতে থাকে। User n দিবে, আমরা প্রথম n term print করবো।

### Sample Input / Output

```
Input:
Enter number of terms: 7

Output:
Fibonacci Series:
0 1 1 2 3 5 8
```

```
Input:
Enter number of terms: 10

Output:
Fibonacci Series:
0 1 1 2 3 5 8 13 21 34
```

### কাজের Logic ব্যাখ্যা

Logic খুবই simple — দুইটা variable `first` আর `second` রাখলাম যেগুলো sliding window-এর মতো কাজ করে।

```text
Iteration:  first  second  print  next=first+second
   1          0      1       0          1
   2          1      1       1          2
   3          1      2       1          3
   4          2      3       2          5
   5          3      5       3          8
```

প্রতি iteration-এ:
1. `first` print করি।
2. `next = first + second` হিসাব করি।
3. window slide করাই — `first = second`, `second = next`।

এভাবে n বার loop চালালেই n-term-এর series পাওয়া যায়।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;
    int first = 0, second = 1, next;

    printf("Enter number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci Series:\n");

    for(i = 1; i <= n; i++)
    {
        printf("%d ", first);

        next = first + second;
        first = second;
        second = next;
    }

    return 0;
}
```

> **Exam tip:** Examiner প্রায়ই বলে "without using array" — এই solution exactly সেটাই। Time `O(n)`, Space `O(1)`. এই complexity exam-এ লিখে দিলে extra mark পাবা।

---

## Problem 08 — String Palindrome Check

> **Question:** Write a C program to check whether a string is palindrome or not.

### সমস্যা বোঝো

Palindrome হলো এমন string যেটা সামনে থেকে পড়ো বা পেছন থেকে পড়ো — same থাকে। যেমন: `madam`, `level`, `radar`. আর `hello` palindrome না কারণ উল্টা করলে হয় `olleh`.

### Sample Input / Output

```
Input:
Enter a string: madam

Output:
Palindrome String
```

```
Input:
Enter a string: hello

Output:
Not a Palindrome String
```

### কাজের Logic ব্যাখ্যা

Step-by-step:

1. String এর `length` বের করলাম `strlen()` দিয়ে।
2. একটা নতুন array `rev[]` বানালাম — সেখানে original string-এর reverse copy করলাম। `rev[0] = str[length-1]`, `rev[1] = str[length-2]` ... এভাবে।
3. `rev[i] = '\0'` দিয়ে শেষ করলাম যেন valid string হয়।
4. এবার `str` আর `rev` character-by-character compare করলাম। যদি কোথাও mismatch পাই, `flag = 0` করে break।

```text
str    = m a d a m
rev    = m a d a m   → match → Palindrome

str    = h e l l o
rev    = o l l e h   → str[0]='h' ≠ rev[0]='o' → Not Palindrome
```

### Complete Code

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100], rev[100];
    int i, length, flag = 1;

    printf("Enter a string: ");
    gets(str);

    length = strlen(str);

    for(i = 0; i < length; i++)
    {
        rev[i] = str[length - i - 1];
    }

    rev[i] = '\0';

    for(i = 0; i < length; i++)
    {
        if(str[i] != rev[i])
        {
            flag = 0;
            break;
        }
    }

    if(flag == 1)
        printf("Palindrome String\n");
    else
        printf("Not a Palindrome String\n");

    return 0;
}
```

> **Exam tip:** Optimized version — দুইটা pointer `i=0` আর `j=length-1` নিয়ে মধ্যবিন্দু পর্যন্ত যাও, extra array লাগে না। এটা bonus হিসেবে পাশে লিখে দিলে impressive।

---

## Problem 09 — Matrix-এর Transpose

> **Question:** Write a C program to find the transpose of a matrix.

### সমস্যা বোঝো

Matrix-এর transpose মানে row আর column swap করে দেওয়া। যদি original matrix `m × n` size-এর হয়, transpose হবে `n × m`. Element `a[i][j]` চলে যাবে `transpose[j][i]`-এ।

### Sample Input / Output

```
Input:
Enter rows and columns: 2 3
Enter matrix elements:
1 2 3
4 5 6

Output:
Transpose Matrix:
1 4
2 5
3 6
```

```
Input:
Enter rows and columns: 3 2
Enter matrix elements:
7 8
9 10
11 12

Output:
Transpose Matrix:
7 9 11
8 10 12
```

### কাজের Logic ব্যাখ্যা

Core idea একটাই — `transpose[j][i] = a[i][j]`. মানে i আর j-এর জায়গা উল্টে দাও।

```text
Original (2×3):       Transpose (3×2):
  1  2  3                1  4
  4  5  6                2  5
                         3  6

a[0][0]=1 → t[0][0]=1
a[0][1]=2 → t[1][0]=2
a[0][2]=3 → t[2][0]=3
a[1][0]=4 → t[0][1]=4
... 
```

Print করার সময় খেয়াল রাখতে হবে — transpose-এর row হবে original-এর `col`, column হবে original-এর `row`. তাই outer loop `i < col` এবং inner loop `j < row`.

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], transpose[10][10];
    int row, col, i, j;

    printf("Enter rows and columns: ");
    scanf("%d %d", &row, &col);

    printf("Enter matrix elements:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            scanf("%d", &a[i][j]);
        }
    }

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            transpose[j][i] = a[i][j];
        }
    }

    printf("Transpose Matrix:\n");

    for(i = 0; i < col; i++)
    {
        for(j = 0; j < row; j++)
        {
            printf("%d ", transpose[i][j]);
        }

        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Square matrix-এর জন্য in-place transpose সম্ভব (extra array ছাড়া) — শুধু upper triangle-এর element গুলো lower triangle-এর সাথে swap করো। এটা space optimization হিসেবে mention করো।

---

## Problem 10 — Binary Search

> **Question:** Write a C program to search an element in an array using Binary Search.

### সমস্যা বোঝো

Binary Search একটা fast searching technique — কিন্তু **শর্ত হলো array টা sorted থাকতে হবে**। প্রতি step-এ array-কে অর্ধেক করে কেটে ফেলে বলে complexity `O(log n)`। Linear search যেখানে `O(n)`।

### Sample Input / Output

```
Input:
Enter number of elements: 6
Enter sorted array elements:
10 20 30 40 50 60
Enter item to search: 40

Output:
Item found at position 4
```

```
Input:
Enter number of elements: 5
Enter sorted array elements:
1 3 5 7 9
Enter item to search: 6

Output:
Item not found
```

### কাজের Logic ব্যাখ্যা

Algorithm:
1. দুইটা pointer — `low = 0`, `high = n-1`.
2. মাঝখানের index `mid = (low + high) / 2` বের করো।
3. `arr[mid]` কে target item-এর সাথে compare করো:
   - সমান হলে → পাওয়া গেছে, break।
   - target বড় হলে → left half বাদ, `low = mid + 1`.
   - target ছোট হলে → right half বাদ, `high = mid - 1`.
4. `low > high` হয়ে গেলে loop শেষ — পাওয়া যায়নি।

```text
Array: 10 20 30 40 50 60   target = 40
Step 1: low=0, high=5, mid=2, arr[2]=30 < 40 → low=3
Step 2: low=3, high=5, mid=4, arr[4]=50 > 40 → high=3
Step 3: low=3, high=3, mid=3, arr[3]=40 ✓ Found!
```

প্রতি step-এ search space অর্ধেক হয়ে যাচ্ছে — এটাই `O(log n)`-এর secret।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, item;
    int low, high, mid, found = 0;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter sorted array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Enter item to search: ");
    scanf("%d", &item);

    low = 0;
    high = n - 1;

    while(low <= high)
    {
        mid = (low + high) / 2;

        if(arr[mid] == item)
        {
            found = 1;
            break;
        }
        else if(arr[mid] < item)
        {
            low = mid + 1;
        }
        else
        {
            high = mid - 1;
        }
    }

    if(found == 1)
        printf("Item found at position %d\n", mid + 1);
    else
        printf("Item not found\n");

    return 0;
}
```

> **Exam tip:** `mid = (low + high) / 2` লিখলে very large array-এ `low + high` overflow হতে পারে। Better: `mid = low + (high - low) / 2`. Industry-standard answer।

---

## Problem 11 — Third Variable ছাড়া Swap

> **Question:** Write a C program to swap two numbers without using a third variable.

### সমস্যা বোঝো

সাধারণত swap করতে আমরা একটা temporary variable use করি (`temp = a; a = b; b = temp;`)। কিন্তু এই problem-এ temp ছাড়াই দুইটা number-এর value উল্টানো লাগবে। Arithmetic trick দিয়ে সম্ভব।

### Sample Input / Output

```
Input:
Enter two numbers: 5 9

Output:
After swapping:
a = 9
b = 5
```

```
Input:
Enter two numbers: 100 25

Output:
After swapping:
a = 25
b = 100
```

### কাজের Logic ব্যাখ্যা

তিনটা step-এ magic ঘটে:

```text
ধরো a=5, b=9

Step 1: a = a + b    → a = 5+9 = 14, b = 9
Step 2: b = a - b    → b = 14-9 = 5,  a = 14   (b পেলো original a)
Step 3: a = a - b    → a = 14-5 = 9,  b = 5    (a পেলো original b)

Result: a=9, b=5 ✓
```

মূল চিন্তা — দুইটা number-এর sum-কে temporary storage হিসেবে use করছি। প্রথম step-এ sum store করলাম `a`-তে, তারপর subtraction দিয়ে individual value recover করলাম।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a, b;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    a = a + b;
    b = a - b;
    a = a - b;

    printf("After swapping:\n");
    printf("a = %d\n", a);
    printf("b = %d\n", b);

    return 0;
}
```

> **Exam tip:** Addition method-এ overflow হতে পারে যদি `a + b` int range পার করে। Safer alternative: XOR swap → `a^=b; b^=a; a^=b;`. দুটোই লিখে রাখো — examiner choice দেখাতে চাও।

---

## Problem 12 — Diagonal-এর Sum

> **Question:** Write a C program to find the sum of diagonal elements of a matrix.

### সমস্যা বোঝো

Square matrix-এর main diagonal হলো top-left থেকে bottom-right কোণ পর্যন্ত যেসব element — অর্থাৎ যেখানে `row index == column index`. তাদের যোগফল বের করতে হবে।

### Sample Input / Output

```
Input:
Enter order of square matrix: 3
Enter matrix elements:
1 2 3
4 5 6
7 8 9

Output:
Sum of diagonal elements = 15
```

```
Input:
Enter order of square matrix: 2
Enter matrix elements:
10 20
30 40

Output:
Sum of diagonal elements = 50
```

### কাজের Logic ব্যাখ্যা

Diagonal element-এর pattern:

```text
Matrix (3×3):
  [1] 2  3
   4 [5] 6
   7  8 [9]

Diagonal: a[0][0]=1, a[1][1]=5, a[2][2]=9
Sum = 1 + 5 + 9 = 15
```

Logic: শুধু একটা loop চালাই `i = 0` থেকে `n-1`, আর `sum += a[i][i]` করি। দুইটা nested loop লাগবে না কারণ আমরা সব element দেখছি না — শুধু যেখানে row index = column index.

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], n;
    int i, j, sum = 0;

    printf("Enter order of square matrix: ");
    scanf("%d", &n);

    printf("Enter matrix elements:\n");

    for(i = 0; i < n; i++)
    {
        for(j = 0; j < n; j++)
        {
            scanf("%d", &a[i][j]);
        }
    }

    for(i = 0; i < n; i++)
    {
        sum = sum + a[i][i];
    }

    printf("Sum of diagonal elements = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Anti-diagonal (top-right থেকে bottom-left) চাইলে index হবে `a[i][n-1-i]`. দুইটাই জানা থাকলে যেকোনো variation-এ answer দিতে পারবা।

---

## Problem 13 — Number-এর Digit গণনা

> **Question:** Write a C program to count digits of a number.

### সমস্যা বোঝো

User একটা integer দিবে, আমাদের বের করতে হবে সেই number-এ কতগুলো digit আছে। যেমন `12345`-এ 5 টা digit, `7`-এ 1 টা digit।

### Sample Input / Output

```
Input:
Enter a number: 12345

Output:
Total digits = 5
```

```
Input:
Enter a number: 9

Output:
Total digits = 1
```

### কাজের Logic ব্যাখ্যা

Trick হলো repeatedly 10 দিয়ে ভাগ করা। প্রতিবার division-এ একটা digit "চলে যায়"।

```text
n = 12345
Iteration 1: n = 12345/10 = 1234, count = 1
Iteration 2: n = 1234/10  = 123,  count = 2
Iteration 3: n = 123/10   = 12,   count = 3
Iteration 4: n = 12/10    = 1,    count = 4
Iteration 5: n = 1/10     = 0,    count = 5
n == 0 → loop শেষ

Total digits = 5
```

`while(n != 0)` condition use করলে যতক্ষণ digit আছে ততক্ষণ চলবে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, count = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    while(n != 0)
    {
        n = n / 10;
        count++;
    }

    printf("Total digits = %d\n", count);

    return 0;
}
```

> **Exam tip:** Edge case — `n = 0` দিলে output 0 আসবে কিন্তু আসলে 1 digit। Robust solution-এ `if(n == 0) count = 1;` দিয়ে handle করো। Examiner edge case test করে।

---

## Problem 14 — `strcpy()` ছাড়া String Copy

> **Question:** Write a C program to copy one string to another without using strcpy().

### সমস্যা বোঝো

`<string.h>` library-এর `strcpy()` ছাড়াই একটা string-কে আরেকটা string-এ copy করতে হবে। এটা low-level understanding test করে — string আসলে কি, null terminator কেন দরকার।

### Sample Input / Output

```
Input:
Enter a string: Hello

Output:
Copied string: Hello
```

```
Input:
Enter a string: Bangladesh Bank

Output:
Copied string: Bangladesh Bank
```

### কাজের Logic ব্যাখ্যা

String আসলে character array যেটা `'\0'` (null character) দিয়ে শেষ হয়। Copy করা মানে character-by-character ঐ null পর্যন্ত copy করা।

```text
str1 = "Hello\0"

i=0: str2[0] = 'H'
i=1: str2[1] = 'e'
i=2: str2[2] = 'l'
i=3: str2[3] = 'l'
i=4: str2[4] = 'o'
i=5: str1[5] = '\0' → loop break
str2[5] = '\0'  ← নিজে দিতে হবে!

str2 = "Hello\0" ✓
```

**গুরুত্বপূর্ণ:** loop শেষে `str2[i] = '\0'` দিতেই হবে, না হলে `str2` valid string হবে না — printing-এ garbage দেখাবে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str1[100], str2[100];
    int i = 0;

    printf("Enter a string: ");
    gets(str1);

    while(str1[i] != '\0')
    {
        str2[i] = str1[i];
        i++;
    }

    str2[i] = '\0';

    printf("Copied string: %s\n", str2);

    return 0;
}
```

> **Exam tip:** Pointer version আরও short — `while(*str2++ = *str1++);`. এটা একটা classic C idiom। লেখার সাথে comment-এ ব্যাখ্যা করলে interview-তেও কাজে লাগবে।

---

## Problem 15 — Matrix Addition

> **Question:** Write a C program to perform matrix addition.

### সমস্যা বোঝো

দুইটা same dimension-এর matrix-এর corresponding element যোগ করে নতুন একটা matrix বানাতে হবে। Rule: `sum[i][j] = a[i][j] + b[i][j]`।

### Sample Input / Output

```
Input:
Enter rows and columns: 2 2
Enter first matrix:
1 2
3 4
Enter second matrix:
5 6
7 8

Output:
Sum Matrix:
6 8
10 12
```

```
Input:
Enter rows and columns: 2 3
Enter first matrix:
1 1 1
2 2 2
Enter second matrix:
3 3 3
4 4 4

Output:
Sum Matrix:
4 4 4
6 6 6
```

### কাজের Logic ব্যাখ্যা

Step-by-step:

1. দুটি matrix-এর dimension same হতে হবে (এই code ধরে নিচ্ছে user same `row`, `col` দিবে)।
2. Nested loop দিয়ে দুটি matrix input নিচ্ছি।
3. আবার nested loop — প্রতিটা position-এ `sum[i][j] = a[i][j] + b[i][j]`।
4. Result print।

```text
A:           B:           Sum:
1 2          5 6          1+5=6   2+6=8
3 4          7 8          3+7=10  4+8=12
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], b[10][10], sum[10][10];
    int row, col, i, j;

    printf("Enter rows and columns: ");
    scanf("%d %d", &row, &col);

    printf("Enter first matrix:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            scanf("%d", &a[i][j]);
        }
    }

    printf("Enter second matrix:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            scanf("%d", &b[i][j]);
        }
    }

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            sum[i][j] = a[i][j] + b[i][j];
        }
    }

    printf("Sum Matrix:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            printf("%d ", sum[i][j]);
        }

        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Subtraction-ও exactly same pattern — শুধু `+` কে `-` দিয়ে replace। Examiner প্রায়ই difference matrix চায় — answer ready রাখো।

---

## Problem 16 — Armstrong Number

> **Question:** Write a C program to check whether a number is Armstrong or not.

### সমস্যা বোঝো

Armstrong number হলো এমন number যার প্রতিটা digit-এর (digit-count)-তম power-এর যোগফল number-এর সমান। যেমন: `153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153` ✓। `1634 = 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634` ✓।

Formula: একটা $n$-digit number $N$ Armstrong হবে যদি

$$N = \sum_{i=0}^{n-1} d_i^{\,n}$$

যেখানে $d_i$ হলো $N$-এর প্রতিটা digit।

### Sample Input / Output

```
Input:
Enter a number: 153

Output:
153 is an Armstrong Number.
```

```
Input:
Enter a number: 123

Output:
123 is not an Armstrong Number.
```

### কাজের Logic ব্যাখ্যা

দুই pass-এ কাজ করি:

**Pass 1: digit count বের করা**

```text
n = 153
153 → 15 → 1 → 0  (3 step) → digits = 3
```

**Pass 2: প্রতিটা digit-এর `digits`-তম power যোগ করা**

```text
n = 153
remainder = 153 % 10 = 3   → result += 3³ = 27   → result = 27
n = 15
remainder = 15 % 10  = 5   → result += 5³ = 125  → result = 152
n = 1
remainder = 1 % 10   = 1   → result += 1³ = 1    → result = 153
n = 0 → stop

result(153) == original(153) → Armstrong ✓
```

`pow()` function `<math.h>` থেকে আসে — compile time-এ `-lm` flag লাগতে পারে Linux-এ।

### Complete Code

```c
#include <stdio.h>
#include <math.h>

int main()
{
    int n, original, remainder, result = 0, digits = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    original = n;

    while(original != 0)
    {
        original /= 10;
        digits++;
    }

    original = n;

    while(original != 0)
    {
        remainder = original % 10;
        result += pow(remainder, digits);
        original /= 10;
    }

    if(result == n)
        printf("%d is an Armstrong Number.\n", n);
    else
        printf("%d is not an Armstrong Number.\n", n);

    return 0;
}
```

> **Exam tip:** `pow()` returns `double` — float-to-int conversion-এ precision loss হতে পারে (যেমন 124.999999 → 124)। Safer: নিজে integer power function লেখো বা `(int)(pow(...) + 0.5)` round করো।

---

## Problem 17 — GCD (Greatest Common Divisor)

> **Question:** Write a C program to find GCD (Greatest Common Divisor) of two numbers.

### সমস্যা বোঝো

দুইটা number-এর GCD হলো সেই largest number যেটা দিয়ে দুইটাই ভাগ যায় (remainder zero)। যেমন: `gcd(12, 18) = 6` কারণ 6 দিয়ে 12 আর 18 দুটোই ভাগ যায় এবং এর চেয়ে বড় কোনো common divisor নেই।

### Sample Input / Output

```
Input:
Enter two numbers: 12 18

Output:
GCD = 6
```

```
Input:
Enter two numbers: 25 15

Output:
GCD = 5
```

### কাজের Logic ব্যাখ্যা

এটা brute force approach — `i = 1` থেকে শুরু করে `min(a, b)` পর্যন্ত প্রতিটা number check করি। যদি `a` আর `b` দুটোই `i` দিয়ে ভাগ যায়, তখন `gcd = i`. Loop শেষে `gcd`-এ থাকবে largest such `i`।

```text
a = 12, b = 18

i=1:  12%1==0 ✓ AND 18%1==0 ✓ → gcd = 1
i=2:  12%2==0 ✓ AND 18%2==0 ✓ → gcd = 2
i=3:  12%3==0 ✓ AND 18%3==0 ✓ → gcd = 3
i=4:  12%4==0 ✓ AND 18%4==0 ✗ → skip
i=5:  ✗ → skip
i=6:  12%6==0 ✓ AND 18%6==0 ✓ → gcd = 6
i=7..12: কোনোটা নেই
GCD = 6 ✓
```

Loop চলবে `i <= a && i <= b` পর্যন্ত — অর্থাৎ দুইটার মধ্যে যেটা ছোট তার পর্যন্ত।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a, b, gcd, i;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    for(i = 1; i <= a && i <= b; i++)
    {
        if(a % i == 0 && b % i == 0)
        {
            gcd = i;
        }
    }

    printf("GCD = %d\n", gcd);

    return 0;
}
```

> **Exam tip:** Brute force `O(min(a,b))` — large number-এ slow। Efficient solution **Euclidean algorithm**: `gcd(a, b) = gcd(b, a%b)` until `b == 0`. এটা `O(log(min(a,b)))`. দুটো solution-ই জানা থাকলে full mark।

---

## Problem 18 — দুই Array Merge

> **Question:** Write a C program to merge two arrays into a single array.

### সমস্যা বোঝো

দুইটা আলাদা array-কে এক করে একটা বড় array বানাতে হবে। প্রথম array-এর সব element আগে, তারপর দ্বিতীয় array-এর সব element।

### Sample Input / Output

```
Input:
Enter size of first array: 3
Enter first array elements:
1 2 3
Enter size of second array: 4
Enter second array elements:
10 20 30 40

Output:
Merged Array:
1 2 3 10 20 30 40
```

```
Input:
Enter size of first array: 2
Enter first array elements:
5 7
Enter size of second array: 3
Enter second array elements:
9 11 13

Output:
Merged Array:
5 7 9 11 13
```

### কাজের Logic ব্যাখ্যা

Step-by-step:

1. প্রথমে `arr1`-এর সব element `arr3`-এর index 0 থেকে `n1-1` পর্যন্ত copy।
2. তারপর `arr2`-এর element গুলো `arr3`-এর index `n1` থেকে শুরু করে `n1+n2-1` পর্যন্ত copy।
3. দুইটা index একসাথে চালানোর জন্য `i` (arr2-এর জন্য) আর `j` (arr3-এর জন্য) — `for(i=0, j=n1; ...)`.

```text
arr1 = [1, 2, 3]       n1 = 3
arr2 = [10, 20, 30, 40] n2 = 4

Step A (copy arr1):
arr3[0]=1, arr3[1]=2, arr3[2]=3

Step B (copy arr2 starting from index n1=3):
arr3[3]=10, arr3[4]=20, arr3[5]=30, arr3[6]=40

Final arr3 = [1, 2, 3, 10, 20, 30, 40]
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr1[100], arr2[100], arr3[200];
    int n1, n2, i, j;

    printf("Enter size of first array: ");
    scanf("%d", &n1);

    printf("Enter first array elements:\n");

    for(i = 0; i < n1; i++)
    {
        scanf("%d", &arr1[i]);
    }

    printf("Enter size of second array: ");
    scanf("%d", &n2);

    printf("Enter second array elements:\n");

    for(i = 0; i < n2; i++)
    {
        scanf("%d", &arr2[i]);
    }

    for(i = 0; i < n1; i++)
    {
        arr3[i] = arr1[i];
    }

    for(i = 0, j = n1; i < n2; i++, j++)
    {
        arr3[j] = arr2[i];
    }

    printf("Merged Array:\n");

    for(i = 0; i < n1 + n2; i++)
    {
        printf("%d ", arr3[i]);
    }

    return 0;
}
```

> **Exam tip:** Variation: "merge two **sorted** arrays into a sorted array" — সেটা different problem (merge sort-এর core)। Two-pointer technique লাগবে। এই simple merge-এর সাথে confuse করো না।

---

## Problem 19 — Recursion দিয়ে Power

> **Question:** Write a C program to calculate power using recursion.

### সমস্যা বোঝো

$\text{base}^{\text{exp}}$ হিসাব করতে হবে recursion দিয়ে। যেমন $2^5 = 2 \times 2 \times 2 \times 2 \times 2 = 32$।

Mathematical definition (recursive):

$$\text{power}(b, e) = \begin{cases} 1 & \text{if } e = 0 \\ b \cdot \text{power}(b, e-1) & \text{if } e > 0 \end{cases}$$

### Sample Input / Output

```
Input:
Enter base and exponent: 2 5

Output:
Result = 32
```

```
Input:
Enter base and exponent: 3 4

Output:
Result = 81
```

### কাজের Logic ব্যাখ্যা

Recursion-এর দুটো জিনিস জানতে হবে:
- **Base case:** কোথায় থামবে। এখানে `exp == 0` হলে return 1 (কারণ যেকোনো number-এর 0th power = 1)।
- **Recursive case:** নিজেকে কিভাবে call করবে। `base * power(base, exp-1)` — মানে exponent প্রতিবার 1 করে কমাচ্ছি।

Call stack trace করি `power(2, 3)`-এর:

```text
power(2, 3) = 2 * power(2, 2)
            = 2 * (2 * power(2, 1))
            = 2 * (2 * (2 * power(2, 0)))
            = 2 * (2 * (2 * 1))         ← base case
            = 2 * (2 * 2)
            = 2 * 4
            = 8
```

Function এক একটা stack frame হিসেবে memory-তে stack-এ জমা হয়, base case হিট করলে unwinding শুরু হয়।

### Complete Code

```c
#include <stdio.h>

int power(int base, int exp)
{
    if(exp == 0)
        return 1;
    else
        return base * power(base, exp - 1);
}

int main()
{
    int base, exp;

    printf("Enter base and exponent: ");
    scanf("%d %d", &base, &exp);

    printf("Result = %d\n", power(base, exp));

    return 0;
}
```

> **Exam tip:** এই recursion `O(exp)`. Faster: **fast exponentiation** (`O(log exp)`) — exp even হলে `power(b, e/2) * power(b, e/2)`, odd হলে `b * power(b, e-1)`. Bonus হিসেবে mention করো।

---

## Problem 20 — Second Largest Element

> **Question:** Write a C program to find second largest element in an array.

### সমস্যা বোঝো

Array-এর element-গুলোর মধ্যে যেটা সবচেয়ে বড় তার পরের largest টা বের করতে হবে। Duplicate handle করতে হবে — যেমন `[5, 5, 4, 3]`-এর second largest হবে 4, 5 না।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
10 20 30 40 50

Output:
Second Largest Element = 40
```

```
Input:
Enter number of elements: 6
Enter array elements:
8 8 5 3 7 8

Output:
Second Largest Element = 7
```

### কাজের Logic ব্যাখ্যা

Single pass-এ দুটো variable maintain করি — `largest` আর `secondLargest`। প্রথমে দুটোকেই very small value (-99999) দিয়ে initialize করি যেন যেকোনো array element তার চেয়ে বড় হয়।

প্রতিটা element-এ দুটো check:

1. **Element > largest:** তখন current largest টা secondLargest-এ চলে যাবে, আর element হবে নতুন largest.
2. **largest-এর চেয়ে ছোট কিন্তু secondLargest-এর চেয়ে বড় AND largest-এর সমান না:** তখন এটাই নতুন secondLargest.

```text
arr = [10, 20, 30, 40, 50]   largest=-99999, second=-99999

i=0, 10: 10 > -99999 → second=-99999, largest=10
i=1, 20: 20 > 10     → second=10, largest=20
i=2, 30: 30 > 20     → second=20, largest=30
i=3, 40: 40 > 30     → second=30, largest=40
i=4, 50: 50 > 40     → second=40, largest=50

Result: second = 40 ✓
```

`arr[i] != largest` check duplicate handle করার জন্য — `[5,5,4]`-এ দ্বিতীয় 5 second largest হিসেবে ধরা পড়বে না।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    int largest, secondLargest;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    largest = secondLargest = -99999;

    for(i = 0; i < n; i++)
    {
        if(arr[i] > largest)
        {
            secondLargest = largest;
            largest = arr[i];
        }
        else if(arr[i] > secondLargest && arr[i] != largest)
        {
            secondLargest = arr[i];
        }
    }

    printf("Second Largest Element = %d\n", secondLargest);

    return 0;
}
```

> **Exam tip:** `INT_MIN` (`<limits.h>`-এ) use করলে hardcoded -99999 এর চেয়ে professional দেখায় — কারণ negative number-গুলো array-তে থাকলেও কাজ করবে।

---

## Problem 21 — Perfect Number

> **Question:** Write a C program to check whether a number is perfect or not.

### সমস্যা বোঝো

Perfect number হলো এমন number যার সব proper divisor-এর (নিজেকে বাদ দিয়ে) যোগফল number-এর সমান। যেমন: `6`-এর divisor 1, 2, 3 → 1+2+3 = 6 ✓। `28` = 1+2+4+7+14 ✓।

### Sample Input / Output

```
Input:
Enter a number: 6

Output:
6 is a Perfect Number.
```

```
Input:
Enter a number: 28

Output:
28 is a Perfect Number.
```

```
Input:
Enter a number: 10

Output:
10 is not a Perfect Number.
```

### কাজের Logic ব্যাখ্যা

Step-by-step:

1. `i = 1` থেকে `n/2` পর্যন্ত loop চালাই (কারণ `n/2`-এর পর কোনো divisor হতে পারে না, except n itself যেটা আমরা গণনায় নিচ্ছি না)।
2. যেগুলো `n`-কে exactly ভাগ করে (`n % i == 0`), সেগুলো sum-এ যোগ করি।
3. শেষে `sum == n` হলে Perfect, else Not Perfect.

```text
n = 28
i=1:  28%1==0  → sum = 1
i=2:  28%2==0  → sum = 3
i=3:  28%3≠0   → skip
i=4:  28%4==0  → sum = 7
i=5,6: skip
i=7:  28%7==0  → sum = 14
i=8..13: skip
i=14: 28%14==0 → sum = 28
sum == n → Perfect ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    for(i = 1; i <= n / 2; i++)
    {
        if(n % i == 0)
        {
            sum += i;
        }
    }

    if(sum == n)
        printf("%d is a Perfect Number.\n", n);
    else
        printf("%d is not a Perfect Number.\n", n);

    return 0;
}
```

> **Exam tip:** Perfect numbers very rare — first few: 6, 28, 496, 8128. Examiner-কে বলো যে loop `sqrt(n)` পর্যন্ত optimize করা যায় (pair divisor logic), `O(√n)` complexity।

---

## Problem 22 — Floyd's Triangle

> **Question:** Write a C program to print Floyd's Triangle.

### সমস্যা বোঝো

Floyd's Triangle হলো natural number দিয়ে বানানো triangular pattern। Row 1-এ 1টা number, row 2-তে 2টা, এভাবে — সব consecutive natural number।

### Sample Input / Output

```
Input:
Enter number of rows: 4

Output:
1
2 3
4 5 6
7 8 9 10
```

```
Input:
Enter number of rows: 5

Output:
1
2 3
4 5 6
7 8 9 10
11 12 13 14 15
```

### কাজের Logic ব্যাখ্যা

দুইটা nested loop:
- **Outer loop** (`i = 1 to n`): row number control করে।
- **Inner loop** (`j = 1 to i`): row `i`-তে কতটা number হবে সেটা control করে।

একটা counter `number = 1` রাখি যেটা প্রতি print-এর পর `number++` হয়।

```text
n = 4

i=1, j=1:        print 1, number→2     | "1"
                                          new line
i=2, j=1: print 2, number→3
       j=2: print 3, number→4         | "2 3"
                                          new line
i=3, j=1: 4 → 5
       j=2: 5 → 6
       j=3: 6 → 7                     | "4 5 6"
                                          new line
i=4, j=1..4: 7, 8, 9, 10              | "7 8 9 10"
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i, j, number = 1;

    printf("Enter number of rows: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        for(j = 1; j <= i; j++)
        {
            printf("%d ", number);
            number++;
        }

        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Pattern problem-এ examiner expect করে clean output formatting। `%d ` (space দিয়ে) print করো, প্রতি row-এর শেষে `\n`. Indentation matter করে — code ও clean রাখো।

---

## Problem 23 — Element-এর Frequency

> **Question:** Write a C program to find the frequency of each element in an array.

### সমস্যা বোঝো

Array-এর প্রতিটা unique element কতবার করে আছে সেটা গুনে দেখাতে হবে। যেমন `[1, 2, 1, 3, 2, 1]`-এ 1 আছে 3 বার, 2 আছে 2 বার, 3 আছে 1 বার।

### Sample Input / Output

```
Input:
Enter number of elements: 6
Enter array elements:
1 2 1 3 2 1

Output:
Frequency of elements:
1 occurs 3 times
2 occurs 2 times
3 occurs 1 times
```

```
Input:
Enter number of elements: 5
Enter array elements:
5 5 5 5 5

Output:
Frequency of elements:
5 occurs 5 times
```

### কাজের Logic ব্যাখ্যা

একটা parallel array `freq[]` রাখি যেখানে `freq[i]` = `arr[i]`-এর frequency. কিন্তু trick হলো — duplicate element-গুলোকে আবার গুনতে চাই না।

Algorithm:
1. সব `freq[i]` কে `-1` দিয়ে initialize (means "not yet processed").
2. প্রতিটা `i`-এর জন্য, count = 1 দিয়ে শুরু। তারপর `j = i+1` থেকে দেখো same element কয়টা আছে — পেলে `count++` এবং `freq[j] = 0` (mark as already counted)।
3. শেষে `freq[i]` 0 না হলে count store করো।
4. Print করার সময় `freq[i] != 0` হলেই print।

```text
arr = [1, 2, 1, 3, 2, 1]
init: freq = [-1, -1, -1, -1, -1, -1]

i=0 (1): j=1(2)❌, j=2(1)✓ count=2, freq[2]=0
                  j=3(3)❌, j=4(2)❌, j=5(1)✓ count=3, freq[5]=0
       freq[0] = 3

i=1 (2): j=2(1)❌, j=3(3)❌, j=4(2)✓ count=2, freq[4]=0
                  j=5(1)❌
       freq[1] = 2

i=2 (1): freq[2]=0 — already counted, skip set step
       (count calculated but freq[2] stays 0)

... 

Output: 1→3, 2→2, 3→1
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], freq[100];
    int n, i, j, count;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
        freq[i] = -1;
    }

    for(i = 0; i < n; i++)
    {
        count = 1;

        for(j = i + 1; j < n; j++)
        {
            if(arr[i] == arr[j])
            {
                count++;
                freq[j] = 0;
            }
        }

        if(freq[i] != 0)
        {
            freq[i] = count;
        }
    }

    printf("Frequency of elements:\n");

    for(i = 0; i < n; i++)
    {
        if(freq[i] != 0)
        {
            printf("%d occurs %d times\n", arr[i], freq[i]);
        }
    }

    return 0;
}
```

> **Exam tip:** Time complexity `O(n²)` — small element value হলে hash array দিয়ে `O(n)` করা যায়। বলতে পারো: "If element range is small, use a count array of size MAX+1."

---

## Problem 24 — Matrix Multiplication

> **Question:** Write a C program to multiply two matrices.

### সমস্যা বোঝো

দুইটা matrix `A` (size $m \times n$) আর `B` (size $p \times q$) গুণ করতে হলে শর্ত হলো `n == p` (first-এর column = second-এর row)। Result matrix-এর size হবে $m \times q$।

Formula:

$$C[i][j] = \sum_{k=0}^{n-1} A[i][k] \cdot B[k][j]$$

### Sample Input / Output

```
Input:
Enter rows and columns of first matrix: 2 3
Enter rows and columns of second matrix: 3 2
Enter first matrix:
1 2 3
4 5 6
Enter second matrix:
7 8
9 10
11 12

Output:
Result Matrix:
58 64
139 154
```

```
Input:
Enter rows and columns of first matrix: 2 2
Enter rows and columns of second matrix: 3 2
...

Output:
Matrix multiplication not possible.
```

### কাজের Logic ব্যাখ্যা

প্রথমে compatibility check — `col1 != row2` হলে multiplication impossible।

Triple nested loop:
- `i`: result-এর row index (0 থেকে row1-1)
- `j`: result-এর column index (0 থেকে col2-1)
- `k`: dot product-এর index (0 থেকে col1-1)

```text
A:           B:           C = A·B:
1 2 3        7  8         (1·7+2·9+3·11)  (1·8+2·10+3·12)
4 5 6        9  10        (4·7+5·9+6·11)  (4·8+5·10+6·12)
             11 12

C[0][0] = 1·7 + 2·9 + 3·11 = 7+18+33 = 58
C[0][1] = 1·8 + 2·10 + 3·12 = 8+20+36 = 64
C[1][0] = 4·7 + 5·9 + 6·11 = 28+45+66 = 139
C[1][1] = 4·8 + 5·10 + 6·12 = 32+50+72 = 154
```

প্রতিটা `C[i][j]`-এর জন্য `sum = 0` reset করে নিতে হবে — না হলে আগের সংখ্যার সাথে যোগ হয়ে যাবে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], b[10][10], result[10][10];
    int row1, col1, row2, col2;
    int i, j, k, sum;

    printf("Enter rows and columns of first matrix: ");
    scanf("%d %d", &row1, &col1);

    printf("Enter rows and columns of second matrix: ");
    scanf("%d %d", &row2, &col2);

    if(col1 != row2)
    {
        printf("Matrix multiplication not possible.\n");
        return 0;
    }

    printf("Enter first matrix:\n");

    for(i = 0; i < row1; i++)
    {
        for(j = 0; j < col1; j++)
        {
            scanf("%d", &a[i][j]);
        }
    }

    printf("Enter second matrix:\n");

    for(i = 0; i < row2; i++)
    {
        for(j = 0; j < col2; j++)
        {
            scanf("%d", &b[i][j]);
        }
    }

    for(i = 0; i < row1; i++)
    {
        for(j = 0; j < col2; j++)
        {
            sum = 0;

            for(k = 0; k < col1; k++)
            {
                sum += a[i][k] * b[k][j];
            }

            result[i][j] = sum;
        }
    }

    printf("Result Matrix:\n");

    for(i = 0; i < row1; i++)
    {
        for(j = 0; j < col2; j++)
        {
            printf("%d ", result[i][j]);
        }

        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Time complexity $O(n^3)$ — examiner প্রায় জিজ্ঞেস করে। Compatibility check টা ভুলো না — নাহলে runtime garbage value চলে আসবে। Triple loop-এর order `i-j-k` বেশি common, কিন্তু `i-k-j` cache-friendly।

---

## Problem 25 — Duplicate Element সরানো

> **Question:** Write a C program to remove duplicate elements from an array.

### সমস্যা বোঝো

Array-এ একই element একাধিকবার থাকলে শুধু প্রথম occurrence রেখে বাকিগুলো remove করতে হবে। যেমন `[1, 2, 1, 3, 2]` → `[1, 2, 3]`.

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
1 2 1 3 2

Output:
Array after removing duplicates:
1 2 3
```

```
Input:
Enter number of elements: 7
Enter array elements:
5 5 6 7 5 6 8

Output:
Array after removing duplicates:
5 6 7 8
```

### কাজের Logic ব্যাখ্যা

Algorithm in-place — extra array ছাড়াই কাজ করছে:

1. Outer loop `i`: প্রতিটা element fix করে।
2. Inner loop `j = i+1`: যদি `arr[i] == arr[j]` পাই, তাহলে `j` থেকে শুরু করে বাকি element একঘর বামে shift করি (`arr[k] = arr[k+1]`)।
3. `n--` (size কমে গেলো) এবং `j--` (same index আবার check করতে হবে কারণ shift-এর পর নতুন element এসেছে সেখানে)।

```text
arr = [1, 2, 1, 3, 2], n=5

i=0 (1):
  j=1 (2): not equal
  j=2 (1): equal! shift → [1, 2, 3, 2, _], n=4, j-- → j=1
  j=2 (3): not equal
  j=3 (2): not equal

i=1 (2):
  j=2 (3): not equal
  j=3 (2): equal! shift → [1, 2, 3, _, _], n=3, j-- → j=2
  j=3: out of range

i=2 (3): no duplicates

Result: [1, 2, 3]
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, j, k;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    for(i = 0; i < n; i++)
    {
        for(j = i + 1; j < n; j++)
        {
            if(arr[i] == arr[j])
            {
                for(k = j; k < n - 1; k++)
                {
                    arr[k] = arr[k + 1];
                }

                n--;
                j--;
            }
        }
    }

    printf("Array after removing duplicates:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

> **Exam tip:** This solution `O(n³)` worst case (triple loop)। Sorted array হলে `O(n)`-এ done — adjacent duplicate skip করো। Examiner-কে complexity বলে দাও।

---

## Problem 26 — LCM (Least Common Multiple)

> **Question:** Write a C program to find LCM (Least Common Multiple) of two numbers.

### সমস্যা বোঝো

দুইটা number-এর LCM হলো সবচেয়ে ছোট সেই number যেটা দুইটা দিয়েই ভাগ যায়। যেমন: `lcm(4, 6) = 12` কারণ 12 হলো smallest number যা 4 এবং 6 দুটো দিয়েই divisible।

### Sample Input / Output

```
Input:
Enter two numbers: 4 6

Output:
LCM = 12
```

```
Input:
Enter two numbers: 5 7

Output:
LCM = 35
```

### কাজের Logic ব্যাখ্যা

Brute force approach:

1. `max = max(a, b)` দিয়ে শুরু — কারণ LCM অবশ্যই দুইটার মধ্যে বড়টার চেয়ে ছোট হতে পারে না।
2. Infinite loop-এ `max` কে check করি — যদি `max % a == 0 AND max % b == 0` হয়, তাহলে এটাই LCM, break।
3. না হলে `max++` করে আবার try।

```text
a = 4, b = 6
max = 6

Iter 1: 6%4 = 2 ≠ 0  → skip, max=7
Iter 2: 7%4 = 3 ≠ 0  → skip, max=8
Iter 3: 8%4 = 0 ✓, 8%6 = 2 ≠ 0  → skip, max=9
Iter 4: 9%4 ≠ 0  → skip, max=10
Iter 5: 10%4 ≠ 0  → skip, max=11
Iter 6: 11%4 ≠ 0  → skip, max=12
Iter 7: 12%4 = 0 ✓, 12%6 = 0 ✓  → LCM = 12 ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a, b, max, lcm;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    max = (a > b) ? a : b;

    while(1)
    {
        if(max % a == 0 && max % b == 0)
        {
            lcm = max;
            break;
        }

        max++;
    }

    printf("LCM = %d\n", lcm);

    return 0;
}
```

> **Exam tip:** Mathematical relation: `LCM(a, b) × GCD(a, b) = a × b`. So `LCM = (a × b) / GCD(a, b)`. এটা much faster — `O(log(min(a,b)))`. Examiner GCD problem-এর সাথে link করতে চায়।

---

## Problem 27 — Pascal's Triangle

> **Question:** Write a C program to print Pascal's Triangle.

### সমস্যা বোঝো

Pascal's Triangle এমন এক pattern যেখানে প্রতিটা number তার ঠিক উপরের দুইটা number-এর যোগফল। প্রতি row-এর শুরু আর শেষে 1 থাকে। এর entry গুলো আসলে binomial coefficient — row $i$, column $j$ = $\binom{i}{j}$।

```text
Row 0: 1
Row 1: 1 1
Row 2: 1 2 1
Row 3: 1 3 3 1
Row 4: 1 4 6 4 1
```

### Sample Input / Output

```
Input:
Enter number of rows: 5

Output:
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
```

```
Input:
Enter number of rows: 3

Output:
1
1 1
1 2 1
```

### কাজের Logic ব্যাখ্যা

প্রতি row-এর জন্য coefficient calculate করি running multiplication দিয়ে। Formula:

$$\binom{i}{j+1} = \binom{i}{j} \cdot \frac{i - j}{j + 1}$$

মানে previous coefficient থেকে next coefficient O(1)-এ পাওয়া যায়।

```text
Row 4:
  j=0: coef=1                 print 1
  j=1: coef = 1 * (4-0)/(0+1) = 4    print 4
  j=2: coef = 4 * (4-1)/(1+1) = 6    print 6
  j=3: coef = 6 * (4-2)/(2+1) = 4    print 4
  j=4: coef = 4 * (4-3)/(3+1) = 1    print 1
```

প্রতি row শুরু হয় `coefficient = 1` দিয়ে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i, j, coefficient = 1;

    printf("Enter number of rows: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++)
    {
        coefficient = 1;

        for(j = 0; j <= i; j++)
        {
            printf("%d ", coefficient);

            coefficient = coefficient * (i - j) / (j + 1);
        }

        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Each entry hand-calculate করে দেখাতে পারো `nCr = n! / (r! (n-r)!)`, কিন্তু এই running multiplication way much smarter। Time complexity $O(n^2)$, Space $O(1)$.

---

## Problem 28 — Decimal থেকে Binary Conversion

> **Question:** Write a C program to convert decimal number to binary.

### সমস্যা বোঝো

User decimal integer দিবে (যেমন 10), output হবে তার binary representation (যেমন 1010)।

### Sample Input / Output

```
Input:
Enter a decimal number: 10

Output:
Binary equivalent: 1010
```

```
Input:
Enter a decimal number: 25

Output:
Binary equivalent: 11001
```

### কাজের Logic ব্যাখ্যা

Standard "divide by 2 and collect remainders" method:

1. `n` কে repeatedly 2 দিয়ে ভাগ করো।
2. প্রতি step-এ `n % 2` (0 বা 1) array-তে store করো।
3. `n = 0` হলে stop।
4. Array-কে **reverse order**-এ print করো — কারণ প্রথমে যেটা পেয়েছিলা সেটা actually least significant bit।

```text
n = 10

Step 1: 10 % 2 = 0, n = 5    binary[0] = 0
Step 2: 5 % 2  = 1, n = 2    binary[1] = 1
Step 3: 2 % 2  = 0, n = 1    binary[2] = 0
Step 4: 1 % 2  = 1, n = 0    binary[3] = 1

binary[] = [0, 1, 0, 1]

Reverse print: 1 0 1 0 → "1010" ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, binary[100], i = 0;

    printf("Enter a decimal number: ");
    scanf("%d", &n);

    while(n > 0)
    {
        binary[i] = n % 2;
        n = n / 2;
        i++;
    }

    printf("Binary equivalent: ");

    for(i = i - 1; i >= 0; i--)
    {
        printf("%d", binary[i]);
    }

    return 0;
}
```

> **Exam tip:** `n = 0` দিলে loop run-ই করবে না, output empty আসবে। Edge case-এ `if(n == 0) printf("0");` add করো। বড় number-এর জন্য array size 32-64 হলে enough।

---

## Problem 29 — Array-এ Element Insert

> **Question:** Write a C program to insert an element into an array.

### সমস্যা বোঝো

একটা existing array-এর কোনো particular position-এ নতুন একটা value insert করতে হবে। সেই position থেকে পরের সব element একঘর ডানে shift হয়ে যাবে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
10 20 30 40 50
Enter position to insert: 3
Enter value to insert: 99

Output:
Array after insertion:
10 20 99 30 40 50
```

```
Input:
Enter number of elements: 3
Enter array elements:
1 2 3
Enter position to insert: 1
Enter value to insert: 0

Output:
Array after insertion:
0 1 2 3
```

### কাজের Logic ব্যাখ্যা

Position 1-indexed (user-friendly)। Internal index `pos - 1`।

Steps:
1. Right-to-left shift: `i = n` থেকে `pos` পর্যন্ত (descending)। `arr[i] = arr[i-1]`. এতে `arr[pos-1]` জায়গা খালি হয়ে যাবে।
2. `arr[pos - 1] = value` দিয়ে নতুন value বসাও।
3. `n++`।

```text
arr = [10, 20, 30, 40, 50], n=5
pos = 3, value = 99

Step 1 (shift):
i=5: arr[5] = arr[4] = 50  → [10, 20, 30, 40, 50, 50]
i=4: arr[4] = arr[3] = 40  → [10, 20, 30, 40, 40, 50]
i=3: arr[3] = arr[2] = 30  → [10, 20, 30, 30, 40, 50]

Step 2: arr[2] = 99         → [10, 20, 99, 30, 40, 50]
n = 6
```

কেন right-to-left? কারণ left-to-right shift করলে value overwrite হয়ে যাবে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, pos, value;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Enter position to insert: ");
    scanf("%d", &pos);

    printf("Enter value to insert: ");
    scanf("%d", &value);

    for(i = n; i >= pos; i--)
    {
        arr[i] = arr[i - 1];
    }

    arr[pos - 1] = value;
    n++;

    printf("Array after insertion:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

> **Exam tip:** `pos < 1` বা `pos > n+1` হলে invalid — validation add করলে impressive। Array-এ shift `O(n)` — linked list use করলে insert `O(1)` (যদি pointer থাকে)।

---

## Problem 30 — Pointer দিয়ে Array-এর Sum

> **Question:** Write a C program to find the sum of elements of an array using pointer.

### সমস্যা বোঝো

Array-এর সব element-এর sum বের করতে হবে — কিন্তু `arr[i]` syntax-এর বদলে pointer arithmetic (`*(ptr + i)`) ব্যবহার করতে হবে। এটা pointer-array relationship test করে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
1 2 3 4 5

Output:
Sum of array elements = 15
```

```
Input:
Enter number of elements: 4
Enter array elements:
10 20 30 40

Output:
Sum of array elements = 100
```

### কাজের Logic ব্যাখ্যা

Key insight: array-এর name `arr` আসলে first element-এর address — অর্থাৎ একটা pointer-এর মতো behave করে।

```text
arr     ≡  &arr[0]
arr+i   ≡  &arr[i]
*(arr+i) ≡  arr[i]
```

Code-এ `ptr = arr;` মানে `ptr` এখন array-এর শুরুর address-কে point করছে। তারপর loop-এ `*(ptr + i)` মানে `arr[i]`।

```text
arr = [1, 2, 3, 4, 5]
ptr → arr[0]

i=0: *(ptr+0) = arr[0] = 1  → sum = 1
i=1: *(ptr+1) = arr[1] = 2  → sum = 3
i=2: *(ptr+2) = arr[2] = 3  → sum = 6
i=3: *(ptr+3) = arr[3] = 4  → sum = 10
i=4: *(ptr+4) = arr[4] = 5  → sum = 15
```

`ptr + i` actually `i * sizeof(int)` byte forward যায় — pointer arithmetic automatically scaled হয়।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, sum = 0;
    int *ptr;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    ptr = arr;

    for(i = 0; i < n; i++)
    {
        sum += *(ptr + i);
    }

    printf("Sum of array elements = %d\n", sum);

    return 0;
}
```

> **Exam tip:** `*(ptr+i)`, `ptr[i]`, `*(arr+i)`, `arr[i]` — চারটাই same thing। Examiner equivalence দেখাতে চায়। Bonus: `*ptr++` syntax দিয়ে pointer itself increment করে show করো।

---

## Problem 31 — Array থেকে Element Delete

> **Question:** Write a C program to delete an element from an array.

### সমস্যা বোঝো

Array-এর কোনো particular position-এর element সরিয়ে দিতে হবে। সেই position-এর পরের সব element একঘর বামে shift হবে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
10 20 30 40 50
Enter position to delete: 3

Output:
Array after deletion:
10 20 40 50
```

```
Input:
Enter number of elements: 4
Enter array elements:
1 2 3 4
Enter position to delete: 1

Output:
Array after deletion:
2 3 4
```

### কাজের Logic ব্যাখ্যা

Position 1-indexed। Internal index `pos - 1`।

Step-by-step:
1. Validation — `pos` যদি 1-এর কম বা `n`-এর বেশি হয়, invalid.
2. Left-to-right shift: `i = pos-1` থেকে `n-2` পর্যন্ত। `arr[i] = arr[i+1]`. এতে delete-এর target overwrite হয়ে যাবে।
3. `n--`।

```text
arr = [10, 20, 30, 40, 50], n=5
pos = 3 (delete arr[2] = 30)

Shift:
i=2: arr[2] = arr[3] = 40  → [10, 20, 40, 40, 50]
i=3: arr[3] = arr[4] = 50  → [10, 20, 40, 50, 50]

n = 4 (last 50 ignored)
Result: [10, 20, 40, 50]
```

কেন left-to-right? কারণ আমরা চাই target position টাকেই সবার আগে overwrite করতে — তারপর দরজা বন্ধ করতে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, pos;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Enter position to delete: ");
    scanf("%d", &pos);

    if(pos < 1 || pos > n)
    {
        printf("Invalid position.\n");
        return 0;
    }

    for(i = pos - 1; i < n - 1; i++)
    {
        arr[i] = arr[i + 1];
    }

    n--;

    printf("Array after deletion:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

> **Exam tip:** Insert (Problem 29) আর Delete এই দুইটা সবসময় একসাথে আসে। Insert-এ right-to-left shift, Delete-এ left-to-right shift — direction উল্টা। এটা remember করার trick।

---

## Problem 32 — `strcmp()` ছাড়া String Equality

> **Question:** Write a C program to check whether two strings are equal without using strcmp().

### সমস্যা বোঝো

`<string.h>`-এর `strcmp()` use না করে দুইটা string সমান কি না check করতে হবে। Character-by-character compare করতে হবে।

### Sample Input / Output

```
Input:
Enter first string: hello
Enter second string: hello

Output:
Strings are equal.
```

```
Input:
Enter first string: cat
Enter second string: car

Output:
Strings are not equal.
```

### কাজের Logic ব্যাখ্যা

Algorithm: character-by-character compare যতক্ষণ না দুটোর কোনো একটা `'\0'` (null) হিট করে।

`while(str1[i] != '\0' || str2[i] != '\0')` মানে: যদি দুটোর **যেকোনো একটাও** শেষ না হয়, তাহলে চালিয়ে যাও।

প্রতি iteration-এ `str1[i] != str2[i]` হলে `flag = 0` করে break.

```text
str1 = "cat\0",  str2 = "car\0"

i=0: 'c' == 'c' ✓
i=1: 'a' == 'a' ✓
i=2: 't' != 'r' ✗ → flag=0, break

Output: Not equal
```

```text
str1 = "hi\0",   str2 = "hii\0"

i=0: 'h' == 'h' ✓
i=1: 'i' == 'i' ✓
i=2: '\0' != 'i' ✗ → flag=0, break

Output: Not equal (correctly catches different lengths)
```

`||` condition-টা important — দুইটার যেকোনো একটা শেষ হলেও যদি অন্যটা শেষ না হয়, mismatch ধরা পড়বে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str1[100], str2[100];
    int i = 0, flag = 1;

    printf("Enter first string: ");
    gets(str1);

    printf("Enter second string: ");
    gets(str2);

    while(str1[i] != '\0' || str2[i] != '\0')
    {
        if(str1[i] != str2[i])
        {
            flag = 0;
            break;
        }

        i++;
    }

    if(flag == 1)
        printf("Strings are equal.\n");
    else
        printf("Strings are not equal.\n");

    return 0;
}
```

> **Exam tip:** Real `strcmp()` আসলে -1, 0, 1 return করে (lexicographic order)। যদি examiner সেটা চায়, character-এর ASCII difference return করতে হবে। এটা mention করলে depth দেখাবে।

---

## Problem 33 — Total Word গণনা

> **Question:** Write a C program to count total words in a string.

### সমস্যা বোঝো

একটা sentence-এ কতগুলো word আছে সেটা গুনতে হবে। সাধারণ assumption: word-গুলো single space দিয়ে separated, leading/trailing space নেই।

### Sample Input / Output

```
Input:
Enter a sentence: I love Bangladesh

Output:
Total words = 3
```

```
Input:
Enter a sentence: Bangladesh Bank IT Officer

Output:
Total words = 4
```

### কাজের Logic ব্যাখ্যা

Simple observation: যদি sentence-এ `n` টা space থাকে, তাহলে word সংখ্যা `n + 1`. কারণ প্রতি space একটা word boundary বানায়।

```text
"I love Bangladesh"
 ↑    ↑
 2 spaces → 3 words ✓
```

Code-এ `words = 1` দিয়ে initialize করছি (কারণ অন্তত একটা word আছে ধরে নিচ্ছি), তারপর প্রতি space-এ `words++`.

```text
str = "I love Bangladesh\0"
words = 1

i=0: 'I'  — not space
i=1: ' '  — space! words=2
i=2..5: 'love' — no space
i=6: ' '  — space! words=3
i=7..16: 'Bangladesh' — no space
i=17: '\0' → loop end

Total words = 3 ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[200];
    int i = 0, words = 1;

    printf("Enter a sentence: ");
    gets(str);

    while(str[i] != '\0')
    {
        if(str[i] == ' ')
        {
            words++;
        }

        i++;
    }

    printf("Total words = %d\n", words);

    return 0;
}
```

> **Exam tip:** Edge case fail করে: empty string ("") দিলে output 1 আসবে (wrong), বা multiple consecutive spaces ("hello  world") দিলে count বেশি আসবে। Robust solution-এ "previous char was space" flag রাখো।

---

## Problem 34 — Function দিয়ে Multiplication Table

> **Question:** Write a C program to print multiplication table using function.

### সমস্যা বোঝো

User একটা number দিবে, সেই number-এর 1 থেকে 10 পর্যন্ত multiplication table print করতে হবে। কাজটা একটা separate function-এ করতে হবে — modularity দেখানোর জন্য।

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```

```
Input:
Enter a number: 7

Output:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
...
7 x 10 = 70
```

### কাজের Logic ব্যাখ্যা

দুইটা part-এ ভাগ:

1. **`main()`:** input নেয়, `multiplicationTable(number)` call করে।
2. **`multiplicationTable(int n)`:** void function — `i = 1` থেকে 10 পর্যন্ত loop চালিয়ে `n × i` print করে।

```text
n = 5

i=1: print "5 x 1 = 5"
i=2: print "5 x 2 = 10"
...
i=10: print "5 x 10 = 50"
```

Function-এর সুবিধা: main short থাকে, table print করা reusable হয়, code-এর responsibility separated।

### Complete Code

```c
#include <stdio.h>

void multiplicationTable(int n)
{
    int i;

    for(i = 1; i <= 10; i++)
    {
        printf("%d x %d = %d\n", n, i, n * i);
    }
}

int main()
{
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    multiplicationTable(number);

    return 0;
}
```

> **Exam tip:** Function-এর syntax জরুরি — return type, parameter type, prototype (যদি function `main`-এর পরে define হয়)। Prototype declare করার practice দেখালে full mark।

---

## Problem 35 — Selection Sort

> **Question:** Write a C program to sort an array using Selection Sort.

### সমস্যা বোঝো

Selection Sort একটা simple sorting algorithm। Idea: প্রতি pass-এ unsorted portion থেকে minimum element খুঁজে বের করো, এবং সেটাকে current position-এ আনো (swap)। Time complexity $O(n^2)$, Space $O(1)$.

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
64 25 12 22 11

Output:
Sorted array:
11 12 22 25 64
```

```
Input:
Enter number of elements: 4
Enter array elements:
5 2 8 1

Output:
Sorted array:
1 2 5 8
```

### কাজের Logic ব্যাখ্যা

Algorithm:

```text
For i = 0 to n-2:
    minIndex = i
    For j = i+1 to n-1:
        If arr[j] < arr[minIndex]: minIndex = j
    swap(arr[i], arr[minIndex])
```

প্রতি outer iteration-এ array-এর `[i ... n-1]` portion-এর minimum খুঁজে index `i`-তে আনছি।

```text
arr = [64, 25, 12, 22, 11], n=5

i=0: minIndex starts at 0
     j=1 (25): 25 < 64 → minIndex=1
     j=2 (12): 12 < 25 → minIndex=2
     j=3 (22): no change
     j=4 (11): 11 < 12 → minIndex=4
     swap arr[0], arr[4]
     → [11, 25, 12, 22, 64]

i=1: minIndex=1
     j=2 (12): 12 < 25 → minIndex=2
     swap arr[1], arr[2]
     → [11, 12, 25, 22, 64]

i=2: minIndex=2
     j=3 (22): 22 < 25 → minIndex=3
     swap arr[2], arr[3]
     → [11, 12, 22, 25, 64]

i=3: minIndex=3, j=4(64): no change, no swap
i=4: skipped (i < n-1)

Final: [11, 12, 22, 25, 64] ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, j, minIndex, temp;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    for(i = 0; i < n - 1; i++)
    {
        minIndex = i;

        for(j = i + 1; j < n; j++)
        {
            if(arr[j] < arr[minIndex])
            {
                minIndex = j;
            }
        }

        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }

    printf("Sorted array:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

> **Exam tip:** Selection Sort vs Bubble Sort — both $O(n^2)$, but Selection Sort fewer swap করে (worst case `n-1`), Bubble Sort onek beshi। Examiner প্রায় difference জানতে চায়।

---

## Problems 06–35 সংক্ষেপ

| # | বিষয় | মূল Concept |
|---|------|-------------|
| 06 | String — Vowel/Consonant count | Character classification, ASCII range check |
| 07 | Fibonacci series | Two-variable sliding window, $O(n)$ |
| 08 | String palindrome | Reverse copy + character compare |
| 09 | Matrix transpose | `transpose[j][i] = a[i][j]`, dimension swap |
| 10 | Binary search | Divide-and-conquer, $O(\log n)$, sorted array required |
| 11 | Swap without temp | Arithmetic trick: `a=a+b, b=a-b, a=a-b` |
| 12 | Diagonal sum | Single loop `a[i][i]`, square matrix only |
| 13 | Count digits | Repeated `n /= 10` until zero |
| 14 | String copy without `strcpy` | Character loop + manual `'\0'` terminator |
| 15 | Matrix addition | Element-wise `sum[i][j] = a[i][j] + b[i][j]` |
| 16 | Armstrong number | Two-pass: count digits, then sum of `digit^n` |
| 17 | GCD (brute force) | Loop 1 to min(a,b), find largest common divisor |
| 18 | Merge two arrays | Sequential copy, `arr3[n1..]` from arr2 |
| 19 | Power via recursion | `power(b,e) = b * power(b, e-1)`, base = 1 |
| 20 | Second largest element | Single pass, two variables, duplicate handling |
| 21 | Perfect number | Sum of proper divisors == n (e.g., 6, 28) |
| 22 | Floyd's triangle | Counter increment, nested loops 1..i |
| 23 | Element frequency | Mark counted with `freq=0`, $O(n^2)$ |
| 24 | Matrix multiplication | Triple loop, dot product, $O(n^3)$ |
| 25 | Remove duplicates | In-place left-shift, decrement n |
| 26 | LCM (brute force) | Increment max until divisible by both |
| 27 | Pascal's triangle | Running coefficient: `c = c*(i-j)/(j+1)` |
| 28 | Decimal to binary | Collect remainders, print reverse |
| 29 | Insert into array | Right-to-left shift, place at `pos-1` |
| 30 | Array sum via pointer | `*(ptr + i)` equivalent to `arr[i]` |
| 31 | Delete from array | Left-to-right shift, decrement n |
| 32 | String equality without `strcmp` | OR-condition loop, char-by-char compare |
| 33 | Word count | Spaces count + 1 |
| 34 | Multiplication table (function) | `void` function with parameter |
| 35 | Selection sort | Find min in unsorted part, swap to front, $O(n^2)$ |

---

[← Set 1 (Problems 01–05)](10-c-problems-p1.md) | [C Programming Index](00-c-master-index.md)
