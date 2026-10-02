# Semicolon Threejs Cosmic Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a high-fidelity 3D Cosmic Glass / Ethereal Dreamscape scene around a floating Semicolon model, and deploy it to GitHub & Vercel.

**Architecture:** A Three.js application powered by Vite featuring centered GLTF loading, custom glass-refractive geometric clusters, vertex-colored particle starfields, dynamic dual-point-light orbital energy cores, and OrbitControls.

**Tech Stack:** Three.js (r186+), Vite, HTML5 Canvas, Git, GitHub CLI (gh), Vercel CLI.

## Global Constraints
- Canvas fills 100vw x 100vh with no scrollbars.
- Retain 60 FPS performance by keeping geometry counts clean and using lightweight procedural meshes.
- Use `semicolon.glb` located in `public/models/semicolon.glb`.
- Page title: "Semicolon Threejs".

---

### Task 1: Clean Canvas Layout & UI Shell

**Files:**
- Modify: `index.html`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: Standard HTML DOM
- Produces: Clean zero-margin full-window canvas layout with subtle glassmorphic HUD overlay (title + hint).

- [ ] **Step 1: Update index.html title and style link**
- [ ] **Step 2: Add clean full-viewport canvas styles and minimal sleek floating overlay**
- [ ] **Step 3: Verify local dev server loads layout cleanly**

---

### Task 2: Implement Semicolon Model Loader & Levitation

**Files:**
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `public/models/semicolon.glb` via `GLTFLoader`
- Produces: Centered, auto-scaled Semicolon mesh with smooth levitation and slow axial rotation.

- [ ] **Step 1: Replace little_planet_earth.glb with semicolon.glb**
- [ ] **Step 2: Apply proper bounding-box centering and scale normalization (target size ~2.2)**
- [ ] **Step 3: Enhance materials with premium metallic/roughness properties**
- [ ] **Step 4: Implement sine-wave levitation on Y axis**

---

### Task 3: Build Cosmic Glass Shard Field

**Files:**
- Modify: `src/main.js`

**Interfaces:**
- Consumes: Three.js `IcosahedronGeometry`, `OctahedronGeometry`, `TorusGeometry`, `MeshPhysicalMaterial`
- Produces: 24 floating refractive crystal shards distributed in orbital rings.

- [ ] **Step 1: Create glass crystal material with transmission, roughness, and clearcoat**
- [ ] **Step 2: Spawn 24 varied geometric shards with randomized orbital radii and angular offsets**
- [ ] **Step 3: Implement orbital motion and tumbling rotation in animation loop**

---

### Task 4: Add Nebula Particle Field & Atmospheric Fog

**Files:**
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `THREE.BufferGeometry`, `THREE.PointsMaterial`, `THREE.FogExp2`
- Produces: 1,800 cosmic nebula particles with violet/gold/cyan vertex colors and atmospheric depth fog.

- [ ] **Step 1: Setup exponential fog (`THREE.FogExp2(0x080614, 0.045)`) and dark void background**
- [ ] **Step 2: Generate BufferGeometry with 1,800 randomized points and vertex color gradients**
- [ ] **Step 3: Animate subtle particle field oscillation**

---

### Task 5: Dynamic Dual Orbiting Energy Orbs & Lighting

**Files:**
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `THREE.PointLight`, `THREE.MeshBasicMaterial`, `THREE.SphereGeometry`
- Produces: Two glowing energy orbs (Amethyst & Solar Gold) traveling on tilted elliptical orbits, casting moving highlights.

- [ ] **Step 1: Create Amethyst and Solar Gold orb meshes and attached PointLights**
- [ ] **Step 2: Calculate elliptical orbital coordinates with phase offsets in animation loop**
- [ ] **Step 3: Fine-tune ambient and key directional lighting for maximum contrast**

---

### Task 6: Build Verification & Browser QA

**Files:**
- Modify: `src/main.js` (if any adjustments needed)

- [ ] **Step 1: Run production build (`npm run build`) to ensure zero bundling/syntax errors**
- [ ] **Step 2: Open browser subagent to verify visual aesthetics, 60fps smoothness, and interactivity**

---

### Task 7: Git Commit, GitHub Repository & Vercel Deployment

**Files:**
- Git repository files

- [ ] **Step 1: Stage and commit all changes**
- [ ] **Step 2: Create public GitHub repository "Semicolon-Threejs" and push**
- [ ] **Step 3: Deploy to Vercel with project name "semicolon-threejs" and record live URL**
