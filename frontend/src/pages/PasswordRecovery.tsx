import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import OtpInput from '../components/tailgrids/core/otp-input';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function PasswordRecovery() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('user');
    const [mailValid, setMailValid] = useState(false);
    const [value, setValue] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [generatedOTP, setGeneratedOTP] = useState('');

    const checkMail = async () => {
        if (!email) {
            toast.error("Email required");
            return;
        }

        const msg = toast.loading("Processing...")
        const temp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOTP(temp.toString());

        try {
            const res = await axios.post(`http://localhost:5000/api/check-email`, {
                email: email.trim(), role: selected, otp: temp
            }, { withCredentials: true });

            if (res.status === 200) {
                toast.success("OTP sent on email");
                setMailValid(true);
            }
        } catch (err: any) {
            if (err.response.data.message) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error("Something went wrong");
            }
        }
        finally {
            toast.dismiss(msg);
        }
    }

    useEffect(() => {
        const checkOTP = () => {
            if (value.length === 4) {
                if (generatedOTP.toString() === value) {
                    toast.success("OTP verified");
                    setOtpVerified(true);
                }
                else {
                    toast.error("Invalid OTP");
                }
            }
        }
        checkOTP();
    }, [value, generatedOTP]);

    const changePassword = async () => {
        if (!password || !confirm) {
            toast.error("Both fields required");
            return;
        }

        if (password.trim() !== confirm.trim()) {
            toast.error("Passwords do not match");
            return;
        }

        if(password.length < 8){
            toast.error("Password length must be 8");
            return;
        }

        if(!/\d/.test(password)){
            toast.error("Password should contain atleast one number");
            return;
        }

        if(!/[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'`~]/.test(password)){
            toast.error("Password should contain atleast one special character");
            return;
        }

        const loading = toast.loading("Processing...");
        try {
            const res = await axios.put(`http://localhost:5000/api/change-password`, {
                password: password.trim(), type: selected, email
            });

            if (res.status === 200) {
                toast.dismiss(loading);
                toast.success(`Password changed`);
                setTimeout(() => {
                    navigate('/auth/login');
                }, 1000);
            }
        } catch (err: any) {
            if (err.response.data.message) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error("Something went wrong");
            }
        }
        finally {
            toast.dismiss(loading);
        }
    }

    return (
        <>
            <div className={`w-full min-h-screen bg-white flex justify-center items-center relative overflow-hidden`}>

                <p className={`w-full text-black text-lg lg:text-sm text-center absolute top-5 font-Lora`}>MediLab</p>
                <div className={`w-[80%] md:w-[60%] lg:w-[40%] absolute top-14 lg:top-12 h-px bg-linear-to-r from-transparent via-black to-transparent`}></div>

                <img src='/auth-page-bg.jpg' className={`h-1/2 absolute top-1/2 -translate-y-1/2 z-10 object-cover`} />
                <div className={`h-full absolute w-full bg-transparent z-20`}></div>

                <div className={`w-[95%] md:w-[60%] lg:w-[40%] xl:w-[30%] z-30 h-auto rounded-xl backdrop-blur-md flex flex-col justify-center items-center border border-orange-600 px-2 py-5`}>
                    <h1 className={`w-full text-xl lg:text-2xl font-semibold font-Telegraf text-start px-3`}>Password Recovery</h1>
                    <p className={`w-full text-[12px] text-start px-3 font-Telegraf`}>Don't worry, we will recover your account</p>

                    <div className={`w-full ${mailValid ? "hidden" : "block"} flex flex-col justify-center items-center gap-2 pt-5 pb-4 px-3`}>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Enter Email' />

                        <div className={`w-full my-2 flex justify-start items-center gap-2`}>
                            <p onClick={() => setSelected('user')} className={`text-[12px] py-1 cursor-pointer ${selected === 'user' ? "bg-blue-500 text-white" : "bg-white text-black"} duration-150 ease-in-out px-4 `}>User</p>
                            <p onClick={() => setSelected('doctor')} className={`text-[12px] py-1 cursor-pointer ${selected === 'doctor' ? "bg-blue-500 text-white" : "bg-white text-black"} duration-150 ease-in-out px-4 `}>Doctor</p>
                        </div>

                        <p onClick={checkMail} className={`w-full text-center py-2 mt-2 cursor-pointer active:opacity-80 active:scale-95 duration-150 ease-in-out font-Telegraf font-semibold bg-[#f8a085]`}>Check mail</p>

                    </div>

                    <div className={`w-full ${mailValid ? "block" : "hidden"} flex flex-col justify-start items-start px-3 my-7`}>
                        <OtpInput
                            label="Verification Code"
                            digitLength={4}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            hint="Enter the 4-digit code sent to your email."
                        />
                    </div>

                    <div className={`w-full ${otpVerified ? "block" : "hidden"} flex flex-col justify-start items-center gap-3 py-6`}>
                        <div className='w-full flex justify-center items-center relative'>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Enter Password' />
                            <span onClick={() => setVisible(!visible)} className={`absolute right-2 cursor-pointer opacity-50`}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
                        </div>
                        <div className='w-full flex justify-center items-center relative'>
                            <input onChange={(e) => setConfirm(e.target.value)} value={confirm} type={visible ? "text" : "password"} className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Confirm password' />
                            <span onClick={() => setVisible(!visible)} className={`absolute right-2 cursor-pointer opacity-50`}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
                        </div>
                        <div className={`w-full flex flex-col justify-start items-center`}>
                            <p className={`w-full text-start px-2 text-[12px] text-zinc-700`}>• Minimum 8 alphabets</p>
                            <p className={`w-full text-start px-2 text-[12px] text-zinc-700`}>• Any one number</p>
                            <p className={`w-full text-start px-2 text-[12px] text-zinc-700`}>• Any one special character</p>
                        </div>
                        <p onClick={changePassword} className={`w-full text-center py-2 mt-2 cursor-pointer active:opacity-80 active:scale-95 duration-150 ease-in-out font-Telegraf font-semibold bg-[#f8a085]`}>Change password</p>
                    </div>

                    <Link to='/auth/login' className={`w-full text-center font-semibold text-blue-500 font-Telegraf text-sm`}>Go back</Link>
                </div>
            </div>
        </>
    )
}


export default PasswordRecovery
