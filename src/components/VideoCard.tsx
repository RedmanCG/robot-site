"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { createVisibilityGate } from "@/lib/visibilityGate";

interface VideoCardProps {
  youtubeEmbedUrl?: string;
}

export default function VideoCard({
  youtubeEmbedUrl = "https://www.youtube.com/embed/_ECGc89jemc?autoplay=1&loop=1&playlist=_ECGc89jemc",
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-20 w-full pt-4 pb-16 lg:pb-32 -mt-2 lg:-mt-6">
      <PointCloudWaveBackground />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12">
        <div className="relative w-full p-2.5 sm:p-3 lg:p-4 rounded-[2.25rem] lg:rounded-[2.5rem] bg-gradient-to-b from-blue-50/40 to-blue-100/10 backdrop-blur-[32px] border border-blue-200/40 shadow-[0_80px_140px_-24px_rgba(11,30,54,0.25),0_20px_40px_-8px_rgba(11,30,54,0.15),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-1px_2px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(191,219,254,0.15)]">

          {/* Inner Media Container */}
          <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-2xl lg:rounded-[2rem] overflow-hidden bg-brand-navy border border-white/20 shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]"
          >
            {isPlaying && (
              <iframe
                src={youtubeEmbedUrl}
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover z-10 block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PointCloudWaveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let isAnimating = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 440);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(0, -8, -30);
    scene.add(group);

    const cols = 220;
    const rows = 84;
    const pointCount = cols * rows;
    const width = 980;
    const thickness = 320;

    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const sizes = new Float32Array(pointCount);

    const baseX = new Float32Array(pointCount);

    let p = 0;
    for (let row = 0; row < rows; row++) {
      const v = row / (rows - 1);
      const spread = (v - 0.5) * thickness;

      for (let col = 0; col < cols; col++) {
        const u = col / (cols - 1);
        const x = (u - 0.5) * width;

        positions[p * 3] = x;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = spread;

        baseX[p] = x;

        const fadeTopBottom = Math.pow(Math.sin(v * Math.PI), 1.35);
        const colorStrength = 0.45 + fadeTopBottom * 0.55;
        colors[p * 3] = 0.12 * colorStrength;
        colors[p * 3 + 1] = 0.58 * colorStrength;
        colors[p * 3 + 2] = 1.0 * colorStrength;

        sizes[p] = 2.4 + Math.pow(fadeTopBottom, 1.35) * 6.8;
        p++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float depthFade = smoothstep(-320.0, 180.0, position.z);
        vAlpha = 0.28 + depthFade * 0.72;
        gl_PointSize = size * (320.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = length(c);

        float core = smoothstep(0.34, 0.0, d);
        float glow = smoothstep(0.78, 0.12, d);
        float alpha = (core * 0.9 + glow * 0.22) * vAlpha;
        vec3 finalColor = mix(vColor, vec3(1.0), glow * 0.16);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const clock = new THREE.Clock();

    const updatePoints = (time: number) => {
      const arr = geometry.attributes.position.array as Float32Array;

      for (let row = 0; row < rows; row++) {
        const v = row / (rows - 1);
        const rowPhase = row * 0.085;
        const edgeFade = Math.pow(Math.sin(v * Math.PI), 1.5);
        const bandOffset = (v - 0.5) * thickness;

        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const x = baseX[i];
          const u = col / (cols - 1);

          const primary = Math.sin(u * Math.PI * 2.45 - 0.55 + time * 1.05 + rowPhase) * 52;
          const secondary = Math.sin(u * Math.PI * 5.1 + time * 0.72 + rowPhase * 1.7) * 16;
          const tertiary = Math.cos(u * Math.PI * 1.35 + time * 0.34) * 10;
          const y = (primary + secondary + tertiary) * (0.48 + edgeFade * 0.72);

          const zWave = Math.cos(u * Math.PI * 2.1 + time * 0.82 + rowPhase) * 26;
          const zTwist = Math.sin(u * Math.PI * 4.3 + time * 0.46 + rowPhase * 1.3) * 10;
          const z = bandOffset + zWave + zTwist;

          arr[i * 3] = x;
          arr[i * 3 + 1] = y;
          arr[i * 3 + 2] = z;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      group.rotation.x = -0.18 + Math.sin(time * 0.22) * 0.04;
      group.rotation.y = Math.sin(time * 0.18) * 0.18;
      group.rotation.z = Math.sin(time * 0.12) * 0.03;
    };

    const animate = () => {
      if (!isAnimating) return;

      const time = clock.getElapsedTime();
      updatePoints(time);
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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 160px)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 160px)'
      }}
    />
  );
}
