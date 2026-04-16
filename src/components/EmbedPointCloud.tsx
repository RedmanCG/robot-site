"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createVisibilityGate } from "@/lib/visibilityGate";

export default function EmbedPointCloud() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let isAnimating = false;

    const scene = new THREE.Scene();
    // Brand background: #F7F9FC
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 820);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const cols = 220;
    const rows = 96;
    const pointCount = cols * rows;
    const spreadX = 1700;
    const spreadY = 980;

    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const sizes = new Float32Array(pointCount);
    const seeds = new Float32Array(pointCount * 4);
    const baseX = new Float32Array(pointCount);
    const baseY = new Float32Array(pointCount);
    const baseZ = new Float32Array(pointCount);

    // Site palette:
    // brand-navy #0B1E36 → (0.043, 0.118, 0.212)
    // blue-500   #3B82F6 → (0.231, 0.510, 0.965)

    let ptr = 0;
    for (let row = 0; row < rows; row++) {
      const v = row / (rows - 1);
      const y = (v - 0.5) * spreadY;

      for (let col = 0; col < cols; col++) {
        const u = col / (cols - 1);
        const x = (u - 0.5) * spreadX;
        const z = Math.sin(u * Math.PI * 2.2) * 18 + Math.cos(v * Math.PI * 1.4) * 12;

        positions[ptr * 3] = x;
        positions[ptr * 3 + 1] = y;
        positions[ptr * 3 + 2] = z;

        baseX[ptr] = x;
        baseY[ptr] = y;
        baseZ[ptr] = z;

        const yNorm = Math.abs(y / (spreadY * 0.5));
        const verticalFade = Math.max(0, 1 - Math.pow(yNorm, 1.8));

        // Blend from navy (edges) to blue-500 (centre)
        const t = verticalFade;
        colors[ptr * 3]     = 0.043 + (0.231 - 0.043) * t; // R
        colors[ptr * 3 + 1] = 0.118 + (0.510 - 0.118) * t; // G
        colors[ptr * 3 + 2] = 0.212 + (0.965 - 0.212) * t; // B

        sizes[ptr] = 2.8 + Math.random() * 2.8;

        seeds[ptr * 4]     = Math.random() * Math.PI * 2;
        seeds[ptr * 4 + 1] = 0.6 + Math.random() * 1.8;
        seeds[ptr * 4 + 2] = 0.15 + Math.random() * 0.85;
        seeds[ptr * 4 + 3] = verticalFade;
        ptr++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
    geometry.setAttribute("size",     new THREE.BufferAttribute(sizes,     1));
    geometry.setAttribute("seed",     new THREE.BufferAttribute(seeds,     4));

    const vertexShader = `
      attribute float size;
      attribute vec4 seed;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vSparkle;
      uniform float uTime;

      void main() {
        vColor = color;
        float twinkle = 0.45 + 0.55 * sin(uTime * seed.y + seed.x);
        float sparkle  = smoothstep(0.72, 1.0, twinkle) * seed.z;
        vSparkle = sparkle;

        vec3 pos = position;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float depthFade = smoothstep(-260.0, 140.0, pos.z);
        vAlpha = (0.08 + seed.w * 0.92) * (0.45 + twinkle * 0.55) * (0.65 + depthFade * 0.35);

        gl_PointSize = (size + sparkle * 6.0) * (520.0 / -mvPosition.z);
        gl_Position  = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vSparkle;

      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = length(c);
        float core  = smoothstep(0.32, 0.0, d);
        float glow  = smoothstep(0.85, 0.06, d);
        float alpha = (core * 0.95 + glow * (0.18 + vSparkle * 0.95)) * vAlpha;
        vec3 sparkleTint = mix(vColor, vec3(1.0), 0.12 + vSparkle * 0.55);
        gl_FragColor = vec4(sparkleTint, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent:  true,
      depthWrite:   false,
      depthTest:    true,
      blending:     THREE.NormalBlending,
      vertexColors: true,
      uniforms: { uTime: { value: 0 } },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();

    const animate = () => {
      if (!isAnimating) return;

      const time = clock.getElapsedTime();
      material.uniforms.uTime.value = time;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pointCount; i++) {
        const wave   = Math.sin(baseX[i] * 0.006 + time * 1.1 + baseY[i] * 0.002) * 16;
        const ripple = Math.cos(baseY[i] * 0.01  + time * 0.7 + baseX[i] * 0.0015) * 8;
        const room   = Math.sin(time * 0.35 + baseX[i] * 0.0012) * 6;
        pos[i * 3 + 2] = baseZ[i] + wave + ripple + room;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.x = Math.sin(time * 0.08) * 0.03;
      points.rotation.y = Math.cos(time * 0.06) * 0.05;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (!isAnimating) {
        renderer.render(scene, camera);
      }
    };

    const setSceneActive = (active: boolean) => {
      if (active === isAnimating) return;

      isAnimating = active;

      if (active) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      cancelAnimationFrame(frameId);
    };

    const cleanupVisibilityGate = createVisibilityGate({
      element: container,
      onChange: setSceneActive,
    });

    window.addEventListener("resize", onResize);

    return () => {
      cleanupVisibilityGate();
      window.removeEventListener("resize", onResize);
      setSceneActive(false);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
