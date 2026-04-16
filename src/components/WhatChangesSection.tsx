"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowRight, X, Check } from "lucide-react";
import { createVisibilityGate } from "@/lib/visibilityGate";
import FadeUp from "./FadeUp";

export default function WhatChangesSection() {
  const rows = [
    { before: "Blurry images", after: "Clean 360° view" },
    { before: "Missing context", after: "Full site visibility" },
    { before: "Manual effort", after: "Automated capture" },
    { before: "Slow reporting", after: "Real-time updates" },
    { before: "Scattered data", after: "Structured timeline" },
  ];

  return (
    <section className="relative w-full pt-4 pb-12 lg:pt-6 lg:pb-16 bg-brand-bg overflow-hidden">
      <ExtremeSideMesh />

      {/* Bottom Fade to White */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[5]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12">
        <FadeUp className="text-center mb-6 lg:mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight" style={{ filter: "blur(0.1px)" }}>
            Why it’s better
          </h2>
        </FadeUp>

        {/* Custom Glass Card Container */}
        <FadeUp delay={0.15} className="glass-card w-full">

          <div className="flex flex-col divide-y divide-gray-100/40 relative z-10">


            {/* List Rows */}
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_45px_1fr] lg:grid-cols-[1fr_80px_1fr] items-center px-4 lg:px-12 py-5 lg:py-5 group transition-colors cursor-default relative overflow-hidden"
              >

                {/* Subtle Right-Side Gradient Tint (Permanent + Hover enhancement) */}
                <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-blue-50/40 to-transparent group-hover:from-blue-50/70 transition-colors pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity pointer-events-none" />

                {/* Before Column */}
                <div className="flex items-center justify-end gap-3 relative z-10 w-full text-right pr-2 lg:pr-4">
                  <div className="hidden lg:flex flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 items-center justify-center bg-white/60 backdrop-blur-sm">
                    <X className="w-3 h-3 text-gray-500" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] lg:text-[16px] text-gray-800 font-serif font-light tracking-wide">
                    {row.before}
                  </span>
                </div>

                {/* Interactive Center Transition */}
                <div className="flex items-center justify-center relative z-10 w-full">
                  {/* Subtle horizontal connecting line */}
                  <div className="w-full h-[1px] bg-gray-300/40 absolute top-1/2 -mt-[0.5px]" />
                  {/* Elegant floating arrow breaking the line */}
                  <div className="bg-white/40 backdrop-blur-md rounded-full px-2 lg:px-3 py-1 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 relative z-10">
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" strokeWidth={2} />
                  </div>
                </div>

                {/* After Column (Emphasized) */}
                <div className="flex items-center gap-3 lg:gap-4 relative z-10 pl-2 lg:pl-4">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 items-center justify-center shadow-[0_2px_8px_-2px_rgba(59,130,246,0.15)] group-hover:bg-blue-100/60 group-hover:border-blue-200/60 transition-all duration-300 hidden sm:flex">
                    <Check className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] lg:text-[17px] text-brand-navy font-serif font-normal tracking-tight transition-colors group-hover:text-blue-950">
                    {row.after}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ExtremeSideMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let isAnimating = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    // Extreme side-on view
    // Pushed upwards to make it bigger and reach the top
    camera.position.set(0, 4.4, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const gridWidth = 118;
    const gridHeight = 28;
    const segX = 34;
    const segY = 16;

    const cols = segX + 1;
    const rows = segY + 1;
    const vertexCount = cols * rows;

    const positions = new Float32Array(vertexCount * 3);
    const original = new Float32Array(vertexCount * 3);

    const getIndex = (x: number, y: number) => y * cols + x;

    let ptr = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = (x / segX - 0.5) * gridWidth;
        const py = (y / segY - 0.5) * gridHeight;
        const pz = 0;

        positions[ptr] = px;
        positions[ptr + 1] = py;
        positions[ptr + 2] = pz;

        original[ptr] = px;
        original[ptr + 1] = py;
        original[ptr + 2] = pz;

        ptr += 3;
      }
    }

    const linePositions = [];

    // Horizontal quad lines only
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const a = getIndex(x, y) * 3;
        const b = getIndex(x + 1, y) * 3;

        linePositions.push(
          positions[a], positions[a + 1], positions[a + 2],
          positions[b], positions[b + 1], positions[b + 2]
        );
      }
    }

    // Vertical quad lines only
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols; x++) {
        const a = getIndex(x, y) * 3;
        const b = getIndex(x, y + 1) * 3;

        linePositions.push(
          positions[a], positions[a + 1], positions[a + 2],
          positions[b], positions[b + 1], positions[b + 2]
        );
      }
    }

    const lineArray = new Float32Array(linePositions);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(lineArray, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#7aa7ff"),
      transparent: true,
      opacity: 0.38,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    lines.rotation.x = -1.28;
    lines.rotation.z = Math.PI;
    lines.position.y = -2;
    lines.position.z = -4;
    scene.add(lines);

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.slice(), 3)
    );

    const pointMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#4f8cff"),
      size: 0.38,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    points.rotation.copy(lines.rotation);
    points.position.copy(lines.position);
    scene.add(points);

    const fadeCanvas = document.createElement("canvas");
    fadeCanvas.width = 256;
    fadeCanvas.height = 256;
    const fadeCtx = fadeCanvas.getContext("2d");
    if (fadeCtx) {
      const grad = fadeCtx.createLinearGradient(0, 256, 0, 0);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.08)");
      grad.addColorStop(0.68, "rgba(255,255,255,0.45)");
      grad.addColorStop(1, "rgba(255,255,255,1)");
      fadeCtx.fillStyle = grad;
      fadeCtx.fillRect(0, 0, 256, 256);
    }

    const fadeTexture = new THREE.CanvasTexture(fadeCanvas);
    const fadeMaterial = new THREE.MeshBasicMaterial({
      map: fadeTexture,
      transparent: true,
      depthWrite: false,
    });

    const fadePlane = new THREE.Mesh(new THREE.PlaneGeometry(220, 120), fadeMaterial);
    fadePlane.rotation.x = lines.rotation.x;
    fadePlane.rotation.z = lines.rotation.z;
    fadePlane.position.set(lines.position.x, lines.position.y + 13, lines.position.z - 16);
    scene.add(fadePlane);

    const ambient = new THREE.AmbientLight("#ffffff", 1);
    scene.add(ambient);

    const clock = new THREE.Clock();

    const updateWave = (t: number) => {
      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const x = original[i3];
        const y = original[i3 + 1];

        positions[i3 + 2] =
          Math.sin(x * 0.1 + t * 0.85) * 1.9 +
          Math.cos(y * 0.18 + t * 0.6) * 1.05;
      }

      const pointPos = pointGeometry.attributes.position.array as Float32Array;
      pointPos.set(positions);
      pointGeometry.attributes.position.needsUpdate = true;

      let lp = 0;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const a = getIndex(x, y) * 3;
          const b = getIndex(x + 1, y) * 3;

          lineArray[lp++] = positions[a];
          lineArray[lp++] = positions[a + 1];
          lineArray[lp++] = positions[a + 2];

          lineArray[lp++] = positions[b];
          lineArray[lp++] = positions[b + 1];
          lineArray[lp++] = positions[b + 2];
        }
      }

      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols; x++) {
          const a = getIndex(x, y) * 3;
          const b = getIndex(x, y + 1) * 3;

          lineArray[lp++] = positions[a];
          lineArray[lp++] = positions[a + 1];
          lineArray[lp++] = positions[a + 2];

          lineArray[lp++] = positions[b];
          lineArray[lp++] = positions[b + 1];
          lineArray[lp++] = positions[b + 2];
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      if (!isAnimating) return;

      const t = clock.getElapsedTime();
      updateWave(t);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);

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

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      lineGeometry.dispose();
      pointGeometry.dispose();
      lineMaterial.dispose();
      pointMaterial.dispose();
      fadePlane.geometry.dispose();
      fadeTexture.dispose();
      fadeMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="absolute -top-32 left-0 right-0 bottom-0 pointer-events-none" />;
}
