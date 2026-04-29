# Chapter 01 — System Design Fundamentals & Capacity Planning 🌐

*বিলিয়ন স্কেল সিস্টেম ডিজাইন করার আগে ফাউন্ডেশন শক্ত করা জরুরি। এই চ্যাপ্টারে আমরা latency, throughput এবং capacity planning-এর গাণিতিক ভিত্তি শিখব।*

---

# Topic 1: Non-Functional Requirements (NFR)
সিস্টেম শুধু কাজ করলেই হবে না, তাকে ৩টি প্রধান রুল মেনে চলতে হবে:
1.  **Scalability:** ১০০০ ইউজার থেকে ১০০ মিলিয়ন ইউজার হ্যান্ডেল করার ক্ষমতা।
2.  **Availability:** সিস্টেমের কোনো অংশ ডাউন হলেও পুরো সার্ভিস সচল থাকা (SLO: 99.99% বা Four Nines)।
3.  **Reliability:** ডাটা কখনো হারাবে না।

---

# Topic 2: Capacity Planning (Extreme Deep Dive)
ইন্টারভিউতে আপনাকে বলবে: *"১ মিলিয়ন ডেইলি অ্যাক্টিভ ইউজার (DAU) এর জন্য একটি ফটো আপলোড সার্ভিস ডিজাইন করো।"*

### 2.1 Storage Calculation
- **DAU:** 1 Million
- **Avg Photo Size:** 500 KB
- **Photos per user/day:** 2
- **Daily Storage:** $1M \times 2 \times 500KB = 1 TB$
- **Total Storage (3 Years):** $1TB \times 365 \times 3 \approx 1.1 PB$ (Petabytes)

### 2.2 Bandwidth Calculation
- **Incoming Data (Writing):** $1TB / 86400s \approx 11.5 MB/s$
- **Outgoing Data (Reading):** ধরি রিড-রাইট রেশিও ১০:১, তাহলে $115 MB/s$

---

# Topic 3: Availability vs Reliability (The Nuance)
অনেকেই এই দুটোকে গুলিয়ে ফেলে। 
- **Availability:** সিস্টেম কতটা সময় আপ আছে। ( uptime / uptime + downtime )
- **Reliability:** সিস্টেম কতটা সময় এরর ছাড়া কাজ করছে।

### High Availability (HA) Trade-offs:
- **Pros:** সিস্টেম ফেল করবে না, ইউজারের কাছে ট্রাস্ট বাড়বে।
- **Cons:** কস্ট বাড়বে (Redundancy লাগে), ডাটা কনসিস্টেন্সি হ্যান্ডেল করা কঠিন হয়।

---

### ⚠️ Interview Traps
- **Latency vs Throughput:** Latency হলো এক প্যাকেট ডাটা যাওয়ার সময়, আর Throughput হলো এক সেকেন্ডে কত ডাটা প্রসেস হচ্ছে।
- **Scenario:** "নেটওয়ার্ক স্পিড ফাস্ট কিন্তু ডাটা প্রসেসিং স্লো" — এখানে Latency-তে সমস্যা নেই, কিন্তু Throughput লো।

---

### 🧠 Practice Zone (Case Study & MCQ)

#### MCQ Drill (10+ Questions)

1. 99.9% অ্যাভেলেবিলিটি (Three Nines) মানে বছরে সর্বোচ্চ কতক্ষণ ডাউনটাইম হতে পারে?
   - (ক) ১ ঘণ্টা (খ) ১ দিন **(গ) ৮.৭৭ ঘণ্টা** (ঘ) ২ দিন
2. Read-Heavy সিস্টেমের জন্য কোনটি সবচেয়ে বেশি দরকার?
   - **(ক) Caching** (খ) Sharding (গ) High Bandwidth (ঘ) Consistency
3. Vertical Scaling এর প্রধান সমস্যা কোনটি?
   - (ক) হাই কস্ট (খ) কমপ্লেক্সিটি **(গ) Single Point of Failure & Hard Limit** (ঘ) স্লো নেটওয়ার্ক
4. Stateless Application বলতে কী বোঝায়?
   - **(ক) সার্ভার কোনো ইউজার সেশন ডাটা স্টোর করে না** (খ) ডাটাবেস নেই (গ) শুধু HTML সার্ভ করে (ঘ) কোনো লজিক নেই
5. Throughput সরাসরি কিসের ওপর নির্ভর করে?
   - (ক) ডিস্ক স্পেস **(খ) ব্যান্ডউইথ এবং কনকারেন্সি** (গ) মেমরি (ঘ) ক্যাশ সাইজ
6. Reliability বাড়াতে নিচের কোনটি সবচেয়ে কার্যকর?
   - (ক) ফাস্ট হার্ডওয়্যার **(খ) Redundancy & Replication** (গ) লো লেটেন্সি (ঘ) ডকার
7. QPS (Queries Per Second) রিড ও রাইট এর যোগফল হলে, ৫ মিলিয়ন DAU এর জন্য এভারেজ QPS কত? (ধরি পার ইউজার ১০ রিকোয়েস্ট)।
   - (ক) ৫০০ **(খ) ৫৭৮ (প্রায়)** (গ) ১০০০ (ঘ) ২০০০
8. CAP Theorem এ 'Availability' বলতে কী বোঝায়?
   - **(ক) সচল নোড থেকে রেসপন্স আসা নিশ্চিত করা** (খ) সব নোডে একই ডাটা থাকা (গ) নেটওয়ার্ক ফেল করবে না (ঘ) স্পিড বাড়ানো
9. মডার্ন সিস্টেম ডিজাইনে কেন 'Loose Coupling' প্রেফার করা হয়?
   - (ক) সিকিউরিটি **(খ) ইন্ডিপেন্ডেন্ট স্কেলিং ও মেইনটেন্যান্স** (গ) লো মেমরি ইউজ (ঘ) ফাস্ট ডেভেলপমেন্ট
10. 'Long Tail Latency' সাধারণত কোন পার্সেন্টাইলের সাথে যুক্ত?
    - (ক) P50 (খ) P90 **(গ) P99 / P99.9** (ঘ) Average

#### Case Study & Written (10+ Challenges)

1. **URL Shortener Capacity Planning:** ১ বিলিয়ন নতুন ইউআরএল পার মান্থ জেনারেট হলে, ৫ বছরের জন্য কতটুকু স্টোরেজ লাগবে? (ধরি ১টি এন্ট্রি ৫০০ বাইট)।
   - **Answer Walkthrough:** $1B \times 12 \times 5 \times 500B \approx 30 TB$। এখানে ডাটাবেস হিসেবে NoSQL (যেমন DynamoDB or Cassandra) বেটার কারণ key-value স্টোরেজ এবং হাই রাইট থ্রুপুট দরকার।

2. **Video Streaming Throughput:** ১ মিলিয়ন নেটফ্লিক্স ইউজার যদি গড়ে ৫ এমবিপিএস স্পিডে ভিডিও স্ট্রিম করে, তবে ডাটা সেন্টারের ব্যাকবোন ব্যান্ডউইথ কত হওয়া উচিত?
   - **Answer:** $1M \times 5Mbps = 5 Tbps$ (Terabits per second)। এর সমাধান হলো CDN (Content Delivery Network) ব্যবহার করে ট্রাফিক ডিস্ট্রিবিউট করা।

3. **Trade-off Analysis:** Vertical Scaling vs Horizontal Scaling.
   - **Vertical:** সহজ (No code change), কিন্তু লিমিট আছে এবং Single Point of Failure।
   - **Horizontal:** আনলিমিটেড স্কেল, কিন্তু Load Balancer এবং ডিস্ট্রিবিউটেড ডাটা ম্যানেজমেন্টের কমপ্লেক্সিটি আছে।

4. **SLO vs SLA:** একটি রিটেইল ওয়েবসাইট ৯৯.৯৯% SLA দিলে, ইঞ্জিনিয়ারিং টিমের SLO কত হওয়া উচিত?
   - **Answer:** SLO সব সময় SLA থেকে বেশি হতে হবে (যেমন ৯৯.৯৯৯%), যাতে SLA ভঙ্গের আগেই অ্যালার্ট পাওয়া যায়।

5. **Throughput Calculation:** একটি নোডের মেমরি ৮ জিবি, একটি রিকোয়েস্ট প্রসেস করতে ১০০ এমবি লাগে। সার্ভারটি কতটি কনকারেন্ট রিকোয়েস্ট হ্যান্ডেল করতে পারবে?
   - **Math:** $8GB / 100MB \approx 80$ কনকারেন্ট রিকোয়েস্ট। এটি কনকারেন্সি লিমিট।

6. **Storage vs Throughput:** কখন আপনি হাই-স্পিড SSD বদলে চিপার HDD ব্যবহার করবেন?
   - **Answer:** কোল্ড স্টোরেজ বা লগ আরকাইভিং এর জন্য যেখানে রাইট/রিড ফ্রিকোয়েন্সি অনেক কম কিন্তু ভলিউম অনেক বেশি।

7. **Availability Math:** ২টা সার্ভার যদি ৯৫% এভেলেবল থাকে এবং তারা প্যারালালি কাজ করে, তবে কম্বাইন্ড এভেলেবিলিটি কত?
   - **Formula:** $1 - (1 - 0.95) \times (1 - 0.95) = 1 - 0.0025 = 99.75\%$। একে বলে Redundancy।

8. **Read/Write Ratio Impact:** ১০:১ রেশিওর একটি সিস্টেমে রাইট অপারেশন স্লো হলে পুরো সিস্টেমে কী প্রভাব পড়বে?
   - **Answer:** রাইট লকের কারণে রিড অপারেশনও কিউতে আটকে যেতে পারে (Head-of-line blocking), তাই ম্যাসাজ ব্রোকার (Kafka) ব্যবহার করা উচিত।

9. **Latency Optimization:** ইউজারের লেটেন্সি কমাতে আপনি ডাটাবেস লেভেলে কী করতে পারেন?
   - **Answer:** ইন্ডেক্সিং, ক্যাশিং, এবং রিড রেপ্লিকা (Read Replicas) ব্যবহার করা।

10. **Global Traffic Management:** ইউএসএ এবং বিডি থেকে আসা রিকোয়েস্টের লেটেন্সি পার্থক্য কীভাবে কমাবেন?
    - **Answer:** Multi-region deployment এবং Anycast DNS এর মাধ্যমে ইউজারকে কাছের ডাটা সেন্টারে পাঠানো।

---
