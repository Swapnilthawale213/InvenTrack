/*import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const Info = () => {
  return (
    <>
    <AdminSidebar />
      <div className='p-6 bg-white min-h-screen relative z-10 ml-12'>
        <h1 className="text-3xl font-bold text-[#281e5d] mb-4">
            InvenTrack (admin panel)
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-[#281e5d]">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            The <strong>InvenTrack</strong> is a prototype designed to simulate real-time inventory tracking using dummy data. This system demonstrates how smart technologies can be integrated into warehouse or retail environments to monitor stock levels efficiently and reduce manual errors.
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>Real-time Stock Simulation</li>
            <li>Bin-Level Monitoring</li>
            <li>Alerts & Notifications</li>
            <li>Dashboard Interface</li>
            <li>Modular Design</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Created By</h2>
          <p>Team 2 <br /> Swapnil Thawale, Lokesh Dhote, Rugved Kamble, Tanmay Likhar
            Programmer Analyst Trainne<br />
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

export default Info;*/


import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import {
    HiInformationCircle,
    HiLocationMarker
} from 'react-icons/hi';
import {
    FaUsers,
    FaCalendarAlt,
    FaCode
} from 'react-icons/fa';

const Info = () => {
    return (
        <>
            <AdminSidebar />
            <div className="p-6 bg-gradient-to-br from-white to-[#f0f4ff] min-h-screen relative z-10 ml-12">
                <h1 className="text-3xl font-bold text-[#281e5d] mb-6 border-b pb-2">
                    InvenTrack (admin panel)
                </h1>

                {/* Project Overview */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <HiInformationCircle className="h-6 w-6 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold text-[#281e5d]">Project Overview</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        The <strong>InvenTrack</strong> is a prototype designed to simulate real-time inventory tracking using dummy data. This system demonstrates how smart technologies can be integrated into warehouse or retail environments to monitor stock levels efficiently and reduce manual errors.
                    </p>
                    <ul className="list-disc list-inside mt-3 text-gray-700">
                        <li>Real-time Stock Simulation</li>
                        <li>Bin-Level Monitoring</li>
                        <li>Alerts & Notifications</li>
                        <li>Dashboard Interface</li>
                        <li>Modular Design</li>
                    </ul>
                </section>

                {/* Created By */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaUsers className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold text-[#281e5d]">Created By</h2>
                    </div>
                    <p className="text-gray-700">
                        Team 2 <br />
                        Swapnil Thawale, Lokesh Dhote, Rugved Kamble, Tanmay Likhar<br />
                        Programmer Analyst Trainees<br />
                        Cognizant Technology Solutions<br />
                        Pune, Maharashtra, India
                    </p>
                </section>

                {/* Year of Development */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold text-[#281e5d]">Year of Development</h2>
                    </div>
                    <p className="text-gray-700">2025</p>
                </section>

                {/* Technologies Used */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <FaCode className="h-5 w-5 text-[#281e5d] mr-2" />
                        <h2 className="text-xl font-semibold text-[#281e5d]">Technologies Used</h2>
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

export default Info;
