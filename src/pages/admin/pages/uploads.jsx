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
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Inspection_form from '../layouts/Inspection_form';
import FileUploadDialog from "./FileUploadDialog"; 

export function Uploads() {
  const [files, setFiles] = useState({
    obj: null,
    image: null,
    excel: null,
    pdf: null,
    kml: null,
  });
  const [tags, setTags] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [uploadAbortController, setUploadAbortController] = useState(null);

  const handleUploadProgress = (progressEvent) => {
    if (progressEvent.total > 0) {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadProgress(percent);

      const currentTime = Date.now();
      const timeElapsed = (currentTime - uploadSpeed.startTime) / 1000;
      const bytesUploaded = progressEvent.loaded - uploadSpeed.lastLoaded;
      const speed = bytesUploaded / timeElapsed;
      setUploadSpeed({
        lastLoaded: progressEvent.loaded,
        startTime: currentTime,
        speed: speed,
      });

      const remainingBytes = progressEvent.total - progressEvent.loaded;
      const remainingTime = remainingBytes / speed;
      setEstimatedTime(Math.max(0, Math.round(remainingTime)));
    }
  };

  const uploadFiles = async () => {
    if (!tags || Object.values(files).every((file) => !file)) {
      setMessage("Please provide a folder name and upload all required files.");
      return;
    }

    setIsUploading(true);
    setMessage("Uploading... Please wait.");
    setUploadProgress(0);
    setEstimatedTime(null);

    const formData = new FormData();
    formData.append("tags", tags);
    Object.keys(files).forEach((fileType) => {
      if (files[fileType]) {
        formData.append(fileType, files[fileType]);
      }
    });

    const controller = new AbortController();
    setUploadAbortController(controller);

    try {
      await axios.post("http://dt-dev-backend.onrender.com/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: handleUploadProgress,
        signal: controller.signal,
        timeout: 30 * 60 * 1000,
      });
      setMessage("Files uploaded successfully!");
      setUploadProgress(100);
      setEstimatedTime(0);
    } catch (error) {
      if (axios.isCancel(error)) {
        setMessage("Upload cancelled.");
      } else {
        console.error(error);
        setMessage("Error uploading files.");
      }
    } finally {
      setIsUploading(false);
      setFiles({
        obj: null,
        image: null,
        excel: null,
        pdf: null,
        kml: null,
      });
      setTags("");
      setTimeout(() => setOpen(false), 1000);
    }
  };

  const cancelUpload = () => {
    if (uploadAbortController) {
      uploadAbortController.abort();
      setMessage("Cancelling upload...");
      setUploadProgress(0);
    }
  };
  

const [step, setStep] = useState(1);

const nextStep = () => {
  setStep((prevStep) => Math.min(prevStep + 1, 3));
};

const prevStep = () => {
  setStep((prevStep) => Math.max(prevStep - 1, 1));
};

const renderStep = () => {
  switch (step) {
    case 1:
      return (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <h3 className=" mt-10 text-center pt-3 text-lg font-medium leading-none text-gray-900 dark:text-white">Antenna Layout</h3>
          <div className='py-10 max-h-[60vh] overflow-y-auto'>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-4 py-5">
                <div className="py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Site ID</label>
                  <input
                    id="siteId"
                    className="inline mr-auto form-control px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.siteId}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, siteId: e.target.value })}
                    placeholder="Enter Site ID"
                    required
                  />
                </div>
                <div className=" py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Report Version</label>
                  <input
                    id="reportVersion"
                    className="inline mr-auto form-control ml-3 px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.reportVersion}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, reportVersion: e.target.value })}
                    placeholder="Enter Report Version"
                    required
                  />
                </div>
                <div className=" py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Scan Date</label>
                  <input
                    id="scanDate"
                    className="inline mr-auto form-control ml-3 px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.scanDate}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, scanDate: e.target.value })}
                    placeholder="Enter Scan Date"
                    required
                  />
                </div>
                <div className=" py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Mount Level</label>
                  <input
                    id="mountLevel"
                    className="inline mr-auto form-control ml-3 px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.mountLevel}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, mountLevel: e.target.value })}
                    placeholder="Enter Mount Level"
                    required
                  />
                </div>
                <div className="py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">No. of Operators</label>
                  <input
                    id="operators"
                    className="inline mr-auto form-control px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.noOperators}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, noOperators: e.target.value })}
                    placeholder="Enter Site ID"
                    required
                  />
                </div>
                <div className="py-1 flex flex-col space-y-2">
                  <label className="text-sm text-gray-600">Location</label>
                  <input
                    id="location"
                    className="inline mr-auto form-control px-2 py-1 border-2 rounded-md"
                    type="text"
                    value={asBuiltData.location}
                    onChange={(e) => setAsBuiltData({ ...asBuiltData, location: e.target.value })}
                    placeholder="Enter Site ID"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <h1 className="text-sm  py-1 text-gray-700 font-semibold">A2 Antenna</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className=" py-1">
                      <label className="text-sm text-gray-600">Rad Center (ft)</label>
                      <input id="a2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2RadCenter} onChange={handleChange} placeholder="Enter text"  required/>
                    </div>
                    <div className=" py-1">
                      <label className="text-sm text-gray-600">Azimuth (deg)</label>
                      <input id="a2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2Azimuth} onChange={handleChange} placeholder="Enter text"  required/>
                    </div>
                    <div className=" py-1">
                      <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                      <input id="a2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.a2MechTilt} onChange={handleChange} placeholder="Enter text"  required/>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-sm  py-1 text-gray-700 font-semibold">B2 Antenna</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className=" py-1">
                      <label className="text-sm text-gray-600">Rad Center (ft)</label>
                      <input id="b2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.b2RadCenter} onChange={handleChange}  placeholder="Enter text"  required/>
                    </div>
                    <div className=" py-1">
                        <label className="text-sm text-gray-600">Azimuth (deg)</label>
                        <input id="b2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.b2Azimuth} onChange={handleChange} placeholder="Enter text"  required/>
                      </div>
                      <div className=" py-1">
                        <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                        <input id="b2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text"  value={asBuiltData.b2MechTilt} onChange={handleChange} placeholder="Enter text"  required/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-sm  py-1 text-gray-700 font-semibold">C2 Antenna</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className=" py-1">
                        <label className="text-sm text-gray-600">Rad Center (ft)</label>
                        <input id="c2RadCenter" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2RadCenter} onChange={handleChange} placeholder="Enter text"  required/>
                      </div>
                      <div className=" py-1">
                        <label className="text-sm text-gray-600">Azimuth (deg)</label>
                        <input id="c2Azimuth" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2Azimuth} onChange={handleChange} placeholder="Enter text"  required/>
                      </div>
                      <div className=" py-1">
                        <label className="text-sm text-gray-600">Mech Tilt (deg)</label>
                        <input id="c2MechTilt" className="form-control ml-3 px-2 py-1 border-2 rounded-md" type="text" value={asBuiltData.c2MechTilt} onChange={handleChange} placeholder="Enter text"  required/>
                      </div>
                    </div>
                  </div>
              </div>
     
              <div className="mt-8 flex gap-2 items-center">
                <label className="text-sm text-gray-700 font-semibold w-[10%]" >Upload Image</label>
                <input type="file" accept="image/*" className="mt-1 ml-2 block w-full text-sm text-gray-700" onChange={handleImageChange} required/>
              </div>
              <div className="mt-8 flex gap-2 items-center">
                <label className="text-sm text-gray-700 font-semibold w-[11%]">Upload Design</label>
                <input type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-700" />
              </div>
            </div>
            <button 
              type="submit" 
              className="ml-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
            >
              Next Step<span><ChevronRightIcon/></span>
            </button>

        </form>
      );
    case 2:
      return (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <h3 className="mb-4 text-center pt-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Antenna Swing</h3>
          <div className='pb-10 max-h-[60vh] overflow-y-auto'>
              <div className="grid gap-3">
              <div>
                <h1 className="my-2 text-md text-gray-700 font-semibold mb-5">A2 Antenna</h1>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Rad Center </label>
                  <br/>
                  <input id="a2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2RadCenter} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Azimuth</label><br/>
                  <input id="a2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2Azimuth} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Mech Tilt</label><br/>
                  <input id="a2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2MechTilt} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Skew</label><br/>
                  <input id="a2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2Skew} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (- deg)</label>
                  <input id="a2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2AntSwingAngleNeg} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
                  <input id="a2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.a2AntSwingAnglePos} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                  </div>
                </div>
                
                <div>
                <h1 className="my-2 text-md text-gray-700 font-semibold mb-5">B2 Antenna</h1>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Rad Center </label>
                  <br/>
                  <input id="b2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2RadCenter} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Azimuth</label><br/>
                  <input id="b2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2Azimuth} onChange={handleSwingChange}  placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Mech Tilt</label><br/>
                  <input id="b2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2MechTilt} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Skew</label><br/>
                  <input id="b2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.b2Skew} onChange={handleSwingChange}  placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (- deg)</label>
                  <input id="b2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md"  value={swingData.b2AntSwingAngleNeg} onChange={handleSwingChange} type="text" placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
                  <input id="b2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md" value={swingData.b2AntSwingAnglePos} onChange={handleSwingChange}  type="text" placeholder="Enter text"  required/>
                </div>
                  </div>
                </div>

                <div>
                <h1 className="my-2 text-md text-gray-700 font-semibold mb-5">C2 Antenna</h1>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Rad Center </label>
                  <br/>
                  <input id="c2RadCenter" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2RadCenter} onChange={handleSwingChange}  placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Azimuth</label><br/>
                  <input id="c2Azimuth" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2Azimuth} onChange={handleSwingChange}  placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Mech Tilt</label><br/>
                  <input id="c2MechTilt" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2MechTilt} onChange={handleSwingChange} placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Skew</label><br/>
                  <input id="c2Skew" className="form-control px-2 py-1 border-2 rounded-md" type="text" value={swingData.c2Skew} onChange={handleSwingChange}  placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (- deg)</label>
                  <input id="c2AntSwingAngleNeg" className="form-control px-2 py-1 border-2 rounded-md"  value={swingData.c2AntSwingAngleNeg} onChange={handleSwingChange} type="text" placeholder="Enter text"  required/>
                </div>
                <div className='space-x-3 space-y-1'>
                  <label className="text-sm text-gray-600">Ant Swing Angle (+ deg)</label>
                  <input id="c2AntSwingAnglePos" className="form-control px-2 py-1 border-2 rounded-md"  value={swingData.c2AntSwingAnglePos} onChange={handleSwingChange} type="text" placeholder="Enter text"  required/>
                </div>
                  </div>
                </div>
                
              </div>
          </div>
          <div className='flex justify-between mt-3'>
            <button type="button" onClick={prevStep} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center">
            <span><NavigateBeforeIcon/></span>Previous Step
            </button>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Next Step<span><ChevronRightIcon/></span>
            </button>
          </div>
        </form>
      );
    case 3:
      return (
        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
          <h3 className="mb-4 text-lg font-medium pt-4 leading-none text-gray-900 dark:text-white text-center ">Antenna Mounts</h3>
          <div className='pb-10 max-h-[60vh] overflow-y-auto'>
            <div>
              <div className='space-y-3'>
                <h1 className="text-md font-semibold text-red-600">Sector A</h1>
                <div>
                  <h2 className="text-sm mt-2 font-semibold">Member Schedule</h2>
                  <div className='grid md:grid-cols-2 my-3 space-y-2'>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">P1 Size</label>
                    <input id='sAp1size' className='form-control px-2 py-1 border-2 rounded-md' type='text'  value={mountsData.sAp1size} onChange={handleMountsChange } placeholder='enter text' />
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">P1 Length (ft)</label>
                    <input id='sAp1length' className='form-control px-2 py-1 border-2 rounded-md' type='text' value={mountsData.sAp1length} onChange={handleMountsChange } placeholder='enter text' ></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">P2 Size</label>
                    <input id='sAp2size' className='form-control px-2 py-1 border-2 rounded-md' type='text' value={mountsData.sAp2size} onChange={handleMountsChange } placeholder='enter text'></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">P2 Length (ft)</label>
                    <input id='sAp2length' className='form-control px-2 py-1 border-2 rounded-md' type='text' value={mountsData.sAp2length} onChange={handleMountsChange } placeholder='enter text' ></input>
                  </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-sm mt-2 font-semibold">Dimensions (ft)</h1>
                  <div className='space-y-2 mt-3'>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">A</label>
                    <input id='sAAdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text'  value={mountsData.sAAdim} onChange={handleMountsChange}></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">B</label>
                    <input id='sABdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text'  value={mountsData.sABdim} onChange={handleMountsChange}></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">C</label>
                    <input id='sACdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text'  value={mountsData.sACdim} onChange={handleMountsChange}></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">D</label>
                    <input id='sADdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text'  value={mountsData.sADdim} onChange={handleMountsChange}></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">E</label>
                    <input id='sAEdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text'  value={mountsData.sAEdim} onChange={handleMountsChange}></input>
                  </div>
                  <div className='space-x-2'>
                    <label className="text-sm text-gray-600">F</label>
                    <input id='sAFdim' className='form-control px-2 py-1 border-2 rounded-md' type='text' placeholder='enter text' value={mountsData.sAFdim} onChange={handleMountsChange} ></input>
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
          <div className='flex justify-between mt-3'>
            <button type="button" onClick={prevStep} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span><NavigateBeforeIcon/></span>Previous Step
            </button>
            <button onClick={handleSave} type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </form>
      );
    default:
      return null;
  }
};


// end of new form--------------


const handleOpen = (field) => {
  setSelectedField(field);
  setOpen(true);
};





  // excel data----------------------------------------------------------------------------------------

  const [excel,setExcel] = useState(false);
  const [inspection, setInspection] = useState(false)
  const navigate = useNavigate()


  const handleExcelOpen = () => {
    navigate()
    setExcel(true);
  }

  const handleInspectionOpen = () => {
    navigate()
    setInspection(true);
  }


  const [asBuiltData, setAsBuiltData] = useState({
    siteId: '',
    reportVersion: '',
    scanDate: '',
    mountLevel: '',
    noOperators: '',
    location:'',
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
    setInspection(false)
  }
 
  
  const handleSave = async () => {
    const formData = new FormData();

    // Add asBuiltData with unique keys
    formData.append('siteId', asBuiltData.siteId);
    formData.append('reportVersion', asBuiltData.reportVersion);
    formData.append('scanDate', asBuiltData.scanDate);
    formData.append('mountLevel', asBuiltData.mountLevel);
    formData.append('operators', asBuiltData.noOperators);
    formData.append('location', asBuiltData.location);

    // Antenna Layout
    formData.append('a2RadCenter', asBuiltData.a2RadCenter);
    formData.append('a2Azimuth', asBuiltData.a2Azimuth);
    formData.append('a2MechTilt', asBuiltData.a2MechTilt);

    formData.append('b2RadCenter', asBuiltData.b2RadCenter);
    formData.append('b2Azimuth', asBuiltData.b2Azimuth);
    formData.append('b2MechTilt', asBuiltData.b2MechTilt);

    formData.append('c2RadCenter', asBuiltData.c2RadCenter);
    formData.append('c2Azimuth', asBuiltData.c2Azimuth);
    formData.append('c2MechTilt', asBuiltData.c2MechTilt);

    // Swing Data
    formData.append('a2SwingRadCenter', swingData.a2RadCenter);
    formData.append('a2SwingAzimuth', swingData.a2Azimuth);
    formData.append('a2SwingMechTilt', swingData.a2MechTilt);
    formData.append('a2SwingSkew', swingData.a2Skew);
    formData.append('a2SwingAntSwingAngleNeg', swingData.a2AntSwingAngleNeg);
    formData.append('a2SwingAntSwingAnglePos', swingData.a2AntSwingAnglePos);

    formData.append('b2SwingRadCenter', swingData.b2RadCenter);
    formData.append('b2SwingAzimuth', swingData.b2Azimuth);
    formData.append('b2SwingMechTilt', swingData.b2MechTilt);
    formData.append('b2SwingSkew', swingData.b2Skew);
    formData.append('b2SwingAntSwingAngleNeg', swingData.b2AntSwingAngleNeg);
    formData.append('b2SwingAntSwingAnglePos', swingData.b2AntSwingAnglePos);

    formData.append('c2SwingRadCenter', swingData.c2RadCenter);
    formData.append('c2SwingAzimuth', swingData.c2Azimuth);
    formData.append('c2SwingMechTilt', swingData.c2MechTilt);
    formData.append('c2SwingSkew', swingData.c2Skew);
    formData.append('c2SwingAntSwingAngleNeg', swingData.c2AntSwingAngleNeg);
    formData.append('c2SwingAntSwingAnglePos', swingData.c2AntSwingAnglePos);

    // Repeat for b2Swing and c2Swing...

    // Mounts data with unique keys
    formData.append('sectorAP1Size', mountsData.sAp1size);
    formData.append('sectorAP1Length', mountsData.sAp1length);
    formData.append('sectorAP2Size', mountsData.sAp2size);
    formData.append('sectorAP2Length', mountsData.sAp2length);
    formData.append('sectorADimA',mountsData.sAAdim);
    formData.append('sectorADimB',mountsData.sABdim);
    formData.append('sectorADimC',mountsData.sACdim);
    formData.append('sectorADimD',mountsData.sADdim);
    formData.append('sectorADimE',mountsData.sAEdim);
    formData.append('sectorADimF',mountsData.sAFdim);

    formData.append('sectorBP1Size', mountsData.sBp1size);
    formData.append('sectorBP1Length', mountsData.sBp1length);
    formData.append('sectorBP2Size', mountsData.sBp2size);
    formData.append('sectorBP2Length', mountsData.sBp2length);
    formData.append('sectorBDimA',mountsData.sBAdim);
    formData.append('sectorBDimB',mountsData.sBBdim);
    formData.append('sectorBDimC',mountsData.sBCdim);
    formData.append('sectorBDimD',mountsData.sBDdim);
    formData.append('sectorBDimE',mountsData.sBEdim);
    formData.append('sectorBDimF',mountsData.sBFdim);

    formData.append('sectorCP1Size', mountsData.sCp1size);
    formData.append('sectorCP1Length', mountsData.sCp1length);
    formData.append('sectorCP2Size', mountsData.sCp2size);
    formData.append('sectorCP2Length', mountsData.sCp2length);
    formData.append('sectorCDimA',mountsData.sCAdim);
    formData.append('sectorCDimB',mountsData.sCBdim);
    formData.append('sectorCDimC',mountsData.sCCdim);
    formData.append('sectorCDimD',mountsData.sCDdim);
    formData.append('sectorCDimE',mountsData.sCEdim);
    formData.append('sectorCDimF',mountsData.sCFdim);
    

    // Image
    if (imageFile) {
      formData.append('image', imageFile); // Match the field name in Multer setup
  }
  
  try {
      const response = await axios.post('https://dt-dev-backend.onrender.com/api/form/submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Data submitted successfully:', response.data);
  } catch (error) {
      console.error('Error submitting data:', error);
  }
  
};


  return (
    <div className="h-screen">
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
      <Card onClick={handleInspectionOpen}>
        <Card.Body className="flex items-center cursor-pointer">
          <Typography variant="h6" color="blue-gray">
            Enter Inspection Details
          </Typography>
        </Card.Body>
      </Card>

      <FileUploadDialog
        open={open}
        setOpen={setOpen}
        uploadFiles={uploadFiles}
        files={files}
        setFiles={setFiles}
        tags={tags}
        setTags={setTags}
        uploadProgress={uploadProgress}
        estimatedTime={estimatedTime}
        cancelUpload={cancelUpload}
        isUploading={isUploading}
        message={message}
      />
      
    
   

      <Dialog open={excel} onClose={() => setExcel(false)} className="fixed insert-0 justify-center mx-[25%] my-[3%] w-[60%]">
  
  <button className="fixed absolute justify-between right-10 top-0 p-2 bg-gray-200 hover:bg-red-600 hover:text-white text-gray-600 rounded-[90%]" onClick={handleClose}><span><CloseIcon/></span></button>
    <div className='relative mx-auto max-w-5xl py-10 '>
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        {Array.from({ length: 3 }, (_, index) => {
          const currentStep = index + 1;
          const isActive = currentStep < step; // Previous steps are active
          const isCurrent = currentStep === step; // Current step
          const labels = ['Antenna Layout', 'Antenna Swing', 'Antenna Mount']; // Define labels here
          const icons = ['🗼', '📶', '🛠️'];
          return (

            <li key={index} className={`flex w-full items-center ml-16 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`items-center flex flex-col`}>
              <div className={`flex items-center justify-center w-10 h-10 ${isActive || isCurrent ? 'bg-blue-200' : 'bg-gray-100'} rounded-full lg:h-10 lg:w-10 dark:${isActive || isCurrent ? 'bg-blue-800' : 'bg-gray-700'} shrink-0`}>

                <span className={`text-2xl ${isActive || isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {icons[index]}
              </span>
              </div>
              <span className={`mt-2 text-center ${isActive || isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>{labels[index]}</span>
            </div>
            {currentStep < 3 && (
              <div className={`flex-grow mb-8 transition-all duration-300 ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </li>

          );
        })}
      </ol>
    
      {renderStep()}
     
    </div>
    </Dialog>
    <Dialog open={inspection} onClose={() => setInspection(false)} className="p-10 fixed insert-0 justify-center mx-[25%] my-[7%] w-[60%]">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Add Inspection Data
          </Typography>
          <button className="fixed absolute justify-between right-10 top-4 px-2 py-1 items-center bg-gray-200 hover:bg-red-600 hover:text-white text-gray-600 rounded-[100%]" onClick={handleClose}><span ><CloseIcon className="mb-1"/></span></button>
        </DialogHeader>
        <Inspection_form/>
      </Dialog>
    </div>
    </div>
  );
}

export default Uploads;