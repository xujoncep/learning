# Chapter 03 â€” Data Containers (Arrays, Strings & Math) â€” C Programming ðŸ’»

> 1D/2D array, matrix, string manipulation à¦à¦¬à¦‚ à¦—à¦¾à¦£à¦¿à¦¤à¦¿à¦• à¦¸à¦®à¦¸à§à¦¯à¦¾à¦° à¦¸à¦®à¦¾à¦§à¦¾à¦¨à¥¤

---
# LEVEL 3: DATA CONTAINERS (ARRAYS, STRINGS & MATH)

*Data collection â€” à¦à¦•à¦‡ type à¦à¦° à¦…à¦¨à§‡à¦• data à¦à¦•à¦Ÿà¦¿ à¦¨à¦¾à¦®à§‡ manage à¦•à¦°à¦¾*

---
---

# Topic 13: 1D Array

<div align="center">

*"Array = contiguous memory à¦¤à§‡ same type à¦à¦° data collection, 0-indexed"*

</div>

---

## ðŸ“– 13.1 à¦§à¦¾à¦°à¦£à¦¾ (Concept)

```
int arr[5] = {10, 20, 30, 40, 50};

Memory Layout:
Index:    [0]    [1]    [2]    [3]    [4]
        â”Œâ”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”
Value:  â”‚  10  â”‚  20  â”‚  30  â”‚  40  â”‚  50  â”‚
        â””â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”˜
Address: 1000   1004   1008   1012   1016

âš¡ Index starts from 0!
âš¡ arr[5] â†’ OUT OF BOUNDS! (UB, no error in C)
âš¡ sizeof(arr) = 5 Ã— 4 = 20 bytes
âš¡ Element count = sizeof(arr) / sizeof(arr[0]) = 5
```

---

## ðŸ’» 13.2 Declaration & Initialization

```c
int a[5] = {10, 20, 30, 40, 50};  /* full init */
int b[5] = {10, 20};              /* partial: {10,20,0,0,0} */
int c[5] = {0};                   /* all zeros: {0,0,0,0,0} */
int d[] = {10, 20, 30};           /* auto size: 3 elements */
int e[5] = {[0]=5, [3]=30};       /* designated (C99): {5,0,0,30,0} */

int f[5];                          /* âš ï¸ local: GARBAGE values! */
static int g[5];                   /* âœ… static: all zeros */
```

> **Partial init rule:** explicitly initialized à¦¹à¦²à§‡ à¦¬à¦¾à¦•à¦¿ = **0**à¥¤ à¦•à¦¿à¦¨à§à¦¤à§ **uninitialized local** array = **garbage!**

---

## ðŸ’» 13.3 Array & Pointer Relationship

```c
/* arr[i] = *(arr + i) = *(i + arr) = i[arr] â€” ALL IDENTICAL! */

int arr[] = {10, 20, 30};
printf("%d\n", arr[1]);       /* 20 */
printf("%d\n", *(arr + 1));   /* 20 */
printf("%d\n", 1[arr]);       /* 20 âš ï¸ valid! */

/* Array name = constant pointer to first element */
/* arr = &arr[0] */
/* arr++ â†’ âŒ Error! arr is NOT modifiable */
/* int *p = arr; p++ â†’ âœ… pointer variable is modifiable */
```

---

## ðŸ’» 13.4 Array in Function â€” Decay to Pointer

```c
void printArr(int arr[], int size) {
    /* âš ï¸ sizeof(arr) = 4/8 (POINTER size, NOT array size!) */
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);

    arr[0] = 999;  /* âš ï¸ ORIGINAL array modified! */
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);  /* 5 (correct in main) */
    printArr(arr, size);  /* must pass size separately! */
    printf("\narr[0] = %d\n", arr[0]);  /* 999 â€” changed! */
}
```

---

## ðŸ“ 13.6 Summary

- Array = **same type**, **contiguous memory**, **0-indexed**à¥¤ `arr[5]` = 5 elements: index 0 to 4à¥¤

- **Partial init** â†’ à¦¬à¦¾à¦•à¦¿ **0**; `{0}` = à¦¸à¦¬ 0; **uninitialized local = garbage!**

- **`arr[i]` = `*(arr+i)` = `i[arr]`** â€” à¦¸à¦¬ identical! Array name = &arr[0] (constant pointer)à¥¤

- **sizeof(arr)** main à¦ = total bytes; function à¦ = **pointer size** (4/8)! Size à¦†à¦²à¦¾à¦¦à¦¾ pass à¦•à¦°à§à¦¨à¥¤

- Function à¦ array = **pointer** pass â†’ modify à¦•à¦°à¦²à§‡ **original** à¦“ change à¦¹à¦¯à¦¼! Protection: `const int arr[]`

- **Out of bounds** access â†’ C à¦¤à§‡ **à¦•à§‹à¦¨à§‹ error à¦¨à§‡à¦‡**, à¦•à¦¿à¦¨à§à¦¤à§ **Undefined Behavior!**

---
---

# Topic 14: 2D Array & Matrix Operations

<div align="center">

*"2D Array = array of arrays = matrix = table of rows and columns"*

</div>

---

## ðŸ“– 14.1 à¦§à¦¾à¦°à¦£à¦¾ (Concept)

```
int m[3][4] â€” 3 rows Ã— 4 columns

         Col0  Col1  Col2  Col3
Row 0  [  1     2     3     4  ]
Row 1  [  5     6     7     8  ]
Row 2  [  9    10    11    12  ]

Memory (Row-Major â€” C default):
â”Œâ”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”¬â”€â”€â”€â”
â”‚ 1 â”‚ 2 â”‚ 3 â”‚ 4 â”‚ 5 â”‚ 6 â”‚ 7 â”‚ 8 â”‚ 9 â”‚10 â”‚11 â”‚12 â”‚
â””â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”´â”€â”€â”€â”˜
     Row 0          Row 1           Row 2

Size: rows = sizeof(m)/sizeof(m[0])       = 3
      cols = sizeof(m[0])/sizeof(m[0][0]) = 4
```

---

## ðŸ’» 14.2 Declaration & Function Parameter

```c
/* â•â•â• Declaration â•â•â• */
int a[2][3] = {{1,2,3}, {4,5,6}};     /* nested init */
int b[2][3] = {1,2,3,4,5,6};          /* flat init (same!) */
int c[][3]  = {{1,2,3}, {4,5,6}};     /* row auto, column MUST specify! */
/* int d[2][] = {...};  â† âŒ Error! column size MANDATORY! */

/* â•â•â• Function parameter â€” column size REQUIRED! â•â•â• */
void print(int m[][4], int rows) { }   /* âœ… */
void print(int (*m)[4], int rows) { }  /* âœ… same thing */
/* void print(int m[][], int r, int c); â† âŒ Error! */
/* void print(int **m, int r, int c);   â† âŒ int** â‰  int[][N]! */
```

---

## ðŸ’» 14.3 Matrix Multiplication â€” Exam Classic

```c
/* A[mÃ—n] Ã— B[nÃ—p] = C[mÃ—p] â€” n MUST match! */

void multiply(int A[][3], int B[][2], int C[][2], int m, int n, int p) {
    for (int i = 0; i < m; i++)
        for (int j = 0; j < p; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
        }
}
/* Triple nested loop: i(rows A), j(cols B), k(common dimension) */
```

---

## ðŸ’» 14.4 Pointer & 2D Array

```c
int m[3][4];

/* Type hierarchy: */
/* m       â†’ int (*)[4]   (pointer to row of 4 ints)     */
/* m[i]    â†’ int *         (pointer to element)           */
/* m[i][j] â†’ int           (value)                        */

/* m + 1    â†’ skips ENTIRE ROW (16 bytes for int[4])      */
/* m[0] + 1 â†’ skips ONE ELEMENT (4 bytes)                 */

/* Access: m[i][j] = *(*(m+i)+j) = *(m[i]+j)             */
```

---

## ðŸ“ 14.6 Summary

- 2D Array = **rows Ã— columns**, **row-major** order à¦ memory à¦¤à§‡ storeà¥¤ **Column size mandatory** â€” row omit à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¥¤

- **`int**` â‰  `int[][N]`!** Dynamic 2D (pointer-to-pointer) à¦“ static 2D array **à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦­à¦¿à¦¨à§à¦¨** memory layoutà¥¤

- **m+1** = next **row** (big jump), **m[0]+1** = next **element** (small jump) â€” exam à¦ à¦†à¦¸à§‡à¥¤

- **Matrix multiply:** A[mÃ—n] Ã— B[nÃ—p] = C[mÃ—p]à¥¤ Triple loop (i, j, k)à¥¤ **n must match!**

- **Transpose:** `t[j][i] = m[i][j]`à¥¤ In-place: **j = i+1** à¦¥à§‡à¦•à§‡ à¦¶à§à¦°à§ (double-swap prevent)à¥¤

---
---

# Topic 15: String Basics

<div align="center">

*"C à¦¤à§‡ string = null-terminated char array â€” '\0' à¦‡ string à¦à¦° à¦ªà§à¦°à¦¾à¦£"*

</div>

---

## ðŸ“– 15.1 à¦§à¦¾à¦°à¦£à¦¾ (Concept)

```
char name[] = "Hello";

Memory:
Index:  [0]  [1]  [2]  [3]  [4]  [5]
       â”Œâ”€â”€â”€â”€â”¬â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”
Value: â”‚ 'H'â”‚ 'e'â”‚ 'l'â”‚ 'l'â”‚ 'o'â”‚'\0'â”‚
       â””â”€â”€â”€â”€â”´â”€â”€â”€â”€â”´â”€â”€â”€â”€â”´â”€â”€â”€â”€â”´â”€â”€â”€â”€â”´â”€â”€â”€â”€â”˜

âš¡ "Hello" = 5 chars + 1 null = 6 BYTES total!
âš¡ sizeof("Hello") = 6 (includes '\0')
âš¡ strlen("Hello") = 5 (excludes '\0')
```

---

## ðŸ’» 15.2 char[] vs char* â€” Critical Difference!

```c
char arr[] = "Hello";   /* Array COPY â€” modifiable! âœ… */
char *ptr  = "Hello";   /* Pointer to LITERAL â€” READ-ONLY! âš ï¸ */

arr[0] = 'J';           /* âœ… "Jello" */
/* ptr[0] = 'J';        â† âŒ UB! string literal read-only! */

/* sizeof difference: */
printf("%lu\n", sizeof(arr));  /* 6 (array size) */
printf("%lu\n", sizeof(ptr));  /* 4/8 (pointer size!) */
```

> **Golden Rule:** `char s[]` = modifiable copy, `char *s` = read-only pointer to literal!

---

## ðŸ’» 15.3 Input Methods

```c
char name[50];

/* â•â•â•â•â•â• scanf %s â€” STOPS AT WHITESPACE! â•â•â•â•â•â• */
scanf("%s", name);
/* "John Doe" â†’ name = "John" ONLY! âš ï¸ */

/* â•â•â•â•â•â• fgets â€” reads FULL LINE (BEST!) â•â•â•â•â•â• */
fgets(name, 50, stdin);
/* âš ï¸ includes '\n'! Remove: */
name[strcspn(name, "\n")] = '\0';

/* â•â•â•â•â•â• scanf scanset â•â•â•â•â•â• */
scanf(" %[^\n]", name);   /* reads until newline */
```

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Method       â”‚ Spaces?  â”‚ Safe?    â”‚ '\n' in str? â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ scanf("%s")  â”‚ âŒ stops â”‚ âš ï¸        â”‚ âŒ            â”‚
â”‚ fgets()      â”‚ âœ… reads â”‚ âœ… safe   â”‚ âš ï¸ includes!  â”‚
â”‚ gets()       â”‚ âœ…       â”‚ âŒ NEVER! â”‚ âŒ            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ’» 15.4 Essential String Functions (string.h)

```c
#include `string.h`

strlen(s)           /* length (excluding '\0') */
strcpy(dest, src)   /* copy src â†’ dest */
strcat(dest, src)   /* append src to end of dest */
strcmp(s1, s2)      /* compare: 0=equal, <0 s1 first, >0 s2 first */
strchr(s, c)        /* find first occurrence of char c */
strstr(hay, needle) /* find substring */
strncpy(d, s, n)    /* copy max n chars âš ï¸ may NOT null-terminate! */
strtok(s, delim)    /* tokenize âš ï¸ modifies original string! */
```

> **strcmp return:** 0 = **equal**, negative = s1 comes first, positive = s2 comes firstà¥¤ `==` à¦¦à¦¿à¦¯à¦¼à§‡ string compare **à¦•à¦°à¦¬à§‡à¦¨ à¦¨à¦¾!** (address compare à¦¹à¦¯à¦¼)

---

## ðŸ’» 15.5 Implement strlen & strcpy with Pointer

```c
int myStrlen(const char *s) {
    const char *start = s;
    while (*s) s++;
    return s - start;
}

char* myStrcpy(char *dest, const char *src) {
    char *d = dest;
    while ((*d++ = *src++));   /* copy + advance + check '\0' */
    return dest;
}
```

---

## ðŸ“ 15.7 Summary

- C à¦¤à§‡ string = **null-terminated char array** (`'\0'` à¦¦à¦¿à¦¯à¦¼à§‡ à¦¶à§‡à¦·)à¥¤ **sizeof** includes '\0', **strlen** excludes â€” buffer = `strlen + 1`à¥¤

- **`char s[]`** = modifiable array copy; **`char *s`** = read-only pointer to literal! `s[0] = 'X'` â†’ array âœ…, pointer âŒ (UB)à¥¤ à¦à¦‡ à¦ªà¦¾à¦°à§à¦¥à¦•à§à¦¯ exam à¦ **à¦¸à¦¬à¦šà§‡à¦¯à¦¼à§‡ à¦¬à§‡à¦¶à¦¿** à¦†à¦¸à§‡à¥¤

- **scanf("%s")** whitespace à¦ stop à¦•à¦°à§‡ â€” "John Doe" â†’ à¦¶à§à¦§à§ "John"à¥¤ Full line à¦ªà¦¡à¦¼à¦¤à§‡ **fgets()** best, à¦¤à¦¬à§‡ **'\n' include** à¦•à¦°à§‡ â€” remove à¦•à¦°à¦¤à§‡ à¦¹à¦¯à¦¼à¥¤

- **strcmp()** = 0 à¦®à¦¾à¦¨à§‡ **equal**à¥¤ `==` à¦¦à¦¿à¦¯à¦¼à§‡ string compare **à¦•à¦°à¦¬à§‡à¦¨ à¦¨à¦¾** â€” address compare à¦¹à¦¯à¦¼, content à¦¨à¦¯à¦¼!

- **strncpy** n chars copy à¦•à¦°à§‡ à¦•à¦¿à¦¨à§à¦¤à§ **null terminate à¦¨à¦¾à¦“ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à§‡** â€” manual '\0' à¦¦à¦¿à¦¤à§‡ à¦¹à¦¯à¦¼à¥¤ **strtok** original string **modify** à¦•à¦°à§‡ â€” delimiter '\0' à¦¦à¦¿à¦¯à¦¼à§‡ replace à¦¹à¦¯à¦¼à¥¤

- Declaration à¦ªà¦°à§‡ **`s = "Hello"` illegal!** â€” `strcpy(s, "Hello")` à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦¬à¦¾à¦§à§à¦¯à¦¤à¦¾à¦®à§‚à¦²à¦•à¥¤

- **`"Hello\0World"`** â€” '\0' string functions à¦•à§‡ **stop** à¦•à¦°à§‡à¥¤ strlen = 5, sizeof = 12à¥¤ "World" invisible but memory à¦¤à§‡ à¦†à¦›à§‡à¥¤

---
---

<div align="center">

## à¦ªà¦°à¦¬à¦°à§à¦¤à§€ à¦…à¦§à§à¦¯à¦¾à¦¯à¦¼

**Topic 16-20:** String Problems, Pointer Basics, Pointer+Array, Double Pointer & Function Pointer, Dynamic Memory

*Topic 16-20: String Problems, Pointers, Dynamic Memory â€” à¦¨à¦¿à¦šà§‡ à¦¦à§‡à¦–à§à¦¨*

</div>

---
---

# Topic 16: String Problems (Advanced)

<div align="center">

*"String manipulation = interview à¦“ exam à¦à¦° à¦¹à¦¾à¦¤à¦¿à¦¯à¦¼à¦¾à¦°"*

</div>

---

## ðŸ“– 16.1 Essential String Algorithms

### Palindrome Check

```c
int isPalindrome(const char *s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        if (s[left] != s[right]) return 0;
        left++; right--;
    }
    return 1;
}
/* "madam" â†’ Yes, "hello" â†’ No */
```

### Anagram Check (Frequency Array)

```c
int isAnagram(const char *s1, const char *s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    int freq[256] = {0};
    for (int i = 0; s1[i]; i++) freq[(unsigned char)s1[i]]++;
    for (int i = 0; s2[i]; i++) freq[(unsigned char)s2[i]]--;
    for (int i = 0; i < 256; i++)
        if (freq[i] != 0) return 0;
    return 1;
}
/* "listen"/"silent" â†’ Anagram âœ… */
```

### Reverse Words in String

```c
void reverseRange(char *s, int start, int end) {
    while (start < end) {
        char t = s[start]; s[start] = s[end]; s[end] = t;
        start++; end--;
    }
}
void reverseWords(char *s) {
    int len = strlen(s);
    reverseRange(s, 0, len - 1);       /* reverse entire string */
    int start = 0;
    for (int i = 0; i <= len; i++) {
        if (s[i] == ' ' || s[i] == '\0') {
            reverseRange(s, start, i - 1); /* reverse each word */
            start = i + 1;
        }
    }
}
/* "Hello World" â†’ "World Hello" */
```

### First Non-Repeating Character

```c
char firstNonRepeating(const char *s) {
    int freq[256] = {0};
    for (int i = 0; s[i]; i++) freq[(unsigned char)s[i]]++;
    for (int i = 0; s[i]; i++)
        if (freq[(unsigned char)s[i]] == 1) return s[i];
    return '\0';
}
/* "aabcbd" â†’ 'c' */
```

### String Rotation Check

```c
int isRotation(const char *s1, const char *s2) {
    if (strlen(s1) != strlen(s2)) return 0;
    char doubled[200];
    strcpy(doubled, s1);
    strcat(doubled, s1);           /* s1+s1 contains ALL rotations! */
    return strstr(doubled, s2) != NULL;
}
/* "abcde" / "cdeab" â†’ Rotation âœ… */
/* Trick: "abcdeabcde" contains "cdeab"! */
```

---

## ðŸ“ 16.3 Summary

- **Frequency array** `int freq[256]` = string problem à¦à¦° **universal tool** â€” anagram, duplicate, count à¦¸à¦¬ solve à¦•à¦°à§‡à¥¤
- **Palindrome**: two-pointer (left, right) approach â€” O(n)
- **Word reverse**: entire string reverse â†’ each word reverse â†’ O(n)
- **Rotation check**: s1+s1 concatenate â†’ s2 à¦–à§à¦à¦œà§à¦¨ (strstr) â€” elegant O(n) trick
- **`==` à¦¦à¦¿à¦¯à¦¼à§‡ string compare à¦•à¦°à¦¬à§‡à¦¨ à¦¨à¦¾!** Address compare à¦¹à¦¯à¦¼, content à¦¨à¦¯à¦¼à¥¤ `strcmp()` à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§à¦¨à¥¤

---
---

---

## ðŸ”— Navigation

- ðŸ  Back to [C Programming â€” Master Index](00-master-index.md)
- â¬…ï¸ Previous: [Chapter 03 â€” Functions â€” Deep Dive](03-functions-deep.md)
- âž¡ï¸ Next: [Chapter 05 â€” Pointers](05-pointers.md)

---

# Chapter 07 â€” Math, Search & Sort â€” C Programming ðŸ’»

> Number system, series, digit manipulation, linear/binary search, basic sortsà¥¤

---
# LEVEL 8-9: MATH, SEARCH & SORT

*Number crunching, searching, sorting â€” algorithm fundamentals*

---
---

# Topic 26: Number System Conversion

<div align="center">

*"Decimal â†” Binary â†” Octal â†” Hex â€” computer à¦à¦° à¦­à¦¾à¦·à¦¾ à¦¬à§à¦à¦¤à§‡ à¦¹à¦²à§‡ base conversion à¦œà¦¾à¦¨à¦¤à§‡à¦‡ à¦¹à¦¬à§‡"*

</div>

---

## ðŸ“– 26.1 Number Systems Overview

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ System   â”‚ Base â”‚ Digits   â”‚ C Prefix         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Binary   â”‚  2   â”‚ 0, 1     â”‚ 0b (0b1010)      â”‚
â”‚ Octal    â”‚  8   â”‚ 0-7      â”‚ 0  (012)         â”‚
â”‚ Decimal  â”‚ 10   â”‚ 0-9      â”‚ none (10)        â”‚
â”‚ Hex      â”‚ 16   â”‚ 0-9, A-F â”‚ 0x (0xA)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

Quick Table:
Dec â”‚ Bin  â”‚ Oct â”‚ Hex
â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€
 0  â”‚ 0000 â”‚  0  â”‚  0
 5  â”‚ 0101 â”‚  5  â”‚  5
 10 â”‚ 1010 â”‚ 12  â”‚  A
 15 â”‚ 1111 â”‚ 17  â”‚  F
 16 â”‚10000 â”‚ 20  â”‚ 10
255 â”‚11111111â”‚377â”‚ FF
```

---

## ðŸ’» 26.2 Conversion Functions

```c
#include `stdio.h`

/* â•â•â•â•â•â• Decimal â†’ Binary (print) â•â•â•â•â•â• */
void decToBin(int n) {
    if (n == 0) { printf("0"); return; }
    int bits[32], count = 0;
    while (n > 0) {
        bits[count++] = n % 2;
        n /= 2;
    }
    for (int i = count - 1; i >= 0; i--)
        printf("%d", bits[i]);
}
/* 13 â†’ 1101 */

/* â•â•â•â•â•â• Binary â†’ Decimal â•â•â•â•â•â• */
int binToDec(long long bin) {
    int dec = 0, base = 1;
    while (bin > 0) {
        dec += (bin % 10) * base;
        base *= 2;
        bin /= 10;
    }
    return dec;
}
/* 1101 â†’ 13 */

/* â•â•â•â•â•â• Decimal â†’ Octal â•â•â•â•â•â• */
void decToOct(int n) {
    printf("%o", n);          /* built-in! */
}

/* â•â•â•â•â•â• Decimal â†’ Hex â•â•â•â•â•â• */
void decToHex(int n) {
    printf("%X", n);          /* built-in! */
}

/* â•â•â•â•â•â• printf built-in conversions â•â•â•â•â•â• */
int main() {
    int n = 255;
    printf("Decimal: %d\n", n);     /* 255 */
    printf("Octal:   %o\n", n);     /* 377 */
    printf("Hex:     %X\n", n);     /* FF */
    printf("Hex(0x): %#x\n", n);    /* 0xff */

    return 0;
}
```

---

## ðŸ“ 26.4 Summary

- **Binary** (base 2): computer à¦à¦° native languageà¥¤ C prefix: `0b`à¥¤ **Octal** (base 8): prefix `0`à¥¤ **Hex** (base 16): prefix `0x`

- **Decimal â†’ Binary:** à¦¬à¦¾à¦°à¦¬à¦¾à¦° 2 à¦¦à¦¿à¦¯à¦¼à§‡ à¦­à¦¾à¦—, remainder à¦¨à¦¿à¦š à¦¥à§‡à¦•à§‡ à¦ªà¦¡à¦¼à§à¦¨à¥¤ **Binary â†’ Decimal:** à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ bit Ã— 2^position

- **printf** built-in conversion: `%o`=octal, `%x`=hex, `%d`=decimalà¥¤ `%#x` = "0x" prefix à¦¸à¦¹

- **Quick trick:** 4-bit group = 1 hex digità¥¤ `1111` = F, `1010` = Aà¥¤ Binary â†” Hex à¦¦à§à¦°à§à¦¤ convert à¦¹à¦¯à¦¼

---
---

# Topic 27: Series & Sequences

<div align="center">

*"Series = pattern à¦šà¦¿à¦¨à§‡ formula à¦¬à§‡à¦° à¦•à¦°à§‹ â€” exam à¦ à¦¸à¦¿à¦°à¦¿à¦œà§‡à¦° sum à¦“ nth term à¦†à¦¸à§‡"*

</div>

---

## ðŸ’» 27.1 Common Series

```c
#include `stdio.h`

int main() {
    int n = 10;

    /* â•â•â•â•â•â• Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13... â•â•â•â•â•â• */
    int a = 0, b = 1;
    printf("Fibonacci: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b; b = next;
    }
    printf("\n");

    /* â•â•â•â•â•â• AP: a, a+d, a+2d... â•â•â•â•â•â• */
    int first = 2, d = 3;
    printf("AP: ");
    for (int i = 0; i < n; i++)
        printf("%d ", first + i * d);    /* 2, 5, 8, 11... */
    printf("\n");
    /* Sum = n/2 * (2a + (n-1)d)  OR  n/2 * (first + last) */

    /* â•â•â•â•â•â• GP: a, a*r, a*rÂ²... â•â•â•â•â•â• */
    float a_gp = 2, r = 3;
    printf("GP: ");
    float term = a_gp;
    for (int i = 0; i < 6; i++) {
        printf("%.0f ", term);          /* 2, 6, 18, 54... */
        term *= r;
    }
    printf("\n");
    /* Sum = a*(r^n - 1)/(r - 1) */

    /* â•â•â•â•â•â• Special: 1Â² + 2Â² + 3Â²... â•â•â•â•â•â• */
    int sumSq = 0;
    for (int i = 1; i <= n; i++) sumSq += i * i;
    printf("Sum of squares(10) = %d\n", sumSq);   /* 385 */
    /* Formula: n(n+1)(2n+1)/6 */

    /* â•â•â•â•â•â• Special: 1Â³ + 2Â³ + 3Â³... â•â•â•â•â•â• */
    int sumCube = 0;
    for (int i = 1; i <= n; i++) sumCube += i * i * i;
    printf("Sum of cubes(10) = %d\n", sumCube);     /* 3025 */
    /* Formula: [n(n+1)/2]Â² */

    /* â•â•â•â•â•â• Harmonic: 1 + 1/2 + 1/3 + 1/4... â•â•â•â•â•â• */
    float harmonic = 0;
    for (int i = 1; i <= n; i++) harmonic += 1.0f / i;
    printf("Harmonic(10) = %.4f\n", harmonic);      /* 2.9290 */

    return 0;
}
```

---

## ðŸ“– 27.2 Formula Sheet

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Series              â”‚ Sum Formula                     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 1+2+3+...+n        â”‚ n(n+1)/2                        â”‚
â”‚ 1Â²+2Â²+...+nÂ²       â”‚ n(n+1)(2n+1)/6                  â”‚
â”‚ 1Â³+2Â³+...+nÂ³       â”‚ [n(n+1)/2]Â²                     â”‚
â”‚ AP sum              â”‚ n/2 Ã— (2a + (n-1)d)             â”‚
â”‚ GP sum              â”‚ a(râ¿ - 1)/(r - 1)              â”‚
â”‚ AP nth term         â”‚ a + (n-1)d                      â”‚
â”‚ GP nth term         â”‚ a Ã— r^(n-1)                     â”‚
â”‚ Fibonacci           â”‚ F(n) = F(n-1) + F(n-2)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ“ 27.4 Summary

- **AP:** nth term = `a + (n-1)d`, sum = `n/2 Ã— (first + last)`à¥¤ **GP:** nth term = `a Ã— r^(n-1)`, sum = `a(râ¿-1)/(r-1)`

- **Sum formulas à¦®à§à¦–à¦¸à§à¦¥:** 1+2+...+n = `n(n+1)/2`, squares = `n(n+1)(2n+1)/6`, cubes = `[n(n+1)/2]Â²`

- **Fibonacci** iterative: O(n) time, O(1) space â€” exam à¦ iterative à¦‡ à¦šà¦¾à¦“à¦¯à¦¼à¦¾ à¦¹à¦¯à¦¼à¥¤ Recursive = O(2â¿) â€” avoid!

---
---

# Topic 28: Digit Manipulation

<div align="center">

*"à¦¸à¦‚à¦–à§à¦¯à¦¾à¦° digit à¦¨à¦¿à¦¯à¦¼à§‡ à¦–à§‡à¦²à¦¾ â€” reverse, sum, Armstrong, count"*

</div>

---

## ðŸ’» 28.1 Essential Digit Operations

```c
#include `stdio.h`
#include `math.h`

int main() {
    int num = 12345;

    /* â•â•â•â•â•â• Extract last digit â•â•â•â•â•â• */
    int lastDigit = num % 10;        /* 5 */

    /* â•â•â•â•â•â• Remove last digit â•â•â•â•â•â• */
    int withoutLast = num / 10;      /* 1234 */

    /* â•â•â•â•â•â• Count digits â•â•â•â•â•â• */
    int n = num, count = 0;
    while (n > 0) { count++; n /= 10; }
    printf("Digits: %d\n", count);    /* 5 */

    /* â•â•â•â•â•â• Sum of digits â•â•â•â•â•â• */
    n = num; int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    printf("Digit sum: %d\n", sum);   /* 15 */

    /* â•â•â•â•â•â• Reverse number â•â•â•â•â•â• */
    n = num; int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed: %d\n", reversed); /* 54321 */

    /* â•â•â•â•â•â• Palindrome check â•â•â•â•â•â• */
    int original = 12321;
    n = original; reversed = 0;
    while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }
    printf("%d is %spalindrome\n", original,
           (original == reversed) ? "" : "not "); /* palindrome! */

    return 0;
}
```

---

## ðŸ’» 28.2 Armstrong & Special Numbers

```c
/* â•â•â•â•â•â• Armstrong: sum of digits^n = number â•â•â•â•â•â• */
/* 153 = 1Â³ + 5Â³ + 3Â³ = 1+125+27 = 153 âœ… */
int isArmstrong(int num) {
    int original = num, sum = 0;
    int digits = 0, n = num;
    while (n > 0) { digits++; n /= 10; }

    n = num;
    while (n > 0) {
        int d = n % 10;
        sum += (int)pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
/* Armstrong numbers: 1,2,...,9, 153, 370, 371, 407, 1634... */

/* â•â•â•â•â•â• Strong Number: sum of digit factorials = number â•â•â•â•â•â• */
/* 145 = 1! + 4! + 5! = 1+24+120 = 145 âœ… */
int factorial(int n) {
    int f = 1;
    for (int i = 2; i <= n; i++) f *= i;
    return f;
}
int isStrong(int num) {
    int sum = 0, n = num;
    while (n > 0) { sum += factorial(n % 10); n /= 10; }
    return sum == num;
}

/* â•â•â•â•â•â• Automorphic: nÂ² ends with n â•â•â•â•â•â• */
/* 5Â² = 25 (ends with 5), 76Â² = 5776 (ends with 76) */
int isAutomorphic(int n) {
    int sq = n * n;
    while (n > 0) {
        if (n % 10 != sq % 10) return 0;
        n /= 10; sq /= 10;
    }
    return 1;
}
```

---

## ðŸ“ 28.4 Summary

- **Two magic operations:** `num % 10` = **last digit** extract, `num / 10` = last digit **remove**à¥¤ à¦à¦‡ à¦¦à§à¦Ÿà§‹ à¦¦à¦¿à¦¯à¦¼à§‡ à¦¸à¦¬ digit problem solve à¦¹à¦¯à¦¼

- **Reverse number:** `reversed = reversed * 10 + num % 10; num /= 10;` â€” loop à¦¶à§‡à¦·à§‡ reversed à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼

- **Palindrome:** reverse == original? Armstrong: digit^n sum == original? Strong: digit! sum == original?

- **Digit count:** `while(n>0) { count++; n/=10; }`à¥¤ âš ï¸ n=0 à¦¹à¦²à§‡ count=0 â€” special case handle!

---
---

# Topic 29: Linear Search & Binary Search

<div align="center">

*"Search = data à¦–à§‹à¦à¦œà¦¾ â€” Linear à¦¹à¦²à§‹ à¦¸à¦¹à¦œ, Binary à¦¹à¦²à§‹ à¦¦à§à¦°à§à¦¤"*

</div>

---

## ðŸ’» 29.1 Linear Search â€” O(n)

```c
/* â•â•â•â•â•â• Simple: check every element â•â•â•â•â•â• */
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target)
            return i;          /* found! return index */
    return -1;                 /* not found */
}

/* âš¡ Works on: sorted OR unsorted array
   âš¡ Time: O(n) â€” worst case check all elements
   âš¡ Space: O(1) */
```

---

## ðŸ’» 29.2 Binary Search â€” O(log n)

```c
/* â•â•â•â•â•â• Iterative (preferred!) â•â•â•â•â•â• */
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;  /* âš¡ avoids overflow! */

        if (arr[mid] == target) return mid;      /* found! */
        else if (arr[mid] < target) low = mid + 1;   /* right half */
        else high = mid - 1;                          /* left half */
    }
    return -1;  /* not found */
}

/* â•â•â•â•â•â• Recursive â•â•â•â•â•â• */
int binarySearchRec(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;

    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, mid + 1, high, target);
    return binarySearchRec(arr, low, mid - 1, target);
}

/* âš¡ REQUIRES: SORTED array!
   âš¡ Time: O(log n) â€” halves search space each step
   âš¡ Space: O(1) iterative, O(log n) recursive */
```

```
Binary Search Visualization:
â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1: low=0, high=9, mid=4 â†’ arr[4]=16 < 23 â†’ low=5
Step 2: low=5, high=9, mid=7 â†’ arr[7]=56 > 23 â†’ high=6
Step 3: low=5, high=6, mid=5 â†’ arr[5]=23 = 23 â†’ FOUND! index 5

Only 3 steps for 10 elements! (logâ‚‚10 â‰ˆ 3.3)
```

---

## ðŸ“– 29.3 Comparison

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Feature      â”‚ Linear       â”‚ Binary       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Sorted neededâ”‚ âŒ No        â”‚ âœ… Yes!       â”‚
â”‚ Time (worst) â”‚ O(n)         â”‚ O(log n)     â”‚
â”‚ Time (best)  â”‚ O(1)         â”‚ O(1)         â”‚
â”‚ Space        â”‚ O(1)         â”‚ O(1) iter    â”‚
â”‚ 1000 elementsâ”‚ ~1000 checks â”‚ ~10 checks!  â”‚
â”‚ 1M elements  â”‚ ~1M checks   â”‚ ~20 checks!  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ“ 29.5 Summary

- **Linear search:** O(n), unsorted/sorted à¦¦à§à¦Ÿà§‹à¦¤à§‡à¦‡ à¦•à¦¾à¦œ à¦•à¦°à§‡à¥¤ Simple but slow for large data

- **Binary search:** O(log n), **sorted array mandatory!** à¦ªà§à¦°à¦¤à¦¿ step à¦ search space **à¦…à¦°à§à¦§à§‡à¦•** à¦¹à¦¯à¦¼à¥¤ 1M elements â†’ à¦®à¦¾à¦¤à§à¦° ~20 comparisons!

- **mid calculation:** `mid = low + (high-low)/2` à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§à¦¨ â€” `(low+high)/2` **overflow** à¦¹à¦¤à§‡ à¦ªà¦¾à¦°à§‡!

- Binary search **iterative** version preferred â€” recursive à¦ O(log n) stack space à¦²à¦¾à¦—à§‡

---
---

# Topic 30: Bubble Sort, Selection Sort, Insertion Sort

<div align="center">

*"Sorting = data à¦¸à¦¾à¦œà¦¾à¦¨à§‹ â€” exam à¦ algorithm, complexity, à¦“ trace à¦œà¦¿à¦œà§à¦žà§‡à¦¸ à¦•à¦°à¦¾ à¦¹à¦¯à¦¼"*

</div>

---

## ðŸ’» 30.1 Bubble Sort â€” O(nÂ²)

```c
/* â•â•â•â•â•â• Adjacent elements compare & swap â•â•â•â•â•â• */
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {  /* âš¡ n-i-1: already sorted! */
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;   /* âš¡ early exit: already sorted! */
    }
}

/* Pass 1: largest element â†’ end
   Pass 2: 2nd largest â†’ 2nd last
   ...continues until sorted */
```

```
Trace: [64, 34, 25, 12, 22]
Pass 1: [34,25,12,22,64]  â† 64 bubbled to end
Pass 2: [25,12,22,34,64]  â† 34 in place
Pass 3: [12,22,25,34,64]  â† sorted!
(early exit â€” no swaps needed in pass 4)
```

---

## ðŸ’» 30.2 Selection Sort â€” O(nÂ²)

```c
/* â•â•â•â•â•â• Find min, swap to front â•â•â•â•â•â• */
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

/* Pass 1: find min â†’ swap to index 0
   Pass 2: find min in remaining â†’ swap to index 1
   ...continues */
```

---

## ðŸ’» 30.3 Insertion Sort â€” O(nÂ²)

```c
/* â•â•â•â•â•â• Insert each element into sorted portion â•â•â•â•â•â• */
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

/* âš¡ Best for: nearly sorted data â†’ O(n) best case!
   âš¡ Stable sort (preserves equal elements' order)
   âš¡ Online sort (can sort as data arrives) */
```

---

## ðŸ“– 30.4 Comparison Table

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Algorithm    â”‚ Best     â”‚ Average  â”‚ Worst    â”‚ Stable â”‚ Space  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Bubble       â”‚ O(n)     â”‚ O(nÂ²)   â”‚ O(nÂ²)   â”‚ âœ… Yes  â”‚ O(1)   â”‚
â”‚ Selection    â”‚ O(nÂ²)    â”‚ O(nÂ²)   â”‚ O(nÂ²)   â”‚ âŒ No   â”‚ O(1)   â”‚
â”‚ Insertion    â”‚ O(n) âš¡  â”‚ O(nÂ²)   â”‚ O(nÂ²)   â”‚ âœ… Yes  â”‚ O(1)   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”˜

âš¡ Insertion sort best case O(n) â€” nearly sorted data à¦¤à§‡ fastest!
âš¡ Selection sort â€” minimum number of SWAPS (useful when swap costly)
âš¡ Bubble sort â€” simplest to understand, worst practical performance
```

---

## ðŸ“ 30.6 Summary

- **Bubble sort:** adjacent elements compare à¦“ swap à¦•à¦°à§‡à¥¤ à¦¬à¦¡à¦¼ element à¦§à§€à¦°à§‡ à¦§à§€à¦°à§‡ "bubble up"à¥¤ `swapped` flag à¦¦à¦¿à¦²à§‡ best case **O(n)** (already sorted detection)à¥¤ Simplest but slowest practically

- **Selection sort:** à¦ªà§à¦°à¦¤à¦¿ pass à¦ **minimum** element à¦–à§à¦à¦œà§‡ front à¦ swap à¦•à¦°à§‡à¥¤ Swap count **minimum** (per pass max 1)à¥¤ Swap costly à¦¹à¦²à§‡ best choiceà¥¤ **Not stable!**

- **Insertion sort:** à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ element à¦•à§‡ sorted portion à¦ correct position à¦ **insert** à¦•à¦°à§‡à¥¤ **Nearly sorted data** à¦¤à§‡ **O(n)** â€” best among three! **Stable à¦“ online** (streaming data sort possible)

- à¦¤à¦¿à¦¨à¦Ÿà¦¿à¦‡ **O(nÂ²)** average/worst, **O(1)** space (in-place)à¥¤ à¦¬à¦¡à¦¼ data (n > 10000) à¦ **merge sort** à¦¬à¦¾ **quick sort** (O(n log n)) à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§à¦¨

- **Stable sort** = equal value elements à¦à¦° original **relative order preserve** à¦•à¦°à§‡à¥¤ Bubble âœ…, Insertion âœ…, Selection âŒ

---
---

---

## ðŸ”— Navigation

- ðŸ  Back to [C Programming â€” Master Index](00-master-index.md)
- â¬…ï¸ Previous: [Chapter 06 â€” Structures, Unions & File I/O](06-structures-unions.md)
- âž¡ï¸ Next: [Chapter 08 â€” Data Structures & Advanced](08-data-structures-advanced.md)
