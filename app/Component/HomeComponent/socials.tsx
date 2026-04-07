import { FaInstagram, FaMediumM } from "react-icons/fa";
import { PiLinkedinLogo } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiHashnode } from "react-icons/si";
import { useThemeStore } from "@/app/stateManager/theme";
import Link from "next/link";

export default function Socials() {
  const { plainBg, textColor, nameColor, navAltText, altNameColor } = useThemeStore();
  
  const socialLinks = [
    { href: 'https://x.com/Ayokomi21', icon: RiTwitterXFill, label: 'Twitter' },
    { href: 'https://medium.com/@ayokomi2108', icon: FaMediumM, label: 'Medium' },
    { href: 'https://hashnode.com/@ayokomi', icon: SiHashnode, label: 'Hashnode' },
    { href: 'https://www.linkedin.com/in/mutmahinah/', icon: PiLinkedinLogo, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/ayokomi_/', icon: FaInstagram, label: 'Instagram' },
    { href: 'mailto:ayokomi2108@gmail.com', icon: TfiEmail, label: 'Email' }
  ];

  return (
    <div className="w-full xl:max-w-[273px]">
      <div className="w-full flex xl:grid grid-cols-3 gap-2 sm:gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link 
              key={index}
              href={social.href} 
              aria-label={social.label}
              className="w-full aspect-square"
            >
              <div className={`${plainBg} rounded-lg w-full h-full flex items-center justify-center hover:scale-105 transition-transform`}>
                <Icon className={`${navAltText} text-3xl sm:text-5xl cursor-pointer hover:text-[#C9C8BF] transition-colors`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
