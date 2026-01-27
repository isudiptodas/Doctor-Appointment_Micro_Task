import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { userMenuStore } from '../../zustand/userMenuStore';
import UserNavbar from '../../components/UserNavbar';

function Home() {

  const location = useLocation();
  const { isOpen } = userMenuStore();

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
      <div className={`w-full min-h-screen relative flex flex-col justify-start items-center overflow-hidden`}>
        <UserNavbar pathname={location.pathname} />

      </div>
    </>
  )
}

export default Home