import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Dialog,
} from "@material-tailwind/react";
import ExcelImage from '../../img/excel.webp';
import ObjImage from '../../img/obj.png';
import LazImage from '../../img/laz.avif';
import KmlImage from '../../img/kml.webp';
import PdfImage from '../../img/pdf.webp';
import { useNavigate } from "react-router-dom";
import TowerHeader from "./Towerpages/TowerHeader";

export function Towers() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedTowerDetails, setSelectedTowerDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [towerName, setTowerName] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileType, setFileType] = useState(""); // For filtering files by type

  const navigate = useNavigate();
// console.log("site id :",towerName)
const HandleOpen = (tower) => {
  setTowerName(tower.siteId);
  setOpen(true);
  setSelectedTowerDetails(tower);
  fetchFiles(tower.siteId); // Fetch files when opening the dialog
};


  const handleTowerClick = (tower) => {
    setSelectedTower(tower.siteId);
    setSelectedTowerDetails(tower);
  };

  const handlenavigate = (link, towerData) => {
    if (link) {
      navigate(link, { state: { tower: towerData } });
    } else {
      console.warn("No link provided for navigation.");
    }
  };

  const fetchFiles = async (siteId) => {
    setLoading(true);
    // console.log("from fetch",siteId)
    setError(null);

    try {
      const apiUrl = `http://localhost:3000/api/upload/files/${siteId}`;
      const response = await axios.get(apiUrl, { params: { type: fileType } });

      if (response.data && Array.isArray(response.data.files)) {
        // Filter files on the frontend if backend does not support filtering by fileType
        const filteredFiles = fileType
          ? response.data.files.filter((file) => file.fileType === fileType)
          : response.data.files;

        setFiles(filteredFiles);
      } else {
        setFiles([]);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(err.response?.data?.message || "An error occurred");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filePath) => {
    fetchFiles(towerName);
    try {
      const filePathForDropbox = filePath.startsWith("/") ? filePath : `/${filePath}`;
      const downloadLinkResponse = await axios.post(
        "https://api.dropboxapi.com/2/files/get_temporary_link",
        { path: filePathForDropbox },
        {
          headers: {
            Authorization: `Bearer ${"dropboxtoken"}`, // Replace with your actual Dropbox access token
          },
        }
      );

      const downloadLink = downloadLinkResponse.data.link;
      window.open(downloadLink, "_blank");
    } catch (error) {
      console.error("Error generating download link:", error);
      alert("Failed to download file.");
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/form/antenna-layouts");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((document) =>
    document.siteId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    document.reportVersion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cardData = [
    { name: "Excel file", img: ExcelImage, link: "/admin/home/excel" },
    { name: "Obj file", img: ObjImage, type: "obj" },
    { name: "Laz file", img: LazImage, type: "laz" },
    { name: "Kml file", img: KmlImage, type: "kml" },
    { name: "Pdf file", img: PdfImage, type: "pdf" },
  ];
  

  return (
    <div className="mt-6 px-5 h-screen">
      {!selectedTower ? (
        <div className="mb-4 mt-12 grid grid-cols-1 gap-5 xl:grid-cols-1">
          <Card className="overflow-hidden">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
              <div className="flex items-end gap-4">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Towers
                </Typography>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md py-1 px-4"
                />
              </div>
            </CardHeader>
            <CardBody className="overflow-x-auto max-h-[750px] overflow-y-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Site ID", "Report Version", "Scan Date", "Mount Level", "Actions"].map((el, index) => (
                      <th key={index} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document, key) => (
                    <tr key={key} className="cursor-pointer">
                      <td className="py-3 px-5 border-b border-blue-gray-50" onClick={() => handleTowerClick(document)}>
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {document.siteId}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {document.reportVersion}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {document.scanDate}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {document.mountLevel}
                        </Typography>
                      </td>
                      <td className="py-3 px-1 border-b">
                        <button onClick={() => HandleOpen(document)} className="text-blue-600 font-semibold border-b hover:border-blue-600">
                          Downloads
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      ) : (
        <TowerHeader goBack={() => setSelectedTower(null)} towerDetails={selectedTowerDetails} />
      )}



<Dialog open={open} onClose={() => setOpen(false)} className="fixed flex items-center mx-[25%] my-[14%] w-[60%] justify-center bg-blue-100 z-50 shadow-xl">
  <div className="py-3 flex flex-col items-center">
    <h1 className="text-xl font-bold pt-7 text-center">Download Documents</h1>
    <h1 className="text-center font-semibold mb-5">{towerName}</h1>
    {loading ? (
      <div className="text-center text-blue-500 font-medium">Loading files...</div>
    ) : error ? (
      <div className="text-center text-red-500 font-medium">{error}</div>
    ) : (
      <div className="gap-16 py-14 items-center flex flex-wrap">
        {cardData.map((data, index) => {
          if (data.name === "Excel file") {
            // Special handling for Excel file
            return (
              <div key={index} className="flex items-center flex-col">
                <img src={data.img} className="w-8 h-8 mb-2 rounded-full" alt={data.name} />
                <button
                  onClick={() => handlenavigate(data.link, selectedTowerDetails)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Download {data.name}
                </button>
              </div>
            );
          } else {
            // Handle other files using fetched data
            const file = files.find((file) => file.fileType === data.type);

            return (
              <div key={index} className="flex items-center flex-col">
                <img src={data.img} className="w-8 h-8 mb-2 rounded-full" alt={data.name} />
                {file ? (
                  <button
                    onClick={() => handleDownload(file.filePath)} // Use filePath from the fetched file
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Download {data.name}
                  </button>
                ) : (
                  <span className="text-gray-500 font-medium text-sm">Not Available</span>
                )}
              </div>
            );
          }
        })}
      </div>
    )}
    <div className="w-full flex justify-center mt-6">
      <button
        className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        onClick={() => setOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
</Dialog>

    </div>
  );
}

export default Towers;