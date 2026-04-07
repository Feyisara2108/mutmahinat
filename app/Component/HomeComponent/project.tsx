import { useThemeStore } from "@/app/stateManager/theme";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import ContactModal from "../HomeComponent/contactModal"; // create this separately

export default function Project() {
  const [modalOpen, setModalOpen] = useState(false);
  const { plainBg, textColor, navAltText, secondBgClassOpposite, altText } = useThemeStore();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="w-full">
      <div
        className={`w-full xl:max-w-[273px] ${plainBg} rounded-lg px-4 h-72 xl:h-[247px] flex flex-col justify-center`}
      >
        {/* Header */}
        <h2 className={`text-[20px] ${navAltText} font-bold pb-2`}>Have a project in mind?</h2>

        {/* Paragraph */}
        <p className={`text-[14px] ${textColor} pb-6`}>
          I’m always excited to collaborate on new ideas. Share the details of your project and
          let’s create something amazing together.
        </p>

        {/* Button */}
        <div className="pt-4">
          <button
            onClick={handleOpenModal}
            className={` ${secondBgClassOpposite} ${altText} cursor-pointer w-full py-2.5 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
          >
            <FiMail /> Send a Message
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {modalOpen && <ContactModal onClose={handleCloseModal} />}
    </div>
  );
}
