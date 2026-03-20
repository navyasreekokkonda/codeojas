"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

export default function AIBackground() {

  const particles = useMemo(() => {
    const positions = new Float32Array(4000 * 3);

    for (let i = 0; i < 4000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return positions;
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Points positions={particles} stride={3}>
          <PointMaterial
            transparent
            color="#ff7a18"
            size={0.04}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </Canvas>
    </div>
  );
}