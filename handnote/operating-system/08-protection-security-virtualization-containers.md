# Chapter 08 — Protection, Security, Virtualization & Containers

---

## 1. Protection Basics
- Authentication
- Authorization
- Access Control Matrix
- ACL vs Capability list

## 2. Security Threat Snapshot
- Malware
- Privilege escalation
- Buffer overflow
- Denial of Service

## 3. Virtualization
- Hypervisor Type-1 vs Type-2
- VM isolation
- Resource multiplexing

## 4. Containers
- OS-level virtualization
- namespaces + cgroups
- VM vs container tradeoff

| বিষয় | VM | Container |
|---|---|---|
| OS kernel | separate guest OS | host kernel share |
| startup | slower | fast |
| isolation | stronger | lighter |
| overhead | বেশি | কম |

## 5. MCQ (15)
1. Principle of least privilege কী? → minimum required access ✅  
2. ACL কী control করে? → object-based permission list ✅  
3. Capability list focus? → subject-side rights ✅  
4. Type-1 hypervisor runs? → bare metal ✅  
5. Type-2 hypervisor runs on? → host OS ✅  
6. Container isolation base? → namespace + cgroups ✅  
7. VM vs container stronger isolation? → VM ✅  
8. DoS লক্ষ্য? → availability degrade ✅  
9. Authentication vs authorization? → identity verify vs permission check ✅  
10. Sandbox উদ্দেশ্য? → risk isolation ✅  
11. Kernel attack impact? → high privilege compromise ✅  
12. SELinux/AppArmor কাজ? → mandatory access control ✅  
13. Root user কেন risky? → unrestricted privilege ✅  
14. Multi-factor authentication লাভ? → stronger identity assurance ✅  
15. Security patching কেন critical? → known vulnerability close ✅

## 6. Written Problems (5)
### P1: ACL vs capability practical পার্থক্য
**Solution:** ACL object-centric; capability subject-centric; revocation model ভিন্ন।
### P2: VM কেন container থেকে heavy
**Solution:** guest OS overhead, virtual hardware emulation cost।
### P3: Container use-case
**Solution:** microservice deployment, fast scale, consistent environment।
### P4: Least privilege implement কিভাবে
**Solution:** role-based access, no default admin rights, periodic review।
### P5: OS hardening checklist
**Solution:** patching, firewall, disable unused services, strong auth, audit logging।

## 7. Course Summary
- OS fundamentals থেকে modern container পর্যন্ত full path complete
- exam + interview essential coverage finished

## Navigation
- 🏠 [Master Index](00-master-index.md)
- ⬅️ [Chapter 07](07-file-system-io-disk-management.md)
- ✅ Operating System course complete

