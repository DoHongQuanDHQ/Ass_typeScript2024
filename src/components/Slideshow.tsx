import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
};
const slideImages = [
  {
    url: "https://adsplus.vn/wp-content/uploads/2018/12/nguyen-tac-thiet-ke-banner-pham-dep-ngat-ngay-08-1-1024x341.jpg",
    caption: "",
  },
  {
    url: "https://intphcm.com/data/upload/banner-my-pham-vang-kim.jpg",
    caption: "",
  },
  {
    url: "https://marketingai.mediacdn.vn/wp-content/uploads/2018/06/anh-banner-quang-cao-my-pham_083546785.jpg",
    caption: "",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default Slideshow;
