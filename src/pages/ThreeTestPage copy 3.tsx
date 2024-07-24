import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three/src/extras/PMREMGenerator.js";
// import ddd from '../../public/textures/syferfontein_1d_clear_puresky_4k.hdr'

const ThreeTestPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container: HTMLDivElement;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const init = () => {
      container = mountRef.current!;
      container.innerHTML = "";

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      );
      camera.position.z = 3;

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      window.addEventListener("resize", onWindowResize);

      const pmremGenerator = new PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      const rgbeLoader = new RGBELoader();

      console.log("rgbeLoader", rgbeLoader);

      rgbeLoader.setDataType(THREE.UnsignedByteType);

      rgbeLoader.setResourcePath("/textures/");
      rgbeLoader.load("syferfontein_1d_clear_puresky_4k.hdr", (texture) => {
        const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
        const envMap = hdrCubeRenderTarget.texture;

        scene.background = envMap;
        scene.environment = envMap;

        // Test sphere to visualize the environment map
        const geometry = new THREE.SphereGeometry(0.5, 32, 16);
        const material = new THREE.MeshStandardMaterial({
          envMap: envMap,
          metalness: 1.0,
          roughness: 0.1,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });

      console.log("rgbeLoader", rgbeLoader);

      renderer.setAnimationLoop(animate);
    };

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
      />
    </>
  );
};

export default ThreeTestPage;
