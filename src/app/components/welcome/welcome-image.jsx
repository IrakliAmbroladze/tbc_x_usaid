import Image from "next/image";
import Welcome_Image from '../../assets/images/welcome-image.jpg';

export default function WelcomeImage() {
  return (
     <div className="welcomeImage"> 
      <Image className="pestMan" src={Welcome_Image} alt="Welcome_Image" fill/>
    </div>
  );
}
