# MBSTU ICT Department Examination & Semester Bill Management System
## Known Limitations and Architectural Constraints

**Document File:** `docs/KNOWN_LIMITATIONS.md`  
**Academic Level:** Undergraduate ICT Software Engineering Project (1 Credit)  
**System Type:** Standalone Client-Side Offline Web Application  

---

## 1. Architectural & Environmental Constraints

1. **Local Device Scope (`localStorage`):**
   - The application stores data in the local browser's `localStorage`.
   - Data stored on one computer or browser does not automatically synchronize across different devices over the internet unless the user exports a JSON backup and imports it onto the other machine.
   - Clearing browser cookies and site storage removes local records. Users must routinely use the **Export JSON Backup** feature to preserve records.

2. **Single-User / Shared-Device Model:**
   - Designed as a zero-cost departmental billing station prototype without multi-user password logins.
   - In a production university-wide deployment, a backend authentication server (e.g. Node.js/PostgreSQL with JWT or OAuth) would be added to enforce separate logins for Teachers, Examination Committee Chairman, Section Officers, and the Controller of Examinations.

3. **Client-Side Storage Capacity:**
   - Modern browsers allocate 5MB to 10MB of `localStorage` per origin. For text-based examination records, course metadata, and billing ledgers, this easily accommodates dozens of academic sessions and thousands of examination duties (a typical session takes < 250 KB). However, it is not intended for storing multi-megabyte binary attachments or scanned PDF images directly in local storage.

---

## 2. University Regulatory & Billing Boundaries

1. **Syndicate Remuneration Updates:**
   - University syndicate circulars periodically revise remunerations (e.g., changes to script checking rates or committee allowances). While the application provides an administrative rate configurator, any new complex statutory formula not captured by existing units must be configured through the custom calculation rule settings.

2. **Official Signature Legalities:**
   - Generated printable bill slips provide exact visual representations with designated signature blocks, counter-signatures, and revenue stamp acknowledgements. However, physical ink signatures or official cryptographic digital signatures (PKI) remain subject to university administrative guidelines.

3. **Tax & TDS Automation:**
   - While the bill preparation workflow supports configurable deduction fields (e.g. source tax or administrative deductions), specific tax percentages (e.g., 10% TDS under NBR regulations) must be verified against current fiscal laws before applying to a teacher's net disbursement.
