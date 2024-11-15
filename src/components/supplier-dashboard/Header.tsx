import Image from 'next/image';
import logo from '../../public/logo.png'; 

const Header = () => {
  return (
    <div className="bg-[#FFFFFF] p-4 shadow-lg flex justify-between items-center h-[80px]">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Logo"
          width={100}  
          className="mr-4 object-contain"  
        />
      </div>
    </div>
  );
};

export default Header;
