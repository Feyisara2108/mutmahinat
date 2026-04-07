
import { useThemeStore } from "../../stateManager/theme";
export default function Name() {

  const { plainBg, textColor,altNameColor, navAltText, nameColor} = useThemeStore();
  return (
   <div className="  w-full ">
     <div className={` w-full   xl:max-w-[496px] ${plainBg}  rounded-lg  px-6  h-[251px] xs:h-[271px] lg:h-[370px] xl:h-[236.33px]  flex flex-col justify-center  `}>
     <h1 className={`${navAltText}  lg:text-3xl font-bold pb-4`}>Hi, I’m Arowolo Mutmahinat</h1>
   <p className={`${textColor} text-[15px] lg:text-[17px] py-1`}>
  Front-End Developer & Smart Contract Developer
</p>
<p className={`${textColor} text-[15px] lg:text-[17px] py-1`}>
   Building secure and scalable decentralized applications.
</p>

    </div>
   </div>
  )
}
