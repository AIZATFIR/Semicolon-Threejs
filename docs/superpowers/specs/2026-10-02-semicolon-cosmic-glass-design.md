# Semicolon Threejs - Cosmic Glass / Ethereal Dreamscape Design

## Overview
Transform the Three.js learning scene into an interactive, visually stunning "Cosmic Glass / Ethereal Dreamscape" showcasing an abstract 3D Semicolon model (`models/semicolon.glb`). The scene features floating glass crystal shards, dynamic glowing energy orbs with real-time point lights, drifting nebula starfield particles, smooth floating physics, and OrbitControls.

## Goals
1. **Core Subject**: Replace the Earth planet with `models/semicolon.glb`, automatically centered, scaled, with enhanced metallic/roughness properties, and smooth levitation.
2. **Abstract Environment**:
   - 20+ floating geometric glass crystal shards (icosahedrons, octahedrons, toruses) with `MeshPhysicalMaterial` transmission and iridescence.
   - 1,500+ cosmic nebula particles with soft violet/gold gradients.
   - 2 orbiting energy orbs (Amethyst & Solar Gold) casting dynamic lights and specular glints.
   - Deep ethereal void background with subtle exponential fog.
3. **UI & Metadata**: Update page title to "Semicolon Threejs", full-screen zero-margin canvas layout.
4. **Deployment**: Initialize Git repo, push to GitHub as "Semicolon Threejs", and deploy to Vercel (target domain `semicolon-threejs.vercel.app` or similar available slug).

## Architecture & Components
- **HTML/CSS**: Fullscreen canvas container with dark aesthetic and sleek minimal loader/hint overlay.
- **Three.js Scene**:
  - `Scene`, `PerspectiveCamera` (fov 45, near 0.1, far 1000, position `[0, 0, 4.5]`), `WebGLRenderer` (antialias, sRGB encoding, devicePixelRatio capped at 2).
  - `FogExp2(0x080614, 0.045)` for deep cosmic mist.
- **Model Loader**: `GLTFLoader` loading `models/semicolon.glb`, computing `Box3` for centering, scaling to target size `2.2`.
- **Cosmic Glass Shards**:
  - A group containing randomized geometric meshes (IcosahedronGeometry, OctahedronGeometry, TorusGeometry).
  - Material: `MeshPhysicalMaterial` with `roughness: 0.15`, `transmission: 0.75`, `thickness: 0.5`, `ior: 1.5`, `clearcoat: 0.8`.
  - Animation: Individual orbital trajectories, floating bobbing, and multi-axis tumbling.
- **Nebula Particle Field**:
  - `BufferGeometry` with 1,800 points and vertex colors (violet `#a855f7`, gold `#f59e0b`, cyan `#06b6d4`, indigo `#6366f1`).
  - Material: `PointsMaterial` with `size: 0.035`, `vertexColors: true`, `transparent: true`, `opacity: 0.85`, `blending: THREE.AdditiveBlending`.
  - Subtle wave/sway rotation over time.
- **Dynamic Orbiting Energy Orbs**:
  - Orb 1 (Amethyst: `0xc084fc`): PointLight + small glowing sphere mesh, elliptical orbit tilted on X/Z plane.
  - Orb 2 (Solar Gold: `0xfbbf24`): PointLight + small glowing sphere mesh, counter-elliptical orbit tilted on Y/Z plane.
- **Controls & Responsiveness**:
  - `OrbitControls` with `enableDamping: true`, `dampingFactor: 0.05`, `maxDistance: 12`, `minDistance: 1.5`.
  - Resize listener updating camera aspect ratio and renderer size.
