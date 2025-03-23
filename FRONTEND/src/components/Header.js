import SGSITS_main_logo from "../assets/SGSITS_main_logo.png";
import sgsits from "../assets/sgsits.jpeg";
import HomePageHeader from "./HomePageHeader";

console.log(sgsits);
function Header(props) {
  var backgroundStyle = {
    backgroundImage: `url(${sgsits})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position : "relative",
  };

  return (
    <header style={backgroundStyle} className="shadow-stone-400 shadow-lg">
      <nav className="bg-black/75 py-5  px-3 sm:px-10">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <img src={SGSITS_main_logo} className="mr-3 h-20 sm:h-24" />
            <span className="self-center text-white whitespace-normal">
              <div className="font-bold sm:text-2xl">
                SHRI GOVINDRAM INSTITUTE OF TECHNOLOGY AND SCIENCE, INDORE
              </div>
              <div className="font-semibold sm:text-xl">
                RGPV UNIVERSITY, BHOPAL
              </div>
              <div className="font-thin">AISHE Code : C-25072</div>
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-white font-bold text-3xl max-[907px]:mt-5 max-[907px]:text-center">
              CampusEase
            </div>
          </div>
        </div>
        {props.data.flag && <HomePageHeader />}
      </nav>
    </header>
  );
}

export default Header;
