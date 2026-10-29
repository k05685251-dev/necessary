
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero3D.css";

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020703");

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0.5, 12);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.error("3D renderer ishga tushmadi:", error);
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5)
    );
    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Neon yashil ranglar
    const colors = [
      new THREE.Color("#173c0a"),
      new THREE.Color("#55ff00"),
      new THREE.Color("#b6ff37"),
      new THREE.Color("#f0ffb0"),
    ];

    // Zarralardan tashkil topgan katta to'lqin
    const columns = 240;
    const rows = 100;
    const total = columns * rows;

    const positions = new Float32Array(total * 3);
    const colorArray = new Float32Array(total * 3);
    const basePositions = new Float32Array(total * 3);
    const phases = new Float32Array(total);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const i = row * columns + col;
        const index = i * 3;

        const x = (col / (columns - 1) - 0.5) * 17;
        const depth = row / (rows - 1);
        const z = (depth - 0.5) * 5;

        basePositions[index] = x;
        basePositions[index + 1] = 0;
        basePositions[index + 2] = z;

        positions[index] = x;
        positions[index + 1] = 0;
        positions[index + 2] = z;

        phases[i] = Math.random() * Math.PI * 2;

        const c = colors[0];
        colorArray[index] = c.r;
        colorArray[index + 1] = c.g;
        colorArray[index + 2] = c.b;
      }
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const wave = new THREE.Points(geometry, material);
    scene.add(wave);

    // Pastki qismda qo'shimcha ingichka to'lqin
    const linePoints = [];
    const lineCount = 700;

    for (let i = 0; i < lineCount; i++) {
      linePoints.push(new THREE.Vector3(0, 0, 0));
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setFromPoints(linePoints);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#7cff19",
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Yengil tuman va yorug'lik hissi
    const ambient = new THREE.AmbientLight("#8aff45", 0.6);
    scene.add(ambient);

    const glow = new THREE.PointLight("#65ff13", 5, 18);
    glow.position.set(0, 2, 4);
    scene.add(glow);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();

      targetX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      targetY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resizeObserver = new ResizeObserver(() => {
      if (disposed || !container.clientWidth ||
          !container.clientHeight) return;

      camera.aspect =
        container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    });

    resizeObserver.observe(container);
    container.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();

    function animate() {
      if (disposed) return;

      frameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.025;
      mouseY += (targetY - mouseY) * 0.025;

      const pos = geometry.attributes.position.array;
      const col = geometry.attributes.color.array;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const i = row * columns + column;
          const index = i * 3;

          const x = basePositions[index];
          const z = basePositions[index + 2];

          const depth = row / (rows - 1);

          // To'lqinning ikki xil harakati
          const mainWave =
            Math.sin(x * 0.72 - t * 1.15 + z * 0.45) *
            0.65;

          const secondaryWave =
            Math.sin(x * 1.15 + t * 0.65 + z * 0.8) *
            0.19;

          const peak =
            Math.exp(-Math.pow((x - 2.8) / 2.2, 2)) * 0.55;

          const y =
            mainWave +
            secondaryWave +
            peak * Math.sin(t * 0.8 + z);

          // Zarralarning balandligi va chuqurligiga qarab rang
          pos[index + 1] = y + mouseY * 0.08;

          const intensity = THREE.MathUtils.clamp(
            0.35 +
              Math.abs(y) * 0.38 +
              Math.sin(t * 1.5 + phases[i]) * 0.08,
            0,
            1
          );

          const color = colors[
            intensity > 0.82 ? 3 :
            intensity > 0.62 ? 2 :
            intensity > 0.4 ? 1 : 0
          ];

          // Uzoq qatlamlar xira ko'rinadi
          const fade = 0.35 + (1 - depth) * 0.65;

          col[index] = color.r * fade;
          col[index + 1] = color.g * fade;
          col[index + 2] = color.b * fade;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Ingichka yorug'lik chizig'i ham to'lqin bilan harakatlanadi
      const lineArray = lineGeometry.attributes.position.array;

      for (let i = 0; i < lineCount; i++) {
        const x = (i / (lineCount - 1) - 0.5) * 17;

        lineArray[i * 3] = x;
        lineArray[i * 3 + 1] =
          Math.sin(x * 0.72 - t * 1.15) * 0.65 +
          Math.sin(x * 1.15 + t * 0.65) * 0.19;
        lineArray[i * 3 + 2] = 0.08;
      }

      lineGeometry.attributes.position.needsUpdate = true;

      wave.rotation.y = mouseX * 0.035;
      camera.position.x = mouseX * 0.18;
      camera.position.y = 0.5 - mouseY * 0.12;

      glow.position.x = mouseX * 2;
      glow.position.y = 1.5 + Math.sin(t * 0.7) * 0.4;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);

      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d-background"
      aria-hidden="true"
    />
  );
}
