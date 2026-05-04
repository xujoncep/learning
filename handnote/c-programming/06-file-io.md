# Chapter 06 — File I/O, CLI & Preprocessor — C Programming 💻
> Disk Operations, Command Line Arguments, Macros এবং Advanced Preprocessor.
---
# Topic 22: File Handling (Text & Binary)
### Problem 01: Copy one file to another in C
**পরীক্ষা:** ব্যাংক আইটি (পুবালী ব্যাংক ২০২৩)
```c
#include `stdio.h`
int main() {
    FILE *src = fopen("in.txt", "r"), *dst = fopen("out.txt", "w");
    char ch;
    if(src == NULL || dst == NULL) return 1;
    while((ch = fgetc(src)) != EOF) fputc(ch, dst);
    fclose(src); fclose(dst);
    return 0;
}
```
### Problem 02: Command Line Arguments (Sum of two numbers)
**বিবরণ:** argc এবং argv ব্যবহার করে ইনপুট নেওয়া।
```c
#include `stdio.h`
#include `stdlib.h`
int main(int argc, char *argv[]) {
    if(argc < 3) {
        printf("Usage: %s num1 num2\n", argv[0]);
        return 1;
    }
    printf("Sum: %d", atoi(argv[1]) + atoi(argv[2]));
    return 0;
}
```
---
# Topic 24: Advanced File Functions (Positioning)
<div align="center">
*"Random Access = ফাইলের যেকোনো জায়গায় সরাসরি লাফ দেওয়া"*
</div>
---
## 📖 24.1 fseek(), ftell(), and rewind()
| Function | Signature | Purpose |
|----------|-----------|---------|
| fseek() | int fseek(FILE *stream, long offset, int whence) | নির্দিষ্ট পজিশনে কার্সর মুভ করে। |
| ftell() | long ftell(FILE *stream) | বর্তমান পয়েন্টার পজিশন নম্বর দেয়। |
| rewind() | void rewind(FILE *stream) | পয়েন্টারকে একবারে শুরুতে নিয়ে যায়। |

**Whence Parameters:**
- SEEK_SET: ফাইলের শুরু থেকে।
- SEEK_CUR: বর্তমান পজিশন থেকে।
- SEEK_END: ফাইলের শেষ থেকে।

### 💻 Code: Find File Size
```c
FILE *fp = fopen("data.txt", "r");
if(fp == NULL) return 1;
fseek(fp, 0, SEEK_END);          // শেষে যাও
long size = ftell(fp);           // পজিশনই হলো সাইজ
printf("File Size: %ld bytes", size);
fclose(fp);
```
---
# 🕵️‍♂️ Dynamic Memory Internals (Deep)
### Memory Leak vs Dangling Pointer
- **Memory Leak:** malloc করেছেন কিন্তু free করেননি। মেমোরি ব্লকটি হারিয়ে গেছে।
- **Dangling Pointer:** free করেছেন কিন্তু পয়েন্টারটিকে NULL করেননি। সেটি এখনও একটি মৃত এড্রেসকে পয়েন্ট করছে।
** ডিবাগিং টিপ:** লিনাক্সে মেমোরি লিগ চেক করার জন্য **Valgrind** টুল ব্যবহার করা হয়। (Command: valgrind --leak-check=full ./a.out)
---
