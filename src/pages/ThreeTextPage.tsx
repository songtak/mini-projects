import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";

const ThreeTextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("   Three.js\nSimple text.");
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
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(0, -400, 600);

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Font Loader
      const loader = new FontLoader();
      loader.load(
        "https://songtak.github.io/mini-projects/typeface/LEDLIGHT_Regular.typeface.json",
        (font: Font) => {
          setFontLoaded(font);
          renderText(font, message, scene);
        }
      );

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
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

    const color = 0x006699;

    const matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });

    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
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
    text.position.z = -150;
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div ref={mountRef} />
    </div>
  );
};

export default ThreeTextPage;
