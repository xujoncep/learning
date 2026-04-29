# Chapter 08 — Practical Network Troubleshooting — Computer Networking 🌐

# Topic 26: Professional Troubleshooting Commands
- **ping:** কানেকশন চেক।
- **tracert:** ডেটা কোন পথে যাচ্ছে তা দেখা।
- **netstat:** পিসির কোন কোন পোর্ট খোলা আছে তা দেখা।
- **nslookup:** DNS ডল্ভিং প্রবলেম চেক করা।
- **arp -a:** MAC Address এবং IP-র ম্যাপিং দেখা।

---

# Topic 27: Wireshark Filtering
Wireshark-এ নির্দিষ্ট প্যাকেট দেখতে নিচের ফিল্টারগুলো ব্যবহার হয়:
- `http`: শুধু HTTP প্যাকেট দেখতে।
- `ip.addr == 192.168.1.1`: নির্দিষ্ট আইপির প্যাকেট দেখতে।
- `tcp.port == 443`: শুধু HTTPS ট্রাফিক দেখতে।

---

# Topic 28: Extreme Networking Interview Mastery

### Q1. "Your PC can ping 8.8.8.8 but cannot open google.com. Why?"
**Ans:** এটি একটি ক্লাস-এ 'DNS Issue'।
- **Under the Hood:** আপনি যখন 8.8.8.8 পিং করেন, আপনি সরাসরি আইপিতে ডেটা পাঠাচ্ছেন (Layer 3)। কিন্তু ব্রাউজারে `google.com` টাইপ করলে পিসিকে প্রথমে DNS সার্ভারে গিয়ে এর আইপি জেনে নিতে হয়। যদি DNS কনফিগারেশন ভুল থাকে, পিসি নাম থেকে আইপি অনুবাদ করতে পারে না।
- **Pro Tip:** `nslookup google.com` দিয়ে চেক করুন ও `ipconfig /flushdns` কমান্ড দিন।

---

### Q2. TCP আর UDP এর আসল Trade-off কী?
**Ans:** TCP হলো **Reliability** বনাম UDP হলো **Speed**।
- **Deep Dive:** TCP-র ৩-ওয়ে হ্যান্ডশেক এবং একনলেজমেন্ট মেকানিজম এনশিওর করে ডেটা পৌঁছাবেই, কিন্তু এতে Latency বাড়ে। UDP কোনো রেসপন্স চেক করে না, তাই এটি ভিডিও স্ট্রিমিং বা গেমিং এর জন্য বেস্ট যেখানে দু-একটা ফ্রেম লস হলেও সমস্যা নেই কিন্তু ডিলে হওয়া যাবে না।
- **Interview Trap:** "HTTP কি UDP তে চলতে পারে?" — হ্যাঁ, HTTP/3 (QUIC) প্রোফাইল UDP ব্যবহার করে স্পিড বাড়ানোর জন্য।

---

### Q3. "What happens if two devices have the same IP in a network?"
**Ans:** একে **IP Conflict** বলা হয়। 
- **The Mechanics:** নেটওয়ার্কের সুইচ বা রাউটার কনফিউজড হয়ে যায় ডেটা প্যাকেট কোন MAC অ্যাড্রেসে পাঠাবে। সাধারণত ARP প্রোসেস এই কনফ্লিক্ট ডিটেক্ট করে এবং ওএস ইউজারকে নোটিফিকেশন দেয়। যার আইপি আগে ছিল সে কানেকশন ধরে রাখে, অন্যজনের কানেকশন ড্রপ হয়।

---

### 🌐 10 NEW Scenario-Based Questions

1.  **DHCP Process:** আপনার পিসি আইপি পাচ্ছে না কিন্তু সব ক্যাবল ঠিক আছে। `169.254.x.x` আইপি কেন দেখাচ্ছে? (Ans: একে APIPA বলে; ডিএইচসিপি সার্ভার রেসপন্স না করলে উইন্ডোজ নিজে এই আইপি নেয়)।
2.  **MTU & Fragmentation:** প্যাকেট সাইজ বড় হলে রাউটার কেন তা ভেঙে ফেলে? এর ফলে স্পিড কেন কমে?
3.  **VLAN Logic:** একটা পিসি ফিজিকালি এক পাশে থাকলেও কেন অন্য ডিপার্টমেন্টের পিসির সাথে কথা বলতে পারে না?
4.  **Subnetting Trap:** `192.168.1.0/24` নেটওয়ার্কে কেন ২৫৬ জন ইউজার থাকতে পারে না? (Ans: নেটওয়ার্ক এবং ব্রডকাস্ট আইপি বাদে ২৫৪ জন)।
5.  **BGP Hijacking:** কীভাবে একটা ভুল রাউটিং আপডেট পুরো পৃথিবীর ইন্টারনেট ট্রাফিক হাইজ্যাক করতে পারে?
6.  **TLS Handshake:** HTTPS কানেকশন হওয়ার সময় পিসি আর সার্ভার কীভাবে সিক্রেট কী ঠিক করে?
7.  **Private vs Public IP:** কেন আপনার পিসির আইপি `192.168.x.x` হলেও ইন্টারনেটে সবাই আপনাকে অন্য আইপিতে চেনে? (NAT basics)।
8.  **Port Forwarding:** ঘরের পিসিতে চালানো গেম সার্ভার কেন বাইরের বন্ধু দেখতে পায় না?
9.  **Switch vs Hub:** কেন সুইচ ব্যবহার করলে নেটওয়ার্কে প্যাকেট কলিশন হয় না?
10. **Zero-Trust Networking:** ফায়ারওয়াল থাকা সত্ত্বেও কেন ইন্টারনাল নেটওয়ার্ককেও ট্রাস্ট করা উচিত নয়?

---

### 🧠 Expert Checklist
- [ ] Understand 3-way handshake (SYN, SYN-ACK, ACK).
- [ ] Know the difference between Layer 2 (MAC) and Layer 3 (IP).
- [ ] Be able to explain OSI model using a real-world mail system analogy.

---

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 07](07-network-security.md)
