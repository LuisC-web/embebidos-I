import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface View3DProps {
  /** Tailwind width classes or custom className for width */
  widthClassName?: string;
  /** Tailwind height classes or custom className for height */
  heightClassName?: string;
  /** Optional inline style for width and height, overrides classes */
  style?: React.CSSProperties;
}

const View3D: React.FC<View3DProps> = ({
  widthClassName = "w-full",
  heightClassName = "h-full",
  style,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    const { clientWidth: w, clientHeight: h } = mount;
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0x404040);
    scene.add(ambLight);

    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      renderer.setSize(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    let reqId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`${widthClassName} ${heightClassName} border border-gray-200 rounded-sm`}
      style={style}
    />
  );
};

export default View3D;
