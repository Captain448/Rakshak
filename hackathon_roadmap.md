# Rakshak AI - 48-Hour Hackathon Implementation Roadmap
## Senior Architect's Blueprint to Win

To win a high-stakes hackathon, your execution must balance **visual "wow" factor (first 30 seconds of the pitch)** with **technical credibility (Q&A session)**. This roadmap divides the 48 hours into high-priority development sprints, outlining exactly what must be built dynamically and what should be mocked to preserve time.

---

## ⏱️ Timeline Overview (48-Hour Breakdown)

```
00h [------------------ Phase 1 & 2: Core Skeleton ------------------] 12h
12h [-------- Phase 3 & 4: Agent Core & Gemini Integration --------] 24h
24h [--- Phase 5 & 6: Neo4j Fraud Graph & Active Alert Engine ----] 36h
36h [------- Phase 7: Polish, Preset Scenarios, Demo & Video ------] 48h
```

---

## 🗺️ Phase-by-Phase Roadmap

### Phase 1: UI & Pages (Frontend)
*   **Target Time**: Hours 0 - 8 (Parallel with Phase 2)
*   **Priority**: CRITICAL (First impressions dictate scoring)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Initialize Next.js 15 template with TypeScript and Tailwind CSS.<br>2. Build citizen landing page, `/citizen/report` form, `/citizen/assistant` chat, and `/alerts` National Feed.<br>3. Build `/authority` command panel, `/authority/graph` page, and `/authority/counterfeit` scanner tool. |
| **Est. Hours** | 8 Hours |
| **Dependencies** | None |
| **Priority** | High |
| **What can be Mocked** | - Live WebSockets for alerts (use React local state updates instead).<br>- File upload endpoints (capture file names and trigger mock status delays). |
| **What must Work** | - 100% responsive, pixel-perfect government theme (white/navy palette).<br>- Interactive State/District search selectors on `/alerts`.<br>- State and input field validation (prevents empty submits). |

---

### Phase 2: Backend & Database Setup
*   **Target Time**: Hours 4 - 12 (Parallel with Phase 1)
*   **Priority**: HIGH (Shoring up the data contracts)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Spin up FastAPI router skeleton.<br>2. Set up local PostgreSQL (Docker container) and run SQL tables migration.<br>3. Configure Neo4j desktop instance or Sandbox and test Cypher client queries.<br>4. Implement CORS, request schemas (Pydantic), and DB connectors. |
| **Est. Hours** | 6 Hours |
| **Dependencies** | None |
| **Priority** | High |
| **What can be Mocked** | - Enterprise-grade User access roles (use basic mock JWT verification).<br>- Direct Telecom carrier billing nodes. |
| **What must Work** | - SQLite or Postgres DB storage for reports submitted via frontend.<br>- CORS configuration enabling seamless Next.js frontend calls. |

---

### Phase 3: Agent Framework
*   **Target Time**: Hours 12 - 18
*   **Priority**: HIGH (Core logic orchestration)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Build the base `Agent` class in Python.<br>2. Implement the `Public Safety Orchestrator` handling the async execution flow.<br>3. Construct simple mock response structures for all 6 specialized agents. |
| **Est. Hours** | 6 Hours |
| **Dependencies** | Phase 2 (FastAPI Router) |
| **Priority** | High |
| **What can be Mocked** | - Real-time processing inside sub-agents (use sleep delays and pre-canned JSON analysis returns). |
| **What must Work** | - Orchestrator's core execution order: calls analytics agents, calculates weightings, and routes the context to the Alert Agent. |

---

### Phase 4: Gemini Flash API Integration
*   **Target Time**: Hours 18 - 24
*   **Priority** : CRITICAL (The intelligence core)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Integrate the `google-generativeai` Python SDK.<br>2. Construct highly optimized prompts for **Citizen Risk Agent** (extracting entities from text/screenshot OCR and classifying scams) and **Counterfeit Agent** (evaluating note images against RBI rules).<br>3. Enable Structured Outputs (JSON Schema validation on Gemini API). |
| **Est. Hours** | 6 Hours |
| **Dependencies** | Phase 3 (Agent structures) |
| **Priority** | Critical |
| **What can be Mocked** | - Back-up responses if Gemini limits are hit (store local fallback files). |
| **What must Work** | - Dynamic OCR parsing of uploaded warrant PDFs.<br>- Image analysis of ₹500 notes, successfully locating at least 3 standard defects (spelling, emblem offset) and mapping bounding boxes. |

---

### Phase 5: Fraud Graph Intelligence (Neo4j)
*   **Target Time**: Hours 24 - 32
*   **Priority**: MEDIUM (Technical depth differentiator)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Build Neo4j Cypher query services to insert nodes (UPI, Suspect, Phone) when a citizen files a report.<br>2. Implement graph pathfinding to identify common money mule accounts (e.g. UPI connected to multiple reports).<br>3. Connect frontend `/authority/graph` visually using D3.js or react-force-graph. |
| **Est. Hours** | 8 Hours |
| **Dependencies** | Phase 2 (Neo4j client configuration) |
| **Priority** | Medium |
| **What can be Mocked** | - Multi-hop transactional chains (pre-seed the database with 200 nodes representing a fake cyber-fraud cartel). |
| **What must Work** | - Live insertion of a new report connecting a phone number to a suspect UPI handle.<br>- Displaying links dynamically on the graph viewer when searching indicators. |

---

### Phase 6: Alert & Notification Engine
*   **Target Time**: Hours 32 - 38
*   **Priority**: HIGH (Product closure)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Implement the **Alert and Notification Agent** logic.<br>2. Build a threshold checker in FastAPI: if a district logs >3 incidents of a specific type within 24 hours, generate a dynamic record in the `active_alerts` table.<br>3. Render safety alerts dynamically in Next.js on the National Alert Feed. |
| **Est. Hours** | 6 Hours |
| **Dependencies** | Phase 4 (Gemini output schemas) |
| **Priority** | High |
| **What can be Mocked** | - Real SMS transmissions (print warnings to terminal or mock SMS history table). |
| **What must Work** | - Proactive safety warning boxes generated at the bottom of Citizen Shield once risk metrics cross `0.80`. |

---

### Phase 7: Demo Mode & Presentation
*   **Target Time**: Hours 38 - 48
*   **Priority**: CRITICAL (This wins the hackathon)

| Parameter | Details |
| :--- | :--- |
| **Tasks** | 1. Create a **"Scenario Injector Panel"** hidden in the UI sidebar to easily trigger pre-seeded demo runs (e.g. Noida scam wave).<br>2. Test the end-to-end user path (Citizen Shield -> Alert Feed -> Police Command Center).<br>3. Prepare the architecture slide decks and record a clean 3-minute video walk-through. |
| **Est. Hours** | 10 Hours |
| **Dependencies** | All prior phases |
| **Priority** | Critical |
| **What can be Mocked** | - Random user traffic (simulate background traffic counts in the command center using interval timers). |
| **What must Work** | - Smooth, bug-free dashboard transitions under pressure.<br>- Interactive slides highlighting the exact multi-agent reasoning. |

---

## 🏆 Key Architecture Rules for Hackathon Success
1.  **Keep it Local first**: Run PostgreSQL and Neo4j locally via Docker. Don't waste critical hours trying to debug cloud DB permissions in the middle of the night.
2.  **Multimodal Gemini is your friend**: Rather than writing custom OpenCV models to crop and match note features, pass the specimen photo and the reference RBI photo directly to Gemini Flash in a single prompt and ask for JSON-structured bounding box analysis.
3.  **UI is the Engine of Trust**: In government-style designs, layout symmetry, official emblems, and lack of visual lag are what judges associate with "production-ready" systems. Spend time tweaking borders and padding.
