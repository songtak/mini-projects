import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Ball = ({
  position,
  colorMap,
  metalnessMap,
  roughnessMap,
  normalMap,
  displacementMap,
}: any) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial
        map={colorMap}
        metalnessMap={metalnessMap}
        roughnessMap={roughnessMap}
        normalMap={normalMap}
        displacementMap={displacementMap}
      />
    </mesh>
  );
};

const ThreeTestPage = () => {
  const textureLoader = new THREE.TextureLoader();
  const colorMap = textureLoader.load("/textures/Metal012_4K-PNG_Color.png");
  const metalnessMap = textureLoader.load(
    "/textures/Metal012_4K-PNG_Metalness.png"
  );
  const roughnessMap = textureLoader.load(
    "/textures/Metal012_4K-PNG_Roughness.png"
  );
  const normalMap = textureLoader.load(
    "/textures/Metal012_4K-PNG_NormalGL.png"
  );
  const displacementMap = textureLoader.load(
    "/textures/Metal012_4K-PNG_Displacement.png"
  );

  return (
    <>
      <img src="../../assets/three/Metal012_4K-PNG_Color.png" />
      <Canvas style={{ height: 400, width: 600 }}>
        <Suspense fallback={null}>
          <Ball
            key={`ball-0`}
            position={[-4 + 2 * 0, 0, 0]}
            colorMap={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            displacementMap={displacementMap}
          />
          <Ball
            key={`ball-1`}
            position={[-4 + 2 * 1, 0, 0]}
            colorMap={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            displacementMap={displacementMap}
          />
          <Ball
            key={`ball-2`}
            position={[-4 + 2 * 2, 0, 0]}
            colorMap={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            displacementMap={displacementMap}
          />
          <Ball
            key={`ball-3`}
            position={[-4 + 2 * 3, 0, 0]}
            colorMap={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            displacementMap={displacementMap}
          />
          <Ball
            key={`ball-4`}
            position={[-4 + 2 * 4, 0, 0]}
            colorMap={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            displacementMap={displacementMap}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ThreeTestPage;
