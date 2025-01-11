import React, { useState } from "react";
import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, Typography } from "@material-tailwind/react"; 
import ExcelImage from '../../img/excel.webp';
import ObjImage from '../../img/obj.png';
import LazImage from '../../img/laz.avif';
import KmlImage from '../../img/kml.webp';
import PdfImage from '../../img/pdf.webp';

const FileUploadDialog = ({ open, setOpen, uploadFiles, files, setFiles, tags, setTags, uploadProgress, estimatedTime, cancelUpload, isUploading, message }) => {

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFiles[0], // Store only the first file selected
    }));
  };

  const cardData = [
    { name: "Excel file", img: ExcelImage, fileType: "excel" },
    { name: "Obj file", img: ObjImage, fileType: "obj" },
    { name: "Laz file", img: LazImage, fileType: "laz" },
    { name: "Kml file", img: KmlImage, fileType: "kml" },
    { name: "Pdf file", img: PdfImage, fileType: "pdf" },
  ];


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="p-10 fixed insert-0 justify-center mx-[25%] my-[7%] w-[60%]">
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">Select Document Type</Typography>
      </DialogHeader>
      <DialogBody>
        <Input type="text" placeholder="Folder Name" value={tags} onChange={(e) => setTags(e.target.value)} className="mb-4 rounded-lg" />
        <div className="grid gap-4 grid-cols-2 mt-10">
          {cardData.map((card) => (
            <Card key={card.fileType}>
              <Card.Body className="flex gap-1 items-center cursor-pointer">
                <img src={card.img} alt={card.name} className="w-8 h-8 mr-2 rounded-full" />
                <div className="flex flex-col items-left w-[50%]">
                  <Typography variant="body2" className="text-start font-semibold">{card.name}</Typography>
                  <label className="px-4 py-2 text-sm cursor-pointer bg-gray-700 text-white rounded-md">
                    Choose File
                    <input type="file" name={card.fileType} onChange={handleFileChange} className="hidden" multiple={false} />
                  </label>
                  {files[card.fileType] && <p className="mt-1 text-sm text-gray-500">{files[card.fileType].name}</p>}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={() => setOpen(false)}>Close</Button>
        <Button color="blue" className="ms-3" onClick={uploadFiles}>Upload</Button>
      </DialogFooter>
      {message && <p className="text-center text-lg text-blue-600">{message}</p>}
      {isUploading && (
        <div className="w-full mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div >
                <span className="text-sm font-semibold py-1 uppercase">Upload Progress</span>
              </div>

              <div className="space-x-5 items-center">
              <span className="text-sm font-semibold  py-1 uppercase">{uploadProgress}% </span>
                <button onClick={cancelUpload} className="text-red-500 text-xl font-bold">❌</button>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full">
                <div className="bg-blue-500 text-xs font-semibold text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default FileUploadDialog;
