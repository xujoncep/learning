# Chapter 09 — Interview Prep (Beginner to Advanced)

## Beginner Q/A
1. Stateless service কী?
2. Cache কেন use করি?
3. Load balancer কী করে?
4. Queue কেন দরকার?
5. Replication আর sharding পার্থক্য কী?
6. API gateway কেন use করি?
7. Rate limiting basic idea কী?
8. Consistency model example দাও।
9. Retry সবসময় safe কেন না?
10. Circuit breaker কী problem solve করে?

## Intermediate Q/A
1. Strong vs eventual consistency tradeoff explain।
2. Idempotency key payment API-তে কিভাবে কাজ করে?
3. Retry policy কীভাবে safe বানাবে?
4. Rate limiting algorithm compare।
5. Circuit breaker state machine explain।
6. Replica lag handling options কী?
7. Cache invalidation strategy compare।
8. DLQ operational workflow কী?
9. Cursor pagination কেন better?
10. p99 latency এর গুরুত্ব কী?

## Advanced Q/A
1. **Hot partition problem detect/mitigate?**
   - **Under the Hood:** যখন কোনো একটি ডাটা শার্ড (Shard) বা পার্টিশনে অতিরিক্ত ট্রাফিক চলে আসে (যেমন: সেলিব্রিটি ইউজার)।
   - **Logic:** এটি সলভ করতে 'Salting' (কি-এর সাথে র‍্যান্ডম স্ট্রিং যোগ করা) বা ক্যাশিং ব্যবহার করা যায়।

2. **Multi-region active-active challenges?**
   - **Architectural Trade-off:** কনফ্লিক্ট রেজোলিউশন (কে আগে রাইট করেছে?) এবং ল্যাটেন্সি। 'LWW' (Last Write Wins) বা CRDTs ব্যবহার করা হয়।

3. **"Why B+ Tree over LSM Tree for DB indexing?"**
   - **Trade-off:** B+ Tree সাধারণত 'Read' এর জন্য দ্রুত (RDBMS এ প্রিয়)। LSM Tree (Log Structured Merge Tree) সাধারণত 'Write' এর জন্য অনেক দ্রুত (NoSQL যেমন Cassandra-তে প্রিয়)।

4. **"Why use Redis if DB can perform queries?"**
   - **Logic:** ডাটাবেস ডিস্ক থেকে ডাটা পড়ে (Slow), রেডিস র‍্যাম থেকে পড়ে (Cashing)। ১০০০ কুয়েরি/সেকেন্ড এর বদলে রেডিস ১ লাখ কুয়েরি/সেকেন্ড নিতে পারে।

5. **"Why gRPC over REST for Internal Microservices?"**
   - **Performance:** REST হলো টেক্সট-বেসড (JSON), gRPC বাইনারি (Protobuf)। এটি অনেক বেশি নেটওয়ার্ক ব্যান্ডউইথ সেভ করে এবং ফাস্ট সিরিয়ালাইজেশন দেয়।

## Practical Interview Tasks
### Task A
“Design a URL shortener for 100M URLs/day.”
- **Detailed Logic:** Capacity estimation (storage), Hashing algorithm (Base62 vs MD5), Cache for frequently visited URLs.

### Task B
“Design notification service with retries, dedup, DLQ.”
- **Pro Tip:** Idempotency key ব্যবহার করুন যাতে ইউজার একই নোটিফিকেশন দুবার না পায়।

### Task C
“Design rate limiter for public API gateway.”
- **Comparison:** Token Bucket (Good for spikes) vs Fixed Window (Simpler but has boundary issues).

### Task D
“Design cache strategy for product detail page with 95% read traffic.”
- **Logic:** Write-through cache VS Cache-aside. ৯৫% রিড হলে "Store then Cache" অর্থাৎ Cache-aside বেস্ট।

### Task E
“Design feed service for celebrity users (100M followers).”
- **Architecture:** Hybrid model. সেলিব্রেটিদের জন্য Pull model (ইউজার যখন আসবে তখন দেখবে) আর সাধারণ ইউজারের জন্য Push model (সাথেই সাথে নোটিফিকেশন)। কেন? কারণ কোটি মানুষকে এক সাথে পুশ করলে সিস্টেম মোল্টডাউন করবে (Thundering Herd Problem)।

## Rapid Checklist
- requirements clarify first
- capacity estimate
- API contract
- data model
- scaling path
- failure handling
- observability

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 08](08-mini-case-studies-urlshortener-feed-notification.md)
