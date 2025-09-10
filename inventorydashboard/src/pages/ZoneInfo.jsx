/*import React from 'react';
import Sidebar from '../components/Sidebar';
import { useSession } from '../context/SessionContext'; 
import { initialZones } from '../data/zonesData'; 

const ZoneInfo = () => {
  const { sessionData } = useSession();
  const zoneId = sessionData?.zoneId;
  const zone = initialZones.find(z => z.zoneId === zoneId);
  const description = zone?.description || "Zone information is currently unavailable.";

  return (
    <>
      <Sidebar />
      <div className='p-6 bg-white min-h-screen relative z-10 ml-12'>
        <h1 className="text-3xl font-bold text-[#281e5d] mb-4">
          {zone?.zoneName}
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Zone Overview</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>Zone-based Bin Allocation</li>
            <li>Localized Stock Monitoring</li>
            <li>Zone-specific Alerts & Notifications</li>
            <li>Performance Metrics per Zone</li>
            <li>Scalable Zone Architecture</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Zone Location</h2>
          <p className="text-gray-700">
            This zone is part of the prototype setup located in <strong>Pune, Maharashtra</strong>, simulating a real-world warehouse environment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Developed By</h2>
          <p>
            Team 2 <br />
            Swapnil Thawale, Lokesh Dhote, Rugved Kamble, Tanmay Likhar<br />
            Programmer Analyst Trainees<br />
            Cognizant Technology Solutions<br />
            Pune, Maharashtra, India
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Year of Development</h2>
          <p>2025</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>React.js</li>
            <li>Tailwind CSS</li>
            <li>JavaScript</li>
            <li>Dummy JSON Data</li>
          </ul>
        </section>

        <footer className="border-t pt-4 mt-8 text-sm text-center text-gray-500">
          © 2025 Team 2 – InvenTrack<br />
          All rights reserved.<br />
          Designed and developed by Team 2<br />
          Cognizant Technology Solutions, Pune, MH
        </footer>
      </div>
    </>
  );
};

export default ZoneInfo;*/

import React from 'react';
import Sidebar from '../components/Sidebar';
import { useSession } from '../context/SessionContext';
import { initialZones } from '../data/zonesData';
import {
    HiInformationCircle,
    HiLocationMarker
} from 'react-icons/hi';
import {
    FaUsers,
    FaCalendarAlt,
    FaCode
} from 'react-icons/fa';

const ZoneInfo = () => {
    const { sessionData } = useSession();
    const zoneId = sessionData?.zoneId;
    const zone = initialZones.find(z => z.zoneId === zoneId);
    const description = zone?.description || "Zone information is currently unavailable.";

    return (
        <>
            <Sidebar />
            <div className="p-6 bg-gradient-to-br from-white to-[#f0f4ff] min-h-screen ml-12 relative z-10">
                <h1 className="text-3xl font-bold text-[#281e5d] mb-6 border-b pb-2">
                    {zone?.zoneName || "Zone Info"}
                </h1>

                {/* Zone Overview */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <HiInformationCircle className="h-6 w-6 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold">Zone Overview</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                    <ul className="list-disc list-inside mt-3 text-gray-700">
                        <li>Zone-based Bin Allocation</li>
                        <li>Localized Stock Monitoring</li>
                        <li>Zone-specific Alerts & Notifications</li>
                        <li>Performance Metrics per Zone</li>
                        <li>Scalable Zone Architecture</li>
                    </ul>
                </section>

                {/* Location */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <HiLocationMarker className="h-6 w-6 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold">Zone Location</h2>
                    </div>
                    <p className="text-gray-700">
                        This zone is part of the prototype setup located in <strong>Pune, Maharashtra</strong>, simulating a real-world warehouse environment.
                    </p>
                </section>

                {/* Developed By */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaUsers className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold">Developed By</h2>
                    </div>
                    <p className="text-gray-700">
                        Team 2 <br />
                        Swapnil Thawale, Lokesh Dhote, Rugved Kamble, Tanmay Likhar<br />
                        Programmer Analyst Trainees<br />
                        Cognizant Technology Solutions<br />
                        Pune, Maharashtra, India
                    </p>
                </section>

                {/* Year */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold">Year of Development</h2>
                    </div>
                    <p className="text-gray-700">2025</p>
                </section>

                {/* Technologies */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaCode className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold">Technologies Used</h2>
                    </div>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>React.js</li>
                        <li>Tailwind CSS</li>
                        <li>JavaScript</li>
                        <li>Dummy JSON Data</li>
                    </ul>
                </section>

                {/* Footer */}
                <footer className="border-t pt-4 mt-8 text-sm text-center text-gray-500">
                    © 2025 Team 2 – InvenTrack<br />
                    All rights reserved.<br />
                    Designed and developed by Team 2<br />
                    Cognizant Technology Solutions, Pune, MH
                </footer>
            </div>
        </>
    );
};

export default ZoneInfo;
