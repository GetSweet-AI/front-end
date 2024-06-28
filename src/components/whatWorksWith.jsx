import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedin, faFacebook, faInstagram, faWhatsapp, faPinterest, faTiktok, faGoogle, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Carousel Settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
};


const applications = [
  {
    name: "YouTube",
    icon: <FontAwesomeIcon icon={faYoutube} size="4x" color="red" />,
  },
//   {
//     name: "LinkedIn",
//     icon: <FontAwesomeIcon icon={faLinkedin} size="4x" color="#0077b5" />,
//   },
  {
    name: "Facebook",
    icon: <FontAwesomeIcon icon={faFacebook} size="4x" color="#1877f2" />,
  },
  {
    name: "Instagram",
    icon: <FontAwesomeIcon icon={faInstagram} size="4x" color="#c32aa3" />,
  },
//   {
//     name: "WhatsApp",
//     icon: <FontAwesomeIcon icon={faWhatsapp} size="4x" color="#25d366" />,
//   },
  // {
  //   name: "Pinterest",
  //   icon: <FontAwesomeIcon icon={faPinterest} size="4x" color="#bd081c" />,
  // }, 
  {
    name: "TikTok",
    icon: <FontAwesomeIcon icon={faTiktok} size="4x" color="#000000" />,
  },
//   {
//     name: "Google",
//     icon: <FontAwesomeIcon icon={faGoogle} size="4x" color="#4285f4" />,
//   },
//   {
//     name: "Google Drive",
//     icon: <FontAwesomeIcon icon={faGoogleDrive} size="4x" color="#4285f4" />,
//   },
//   {
//     name: "Google Analytics",
//     icon: <FontAwesomeIcon icon={faGoogleAnalytics} size="4x" color="#fabc05" />,
//   },
];

const WhatItWorksWith = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Seamless Integrations</h2>
          <p className="mt-2 text-3xl tracking-tight text-gray-900 sm:text-4xl">
            What GetSweet.AI works with
          </p>
        </div>
        <div className="mt-10 ">
          <Slider {...settings}>
            {applications.map((app, index) => (
              <div key={index} className="flex justify-center items-center  ">
                {app.icon}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default WhatItWorksWith;
