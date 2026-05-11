import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaMoneyBillWave, FaBullhorn, FaPaintBrush, FaCode, FaUserTie, FaCar, FaHeadset, FaBriefcaseMedical, FaProjectDiagram } from "react-icons/fa";

export default function Home() {
  const images = [
    "1-1.webp",
    "1-2.webp",
    "1-3.webp",
    "1-4.webp",
    "1-5.webp",
    "1-6.webp",
    "1-1.webp",
    "1-2.webp",
    "1-3.webp",
    "1-4.webp",

  ];
  const testimonials = [
    {
      title: "Awesome Design",
      text: "Without JobHunt i'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Ashley Jenkins",
      role: "Designer",
      image: "testi-thumb-1.webp",
    },
    {
      title: "Perfect Design",
      text: "Without JobHunt i'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Nicole Wells",
      role: "Web Developer",
      image: "testi-thumb-2.webp",
    },
    {
      title: "Good Jobs",
      text: "Without JobHunt i'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Brooklyn Simmons",
      role: "Consultant",
      image: "testi-thumb-1 3.webp",
    },
    {
      title: "Awesome Design",
      text: "Without JobHunt i'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Ronald Richards",
      role: "Designer",
      image: "testi-thumb-1.webp",
    },
    {
      title: "Perfect Design",
      text: "Without JobHunt i'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Nicole Wells",
      role: "Web Developer",
      image: "testi-thumb-2.webp",
    },
  ];

  return (
    <div className="bg-[#f5f7fc] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="lg:px-[90px] md:px-10 px-4 sm:px-6 py-20 min-h-[700px] bg-cover bg-center bg-no-repeat relative flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('./nexthirebg.jpg')",
        }}
      >

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

          {/* LEFT */}
          <div className="w-full lg:max-w-[600px] mt-12">

            <h1 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[52px] leading-tight font-semibold text-white mb-6">
              There Are <span className="text-blue-400 font-bold">93,178</span> Postings Here For you!
            </h1>

            <p className="text-gray-200 text-[14px] md:text-[15px] mb-6">
              Find Jobs, Employment & Career Opportunities
            </p>

            {/* SEARCH BAR */}
            <div className="w-full max-w-[730px] bg-white shadow-xl rounded-lg flex flex-col md:flex-row items-stretch md:items-center overflow-hidden p-2 gap-2 md:gap-0">

              <input
                placeholder="Job title, keywords, or company"
                className="w-full md:flex-1 h-[50px] px-5 text-[14px] outline-none md:border-r"
              />

              <input
                placeholder="City or postcode"
                className="w-full md:flex-1 h-[50px] px-5 text-[14px] outline-none"
              />

              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-8 h-[50px] text-[14px] font-medium rounded-md hover:bg-blue-700 transition w-full md:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Find Jobs
              </Link>

            </div>

            <p className="text-[13px] text-gray-200 mt-4">
              <span className="font-medium text-white">Popular Searches :</span>{" "}
              Designer, Developer, Web, IOS, PHP, Senior, Engineer
            </p>
          </div>

        </div>
      </div>

      {/* POPULAR CATEGORIES */}
      <div className="lg:px-[90px] md:px-10 px-6 py-16 bg-[#f5f7fc]">

        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Popular Job Categories
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            2020 jobs live - 293 added today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            { title: "Accounting / Finance", jobs: "2 open positions", icon: <FaMoneyBillWave /> },
            { title: "Marketing", jobs: "86 open positions", icon: <FaBullhorn /> },
            { title: "Design", jobs: "43 open positions", icon: <FaPaintBrush /> },
            { title: "Development", jobs: "12 open positions", icon: <FaCode /> },
            { title: "Human Resource", jobs: "55 open positions", icon: <FaUserTie /> },
            { title: "Automotive Jobs", jobs: "2 open positions", icon: <FaCar /> },
            { title: "Customer Service", jobs: "2 open positions", icon: <FaHeadset /> },
            { title: "Health and Care", jobs: "25 open positions", icon: <FaBriefcaseMedical /> },
            { title: "Project Management", jobs: "92 open positions", icon: <FaProjectDiagram /> }
          ].map((item, i) => (

            <div
              key={i}
              className="rounded-2xl p-6 flex items-center gap-4 bg-white hover:shadow-md transition"
            >

              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.jobs}
                </p>
              </div>

            </div>

          ))}

        </div>
      </div>

      {/* FEATURED JOBS */}
      <div className="lg:px-[90px] px-6 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Featured Jobs
          </h2>

          <p className="text-gray-500 mt-2">
            Know your worth and find the job that qualify your life
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start hover:shadow-lg transition-all bg-white overflow-hidden"
            >

              <img
                src={images[i]}
                alt="company logo"
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />

              <div className="flex-1 w-full">

                <h3 className="font-semibold text-base sm:text-lg break-words">
                  Software Engineer (Android), Libraries
                </h3>

                <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-2">
                  <span>Segment</span>
                  <span>London, UK</span>
                  <span>11 hours ago</span>
                  <span>$35k - $45k</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    Full Time
                  </span>

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Private
                  </span>

                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                    Urgent
                  </span>

                </div>

              </div>

            </div>

          ))}
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="lg:px-[90px] md:px-10 px-4 py-16 bg-gray-100 overflow-hidden">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Testimonials From Our Customers
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={80}
          loop={true}
          speed={900}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >

          {testimonials.map((item, index) => (

            <SwiperSlide key={index} className="h-auto">

              <div className="bg-white rounded-2xl shadow-md p-6 h-full min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-all duration-300">

                <div>

                  <h3 className="text-blue-600 font-semibold text-lg mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-7">
                    {item.text}
                  </p>

                </div>

                <div className="flex items-center gap-3 mt-6">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-gray-500 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

          ))}

        </Swiper>
      </div>

      {/* TOP COMPANIES */}
      <div className="w-full py-10 bg-white">

        <div className="lg:px-[90px] px-6">
          <div className="flex flex-wrap justify-center lg:justify-between gap-6 items-center">

            <img
              src="1-1 ha.webp"
              alt="mencap"
              className="h-8 object-contain"
            />

            <img
              src="1-2 ha.webp"
              alt="herbal"
              className="h-8 object-contain"
            />

            <img
              src="1-2 ha.webp"
              alt="mencap"
              className="h-8 object-contain"
            />

            <img
              src="1-2 ha.webp"
              alt="herbal"
              className="h-8 object-contain"
            />

            <img
              src="1-3 ha.webp"
              alt="nonstop"
              className="h-8 object-contain"
            />

            <img
              src="1-4 ha.webp"
              alt="michaelpage"
              className="h-8 object-contain"
            />

         </div>
        </div>
      </div>

      {/* HERO */}
      <div className="lg:px-[90px] px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="w-full lg:w-1/2 relative">

            <img
              src="badi image.webp"
              alt="job"
              className="w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover rounded-2xl"
            />

          </div>

          <div className="w-full lg:w-1/2">

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Millions of Jobs. Find the one that suits you.
            </h2>

            <p className="text-gray-500 mb-6">
              Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.
            </p>

            <div className="space-y-3 mb-6">

              <div className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                <p className="text-gray-600">
                  Bring to the table win-win survival
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                <p className="text-gray-600">
                  Capitalize on low hanging fruit to identify
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                <p className="text-gray-600">
                  But I must explain to you how all this
                </p>
              </div>

            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="lg:px-[90px] px-6 py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-10">
          <div>
            <h2 className="text-5xl font-bold">
              4M
            </h2>

            <p className="text-gray-500 mt-2">
              4 million daily active users
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              12k
            </h2>

            <p className="text-gray-500 mt-2">
              Over 12k open job positions
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              20M
            </h2>

            <p className="text-gray-500 mt-2">
              Over 20 million stories shared
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}