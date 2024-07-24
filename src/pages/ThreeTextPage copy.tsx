import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";

const ThreeTextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("songtak");
  const [fontLoaded, setFontLoaded] = useState<Font | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer;

    function init() {
      // Camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / (window.innerHeight * 0.8),
        1,
        10000
      );
      camera.position.set(0, -400, 600);

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      // Font Loader
      const loader = new FontLoader();
      loader.load(
        "https://songtak.github.io/mini-projects/typeface/BlueScreenPersonalUse_Regular.json",
        (font: Font) => {
          setFontLoaded(font);
          renderText(font, message, scene);
        }
      );

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight * 0.85);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
      controls.addEventListener("change", render);

      window.addEventListener("resize", onWindowResize);

      setScene(scene);
      setRenderer(renderer);
      setCamera(camera);
    }

    function onWindowResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / (window.innerHeight * 0.85);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight * 0.85);
        render();
      }
    }

    function render() {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const renderText = (font: Font, message: string, scene: THREE.Scene) => {
    if (!scene) return;

    const color = 0xf77d1c;

    const matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });

    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const shapes = font.generateShapes(message, 100);
    const geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();
    const xMid =
      -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
    geometry.translate(xMid, 0, 0);

    // Clear previous text
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    // Make shape
    const text = new THREE.Mesh(geometry, matLite);
    text.position.z = -10;
    text.rotation.z = Math.PI / 2; // Rotate 90 degrees to the right
    scene.add(text);

    // Make line shape
    const holeShapes: THREE.Shape[] = [];

    shapes.forEach((shape) => {
      if (shape.holes && shape.holes.length > 0) {
        shape.holes.forEach((hole: any) => holeShapes.push(hole));
      }
    });

    shapes.push(...holeShapes);
    const lineText = new THREE.Object3D();

    shapes.forEach((shape) => {
      const points = shape.getPoints();
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometry.translate(xMid, 0, 0);

      const lineMesh = new THREE.Line(lineGeometry, matDark);
      lineMesh.rotation.z = Math.PI / 2; // Rotate 90 degrees to the right
      lineText.add(lineMesh);
    });

    scene.add(lineText);

    if (renderer && camera) {
      renderer.render(scene, camera);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (fontLoaded && scene) {
      renderText(fontLoaded, message, scene);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        zIndex: 2,
        position: "absolute",
        left: "0px",
        top: "0px",
        marginTop: "24px",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          maxLength={20}
          style={{ marginRight: "8px" }}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            outline: "none",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
      <div ref={mountRef} style={{ width: "100vw", height: "80vh" }} />
      <div
        style={{
          position: "absolute",
          // left: "0px",
          bottom: "36px",
          right: "24px",
        }}
      >
        s o n g t a k
      </div>
    </div>
  );
};

export default ThreeTextPage;
