# Chapter 06 — Consistency, Idempotency, Retry, Rate Limit

## Consistency Models
- Strong consistency
- Eventual consistency
- Read-your-write consistency

## Reliability Patterns
- Idempotency key
- Retry with backoff + jitter
- Timeout + fallback

## Rate Limiting
- Token bucket
- Leaky bucket
- Fixed window / sliding window

## MCQ (15)
1. Eventual consistency মানে? → later converge ✅
2. Idempotency key use? → duplicate effect prevent ✅
3. Blind retry risk? → retry storm ✅
4. Backoff কেন? → pressure reduce ✅
5. Jitter কেন? → thundering herd কমাতে ✅
6. Rate limit purpose? → abuse control ✅
7. Strong consistency tradeoff? → latency/availability impact ✅
8. Timeout না দিলে? → resource hang ✅
9. Circuit breaker সাথে retry relation? → coordinated failure control ✅
10. Exactly-once সহজ? → বাস্তবে কঠিন ✅
11. Token bucket advantage? → burst allow with controlled average ✅
12. Fixed window drawback? → boundary spike ✅
13. Sliding window benefit? → smoother enforcement ✅
14. Idempotent PUT semantics? → repeated same result ✅
15. Retry on 4xx generally? → mostly no (except select cases) ✅

## Written (5) with Solution
### Problem 1: Payment idempotency
**Solution:** client sends idempotency key; server stores key-result mapping; duplicate request same response ফেরত।

### Problem 2: Retry policy
**Solution:** transient errors (timeout/5xx) retry with backoff+jitter; validation errors retry না।

### Problem 3: Distributed rate limiter
**Solution:** centralized fast store (Redis) + atomic counter/token scripts + TTL windows।

### Problem 4: Read-after-write inconsistency case
**Solution:** write পরে stale replica read হলে mismatch; primary read বা session guarantee use করো।

### Problem 5: Safe timeout value নির্বাচন
**Solution:** downstream p99 latency + network margin + retry budget ধরে সেট করো।

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 05](05-queue-stream-kafka-rabbitmq.md)
- ➡️ [Chapter 07](07-observability-resilience-circuit-breaker.md)
