import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import ExcelImage from './img/excel.webp';
import ObjImage from './img/obj.png';
import LazImage from './img/laz.avif';
import KmlImage from './img/kml.webp';
import PdfImage from './img/pdf.webp';

import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import img from './img/tower.png'
import swingImage from './img/swing.png';
import mountsImage from './img/mount.png';
import sector from './img/mountssector.png';

export function Messages() {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const handleOpen = (field) => {
    setSelectedField(field);
    setOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles([selectedFile]);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = files[0];
    const fileName = file.name;

    // Construct file path based on selected field and file name
    let path = '/';
    switch (selectedField) {
      case "Excel file":
        path += 'excel/';
        break;
      case "Obj file":
        path += 'obj/';
        break;
      case "Laz file":
        path += 'laz/';
        break;
      case "kml file":
        path += 'kml/';
        break;
      case "pdf file":
        path += 'pdf/';
        break;
      default:
        path += 'unknown/';
    }
    path += fileName;

    try {
      // Mock upload to Dropbox
      // Replace with actual upload logic
      console.log(`Uploading ${fileName} to ${path}`);

      // Send file details to backend
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: fileName,
          path: path,
          tags: tags,
          // Add additional metadata as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save file details to the database');
      }

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const cardData = [
    { name: "Excel file", img: ExcelImage },
    { name: "Obj file", img: ObjImage },
    { name: "Laz file", img: LazImage },
    { name: "kml file", img: KmlImage },
    { name: "pdf file", img: PdfImage },
  ];




  // excel data----------------------------------------------------------------------------------------

  const [excel,setExcel] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()


  const handleExcelOpen = () => {
    navigate()
    setExcel(true);
  }



  const [asBuiltData, setAsBuiltData] = useState({
    siteId: '',
    reportVersion: '',
    scanDate: '',
    mountLevel: '',
    a2RadCenter: '',
    a2Azimuth: '',
    a2MechTilt: '',
    b2RadCenter: '',
    b2Azimuth: '',
    b2MechTilt: '',
    c2RadCenter: '',
    c2Azimuth: '',
    c2MechTilt: ''
  });

  const [swingData, setSwingData] = useState({
    a2RadCenter: '',
    a2Azimuth: '',
    a2MechTilt: '',
    a2Skew: '',
    a2AntSwingAngleNeg: '',
    a2AntSwingAnglePos: '',
    b2RadCenter: '',
    b2Azimuth: '',
    b2MechTilt: '',
    b2Skew: '',
    b2AntSwingAngleNeg: '',
    b2AntSwingAnglePos: '',
    c2RadCenter: '',
    c2Azimuth: '',
    c2MechTilt: '',
    c2Skew: '',
    c2AntSwingAngleNeg: '',
    c2AntSwingAnglePos: ''
  });

  const [mountsData, setMountsData] = useState({
    sAp1size:'',
    sAp1length:'',
    sAp2size:'',
    sAp2length:'',
    sAAdim:'',
    sABdim:'',
    sACdim:'',
    sADdim:'',
    sAEdim:'',
    sAFdim:'',
    sBp1size:'',
    sBp1length:'',
    sBp2size:'',
    sBp2length:'',
    sBAdim:'',
    sBBdim:'',
    sBCdim:'',
    sBDdim:'',
    sBEdim:'',
    sBFdim:'',
    sCp1size:'',
    sCp1length:'',
    sCp2size:'',
    sCp2length:'',
    sCAdim:'',
    sCBdim:'',
    sCCdim:'',
    sCDdim:'',
    sCEdim:'',
    sCFdim:'',
  });


  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setAsBuiltData({
      ...asBuiltData,
      [e.target.id]: e.target.value
    });
  };

  const handleSwingChange = (e) => {
    setSwingData({
      ...swingData,
      [e.target.id]: e.target.value
    });
  };

  const handleMountsChange = (e) => {
    setMountsData({
      ...mountsData,
      [e.target.id]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleClose = (e) =>{
    setExcel(false)
  }

  const handleSave = async () => {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Antenna Layout');
  
    // Add static data from state
    worksheet.addRow(["Site ID:", asBuiltData.siteId || '']);
    worksheet.addRow(["Report Version:", asBuiltData.reportVersion || '']);
    worksheet.addRow(["Scan Date:", asBuiltData.scanDate || '']);
    worksheet.addRow(["Mount Level:", asBuiltData.mountLevel || '']);
  
    // Add space after static data
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
  
    // Define column widths
    worksheet.columns = [
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 5 },
      { width: 47 }
    ];
  
    // Add Design Data
    worksheet.addRow(["Antenna Layout (Design)"]);
    worksheet.addRow(["Position", "Type", "Qty.", "Manufacturer", "Model No.", "Rad Center (ft)", "Azimuth (deg)", "Mech Tilt (deg)"]);
    worksheet.addRow(["C1", "Antenna", 1, "JMA", "MX08FR0665-21", 75, 0, 0.0]);
    worksheet.addRow(["A1", "Antenna", 1, "JMA", "MX08FR0665-21", 75, 120, 0.0]);
    worksheet.addRow(["B1", "Antenna", 1, "JMA", "MX08FR0665-21", 75, 240, 0.0]);
    worksheet.addRow(["A1", "RRH", 1, "FUJITSU", "TA8025-B604", null, null, null]);
    worksheet.addRow(["B1", "RRH", 1, "FUJITSU", "TA8025-B605", null, null, null]);
    worksheet.addRow(["C1", "RRH", 1, "FUJITSU", "TA8025-B604", null, null, null]);
    worksheet.addRow(["A2", "RRH", 1, "FUJITSU", "TA8025-B605", null, null, null]);
    worksheet.addRow(["OVP", null, 1, "RAYCAP", "RDIDC-9181-PF-48", null, null, null]);
  
    // Add space between Design Data and As-Built Data
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
  
    // Add As-Built Data
    worksheet.mergeCells('A10:J10');
    worksheet.getCell('A10').value = 'Antenna Layout (Design)';
    worksheet.getCell('A10').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('A10').font = { bold: true, color: { argb: '000000' } };
    worksheet.getCell('A10').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' } // Gray color
    };
  
    worksheet.addRow(["Antenna Layout (As-Built)"], { hidden: true });
    worksheet.addRow(["Position", "Type", "Qty.", "Manufacturer", "Model No.", "Rad Center (ft)", "Azimuth (deg)", "Mech Tilt (deg)"], { hidden: true });
    worksheet.addRow(["A2", "Antenna", 1, "JMA", "MX08FR0665-21", asBuiltData.a2RadCenter || 'N/A', asBuiltData.a2Azimuth || 'N/A', asBuiltData.a2MechTilt || 'N/A']);
    worksheet.addRow(["B2", "Antenna", 1, "JMA", "MX08FR0665-21", asBuiltData.b2RadCenter || 'N/A', asBuiltData.b2Azimuth || 'N/A', asBuiltData.b2MechTilt || 'N/A']);
    worksheet.addRow(["C2", "Antenna", 1, "JMA", "MX08FR0665-21", asBuiltData.c2RadCenter || 'N/A', asBuiltData.c2Azimuth || 'N/A', asBuiltData.c2MechTilt || 'N/A']);
    worksheet.addRow(["A2", "RRH", 1, "FUJITSU", "TA8025-B604", null, null, null]);
    worksheet.addRow(["B2", "RRH", 1, "FUJITSU", "TA8025-B605", null, null, null]);
    worksheet.addRow(["C2", "RRH", 1, "FUJITSU", "TA8025-B604", null, null, null]);
    worksheet.addRow(["OVP", null, 1, "RAYCAP", "RDIDC-9181-PF-48", null, null, null]);
  
    worksheet.mergeCells('A24:J24');
    worksheet.getCell('A24').value = 'Antenna Layout (As-Built)';
    worksheet.getCell('A24').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('A24').font = { color: { argb: 'FFFFFFFF' }, bold: true };
    worksheet.getCell('A24').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
  
    // Add space below As-Built Data
    worksheet.addRow([]);
    worksheet.addRow([]);
  
    // Add images side by side
    const addImage = async (image, position, row) => {
      if (!image) return;
      const imageId = workbook.addImage({
        buffer: await image.arrayBuffer(),
        extension: image.type.split('/')[1]
      });
      worksheet.addImage(imageId, {
        tl: { col: position === 'left' ? 9 : 22, row: row },
        ext: { width: 330, height: 230 }
      });
    };
  
    // Hardcoded image
    const hardcodedImage = new Image();
    hardcodedImage.src = img;
    const imageBuffer = await fetch(hardcodedImage.src).then(res => res.arrayBuffer());
    const hardcodedImageId = workbook.addImage({
      buffer: imageBuffer,
      extension: 'png'
    });
    worksheet.addImage(hardcodedImageId, {
      tl: { col: 9, row: 10 },
      ext: { width: 330, height: 230 }
    });
  
    // User input image
    await addImage(imageFile, 'left', 24);


  //swing----------------------------------

  const swingSheet = workbook.addWorksheet('Antenna Swing');
  swingSheet.addRow(["Site ID:", asBuiltData.siteId || '']);
  swingSheet.addRow(["Report Version:", asBuiltData.reportVersion || '']);
  swingSheet.addRow(["Scan Date:", asBuiltData.scanDate || '']);
  swingSheet.addRow(["Mount Level:", asBuiltData.mountLevel || '']);

  // Add space after static data
  swingSheet.addRow([]);
  swingSheet.addRow([]);
  swingSheet.addRow([]);
   // Fetch the image and convert it to a Blob
   const response = await fetch(swingImage);
   const blob = await response.blob();
 
   // Create an ArrayBuffer from the Blob
   const arrayBuffer = await blob.arrayBuffer();

    // Add the image to the workbook
    const imageId = workbook.addImage({
      buffer: arrayBuffer, // Directly use ArrayBuffer
      extension: 'png',
    });
   swingSheet.addImage(imageId, 'A5:G25'); // Adjust the cell range as needed
   
   swingSheet.columns = [
    { width: 15 },
    { width: 20 },
    { width: 8 },
    { width: 8 },
    { width: 0 },
    { width: 10 },
    { width: 0 },
    { width: 0},
    { width: 0},
    { width: 20 },
    { width: 17 },
    { width: 17 },
    { width: 17 },
    { width: 17 },
    { width: 17 },
    { width: 17 },
  ];
   
  swingSheet.mergeCells('J5:P5');
  swingSheet.getCell('J5').value = 'Antenna Swing Limit';
  swingSheet.getCell('J5').alignment = { horizontal: 'center', vertical: 'middle' };
  swingSheet.getCell('J5').font = { color: { argb: '000000' }, bold: true };

  // Minimum swing angle tolerance-----------------------
  swingSheet.mergeCells('J22:O22');
  swingSheet.getCell('J22').value = 'Minimum Swing Angle Tolerance = ';
  swingSheet.getCell('J22').alignment = { horizontal: 'center', vertical: 'middle' };
  swingSheet.getCell('J22').font = { color: { argb: '000000' }, bold: true };


  // warning-----------------------------------------

  swingSheet.mergeCells('J23:P25');
  swingSheet.getCell('J23').value = '* If available Swing Angle is less than "Minimum Swing Angle Tolerance" in either direction, cell will be highlighted in "RED"';
  swingSheet.getCell('J23').alignment = { horizontal: 'center', vertical: 'middle' };
  swingSheet.getCell('J23').font = { color: { argb: 'ff0000' }, bold: true };

  // Add Antenna Swing Limit data starting from cell 'D5'
  swingSheet.getCell('J5').value = "Antenna Swing Limit";
  swingSheet.getCell('J6').value = "Position";
  swingSheet.getCell('K6').value = "Rad Center (ft)";
  swingSheet.getCell('L6').value = "Azimuth (deg)";
  swingSheet.getCell('M6').value = "Mech Tilt (deg)";
  swingSheet.getCell('N6').value = "Skew (deg)";
  swingSheet.getCell('O6').value = "Ant Swing Angle (- deg)";
  swingSheet.getCell('P6').value = "Ant Swing Angle (+ deg)";
  
  // Populating the rows with the corresponding data
  swingSheet.getCell('J7').value = "A2";
  swingSheet.getCell('K7').value = swingData.a2RadCenter || 'N/A';
  swingSheet.getCell('L7').value = swingData.a2Azimuth || 'N/A';
  swingSheet.getCell('M7').value = swingData.a2MechTilt || 'N/A';
  swingSheet.getCell('N7').value = swingData.a2Skew || 'N/A';
  swingSheet.getCell('O7').value = swingData.a2AntSwingAngleNeg || 'N/A';
  swingSheet.getCell('P7').value = swingData.a2AntSwingAnglePos || 'N/A';
  
  swingSheet.getCell('J8').value = "B2";
  swingSheet.getCell('K8').value = swingData.b2RadCenter || 'N/A';
  swingSheet.getCell('L8').value = swingData.b2Azimuth || 'N/A';
  swingSheet.getCell('M8').value = swingData.b2MechTilt || 'N/A';
  swingSheet.getCell('N8').value = swingData.b2Skew || 'N/A';
  swingSheet.getCell('O8').value = swingData.b2AntSwingAngleNeg || 'N/A';
  swingSheet.getCell('P8').value = swingData.b2AntSwingAnglePos || 'N/A';
  
  swingSheet.getCell('J9').value = "C2";
  swingSheet.getCell('K9').value = swingData.c2RadCenter || 'N/A';
  swingSheet.getCell('L9').value = swingData.c2Azimuth || 'N/A';
  swingSheet.getCell('M9').value = swingData.c2MechTilt || 'N/A';
  swingSheet.getCell('N9').value = swingData.c2Skew || 'N/A';
  swingSheet.getCell('O9').value = swingData.c2AntSwingAngleNeg || 'N/A';
  swingSheet.getCell('P9').value = swingData.c2AntSwingAnglePos || 'N/A';
  swingSheet.getCell('P9').value = swingData.c2AntSwingAnglePos || 'N/A';
  swingSheet.getCell('P22').value = "20 degree";
  
// end of antenna swing----------------------------------------------------

// start of mounts------------------------------------------------------------

const mountsSheet = workbook.addWorksheet('Mounts')

mountsSheet.addRow(["Site ID:", asBuiltData.siteId || '']);
mountsSheet.addRow(["Report Version:", asBuiltData.reportVersion || '']);
mountsSheet.addRow(["Scan Date:", asBuiltData.scanDate || '']);
mountsSheet.addRow(["Mount Level:", asBuiltData.mountLevel || '']);

mountsSheet.addRow([]);
mountsSheet.addRow([]);
mountsSheet.addRow([]);

   const mountsresponse = await fetch(mountsImage);
   const mountsblob = await mountsresponse.blob();
 
   // Create an ArrayBuffer from the Blob
   const mountsarrayBuffer = await mountsblob.arrayBuffer();

    // Add the image to the workbook
    const mountsimageId = workbook.addImage({
      buffer: mountsarrayBuffer, // Directly use ArrayBuffer
      extension: 'png',
    });
    mountsSheet.addImage(mountsimageId, 'B7:F20'); 

    mountsSheet.columns = [
      { width: 15},
      { width: 15},
      { width: 10},
      { width: 10},
      { width: 10},
      { width: 10},
      { width: 10},
      { width: 13},
      { width: 13},
      { width: 13},
    ]
    const sectorresponse = await fetch(sector);
    const sectorblob = await sectorresponse.blob();
  
    // Create an ArrayBuffer from the Blob
    const sectorarrayBuffer = await sectorblob.arrayBuffer();
 
     // Add the image to the workbook
     const sectorimageId = workbook.addImage({
       buffer: sectorarrayBuffer, // Directly use ArrayBuffer
       extension: 'png',
     });
     mountsSheet.addImage(sectorimageId, 'B23:F36'); 

     // Antenna Mount

        mountsSheet.getCell('I9').value = 'Design'
        mountsSheet.getCell('J9').value = 'Installed'
        mountsSheet.getCell('H10').value = 'Manufacturer:'
        mountsSheet.getCell('I10').value = 'Sabre'
        mountsSheet.getCell('J10').value = 'Sabre'
        mountsSheet.getCell('H11').value = 'Model:'
        mountsSheet.getCell('I11').value = 'C10956201DP'
        mountsSheet.getCell('J11').value = 'C10956201DP'
      
        mountsSheet.mergeCells('H8:J8');
        mountsSheet.getCell('H8').value = 'Antenna Mount:';
        mountsSheet.getCell('H8').alignment = { horizontal: 'center', vertical: 'middle' };
        mountsSheet.getCell('H8').font = { color: { argb: '000000' }, bold: true };
              
        mountsSheet.mergeCells('H23:K23');
        mountsSheet.getCell('H23').value = 'Sector A';
        mountsSheet.getCell('H23').alignment = { horizontal: 'center', vertical: 'middle' };
        mountsSheet.getCell('H23').font = { color: { argb: 'ff0000' }, bold: true };
              
        mountsSheet.mergeCells('M23:P23');
        mountsSheet.getCell('M23').value = 'Sector B';
        mountsSheet.getCell('M23').alignment = { horizontal: 'center', vertical: 'middle' };
        mountsSheet.getCell('M23').font = { color: { argb: 'ff0000' }, bold: true };
              
        mountsSheet.mergeCells('R23:U23');
        mountsSheet.getCell('R23').value = 'Sector B';
        mountsSheet.getCell('R23').alignment = { horizontal: 'center', vertical: 'middle' };
        mountsSheet.getCell('R23').font = { color: { argb: 'ff0000' }, bold: true };

     // sector A 

     mountsSheet.getCell('H23').value = 'Sector A'

     mountsSheet.getCell('H24').value = 'Member Schedule:';
     mountsSheet.getCell('H25').value = 'Mark';
     mountsSheet.getCell('I25').value = 'Type';
     mountsSheet.getCell('J25').value = 'Size';
     mountsSheet.getCell('K25').value = 'Length';

     mountsSheet.getCell('H26').value = 'P1';
     mountsSheet.getCell('I26').value = 'Pipe';
     mountsSheet.getCell('J26').value = mountsData.sAp1size || 'N/A';
     mountsSheet.getCell('K26').value = mountsData.sAp1length || 'N/A';
     mountsSheet.getCell('H27').value = 'P2';
     mountsSheet.getCell('I27').value = 'Pipe';
     mountsSheet.getCell('J27').value = mountsData.sAp2size || 'N/A';
     mountsSheet.getCell('K27').value = mountsData.sAp2length || 'N/A';

     mountsSheet.getCell('H31').value = 'Dimensions';
     mountsSheet.getCell('H32').value = 'Mark';
     mountsSheet.getCell('I32').value = 'Dim(ft)';
     mountsSheet.getCell('H33').value = 'A';
     mountsSheet.getCell('I33').value = mountsData.sAAdim || 'N/A';
     mountsSheet.getCell('H34').value = 'B';
     mountsSheet.getCell('I34').value = mountsData.sABdim || 'N/A';
     mountsSheet.getCell('H35').value = 'C';
     mountsSheet.getCell('I35').value = mountsData.sACdim || 'N/A';
     mountsSheet.getCell('H36').value = 'D';
     mountsSheet.getCell('I36').value = mountsData.sADdim || 'N/A';
     mountsSheet.getCell('H37').value = 'E';
     mountsSheet.getCell('I37').value = mountsData.sAEdim || 'N/A';
     mountsSheet.getCell('H38').value = 'F';
     mountsSheet.getCell('I38').value = mountsData.sAFdim || 'N/A';

     // SECTOR B

     mountsSheet.getCell('M23').value = 'Sector B'

     mountsSheet.getCell('M24').value = 'Member Schedule:';
     mountsSheet.getCell('M25').value = 'Mark';
     mountsSheet.getCell('N25').value = 'Type';
     mountsSheet.getCell('O25').value = 'Size';
     mountsSheet.getCell('P25').value = 'Length';

     mountsSheet.getCell('M26').value = 'P1';
     mountsSheet.getCell('N26').value = 'Pipe';
     mountsSheet.getCell('O26').value = mountsData.sBp1size || 'N/A';
     mountsSheet.getCell('P26').value = mountsData.sBp1length || 'N/A';
     mountsSheet.getCell('M27').value = 'P2';
     mountsSheet.getCell('N27').value = 'Pipe';
     mountsSheet.getCell('O27').value = mountsData.sBp2size || 'N/A';
     mountsSheet.getCell('P27').value = mountsData.sBp2length || 'N/A';

     mountsSheet.getCell('M31').value = 'Dimensions';
     mountsSheet.getCell('M32').value = 'Mark';
     mountsSheet.getCell('N32').value = 'Dim(ft)';
     mountsSheet.getCell('M33').value = 'A';
     mountsSheet.getCell('N33').value = mountsData.sBAdim || 'N/A';
     mountsSheet.getCell('M34').value = 'B';
     mountsSheet.getCell('N34').value = mountsData.sBBdim || 'N/A';
     mountsSheet.getCell('M35').value = 'C';
     mountsSheet.getCell('N35').value = mountsData.sBCdim || 'N/A';
     mountsSheet.getCell('M36').value = 'D';
     mountsSheet.getCell('N36').value = mountsData.sBDdim || 'N/A';
     mountsSheet.getCell('M37').value = 'E';
     mountsSheet.getCell('N37').value = mountsData.sBEdim || 'N/A';
     mountsSheet.getCell('M38').value = 'F';
     mountsSheet.getCell('N38').value = mountsData.sBFdim || 'N/A';

     // SECTOR C

     mountsSheet.getCell('R23').value = 'Sector C'

     mountsSheet.getCell('R24').value = 'Member Schedule:';
     mountsSheet.getCell('R25').value = 'Mark';
     mountsSheet.getCell('S25').value = 'Type';
     mountsSheet.getCell('T25').value = 'Size';
     mountsSheet.getCell('U25').value = 'Length';

     mountsSheet.getCell('R26').value = 'P1';
     mountsSheet.getCell('S26').value = 'Pipe';
     mountsSheet.getCell('T26').value = mountsData.sCp1size || 'N/A';
     mountsSheet.getCell('U26').value = mountsData.sCp1length || 'N/A';
     mountsSheet.getCell('R27').value = 'P2';
     mountsSheet.getCell('S27').value = 'Pipe';
     mountsSheet.getCell('T27').value = mountsData.sCp2size || 'N/A';
     mountsSheet.getCell('U27').value = mountsData.sCp2length || 'N/A';

     mountsSheet.getCell('R31').value = 'Dimensions';
     mountsSheet.getCell('R32').value = 'Mark';
     mountsSheet.getCell('S32').value = 'Dim(ft)';
     mountsSheet.getCell('R33').value = 'A';
     mountsSheet.getCell('S33').value = mountsData.sCAdim || 'N/A';
     mountsSheet.getCell('R34').value = 'B';
     mountsSheet.getCell('S34').value = mountsData.sCBdim || 'N/A';
     mountsSheet.getCell('R35').value = 'C';
     mountsSheet.getCell('S35').value = mountsData.sCCdim || 'N/A';
     mountsSheet.getCell('R36').value = 'D';
     mountsSheet.getCell('S36').value = mountsData.sCDdim || 'N/A';
     mountsSheet.getCell('R37').value = 'E';
     mountsSheet.getCell('S37').value = mountsData.sCEdim || 'N/A';
     mountsSheet.getCell('R38').value = 'F';
     mountsSheet.getCell('S38').value = mountsData.sCFdim || 'N/A';
    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), 'antenna_layout_report.xlsx');
    });
    setExcel(false)

  };
  
  return (
    <div className="my-20 mx-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
      <Card onClick={() => handleOpen("Upload")}>
        <Card.Body className="flex items-center cursor-pointer">
          <Typography variant="h6" color="blue-gray">
            Upload Documents
          </Typography>
        </Card.Body>
      </Card>
      <Card onClick={handleExcelOpen}>
        <Card.Body className="flex items-center cursor-pointer">
          <Typography variant="h6" color="blue-gray">
            Enter Tower Details
          </Typography>
        </Card.Body>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} className="flex items-center flex-col">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Select Document Type
          </Typography>
        </DialogHeader>
        <DialogBody>
        <Input
            type="text"
            color="blue"
            label="Folder Name"
            // onChange={handleFolderNameChange}
            className="mb-4"
            required
          />
          <div className="grid gap-4 grid-cols-2">
            {cardData.map((card) => (
              <Card key={card.name} onClick={() => handleOpen(card.name)}>
                <Card.Body className="flex items-center cursor-pointer">
                  <img src={card.img} className="w-8 h-8 mr-2 rounded-full" />
                  <Input
                    type="file"
                    color="blue"
                    label={`Choose ${card.name}`}
                    onChange={handleFileChange}
                    className="p-3"
                    required
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button color="blue" className="ms-3" onClick={() => setOpen(false)}>
            Upload
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={excel} onClose={() => setExcel(false)} className="p-6">
        <div className="p-6 max-h-[80vh] overflow-y-auto">
      <div>
      <h1 className="text-lg mb-4 font-semibold">Antenna Layout</h1>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="px-3 py-1">
            <label className="text-sm text-gray-600">Site ID</label>
            <input
              id="siteId"
              className="form-control ml-3 px-2 py-1 border-2 rounded-md"
              type="text"
              value={asBuiltData.siteId}
              onChange={(e) => setAsBuiltData({ ...asBuiltData, siteId: e.target.value })}
              placeholder="Enter Site ID"
            />
          </div>
          <div className="px-1 py-1">
            <label className="text-sm text-gray-600">Report Version</label>
            <input
              id="reportVersion"
              className="form-control ml-3 px-2 py-1 border-2 rounded-md"
              type="text"
              value={asBuiltData.reportVersion}
              onChange={(e) => setAsBuiltData({ ...asBuiltData, reportVersion: e.target.value })}
              placeholder="Enter Report Version"
            />
          </div>
          <div className="px-3 py-1">
            <label className="text-sm text-gray-600">Scan Date</label>
            <input
              id="scanDate"
              className="form-control ml-3 px-2 py-1 border-2 rounded-md"
              type="text"
              value={asBuiltData.scanDate}
              onChange={(e) => setAsBuiltData({ ...asBuiltData, scanDate: e.target.value })}
              placeholder="Enter Scan Date"
            />
          </div>
          <div className="px-3 py-1">
            <label className="text-sm text-gray-600">Mount Level</label>
            <input
              id="mountLevel"
              className="form-control ml-3 px-2 py-1 border-2 rounded-md"
              type="text"
              value={asBuiltData.mountLevel}
              onChange={(e) => setAsBuiltData({ ...asBuiltData, mountLevel: e.target.value })}
              placeholder="Enter Mount Level"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <h1 className="text-sm px-3 py-1 text-gray-700 font-semibold">A2 Antenna</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="px-3 py-1">
                <label className="text-sm text-gray-600">Rad Center (ft)</label>
                <input id="a2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2RadCenter} onChange={handleChange} placeholder="Enter text" />
              </div>
              <div className="px-3 py-1">
                <label className="text-sm text-gray-600">Azimuth (deg)</label>
                <input id="a2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2Azimuth} onChange={handleChange} placeholder="Enter text" />
              </div>
              <div className="px-3 py-1">
                <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                <input id="a2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2MechTilt} onChange={handleChange} placeholder="Enter text" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-sm px-3 py-1 text-gray-700 font-semibold">B2 Antenna</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="px-3 py-1">
                <label className="text-sm text-gray-600">Rad Center (ft)</label>
                <input id="b2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.b2RadCenter} onChange={handleChange} placeholder="Enter text" />
              </div>
              <div className="px-3 py-1">
                  <label className="text-sm text-gray-600">Azimuth (deg)</label>
                  <input id="b2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.b2Azimuth} onChange={handleChange} placeholder="Enter text" />
                </div>
                <div className="px-3 py-1">
                  <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                  <input id="b2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.b2MechTilt} onChange={handleChange} placeholder="Enter text" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm px-3 py-1 text-gray-700 font-semibold">C2 Antenna</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="px-3 py-1">
                  <label className="text-sm text-gray-600">Rad Center (ft)</label>
                  <input id="c2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2RadCenter} onChange={handleChange} placeholder="Enter text" />
                </div>
                <div className="px-3 py-1">
                  <label className="text-sm text-gray-600">Azimuth (deg)</label>
                  <input id="c2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2Azimuth} onChange={handleChange} placeholder="Enter text" />
                </div>
                <div className="px-3 py-1">
                  <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                  <input id="c2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2MechTilt} onChange={handleChange} placeholder="Enter text" />
                </div>
              </div>
            </div>
        </div>
        <div className="mt-4 flex gap-2">
          <label className="block text-sm text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-700" />
        </div>
      </div>

      <div>
      <h1 className="text-lg mt-8 mb-4 font-semibold">Antenna Swing</h1>
        <h2 className="text-md font-semibold">Swing Data</h2>
        <div className="grid gap-3">
          <div>
            <h1 className="my-2 my-2 text-sm text-gray-700 font-semibold">A2 Antenna</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
              <div>
              <label className="text-sm text-gray-600">Rad Center</label>
              <input id="a2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2RadCenter} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Azimuth</label>
                <input id="a2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2Azimuth} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Mech Tilt</label>
                <input id="a2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2MechTilt} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Skew</label>
                <input id="a2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2Skew} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Ant Swing Angle (- deg)</label>
                <input id="a2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2AntSwingAngleNeg} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
                <input id="a2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2AntSwingAnglePos} onChange={handleSwingChange} placeholder="Enter text" />
              </div>
            </div>
          </div>
          
          <div>
          <h1 className="my-2 my-2 text-sm text-gray-700 font-semibold">B2 Antenna</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
            <div>
            <label className="text-sm text-gray-600">Rad Center</label>
            <input id="b2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2RadCenter} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Azimuth</label>
            <input id="b2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2Azimuth} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Mech Tilt</label>
            <input id="b2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2MechTilt} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Skew</label>
            <input id="b2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2Skew} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Ant Swing Angle (- deg)</label>
            <input id="b2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2AntSwingAngleNeg} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
            <input id="b2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2AntSwingAnglePos} onChange={handleSwingChange} placeholder="Enter text" />
          </div>

            </div>
          </div>

          <div>
          <h1 className="my-2 text-sm text-gray-700 font-semibold">C2 Antenna</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
            <div>
            <label className="text-sm text-gray-600">Rad Center</label>
            <input id="c2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2RadCenter} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Azimuth</label>
            <input id="c2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2Azimuth} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Mech Tilt</label>
            <input id="c2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2MechTilt} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Skew</label>
            <input id="c2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2Skew} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">C2 Ant Swing Angle (- deg)</label>
            <input id="c2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2AntSwingAngleNeg} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
            <input id="c2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2AntSwingAnglePos} onChange={handleSwingChange} placeholder="Enter text" />
          </div>
            </div>
          </div>
          
        </div>
      </div>
      <div>
        <h1 className="text-lg mt-8 mb-4 font-semibold">Mounts</h1>
        <div>
          <div className='space-y-3'>
            <h1 className="text-md font-semibold text-red-600">Sector A</h1>
            <div>
              <h2 className="text-sm mt-2 font-semibold">Member Schedule</h2>
              <div className='grid md:grid-cols-2 my-3 space-y-2'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Size</label>
                <input id='sAp1size' className='form-control px-2 py-1 border-2 rounded-md' type='text' value={mountsData.sAp1size} onChange={handleMountsChange } placeholder='enter text' />
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Length (ft)</label>
                <input id='sAp1length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAp1length} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Size</label>
                <input id='sAp2size' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAp2size} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Length (ft)</label>
                <input id='sAp2length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAp2length} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm mt-2 font-semibold">Dimensions (ft)</h1>
              <div className='space-y-2 mt-3'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">A</label>
                <input id='sAAdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAAdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">B</label>
                <input id='sABdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sABdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">C</label>
                <input id='sACdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sACdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">D</label>
                <input id='sADdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sADdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">E</label>
                <input id='sAEdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAEdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">F</label>
                <input id='sAFdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAFdim} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
          </div>
          <div className='space-y-3'>
            <h1 className="text-md font-semibold text-red-600 mt-3">Sector B</h1>
            <div>
              <h2 className="text-sm mt-2 font-semibold">Member Schedule</h2>
              <div className='flex grid md:grid-cols-2 space-y-2 my-3'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Size</label>
                <input id='sBp1size' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBp1size} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Length (ft)</label>
                <input id='sBp1length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBp1length} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Size</label>
                <input id='sBp2size' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBp2size} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Length (ft)</label>
                <input id='sBp2length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBp2length} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm mt-2 font-semibold">Dimensions (ft)</h1>
              <div className='space-y-2 mt-3'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">A</label>
                <input id='sBAdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBAdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">B</label>
                <input id='sBBdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBBdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">C</label>
                <input id='sBCdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBCdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">D</label>
                <input id='sBDdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBDdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">E</label>
                <input id='sBEdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBEdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">F</label>
                <input id='sBFdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sBFdim} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
          </div>
          <div className='space-y-3'>
            <h1 className="text-md font-semibold text-red-600 mt-3">Sector C</h1>
            <div>
              <h2 className="text-sm mt-2 font-semibold">Member Schedule</h2>
              <div className='flex grid md:grid-cols-2 space-y-2 my-3'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Size</label>
                <input id='sCp1size' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCp1size} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P1 Length (ft)</label>
                <input id='sCp1length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCp1length} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Size</label>
                <input id='sCp2size' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCp2size} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">P2 Length (ft)</label>
                <input id='sCp2length' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCp2length} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
            <div>
              <h1 className="text-sm mt-2 font-semibold">Dimensions (ft)</h1>
              <div className='space-y-2 mt-3'>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">A</label>
                <input id='sCAdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCAdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">B</label>
                <input id='sCBdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCBdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">C</label>
                <input id='sCCdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCCdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">D</label>
                <input id='sCDdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCDdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">E</label>
                <input id='sCEdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCEdim} onChange={handleMountsChange}></input>
              </div>
              <div className='space-x-2'>
                <label className="text-sm text-gray-600">F</label>
                <input id='sCFdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sCFdim} onChange={handleMountsChange}></input>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleClose} className="bg-red-500 text-white px-2 py-1 mt-8 mr-5 rounded">
        Close
      </button>
      <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 mt-4 rounded">
        Save
      </button>
      </div>
    </Dialog>

  
    </div>
  );
}

export default Messages;