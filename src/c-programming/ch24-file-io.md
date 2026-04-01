# Topic 24: File Operations

<div align="center">

*"File I/O = disk এ data permanently store ও retrieve করা"*

</div>

---

## 📖 24.1 ধারণা (Concept)

```
File Operations Flow:
━━━━━━━━━━━━━━━━━━━━
1. fopen()   → file open (get FILE pointer)
2. read/write → fgetc, fgets, fscanf, fprintf, fread, fwrite
3. fclose()  → file close (flush buffer, release resources)

File Modes:
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

---

## 💻 24.2 Text File — Write & Read

```c
#include <stdio.h>

int main() {
    /* ══════ Write to file ══════ */
    FILE *fp = fopen("data.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    fprintf(fp, "Name: Rahim\n");
    fprintf(fp, "Age: %d\n", 25);
    fprintf(fp, "GPA: %.2f\n", 3.85);
    fputs("End of data\n", fp);
    fclose(fp);

    /* ══════ Read from file ══════ */
    fp = fopen("data.txt", "r");
    if (fp == NULL) { printf("Error!\n"); return 1; }

    char line[100];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);

    /* ══════ Character by character ══════ */
    fp = fopen("data.txt", "r");
    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }
    fclose(fp);

    return 0;
}
```

---

## 💻 24.3 Structured Data — fscanf & fprintf

```c
#include <stdio.h>

typedef struct {
    char name[50];
    int id;
    float gpa;
} Student;

int main() {
    /* ══════ Write structured data ══════ */
    Student students[] = {
        {"Rahim", 101, 3.75}, {"Fatema", 102, 3.92}, {"Karim", 103, 3.60}
    };
    int n = 3;

    FILE *fp = fopen("students.txt", "w");
    for (int i = 0; i < n; i++)
        fprintf(fp, "%s %d %.2f\n", students[i].name, students[i].id, students[i].gpa);
    fclose(fp);

    /* ══════ Read structured data ══════ */
    fp = fopen("students.txt", "r");
    Student s;
    printf("%-15s %5s %6s\n", "Name", "ID", "GPA");
    while (fscanf(fp, "%s %d %f", s.name, &s.id, &s.gpa) == 3) {
        printf("%-15s %5d %6.2f\n", s.name, s.id, s.gpa);
    }
    fclose(fp);

    return 0;
}
```

---

## 💻 24.4 Binary File — fwrite & fread

```c
#include <stdio.h>

typedef struct { char name[30]; int age; } Person;

int main() {
    /* ══════ Write binary ══════ */
    Person people[] = {{"Alice", 25}, {"Bob", 30}, {"Charlie", 28}};
    FILE *fp = fopen("data.bin", "wb");
    fwrite(people, sizeof(Person), 3, fp);
    fclose(fp);

    /* ══════ Read binary ══════ */
    Person buffer[3];
    fp = fopen("data.bin", "rb");
    fread(buffer, sizeof(Person), 3, fp);
    fclose(fp);

    for (int i = 0; i < 3; i++)
        printf("%s — %d\n", buffer[i].name, buffer[i].age);

    return 0;
}
```

```
Text vs Binary File:
━━━━━━━━━━━━━━━━━━━
Text:   Human readable, larger size, portable
        fprintf/fscanf/fgets/fputs
        Stores: "25" = 2 bytes ('2','5')

Binary: Machine readable, compact, fast
        fwrite/fread
        Stores: 25 = 4 bytes (int binary)
```

---

## 💻 24.5 File Position — fseek, ftell, rewind

```c
FILE *fp = fopen("data.bin", "rb");

ftell(fp);                    /* current position (bytes from start) */
fseek(fp, 0, SEEK_END);      /* go to end */
long size = ftell(fp);        /* file size in bytes! */
rewind(fp);                   /* go back to beginning */
fseek(fp, sizeof(Person), SEEK_SET);  /* skip first record */

/* SEEK_SET = from beginning */
/* SEEK_CUR = from current position */
/* SEEK_END = from end */
```

---

## ❓ 24.6 MCQ Problems

---

**MCQ 1:** `fopen("test.txt", "w")` — file exist করলে কী হবে?

| Option | Answer |
|--------|--------|
| (a) Append | |
| (b) Error | |
| (c) **Content deleted (truncated)** | ✅ |
| (d) No change | |

> "w" = write mode → existing content **completely erased!** ⚠️ Use "a" for append

---

**MCQ 2:** fopen fail করলে কী return করে?

| Option | Answer |
|--------|--------|
| (a) 0 | |
| (b) -1 | |
| (c) **NULL** | ✅ |
| (d) EOF | |

---

**MCQ 3:** `fgets` ও `fscanf` এর পার্থক্য কী?

| Option | Answer |
|--------|--------|
| (a) একই | |
| (b) **fgets পুরো line পড়ে, fscanf formatted পড়ে** | ✅ |
| (c) fscanf বেশি safe | |
| (d) fgets binary পড়ে | |

---

**MCQ 4:** Text ও Binary file এর মূল পার্থক্য?

| Option | Answer |
|--------|--------|
| (a) Speed same | |
| (b) **Binary compact ও fast, Text readable** | ✅ |
| (c) Binary portable | |
| (d) পার্থক্য নেই | |

---

## 📝 24.7 Summary

- **File operation flow:** `fopen()` → read/write → `fclose()`। fopen fail → **NULL** return → always check!

- **"w" mode = existing content DELETED!** Append চাইলে **"a"** ব্যবহার করুন। "r" mode এ file না থাকলে **error**

- **Text file:** `fprintf`/`fscanf`/`fgets`/`fputs` — human readable, portable। **Binary file:** `fwrite`/`fread` — compact, fast, struct directly save/load

- **fgets** পুরো line পড়ে ('\n' সহ), **fscanf** formatted data পড়ে (whitespace delimiter)

- **fseek/ftell/rewind:** file এর ভেতরে position control। `fseek(fp, 0, SEEK_END); ftell(fp)` = **file size!**

- **Binary struct save:** `fwrite(&s, sizeof(Student), 1, fp)` — entire struct একবারে disk এ!

---
---
