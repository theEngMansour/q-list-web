import { FormattedMessage } from 'react-intl';
import { MainLayout } from 'layouts';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from 'next/link'
import Image from 'next/image'
export default function Index() {
  return (
    <div>
        <Hero />
     
    </div>
  );
}



const Hero = () => (

<div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{minHeight: "75vh"}}>
  <div className="absolute top-0 w-full h-full bg-center bg-cover"
      style={{
      backgroundImage: `url(/bg.jpg)`
      }}>
      <span id="blackOverlay" className="w-full h-full absolute opacity-70 bg-black"></span>
  </div>
  <div className="container relative mx-auto">
    <div className="items-center flex flex-wrap justify-center">
      <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
        <Image src="/logo-q-01.svg" width={950} height={550} />
        <Link href={'/'}>
          <button  style={{ fontFamily: 'NotoBold' }} className='bg-violet-50 p-5 mt-5 w-36'>ابدأ معنا الآن</button>
        </Link>
      </div>
    </div>

  </div>
</div>)

