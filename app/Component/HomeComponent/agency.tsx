import { useThemeStore } from "@/app/stateManager/theme"
import Link from "next/link";

export default function  Agency() {
    const { plainBg, textColor, nameColor, altText, navAltText,  altNameColor, secondBgClassOpposite} = useThemeStore();
  return (
   <div className="  w-full ">
     <div className={` w-full xl:max-w-[273px] ${plainBg}  rounded-lg  px-4  h-72  flex flex-col justify-center  `}>
    <h2 className={`text-[20px] ${navAltText} font-bold pb-3`}>
  Crafting Decentralized Experiences
</h2>

<p className={`${textColor} text-sm leading-snug`}>
 <strong>Arowolo Mutmahinat</strong> designs and builds scalable digital systems combining product strategy, smart contracts, and full stack engineering.
</p>

     
      <div className=" pt-10">
        <Link href='https://www.linkedin.com/'>
        <button className={` ${secondBgClassOpposite} ${altText} w-full cursor-pointer py-2.5 rounded-lg `}>View Profile</button>
         </Link>
      </div>
    
    </div>
   </div>
  )
} 