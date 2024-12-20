import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Card,
  CardBody,
} from "@material-tailwind/react";
import * as OV from 'online-3d-viewer';

export function SubSection3({ goBack, towerDetails  }) {
  if (!towerDetails) return err;
  console.log("tower details:",towerDetails)
  console.log("Antenna layout data:",towerDetails.siteId)
  const userEmail = localStorage.getItem('userEmail');

  const operators = [
    {
        name: "Operator A",
        radiationLevel: "75 µSv/h",
        safeLimit: "100 µSv/h",
        status: "Caution",
        interferenceLevel: "Low",
        powerSupply: "Stable",
        interferenceDetails: {
            frequency: "2.4 GHz",
            signalStrength: "-70 dBm",
            noiseLevel: "-90 dBm"
        },
        powerDetails: {
            voltage: "12V",
            current: "5A",
            consumption: "60W"
        }
    },
    {
        name: "Operator B",
        radiationLevel: "90 µSv/h",
        safeLimit: "100 µSv/h",
        status: "Warning",
        interferenceLevel: "Moderate",
        powerSupply: "Unstable",
        interferenceDetails: {
            frequency: "2.4 GHz",
            signalStrength: "-65 dBm",
            noiseLevel: "-80 dBm"
        },
        powerDetails: {
            voltage: "11V",
            current: "4A",
            consumption: "45W"
        }
    },
    {
        name: "Operator C",
        radiationLevel: "60 µSv/h",
        safeLimit: "100 µSv/h",
        status: "Normal",
        interferenceLevel: "Low",
        powerSupply: "Stable",
        interferenceDetails: {
            frequency: "2.4 GHz",
            signalStrength: "-75 dBm",
            noiseLevel: "-85 dBm"
        },
        powerDetails: {
            voltage: "12V",
            current: "3A",
            consumption: "36W"
        }
    }
];

// Determine which cards to display
let cardsToDisplay = [];
if (userEmail === 'admin@gmail.com') {
    cardsToDisplay = operators; // Show all cards
} else if (userEmail === 'operator@gmail.com') {
    cardsToDisplay = [operators[0]]; // Show only Operator A's card
}




  return (
    <div>
      <div className="px-4">
    <Typography variant="h4" className="mb-8">
        SYSTEM STATUS
        </Typography>
         <div className="grid md:grid-cols-3 gap-3">
            {cardsToDisplay.map((operator, index) => (
                <Card key={index}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h1 className="text-2xl text-blue-500 font-bold mb-4">{operator.name}</h1>
                            <h1 className="text-lg font-bold mb-4">Radiation Level</h1>
                            <div className="mb-4">
                                <h2 className="text-sm">
                                    <span className="font-semibold">Current Radiation Level:</span> {operator.radiationLevel} (as of October 15, 2024)
                                </h2>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-sm">
                                    <span className="font-semibold">Safe Limit:</span> {operator.safeLimit}
                                </h2>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-sm items-center">
                                    <span className="font-semibold">Status:</span> 
                                    <span className={`font-semibold ${operator.status === "Normal" ? "text-green-500" : operator.status === "Warning" ? "text-yellow-500" : "text-red-500"}`}> {operator.status}</span>
                                </h2>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg mb-3">
                                    <span className="font-semibold">Interference Level:</span>
                                    <span className={`font-semibold ${operator.interferenceLevel === "Low" ? "text-green-500" : operator.interferenceLevel === "Moderate" ? "text-yellow-500" : "text-red-500"}`}> {operator.interferenceLevel}</span>
                                </h2>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Frequency: {operator.interferenceDetails.frequency}</li>
                                    <li>Signal Strength: {operator.interferenceDetails.signalStrength}</li>
                                    <li>Noise Level: {operator.interferenceDetails.noiseLevel}</li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg mb-3">
                                    <span className="font-semibold">Power Supply:</span>
                                    <span className={`font-semibold ${operator.powerSupply === "Stable" ? "text-green-500" : "text-red-500"}`}> {operator.powerSupply}</span>
                                </h2>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Voltage: {operator.powerDetails.voltage}</li>
                                    <li>Current: {operator.powerDetails.current}</li>
                                    <li>Power Consumption: {operator.powerDetails.consumption}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SubSection3;