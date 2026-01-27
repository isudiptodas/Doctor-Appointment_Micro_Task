import { useLocation } from "react-router-dom"
import DoctorNavbar from "../../components/DoctorNavbar"
import { doctorMenuStore } from "../../zustand/doctorMenuStore";
import { useEffect, useState } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { motion } from 'framer-motion';

function DoctorHome() {

  const location = useLocation();
  const { isOpen } = doctorMenuStore();
  const [appointmentOption, setAppointmentOption] = useState('today');
  const [optionVisible, setOptionVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }
    else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <div className={`w-full min-h-screen relative overflow-hidden flex flex-col justify-start items-center`}>
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />

        <DoctorNavbar pathname={location.pathname} />

        {/* appointments option */}
        <div className={`w-full z-20 h-auto flex justify-center items-center gap-3 relative`}>

          {/* mobile option */}
          <motion.div
           onClick={() => setOptionVisible(!optionVisible)}
            animate={{ height: optionVisible ? "135px" : "50px" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`w-[95%] md:hidden flex justify-between items-start py-3 px-3 border border-orange-500 rounded-md bg-white shadow-lg mt-20 overflow-hidden relative`}>
            <p className={`font-Telegraf text-lg text-orange-400 font-semibold capitalize`}>{appointmentOption}</p>
            <span><LuChevronsUpDown /></span>

            <div className={`absolute top-12 w-full flex flex-col justify-start items-center`}>
              <p onClick={() => {setAppointmentOption('past'); setOptionVisible(false)}} className={`w-full ${appointmentOption === 'past' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Past</p>
              <p onClick={() => {setAppointmentOption('upcoming'); setOptionVisible(false)}} className={`w-full ${appointmentOption === 'upcoming' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Upcoming</p>
              <p onClick={() => {setAppointmentOption('today'); setOptionVisible(false)}} className={`w-full ${appointmentOption === 'today' ? "hidden" : "block"} py-1 text-start capitalize text-lg font-Telegraf`}>Today</p>
            </div>
          </motion.div>


        </div>
      </div>
    </>
  )
}

export default DoctorHome
