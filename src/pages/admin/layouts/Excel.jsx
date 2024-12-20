import React, { useState, useEffect } from "react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import img from './img/tower.png'
import swingImage from './img/swing.png';
import mountsImage from './img/mount.jpg';
import sector from './img/mountssector.png';
function Excel() {


  const navigate = useNavigate();

  const location = useLocation();
  const towerData = location.state?.tower; // Use optional chaining to avoid errors

  console.log("Tower details from excel 2:", towerData);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };



  const handleSave = async () => {

    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Antenna Layout');

    worksheet.addRow(["Site ID:", towerData.siteId || '']);
    worksheet.addRow(["Report Version:", towerData.reportVersion || '']);
    worksheet.addRow(["Scan Date:", towerData.scanDate || '']);
    worksheet.addRow(["Mount Level:", towerData.mountLevel || '']);


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
    worksheet.addRow(["A2", "Antenna", 1, "JMA", "MX08FR0665-21", towerData.AntennaLayouta2.azimuth || 'N/A', towerData.AntennaLayouta2.mechTilt || 'N/A', towerData.AntennaLayouta2.radCenter || 'N/A']);
    worksheet.addRow(["B2", "Antenna", 1, "JMA", "MX08FR0665-21", towerData.AntennaLayoutb2.azimuth || 'N/A', towerData.AntennaLayoutb2.mechTilt || 'N/A', towerData.AntennaLayoutb2.radCenter || 'N/A']);
    worksheet.addRow(["C2", "Antenna", 1, "JMA", "MX08FR0665-21", towerData.AntennaLayoutc2.azimuth || 'N/A', towerData.AntennaLayoutc2.mechTilt || 'N/A', towerData.AntennaLayoutc2.radCenter || 'N/A']);
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
      
      


    const swingSheet = workbook.addWorksheet('Antenna Swing');

    swingSheet.addRow(["Site ID:", towerData.siteId || '']);
    swingSheet.addRow(["Report Version:", towerData.reportVersion || '']);
    swingSheet.addRow(["Scan Date:", towerData.scanDate || '']);
    swingSheet.addRow(["Mount Level:", towerData.mountLevel || '']);
    

  // Add space after static data
  swingSheet.addRow([]);
  swingSheet.addRow([]);
  swingSheet.addRow([]);

  const response = await fetch(swingImage);
  const blob = await response.blob();

  // Create an ArrayBuffer from the Blob
  const arrayBuffer = await blob.arrayBuffer();

   // Add the image to the workbook
   const imageId = workbook.addImage({
     buffer: arrayBuffer, // Directly use ArrayBuffer
     extension: 'png',
   });
  swingSheet.addImage(imageId, 'A5:G25'); 


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

//   // Minimum swing angle tolerance-----------------------
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
  
  //  ulating the rows with the corresponding data
  swingSheet.getCell('J7').value = "A2";
  swingSheet.getCell('K7').value = towerData.a2Swing.radCenter || 'N/A';
  swingSheet.getCell('L7').value = towerData.a2Swing.azimuth || 'N/A';
  swingSheet.getCell('M7').value = towerData.a2Swing.mechTilt || 'N/A';
  swingSheet.getCell('N7').value = towerData.a2Swing.skew || 'N/A';
  swingSheet.getCell('O7').value = towerData.a2Swing.antSwingAngleNeg || 'N/A';
  swingSheet.getCell('P7').value = towerData.a2Swing.antSwingAnglePos || 'N/A';
  
  swingSheet.getCell('J8').value = "B2";
  swingSheet.getCell('K8').value = towerData.b2Swing.radCenter || 'N/A';
  swingSheet.getCell('L8').value = towerData.b2Swing.azimuth || 'N/A';
  swingSheet.getCell('M8').value = towerData.b2Swing.mechTilt || 'N/A';
  swingSheet.getCell('N8').value = towerData.b2Swing.skew || 'N/A';
  swingSheet.getCell('O8').value = towerData.b2Swing.antSwingAngleNeg || 'N/A';
  swingSheet.getCell('P8').value = towerData.b2Swing.antSwingAnglePos || 'N/A';
  
  swingSheet.getCell('J9').value = "C2";
  swingSheet.getCell('K9').value = towerData.c2Swing.radCenter || 'N/A';
  swingSheet.getCell('L9').value = towerData.c2Swing.azimuth || 'N/A';
  swingSheet.getCell('M9').value = towerData.c2Swing.mechTilt || 'N/A';
  swingSheet.getCell('N9').value = towerData.c2Swing.skew || 'N/A';
  swingSheet.getCell('O9').value = towerData.c2Swing.antSwingAngleNeg || 'N/A';
  swingSheet.getCell('P9').value = towerData.c2Swing.antSwingAnglePos || 'N/A';
  swingSheet.getCell('P9').value = towerData.c2Swing.antSwingAnglePos || 'N/A';
  swingSheet.getCell('P22').value = "20 degree";
  
// // end of antenna swing----------------------------------------------------

// // start of mounts------------------------------------------------------------

const mountsSheet = workbook.addWorksheet('Mounts')

mountsSheet.addRow(["Site ID:", towerData.siteId || '']);
mountsSheet.addRow(["Report Version:", towerData.reportVersion || '']);
mountsSheet.addRow(["Scan Date:", towerData.scanDate || '']);
mountsSheet.addRow(["Mount Level:", towerData.mountLevel || '']);

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
     mountsSheet.getCell('J26').value = towerData.mounts.sectorA.memberSchedule.p1Size || 'N/A';
     mountsSheet.getCell('K26').value = towerData.mounts.sectorA.memberSchedule.p1Length || 'N/A';
     mountsSheet.getCell('H27').value = 'P2';
     mountsSheet.getCell('I27').value = 'Pipe';
     mountsSheet.getCell('J27').value = towerData.mounts.sectorA.memberSchedule.p2Size || 'N/A';
     mountsSheet.getCell('K27').value = towerData.mounts.sectorA.memberSchedule.p2Length || 'N/A';

     mountsSheet.getCell('H31').value = 'Dimensions';
     mountsSheet.getCell('H32').value = 'Mark';
     mountsSheet.getCell('I32').value = 'Dim(ft)';
     mountsSheet.getCell('H33').value = 'A';
     mountsSheet.getCell('I33').value = towerData.mounts.sectorA.dimensions.A || 'N/A';
     mountsSheet.getCell('H34').value = 'B';
     mountsSheet.getCell('I34').value = towerData.mounts.sectorA.dimensions.B || 'N/A';
     mountsSheet.getCell('H35').value = 'C';
     mountsSheet.getCell('I35').value = towerData.mounts.sectorA.dimensions.C|| 'N/A';
     mountsSheet.getCell('H36').value = 'D';
     mountsSheet.getCell('I36').value = towerData.mounts.sectorA.dimensions.D || 'N/A';
     mountsSheet.getCell('H37').value = 'E';
     mountsSheet.getCell('I37').value = towerData.mounts.sectorA.dimensions.E || 'N/A';
     mountsSheet.getCell('H38').value = 'F';
     mountsSheet.getCell('I38').value = towerData.mounts.sectorA.dimensions.F || 'N/A';

     // SECTOR B

     mountsSheet.getCell('M23').value = 'Sector B'

     mountsSheet.getCell('M24').value = 'Member Schedule:';
     mountsSheet.getCell('M25').value = 'Mark';
     mountsSheet.getCell('N25').value = 'Type';
     mountsSheet.getCell('O25').value = 'Size';
     mountsSheet.getCell('P25').value = 'Length';

     mountsSheet.getCell('M26').value = 'P1';
     mountsSheet.getCell('N26').value = 'Pipe';
     mountsSheet.getCell('O26').value = towerData.mounts.sectorB.memberSchedule.p1Size  || 'N/A';
     mountsSheet.getCell('P26').value = towerData.mounts.sectorB.memberSchedule.p1Length || 'N/A';
     mountsSheet.getCell('M27').value = 'P2';
     mountsSheet.getCell('N27').value = 'Pipe';
     mountsSheet.getCell('O27').value = towerData.mounts.sectorB.memberSchedule.p2Size || 'N/A';
     mountsSheet.getCell('P27').value = towerData.mounts.sectorB.memberSchedule.p2Length || 'N/A';

     mountsSheet.getCell('M31').value = 'Dimensions';
     mountsSheet.getCell('M32').value = 'Mark';
     mountsSheet.getCell('N32').value = 'Dim(ft)';
     mountsSheet.getCell('M33').value = 'A';
     mountsSheet.getCell('N33').value = towerData.mounts.sectorB.dimensions.A || 'N/A';
     mountsSheet.getCell('M34').value = 'B';
     mountsSheet.getCell('N34').value = towerData.mounts.sectorB.dimensions.B || 'N/A';
     mountsSheet.getCell('M35').value = 'C';
     mountsSheet.getCell('N35').value = towerData.mounts.sectorB.dimensions.C || 'N/A';
     mountsSheet.getCell('M36').value = 'D';
     mountsSheet.getCell('N36').value = towerData.mounts.sectorB.dimensions.D || 'N/A';
     mountsSheet.getCell('M37').value = 'E';
     mountsSheet.getCell('N37').value = towerData.mounts.sectorB.dimensions.E || 'N/A';
     mountsSheet.getCell('M38').value = 'F';
     mountsSheet.getCell('N38').value = towerData.mounts.sectorB.dimensions.F || 'N/A';

     // SECTOR C

     mountsSheet.getCell('R23').value = 'Sector C'

     mountsSheet.getCell('R24').value = 'Member Schedule:';
     mountsSheet.getCell('R25').value = 'Mark';
     mountsSheet.getCell('S25').value = 'Type';
     mountsSheet.getCell('T25').value = 'Size';
     mountsSheet.getCell('U25').value = 'Length';

     mountsSheet.getCell('R26').value = 'P1';
     mountsSheet.getCell('S26').value = 'Pipe';
     mountsSheet.getCell('T26').value = towerData.mounts.sectorC.memberSchedule.p1Size || 'N/A';
     mountsSheet.getCell('U26').value = towerData.mounts.sectorC.memberSchedule.p1Length || 'N/A';
     mountsSheet.getCell('R27').value = 'P2';
     mountsSheet.getCell('S27').value = 'Pipe';
     mountsSheet.getCell('T27').value = towerData.mounts.sectorC.memberSchedule.p2Size || 'N/A';
     mountsSheet.getCell('U27').value = towerData.mounts.sectorC.memberSchedule.p2Length || 'N/A';

     mountsSheet.getCell('R31').value = 'Dimensions';
     mountsSheet.getCell('R32').value = 'Mark';
     mountsSheet.getCell('S32').value = 'Dim(ft)';
     mountsSheet.getCell('R33').value = 'A';
     mountsSheet.getCell('S33').value = towerData.mounts.sectorC.dimensions.A || 'N/A';
     mountsSheet.getCell('R34').value = 'B';
     mountsSheet.getCell('S34').value = towerData.mounts.sectorC.dimensions.B || 'N/A';
     mountsSheet.getCell('R35').value = 'C';
     mountsSheet.getCell('S35').value = towerData.mounts.sectorC.dimensions.C || 'N/A';
     mountsSheet.getCell('R36').value = 'D';
     mountsSheet.getCell('S36').value = towerData.mounts.sectorC.dimensions.D || 'N/A';
     mountsSheet.getCell('R37').value = 'E';
     mountsSheet.getCell('S37').value = towerData.mounts.sectorC.dimensions.F || 'N/A';
     mountsSheet.getCell('R38').value = 'F';
     mountsSheet.getCell('S38').value = towerData.mounts.sectorC.dimensions.E || 'N/A';
    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
        const fileName = `${towerData.siteId || 'default'}.xlsx`;
        saveAs(new Blob([buffer]), fileName);
      });
      

    navigate('/admin/home/towers')

  };

useEffect(() => {
  handleSave()
})
}

export default Excel;