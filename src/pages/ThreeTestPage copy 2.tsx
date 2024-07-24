import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ParallaxBarrierEffect } from "three/examples/jsm/effects/ParallaxBarrierEffect";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three/src/extras/PMREMGenerator.js";

const ThreeTestPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container: HTMLDivElement;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let effect: ParallaxBarrierEffect;

    const spheres: THREE.Mesh[] = [];
    let mouseX = 0;
    let mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      effect.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      const timer = 0.0001 * Date.now();

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      for (let i = 0, il = spheres.length; i < il; i++) {
        const sphere = spheres[i];
        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);
      }

      effect.render(scene, camera);
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

      // 배경색을 흰색으로 설정
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      effect = new ParallaxBarrierEffect(renderer);
      effect.setSize(window.innerWidth, window.innerHeight);

      document.addEventListener("mousemove", onDocumentMouseMove);
      window.addEventListener("resize", onWindowResize);

      const pmremGenerator = new PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      const rgbeLoader = new RGBELoader();
      rgbeLoader.setPath("/textures/"); // HDRI 파일의 경로 설정
      rgbeLoader.load("syferfontein_1d_clear_puresky_4k.hdr", (texture) => {
        const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
        const envMap = hdrCubeRenderTarget.texture;
        scene.background = envMap;
        scene.environment = envMap;

        // 텍스처 로드
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(
          "/textures/Metal012_4K-PNG_Color.png"
        );
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

        const geometry = new THREE.SphereGeometry(0.1, 32, 16);
        const material = new THREE.MeshStandardMaterial({
          map: colorMap,
          metalnessMap: metalnessMap,
          roughnessMap: roughnessMap,
          normalMap: normalMap,
          displacementMap: displacementMap,
          metalness: 1.0,
          roughness: 0.1,
          envMap: envMap, // 환경 맵을 구체에 반사하도록 설정
        });

        for (let i = 0; i < 500; i++) {
          const mesh = new THREE.Mesh(geometry, material);

          mesh.position.x = Math.random() * 10 - 5;
          mesh.position.y = Math.random() * 10 - 5;
          mesh.position.z = Math.random() * 10 - 5;

          mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

          scene.add(mesh);
          spheres.push(mesh);
        }
      });

      renderer.setAnimationLoop(animate);
    };

    init();

    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <>
      <div style={{ zIndex: 2, position: "absolute" }}>s o n g t a k</div>
      <div
        ref={mountRef}
        style={{
          width: "60%",
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
