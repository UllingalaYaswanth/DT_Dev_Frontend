import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDModel = ({ objPath }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 656.5 / 370, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: false });

    // Set background color to white
    renderer.setClearColor(0x101010, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Save refs
    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increased intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increased intensity
    scene.add(directionalLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(objPath, (gltf) => {
      scene.add(gltf.scene);

      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      // Optionally, you can set an offset here
      const offset = new THREE.Vector3(300, 10, 400); // Adjust this offset as needed

      // Reposition the model based on the center and the offset
      gltf.scene.position.sub(center).add(offset);

      // Set camera position based on the size of the model
      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.z = size * 1.5;

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissiveIntensity = 2.5;
          child.material.color.multiplyScalar(8.5);
        }
      });
    }, undefined, (error) => {
      console.error('An error happened while loading the model:', error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [objPath]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} className='flex items-center justify-center' />;
};

export default ThreeDModel;
