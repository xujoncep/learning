# Chapter 06 — Memory Management & Paging — OS 🌐

*র‍্যাম (RAM) ব্যবস্থাপনা এবং ভার্চুয়াল মেমোরি কীভাবে আপনার পিসিকে ১ জিবি র‍্যাম দিয়ে ১০ জিবি-র কাজ করতে সাহায্য করে, তা এই চ্যাপ্টারে আমরা শিখব।*

---

# Topic 25: Paging (The Gold Standard Logic)
Paging হলো একটি মেমোরি ম্যানেজমেন্ট স্কিম যেখানে ফিজিক্যাল মেমোরিকে ছোট ছোট ফিক্সড সাইজ ব্লকে ভাগ করা হয় যাকে বলে **Frames**, আর লজিক্যাল মেমোরিকে ভাগ করা হয় **Pages** এ।

### 25.1 Address Translation Math
এটি গেট (GATE) এবং বিসিএস (BCS) পরীক্ষায় সবচেয়ে বেশি আসে।
- **Logical Address:** (Page Number $p$, Page Offset $d$)
- **Physical Address:** (Frame Number $f$, Page Offset $d$)

**সূত্র:** Physical Address = $(f \times Page Size) + d$

### 25.2 Translation Lookaside Buffer (TLB)
র‍্যামে থাকা পেজ টেবিল অ্যাক্সেস করতে সময় লাগে। এই সময় কমাতে হার্ডওয়্যারে একটি স্পেশাল ক্যাশ থাকে যাকে বলে **TLB**।
- **TLB Hit:** যদি পেজ নম্বর TLB-তে পাওয়া যায়।
- **TLB Miss:** যদি পেজ টেবিল (RAM) চেক করতে হয়।

---

### 🔥 Job Exam Special (BPSC/Bank)
- **First Fit vs Best Fit:** মেমোরি অ্যালোকেশন অ্যালগরিদম। Best Fit সবচেয়ে কম মেমোরি নষ্ট করে (Fragmentation কমায়)।
- **Thrashing:** যখন সিস্টেম ডাটা প্রসেস করার চেয়ে পেজ সোয়াপিং (Swapping) এ বেশি সময় নষ্ট করে।

---

### 🧠 Practice Zone (Numericals & MCQ)

#### 📝 Numerical Challenge: Step-by-Step Paging
**Problem:** একটি সিস্টেমে লজিক্যাল অ্যাড্রেস ৩২-বিট এবং পেজ সাইজ ৪ কেবি (4 KB)। যদি পেজ টেবিল এন্ট্রি ৪ বাইট হয়, তবে পেজ টেবিলের সাইজ কত?

**Step 1: পেজ সংখ্যা বের করা**
- Logical Address Space = $2^{32}$ bytes.
- Page Size = 4 KB = $2^{12}$ bytes.
- Number of Pages = $2^{32} / 2^{12} = 2^{20}$ টি।

**Step 2: পেজ টেবিল সাইজ বের করা**
- Page Table Size = (Number of Pages) $\times$ (Entry Size)
- Page Table Size = $2^{20} \times 4$ bytes = $2^{20} \times 2^2 = 2^{22}$ bytes.
- $2^{22}$ bytes = 4 MB.

**Final Answer:** ৪ মেগাবাইট (4 MB)।

---

#### 🎯 MCQ Drill (10+ Questions)
1. **পেজিং-এ কোন ধরনের ফ্র্যাগমেন্টেশন (Fragmentation) হয়?**
   - (A) External **(B) Internal** (C) Both (D) None
2. **ভার্চুয়াল মেমোরি মূলত কোথায় জমা থাকে?**
   - (A) RAM **(B) Secondary Disk** (C) Cache (D) CPU Register
3. **TLB এর পূর্ণরূপ কী?**
   - **(A) Translation Lookaside Buffer** (B) Time Limit Block (C) Tab Layer Box
4. **Logical Address তৈরি করে কে?**
   - (A) RAM **(B) CPU** (C) OS (D) Compiler
5. **পেজ টেবিল সাধারণত কোথায় থাকে?**
   - **(A) Main Memory (RAM)** (B) Hard Disk (C) Cache (D) Register
6. **LRU পেজ রিপ্লেসমেন্ট অ্যালগোরিদমের পূর্ণরূপ কী?**
   - **(A) Least Recently Used** (B) Last Random Unit (C) Low Rate User
7. **Belady's Anomaly কোন অ্যালগোরিদমে দেখা যায়?**
   - **(A) FIFO** (B) LRU (C) Optimal (D) MRU
8. **পেজ ফল্ট (Page Fault) কখন হয়?**
   - **(A) যখন পেজটি র‍্যামে থাকে না** (B) যখন র‍্যাম ফুল থাকে (C) যখন ওএস ক্র্যাশ করে
9. **১ জিবি র‍্যামে ২ জিবি গেম চালানো সম্ভব কিসের মাধ্যমে?**
   - (A) Multi-threading **(B) Virtual Memory** (C) Overclocking
10. **Segmentation এ কোন এড্রেসিং মোড থাকে?**
    - **(A) Segment number & Offset** (B) Page number & Offset (C) Direct

#### ✍️ Written Checklist (5+)
1. **Explain Internal Fragmentation in Paging.**
   - *Ans:* পিং-এ পেজ সাইজ ফিক্সড থাকে। যদি শেষ পেজে ডাটা কম থাকে, তবে বাকি অংশ খালি পড়ে থাকে কিন্তু অন্য কেউ ব্যবহার করতে পারে না।
2. **What is Thrashing? How to prevent it?**
   - *Ans:* যখন ওএস ডাটা প্রসেসিংয়ের চেয়ে সুইপিং (Swapping) এ বেশি সময় নষ্ট করে। ডিগ্রি অফ মাল্টিপ্রোগ্রামিং কমিয়ে এটি ঠিক করা যায়।
3. **Difference between Paging and Segmentation.**
   - *Ans:* পেজিং ফিক্সড সাইজ (Fixed size), সেগমেন্টেশন ভ্যারিয়েবল সাইজ (Variable size)। পেজিং ওএস হ্যান্ডেল করে, সেগমেন্টেশন ইউজার ভিউ অনুযায়ী হয়।
4. **What is Page Fault? Explain step-by-step.**
   - *Ans:* যখন CPU কোনো ডাটা চায় কিন্তু তা র‍্যামে পাওয়া যায় না (Invalid bit)। তখন ট্র্যাপ তৈরি হয়, ওএস ডিস্ক থেকে ডাটা এনে র‍্যামে লোড করে।
5. **Describe the role of TLB.**
   - *Ans:* এটি একটি স্পেশাল ক্যাশ যা এড্রেস ট্রান্সলেশন দ্রুত করতে সাহায্য করে।

