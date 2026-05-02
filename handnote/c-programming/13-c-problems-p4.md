# Bangladesh Bank IT Exam — C Programming Problems (Set 4)

> **Problems 66–100** | Topics: Even numbers, Digit check, Array reverse, Power loop, Structure array, Prime array, Odd sum, Identity matrix, Celsius, Series recursion, Pointer factorial, Digit sum recursion, Armstrong function, Matrix pointer, Character frequency, String sort, Strong number, Perfect function, LCM via GCD, Digit frequency, Max repeated, Square root, Palindrome function, Diagonal pointer, String reverse pointer, Array factorials, Series sum, Spy number, Largest via function, Uppercase/lowercase, Matrix difference, Divisors, Odd positioned sum, Harshad number, Multiplication recursion

---

## Problem 66 — ১ থেকে n পর্যন্ত জোড় সংখ্যা প্রিন্ট

> **Question:** Write a C program to print all even numbers between 1 to n.

### সমস্যা বোঝো

User একটা সংখ্যা `n` দেবে। আমাদের ১ থেকে শুরু করে `n` পর্যন্ত যত জোড় সংখ্যা (even number) আছে সব প্রিন্ট করতে হবে। জোড় সংখ্যা মানে যেগুলো ২ দিয়ে ভাগ করলে remainder ০ হয়।

### Sample Input / Output

```
Input:
Enter a number: 10

Output:
2 4 6 8 10
```

```
Input:
Enter a number: 7

Output:
2 4 6
```

### কাজের Logic ব্যাখ্যা

`for` loop দিয়ে `i = 1` থেকে `i = n` পর্যন্ত ঘুরবো। প্রতিটা `i` কে modulo operator `%` দিয়ে চেক করবো — যদি `i % 2 == 0` হয়, তাহলে সেটা even, তাই প্রিন্ট করে দেবো।

```
i = 1 → 1 % 2 = 1 → skip
i = 2 → 2 % 2 = 0 → print 2
i = 3 → skip
i = 4 → print 4
...
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;

    printf("Enter a number: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        if(i % 2 == 0)
        {
            printf("%d ", i);
        }
    }

    return 0;
}
```

> **Exam tip:** Even-only loop optimization হিসেবে `i = 2; i <= n; i += 2` লেখা যায় — এটা দেখালে extra mark পাবে।

---

## Problem 67 — String-এ শুধু digit আছে কি না check

> **Question:** Write a C program to check whether a string contains digits only.

### সমস্যা বোঝো

User একটা string দেবে। আমাদের চেক করতে হবে — সব character কি `'0'` থেকে `'9'` এর মধ্যে? যদি একটাও non-digit (letter বা symbol) পাওয়া যায়, তাহলে result হবে "non-digit characters"।

### Sample Input / Output

```
Input:
Enter a string: 12345

Output:
String contains only digits
```

```
Input:
Enter a string: abc123

Output:
String contains non-digit characters
```

### কাজের Logic ব্যাখ্যা

ASCII table-এ digit গুলোর code `'0'` (48) থেকে `'9'` (57)। তাই `str[i] < '0' || str[i] > '9'` মানে digit না। `flag = 1` ধরে শুরু করি, non-digit পেলেই `flag = 0` করে break করি।

```
str = "12a3"
i=0: '1' → digit, ok
i=1: '2' → digit, ok
i=2: 'a' → not digit → flag=0, break
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[100];
    int i = 0, flag = 1;

    printf("Enter a string: ");
    gets(str);

    while(str[i] != '\0')
    {
        if(str[i] < '0' || str[i] > '9')
        {
            flag = 0;
            break;
        }
        i++;
    }

    if(flag == 1)
        printf("String contains only digits\n");
    else
        printf("String contains non-digit characters\n");

    return 0;
}
```

> **Exam tip:** `isdigit()` function `<ctype.h>` থেকেও ব্যবহার করা যায়, কিন্তু exam-এ manual range check দেখালে fundamentals বোঝার প্রমাণ হয়।

---

## Problem 68 — Array reverse

> **Question:** Write a C program to reverse an array.

### সমস্যা বোঝো

একটা array-এর elements উল্টা করে প্রিন্ট করতে হবে। মানে শেষ element আগে, প্রথম element শেষে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
1 2 3 4 5

Output:
Reversed array:
5 4 3 2 1
```

```
Input:
Enter number of elements: 3
Enter array elements:
10 20 30

Output:
Reversed array:
30 20 10
```

### কাজের Logic ব্যাখ্যা

এখানে actually array swap করা হচ্ছে না — শুধু শেষ থেকে শুরু পর্যন্ত loop চালিয়ে উল্টা order-এ প্রিন্ট করা হচ্ছে। `i = n-1` থেকে শুরু করে `i--` করতে করতে `i = 0` পর্যন্ত যাবে।

```
arr = [1, 2, 3, 4, 5], n = 5
i = 4 → arr[4] = 5
i = 3 → arr[3] = 4
i = 2 → arr[2] = 3
i = 1 → arr[1] = 2
i = 0 → arr[0] = 1
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Reversed array:\n");

    for(i = n - 1; i >= 0; i--)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

> **Exam tip:** Real reverse (in-place swap) চাইলে — `for(i=0; i<n/2; i++) swap(arr[i], arr[n-i-1])`। Question-এর exact wording পড়ে decide করো।

---

## Problem 69 — Loop দিয়ে power বের করা

> **Question:** Write a C program to find power using loop (without recursion).

### সমস্যা বোঝো

`base` কে `exp` সংখ্যক বার গুণ করতে হবে। মানে $base^{exp}$ বের করতে হবে loop দিয়ে, recursion ছাড়া।

### Sample Input / Output

```
Input:
Enter base and exponent: 2 10

Output:
Result = 1024
```

```
Input:
Enter base and exponent: 5 3

Output:
Result = 125
```

### কাজের Logic ব্যাখ্যা

`result = 1` দিয়ে শুরু (গুণের identity)। তারপর `exp` বার `result *= base` করলে $base^{exp}$ পাওয়া যাবে।

$$ result = \underbrace{base \times base \times \ldots \times base}_{exp \text{ times}} $$

```
base = 2, exp = 4
i=1: result = 1*2 = 2
i=2: result = 2*2 = 4
i=3: result = 4*2 = 8
i=4: result = 8*2 = 16
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int base, exp, i;
    long long result = 1;

    printf("Enter base and exponent: ");
    scanf("%d %d", &base, &exp);

    for(i = 1; i <= exp; i++)
    {
        result *= base;
    }

    printf("Result = %lld\n", result);

    return 0;
}
```

> **Exam tip:** Big number-এর জন্য `long long` use করেছে, না হলে overflow হবে। `pow()` function `<math.h>`-এ আছে কিন্তু `double` return করে — manual loop বেশি reliable।

---

## Problem 70 — Student structure array

> **Question:** Write a C program to display structure array of students.

### সমস্যা বোঝো

একাধিক student-এর information (id, name, marks) রাখতে হবে। প্রতিটা student-এ ৩ ধরনের data — তাই `struct` দরকার। আর একাধিক student মানে struct-এর array।

### Sample Input / Output

```
Input:
Enter number of students: 2
Enter ID, Name, Marks:
101 Rahim 85.5
Enter ID, Name, Marks:
102 Karim 90.0

Output:
Student Records:
101 Rahim 85.50
102 Karim 90.00
```

### কাজের Logic ব্যাখ্যা

`struct Student` define করি ৩টা field দিয়ে। তারপর `struct Student s[100]` মানে ১০০ জন student-এর array। প্রতিটা element-এ dot operator (`.`) দিয়ে field access করি — যেমন `s[i].id`, `s[i].name`।

```
struct Student
├── int id
├── char name[50]
└── float marks

s[0] = {101, "Rahim", 85.5}
s[1] = {102, "Karim", 90.0}
```

### Complete Code

```c
#include <stdio.h>

struct Student
{
    int id;
    char name[50];
    float marks;
};

int main()
{
    struct Student s[100];
    int n, i;

    printf("Enter number of students: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++)
    {
        printf("\nEnter ID, Name, Marks:\n");
        scanf("%d %s %f", &s[i].id, s[i].name, &s[i].marks);
    }

    printf("\nStudent Records:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d %s %.2f\n", s[i].id, s[i].name, s[i].marks);
    }

    return 0;
}
```

> **Exam tip:** `scanf` এ `name`-এর আগে `&` দরকার নেই — কারণ array নাম নিজেই pointer। কিন্তু `id` আর `marks` scalar বলে `&` দরকার।

---

## Problem 71 — Array-এ prime numbers বের করা

> **Question:** Write a C program to find prime numbers in an array.

### সমস্যা বোঝো

একটা array-এর সব element-এর মধ্যে যেগুলো prime number, সেগুলো প্রিন্ট করতে হবে। Prime মানে যে সংখ্যা শুধু ১ আর নিজে দিয়ে ভাগ যায়।

### Sample Input / Output

```
Input:
Enter number of elements: 6
Enter array elements:
2 4 7 9 11 15

Output:
Prime numbers in array:
2 7 11
```

### কাজের Logic ব্যাখ্যা

দুই step:
1. `isPrime(n)` function — n কে 2 থেকে n/2 পর্যন্ত ভাগ করে দেখি কোনো divisor পাই কি না।
2. Main loop-এ array-এর প্রতিটা element-কে `isPrime()` দিয়ে check করে, prime হলে প্রিন্ট।

```
arr = [2, 4, 7, 9, 11, 15]
2  → prime ✓
4  → 4%2==0 → not prime
7  → prime ✓
9  → 9%3==0 → not prime
11 → prime ✓
15 → 15%3==0 → not prime
```

### Complete Code

```c
#include <stdio.h>

int isPrime(int n)
{
    int i;

    if(n <= 1)
        return 0;

    for(i = 2; i <= n / 2; i++)
    {
        if(n % i == 0)
            return 0;
    }

    return 1;
}

int main()
{
    int arr[100], n, i;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Prime numbers in array:\n");

    for(i = 0; i < n; i++)
    {
        if(isPrime(arr[i]))
        {
            printf("%d ", arr[i]);
        }
    }

    return 0;
}
```

> **Exam tip:** Optimization — `i <= sqrt(n)` use করলে অনেক faster হয়। Big array-এ এটা দেখালে extra credit।

---

## Problem 72 — ১ থেকে n পর্যন্ত odd sum

> **Question:** Write a C program to find the sum of odd numbers from 1 to n.

### সমস্যা বোঝো

১ থেকে n পর্যন্ত যত odd (বিজোড়) সংখ্যা আছে, সব যোগ করতে হবে। Odd মানে যেগুলো ২ দিয়ে ভাগ করলে remainder ১ হয়।

### Sample Input / Output

```
Input:
Enter a number: 10

Output:
Sum of odd numbers = 25
```

ব্যাখ্যা: 1 + 3 + 5 + 7 + 9 = 25

```
Input:
Enter a number: 5

Output:
Sum of odd numbers = 9
```

### কাজের Logic ব্যাখ্যা

`sum = 0` দিয়ে শুরু। Loop-এ ১ থেকে n পর্যন্ত ঘুরে যদি `i % 2 != 0` হয় (মানে odd), তাহলে `sum += i`।

$$ sum = 1 + 3 + 5 + \ldots = \sum_{i=1, i \text{ odd}}^{n} i $$

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        if(i % 2 != 0)
        {
            sum += i;
        }
    }

    printf("Sum of odd numbers = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Math formula জানলে এক লাইনে — প্রথম $k$ odd-এর sum হলো $k^2$। যেমন প্রথম ৫টা odd এর sum = 25।

---

## Problem 73 — Identity matrix check

> **Question:** Write a C program to check whether a matrix is identity matrix or not.

### সমস্যা বোঝো

Identity matrix-এ diagonal-এ (যেখানে row = column) সব ১ এবং বাকি জায়গায় সব ০।

$$ I_3 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$

### Sample Input / Output

```
Input:
Enter order of matrix: 3
Enter matrix elements:
1 0 0
0 1 0
0 0 1

Output:
Identity Matrix
```

```
Input:
Enter order of matrix: 2
Enter matrix elements:
1 0
1 1

Output:
Not Identity Matrix
```

### কাজের Logic ব্যাখ্যা

Nested loop দিয়ে matrix scan করি। দুইটা rule check:
- `i == j` (diagonal) হলে value `1` হতে হবে।
- `i != j` (off-diagonal) হলে value `0` হতে হবে।

যেকোনো একটা rule fail করলেই `flag = 0` সেট করে দিই।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], n, i, j, flag = 1;

    printf("Enter order of matrix: ");
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
        for(j = 0; j < n; j++)
        {
            if(i == j && a[i][j] != 1)
                flag = 0;

            if(i != j && a[i][j] != 0)
                flag = 0;
        }
    }

    if(flag == 1)
        printf("Identity Matrix\n");
    else
        printf("Not Identity Matrix\n");

    return 0;
}
```

> **Exam tip:** Identity matrix সবসময় square (n×n)। Check function-এর ভেতর `break` দিলে আরো fast — কিন্তু nested break জটিল।

---

## Problem 74 — Celsius থেকে Fahrenheit

> **Question:** Write a C program to convert Celsius to Fahrenheit.

### সমস্যা বোঝো

Temperature-এর unit conversion। Formula: $F = C \times \frac{9}{5} + 32$।

### Sample Input / Output

```
Input:
Enter temperature in Celsius: 100

Output:
Fahrenheit = 212.00
```

```
Input:
Enter temperature in Celsius: 0

Output:
Fahrenheit = 32.00
```

### কাজের Logic ব্যাখ্যা

Direct formula apply। `float` type ব্যবহার করছি কারণ temperature decimal হতে পারে।

$$ F = \frac{9C}{5} + 32 $$

যেমন $100°C \to \frac{900}{5} + 32 = 180 + 32 = 212°F$।

### Complete Code

```c
#include <stdio.h>

int main()
{
    float celsius, fahrenheit;

    printf("Enter temperature in Celsius: ");
    scanf("%f", &celsius);

    fahrenheit = (celsius * 9 / 5) + 32;

    printf("Fahrenheit = %.2f\n", fahrenheit);

    return 0;
}
```

> **Exam tip:** Reverse conversion — `C = (F - 32) * 5 / 9`। Exam-এ একটা চাইলে দুটোই লিখলে impression ভালো।

---

## Problem 75 — Recursion দিয়ে series sum

> **Question:** Write a C program to find the sum of series 1 + 2 + 3 + ... + n using recursion.

### সমস্যা বোঝো

১ + ২ + ৩ + ... + n এর sum recursion দিয়ে বের করতে হবে। Recursion মানে function নিজেই নিজেকে call করে।

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
Sum = 15
```

ব্যাখ্যা: 1+2+3+4+5 = 15

### কাজের Logic ব্যাখ্যা

Recurrence relation:
- Base case: `sum(0) = 0`
- Recursive case: `sum(n) = n + sum(n-1)`

```
sum(5)
= 5 + sum(4)
= 5 + 4 + sum(3)
= 5 + 4 + 3 + sum(2)
= 5 + 4 + 3 + 2 + sum(1)
= 5 + 4 + 3 + 2 + 1 + sum(0)
= 5 + 4 + 3 + 2 + 1 + 0
= 15
```

### Complete Code

```c
#include <stdio.h>

int sum(int n)
{
    if(n == 0)
        return 0;
    return n + sum(n - 1);
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Sum = %d\n", sum(n));

    return 0;
}
```

> **Exam tip:** Math দিয়ে formula হলো $\frac{n(n+1)}{2}$। Recursion বুঝা না গেলে এই formula দিয়েও answer মিলিয়ে দেখা যায়।

---

## Problem 76 — Pointer দিয়ে factorial

> **Question:** Write a C program to find factorial using pointer.

### সমস্যা বোঝো

Factorial মানে $n! = 1 \times 2 \times 3 \times \ldots \times n$। এখানে `fact` variable-এর address pointer-এ store করে, pointer dereference করে value update করতে হবে।

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
Factorial = 120
```

```
Input:
Enter a number: 6

Output:
Factorial = 720
```

### কাজের Logic ব্যাখ্যা

`long long *p = &fact` মানে `p` এখন `fact` variable-এর address ধরে আছে। `*p` মানে সেই address-এ যে value আছে। `*p = *p * i` মানে fact-এর value-কে `i` দিয়ে গুণ করছি pointer-এর মাধ্যমে।

```
fact = 1, p → fact
i=1: *p = 1*1 = 1   → fact = 1
i=2: *p = 1*2 = 2   → fact = 2
i=3: *p = 2*3 = 6   → fact = 6
i=4: *p = 6*4 = 24  → fact = 24
i=5: *p = 24*5=120  → fact = 120
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;
    long long fact = 1;
    long long *p = &fact;

    printf("Enter a number: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        *p = *p * i;
    }

    printf("Factorial = %lld\n", fact);

    return 0;
}
```

> **Exam tip:** Pointer-এর basic concept practice হয় এটায় — `*p` মানে value, `&fact` মানে address। `20!` থেকে বড় হলে `long long`-ও overflow।

---

## Problem 77 — Recursion দিয়ে digit sum

> **Question:** Write a C program to find sum of digits using recursion.

### সমস্যা বোঝো

একটা সংখ্যার সব digit যোগ করতে হবে recursion দিয়ে। যেমন 1234 → 1+2+3+4 = 10।

### Sample Input / Output

```
Input:
Enter a number: 1234

Output:
Sum of digits = 10
```

```
Input:
Enter a number: 999

Output:
Sum of digits = 27
```

### কাজের Logic ব্যাখ্যা

Trick: `n % 10` দিলে শেষ digit, `n / 10` দিলে বাকি অংশ।

- Base case: `sumDigits(0) = 0`
- Recursive: `sumDigits(n) = (n % 10) + sumDigits(n / 10)`

```
sumDigits(123)
= 3 + sumDigits(12)
= 3 + 2 + sumDigits(1)
= 3 + 2 + 1 + sumDigits(0)
= 3 + 2 + 1 + 0 = 6
```

### Complete Code

```c
#include <stdio.h>

int sumDigits(int n)
{
    if(n == 0)
        return 0;

    return (n % 10) + sumDigits(n / 10);
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Sum of digits = %d\n", sumDigits(n));

    return 0;
}
```

> **Exam tip:** যেকোনো digit-related problem-এ `% 10` আর `/ 10` জোড়া trick মনে রাখো — এটা দিয়ে almost সব digit problem solve হয়।

---

## Problem 78 — Function দিয়ে Armstrong number

> **Question:** Write a C program to check Armstrong number using function.

### সমস্যা বোঝো

Armstrong number মানে — সংখ্যাটার প্রতিটা digit-এর উপর (digit count) power বসিয়ে যোগ করলে original সংখ্যা পাওয়া যাবে। যেমন $153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$।

### Sample Input / Output

```
Input:
Enter a number: 153

Output:
Armstrong Number
```

```
Input:
Enter a number: 123

Output:
Not Armstrong Number
```

### কাজের Logic ব্যাখ্যা

দুই pass:
1. প্রথমে digit count বের করি (কতবার `/= 10` করলে 0 হয়)।
2. তারপর প্রতিটা digit-এর `pow(digit, count)` যোগ করি।

শেষে `sum == n` কি না check।

```
n = 153
Pass 1: 153 → 15 → 1 → 0, digits = 3
Pass 2: 153 % 10 = 3, sum += 3^3 = 27
       15 % 10 = 5,  sum += 5^3 = 125 → sum = 152
       1 % 10 = 1,   sum += 1^3 = 1   → sum = 153
sum == n → Armstrong
```

### Complete Code

```c
#include <stdio.h>
#include <math.h>

int isArmstrong(int n)
{
    int temp = n, digits = 0, sum = 0;

    while(temp != 0)
    {
        temp /= 10;
        digits++;
    }

    temp = n;

    while(temp != 0)
    {
        sum += pow(temp % 10, digits);
        temp /= 10;
    }

    return sum == n;
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    if(isArmstrong(n))
        printf("Armstrong Number\n");
    else
        printf("Not Armstrong Number\n");

    return 0;
}
```

> **Exam tip:** Compile-এ `gcc file.c -lm` দিতে হয় `math.h`-এর `pow()` use করলে। Exam-এ কোডে `<math.h>` include দেখাতে ভুলো না।

---

## Problem 79 — Pointer দিয়ে matrix transpose

> **Question:** Write a C program to find transpose of matrix using pointers.

### সমস্যা বোঝো

Transpose মানে row আর column swap করা। যদি `a[i][j]` থাকে, transpose-এ সেটা `t[j][i]` হবে।

$$ A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix} \implies A^T = \begin{pmatrix} 1 & 3 & 5 \\ 2 & 4 & 6 \end{pmatrix} $$

### Sample Input / Output

```
Input:
Enter rows and columns: 2 3
Enter matrix elements:
1 2 3
4 5 6

Output:
Transpose matrix:
1 4
2 5
3 6
```

### কাজের Logic ব্যাখ্যা

Pointer notation: `a[i][j]` সমান `*(*(a + i) + j)`। মানে `a + i` হলো i-th row-এর address, dereference করলে row pointer, তারপর `+ j` দিয়ে column-এ জাও।

Transpose-এ assignment: `*(*(t + j) + i) = *(*(a + i) + j)`।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], t[10][10];
    int row, col, i, j;

    printf("Enter rows and columns: ");
    scanf("%d %d", &row, &col);

    printf("Enter matrix elements:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            scanf("%d", (*(a + i) + j));
        }
    }

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            *(*(t + j) + i) = *(*(a + i) + j);
        }
    }

    printf("Transpose matrix:\n");

    for(i = 0; i < col; i++)
    {
        for(j = 0; j < row; j++)
        {
            printf("%d ", *(*(t + i) + j));
        }
        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Pointer notation না বুঝলে সাধারণ `a[i][j]` দিয়ে লেখো — answer same হবে। কিন্তু "using pointer" specifically চাইলে এই syntax জানা mandatory।

---

## Problem 80 — String-এ character frequency

> **Question:** Write a C program to find frequency of characters in a string.

### সমস্যা বোঝো

একটা string-এ প্রতিটা character কতবার এসেছে count করতে হবে। যেমন "hello"-তে `h=1, e=1, l=2, o=1`।

### Sample Input / Output

```
Input:
Enter a string: hello

Output:
Character frequencies:
e = 1
h = 1
l = 2
o = 1
```

### কাজের Logic ব্যাখ্যা

ASCII-তে total character 256টা। তাই `freq[256]` array নিই। প্রতিটা character-এর ASCII value-কে index হিসেবে use করে `freq[ascii]++` করি।

```
str = "hello"
'h' = 104 → freq[104]++ → 1
'e' = 101 → freq[101]++ → 1
'l' = 108 → freq[108]++ → 1
'l' = 108 → freq[108]++ → 2
'o' = 111 → freq[111]++ → 1
```

শেষে শুধু non-zero entry গুলো প্রিন্ট।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[100];
    int freq[256] = {0};
    int i = 0;

    printf("Enter a string: ");
    gets(str);

    while(str[i] != '\0')
    {
        freq[(int)str[i]]++;
        i++;
    }

    printf("Character frequencies:\n");

    for(i = 0; i < 256; i++)
    {
        if(freq[i] != 0)
        {
            printf("%c = %d\n", i, freq[i]);
        }
    }

    return 0;
}
```

> **Exam tip:** `freq[256] = {0}` মানে সব index 0 দিয়ে initialize। এটা না করলে garbage value থাকবে এবং wrong count হবে।

---

## Problem 81 — String sort (alphabetical order)

> **Question:** Write a C program to sort characters in a string.

### সমস্যা বোঝো

String-এর character গুলো alphabetical order-এ সাজাতে হবে। যেমন "banana" → "aaabnn"।

### Sample Input / Output

```
Input:
Enter a string: banana

Output:
Sorted string: aaabnn
```

```
Input:
Enter a string: hello

Output:
Sorted string: ehllo
```

### কাজের Logic ব্যাখ্যা

Bubble sort / selection sort variant। দুইটা nested loop:
- Outer: `i = 0` to `len-1`
- Inner: `j = i+1` to `len`

`str[i] > str[j]` হলে swap। Character গুলো ASCII value-এ compare হয়, তাই 'a' < 'b' < 'c' ...।

### Complete Code

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100], temp;
    int i, j, len;

    printf("Enter a string: ");
    gets(str);

    len = strlen(str);

    for(i = 0; i < len - 1; i++)
    {
        for(j = i + 1; j < len; j++)
        {
            if(str[i] > str[j])
            {
                temp = str[i];
                str[i] = str[j];
                str[j] = temp;
            }
        }
    }

    printf("Sorted string: %s\n", str);

    return 0;
}
```

> **Exam tip:** Uppercase 'A' (65) < lowercase 'a' (97) — তাই mixed case sort করলে uppercase সব আগে চলে আসবে। Case-insensitive sort চাইলে `tolower()` use করতে হবে।

---

## Problem 82 — Strong number check

> **Question:** Write a C program to check whether a number is strong number.

### সমস্যা বোঝো

Strong number মানে — সংখ্যাটার প্রতিটা digit-এর factorial যোগ করলে original সংখ্যা পাওয়া যায়। যেমন $145 = 1! + 4! + 5! = 1 + 24 + 120 = 145$।

### Sample Input / Output

```
Input:
Enter a number: 145

Output:
Strong Number
```

```
Input:
Enter a number: 123

Output:
Not Strong Number
```

### কাজের Logic ব্যাখ্যা

দুই step:
1. Recursive `factorial(n)` function।
2. Main loop-এ digit আলাদা করে (using `% 10` and `/ 10`) প্রতিটার factorial sum করি।

```
n = 145
145 % 10 = 5 → sum += 5! = 120
14 % 10 = 4  → sum += 4! = 24  → sum = 144
1 % 10 = 1   → sum += 1! = 1   → sum = 145
sum == n → Strong
```

### Complete Code

```c
#include <stdio.h>

int factorial(int n)
{
    if(n == 0)
        return 1;

    return n * factorial(n - 1);
}

int main()
{
    int n, temp, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    temp = n;

    while(temp != 0)
    {
        sum += factorial(temp % 10);
        temp /= 10;
    }

    if(sum == n)
        printf("Strong Number\n");
    else
        printf("Not Strong Number\n");

    return 0;
}
```

> **Exam tip:** Famous strong numbers: 1, 2, 145, 40585। মনে রাখলে exam-এ verify করতে সুবিধা।

---

## Problem 83 — Function দিয়ে Perfect number

> **Question:** Write a C program to check whether a number is perfect using function.

### সমস্যা বোঝো

Perfect number মানে — সংখ্যাটার সব proper divisor (নিজে ছাড়া) যোগ করলে original সংখ্যা পাওয়া যায়। যেমন $6 = 1 + 2 + 3$।

### Sample Input / Output

```
Input:
Enter a number: 6

Output:
Perfect Number
```

```
Input:
Enter a number: 28

Output:
Perfect Number
```

```
Input:
Enter a number: 10

Output:
Not Perfect Number
```

### কাজের Logic ব্যাখ্যা

Loop `i = 1` থেকে `n/2` পর্যন্ত। যদি `n % i == 0` হয়, তাহলে `i` একটা divisor — sum-এ যোগ করি। শেষে `sum == n` কি না দেখি।

```
n = 28
divisors: 1, 2, 4, 7, 14
sum = 1+2+4+7+14 = 28 → Perfect ✓
```

### Complete Code

```c
#include <stdio.h>

int isPerfect(int n)
{
    int i, sum = 0;

    for(i = 1; i <= n / 2; i++)
    {
        if(n % i == 0)
            sum += i;
    }

    return sum == n;
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    if(isPerfect(n))
        printf("Perfect Number\n");
    else
        printf("Not Perfect Number\n");

    return 0;
}
```

> **Exam tip:** First 4 perfect numbers: 6, 28, 496, 8128। পরীক্ষায় example দিতে এগুলো জানা থাকা ভালো।

---

## Problem 84 — GCD ব্যবহার করে LCM

> **Question:** Write a C program to find LCM using GCD.

### সমস্যা বোঝো

দুটো সংখ্যার LCM (Least Common Multiple) বের করতে হবে। Formula: $LCM(a, b) = \frac{a \times b}{GCD(a, b)}$।

### Sample Input / Output

```
Input:
Enter two numbers: 12 18

Output:
LCM = 36
```

```
Input:
Enter two numbers: 4 6

Output:
LCM = 12
```

### কাজের Logic ব্যাখ্যা

GCD বের করি Euclidean algorithm দিয়ে recursively:
- `gcd(a, 0) = a`
- `gcd(a, b) = gcd(b, a % b)`

তারপর LCM = (a*b) / GCD।

```
gcd(12, 18)
= gcd(18, 12)   [a%b = 12]
= gcd(12, 6)    [18%12 = 6]
= gcd(6, 0)     [12%6 = 0]
= 6

LCM = (12 * 18) / 6 = 216 / 6 = 36
```

### Complete Code

```c
#include <stdio.h>

int gcd(int a, int b)
{
    if(b == 0)
        return a;
    return gcd(b, a % b);
}

int main()
{
    int a, b, lcm;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    lcm = (a * b) / gcd(a, b);

    printf("LCM = %d\n", lcm);

    return 0;
}
```

> **Exam tip:** Euclidean algorithm-এর recursive form খুব short আর elegant — exam-এ এটা দেখালে impression। Big numbers-এ `(a*b)` overflow এড়াতে `(a/gcd)*b` লেখা safe।

---

## Problem 85 — সংখ্যার digit frequency

> **Question:** Write a C program to count frequency of digits in a number.

### সমস্যা বোঝো

একটা সংখ্যার মধ্যে প্রতিটা digit (০-৯) কতবার আছে count করতে হবে। যেমন 11223 → 1=2, 2=2, 3=1।

### Sample Input / Output

```
Input:
Enter a number: 11223

Output:
Digit frequency:
1 = 2
2 = 2
3 = 1
```

```
Input:
Enter a number: 9009

Output:
Digit frequency:
0 = 2
9 = 2
```

### কাজের Logic ব্যাখ্যা

Digit মাত্র ১০টা (0-9), তাই `freq[10]` array যথেষ্ট। প্রতিটা digit `n % 10` দিয়ে আলাদা করে `freq[digit]++` করি, তারপর `n /= 10`।

```
n = 11223
n%10=3 → freq[3]=1 → n=1122
n%10=2 → freq[2]=1 → n=112
n%10=2 → freq[2]=2 → n=11
n%10=1 → freq[1]=1 → n=1
n%10=1 → freq[1]=2 → n=0
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, digit, freq[10] = {0};

    printf("Enter a number: ");
    scanf("%d", &n);

    while(n != 0)
    {
        digit = n % 10;
        freq[digit]++;
        n /= 10;
    }

    printf("Digit frequency:\n");

    for(int i = 0; i < 10; i++)
    {
        if(freq[i] != 0)
            printf("%d = %d\n", i, freq[i]);
    }

    return 0;
}
```

> **Exam tip:** Character frequency (Problem 80) আর digit frequency-এর pattern একই — শুধু array size আলাদা। দুটো একসাথে পড়লে confuse হবে না।

---

## Problem 86 — Array-এ সবচেয়ে বেশিবার আসা element

> **Question:** Write a C program to find maximum repeated element in an array.

### সমস্যা বোঝো

একটা array-এর মধ্যে যে element সবচেয়ে বেশিবার এসেছে, সেটা বের করতে হবে।

### Sample Input / Output

```
Input:
Enter number of elements: 7
Enter elements:
1 2 3 2 4 2 5

Output:
Most repeated element = 2
```

### কাজের Logic ব্যাখ্যা

প্রতিটা element-এর জন্য পরের সব position-এ check করি কতবার আছে। Already counted element কে `freq[j] = 0` করে mark করি যাতে দ্বিতীয়বার count না হয়। শেষে যার `freq` সবচেয়ে বেশি, সেটা answer।

```
arr = [1, 2, 3, 2, 4, 2, 5]
i=0: 1 আছে 1 বার → freq[0]=1
i=1: 2 আছে 3 বার → freq[1]=3, freq[3]=0, freq[5]=0
i=2: 3 আছে 1 বার → freq[2]=1
...
maxCount = 3, element = 2
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], freq[100];
    int n, i, j, maxCount = 0, element;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
        freq[i] = -1;
    }

    for(i = 0; i < n; i++)
    {
        int count = 1;

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

    for(i = 0; i < n; i++)
    {
        if(freq[i] > maxCount)
        {
            maxCount = freq[i];
            element = arr[i];
        }
    }

    printf("Most repeated element = %d\n", element);

    return 0;
}
```

> **Exam tip:** O(n²) complexity আছে এখানে। Hash map জানলে O(n)-এ করা যায়, কিন্তু C-তে hash map manual। Exam-এ এই version-ই acceptable।

---

## Problem 87 — Square root approximation (sqrt ছাড়া)

> **Question:** Write a C program to find square root approximation (without sqrt function).

### সমস্যা বোঝো

`sqrt()` function ব্যবহার না করে কোনো সংখ্যার approximate square root বের করতে হবে।

### Sample Input / Output

```
Input:
Enter a number: 25

Output:
Approx square root = 5.00
```

```
Input:
Enter a number: 50

Output:
Approx square root = 7.00
```

### কাজের Logic ব্যাখ্যা

Brute-force approach: `i = 0, 1, 2, ...` করে যেখানে `i*i > n` হবে, সেখানে থামি। তখন `i-1` হলো integer part of square root।

```
n = 25
i=0: 0*0=0 ≤ 25, ok
i=1: 1*1=1 ≤ 25, ok
...
i=5: 5*5=25 ≤ 25, ok
i=6: 6*6=36 > 25, stop
result = 6 - 1 = 5
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    float n, i;

    printf("Enter a number: ");
    scanf("%f", &n);

    for(i = 0; i * i <= n; i++);

    printf("Approx square root = %.2f\n", i - 1);

    return 0;
}
```

> **Exam tip:** এটা শুধু integer part দেয়, accurate decimal না। Newton-Raphson method দেখালে advanced answer পাবে। Loop-এ `i++` মানে integer step।

---

## Problem 88 — Function দিয়ে Palindrome

> **Question:** Write a C program to check whether a number is palindrome using function.

### সমস্যা বোঝো

Palindrome মানে — সংখ্যাটা উল্টা করলেও same থাকে। যেমন 121, 1331, 12321।

### Sample Input / Output

```
Input:
Enter a number: 121

Output:
Palindrome Number
```

```
Input:
Enter a number: 1234

Output:
Not Palindrome
```

### কাজের Logic ব্যাখ্যা

Reverse করে compare করি। Reverse algorithm:
- `rev = rev * 10 + (n % 10)`
- `n /= 10`

শেষে `rev == n` (original) কি না দেখি।

```
n = 121, temp = 121, rev = 0
rev = 0*10 + 1 = 1,   temp = 12
rev = 1*10 + 2 = 12,  temp = 1
rev = 12*10 + 1 = 121, temp = 0
rev (121) == n (121) → Palindrome
```

### Complete Code

```c
#include <stdio.h>

int isPalindrome(int n)
{
    int rev = 0, temp = n;

    while(temp != 0)
    {
        rev = rev * 10 + (temp % 10);
        temp /= 10;
    }

    return rev == n;
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    if(isPalindrome(n))
        printf("Palindrome Number\n");
    else
        printf("Not Palindrome\n");

    return 0;
}
```

> **Exam tip:** এই reverse trick (`rev * 10 + digit`) দিয়ে almost সব digit-related problem solve হয় — যেমন digit reverse, palindrome, Armstrong sub-task।

---

## Problem 89 — Pointer দিয়ে diagonal sum

> **Question:** Write a C program to find sum of diagonal elements using pointer.

### সমস্যা বোঝো

Square matrix-এর main diagonal-এ (যেখানে row index = column index) যত element আছে, সব যোগ করতে হবে — কিন্তু pointer notation দিয়ে।

### Sample Input / Output

```
Input:
Enter matrix size: 3
Enter elements:
1 2 3
4 5 6
7 8 9

Output:
Diagonal sum = 15
```

ব্যাখ্যা: 1 + 5 + 9 = 15

### কাজের Logic ব্যাখ্যা

`*(*(a + i) + i)` মানে `a[i][i]`। Loop চালিয়ে i=0 থেকে n-1 পর্যন্ত diagonal element যোগ করি।

```
matrix:
1 2 3
4 5 6
7 8 9

diagonal: a[0][0]=1, a[1][1]=5, a[2][2]=9
sum = 1+5+9 = 15
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], n, i, sum = 0;

    printf("Enter matrix size: ");
    scanf("%d", &n);

    printf("Enter elements:\n");

    for(i = 0; i < n; i++)
    {
        for(int j = 0; j < n; j++)
        {
            scanf("%d", (*(a + i) + j));
        }
    }

    for(i = 0; i < n; i++)
    {
        sum += *(*(a + i) + i);
    }

    printf("Diagonal sum = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Anti-diagonal চাইলে — `a[i][n-1-i]` use করো। Pointer notation: `*(*(a + i) + (n - 1 - i))`।

---

## Problem 90 — Pointer দিয়ে string reverse

> **Question:** Write a C program to reverse a string using pointer.

### সমস্যা বোঝো

String-এর শেষ থেকে শুরু পর্যন্ত character গুলো প্রিন্ট করতে হবে — pointer দিয়ে।

### Sample Input / Output

```
Input:
Enter a string: hello

Output:
Reversed string: olleh
```

```
Input:
Enter a string: BANK

Output:
Reversed string: KNAB
```

### কাজের Logic ব্যাখ্যা

`p = str` মানে `p` এখন string-এর প্রথম character-এর address। `*(p + i)` মানে i-th character। Loop শেষ index থেকে 0 পর্যন্ত — প্রতিটা character প্রিন্ট।

```
str = "hello", len = 5, p → 'h'
i=4: *(p+4) = 'o'
i=3: *(p+3) = 'l'
i=2: *(p+2) = 'l'
i=1: *(p+1) = 'e'
i=0: *(p+0) = 'h'
```

### Complete Code

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];
    char *p;
    int len, i;

    printf("Enter a string: ");
    gets(str);

    p = str;
    len = strlen(str);

    printf("Reversed string: ");

    for(i = len - 1; i >= 0; i--)
    {
        printf("%c", *(p + i));
    }

    printf("\n");

    return 0;
}
```

> **Exam tip:** এটা শুধু reverse print করে — actual string modify হচ্ছে না। In-place reverse চাইলে swap করতে হবে। Question wording দেখে ঠিক করো।

---

## Problem 91 — Array element-গুলোর factorial

> **Question:** Write a C program to find factorial of each element in an array.

### সমস্যা বোঝো

একটা array-এর প্রতিটা element-এর factorial বের করে প্রিন্ট করতে হবে।

### Sample Input / Output

```
Input:
Enter number of elements: 4
Enter elements:
1 2 3 5

Output:
Factorials:
1 2 6 120
```

### কাজের Logic ব্যাখ্যা

`factorial(n)` function — iterative loop দিয়ে $1 \times 2 \times \ldots \times n$ গুণ করে। Main loop-এ array-এর প্রতিটা element পাঠাই function-এ।

```
arr = [1, 2, 3, 5]
factorial(1) = 1
factorial(2) = 2
factorial(3) = 6
factorial(5) = 120
```

### Complete Code

```c
#include <stdio.h>

int factorial(int n)
{
    int i, fact = 1;

    for(i = 1; i <= n; i++)
    {
        fact *= i;
    }

    return fact;
}

int main()
{
    int arr[100], n, i;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Factorials:\n");

    for(i = 0; i < n; i++)
    {
        printf("%d ", factorial(arr[i]));
    }

    return 0;
}
```

> **Exam tip:** Function reuse-এর সুন্দর example। `int fact` overflow হবে 13! থেকে — `long long` use করা safer।

---

## Problem 92 — Series 1 + 1/2 + 1/3 + ... + 1/n

> **Question:** Write a C program to find sum of series: 1 + 1/2 + 1/3 + ... + 1/n.

### সমস্যা বোঝো

Harmonic series-এর partial sum বের করতে হবে। প্রতিটা term হলো $\frac{1}{i}$, যেখানে $i = 1, 2, 3, \ldots, n$।

### Sample Input / Output

```
Input:
Enter n: 3

Output:
Sum = 1.83
```

ব্যাখ্যা: 1 + 0.5 + 0.333 = 1.833

```
Input:
Enter n: 5

Output:
Sum = 2.28
```

### কাজের Logic ব্যাখ্যা

`float sum = 0.0` দিয়ে শুরু। Loop-এ `sum += 1.0 / i`। **খেয়াল রাখো** — `1/i` লিখলে integer division হবে এবং সব 0 আসবে। তাই `1.0 / i` লেখা mandatory।

$$ H_n = \sum_{i=1}^{n} \frac{1}{i} = 1 + \frac{1}{2} + \frac{1}{3} + \ldots + \frac{1}{n} $$

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;
    float sum = 0.0;

    printf("Enter n: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        sum += (1.0 / i);
    }

    printf("Sum = %.2f\n", sum);

    return 0;
}
```

> **Exam tip:** `1.0 / i` বনাম `1 / i` — এই tiny difference exam-এ ভুল করালে পুরো marks যাবে। Floating-point operation-এ at least একটা operand `float`/`double` হতে হবে।

---

## Problem 93 — Spy number

> **Question:** Write a C program to check whether a number is spy number. (A number where sum of digits = product of digits)

### সমস্যা বোঝো

Spy number মানে — digit-গুলোর sum আর product সমান। যেমন 1124 → sum = 1+1+2+4 = 8, product = 1×1×2×4 = 8 ✓।

### Sample Input / Output

```
Input:
Enter a number: 1124

Output:
Spy Number
```

```
Input:
Enter a number: 1234

Output:
Not Spy Number
```

ব্যাখ্যা: sum = 10, product = 24 → not equal।

### কাজের Logic ব্যাখ্যা

Loop-এ `n % 10` দিয়ে digit বের করে — `sum += digit` এবং `product *= digit` দুটোই update করি। শেষে compare।

**Important:** `product = 1` দিয়ে শুরু (multiplicative identity), `sum = 0` দিয়ে শুরু (additive identity)।

```
n = 1124
digit=4: sum=4, product=4
digit=2: sum=6, product=8
digit=1: sum=7, product=8
digit=1: sum=8, product=8
sum == product → Spy
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, sum = 0, product = 1, digit;

    printf("Enter a number: ");
    scanf("%d", &n);

    while(n != 0)
    {
        digit = n % 10;
        sum += digit;
        product *= digit;
        n /= 10;
    }

    if(sum == product)
        printf("Spy Number\n");
    else
        printf("Not Spy Number\n");

    return 0;
}
```

> **Exam tip:** Examples — 1, 22, 123, 1124, 132, 1412 সব spy number। 0 digit থাকলে product 0 হবে — sum 0 হলেই spy।

---

## Problem 94 — Function-এ array max

> **Question:** Write a C program to find largest element using function and array.

### সমস্যা বোঝো

Array-এর সব element-এর মধ্যে যেটা সবচেয়ে বড়, সেটা একটা function থেকে return করতে হবে।

### Sample Input / Output

```
Input:
Enter number of elements: 5
10 25 8 100 47

Output:
Maximum = 100
```

### কাজের Logic ব্যাখ্যা

`findMax(arr, n)` function:
1. `max = arr[0]` ধরে শুরু।
2. Loop `i = 1` থেকে — যদি `arr[i] > max` হয়, `max = arr[i]` update।
3. শেষে `max` return।

```
arr = [10, 25, 8, 100, 47]
max = 10
i=1: 25 > 10 → max=25
i=2: 8 > 25? No
i=3: 100 > 25 → max=100
i=4: 47 > 100? No
return 100
```

### Complete Code

```c
#include <stdio.h>

int findMax(int arr[], int n)
{
    int max = arr[0], i;

    for(i = 1; i < n; i++)
    {
        if(arr[i] > max)
            max = arr[i];
    }

    return max;
}

int main()
{
    int arr[100], n, i;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Maximum = %d\n", findMax(arr, n));

    return 0;
}
```

> **Exam tip:** Array function-এ pass করলে actually pointer pass হয় — array নিজেই copy হয় না। তাই function-এর ভেতর array modify করলে original-ও change হবে।

---

## Problem 95 — Uppercase ও lowercase count

> **Question:** Write a C program to count uppercase and lowercase letters in a string.

### সমস্যা বোঝো

String-এ কয়টা uppercase letter ('A'-'Z') আর কয়টা lowercase letter ('a'-'z') আছে count করতে হবে।

### Sample Input / Output

```
Input:
Enter a string: Hello World

Output:
Uppercase = 2
Lowercase = 8
```

```
Input:
Enter a string: BANK exam 2026

Output:
Uppercase = 4
Lowercase = 3
```

### কাজের Logic ব্যাখ্যা

ASCII range check:
- 'A' (65) থেকে 'Z' (90) → uppercase
- 'a' (97) থেকে 'z' (122) → lowercase
- বাকি সব ignore (digit, space, symbol)

```
str = "Hello World"
H → upper (1)
e → lower (1)
l → lower (2)
l → lower (3)
o → lower (4)
  → skip (space)
W → upper (2)
o → lower (5)
r → lower (6)
l → lower (7)
d → lower (8)
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[100];
    int i = 0, upper = 0, lower = 0;

    printf("Enter a string: ");
    gets(str);

    while(str[i] != '\0')
    {
        if(str[i] >= 'A' && str[i] <= 'Z')
            upper++;
        else if(str[i] >= 'a' && str[i] <= 'z')
            lower++;

        i++;
    }

    printf("Uppercase = %d\n", upper);
    printf("Lowercase = %d\n", lower);

    return 0;
}
```

> **Exam tip:** `<ctype.h>`-এ `isupper()` আর `islower()` function আছে। Manual range check বুঝলে easier — exam-এ ASCII knowledge দেখাও।

---

## Problem 96 — দুই matrix-এর difference

> **Question:** Write a C program to find difference between two matrices.

### সমস্যা বোঝো

দুটো same-size matrix-এর element-wise subtraction করতে হবে। `diff[i][j] = a[i][j] - b[i][j]`।

### Sample Input / Output

```
Input:
Enter rows and columns: 2 2
Enter first matrix:
5 6
7 8
Enter second matrix:
1 2
3 4

Output:
Difference matrix:
4 4
4 4
```

### কাজের Logic ব্যাখ্যা

Same dimension matrix না হলে subtraction possible না। তাই rows আর columns same নিতে হবে। তারপর nested loop-এ প্রতিটা cell-এ subtraction।

$$ C[i][j] = A[i][j] - B[i][j] $$

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], b[10][10], diff[10][10];
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
            diff[i][j] = a[i][j] - b[i][j];
        }
    }

    printf("Difference matrix:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            printf("%d ", diff[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

> **Exam tip:** Matrix addition, subtraction, scalar multiplication — সব same pattern। শুধু operation change হয়। একটা শিখলে বাকি গুলো automatic।

---

## Problem 97 — সংখ্যার সব divisor প্রিন্ট

> **Question:** Write a C program to print all divisors of a number.

### সমস্যা বোঝো

একটা সংখ্যা `n`-এর সব divisor (যে সংখ্যাগুলো দিয়ে n পুরোপুরি ভাগ যায়) প্রিন্ট করতে হবে।

### Sample Input / Output

```
Input:
Enter a number: 12

Output:
Divisors:
1 2 3 4 6 12
```

```
Input:
Enter a number: 7

Output:
Divisors:
1 7
```

### কাজের Logic ব্যাখ্যা

`i = 1` থেকে `n` পর্যন্ত loop। যদি `n % i == 0` হয়, তাহলে `i` একটা divisor — প্রিন্ট।

```
n = 12
i=1: 12%1=0 ✓
i=2: 12%2=0 ✓
i=3: 12%3=0 ✓
i=4: 12%4=0 ✓
i=5: 12%5=2 ✗
i=6: 12%6=0 ✓
...
i=12: 12%12=0 ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Divisors:\n");

    for(i = 1; i <= n; i++)
    {
        if(n % i == 0)
        {
            printf("%d ", i);
        }
    }

    return 0;
}
```

> **Exam tip:** Optimization — `i <= sqrt(n)` করে দু'দিকে print (i আর n/i) করলে অনেক fast। Big number-এ এটা দেখাও।

---

## Problem 98 — Odd-positioned element-এর sum

> **Question:** Write a C program to find sum of odd positioned elements in an array.

### সমস্যা বোঝো

Array-এর index 0, 2, 4, ... position-এর element গুলো যোগ করতে হবে। (Code-এ index 0 কে "odd positioned" ধরা হয়েছে — actually 0-indexed-এ এগুলো even index, কিন্তু 1-based "1st, 3rd, 5th" position।)

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter elements:
10 20 30 40 50

Output:
Sum of odd positioned elements = 90
```

ব্যাখ্যা: arr[0]=10, arr[2]=30, arr[4]=50 → 10+30+50 = 90

### কাজের Logic ব্যাখ্যা

`for(i = 0; i < n; i += 2)` — প্রতিবার i 2 করে বাড়ছে, তাই 0, 2, 4, ... index-গুলো visit হয়।

```
arr = [10, 20, 30, 40, 50]
i=0: sum=10
i=2: sum=10+30=40
i=4: sum=40+50=90
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i, sum = 0;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    for(i = 0; i < n; i += 2)
    {
        sum += arr[i];
    }

    printf("Sum of odd positioned elements = %d\n", sum);

    return 0;
}
```

> **Exam tip:** "Odd positioned" শব্দটা ambiguous — 0-indexed না 1-indexed? Question paper-এ specify না থাকলে আগে assumption লিখো — "Considering 1st, 3rd, 5th... position as odd"।

---

## Problem 99 — Harshad number check

> **Question:** Write a C program to check whether a number is Harshad number. (A number divisible by sum of digits)

### সমস্যা বোঝো

Harshad (Niven) number মানে — সংখ্যাটা তার digit-গুলোর sum দিয়ে পুরোপুরি ভাগ যায়। যেমন $18 \div (1+8) = 18 \div 9 = 2$ ✓।

### Sample Input / Output

```
Input:
Enter a number: 18

Output:
Harshad Number
```

```
Input:
Enter a number: 19

Output:
Not Harshad Number
```

ব্যাখ্যা: 19 / (1+9) = 19/10 = 1.9 → not divisible।

### কাজের Logic ব্যাখ্যা

দুই step:
1. Digit sum বের করো (`temp % 10` এবং `temp /= 10` loop)।
2. `n % sum == 0` কি না দেখো।

```
n = 18, temp = 18, sum = 0
temp%10 = 8, sum = 8, temp = 1
temp%10 = 1, sum = 9, temp = 0
n % sum = 18 % 9 = 0 → Harshad ✓
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, temp, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    temp = n;

    while(temp != 0)
    {
        sum += temp % 10;
        temp /= 10;
    }

    if(n % sum == 0)
        printf("Harshad Number\n");
    else
        printf("Not Harshad Number\n");

    return 0;
}
```

> **Exam tip:** Harshad numbers under 100: 1, 2, ..., 9, 10, 12, 18, 20, 21, 24, 27, 30 ... — খুব common pattern। `temp` use না করলে original `n` change হয়ে যাবে — তাই copy mandatory।

---

## Problem 100 — Recursion দিয়ে multiplication

> **Question:** Write a C program to find multiplication of two numbers using recursion.

### সমস্যা বোঝো

দুটো সংখ্যা `a` আর `b`-এর গুণফল বের করতে হবে — কিন্তু `*` operator ব্যবহার না করে repeated addition + recursion দিয়ে।

### Sample Input / Output

```
Input:
Enter two numbers: 5 4

Output:
Result = 20
```

```
Input:
Enter two numbers: 7 3

Output:
Result = 21
```

### কাজের Logic ব্যাখ্যা

$a \times b = a + a + a + \ldots$ (b বার)। Recurrence:
- Base case: `multiply(a, 0) = 0`
- Recursive: `multiply(a, b) = a + multiply(a, b-1)`

```
multiply(5, 4)
= 5 + multiply(5, 3)
= 5 + 5 + multiply(5, 2)
= 5 + 5 + 5 + multiply(5, 1)
= 5 + 5 + 5 + 5 + multiply(5, 0)
= 5 + 5 + 5 + 5 + 0
= 20
```

### Complete Code

```c
#include <stdio.h>

int multiply(int a, int b)
{
    if(b == 0)
        return 0;

    return a + multiply(a, b - 1);
}

int main()
{
    int a, b;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    printf("Result = %d\n", multiply(a, b));

    return 0;
}
```

> **Exam tip:** Negative `b`-এ এই function infinite recursion-এ পড়বে — stack overflow। Production code-এ `if(b < 0)` handle করতে হয়। Exam-এ positive assumption লেখো।

---

## Problems 66–100 সংক্ষেপ

| # | বিষয় | মূল Concept |
|---|------|-------------|
| 66 | Even numbers print | `i % 2 == 0` filter |
| 67 | String digit-only check | ASCII range `'0'`-`'9'` |
| 68 | Array reverse print | Reverse loop `i = n-1 → 0` |
| 69 | Power using loop | `result *= base` n বার |
| 70 | Student structure array | `struct` + array of structs |
| 71 | Prime numbers in array | `isPrime()` function reuse |
| 72 | Sum of odd numbers | `i % 2 != 0` filter + sum |
| 73 | Identity matrix check | Diagonal=1, off-diagonal=0 |
| 74 | Celsius → Fahrenheit | $F = \frac{9C}{5} + 32$ |
| 75 | Sum series recursion | `sum(n) = n + sum(n-1)` |
| 76 | Factorial via pointer | `*p = *p * i` |
| 77 | Digit sum recursion | `(n%10) + sumDigits(n/10)` |
| 78 | Armstrong via function | digit count → power sum |
| 79 | Matrix transpose pointer | `*(*(t+j)+i) = *(*(a+i)+j)` |
| 80 | Char frequency | `freq[256]` ASCII array |
| 81 | String sort | Bubble sort on char compare |
| 82 | Strong number | `sum of digit factorials == n` |
| 83 | Perfect via function | Sum of proper divisors == n |
| 84 | LCM via GCD | $LCM = \frac{a \cdot b}{GCD}$ |
| 85 | Digit frequency | `freq[10]` digit array |
| 86 | Max repeated element | Nested count + mark seen |
| 87 | Square root approx | Loop `i*i <= n` |
| 88 | Palindrome via function | Reverse-and-compare |
| 89 | Diagonal sum pointer | `*(*(a+i)+i)` for `i=0..n-1` |
| 90 | String reverse pointer | Print `*(p+i)` from end |
| 91 | Array element factorial | `factorial()` reused per element |
| 92 | Harmonic series sum | `1.0/i` (avoid integer div) |
| 93 | Spy number | `digit sum == digit product` |
| 94 | Largest via function | `findMax(arr, n)` |
| 95 | Upper/lowercase count | ASCII range A-Z, a-z |
| 96 | Matrix difference | Element-wise `a[i][j]-b[i][j]` |
| 97 | All divisors print | `n % i == 0` for `i=1..n` |
| 98 | Odd positioned sum | `i += 2` from 0 |
| 99 | Harshad number | `n % digitSum(n) == 0` |
| 100 | Multiplication recursion | `a + multiply(a, b-1)` |

---

> **Practice করো:** এই ১০০টা problem যে বারবার নিজে লিখতে পারবে, তার BB IT Programmer exam-এর C programming অংশে ভালো নম্বর পাওয়া নিশ্চিত।
