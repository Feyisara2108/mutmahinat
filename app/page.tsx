"use client";
import Name from "./Component/HomeComponent/name";
import { useThemeStore } from "./stateManager/theme";
import CardImg1 from "./Component/HomeComponent/cardImg1";
import CardImg2 from "./Component/HomeComponent/cardImg2";
import Agency from "./Component/HomeComponent/agency";
import Me from "./Component/HomeComponent/me";
import About from "./Component/HomeComponent/about";
import Branding from "./Component/HomeComponent/branding";
import Socials from "./Component/HomeComponent/socials";
import Subscribe from "./Component/HomeComponent/subscribe";
import Tools from "./Component/HomeComponent/tools";
import Theme from "./Component/HomeComponent/theme";
import Project from "./Component/HomeComponent/project";

export default function Home() {
  const { bgClass } = useThemeStore();
  return (
    <div className={`${bgClass} py-6 min-h-screen w-full overflow-hidden`}>
      <div className="xl:flex px-4 xl:px-0 gap-6 max-w-[1400px] mx-auto w-full">
        <div className="xl:flex flex-col gap-6 w-full xl:flex-1">
          <div className="flex flex-col w-full lg:flex-row gap-7">
            <div className="flex w-full flex-col gap-6 xs:flex-row">
              <div className="w-full">
                <Name />
              </div>

              <div className="xl:hidden w-full">
                <Me />
              </div>
            </div>
            <div className="sm:hidden w-full">
              <About />
            </div>
            <div className="sm:hidden w-full">
              <Subscribe />
            </div>
            <div className="md:hidden xl:max-w-[273px] xl:flex w-full">
              <CardImg1 />
            </div>
            <div className="md:hidden xl:max-w-[273px] xl:flex w-full">
              <CardImg2 />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 w-full">
            <div className="hidden xl:max-w-[273px] xl:flex w-full">
              <Me />
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full md:pt-6 xl:pt-0">
              <div className="hidden xl:max-w-[273px] w-full md:flex xl:hidden">
                <CardImg1 />
              </div>
              <div className="hidden w-full xl:max-w-[409px] sm:flex">
                <About />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full xl:pt-0">
              <div className="w-full">
                <Branding />
              </div>
              <div className="hidden w-full md:flex xl:hidden">
                <CardImg2 />
              </div>
            </div>
            <div className="xl:hidden gap-6 flex flex-row w-full">
              <div className="w-full xs:w-1/2">
                <Theme />
              </div>
              <div className="w-full xs:w-1/2">
                <Tools />
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="hidden xl:flex w-full">
              <Subscribe />
            </div>
            <div className="hidden xl:flex">
              <Tools />
            </div>
            <div className="hidden xl:w-full xl:max-w-[197px] xl:flex">
              <Theme />
            </div>
          </div>
        </div>

        <div className="pt-6 xl:pt-0 w-full xl:w-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col xs:flex-row xl:flex-col gap-6">
              <div className="w-full xs:w-1/2 xl:w-full">
                <Agency />
              </div>
              <div className="hidden xl:flex w-full">
                <Socials />
              </div>
              <div className="w-full xs:w-1/2 xl:w-full">
                <Project />
              </div>
            </div>
            <div className="xl:hidden w-full">
              <Subscribe />
            </div>
            <div className="xl:hidden w-full">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
