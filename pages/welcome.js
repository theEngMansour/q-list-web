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
        <Services/>
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

const Services = () => (
  <div>
    <section className="pb-20 bg-gray-300 -mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <WhatshotIcon/>
                    </div>
                    <h6 className="text-xl font-semibold">ماهو كيوليست</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-right">
                      هذا المجتمع ليس منتدى، بل مجموعة من المجتمعات المتخصصة تتم إدارته بشكل جماعي بناء على تصويت المستخدمين وذلك برفع المساهمات ذات المحتوى الجيد وخفض ترتيب المساهمات ذات المحتوى السيء. هذا الأسلوب بالإدارة أقرب الى الشبكة الاجتماعية المتخصصة من المنتديات التقليدية نهدف من خلاله الى بناء مجتمع عربي ناضج بأسلوب جديد ومختلف.
                    </p>
                </div>
                </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <SelfImprovementIcon/>
                    </div>
                    <h6 className="text-xl font-semibold font-mono">
                      I/O 
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600 text-right">
                    إن كنت تتساءل عن معنى <span className='font-mono text-blue-800'>I/O</span> فهي اختصار لكلمتي  <span className='font-mono text-blue-800'>Input/Output</span> ويمكن وصفها بأسلوب تواصل أنظمة الحواسيب فيما بينها وبالعالم الخارجي أيضاً، حيث يتم ادخال المعلومات الى هذه الأنظمة لتخرج الناتج في النهاية بعد معالجة المدخلات المرسلة.
                    </p>
                </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  </div>)
