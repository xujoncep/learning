# Bangladesh Bank IT Exam — C Programming Problems (Set 3)

> **Problems 36–65** | Topics: Selection Sort, Matrix, String, Structure, Pointer, Loop, Leap Year, Digits, Palindrome, Armstrong, Prime Range, Average

---

## Problem 36 — Array এর largest ও smallest element

> **Question:** Write a C program to find the largest and smallest element in an array.

### সমস্যা বোঝো

User থেকে কিছু সংখ্যা নিয়ে array তে রাখতে হবে, তারপর সেই array থেকে সবচেয়ে বড় (largest) এবং সবচেয়ে ছোট (smallest) সংখ্যাটি বের করে দেখাতে হবে। এটি array traversal-এর সবচেয়ে basic প্রশ্ন।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
12 45 7 89 23

Output:
Largest element = 89
Smallest element = 7
```

```
Input:
Enter number of elements: 4
Enter array elements:
-5 10 -20 8

Output:
Largest element = 10
Smallest element = -20
```

### কাজের Logic ব্যাখ্যা

প্রথমে `largest` ও `smallest` দুটো variable কে array এর প্রথম element (`arr[0]`) দিয়ে initialize করা হয়। কারণ যদি আমরা 0 দিয়ে শুরু করি, তাহলে negative number থাকলে ভুল হবে।

এরপর `i = 1` থেকে loop চালিয়ে প্রতিটি element কে compare করা হয়:

```
arr = [12, 45, 7, 89, 23]
Initial: largest=12, smallest=12
i=1: 45>12 → largest=45
i=2: 7<12 → smallest=7
i=3: 89>45 → largest=89
i=4: 23 → no change
Final: largest=89, smallest=7
```

একবার loop চালালেই (single pass) দুটো কাজ একসাথে হয়ে যায় — efficient O(n)।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    int largest, smallest;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    largest = smallest = arr[0];

    for(i = 1; i < n; i++)
    {
        if(arr[i] > largest)
        {
            largest = arr[i];
        }

        if(arr[i] < smallest)
        {
            smallest = arr[i];
        }
    }

    printf("Largest element = %d\n", largest);
    printf("Smallest element = %d\n", smallest);

    return 0;
}
```

> **Exam tip:** কখনই `largest = 0` বা `smallest = INT_MAX` দিয়ে শুরু করবে না কারণ negative array এ ভুল হতে পারে। সবসময় `arr[0]` দিয়ে initialize কর — এটি safe approach।

---

## Problem 37 — Symmetric Matrix চেক করা

> **Question:** Write a C program to check whether a matrix is symmetric or not.

### সমস্যা বোঝো

একটি matrix কে **symmetric** বলা হয় যদি এর transpose মূল matrix এর সমান হয়, অর্থাৎ `A[i][j] == A[j][i]` সব position এর জন্য। প্রোগ্রামটি একটি n×n matrix নেবে এবং বলবে এটি symmetric কিনা।

### Sample Input / Output

```
Input:
Enter order of matrix: 3
Enter matrix elements:
1 2 3
2 4 5
3 5 6

Output:
Matrix is Symmetric.
```

```
Input:
Enter order of matrix: 2
Enter matrix elements:
1 2
3 4

Output:
Matrix is not Symmetric.
```

### কাজের Logic ব্যাখ্যা

দুই ধাপে কাজ হয়:

**Step 1 — Transpose বের করা:** প্রতিটি `a[i][j]` কে `transpose[j][i]` তে রাখা হয়। অর্থাৎ row হয়ে যায় column।

```
Original:        Transpose:
1 2 3            1 2 3
2 4 5    →       2 4 5
3 5 6            3 5 6
```

**Step 2 — Element-wise compare:** যদি কোনো position এ `a[i][j] != transpose[i][j]` হয়, তাহলে `flag = 0` করে symmetric নয় বলে দেওয়া হয়। সব element সমান হলে symmetric।

মনে রাখবে — symmetric matrix সবসময় square (n×n) হতে হবে। main diagonal বরাবর mirror image হলেই symmetric।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], transpose[10][10];
    int n, i, j, flag = 1;

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
            transpose[j][i] = a[i][j];
        }
    }

    for(i = 0; i < n; i++)
    {
        for(j = 0; j < n; j++)
        {
            if(a[i][j] != transpose[i][j])
            {
                flag = 0;
                break;
            }
        }
    }

    if(flag == 1)
        printf("Matrix is Symmetric.\n");
    else
        printf("Matrix is not Symmetric.\n");

    return 0;
}
```

> **Exam tip:** Optimization হিসেবে transpose আলাদা না করেও সরাসরি `a[i][j] != a[j][i]` চেক করা যায় — এতে memory বাঁচে। Exam এ লিখলে time/space complexity বললে extra mark পাবে।

---

## Problem 38 — strlen() ছাড়া String এর length

> **Question:** Write a C program to find the length of a string without using strlen().

### সমস্যা বোঝো

C তে string একটি character array যা `'\0'` (null character) দিয়ে শেষ হয়। এই null terminator পর্যন্ত গুনে গুনে character এর সংখ্যা বের করতে হবে — কোনো built-in function ব্যবহার না করে।

### Sample Input / Output

```
Input:
Enter a string: Hello

Output:
Length of string = 5
```

```
Input:
Enter a string: BangladeshBank

Output:
Length of string = 14
```

### কাজের Logic ব্যাখ্যা

String এর প্রতিটি character কে index 0 থেকে শুরু করে check করা হয়। যতক্ষণ না `'\0'` পাওয়া যাচ্ছে, ততক্ষণ counter `length` বাড়াতে থাকে।

```
str = "Hello"
Memory: ['H']['e']['l']['l']['o']['\0']
         0    1    2    3    4    5

length=0: str[0]='H' ≠ '\0' → length=1
length=1: str[1]='e' ≠ '\0' → length=2
length=2: str[2]='l' ≠ '\0' → length=3
length=3: str[3]='l' ≠ '\0' → length=4
length=4: str[4]='o' ≠ '\0' → length=5
length=5: str[5]='\0' → loop শেষ
```

`'\0'` কে gun গুনা হয় না — এটি শুধু end marker।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str[100];
    int length = 0;

    printf("Enter a string: ");
    gets(str);

    while(str[length] != '\0')
    {
        length++;
    }

    printf("Length of string = %d\n", length);

    return 0;
}
```

> **Exam tip:** `gets()` deprecated — modern C এ `fgets(str, 100, stdin)` ব্যবহার করতে বল। তবে exam এ syllabus অনুযায়ী `gets()` এখনও accepted। `strlen()` কীভাবে internally কাজ করে — এই type implementation প্রশ্নে বেশি আসে।

---

## Problem 39 — দুটি সংখ্যার মধ্যে সব Prime Number

> **Question:** Write a C program to print all prime numbers between two numbers.

### সমস্যা বোঝো

User দুটি number দেবে — `start` এবং `end`। ওই range এর মধ্যে যত prime number আছে সব print করতে হবে। Prime মানে এমন সংখ্যা যা শুধু 1 এবং নিজে দিয়ে ভাগ যায় (যেমন 2, 3, 5, 7, 11)।

### Sample Input / Output

```
Input:
Enter starting number: 10
Enter ending number: 30

Output:
Prime numbers between 10 and 30 are:
11 13 17 19 23 29
```

```
Input:
Enter starting number: 1
Enter ending number: 20

Output:
Prime numbers between 1 and 20 are:
2 3 5 7 11 13 17 19
```

### কাজের Logic ব্যাখ্যা

দুটি nested loop:

- **Outer loop** (`i = start` to `end`) — range এর প্রতিটি number এর উপর iterate করে।
- **Inner loop** (`j = 2` to `i/2`) — চেক করে `i` কোনো ছোট number দিয়ে ভাগ যায় কিনা।

প্রতিটি `i` এর জন্য `flag = 1` দিয়ে শুরু (assume prime)। যদি কোনো `j` দিয়ে ভাগ গেলে `flag = 0` করে break। Loop শেষে যদি flag still 1 থাকে → prime।

`i <= 1` হলে continue করা হয় কারণ 0 ও 1 prime নয়।

```
i=11: j=2..5 কেউ ভাগ যায় না → prime → print
i=12: j=2 ভাগ যায় → flag=0 → skip
i=13: j=2..6 কেউ ভাগ যায় না → prime → print
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int start, end, i, j, flag;

    printf("Enter starting number: ");
    scanf("%d", &start);

    printf("Enter ending number: ");
    scanf("%d", &end);

    printf("Prime numbers between %d and %d are:\n", start, end);

    for(i = start; i <= end; i++)
    {
        if(i <= 1)
            continue;

        flag = 1;

        for(j = 2; j <= i / 2; j++)
        {
            if(i % j == 0)
            {
                flag = 0;
                break;
            }
        }

        if(flag == 1)
        {
            printf("%d ", i);
        }
    }

    return 0;
}
```

> **Exam tip:** Optimization — `j <= sqrt(i)` ব্যবহার করলে অনেক faster হয়। বড় range এর জন্য Sieve of Eratosthenes algorithm best — exam এ mention করলে extra mark পাবে।

---

## Problem 40 — Structure এর ব্যবহার (Student Info)

> **Question:** Write a C program to demonstrate the use of structure.

### সমস্যা বোঝো

`struct` হলো C তে একসাথে অনেক রকম data type রাখার container। এই প্রোগ্রামে `Student` নামে একটি structure তৈরি করে তাতে `id` (int), `name` (string), `marks` (float) — তিন ধরনের data একত্রে রেখে print করতে হবে।

### Sample Input / Output

```
Input:
Enter student ID: 101
Enter student name: Rahim
Enter student marks: 87.5

Output:
Student Information:
ID = 101
Name = Rahim
Marks = 87.50
```

### কাজের Logic ব্যাখ্যা

**Structure declaration** — global scope এ `struct Student` define করা হয় তিনটি member সহ। এটি শুধু blueprint, কোনো memory নেয় না।

**Variable declaration** — `struct Student s1;` দিয়ে actual variable বানানো হয় যা memory নেয়।

**Member access** — dot operator (`.`) ব্যবহার করে individual field access:
- `s1.id` → integer field
- `s1.name` → string field (string এ `&` লাগে না)
- `s1.marks` → float field

```
s1 in memory:
┌─────────┬──────────────┬─────────┐
│ id: 101 │ name: "Rahim"│ 87.50   │
└─────────┴──────────────┴─────────┘
```

Real-life example — student management, employee record, bank account সব structure দিয়ে model করা যায়।

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
    struct Student s1;

    printf("Enter student ID: ");
    scanf("%d", &s1.id);

    printf("Enter student name: ");
    scanf("%s", s1.name);

    printf("Enter student marks: ");
    scanf("%f", &s1.marks);

    printf("\nStudent Information:\n");
    printf("ID = %d\n", s1.id);
    printf("Name = %s\n", s1.name);
    printf("Marks = %.2f\n", s1.marks);

    return 0;
}
```

> **Exam tip:** Structure এর ক্ষেত্রে `scanf("%s", s1.name)` এ `&` লাগে না কারণ array নাম already address। কিন্তু `&s1.id`, `&s1.marks` এ `&` দিতেই হবে। এই difference exam এ ধরা পড়ে।

---

## Problem 41 — Pointer দিয়ে দুই সংখ্যা যোগ

> **Question:** Write a C program to add two numbers using pointer.

### সমস্যা বোঝো

দুটি integer variable (`a`, `b`) এর address দুটি pointer (`p1`, `p2`) এ store করতে হবে। এরপর pointer dereference (`*p1`, `*p2`) করে value বের করে যোগ করতে হবে। উদ্দেশ্য — pointer এর basic mechanics বুঝানো।

### Sample Input / Output

```
Input:
Enter two numbers: 25 35

Output:
Sum = 60
```

```
Input:
Enter two numbers: 100 200

Output:
Sum = 300
```

### কাজের Logic ব্যাখ্যা

```
a = 25 (address: 1000)
b = 35 (address: 2000)

p1 = &a → p1 holds 1000
p2 = &b → p2 holds 2000

*p1 = value at address p1 = 25
*p2 = value at address p2 = 35

sum = *p1 + *p2 = 25 + 35 = 60
```

মূল মেমরি diagram:

```
   Variable:  a       b       p1      p2
   Address:  1000    2000    3000    4000
   Value:    25      35      1000    2000

   *p1 → goes to address 1000 → reads 25
   *p2 → goes to address 2000 → reads 35
```

`&` operator address দেয়, `*` operator address থেকে value বের করে। এই দুটি reverse operation।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a, b, sum;
    int *p1, *p2;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    p1 = &a;
    p2 = &b;

    sum = *p1 + *p2;

    printf("Sum = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Pointer declaration এ `int *p1` মানে `p1` একটি pointer যা int কে point করে। Pointer ভুলেও uninitialized state এ dereference করো না — segmentation fault হবে।

---

## Problem 42 — strcat() ছাড়া String concatenation

> **Question:** Write a C program to concatenate two strings without using strcat().

### সমস্যা বোঝো

দুটি string নিয়ে দ্বিতীয়টিকে প্রথমটির শেষে জুড়ে দিতে হবে — কোনো built-in function ছাড়া। এটি manually pointer/index manipulate করে করতে হয়।

### Sample Input / Output

```
Input:
Enter first string: Hello
Enter second string: World

Output:
Concatenated string: HelloWorld
```

```
Input:
Enter first string: Bangladesh
Enter second string: Bank

Output:
Concatenated string: BangladeshBank
```

### কাজের Logic ব্যাখ্যা

দুটি ধাপ:

**Step 1 — প্রথম string এর শেষ খুঁজে পাওয়া:** `i = 0` থেকে শুরু করে যতক্ষণ `str1[i] != '\0'` ততক্ষণ `i++`। শেষে `i` `'\0'` এর index এ থাকে।

**Step 2 — দ্বিতীয় string copy করা:** `j = 0` থেকে `str2[j]` কে `str1[i]` তে copy করতে থাকে, দুটোই increment করে। শেষে manually `str1[i] = '\0'` দিতে হয় যাতে string properly terminate হয়।

```
str1 = "Hello"  (memory: H,e,l,l,o,\0,...)
str2 = "World"

After Step 1: i = 5 (points to '\0' of str1)

Step 2:
i=5,j=0: str1[5]='W'
i=6,j=1: str1[6]='o'
i=7,j=2: str1[7]='r'
i=8,j=3: str1[8]='l'
i=9,j=4: str1[9]='d'
i=10: str1[10]='\0'

Result: "HelloWorld"
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    char str1[200], str2[100];
    int i = 0, j = 0;

    printf("Enter first string: ");
    gets(str1);

    printf("Enter second string: ");
    gets(str2);

    while(str1[i] != '\0')
    {
        i++;
    }

    while(str2[j] != '\0')
    {
        str1[i] = str2[j];
        i++;
        j++;
    }

    str1[i] = '\0';

    printf("Concatenated string: %s\n", str1);

    return 0;
}
```

> **Exam tip:** `str1` এর size যেন combined length ধরার মতো বড় হয় (এখানে 200) — না হলে buffer overflow হবে। শেষে `'\0'` দিতে ভুললে garbage character print হয়, এটি common mistake।

---

## Problem 43 — Matrix এর প্রতিটি Row ও Column এর Sum

> **Question:** Write a C program to find the sum of each row and column of a matrix.

### সমস্যা বোঝো

একটি m×n matrix এর প্রতিটি row এর সব element যোগ করে print করতে হবে, এবং একইভাবে প্রতিটি column এর element যোগ করে print করতে হবে।

### Sample Input / Output

```
Input:
Enter rows and columns: 3 3
Enter matrix elements:
1 2 3
4 5 6
7 8 9

Output:
Sum of rows:
Row 1 = 6
Row 2 = 15
Row 3 = 24
Sum of columns:
Column 1 = 12
Column 2 = 15
Column 3 = 18
```

### কাজের Logic ব্যাখ্যা

**Row sum:** Outer loop row index `i` ধরে, inner loop column index `j` ঘুরিয়ে `rowSum` জমায়। প্রতি নতুন row এ `rowSum = 0` reset।

**Column sum:** এবার outer loop column `j` ধরে, inner loop row `i` ঘুরায় (loop নেস্টিং উল্টে যায়)। এতে এক column এর সব row একসাথে যোগ হয়।

```
Matrix:
1 2 3      Row 1 sum = 1+2+3 = 6
4 5 6      Row 2 sum = 4+5+6 = 15
7 8 9      Row 3 sum = 7+8+9 = 24

Col 1 sum = 1+4+7 = 12
Col 2 sum = 2+5+8 = 15
Col 3 sum = 3+6+9 = 18
```

মূল trick — column sum বের করার জন্য loop swap করা (j outer, i inner)।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10];
    int row, col, i, j;
    int rowSum, colSum;

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

    printf("Sum of rows:\n");

    for(i = 0; i < row; i++)
    {
        rowSum = 0;

        for(j = 0; j < col; j++)
        {
            rowSum += a[i][j];
        }

        printf("Row %d = %d\n", i + 1, rowSum);
    }

    printf("Sum of columns:\n");

    for(j = 0; j < col; j++)
    {
        colSum = 0;

        for(i = 0; i < row; i++)
        {
            colSum += a[i][j];
        }

        printf("Column %d = %d\n", j + 1, colSum);
    }

    return 0;
}
```

> **Exam tip:** Output এ "Row 1" বলার জন্য `i + 1` print করা হয়েছে কারণ array index 0 থেকে শুরু কিন্তু user friendly numbering 1 থেকে শুরু। এই detail exam এ মনে রেখো।

---

## Problem 44 — Character এর ASCII Value

> **Question:** Write a C program to find ASCII value of a character.

### সমস্যা বোঝো

প্রতিটি character এর জন্য একটি unique numeric code আছে যা **ASCII value** (American Standard Code for Information Interchange)। যেমন `'A' = 65`, `'a' = 97`, `'0' = 48`। User একটি character দেবে, প্রোগ্রাম তার ASCII value বের করে দেবে।

### Sample Input / Output

```
Input:
Enter a character: A

Output:
ASCII value of A = 65
```

```
Input:
Enter a character: a

Output:
ASCII value of a = 97
```

### কাজের Logic ব্যাখ্যা

C তে `char` আসলে একটি 1-byte integer। `printf("%c", ch)` দিলে character form এ print হয়, আর `printf("%d", ch)` দিলে সেই character এর ASCII number print হয়।

```
ch = 'A'
Memory: 01000001 (binary) = 65 (decimal)

printf("%c", ch) → A
printf("%d", ch) → 65
```

মনে রাখার মতো ASCII range:

| Character | ASCII |
|-----------|-------|
| `'0'`–`'9'` | 48–57 |
| `'A'`–`'Z'` | 65–90 |
| `'a'`–`'z'` | 97–122 |

`'a' - 'A' = 32` — এই difference দিয়ে case conversion হয়।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char ch;

    printf("Enter a character: ");
    scanf("%c", &ch);

    printf("ASCII value of %c = %d\n", ch, ch);

    return 0;
}
```

> **Exam tip:** এক variable কে দুই different format specifier (`%c` ও `%d`) দিয়ে print করা যায় — কারণ char internally int। Lowercase কে uppercase বানাতে `ch - 32` করো।

---

## Problem 45 — Call by Value vs Call by Reference

> **Question:** Write a C program to demonstrate call by value and call by reference.

### সমস্যা বোঝো

C তে function এ argument pass করার দুটি পদ্ধতি:
- **Call by value** — value এর copy যায়, original variable বদলায় না।
- **Call by reference** — variable এর address যায়, function থেকে original বদলানো যায়।

প্রোগ্রামে দুটোই demonstrate করতে হবে।

### Sample Input / Output

```
Output:
Before function call: 20
Inside callByValue: 30
After callByValue: 20
Inside callByReference: 30
After callByReference: 30
```

### কাজের Logic ব্যাখ্যা

**Call by Value (`callByValue(num)`):**
- Function কে `num` এর value (20) এর একটি copy দেওয়া হয়।
- Local `x` এ 20 থাকে → `x + 10 = 30`।
- কিন্তু main এর `num` এখনো 20।

**Call by Reference (`callByReference(&num)`):**
- Function কে `num` এর address (`&num`) দেওয়া হয়।
- Pointer `*x = *x + 10` করলে original memory location এর value বদলে যায়।
- Function থেকে ফিরে এলে `num` এর value 30 হয়ে যায়।

```
Memory diagram:

Call by Value:                  Call by Reference:
main:  num = 20                 main:  num = 20
            ↓ copy                            ↓ address pass
func:  x = 20                   func:  x = &num
       x = 30 (local only)             *x = 30 (modifies main's num)
main:  num = 20 (unchanged)     main:  num = 30 (changed!)
```

এটাই pointer এর সবচেয়ে practical use — function থেকে multiple value return বা original modify করা।

### Complete Code

```c
#include <stdio.h>

void callByValue(int x)
{
    x = x + 10;
    printf("Inside callByValue: %d\n", x);
}

void callByReference(int *x)
{
    *x = *x + 10;
    printf("Inside callByReference: %d\n", *x);
}

int main()
{
    int num = 20;

    printf("Before function call: %d\n", num);

    callByValue(num);
    printf("After callByValue: %d\n", num);

    callByReference(&num);
    printf("After callByReference: %d\n", num);

    return 0;
}
```

> **Exam tip:** `scanf("%d", &n)` কেন `&` লাগে — কারণ scanf input কে variable এ লিখতে চায় (call by reference)। এই concept exam এ আসে।

---

## Problem 46 — Loop দিয়ে Factorial (Recursion ছাড়া)

> **Question:** Write a C program to find factorial of a number using loop (without recursion).

### সমস্যা বোঝো

`n!` (n factorial) মানে `1 × 2 × 3 × ... × n`। যেমন `5! = 120`। Recursion ছাড়া simple `for` loop দিয়ে factorial বের করতে হবে।

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
Factorial = 120
```

```
Input:
Enter a number: 7

Output:
Factorial = 5040
```

### কাজের Logic ব্যাখ্যা

`fact = 1` দিয়ে শুরু (কারণ 1 দিয়ে multiply করলে value unchanged থাকে; 0 দিলে সব 0 হয়ে যাবে)। তারপর `i = 1` থেকে `n` পর্যন্ত loop চালিয়ে `fact = fact * i` করা হয়।

```
n = 5
fact = 1
i=1: fact = 1*1 = 1
i=2: fact = 1*2 = 2
i=3: fact = 2*3 = 6
i=4: fact = 6*4 = 24
i=5: fact = 24*5 = 120
```

`long long` ব্যবহার করা হয়েছে কারণ factorial খুব দ্রুত বড় হয়ে যায়। `13!` already `int` overflow করে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, i;
    long long fact = 1;

    printf("Enter a number: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        fact = fact * i;
    }

    printf("Factorial = %lld\n", fact);

    return 0;
}
```

> **Exam tip:** Recursion vs Iteration — iterative version stack এ less overhead নেয়, তাই preferred for production code। `long long` এর format specifier `%lld` — এটি ভুলে `%d` দিলে wrong output আসবে।

---

## Problem 47 — Leap Year চেক

> **Question:** Write a C program to check whether a year is leap year or not.

### সমস্যা বোঝো

Leap year হলো এমন বছর যেখানে February তে 29 দিন থাকে। নিয়ম:
- যদি 400 দিয়ে ভাগ যায় → leap year (যেমন 2000)
- অথবা যদি 4 দিয়ে ভাগ যায় কিন্তু 100 দিয়ে ভাগ যায় না → leap year (যেমন 2024)
- বাকি সব → not leap year (যেমন 1900, 2023)

### Sample Input / Output

```
Input:
Enter a year: 2024

Output:
2024 is a Leap Year.
```

```
Input:
Enter a year: 1900

Output:
1900 is not a Leap Year.
```

```
Input:
Enter a year: 2000

Output:
2000 is a Leap Year.
```

### কাজের Logic ব্যাখ্যা

একটিই condition এ পুরো logic:

```
(year % 400 == 0) OR (year % 4 == 0 AND year % 100 != 0)
```

কেন এই complex rule? কারণ Earth এর actual year ≈ 365.2425 দিন। প্রতি 4 বছরে 1 দিন যোগ করে adjust করি, কিন্তু এতে একটু বেশি হয়ে যায়, তাই 100 দিয়ে ভাগ গেলে skip করি; কিন্তু আবার 400 দিয়ে ভাগ গেলে include করি — এভাবে balance হয়।

```
2024: 2024%4==0, 2024%100!=0 → Leap ✓
1900: 1900%4==0, 1900%100==0, 1900%400!=0 → Not leap ✗
2000: 2000%400==0 → Leap ✓
2023: 2023%4!=0 → Not leap ✗
```

### Complete Code

```c
#include <stdio.h>

int main()
{
    int year;

    printf("Enter a year: ");
    scanf("%d", &year);

    if((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
        printf("%d is a Leap Year.\n", year);
    else
        printf("%d is not a Leap Year.\n", year);

    return 0;
}
```

> **Exam tip:** শুধু `year % 4 == 0` লিখলে 1900 কেও leap বলবে — যা ভুল। তিনটি condition যথাযথভাবে combine করা important। MCQ exam এ এই trick সংখ্যা (1900, 2000) বহুবার আসে।

---

## Problem 48 — সংখ্যার Digit গুলোর যোগফল

> **Question:** Write a C program to find sum of digits of a number.

### সমস্যা বোঝো

একটি integer এর প্রতিটি digit আলাদা করে যোগ করতে হবে। যেমন `1234` এর digits `1+2+3+4 = 10`। Modulus (`%`) এবং division (`/`) operator দিয়ে digit extract করা হয়।

### Sample Input / Output

```
Input:
Enter a number: 1234

Output:
Sum of digits = 10
```

```
Input:
Enter a number: 9876

Output:
Sum of digits = 30
```

### কাজের Logic ব্যাখ্যা

দুটি operation:
- `n % 10` → শেষ digit (last digit)
- `n / 10` → শেষ digit বাদ দিয়ে বাকি অংশ

```
n = 1234, sum = 0
Iteration 1: digit = 1234%10 = 4, sum = 0+4 = 4, n = 1234/10 = 123
Iteration 2: digit = 123%10 = 3, sum = 4+3 = 7, n = 123/10 = 12
Iteration 3: digit = 12%10 = 2, sum = 7+2 = 9, n = 12/10 = 1
Iteration 4: digit = 1%10 = 1, sum = 9+1 = 10, n = 1/10 = 0
Loop ends (n == 0)
Final sum = 10
```

প্রতিবার শেষ digit বের করে যোগ করা, তারপর 10 দিয়ে ভাগ করে আঁকার ছোট করে দেওয়া — এটি digit-by-digit processing এর standard pattern।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, sum = 0, digit;

    printf("Enter a number: ");
    scanf("%d", &n);

    while(n != 0)
    {
        digit = n % 10;
        sum += digit;
        n = n / 10;
    }

    printf("Sum of digits = %d\n", sum);

    return 0;
}
```

> **Exam tip:** এই `% 10` এবং `/ 10` pattern reverse number, palindrome check, Armstrong number — সব digit problem এ আসে। Once well memorized, অনেক problem easy হয়ে যায়।

---

## Problem 49 — সংখ্যার Reverse

> **Question:** Write a C program to find reverse of a number.

### সমস্যা বোঝো

`12345` কে `54321` বানাতে হবে। প্রতিটি digit বের করে নতুন একটি number এ position অনুযায়ী জোড়া দিতে হবে।

### Sample Input / Output

```
Input:
Enter a number: 12345

Output:
Reversed number = 54321
```

```
Input:
Enter a number: 1000

Output:
Reversed number = 1
```

### কাজের Logic ব্যাখ্যা

Magic formula: `rev = rev * 10 + digit`

প্রতিবার `rev` কে 10 দিয়ে multiply করে একটি new digit এর জন্য জায়গা বানানো হয়, তারপর সেই জায়গায় current digit বসানো হয়।

```
n = 12345, rev = 0
i=1: digit = 5, rev = 0*10 + 5 = 5, n = 1234
i=2: digit = 4, rev = 5*10 + 4 = 54, n = 123
i=3: digit = 3, rev = 54*10 + 3 = 543, n = 12
i=4: digit = 2, rev = 543*10 + 2 = 5432, n = 1
i=5: digit = 1, rev = 5432*10 + 1 = 54321, n = 0
```

লক্ষ করো — `1000` reverse করলে output `1` আসে, কারণ leading zero (0001) integer এ store হয় না।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, rev = 0, digit;

    printf("Enter a number: ");
    scanf("%d", &n);

    while(n != 0)
    {
        digit = n % 10;
        rev = rev * 10 + digit;
        n = n / 10;
    }

    printf("Reversed number = %d\n", rev);

    return 0;
}
```

> **Exam tip:** `rev = rev * 10 + digit` — এই single line palindrome check এ সরাসরি ব্যবহার হয়। Reverse ও original সমান হলে palindrome। Memorize this pattern!

---

## Problem 50 — Function দিয়ে Even/Odd চেক

> **Question:** Write a C program to check whether a number is even or odd using function.

### সমস্যা বোঝো

`checkEvenOdd()` নামে একটি function বানাতে হবে যা একটি number নেবে, এবং বলবে সেটি even (জোড়) নাকি odd (বিজোড়)। Modulus operator (`%`) এর basic ব্যবহার।

### Sample Input / Output

```
Input:
Enter a number: 8

Output:
Even Number
```

```
Input:
Enter a number: 13

Output:
Odd Number
```

### কাজের Logic ব্যাখ্যা

Even number 2 দিয়ে ভাগ গেলে remainder 0 দেয়; odd number remainder 1 দেয়।

```
8 % 2 = 0 → Even
13 % 2 = 1 → Odd
0 % 2 = 0 → Even
-4 % 2 = 0 → Even
```

Function এ `void` return type দেওয়া হয়েছে কারণ function নিজেই print করছে — কোনো value return করছে না। এটি modular programming এর simplest example।

```
main()
   ↓ pass n
checkEvenOdd(int n)
   ↓ check n%2
   ↓ print Even/Odd
   ↓ return (void)
main() resumes
```

### Complete Code

```c
#include <stdio.h>

void checkEvenOdd(int n)
{
    if(n % 2 == 0)
        printf("Even Number\n");
    else
        printf("Odd Number\n");
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    checkEvenOdd(n);

    return 0;
}
```

> **Exam tip:** Better design হবে যদি function `int` return করে (1 = even, 0 = odd) এবং main এ print করে — separation of concerns। Bitwise operator `n & 1` দিয়েও odd/even check হয় (faster)।

---

## Problem 51 — 1 থেকে n পর্যন্ত Natural Number এর Sum

> **Question:** Write a C program to find the sum of natural numbers up to n.

### সমস্যা বোঝো

`1 + 2 + 3 + ... + n` যোগফল বের করতে হবে। যেমন `n = 10` হলে `1+2+...+10 = 55`।

### Sample Input / Output

```
Input:
Enter a number: 10

Output:
Sum of natural numbers = 55
```

```
Input:
Enter a number: 100

Output:
Sum of natural numbers = 5050
```

### কাজের Logic ব্যাখ্যা

Simple `for` loop দিয়ে 1 থেকে n পর্যন্ত প্রতিটি number কে `sum` এ যোগ করা।

```
n = 10
i=1: sum = 0+1 = 1
i=2: sum = 1+2 = 3
i=3: sum = 3+3 = 6
...
i=10: sum = 45+10 = 55
```

**Mathematical shortcut:** `sum = n*(n+1)/2` — এটি Gauss এর famous formula। Loop এর বদলে একলাইনে answer পাওয়া যায়। `n=100` হলে `100*101/2 = 5050` (Gauss এই sum 7 বছর বয়সে করেছিলেন!)।

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
        sum += i;
    }

    printf("Sum of natural numbers = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Exam এ formula `n*(n+1)/2` mention করলে time complexity O(1), যেখানে loop O(n)। Both আসা problem ভালো — interviewer impressed হবে।

---

## Problem 52 — 1 থেকে 1000 এর মধ্যে Armstrong Number

> **Question:** Write a C program to print all Armstrong numbers between 1 to 1000.

### সমস্যা বোঝো

**Armstrong number** হলো এমন সংখ্যা যেখানে প্রতিটি digit এর `digits-th power` এর যোগফল সেই সংখ্যার সমান। যেমন `153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153`। 1 থেকে 1000 এর মধ্যে সব Armstrong number print করতে হবে।

### Sample Input / Output

```
Output:
Armstrong numbers between 1 to 1000:
1 2 3 4 5 6 7 8 9 153 370 371 407
```

### কাজের Logic ব্যাখ্যা

প্রতিটি number এর জন্য তিন ধাপ:

**Step 1 — কয়টি digit তা গণনা:** ছোট temp variable এ number রেখে `temp /= 10` করতে করতে digit count বের করা হয়।

**Step 2 — Power sum:** আবার temp এ original number রেখে প্রতিটি digit এর `pow(digit, digits)` যোগ করা হয়।

**Step 3 — Compare:** যদি `sum == original` → Armstrong।

```
num = 153
Step 1: digits count = 3
Step 2:
  digit=3: sum = 0 + 3^3 = 27
  digit=5: sum = 27 + 5^3 = 152
  digit=1: sum = 152 + 1^3 = 153
Step 3: sum(153) == original(153) → Armstrong ✓

num = 370
3^3 + 7^3 + 0^3 = 27+343+0 = 370 → Armstrong ✓

num = 9
9^1 = 9 → Armstrong ✓ (single digit Armstrong)
```

`<math.h>` থেকে `pow()` ব্যবহার করা হয়েছে — gcc এ compile করতে `-lm` flag লাগতে পারে।

### Complete Code

```c
#include <stdio.h>
#include <math.h>

int main()
{
    int num, original, digit, sum, digits;

    printf("Armstrong numbers between 1 to 1000:\n");

    for(num = 1; num <= 1000; num++)
    {
        original = num;
        sum = 0;
        digits = 0;

        int temp = num;
        while(temp != 0)
        {
            temp /= 10;
            digits++;
        }

        temp = num;

        while(temp != 0)
        {
            digit = temp % 10;
            sum += pow(digit, digits);
            temp /= 10;
        }

        if(sum == original)
        {
            printf("%d ", num);
        }
    }

    return 0;
}
```

> **Exam tip:** `pow()` returns `double`, integer compare তে precision issue হতে পারে। বড় Armstrong (যেমন 9474) এর জন্য নিজে `int_pow()` লেখা safer। 3-digit Armstrong মাত্র 4 টি — 153, 370, 371, 407 — মুখস্থ রাখো।

---

## Problem 53 — Pointer দিয়ে Array এর Maximum

> **Question:** Write a C program to find the maximum of an array using pointer.

### সমস্যা বোঝো

Array এর largest element pointer arithmetic ব্যবহার করে বের করতে হবে — `arr[i]` এর পরিবর্তে `*(ptr + i)` notation। উদ্দেশ্য pointer-array equivalence demonstrate করা।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
10 25 7 42 18

Output:
Maximum element = 42
```

### কাজের Logic ব্যাখ্যা

Array নাম (`arr`) actually এর প্রথম element এর address। তাই `ptr = arr` মানে `ptr = &arr[0]`।

```
arr[i] ≡ *(arr + i) ≡ *(ptr + i) ≡ ptr[i]
```

চারটি একই কাজ — সব equivalent।

```
arr = [10, 25, 7, 42, 18]
ptr → arr[0]

max = *ptr = 10
i=1: *(ptr+1) = 25 > 10 → max = 25
i=2: *(ptr+2) = 7 < 25 → no change
i=3: *(ptr+3) = 42 > 25 → max = 42
i=4: *(ptr+4) = 18 < 42 → no change

Result: max = 42
```

`ptr + i` এ pointer arithmetic — `i * sizeof(int)` byte সামনে চলে যায়। এই কারণে integer pointer এ `+1` করলে 4 byte (int size) শিফট হয়।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    int *ptr, max;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    ptr = arr;
    max = *ptr;

    for(i = 1; i < n; i++)
    {
        if(*(ptr + i) > max)
        {
            max = *(ptr + i);
        }
    }

    printf("Maximum element = %d\n", max);

    return 0;
}
```

> **Exam tip:** `&arr[0]` ও `arr` সমান, কিন্তু `&arr` ভিন্ন (whole array এর address, type `int(*)[100]`)। এই subtle difference exam এ ফাঁদ হিসেবে আসে।

---

## Problem 54 — Palindrome Number চেক

> **Question:** Write a C program to check whether a number is palindrome or not.

### সমস্যা বোঝো

**Palindrome** মানে এমন সংখ্যা যা reverse করলেও একই থাকে। যেমন `121`, `1331`, `12321`। `123` palindrome নয় কারণ reverse `321`।

### Sample Input / Output

```
Input:
Enter a number: 121

Output:
Palindrome Number
```

```
Input:
Enter a number: 12321

Output:
Palindrome Number
```

```
Input:
Enter a number: 123

Output:
Not a Palindrome Number
```

### কাজের Logic ব্যাখ্যা

দুই step:
1. Original number কে `original` variable এ save করো (কারণ reverse করার সময় `n` বদলে যাবে)।
2. Reverse করার জন্য standard pattern — `rev = rev*10 + n%10; n /= 10`।
3. শেষে `original == rev` চেক।

```
n = 121, original = 121, rev = 0
i=1: digit = 1, rev = 0*10 + 1 = 1, n = 12
i=2: digit = 2, rev = 1*10 + 2 = 12, n = 1
i=3: digit = 1, rev = 12*10 + 1 = 121, n = 0
Loop ends.
121 (original) == 121 (rev) → Palindrome ✓
```

`original` save না করলে compare এর সময় `n = 0` হয়ে গিয়ে ভুল answer দিবে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int n, original, rev = 0, digit;

    printf("Enter a number: ");
    scanf("%d", &n);

    original = n;

    while(n != 0)
    {
        digit = n % 10;
        rev = rev * 10 + digit;
        n = n / 10;
    }

    if(original == rev)
        printf("Palindrome Number\n");
    else
        printf("Not a Palindrome Number\n");

    return 0;
}
```

> **Exam tip:** Negative number কখনো palindrome নয় (minus sign থাকার কারণে)। Edge case হিসেবে `0` ও `single digit` সব palindrome — কোডে এটি automatic handle হয়।

---

## Problem 55 — Function দিয়ে Square ও Cube

> **Question:** Write a C program to find square and cube of a number using function.

### সমস্যা বোঝো

একটি function বানাতে হবে যা একটি number নেবে এবং তার square (`n²`) ও cube (`n³`) print করবে। Function এর basic use practice।

### Sample Input / Output

```
Input:
Enter a number: 5

Output:
Square = 25
Cube = 125
```

```
Input:
Enter a number: 7

Output:
Square = 49
Cube = 343
```

### কাজের Logic ব্যাখ্যা

`calculate(int n)` function এ:
- Square = `n * n`
- Cube = `n * n * n`

কোনো built-in `pow()` দরকার নেই কারণ ছোট power। `pow()` ব্যবহার করলে double আসে — আবার cast করতে হয়, তাই plain multiplication দ্রুত ও safe।

```
n = 5
n * n = 5 * 5 = 25
n * n * n = 5 * 5 * 5 = 125
```

`void` return type — function নিজে print করছে, কোনো value return করছে না।

### Complete Code

```c
#include <stdio.h>

void calculate(int n)
{
    printf("Square = %d\n", n * n);
    printf("Cube = %d\n", n * n * n);
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    calculate(n);

    return 0;
}
```

> **Exam tip:** বড় number এর জন্য overflow সমস্যা — `n = 1000` দিলে cube `10⁹` যা `int` (max ~2.1×10⁹) বেশ কাছে। `long long` ব্যবহার safer for production code।

---

## Problem 56 — Array এ Even ও Odd সংখ্যা গণনা

> **Question:** Write a C program to count even and odd numbers in an array.

### সমস্যা বোঝো

User কিছু সংখ্যা দেবে, প্রোগ্রাম গুনে বলবে কতগুলো even আর কতগুলো odd। Array iteration ও modulus এর simple combination।

### Sample Input / Output

```
Input:
Enter number of elements: 6
Enter array elements:
1 2 3 4 5 6

Output:
Even numbers = 3
Odd numbers = 3
```

```
Input:
Enter number of elements: 5
Enter array elements:
10 22 7 14 9

Output:
Even numbers = 3
Odd numbers = 2
```

### কাজের Logic ব্যাখ্যা

দুটি counter — `even = 0, odd = 0`। Loop এ প্রতিটি element কে `% 2` দিয়ে check:

```
arr = [1, 2, 3, 4, 5, 6]
i=0: 1%2=1 → odd++ (odd=1)
i=1: 2%2=0 → even++ (even=1)
i=2: 3%2=1 → odd++ (odd=2)
i=3: 4%2=0 → even++ (even=2)
i=4: 5%2=1 → odd++ (odd=3)
i=5: 6%2=0 → even++ (even=3)

Total: even=3, odd=3
```

Single pass O(n) — সবচেয়ে efficient।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    int even = 0, odd = 0;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    for(i = 0; i < n; i++)
    {
        if(arr[i] % 2 == 0)
            even++;
        else
            odd++;
    }

    printf("Even numbers = %d\n", even);
    printf("Odd numbers = %d\n", odd);

    return 0;
}
```

> **Exam tip:** Negative number এর জন্যও `arr[i] % 2 == 0` কাজ করে (যেমন `-4 % 2 = 0`)। কিন্তু `arr[i] % 2 == 1` ভুল হতে পারে negative odd এ — তাই `!= 0` ব্যবহার safer।

---

## Problem 57 — Range এর Prime Number এর Sum

> **Question:** Write a C program to find the sum of prime numbers in a given range.

### সমস্যা বোঝো

User দুটি number দেবে (`start`, `end`)। সেই range এর মধ্যে যত prime number আছে সবগুলো যোগ করে print করতে হবে। এখানে modular design এ `isPrime()` নামে আলাদা function আছে।

### Sample Input / Output

```
Input:
Enter start and end: 1 10

Output:
Sum of prime numbers = 17
```

(2+3+5+7 = 17)

```
Input:
Enter start and end: 10 30

Output:
Sum of prime numbers = 112
```

(11+13+17+19+23+29 = 112)

### কাজের Logic ব্যাখ্যা

দুটি function এ logic ভাগ করা:

**`isPrime(int n)`** — `n` prime কিনা return করে (1 = prime, 0 = not):
- `n <= 1` হলে directly 0।
- 2 থেকে `n/2` পর্যন্ত কেউ ভাগ গেলে 0।
- নাহলে 1।

**`main()`** — `start` থেকে `end` পর্যন্ত loop, প্রতিটি `i` এর জন্য `isPrime()` call। True হলে `sum += i`।

```
Range 1 to 10:
i=1: isPrime(1) = 0 (skip)
i=2: isPrime(2) = 1 → sum = 2
i=3: isPrime(3) = 1 → sum = 5
i=4: isPrime(4) = 0 (skip)
i=5: isPrime(5) = 1 → sum = 10
i=6: 0
i=7: isPrime(7) = 1 → sum = 17
i=8,9,10: not prime
Final sum = 17
```

Function-based approach এ readability ও reusability ভালো।

### Complete Code

```c
#include <stdio.h>

int isPrime(int n)
{
    int i;

    if(n <= 1) return 0;

    for(i = 2; i <= n / 2; i++)
    {
        if(n % i == 0)
            return 0;
    }

    return 1;
}

int main()
{
    int start, end, i, sum = 0;

    printf("Enter start and end: ");
    scanf("%d %d", &start, &end);

    for(i = start; i <= end; i++)
    {
        if(isPrime(i))
            sum += i;
    }

    printf("Sum of prime numbers = %d\n", sum);

    return 0;
}
```

> **Exam tip:** বড় range এ এই algorithm slow। Sieve of Eratosthenes দিয়ে O(n log log n) এ করা যায়। Exam এ optimization mention করলে extra mark।

---

## Problem 58 — 2x2 Matrix এর Determinant

> **Question:** Write a C program to find determinant of a 2x2 matrix.

### সমস্যা বোঝো

2×2 matrix:
$$
A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}
$$
এর determinant হলো `ad - bc`। এটি linear algebra এর সবচেয়ে basic determinant formula।

### Sample Input / Output

```
Input:
Enter 2x2 matrix elements:
1 2
3 4

Output:
Determinant = -2
```

(1×4 - 2×3 = 4 - 6 = -2)

```
Input:
Enter 2x2 matrix elements:
5 3
2 1

Output:
Determinant = -1
```

### কাজের Logic ব্যাখ্যা

Direct formula apply:

$$
\det(A) = a_{00} \cdot a_{11} - a_{01} \cdot a_{10}
$$

```
Matrix:
| 1  2 |
| 3  4 |

det = (1*4) - (2*3) = 4 - 6 = -2
```

Determinant এর geometric meaning — 2x2 matrix যে parallelogram বানায় তার area। Negative হলে orientation flip।

3x3 বা বড় matrix এর জন্য cofactor expansion বা recursive formula লাগে।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[2][2];
    int det;

    printf("Enter 2x2 matrix elements:\n");

    scanf("%d %d %d %d",
          &a[0][0], &a[0][1],
          &a[1][0], &a[1][1]);

    det = (a[0][0] * a[1][1]) - (a[0][1] * a[1][0]);

    printf("Determinant = %d\n", det);

    return 0;
}
```

> **Exam tip:** `det == 0` মানে matrix singular — inverse exist করে না। `det != 0` মানে invertible। এই concept GATE/BCS তেও আসে।

---

## Problem 59 — Binary থেকে Decimal Conversion

> **Question:** Write a C program to convert binary number to decimal.

### সমস্যা বোঝো

Binary number (যেমন `1010`) কে decimal (যেমন `10`) এ convert করতে হবে। প্রতিটি digit তার position অনুযায়ী 2 এর power দিয়ে multiply হয়।

### Sample Input / Output

```
Input:
Enter a binary number: 1010

Output:
Decimal value = 10
```

(1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8+0+2+0 = 10)

```
Input:
Enter a binary number: 1111

Output:
Decimal value = 15
```

### কাজের Logic ব্যাখ্যা

Formula:
$$
\text{decimal} = \sum_{i=0}^{n-1} b_i \times 2^i
$$
যেখানে `b_i` হলো right থেকে i-th binary digit।

```
binary = 1010, decimal = 0, i = 0

Iter 1: remainder = 1010%10 = 0, decimal = 0 + 0*2^0 = 0, binary = 101, i = 1
Iter 2: remainder = 101%10 = 1, decimal = 0 + 1*2^1 = 2, binary = 10, i = 2
Iter 3: remainder = 10%10 = 0, decimal = 2 + 0*2^2 = 2, binary = 1, i = 3
Iter 4: remainder = 1%10 = 1, decimal = 2 + 1*2^3 = 10, binary = 0, i = 4
Loop ends.

Final: decimal = 10
```

Right-most digit সবচেয়ে কম weight (2⁰ = 1), left দিকে যেতে যেতে weight বাড়ে।

### Complete Code

```c
#include <stdio.h>
#include <math.h>

int main()
{
    int binary, remainder, i = 0, decimal = 0;

    printf("Enter a binary number: ");
    scanf("%d", &binary);

    while(binary != 0)
    {
        remainder = binary % 10;
        decimal += remainder * pow(2, i);
        binary /= 10;
        i++;
    }

    printf("Decimal value = %d\n", decimal);

    return 0;
}
```

> **Exam tip:** Input validation নেই — যদি user `1234` লিখে, প্রোগ্রাম crash না করলেও wrong answer দেবে। Production code এ digit `0` বা `1` কিনা check করা উচিত। `pow()` instead of bitshift `<<` ব্যবহারে precision issue থাকে।

---

## Problem 60 — Function দিয়ে 1 থেকে n এর Even Sum

> **Question:** Write a C program to find sum of even numbers from 1 to n using function.

### সমস্যা বোঝো

`sumEven(n)` নামে function বানাতে হবে যা 1 থেকে n পর্যন্ত সব even number এর যোগফল return করবে। Function এর `int` return type এর practice।

### Sample Input / Output

```
Input:
Enter a number: 10

Output:
Sum of even numbers = 30
```

(2+4+6+8+10 = 30)

```
Input:
Enter a number: 20

Output:
Sum of even numbers = 110
```

### কাজের Logic ব্যাখ্যা

Function এর ভেতরে:
- Local `sum = 0` declare।
- 1 থেকে n loop, যদি `i % 2 == 0` হয় তাহলে `sum += i`।
- শেষে `return sum`।

```
n = 10
i=1: odd, skip
i=2: even, sum = 2
i=3: odd, skip
i=4: even, sum = 6
i=5: odd, skip
i=6: even, sum = 12
i=7: odd, skip
i=8: even, sum = 20
i=9: odd, skip
i=10: even, sum = 30
return 30
```

**Optimization:** `i = 2` থেকে শুরু করে `i += 2` করলে শুধু even numbers visit হয় — half iteration। আরো ভালো — formula `n/2 * (n/2 + 1)` (এটি sum of even = 2*(1+2+...+n/2))।

### Complete Code

```c
#include <stdio.h>

int sumEven(int n)
{
    int i, sum = 0;

    for(i = 1; i <= n; i++)
    {
        if(i % 2 == 0)
            sum += i;
    }

    return sum;
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Sum of even numbers = %d\n", sumEven(n));

    return 0;
}
```

> **Exam tip:** Function এ `void` vs `int` return এর difference বুঝতে হবে। এই function `int` return করায় সরাসরি `printf("%d", sumEven(n))` এ ব্যবহার করা যাচ্ছে। Function chaining এর basis এটাই।

---

## Problem 61 — Array এর Average

> **Question:** Write a C program to find the average of elements in an array.

### সমস্যা বোঝো

Array এর সব element যোগ করে সেই sum কে total count দিয়ে ভাগ করলে average আসে। Result float হতে পারে, তাই data type `float` দরকার।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
10 20 30 40 50

Output:
Average = 30.00
```

```
Input:
Enter number of elements: 4
Enter array elements:
1 2 3 4

Output:
Average = 2.50
```

### কাজের Logic ব্যাখ্যা

```
arr = [10, 20, 30, 40, 50], n = 5
sum = 0
i=0: sum += 10 → sum = 10
i=1: sum += 20 → sum = 30
i=2: sum += 30 → sum = 60
i=3: sum += 40 → sum = 100
i=4: sum += 50 → sum = 150

avg = sum / n = 150 / 5 = 30.00
```

`sum` কে `float` declare করা important। যদি `int sum` দিয়ে `sum / n` করো, তাহলে integer division এ fractional part lost হবে (যেমন `7/2 = 3` instead of `3.5`)।

`%.2f` দিয়ে দশমিকের পরে 2 ঘর precision।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    float sum = 0, avg;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }

    avg = sum / n;

    printf("Average = %.2f\n", avg);

    return 0;
}
```

> **Exam tip:** Integer division ফাঁদ — `int a=7, b=2; float c = a/b;` এ `c = 3.0` হবে! কারণ `a/b` আগে integer এ calculate হয়ে যায়। Solve: `(float)a / b` cast করে।

---

## Problem 62 — Recursion দিয়ে Factorial (Optimized)

> **Question:** Write a C program to find factorial of a number using recursion (optimized format).

### সমস্যা বোঝো

`fact(n) = n × fact(n-1)`, base case `fact(0) = 1`। এটি classic recursion প্রশ্ন। Optimized format মানে clean ও minimal code।

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

Recursion এ function নিজেই নিজেকে call করে। প্রতিটি call একটি smaller subproblem এ break করে।

```
fact(5)
= 5 * fact(4)
= 5 * (4 * fact(3))
= 5 * (4 * (3 * fact(2)))
= 5 * (4 * (3 * (2 * fact(1))))
= 5 * (4 * (3 * (2 * (1 * fact(0)))))
= 5 * (4 * (3 * (2 * (1 * 1))))    ← base case fact(0)=1
= 5 * 4 * 3 * 2 * 1 * 1
= 120
```

**Call stack visualization:**

```
fact(5) ┐
        ├─ fact(4) ┐
        │          ├─ fact(3) ┐
        │          │          ├─ fact(2) ┐
        │          │          │          ├─ fact(1) ┐
        │          │          │          │          ├─ fact(0) → 1 (base)
        │          │          │          │          ↓
        │          │          │          │       1*1=1
        │          │          │          ↓
        │          │          │       2*1=2
        ...
```

প্রতিটি recursive call stack এ একটি frame নেয় — তাই বড় n এ stack overflow risk।

### Complete Code

```c
#include <stdio.h>

long long fact(int n)
{
    if(n == 0)
        return 1;
    return n * fact(n - 1);
}

int main()
{
    int n;

    printf("Enter a number: ");
    scanf("%d", &n);

    printf("Factorial = %lld\n", fact(n));

    return 0;
}
```

> **Exam tip:** Base case (`n == 0`) ভুললে infinite recursion → stack overflow। `fact(20)` already `2.4 × 10¹⁸` — `long long` essential। Negative n handle করা হয়নি — production এ check করতে হবে।

---

## Problem 63 — Vowel/Consonant চেক

> **Question:** Write a C program to find whether a character is vowel or consonant.

### সমস্যা বোঝো

ইংরেজি alphabet এ vowel মাত্র 5 টি — `a, e, i, o, u`। বাকি সব consonant। Lowercase ও uppercase দুটোই handle করতে হবে।

### Sample Input / Output

```
Input:
Enter a character: a

Output:
Vowel
```

```
Input:
Enter a character: B

Output:
Consonant
```

```
Input:
Enter a character: E

Output:
Vowel
```

### কাজের Logic ব্যাখ্যা

10 টি condition একটি `if` এ `||` (OR) দিয়ে combine করা হয়েছে — 5 lowercase + 5 uppercase vowel। যেকোনো একটি match করলে "Vowel"।

```
ch = 'a' → match 'a' → Vowel ✓
ch = 'B' → no match → Consonant
ch = 'O' → match 'O' → Vowel ✓
ch = '5' → no match → Consonant (technically not a letter, but program says so)
```

**Cleaner alternative:** আগে `ch = tolower(ch)` করে নিলে শুধু 5 condition লাগে:
```c
if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u')
```

বা switch-case দিয়ে আরো readable হয়।

### Complete Code

```c
#include <stdio.h>

int main()
{
    char ch;

    printf("Enter a character: ");
    scanf("%c", &ch);

    if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||
       ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U')
        printf("Vowel\n");
    else
        printf("Consonant\n");

    return 0;
}
```

> **Exam tip:** এই program digit বা special character কেও "Consonant" বলবে — যা strictly ভুল। Robust version এ আগে `isalpha(ch)` check করা উচিত। Exam এ এই edge case ধরা পড়ে।

---

## Problem 64 — Matrix এর সব element এর Sum

> **Question:** Write a C program to find sum of all elements in a matrix.

### সমস্যা বোঝো

m×n matrix এর সব element যোগ করতে হবে। Row sum / Column sum এর সাধারণ form — সব element মিলিয়ে একটি total।

### Sample Input / Output

```
Input:
Enter rows and columns: 2 3
Enter matrix elements:
1 2 3
4 5 6

Output:
Total sum = 21
```

```
Input:
Enter rows and columns: 3 3
Enter matrix elements:
1 1 1
1 1 1
1 1 1

Output:
Total sum = 9
```

### কাজের Logic ব্যাখ্যা

Nested `for` loop দিয়ে প্রতিটি cell visit করে `sum += a[i][j]`। Input loop এর ভেতরেই sum calculation করা হয়েছে — আলাদা loop লাগে না (efficient)।

```
Matrix (2×3):
1 2 3
4 5 6

i=0: j=0: sum=1
     j=1: sum=3
     j=2: sum=6
i=1: j=0: sum=10
     j=1: sum=15
     j=2: sum=21

Total = 21
```

Time complexity O(m×n) — যেকোনো matrix problem এর minimum।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int a[10][10], row, col, i, j, sum = 0;

    printf("Enter rows and columns: ");
    scanf("%d %d", &row, &col);

    printf("Enter matrix elements:\n");

    for(i = 0; i < row; i++)
    {
        for(j = 0; j < col; j++)
        {
            scanf("%d", &a[i][j]);
            sum += a[i][j];
        }
    }

    printf("Total sum = %d\n", sum);

    return 0;
}
```

> **Exam tip:** Input ও computation এক loop এ করার pattern memory-efficient। কিন্তু যদি element আবার ব্যবহার করতে হতো (যেমন row sum + col sum), আলাদা loop লাগতো। Trade-off বুঝে নিতে হবে।

---

## Problem 65 — Array এর Second Smallest Element

> **Question:** Write a C program to find second smallest element in an array.

### সমস্যা বোঝো

Array এ সবচেয়ে ছোট element কে smallest, এবং তার পরের ছোটটি second smallest। যেমন `[5, 2, 8, 1, 9]` → smallest = 1, second smallest = 2।

### Sample Input / Output

```
Input:
Enter number of elements: 5
Enter array elements:
5 2 8 1 9

Output:
Second smallest = 2
```

```
Input:
Enter number of elements: 4
Enter array elements:
10 20 30 40

Output:
Second smallest = 20
```

### কাজের Logic ব্যাখ্যা

দুটি variable — `smallest` ও `secondSmallest`, দুটোই `999999` (very large) দিয়ে initialize।

প্রতিটি element check:

- যদি `arr[i] < smallest` — তাহলে current smallest হয় second smallest, আর `arr[i]` হয় new smallest।
- নাহলে যদি `arr[i] < secondSmallest` AND `arr[i] != smallest` — তাহলে শুধু second smallest update।

```
arr = [5, 2, 8, 1, 9]
Initial: smallest=999999, secondSmallest=999999

i=0: 5 < 999999 → secondSmallest=999999, smallest=5
i=1: 2 < 5 → secondSmallest=5, smallest=2
i=2: 8 not < 2, 8 < 5? No → no change
     Wait — 8 < secondSmallest(5)? No → no change
i=3: 1 < 2 → secondSmallest=2, smallest=1
i=4: 9 not < 1, 9 < 2? No → no change

Final: smallest=1, secondSmallest=2 ✓
```

`arr[i] != smallest` check করা হয়েছে যাতে duplicate element second smallest না হয় (যেমন `[1, 1, 2]` এ second smallest 2, 1 না)।

### Complete Code

```c
#include <stdio.h>

int main()
{
    int arr[100], n, i;
    int smallest, secondSmallest;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter array elements:\n");

    for(i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    smallest = secondSmallest = 999999;

    for(i = 0; i < n; i++)
    {
        if(arr[i] < smallest)
        {
            secondSmallest = smallest;
            smallest = arr[i];
        }
        else if(arr[i] < secondSmallest && arr[i] != smallest)
        {
            secondSmallest = arr[i];
        }
    }

    printf("Second smallest = %d\n", secondSmallest);

    return 0;
}
```

> **Exam tip:** `INT_MAX` (`<limits.h>` থেকে) ব্যবহার `999999` এর চেয়ে safer — কারণ array এ যদি `1000000+` মানের সংখ্যা থাকে। Single-pass O(n) সবচেয়ে efficient — sort করে O(n log n) এ একই কাজ হয়, কিন্তু slower।

---

## Problems 36–65 সংক্ষেপ

| # | বিষয় | মূল Concept |
|---|------|-------------|
| 36 | Largest & Smallest in Array | Single-pass with `arr[0]` initialization |
| 37 | Symmetric Matrix | `A == A^T` element-wise compare |
| 38 | String Length without strlen | `'\0'` terminator detection loop |
| 39 | Primes between two numbers | Nested loop, trial division |
| 40 | Structure (Student) | `struct`, dot operator, member access |
| 41 | Add using Pointer | `*p1 + *p2`, address-of `&` |
| 42 | String Concatenation manual | Walk to `'\0'`, then copy + null-terminate |
| 43 | Row & Column Sum | Loop swap pattern (i,j vs j,i) |
| 44 | ASCII Value | `%c` vs `%d` on same char |
| 45 | Call by Value vs Reference | Pass by copy vs pass via pointer |
| 46 | Factorial (loop) | `fact = fact * i`, use `long long` |
| 47 | Leap Year | `%400 OR (%4 AND !%100)` |
| 48 | Sum of Digits | `digit = n%10`, `n /= 10` |
| 49 | Reverse Number | `rev = rev*10 + n%10` |
| 50 | Even/Odd by Function | `void` return, `n % 2` |
| 51 | Sum of 1..n | Loop or formula `n(n+1)/2` |
| 52 | Armstrong 1–1000 | Count digits → power-sum → compare |
| 53 | Array Max via Pointer | `*(ptr + i)` notation |
| 54 | Palindrome Number | Save original, reverse, compare |
| 55 | Square & Cube | Plain multiplication, `void` function |
| 56 | Count Even & Odd | Two counters + `% 2` |
| 57 | Sum of Primes in Range | Modular `isPrime()` function |
| 58 | 2x2 Determinant | `ad - bc` direct formula |
| 59 | Binary to Decimal | `digit * 2^position` accumulator |
| 60 | Sum of Even by Function | `int` return type, `% 2` filter |
| 61 | Array Average | `float sum`, integer-division trap |
| 62 | Factorial by Recursion | Base case `n==0` returns 1 |
| 63 | Vowel/Consonant | 10-condition OR (a/e/i/o/u + caps) |
| 64 | Matrix Total Sum | Nested loop, sum-while-input |
| 65 | Second Smallest | Two trackers, dual-update logic |

---

[← Set 2 (Problems 11–35)](/docs/c-programming/11-c-problems-p2) · [↑ C Programming Master Index](/docs/c-programming/00-master-index)
