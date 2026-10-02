import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// --- 1. Scene, Camera & Renderer Setup ---
const scene = new THREE.Scene();
const bgVoidColor = 0x06060f;
scene.background = new THREE.Color(bgVoidColor);
scene.fog = new THREE.FogExp2(bgVoidColor, 0.038);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0.3, 5.0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

// Environment Lighting for Realistic Glass & Metallic Shading
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
const roomEnv = new RoomEnvironment();
scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1.5;
controls.maxDistance = 12;
controls.enablePan = true;

// --- 2. Lighting System ---
const ambientLight = new THREE.AmbientLight(0x2d1f47, 1.4);
scene.add(ambientLight);

const mainKeyLight = new THREE.DirectionalLight(0xfff6ec, 2.6);
mainKeyLight.position.set(4, 5, 4);
scene.add(mainKeyLight);

const secondaryLight = new THREE.DirectionalLight(0x8b5cf6, 1.6);
secondaryLight.position.set(-4, -2, -3);
scene.add(secondaryLight);

// --- 3. Dynamic Orbiting Energy Orbs ---
const orbGroup1 = new THREE.Group();
const orbGroup2 = new THREE.Group();
scene.add(orbGroup1);
scene.add(orbGroup2);

// Orb 1: Amethyst Core
const amethystLight = new THREE.PointLight(0xc084fc, 12, 10, 2.0);
const amethystMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.045, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
const amethystGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.14, 24, 24),
  new THREE.MeshBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
);
orbGroup1.add(amethystLight);
orbGroup1.add(amethystMesh);
orbGroup1.add(amethystGlow);

// Orb 2: Solar Gold Core
const goldLight = new THREE.PointLight(0xfbbf24, 10, 9, 2.0);
const goldMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.04, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
const goldGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.12, 24, 24),
  new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
);
orbGroup2.add(goldLight);
orbGroup2.add(goldMesh);
orbGroup2.add(goldGlow);

// --- 4. Abstract Orbital Celestial Rings ---
const ringMaterial1 = new THREE.MeshBasicMaterial({
  color: 0xc084fc,
  transparent: true,
  opacity: 0.18,
  wireframe: true,
});
const celestialRing1 = new THREE.Mesh(
  new THREE.TorusGeometry(2.7, 0.008, 16, 120),
  ringMaterial1
);
celestialRing1.rotation.x = Math.PI * 0.38;
celestialRing1.rotation.y = Math.PI * 0.12;
scene.add(celestialRing1);

const celestialRing2 = new THREE.Mesh(
  new THREE.TorusGeometry(3.4, 0.006, 16, 120),
  new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.14,
    wireframe: true,
  })
);
celestialRing2.rotation.x = -Math.PI * 0.28;
celestialRing2.rotation.z = Math.PI * 0.45;
scene.add(celestialRing2);

// --- 5. Prismatic Cosmic Glass Shards ---
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 0.92,
  opacity: 1,
  transparent: true,
  roughness: 0.08,
  metalness: 0.04,
  ior: 1.55,
  thickness: 0.7,
  clearcoat: 1.0,
  clearcoatRoughness: 0.06,
  attenuationColor: new THREE.Color(0xecd9ff),
  attenuationDistance: 0.9,
});

const shardsGroup = new THREE.Group();
scene.add(shardsGroup);

const shardGeometries = [
  new THREE.OctahedronGeometry(1, 0),
  new THREE.IcosahedronGeometry(1, 0),
  new THREE.DodecahedronGeometry(1, 0),
  new THREE.TorusGeometry(0.7, 0.16, 12, 24),
];

const shardsData = [];
const shardCount = 30;

for (let i = 0; i < shardCount; i++) {
  const geom = shardGeometries[i % shardGeometries.length];
  const mesh = new THREE.Mesh(geom, glassMaterial);

  const radius = 1.7 + Math.random() * 2.8;
  const baseAngle = (i / shardCount) * Math.PI * 2 + Math.random() * 0.3;
  const height = (Math.random() - 0.5) * 2.4;
  const scale = 0.07 + Math.random() * 0.15;

  mesh.scale.setScalar(scale);

  const shardInfo = {
    mesh,
    radius,
    angle: baseAngle,
    orbitSpeed: (0.12 + Math.random() * 0.22) * (Math.random() > 0.5 ? 1 : -1),
    yBase: height,
    bobSpeed: 1.2 + Math.random() * 1.6,
    bobAmp: 0.08 + Math.random() * 0.12,
    rotX: (Math.random() - 0.5) * 0.025,
    rotY: (Math.random() - 0.5) * 0.025,
    rotZ: (Math.random() - 0.5) * 0.025,
  };

  shardsData.push(shardInfo);
  shardsGroup.add(mesh);
}

// --- 6. Nebula Starfield Particle System ---
const particleCount = 2000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);

const colorPalette = [
  new THREE.Color(0xa855f7), // Purple
  new THREE.Color(0xc084fc), // Soft Violet
  new THREE.Color(0xfbbf24), // Celestial Gold
  new THREE.Color(0x38bdf8), // Cyan Star
  new THREE.Color(0x818cf8), // Indigo
  new THREE.Color(0xffffff), // Pure Starlight
];

for (let i = 0; i < particleCount; i++) {
  const r = 2.2 + Math.cbrt(Math.random()) * 11.5;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  particlePositions[i * 3 + 2] = r * Math.cos(phi);

  const chosenColor =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];
  particleColors[i * 3] = chosenColor.r;
  particleColors[i * 3 + 1] = chosenColor.g;
  particleColors[i * 3 + 2] = chosenColor.b;
}

particleGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(particlePositions, 3)
);
particleGeometry.setAttribute(
  'color',
  new THREE.BufferAttribute(particleColors, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.034,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const starfield = new THREE.Points(particleGeometry, particleMaterial);
scene.add(starfield);

// --- 7. Semicolon Model Loader ---
const semicolonContainer = new THREE.Group();
scene.add(semicolonContainer);

const loader = new GLTFLoader();
const loaderElement = document.getElementById('loader');

loader.load(
  'models/semicolon.glb',
  (gltf) => {
    const semicolon = gltf.scene;

    // Enhance materials and reflections
    semicolon.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material.envMapIntensity = 1.8;
      }
    });

    // Auto-center and normalize scale
    const box = new THREE.Box3().setFromObject(semicolon);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.3;
    const scale = targetSize / maxDim;

    semicolon.scale.setScalar(scale);
    semicolon.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    semicolonContainer.add(semicolon);

    // Hide loader overlay smoothly
    if (loaderElement) {
      loaderElement.classList.add('fade-out');
      setTimeout(() => {
        loaderElement.remove();
      }, 700);
    }
  },
  undefined,
  (error) => {
    console.error('Failed to load semicolon model:', error);
    if (loaderElement) {
      const loaderText = loaderElement.querySelector('.loader-text');
      if (loaderText) {
        loaderText.textContent = 'Failed to load 3D model';
      }
    }
  }
);

// --- 8. Animation & Render Loop ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Floating & rotation for Semicolon
  semicolonContainer.position.y = Math.sin(elapsedTime * 1.5) * 0.09;
  semicolonContainer.rotation.y += 0.0035;

  // Orbiting energy orbs with subtle pulsing scale
  const orb1Angle = elapsedTime * 0.75;
  const orb1Radius = 2.5;
  orbGroup1.position.set(
    Math.cos(orb1Angle) * orb1Radius,
    Math.sin(orb1Angle * 1.6) * 0.85,
    Math.sin(orb1Angle) * orb1Radius
  );
  const pulse1 = 1 + Math.sin(elapsedTime * 4) * 0.15;
  amethystGlow.scale.setScalar(pulse1);

  const orb2Angle = -elapsedTime * 0.6 + Math.PI;
  const orb2Radius = 3.1;
  orbGroup2.position.set(
    Math.cos(orb2Angle) * orb2Radius,
    Math.cos(orb2Angle * 1.3) * 1.1,
    Math.sin(orb2Angle) * orb2Radius * 0.88
  );
  const pulse2 = 1 + Math.cos(elapsedTime * 3.5) * 0.15;
  goldGlow.scale.setScalar(pulse2);

  // Celestial rings rotation
  celestialRing1.rotation.z += 0.0018;
  celestialRing2.rotation.y += 0.0022;

  // Animate crystal shards
  shardsData.forEach((shard) => {
    const currentAngle = shard.angle + elapsedTime * shard.orbitSpeed * 0.3;
    shard.mesh.position.x = Math.cos(currentAngle) * shard.radius;
    shard.mesh.position.z = Math.sin(currentAngle) * shard.radius;
    shard.mesh.position.y =
      shard.yBase + Math.sin(elapsedTime * shard.bobSpeed) * shard.bobAmp;

    shard.mesh.rotation.x += shard.rotX;
    shard.mesh.rotation.y += shard.rotY;
    shard.mesh.rotation.z += shard.rotZ;
  });

  // Slow starfield swirl
  starfield.rotation.y = elapsedTime * 0.012;
  starfield.rotation.x = Math.sin(elapsedTime * 0.04) * 0.035;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --- 9. Window Resizing ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});