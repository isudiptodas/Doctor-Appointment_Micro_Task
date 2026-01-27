import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { userMenuStore } from '../../zustand/userMenuStore';
import UserNavbar from '../../components/UserNavbar';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LuChevronsUpDown } from "react-icons/lu";

interface Appointment {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  doctorEmail: string;
  appointmentDate: Date;
  timeSlot: string;
  created?: Date;
}


function Home() {

  const location = useLocation();
  const { isOpen } = userMenuStore();
  const [allAppointments, setAllAppointments] = useState<null | Appointment[]>(null);
  const [appointmentOption, setAppointmentOption] = useState('upcoming');
  const [optionVisible, setOptionVisible] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState<null | Appointment[] | undefined>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }
    else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/get-all-appointments`, {
          withCredentials: true
        });

        console.log(res.data);
        setAllAppointments(res.data.found);

        const filtered = res.data.found.filter((item: Appointment) => {
          const appointmentDate = new Date(item.appointmentDate);
          appointmentDate.setHours(0, 0, 0, 0);

          return appointmentDate > today;
        });

        setFilteredAppointments(filtered);

      } catch (err: any) {
        console.log(err);
      }
    }

    fetchAllAppointments();
  }, []);

  useEffect(() => {
    if (appointmentOption === 'today') {
      const filtered = allAppointments?.filter((item: Appointment) => {
        const appointmentDate = new Date(item.appointmentDate);
        appointmentDate.setHours(0, 0, 0, 0);

        return appointmentDate.getTime() === today.getTime();
      });

      setFilteredAppointments(filtered);
    }
    if (appointmentOption === 'past') {
      const filtered = allAppointments?.filter((item: Appointment) => {
        const appointmentDate = new Date(item.appointmentDate);
        appointmentDate.setHours(0, 0, 0, 0);

        return appointmentDate < today;
      });

      setFilteredAppointments(filtered);
    }
    if (appointmentOption === 'upcoming') {
      const filtered = allAppointments?.filter((item: Appointment) => {
        const appointmentDate = new Date(item.appointmentDate);
        appointmentDate.setHours(0, 0, 0, 0);

        return appointmentDate > today;
      });

      setFilteredAppointments(filtered);
    }
  }, [appointmentOption]);

  const formatDate = (dateInput: Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <>
      <div className={`w-full min-h-screen relative flex flex-col justify-start items-center overflow-y-auto hide-scrollbar`}>
        <UserNavbar pathname={location.pathname} />

        <h1 className={`w-full text-center mt-20 md:mt-24 lg:mt-20 text-black text-2xl font-Telegraf font-semibold`}>Manage Appointments</h1>
        <motion.div
          onClick={() => setOptionVisible(!optionVisible)}
          animate={{ height: optionVisible ? "135px" : "50px" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`w-[95%] md:hidden flex justify-between items-start py-3 px-3 border border-orange-500 rounded-md bg-white shadow-lg mt-5 overflow-hidden relative`}>
          <p className={`font-Telegraf text-lg text-orange-400 font-semibold capitalize`}>{appointmentOption}</p>
          <span><LuChevronsUpDown /></span>

          <div className={`absolute top-12 w-full flex flex-col justify-start items-center`}>
            <p onClick={() => { setAppointmentOption('past'); setOptionVisible(false) }} className={`w-full ${appointmentOption === 'past' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Past</p>
            <p onClick={() => { setAppointmentOption('upcoming'); setOptionVisible(false) }} className={`w-full ${appointmentOption === 'upcoming' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Upcoming</p>
            <p onClick={() => { setAppointmentOption('today'); setOptionVisible(false) }} className={`w-full ${appointmentOption === 'today' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Today</p>
          </div>
        </motion.div>

        <div className={`w-full px-3 mt-7 md:hidden grid grid-cols-1 justify-items-center gap-4`}>
          {filteredAppointments && filteredAppointments.map((item, index) => {
            return <div key={index} className={`w-full bg-gray-200 flex flex-col justify-start items-center rounded-lg py-4 px-4`}>
              <h1 className={`w-full text-start font-Telegraf text-xl font-semibold`}>{item.doctorName}</h1>
              <h1 className={`w-full text-start font-Telegraf text-sm`}>{formatDate(item.appointmentDate)}</h1>
            </div>
          })}
        </div>

        <div className={`w-full xl:w-[85%] px-5 mt-7 hidden md:flex justify-between items-center gap-3`}>
            
            {/* past */}
            <div className={`w-[30%] min-h-[80vh] px-4 py-4 flex flex-col justify-start items-center bg-gray-100 rounded-xl`}>
              <h1 className={`w-full text-center text-xl font-Telegraf`}>Past</h1>
              <div className={`w-[90%] h-px bg-linear-to-r from-gray-100 via-black to-gray-100 my-2`}/>
            </div>

            {/* today */}
            <div className={`w-[40%] min-h-[80vh] px-4 py-4 flex flex-col justify-start items-center bg-gray-100 rounded-xl`}>
              <h1 className={`w-full text-center text-xl font-Telegraf`}>Today</h1>
              <div className={`w-[90%] h-px bg-linear-to-r from-gray-100 via-black to-gray-100 my-2`}/>
            </div>

            {/* upcoming */}
            <div className={`w-[30%] min-h-[80vh] px-4 py-4 flex flex-col justify-start items-center bg-gray-100 rounded-xl`}>
              <h1 className={`w-full text-center text-xl font-Telegraf`}>Upcoming</h1>
              <div className={`w-[90%] h-px bg-linear-to-r from-gray-100 via-black to-gray-100 my-2`}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home