# Topic 16: String Problems (Advanced)

<div align="center">

*"String manipulation = interview ও exam এর হাতিয়ার"*

</div>

---

## 📖 16.1 Essential String Algorithms

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
/* "madam" → Yes, "hello" → No */
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
/* "listen"/"silent" → Anagram ✅ */
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
/* "Hello World" → "World Hello" */
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
/* "aabcbd" → 'c' */
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
/* "abcde" / "cdeab" → Rotation ✅ */
/* Trick: "abcdeabcde" contains "cdeab"! */
```

---

## ❓ 16.2 MCQ Problems

---

**MCQ 1:** n দৈর্ঘ্যের string এ মোট substring কতটি?

| Option | Answer |
|--------|--------|
| (a) n² | |
| (b) **n(n+1)/2** | ✅ |
| (c) 2ⁿ | |
| (d) n! | |

> Length 1: n, Length 2: n-1, ... Length n: 1 → Total = **n(n+1)/2**

---

**MCQ 2:** `char a[]="Hi"; char b[]="Hi"; a==b` result?

| Option | Answer |
|--------|--------|
| (a) 1 (true) | |
| (b) **0 (false)** | ✅ |
| (c) Error | |
| (d) Depends | |

> `==` compares **addresses**, not content! Different arrays = different addresses = **false!** Use `strcmp(a,b)==0`

---

**MCQ 3:** `"Hello\0World"` — `sizeof` vs `strlen`?

| Option | Answer |
|--------|--------|
| (a) 11, 11 | |
| (b) **12, 5** | ✅ |
| (c) 6, 5 | |
| (d) 12, 12 | |

> sizeof = 12 (all chars + final '\0'). strlen = **5** (stops at first '\0')

---

## 📝 16.3 Summary

- **Frequency array** `int freq[256]` = string problem এর **universal tool** — anagram, duplicate, count সব solve করে।
- **Palindrome**: two-pointer (left, right) approach — O(n)
- **Word reverse**: entire string reverse → each word reverse → O(n)
- **Rotation check**: s1+s1 concatenate → s2 খুঁজুন (strstr) — elegant O(n) trick
- **`==` দিয়ে string compare করবেন না!** Address compare হয়, content নয়। `strcmp()` ব্যবহার করুন।

---
---

<div align="center">


*C এর সবচেয়ে powerful ও সবচেয়ে tricky concept — master করলে C master*

</div>

---
---
