import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ThreeGalleryPage = () => {
  const Artwork = ({ position, imageUrl }: any) => {
    const texture = useLoader(THREE.TextureLoader, imageUrl) as THREE.Texture;

    return (
      <mesh position={position}>
        <planeGeometry args={[2, 3]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    );
  };

  return (
    <Canvas style={{ height: "100vh", background: "lightgray" }}>
      {/* 카메라와 컨트롤러 */}
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* 전시장 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* 전시된 작품들 */}
      {/* <Artwork position={[-4, 0, 0]} imageUrl="KakaoTalk_Photo_2024-09-20-18-54-09 001.jpeg" /> */}
      {/* <Artwork position={[0, 0, 0]} imageUrl="path_to_image2.jpg" />
      <Artwork position={[4, 0, 0]} imageUrl="path_to_image3.jpg" /> */}
    </Canvas>
  );
};

export default ThreeGalleryPage;
