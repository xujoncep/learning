# Chapter 06 — Structures, Unions & File I/O — C Programming 💻
`> Structure, union, enum, ttypedef, sizeof, file operations।
`---
# LEVEL 6: STRUCTURES, UNIONS & MORE
`*User-defined types, File I/O, Number Theory — real-world problem solving*
`---
---
`# Topic 21: Structure
`<div align="center">
`*"Structure = বিভিন্ন type এর data একটি নামে group করা — custom data type"*
`</div>
`---
`## 📖 21.1 ধারণা (Concept)
````
struct Student {
    char name[50];     /* string */
    int id;            /* integer */
    float gpa;         /* float */
};
`Memory:
┌──────────────────────────────────────────┐
│  name (50 bytes)  │ id (4B) │ gpa (4B)   │  + padding!
└──────────────────────────────────────────┘
`⚡ struct groups DIFFERENT types together
⚡ Array groups SAME type together
```
`---
`## 💻 21.2 Declaration, Initialization, Access
````c
#include `stdio.h`
#include `string.h`
`/* ══════ ttypedef = cleaner (no "struct" keyword needed) ══════ */
ttypedef struct \{
    char name[50];
    int id;
    float gpa;
\} Student;
`int main() {
    /* Initializer list */
    Student s1 = {"Rahim", 101, 3.75};
`    /* Designated initializer (C99) — any order! */
    Student s2 = \{.gpa = 3.92, .name = "Fatema", .id = 102\};
`    /* Member by member */
    Student s3;
    strcpy(s3.name, "Karim");   /* ⚠️ string = strcpy, not = */
    s3.id = 103;
    s3.gpa = 3.60;
`    /* Access: dot (.) for variable, arrow (->) for pointer */
    printf("%s — GPA: %.2f\n", s1.name, s1.gpa);
`    Student *p = &s1;
    printf("%s — ID: %d\n", p->name, p->id);
    /* p->member = (*p).member */
`    return 0;
\}
```
`---
`## 💻 21.3 struct in Function & Array of Structures
````c
/* ══════ Pass by pointer = cheap & can modify ══════ */
void updateGPA(Student *s, float newGPA) \{
    s->gpa = newGPA;   /* modifies original! */
\}
`/* ══════ Pass by const pointer = cheap & safe ══════ */
void printStudent(const Student *s) {
    printf("[%d] %s — %.2f\n", s->id, s->name, s->gpa);
}
`int main() {
    /* ══════ Array of Structures ══════ */
    Student class[] = \{
        \{"Rahim", 101, 3.75\},
        \{"Fatema", 102, 3.92\},
        \{"Karim", 103, 3.60\}
    \};
    int n = sizeof(class) / sizeof(class[0]);
`    /* Sort by GPA (bubble sort) */
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (class[j].gpa < class[j+1].gpa) {
                Student temp = class[j];    /* ⚡ struct copy! */
                class[j] = class[j+1];
                class[j+1] = temp;
            }
`    for (int i = 0; i < n; i++)
        printStudent(&class[i]);
\}
```
`---
`## 💻 21.4 Nested Structure & Self-Referential
````c
/* ══════ Nested struct ══════ */
ttypedef struct \{ int day, month, year; \} Date;
`ttypedef struct {
    char name[50];
    Date dob;           /* nested! */
    Date admission;
} Student;
`/* Access: s.dob.year, p->dob.month */
`/* ══════ Self-referential (Linked List node) ══════ */
ttypedef struct Node {
    int data;
    struct Node *next;  /* ⚠️ must use "struct Node", not just "Node" */
} Node;                 /* ttypedef complete হওয়ার আগে body তে Node use করা যায় না */
```
`---
`## 💻 21.5 Structure Padding — sizeof Trap!
````c
struct A { char c; int i; char d; };
/* ⚠️ sizeof ≠ 1+4+1 = 6! */
/* Actual: 1 + 3(pad) + 4 + 1 + 3(pad) = 12! */
`struct B { int i; char c; char d; };
/* Better: 4 + 1 + 1 + 2(pad) = 8 (less padding!) */
`/* ⚡ Rule: order members LARGEST → SMALLEST to minimize padding */
/* ⚡ Struct total size = multiple of LARGEST member alignment */
```
````
Alignment Rules:
  char  → 1-byte aligned
  short → 2-byte aligned
  int   → 4-byte aligned
  double→ 8-byte aligned
`struct { char c; double d; char e; }
→ 1 + 7(pad) + 8 + 1 + 7(pad) = 24 bytes!
`struct { double d; char c; char e; }
→ 8 + 1 + 1 + 6(pad) = 16 bytes (better!)
```
`---
`## ❓ 21.6 MCQ Problems
`---
`**MCQ 1:** `struct S s1={10,20}; struct S s2=s1; s2.a=30;` — s1.a?
`| Option | Answer |
|--------|--------|
| (a) 30 | |
| (b) **10** | ✅ |
| (c) Error | |
| (d) 20 | |
`> `s2=s1` = **value copy**। s2 change → s1 **unchanged!**
`---
`**MCQ 2:** Struct comparison `s1 == s2` — কী হবে?
`| Option | Answer |
|--------|--------|
| (a) Works | |
| (b) **Compilation Error** | ✅ |
| (c) Runtime Error | |
| (d) Compares content | |
`> Struct `==` compare **illegal!** Member by member compare করতে হয়
`---
`**MCQ 3:** `struct { char c; int i; }` — sizeof? (4-byte alignment)
`| Option | Answer |
|--------|--------|
| (a) 5 | |
| (b) 6 | |
| (c) **8** | ✅ |
| (d) 4 | |
`> char(1) + pad(3) + int(4) = **8**
`---
`**MCQ 4:** `ptr->name` = ?
`| Option | Answer |
|--------|--------|
| (a) *ptr.name | |
| (b) **(*ptr).name** | ✅ |
| (c) ptr.name | |
| (d) &ptr.name | |
`> `ptr->x` = `(*ptr).x`। ⚠️ `*ptr.x` = `*(ptr.x)` — সম্পূর্ণ ভিন্ন!
`---
`**MCQ 5:** `struct{char c; double d; char e;}` — sizeof?
`| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 16 | |
| (c) **24** | ✅ |
| (d) 17 | |
`> 1+7(pad)+8+1+7(pad) = **24**। Struct size = multiple of largest (8)
`---
`## 📝 21.7 Summary
`- **struct** = different types একটি নামে group করে। **ttypedef** দিলে `struct` keyword বারবার লিখতে হয় না।
`- **Access:** variable → **dot (`.`)**, pointer → **arrow (`->`)**, `p->x` = `(*p).x`
`- **Assignment** (`s2 = s1`) **allowed** (shallow copy)। **Comparison** (`==`) **illegal** — member by member compare
`- **sizeof(struct) ≠ sum of members!** **Padding** alignment এর জন্য যোগ হয়। Minimize: members **largest → smallest** order
`- **Self-referential:** `struct Node { struct Node *next; }` — **`struct Node`** tag body তে ব্যবহার করতে হয় (ttypedef complete হওয়ার আগে)
`- Function এ **const pointer pass** (`const Student *s`) = cheap (4/8 bytes) ও safe (modify prevent)
`---
---
`# Topic 22: Union & Enum
`<div align="center">
`*"Union = shared memory, Enum = named constants — দুটোই exam favourite"*
`</div>
`---
`## 📖 22.1 Union — All Members Share Same Memory
````
struct Data \{ int i; float f; char c; \};  → sizeof = 12 (separate)
union  Data \{ int i; float f; char c; \};  → sizeof = 4  (shared!)
`union Memory:
┌──────────────┐
│ i / f / c    │  ← ALL OVERLAP! Same memory!
│   4 bytes    │
└──────────────┘
sizeof(union) = sizeof(LARGEST member)
⚠️ Only LAST written member is valid!
```
````c
union Data d;
d.i = 42;    printf("%d\n", d.i);  /* 42 ✅ */
d.f = 3.14;  printf("%d\n", d.i);  /* ⚠️ GARBAGE! f overwrote i */
```
`---
`## 💻 22.2 Tagged Union — Practical Pattern
````c
ttypedef enum { TYPE_INT, TYPE_FLOAT, TYPE_STR } DataType;
`ttypedef struct {
    DataType type;       /* "tag" — কোন member active? */
    union \{
        int intVal;
        float floatVal;
        char strVal[50];
    \};  /* anonymous union (C11) */
\} Variant;
`void print(const Variant *v) {
    switch (v->type) {
        case TYPE_INT:   printf("%d\n", v->intVal);     break;
        case TYPE_FLOAT: printf("%.2f\n", v->floatVal); break;
        case TYPE_STR:   printf("%s\n", v->strVal);     break;
    }
}
/* ⚡ This is how dynamic languages (Python, JS) store variables! */
```
`---
`## 📖 22.3 Enum — Named Integer Constants
````c
/* ══════ Basic enum ══════ */
enum Direction { NORTH, SOUTH, EAST, WEST };
/* NORTH=0, SOUTH=1, EAST=2, WEST=3 (auto from 0) */
`/* ══════ Custom values ══════ */
enum Month \{ JAN = 1, FEB, MAR, APR, MAY, JUN,
             JUL, AUG, SEP, OCT, NOV, DEC \};
/* JAN=1, FEB=2, ... DEC=12 (auto-increment after custom) */
`/* ══════ Bit flags (powers of 2) ══════ */
ttypedef enum {
    PERM_READ    = 1,    /* 001 */
    PERM_WRITE   = 2,    /* 010 */
    PERM_EXECUTE = 4     /* 100 */
} Permission;
`int perm = PERM_READ | PERM_WRITE;    /* combine: 011 */
if (perm & PERM_READ) \{ /* check */ \}
perm &= ~PERM_WRITE;                  /* remove: 001 */
```
````
Enum Rules:
━━━━━━━━━━━
• sizeof(enum) = sizeof(int) = 4 (always in C!)
• ⚠️ No type safety! enum var = 999; → compiles!
• Duplicate values allowed: A=1, B=1 → OK!
• Values global scope → name collision possible!
• Auto-increment after custom value: A=5, B, C → B=6, C=7
```
`---
`## ❓ 22.4 MCQ Problems
`---
`**MCQ 1:** `union U{int i;float f;char c;}; sizeof(union U)` = ?
`| Option | Answer |
|--------|--------|
| (a) 9 | |
| (b) **4** | ✅ |
| (c) 1 | |
| (d) 12 | |
`> sizeof(union) = **largest member** = int/float = **4**
`---
`**MCQ 2:** `union U u; u.i=10; u.f=3.14; printf("%d",u.i);` — output?
`| Option | Answer |
|--------|--------|
| (a) 10 | |
| (b) 3 | |
| (c) **Garbage** | ✅ |
| (d) Error | |
`> u.f overwrote u.i! Only **last written** member valid
`---
`**MCQ 3:** `enum E{A=5, B, C, D=20, E_val};` — C ও E_val = ?
`| Option | Answer |
|--------|--------|
| (a) C=6, E_val=20 | |
| (b) **C=7, E_val=21** | ✅ |
| (c) C=2, E_val=4 | |
| (d) C=7, E_val=22 | |
`> A=5, B=**6**, C=**7** (auto). D=20, E_val=**21** (auto after D)
`---
`**MCQ 4:** `union U{int i; char c;}; u.i=65; printf("%c",u.c);`
`| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **A** | ✅ |
| (c) Garbage | |
| (d) Error | |
`> Same memory! i=65 → c reads first byte = 65 = **'A'** (little-endian)
`---
`**MCQ 5:** `union{char c; int arr[10]; double d;}` — sizeof?
`| Option | Answer |
|--------|--------|
| (a) 8 | |
| (b) 1 | |
| (c) **40** | ✅ |
| (d) 49 | |
`> Largest member = int arr[10] = **40** bytes
`---
`## 📝 22.5 Summary
`- **Union:** সব member **একই memory** share → একই সময়ে **শুধু একটি valid**। sizeof = **largest member**
`- **Tagged union** (enum + union): কোন member active তা **tag দিয়ে track** — JSON parser, interpreter এ ব্যবহৃত
`- **Enum:** named **integer constants** — readability বাড়ায়। Default 0 থেকে, auto-increment। sizeof = **sizeof(int) = 4**
`- **Enum bit flags:** values = powers of 2 → combine `|`, check `&`, remove `&= ~flag`, toggle `^=`
`- Enum **no type safety** — `enum Color c = 999;` compiles! Duplicate values **allowed**
`---
---
`# Topic 23: ttypedef & sizeof Operator
`<div align="center">
`*"ttypedef = type এর alias, sizeof = type/variable এর byte count"*
`</div>
`---
`## 📖 23.1 ttypedef — Type Alias
````c
/* ══════ Basic ttypedef ══════ */
ttypedef unsigned long ulong;
ttypedef char* String;
`ulong count = 1000000;
String name = "Hello";
`/* ══════ struct ttypedef ══════ */
ttypedef struct \{
    int x, y;
\} Point;
`Point p = {10, 20};   /* no "struct" keyword needed! */
`/* ══════ Function pointer ttypedef ══════ */
ttypedef int (*MathFunc)(int, int);
`int add(int a, int b) { return a + b; }
MathFunc fp = add;     /* clean! vs: int (*fp)(int,int) = add; */
`/* ══════ Array ttypedef ══════ */
ttypedef int IntArray[10];
IntArray arr;           /* same as: int arr[10]; */
```
````
ttypedef vs #define:
━━━━━━━━━━━━━━━━━━
ttypedef char* String;     → String a, b;  → a=char*, b=char* ✅
#define String char*      → String a, b;  → a=char*, b=char ⚠️
`ttypedef = compiler-processed (type-safe, scoped)
#define = preprocessor text replacement (no type check!)
```
`---
`## 📖 23.2 sizeof Operator
````c
/* sizeof = compile-time operator (NOT function!) */
/* Returns size in BYTES */
`/* ══════ Basic types ══════ */
sizeof(char)        /* 1 (always!) */
sizeof(int)         /* 4 */
sizeof(float)       /* 4 */
sizeof(double)      /* 8 */
sizeof(int*)        /* 4/8 (pointer size = system dependent) */
`/* ══════ Arrays ══════ */
int arr[10];
sizeof(arr)              /* 40 (total bytes!) */
sizeof(arr) / sizeof(arr[0])  /* 10 (element count formula!) */
`/* ⚠️ In function: array decays to pointer! */
void func(int arr[]) \{
    sizeof(arr);         /* 4/8 (POINTER size, NOT 40!) */
\}
`/* ══════ Tricky cases ══════ */
sizeof('A')              /* 4 in C! (char constant = int) */
                         /* 1 in C++! */
sizeof(3.14)             /* 8 (double!) */
sizeof(3.14f)            /* 4 (float) */
sizeof("Hello")          /* 6 (5 chars + '\0') */
`/* ══════ Expression (NOT evaluated!) ══════ */
int x = 5;
sizeof(x++)              /* 4 — x is STILL 5! */
/* sizeof does NOT evaluate expression, just checks type! */
```
`---
`## ❓ 23.3 MCQ Problems
`---
`**MCQ 1:** `ttypedef char* String; String a, b;` — b এর type?
`| Option | Answer |
|--------|--------|
| (a) char | |
| (b) **char*** | ✅ |
| (c) String | |
| (d) Error | |
`> ttypedef = **true type alias**। a ও b দুটোই **char***
`---
`**MCQ 2:** `#define PTR char*; PTR a, b;` — b এর type?
`| Option | Answer |
|--------|--------|
| (a) char* | |
| (b) **char** | ✅ |
| (c) PTR | |
| (d) Error | |
`> #define text replace: `char* a, b;` → a=char*, **b=char!** ⚠️ ttypedef এর সাথে পার্থক্য!
`---
`**MCQ 3:** `int x=5; sizeof(x++);` — x এর value পরে?
`| Option | Answer |
|--------|--------|
| (a) 6 | |
| (b) **5** | ✅ |
| (c) 4 | |
| (d) Error | |
`> sizeof **expression evaluate করে না!** শুধু type check → x **unchanged** = 5
`---
`**MCQ 4:** `sizeof("Hello")` = ?
`| Option | Answer |
|--------|--------|
| (a) 5 | |
| (b) **6** | ✅ |
| (c) 8 | |
| (d) 4/8 | |
`> String literal = char array! 5 chars + '\0' = **6** bytes
`---
`**MCQ 5:** `sizeof('A')` C তে কত?
`| Option | Answer |
|--------|--------|
| (a) 1 | |
| (b) 2 | |
| (c) **4** | ✅ |
| (d) 8 | |
`> C তে character constant = **int**! sizeof = 4। (C++ এ 1)
`---
`## 📝 23.4 Summary
`- **ttypedef** = type এর **alias** তৈরি করে। struct, function pointer, complex type কে **readable** করে। **Compiler-processed**, type-safe, scoped
`- **`ttypedef char* String`** vs **`#define String char*`**: ttypedef → `String a, b;` = **both char***। #define → `char* a, b;` = a=char*, **b=char!** এই পার্থক্য exam এ আসে
`- **sizeof** = compile-time operator, **bytes** return করে। **Expression evaluate করে না!** `sizeof(x++)` → x **unchanged**
`- **sizeof('A')** = **4** in C (char constant = int), **1** in C++। `sizeof(3.14)` = **8** (double)
`- **Array sizeof:** main এ = total bytes; function এ = **pointer size!** Element count = `sizeof(arr)/sizeof(arr[0])`
`---
---
`# Topic 24: File Operations
`<div align="center">
`*"File I/O = disk এ data permanently store ও retrieve করা"*
`</div>
`---
`## 📖 24.1 ধারণা (Concept)
````
File Operations Flow:
━━━━━━━━━━━━━━━━━━━━
1. fopen()   → file open (get FILE pointer)
2. read/write → fgetc, fgets, fscanf, fprintf, fread, fwrite
3. fclose()  → file close (flush buffer, release resources)
`File Modes:
┌──────┬────────────────────────────────────────┐
│ Mode │ Description                            │
├──────┼────────────────────────────────────────┤
│ "r"  │ Read only (file must exist)            │
│ "w"  │ Write only (creates/truncates!)        │
│ "a"  │ Append (creates if not exist)          │
│ "r+" │ Read+Write (file must exist)           │
│ "w+" │ Read+Write (creates/truncates!)        │
│ "a+" │ Read+Append                            │
│ "rb" │ Read binary                            │
│ "wb" │ Write binary                           │
└──────┴────────────────────────────────────────┘
⚠️ "w" mode = existing content DELETED!
```
`---
`## 💻 24.2 Text File — Write & Read
````c
#include `stdio.h`
`int main() {
    /* ══════ Write to file ══════ */
    FILE *fp = fopen("data.txt", "w");
    if (fp == NULL) \{
        printf("Error opening file!\n");
        return 1;
    \}
`    fprintf(fp, "Name: Rahim\n");
    fprintf(fp, "Age: %d\n", 25);
    fprintf(fp, "GPA: %.2f\n", 3.85);
    fputs("End of data\n", fp);
    fclose(fp);
`    /* ══════ Read from file ══════ */
    fp = fopen("data.txt", "r");
    if (fp == NULL) \{ printf("Error!\n"); return 1; \}
`    char line[100];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);
`    /* ══════ Character by character ══════ */
    fp = fopen("data.txt", "r");
    int ch;
    while ((ch = fgetc(fp)) != EOF) \{
        putchar(ch);
    \}
    fclose(fp);
`    return 0;
}
```
`---
`## 💻 24.3 Structured Data — fscanf & fprintf
````c
#include `stdio.h`
`ttypedef struct {
    char name[50];
    int id;
    float gpa;
\} Student;
`int main() {
    /* ══════ Write structured data ══════ */
    Student students[] = {
        {"Rahim", 101, 3.75}, {"Fatema", 102, 3.92}, {"Karim", 103, 3.60}
    };
    int n = 3;
`    FILE *fp = fopen("students.txt", "w");
    for (int i = 0; i &lt; n; i++)
        fprintf(fp, "%s %d %.2f\n", students[i].name, students[i].id, students[i].gpa);
    fclose(fp);
`    /* ══════ Read structured data ══════ */
    fp = fopen("students.txt", "r");
    Student s;
    printf("%-15s %5s %6s\n", "Name", "ID", "GPA");
    while (fscanf(fp, "%s %d %f", s.name, &s.id, &s.gpa) == 3) {
        printf("%-15s %5d %6.2f\n", s.name, s.id, s.gpa);
    }
    fclose(fp);
`    return 0;
\}
```
`---
`## 💻 24.4 Binary File — fwrite & fread
````c
#include `stdio.h`
`ttypedef struct { char name[30]; int age; } Person;
`int main() {
    /* ══════ Write binary ══════ */
    Person people[] = \{\{"Alice", 25\}, \{"Bob", 30\}, \{"Charlie", 28\}\};
    FILE *fp = fopen("data.bin", "wb");
    fwrite(people, sizeof(Person), 3, fp);
    fclose(fp);
`    /* ══════ Read binary ══════ */
    Person buffer[3];
    fp = fopen("data.bin", "rb");
    fread(buffer, sizeof(Person), 3, fp);
    fclose(fp);
`    for (int i = 0; i < 3; i++)
        printf("%s — %d\n", buffer[i].name, buffer[i].age);
`    return 0;
}
```
````
Text vs Binary File:
━━━━━━━━━━━━━━━━━━━
Text:   Human readable, larger size, portable
        fprintf/fscanf/fgets/fputs
        Stores: "25" = 2 bytes ('2','5')
`Binary: Machine readable, compact, fast
        fwrite/fread
        Stores: 25 = 4 bytes (int binary)
```
`---
`## 💻 24.5 File Position — fseek, ftell, rewind
````c
FILE *fp = fopen("data.bin", "rb");
`ftell(fp);                    /* current position (bytes from start) */
fseek(fp, 0, SEEK_END);      /* go to end */
long size = ftell(fp);        /* file size in bytes! */
rewind(fp);                   /* go back to beginning */
fseek(fp, sizeof(Person), SEEK_SET);  /* skip first record */
`/* SEEK_SET = from beginning */
/* SEEK_CUR = from current position */
/* SEEK_END = from end */
```
`---
`## ❓ 24.6 MCQ Problems
`---
`**MCQ 1:** `fopen("test.txt", "w")` — file exist করলে কী হবে?
`| Option | Answer |
|--------|--------|
| (a) Append | |
| (b) Error | |
| (c) **Content deleted (truncated)** | ✅ |
| (d) No change | |
`> "w" = write mode → existing content **completely erased!** ⚠️ Use "a" for append
`---
`**MCQ 2:** fopen fail করলে কী return করে?
`| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) -1 | |
| (c) **NULL** | ✅ |
| (d) EOF | |
`---
`**MCQ 3:** `fgets` ও `fscanf` এর পার্থক্য কী?
`| Option | Answer |
|--------|--------|
| (a) একই | |
| (b) **fgets পুরো line পড়ে, fscanf formatted পড়ে** | ✅ |
| (c) fscanf বেশি safe | |
| (d) fgets binary পড়ে | |
`---
`**MCQ 4:** Text ও Binary file এর মূল পার্থক্য?
`| Option | Answer |
|--------|--------|
| (a) Speed same | |
| (b) **Binary compact ও fast, Text readable** | ✅ |
| (c) Binary portable | |
| (d) পার্থক্য নেই | |
`---
`## 📝 24.7 Summary
`- **File operation flow:** `fopen()` → read/write → `fclose()`। fopen fail → **NULL** return → always check!
`- **"w" mode = existing content DELETED!** Append চাইলে **"a"** ব্যবহার করুন। "r" mode এ file না থাকলে **error**
`- **Text file:** `fprintf`/`fscanf`/`fgets`/`fputs` — human readable, portable। **Binary file:** `fwrite`/`fread` — compact, fast, struct directly save/load
`- **fgets** পুরো line পড়ে ('\n' সহ), **fscanf** formatted data পড়ে (whitespace delimiter)
`- **fseek/ftell/rewind:** file এর ভেতরে position control। `fseek(fp, 0, SEEK_END); ftell(fp)` = **file size!**
`- **Binary struct save:** `fwrite(&s, sizeof(Student), 1, fp)` — entire struct একবারে disk এ!
`---
---
`# Topic 25: Prime Number, GCD/LCM, Factorial
`<div align="center">
`*"Number theory = সবচেয়ে classic programming topic — প্রতিটি exam এ আসে"*
`</div>
`---
`## 💻 25.1 Prime Number
````c
/* ══════ Basic prime check — O(√n) ══════ */
#include `math.h`
`int isPrime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return 0;
    }
    return 1;
}
`/* ══════ Print primes up to N ══════ */
void printPrimes(int n) \{
    for (int i = 2; i &lt;= n; i++)
        if (isPrime(i))
            printf("%d ", i);
\}
/* 2 3 5 7 11 13 17 19 23 29 ... */
`/* ══════ Count primes up to N ══════ */
int countPrimes(int n) {
    int count = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) count++;
    return count;
}
```
````
Prime Check Optimization:
━━━━━━━━━━━━━━━━━━━━━━━━
Naive:     for(i=2; i<n; i++)        → O(n)
Better:    for(i=2; i<=sqrt(n); i++) → O(√n)
Best:      check 2,3 then i=5,i+=6  → O(√n/3)
`⚡ Why √n? If n = a×b, one of a,b must be ≤ √n
⚡ Why i+=6? All primes > 3 are of form 6k±1
```
`---
`## 💻 25.2 GCD & LCM
````c
/* ══════ GCD — Euclidean Algorithm ══════ */
int gcd(int a, int b) \{
    while (b != 0) \{
        int temp = b;
        b = a % b;
        a = temp;
    \}
    return a;
\}
/* gcd(48, 18): 48%18=12 → 18%12=6 → 12%6=0 → return 6 */
`/* ══════ GCD — Recursive ══════ */
int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}
`/* ══════ LCM using GCD ══════ */
int lcm(int a, int b) \{
    return (a / gcd(a, b)) * b;   /* a/gcd first to avoid overflow! */
\}
/* lcm(12, 8) = (12/4)*8 = 24 */
`/* ⚡ Relationship: a × b = GCD(a,b) × LCM(a,b) */
```
`---
`## 💻 25.3 Factorial
````c
/* ══════ Iterative (better — no stack overflow) ══════ */
long long factorialIter(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++)
        result *= i;
    return result;
}
`/* ══════ Recursive ══════ */
long long factorialRec(int n) \{
    if (n &lt;= 1) return 1;
    return n * factorialRec(n - 1);
\}
`/* ⚠️ Factorial grows FAST! */
/* 10! = 3,628,800 */
/* 13! = 6,227,020,800 (exceeds int range!) */
/* 20! = 2,432,902,008,176,640,000 (needs long long!) */
/* 21! exceeds even long long! */
```
`---
`## 💻 25.4 Related Problems
````c
/* ══════ Perfect Number (sum of divisors = number) ══════ */
int isPerfect(int n) {
    int sum = 1;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0)
            sum += i + (i != n/i ? n/i : 0);
    return sum == n && n != 1;
}
/* 6 = 1+2+3, 28 = 1+2+4+7+14 */
`/* ══════ Prime Factorization ══════ */
void primeFactors(int n) \{
    for (int i = 2; i * i &lt;= n; i++) \{
        while (n % i == 0) \{
            printf("%d ", i);
            n /= i;
        \}
    \}
    if (n > 1) printf("%d", n);
\}
/* 60 → 2 2 3 5 */
`/* ══════ nCr (Combination) ══════ */
long long nCr(int n, int r) {
    if (r > n - r) r = n - r;    /* optimization */
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
```
`---
`## ❓ 25.5 MCQ Problems
`---
`**MCQ 1:** 1 কি prime number?
`| Option | Answer |
|--------|--------|
| (a) হ্যাঁ | |
| (b) **না** | ✅ |
| (c) Depends | |
| (d) 0 ও 1 দুটোই prime | |
`> **1 prime নয়!** Prime definition: exactly **2** distinct divisors (1 ও নিজে)। 1 এর শুধু 1টি divisor
`---
`**MCQ 2:** `gcd(0, 5)` = ?
`| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) **5** | ✅ |
| (c) 1 | |
| (d) Error | |
`> gcd(0, 5): b=5≠0 → gcd(5, 0%5=0) → b=0 → return a=**5**
`---
`**MCQ 3:** `lcm(4, 6)` = ?
`| Option | Answer |
|--------|--------|
| (a) 24 | |
| (b) **12** | ✅ |
| (c) 2 | |
| (d) 10 | |
`> gcd(4,6)=2. lcm = (4/2)*6 = **12**
`---
`**MCQ 4:** 13! int এ store করা যাবে?
`| Option | Answer |
|--------|--------|
| (a) হ্যাঁ | |
| (b) **না (overflow!)** | ✅ |
| (c) Depends | |
| (d) Always works | |
`> 13! = 6,227,020,800 > INT_MAX (2,147,483,647)! **long long** লাগবে
`---
`**MCQ 5:** Prime check এ কেন `i*i <= n` পর্যন্ত check করলেই যথেষ্ট?
`| Option | Answer |
|--------|--------|
| (a) Performance | |
| (b) **n = a×b হলে a বা b অবশ্যই ≤ √n** | ✅ |
| (c) Tradition | |
| (d) কোনো কারণ নেই | |
`> কোনো factor √n এর বেশি হলে অন্যটি অবশ্যই √n এর কম — তাই √n পর্যন্ত check **যথেষ্ট**
`---
`**MCQ 6:** `a × b = gcd(a,b) × lcm(a,b)` — True?
`| Option | Answer |
|--------|--------|
| (a) **True (always!)** | ✅ |
| (b) False | |
| (c) Sometimes | |
| (d) Only for primes | |
`> **Mathematical identity!** সবসময় সত্য। lcm = a*b/gcd = (a/gcd)*b
`---
`## 📝 25.7 Summary
`- **Prime:** exactly 2 divisors (1 ও নিজে)। **1 prime নয়!** Check √n পর্যন্ত — O(√n)। All primes > 3 are **6k±1** form
`- **GCD (Euclidean):** `gcd(a,b) = gcd(b, a%b)`, base: `b==0 → return a`। **O(log(min(a,b)))** — খুবই efficient
`- **LCM:** `lcm(a,b) = (a / gcd(a,b)) * b`। **a/gcd আগে** করুন overflow এড়াতে! **Identity:** `a × b = gcd × lcm`
`- **Factorial:** n! grows **extremely fast**! 13! > INT_MAX → **long long** ব্যবহার করুন। 21! > LLONG_MAX! Iterative version = safe (no stack overflow), recursive = elegant
`- **Perfect number:** divisors এর sum = number itself। 6, 28, 496, 8128...
`- **nCr formula:** Cr = n!/(r!(n-r)!)` — কিন্তু **iterative multiplication/division** ব্যবহার করুন overflow এড়াতে
`---
---
`---
`## 🔗 Navigation
`- 🏠 Back to [C Programming — Master Index](00-master-index.md)
- ⬅️ Previous: [Chapter 05 — Pointers](05-pointers.md)
- ➡️ Next: [Chapter 07 — Math, Search & Sort](07-math-search-sort.md)
`