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
1. Hot partition problem detect/mitigate।
2. Multi-region active-active challenges।
3. Read-after-write guarantee design options।
4. Cache invalidation strategy in distributed systems।
5. End-to-end incident debugging with logs+metrics+traces।
6. Global shard rebalancing strategy।
7. Multi-region conflict resolution model।
8. High-cardinality metrics control techniques।
9. Backpressure implementation in async pipeline।
10. Cost-performance optimization framework।

## Practical Interview Tasks
### Task A
“Design a URL shortener for 100M URLs/day.”

### Task B
“Design notification service with retries, dedup, DLQ.”

### Task C
“Design rate limiter for public API gateway.”

### Task D
“Design cache strategy for product detail page with 95% read traffic.”

### Task E
“Design feed service for celebrity users (100M followers).”

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
