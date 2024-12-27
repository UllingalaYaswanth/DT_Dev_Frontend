// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
// } from "@material-tailwind/react";
// import * as OV from 'online-3d-viewer';

// export function SubSection1({ goBack, towerDetails  }) {
//   if (!towerDetails) return err;
//   console.log("tower details:",towerDetails)
//   console.log("Antenna layout data:",towerDetails.siteId)
//   const userEmail = localStorage.getItem('userEmail');
//   const  objFilePath = './DamagedHelmet.glb';
  
//   console.log(objFilePath);
//   console.log('User email:', userEmail);

//   const [modelFiles, setModelFiles] = useState([]);

//   useEffect(() => {
//     const fetchModelFiles = async () => {
//       try {
//         const response = await fetch(`https://dt-dev-backend.onrender.com/api/models?email=${userEmail}`);
//         const files = await response.json();
//         setModelFiles(files);
//         console.log("backend",files)
//       } catch (error) {
//         console.error('Error fetching model files:', error);
//       }
//     };
//     fetchModelFiles();
//   }, [userEmail]); // Add userEmail as a dependency

//   useEffect(() => {
//     const initializeViewer = () => {
//       const parentDiv = document.getElementById('viewer-container');

//       if (!parentDiv) {
//         console.error('Viewer container not found');
//         return;
//       }

//       // Debugging: Check the OV object
//       console.log('OV object:', OV);

//       // Temporarily comment this out for debugging
//       // OV.SetExternalLibLocation('/libs');

//       const viewer = new OV.EmbeddedViewer(parentDiv, {
//         camera: new OV.Camera(
//           new OV.Coord3D(0, -50, 160),  // Initial camera position
//           new OV.Coord3D(0, 80, 0),     // Camera target position
//           new OV.Coord3D(0, 1, 0),      // Up direction
//           45.0
//         ),
//         backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
//         defaultColor: new OV.RGBColor(200, 200, 200),
//         edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1),
//         environmentSettings: new OV.EnvironmentSettings(
//           [
//             '/envmaps/fishermans_bastion/posx.jpg',
//             '/envmaps/fishermans_bastion/negx.jpg',
//             '/envmaps/fishermans_bastion/posy.jpg',
//             '/envmaps/fishermans_bastion/negy.jpg',
//             '/envmaps/fishermans_bastion/posz.jpg',
//             '/envmaps/fishermans_bastion/negz.jpg'
//           ],
//           false
//         )
//       });

//       // Load models dynamically based on their email-specific folder
//       const folderName = 
//         userEmail === 'admin@gmail.com' ? 'DADAL00398B_OBJ' :
//         userEmail === 'operator@gmail.com' ? '1' :
//         null;

//       if (!folderName) {
//         console.error('No folder found for the given email.');
//         return;
//       }

//       const modelUrls = modelFiles.map(file => `/${folderName}/Data/${file}`);
//       viewer.LoadModelFromUrlList(modelUrls);

//       viewer.LoadingCompletedCallback = () => {
//         if (viewer.FitToView) {
//           viewer.FitToView();
//         } else {
//           viewer.SetCameraPosition(new OV.Coord3D(0, 0, 5));
//           viewer.SetCameraTarget(new OV.Coord3D(0, 0, 0));
//           viewer.SetCameraUp(new OV.Coord3D(0, 1, 0));
//         }
//       };
//     };

//     if (modelFiles.length) {
//       initializeViewer();
//     }
//   }, [modelFiles]);

//   return (
//     <div>
//       <div className="px-4">    
//         <Typography variant="h4" className="mb-4">
//           TOWER DETAILS
//         </Typography>

//         <div className="mb-8">
//           <Typography variant="h4" className="mb-4">
//             3D-DRAWING
//           </Typography>
//           <Card className="p-4 h-auto grid md:grid-cols-2 gap-5">
//           <div className="border-2 p-3">
          
//           <div id="viewer-container" style={{ height: '500px', width: '100%'  }} ></div>
//             {/* <ThreeDModel objPath={objFilePath} /> */}
//           </div>
//              <div className=" border-2 p-3">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9540.195161595973!2d83.31283792915833!3d17.733152090034732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQzJzUzLjciTiA4M8KwMTknMDYuOSJF!5e1!3m2!1sen!2sin!4v1726925463570!5m2!1sen!2sin"
//                 width="100%"
//                 height="500"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Google Maps Location"
//               ></iframe>
//             </div>
//           </Card>
//         </div>
       
//       </div>
//     </div>
//   );
// }

// export default SubSection1;

import React, { useEffect } from "react";
import {
  Typography,
  Card,
} from "@material-tailwind/react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';

const GLBModel = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);

  useEffect(() => {
    // Iterate through all materials and adjust properties if necessary
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); // Clone material to avoid mutating the original
        child.material.needsUpdate = true;

        // Make sure the material uses a proper color and shading model
        child.material.metalness = 0.5; // Example, adjust based on your needs
        child.material.roughness = 0.5; // Adjust to get the desired effect
        child.material.emissive = new THREE.Color(0x000000); // Ensure no emissive light is applied
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={1} />;
};

export function SubSection1({ towerDetails  }) {

  const modelUrl = "https://digitaltwin-data.s3.ap-south-1.amazonaws.com/glb/KNTYS00322A_Model_2.glb";

  if (!towerDetails) return err;
  console.log("tower details:",towerDetails)
  console.log("Antenna layout data:",towerDetails.siteId)
  return (
    <div>
      <div className="px-4">    
        <Typography variant="h4" className="mb-4">
          TOWER DETAILS
        </Typography>

        <div className="mb-8">
          <Card className="p-4 h-auto grid md:grid-cols-2 gap-5">
          <div className="border-2 p-3">
          <Canvas camera={{ position: [0, -60, 80], fov: 60 }}>
            <ambientLight intensity={0.8} /> {/* Lowered intensity to avoid overexposure */}
            <directionalLight position={[5, 5, 5]} intensity={3.2} /> {/* Added intensity for better lighting */}
            <spotLight position={[0, 5, 0]} intensity={0.7} angle={Math.PI / 4} penumbra={1} /> {/* Add spot light */}
            <GLBModel url={modelUrl} />
            <OrbitControls />
          </Canvas>
          </div>
             <div className=" border-2 p-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9540.195161595973!2d83.31283792915833!3d17.733152090034732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQzJzUzLjciTiA4M8KwMTknMDYuOSJF!5e1!3m2!1sen!2sin!4v1726925463570!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </Card>
        </div>
       
      </div>
    </div>
  );
}

export default SubSection1;