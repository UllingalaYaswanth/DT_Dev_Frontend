import React, { useState } from "react";
import SubSection1 from "./SubSection1";
import SubSection2 from "./SubSection2";
import SubSection3 from "./SubSection3";
import SubSection4 from "./SubSection4";
import SubSection5 from "./SubSection5";

function TowerHeader({goBack, towerDetails }) {
  const [activeTab, setActiveTab] = useState(1);

  // Function to change the active tab
  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="tower-header px-5">
        <button
          onClick={goBack}
          className=" px-4 py-2 bg-blue-500 text-white rounded mb-2"
        >
          Back
        </button>
        <div className="bg-white rounded-lg">
      <div className="flex items-center py-5  p-2">
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <h2 className="text-lg font-semibold mb-1">{towerDetails.siteId}</h2>
              <p className="font-semibold text-green-500"> · Processing</p>
            </div>
            <div className="flex text-sm text-gray-600 mb-1 gap-20">
              <p className="text-lg">Total Operators<span> : {towerDetails.noOperators}</span></p>
              <p className="text-lg">Location <span> : {towerDetails.location}</span></p>
              <p className="text-lg">ScanDate<span> : {towerDetails.scanDate}</span></p>
              <p className="text-lg">Report Version<span> : {towerDetails.reportVersion}</span></p>
            </div>
          </div>
        </div>
      <div className="flex space-x-6 border-b-2 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabChange(1)}
        >
          Tower Details
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabChange(2)}
        >
          Antenna Layout
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 3 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabChange(3)}
        >
          System Status
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 4 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabChange(4)}
        >
          Inspection
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 5 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabChange(5)}
        >
          Logs
        </button>
      </div>
      </div>
      {/* Render the active sub-section */}
      {activeTab === 1 && <SubSection1 towerDetails={towerDetails} />}
      {activeTab === 2 && <SubSection2 towerDetails={towerDetails} />}
      {activeTab === 3 && <SubSection3 towerDetails={towerDetails} />}
      {activeTab === 4 && <SubSection4 towerDetails={towerDetails} />}
      {activeTab === 5 && <SubSection5 towerDetails={towerDetails} />}
    </div>
  );
}

export default TowerHeader;
