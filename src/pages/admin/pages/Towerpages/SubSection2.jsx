import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Card,
  CardBody,
} from "@material-tailwind/react";
import towerImage from '../../../img/tower.png';
import layout from '../../../img/bsnl-ANTEENALAYOUT.png';
import swing from '../../../img/swing.png';
import mount from '../../../img/bsnl-mount.png'
import mount1 from '../../../img/mountssector.png'

export function SubSection2({ goBack, towerDetails  }) {
  if (!towerDetails) return err;
  console.log("tower details:",towerDetails)
  console.log("Antenna layout data:",towerDetails.siteId)


  const layoutdesign = [
    { p1: 'A1', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: '100' , AZ: '0' , MT: '0.0' },
    { p1: 'B1', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: '100' , AZ: '120' , MT: '0.0' },
    { p1: 'C1', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: '100' , AZ: '240' , MT: '0.0' },
    { p1: 'A1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'A1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'B1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'B1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' , },
    { p1: 'C1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'C1', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    {  type: 'OVO' , Qty: '1' ,Manf: 'RAYCAP' , Model: 'FFVV-65B-R2' ,  }
  ]

  const Asdesign = [
    { p1: 'A2', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: towerDetails.AntennaLayouta2.radCenter , AZ: towerDetails.AntennaLayouta2.azimuth , MT: towerDetails.AntennaLayouta2.mechTilt },
    { p1: 'B2', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: towerDetails.AntennaLayoutb2.radCenter , AZ: towerDetails.AntennaLayoutb2.azimuth , MT: towerDetails.AntennaLayoutb2.mechTilt },
    { p1: 'C2', type: 'Antenna' , Qty: '1' ,Manf: 'COMMSCOPE' , Model: 'FFVV-65B-R2' , RD: towerDetails.AntennaLayoutc2.radCenter , AZ: towerDetails.AntennaLayoutc2.azimuth , MT: towerDetails.AntennaLayoutc2.mechTilt },
    { p1: 'A2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'A2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'B2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'B2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' , },
    { p1: 'C2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    { p1: 'C2', type: 'RRH' , Qty: '1' ,Manf: 'FUJITSU' , Model: 'TA8085-B605' ,  },
    {  type: 'OVO' , Qty: '1' ,Manf: 'RAYCAP' , Model: 'FFVV-65B-R2' ,  }
  ]

  const swingdesign = [
    { p: 'A1', RC: towerDetails.a2Swing.radCenter, Az: towerDetails.a2Swing.azimuth, MAz: towerDetails.a2Swing.mechTilt, Sk: towerDetails.a2Swing.skew, ASA: towerDetails.a2Swing.antSwingAngleNeg, ASN: towerDetails.a2Swing.antSwingAnglePos },
    { p: 'B2', RC: towerDetails.b2Swing.radCenter, Az: towerDetails.b2Swing.azimuth, MAz: towerDetails.b2Swing.mechTilt, Sk: towerDetails.b2Swing.skew, ASA: towerDetails.b2Swing.antSwingAngleNeg, ASN: towerDetails.b2Swing.antSwingAnglePos },
    { p: 'C2', RC: towerDetails.c2Swing.radCenter, Az: towerDetails.c2Swing.azimuth, MAz: towerDetails.c2Swing.mechTilt, Sk: towerDetails.c2Swing.skew, ASA: towerDetails.c2Swing.antSwingAngleNeg, ASN: towerDetails.c2Swing.antSwingAnglePos },
  ]

  const msA = [
    {mark : 'P1', type: 'Pipe' , size: '2.8 " OD', len: towerDetails.mounts.sectorA.memberSchedule.p1Length || '5.1'},
    {mark : 'P2', type: 'Pipe' , size: '2 " OD', len: towerDetails.mounts.sectorA.memberSchedule.p1Length || "7.3"},
    {mark : 'P3', type: 'Pipe' , size: '2.8 " OD', len: ' 5.8'},
  ]

  const Dim = [
    { mark: 'A', Dim: '1.9'},
    { mark: 'B', Dim: '2.1'},
    { mark: 'C', Dim: '2.2'},
    { mark: 'D', Dim: '3.0'},
    { mark: 'E', Dim: '2.2'},
    { mark: 'F', Dim: '3.5'},
  ]

  return (
    <div>
      <div className="px-4">
        <div className="mb-8">
          <Typography variant="h4" className="mb-4">
            ANTENNA LAYOUT
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4 h-auto">
              <Typography variant="h6" className="text-center text-red-400">Antenna Layout ( Design )</Typography>
              <img src={towerImage} className="w-[50%] mx-auto my-3"></img>
              <table className="mt-4">
                <thead>
                    <tr className="bg-gray-100 text-xs">
                      <th className="border border-gray-300 px-2">Position</th>
                      <th className="border border-gray-300 ">Type</th>
                      <th className="border border-gray-300 ">Qty.</th>
                      <th className="border border-gray-300 ">Manufacturer</th>
                      <th className="border border-gray-300 ">Model No.</th>
                      <th className="border border-gray-300 ">Rad Center (ft)</th>
                      <th className="border border-gray-300 ">Azimuth (deg)</th>
                      <th className="border border-gray-300 ">Position (deg)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    layoutdesign.map((item,index) => (
                      <tr key={index} className="text-sm">
                        <td className="border border-gray-300 px-4">{item.p1 || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.type}</td>
                        <td className="border border-gray-300 px-4">{item.Qty}</td>
                        <td className="border border-gray-300 px-4">{item.Manf}</td>
                        <td className="border border-gray-300 px-4">{item.Model}</td>
                        <td className="border border-gray-300 px-4">{item.RD || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.AZ || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.MT || '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Card>
            <Card className="p-4 h-auto">
              <Typography variant="h6" className="text-center text-red-400">Antenna Layout ( As-Built )</Typography>
              <img src={layout} className="w-[50%] h-[42%] mx-auto my-3"></img>
              <table className="mt-4">
                <thead>
                    <tr className="bg-gray-100 text-xs">
                      <th className="border border-gray-300 px-2">Position</th>
                      <th className="border border-gray-300 ">Type</th>
                      <th className="border border-gray-300 ">Qty.</th>
                      <th className="border border-gray-300 ">Manufacturer</th>
                      <th className="border border-gray-300 ">Model No.</th>
                      <th className="border border-gray-300 ">Rad Center (ft)</th>
                      <th className="border border-gray-300 ">Azimuth (deg)</th>
                      <th className="border border-gray-300 ">Position (deg)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Asdesign.map((item,index) => (
                      <tr key={index} className="text-sm">
                        <td className="border border-gray-300 px-4">{item.p1 || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.type}</td>
                        <td className="border border-gray-300 px-4">{item.Qty}</td>
                        <td className="border border-gray-300 px-4">{item.Manf}</td>
                        <td className="border border-gray-300 px-4">{item.Model}</td>
                        <td className="border border-gray-300 px-4">{item.RD || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.AZ || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.MT || '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </Card>
          </div>
        </div>

        <div className="mb-8">
          <Typography variant="h4" className="mb-4">
            ANTENNA SWING
          </Typography>
          <Card className="p-4 h-auto grid md:grid-cols-2">
            <img src= {swing} className="w-[60%]"></img>     
            <div>
              <h1 className="text-center text-2xl font-semibold">Antenna Swing Limit</h1>
            <table className="mt-8">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Position</th>
                      <th className="border border-gray-300 ">Rad Center (ft)</th>
                      <th className="border border-gray-300 ">Azimuth (deg)</th>
                      <th className="border border-gray-300 ">Mount Azimuth (deg)</th>
                      <th className="border border-gray-300 ">Skew (deg)</th>
                      <th className="border border-gray-300 ">Ant Swing Angle (-deg)</th>
                      <th className="border border-gray-300 ">Ant Swing Angle (+deg)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    swingdesign.map((item,index) => (
                      <tr key={index} className="text-sm">
                        <td className="border border-gray-300 px-4">{item.p || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.RC}</td>
                        <td className="border border-gray-300 px-4">{item.Az}</td>
                        <td className="border border-gray-300 px-4">{item.MAz}</td>
                        <td className="border border-gray-300 px-4">{item.Sk}</td>
                        <td className="border border-gray-300 px-4">{item.ASA || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.ASN || '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <h1 className='mt-10 text-md font-semibold'>Minimum Swing Angle Tolerance =    20 degree</h1>
              <h1 className="mt-5 text-sm text-red-400">* If available Swing Angle is less then " Minimum Swing Angle Tolerance" in either direction, cell will be highlighted in "RED"</h1>
            </div> 
          </Card>
        </div>
        
        <Typography variant="h2" className="mb-8">
          MOUNTS
        </Typography>
        

        <div className="mb-8">

          <div className="my-5">
            <Card className="p-5 grid md:grid-cols-2">
              <img src={mount} className="w-[50%] h-[400px] mx-auto rounded-md"></img>
              <img src={mount1} className="w-[80%] mx-auto"></img>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <Card className="p-4 h-auto">
            <Typography variant="h6" className="text-red-400">Sector A</Typography>
              <Typography variant="h6" className="text-sm mt-3">Member Schedule</Typography>
              <table className="mt-3">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Type</th>
                      <th className="border border-gray-300 ">Size</th>
                      <th className="border border-gray-300 ">Length (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    msA.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.type}</td>
                        <td className="border border-gray-300 px-4">{item.size || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.len}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Typography variant="h6" className="text-sm mt-4">Dimensions</Typography>
              <table className="mt-3 w-[75%]">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Dim (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Dim.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.Dim}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Card>
            <Card className="p-4 h-auto">
            <Typography variant="h6" className="text-red-400">Sector B</Typography>
              <Typography variant="h6" className="text-sm mt-3">Member Schedule</Typography>
              <table className="mt-3">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Type</th>
                      <th className="border border-gray-300 ">Size</th>
                      <th className="border border-gray-300 ">Length (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    msA.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.type}</td>
                        <td className="border border-gray-300 px-4">{item.size || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.len}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Typography variant="h6" className="text-sm mt-4">Dimensions</Typography>
              <table className="mt-3 w-[75%]">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Dim (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Dim.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.Dim}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Card>
            <Card className="p-4 h-auto">
            <Typography variant="h6" className="text-red-400">Sector C</Typography>
              <Typography variant="h6" className="text-sm mt-3">Member Schedule</Typography>
              <table className="mt-3">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Type</th>
                      <th className="border border-gray-300 ">Size</th>
                      <th className="border border-gray-300 ">Length (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    msA.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.type}</td>
                        <td className="border border-gray-300 px-4">{item.size || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.len}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Typography variant="h6" className="text-sm mt-4">Dimensions</Typography>
              <table className="mt-3 w-[75%]">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-2">Mark</th>
                      <th className="border border-gray-300 ">Dim (ft)</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Dim.map((item,index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="border border-gray-300 px-4">{item.mark || '-'}</td>
                        <td className="border border-gray-300 px-4">{item.Dim}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubSection2;