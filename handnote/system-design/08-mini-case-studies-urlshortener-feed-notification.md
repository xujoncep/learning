# Chapter 08 — Mini Case Studies (URL Shortener, Feed, Notification)

## Case 1: URL Shortener
### Requirements
- short URL generate
- redirect fast
- analytics optional

### Design Blocks
- API service
- key generator (base62)
- DB + cache
- redirect via cache-first lookup

## Case 2: Social Feed (basic)
### Requirements
- post create
- user timeline
- high read volume

### Approach
- fan-out on write (small network)
- fan-out on read (large network)
- hybrid strategy

## Case 3: Notification Service
### Requirements
- async reliable delivery
- retries
- per-channel templates

### Approach
- queue based pipeline
- worker pool
- DLQ + retry policy

## MCQ (15)
1. URL shortener hot path? → short->long lookup ✅
2. Feed read-heavy optimization? → cache + precompute ✅
3. Notification sync send issue? → user latency বাড়ে ✅
4. DLQ use? → failed message isolate ✅
5. Unique short code requirement? → collision handling ✅
6. Redirect latency কমাতে? → edge cache ✅
7. Feed pagination common method? → cursor-based ✅
8. Notification dedup দরকার কেন? → duplicate send avoid ✅
9. Analytics write path sync? → usually async ✅
10. Case design প্রথম প্রশ্ন? → scale + SLA clarify ✅
11. Feed timeline pagination best সাধারণত? → cursor pagination ✅
12. Notification dedup কোথায় দরকার? → consumer/send layer ✅
13. URL code collision হলে? → regenerate/check uniqueness ✅
14. Redirect service bottleneck? → storage lookup/cache miss ✅
15. Case study design ভুল common? → requirements না জিজ্ঞেস করে design শুরু ✅

## Written (5) with Solution
### Problem 1: URL shortener schema
**Solution:** table(short_code PK, long_url, created_at, user_id, expire_at optional) + index on short_code।

### Problem 2: Feed fan-out strategy
**Solution:** small follower count হলে fan-out write; huge celebrity হলে fan-out read/hybrid।

### Problem 3: Notification retry flow
**Solution:** enqueue → send → fail হলে backoff retry → max fail DLQ → replay tool।

### Problem 4: Read-heavy short URL optimization
**Solution:** edge cache + app cache + async analytics pipeline।

### Problem 5: Spam prevention in notification
**Solution:** per user/channel rate limits + dedup key + preference checks।

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 07](07-observability-resilience-circuit-breaker.md)
- ➡️ [Chapter 09](09-interview-beginner-to-advanced.md)
