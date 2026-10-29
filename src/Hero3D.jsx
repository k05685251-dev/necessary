
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero3D.css";

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId;
    let resizeObserver;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#010704");

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor("#010704", 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    container.appendChild(renderer.domElement);

    // Yashil yorug'liklar
    scene.add(new THREE.AmbientLight("#0b6637", 1.5));

    const greenLight = new THREE.PointLight("#00ff66", 30, 35);
    greenLight.position.set(0, 1, 4);
    scene.add(greenLight);

    const emeraldLight = new THREE.PointLight("#00b84d", 25, 30);
    emeraldLight.position.set(-4, -2, 1);
    scene.add(emeraldLight);

    const particleCount = 12000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const particleData = [];

    const innerColor = new THREE.Color("#c2ffb0");
    const middleColor = new THREE.Color("#00ff59");
    const outerColor = new THREE.Color("#005b29");

    // Kattaroq va zichroq zarrali girdob
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.pow(Math.random(), 0.72) * 7.5;
      const angle = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 1.5;

      particleData.push({
        radius,
        angle,
        depth,
        speed: 0.12 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        size: Math.random(),
      });

      const mix = Math.min(radius / 7.5, 1);
      const color = innerColor.clone().lerp(middleColor, mix);
      color.lerp(outerColor, Math.max(0, mix - 0.5) * 0.7);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    const vortex = new THREE.Group();
    vortex.add(particles);
    scene.add(vortex);

    // Ko'p qatlamli spiral chiziqlar
    const spiralLines = [];
    const spiralMaterials = [];

    for (let s = 0; s < 18; s++) {
      const points = [];
      const steps = 350;
      const turns = 4;
      const offset = (s / 18) * Math.PI * 2;

      for (let j = 0; j <= steps; j++) {
        const t = j / steps;
        const radius = 0.25 + t * 7.1;
        const angle = t * turns * Math.PI * 2 + offset;

        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.62,
            Math.sin(t * 10 + s) * 0.18
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: s % 3 === 0 ? "#78ff98" : "#00b941",
        transparent: true,
        opacity: s % 3 === 0 ? 0.4 : 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);

      spiralLines.push(line);
      spiralMaterials.push(material);
      vortex.add(line);
    }

    // Markazdagi qoramtir bo'shliq
    const coreGeometry = new THREE.CircleGeometry(0.42, 64);

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: "#010704",
      side: THREE.DoubleSide,
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.z = 0.4;
    vortex.add(core);

    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const array = particleGeometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];

        const angle =
          p.angle + time * p.speed + p.radius * 0.28;

        const radius =
          p.radius + Math.sin(time * 1.1 + p.phase) * 0.08;

        const perspective =
          0.62 + (p.radius / 7.5) * 0.38;

        array[i * 3] = Math.cos(angle) * radius;

        array[i * 3 + 1] =
          Math.sin(angle) * radius * perspective;

        array[i * 3 + 2] =
          p.depth + Math.sin(angle * 1.5) * 0.12;
      }

      particleGeometry.attributes.position.needsUpdate = true;

      // Butun girdob sekin aylanadi
      vortex.rotation.z = time * 0.055;
      vortex.rotation.x = Math.sin(time * 0.2) * 0.035;
      vortex.rotation.y = Math.sin(time * 0.15) * 0.04;

      greenLight.intensity = 25 + Math.sin(time * 1.4) * 5;

      renderer.render(scene, camera);
    }

    animate();

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();

      scene.traverse((object) => {
        if (object.isMesh || object.isLine || object.isPoints) {
          object.geometry?.dispose();
        }
      });

      particleMaterial.dispose();
      coreMaterial.dispose();
      spiralMaterials.forEach((material) => material.dispose());

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-3d-container" />;
}
