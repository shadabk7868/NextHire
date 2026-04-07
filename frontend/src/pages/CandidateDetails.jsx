import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function CandidateDetails() {
  const { id } = useParams();

  const jobs = [
    {
      id: "0",
      title: "Udemy",
      company: "Segment",
      location: "London, UK",
      image: "/1-1.webp",
    },
    {
      id: "1",
      title: "Stripe",
      company: "Catalyst",
      location: "London, UK",
      image: "/1-2.webp",
    },
    {
      id: "2",
      title: "Dropbox",
      company: "Upwork",
      location: "London, UK",
      image: "/company-3.webp",
    },
    {
      id: "3",
      title: "Figma",
      company: "Medium",
      location: "London, UK",
      image: "/company-4.webp",
    },
  ];

  const job = jobs.find((item) => item.id === id) || jobs[0];

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e9edf5] to-[#dfe6f3] py-10">
        <div className="lg:px-[130px] px-6 flex items-center gap-4">
          <img src={job.image} className="w-20 h-20 rounded-xl" />
          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-gray-500 mt-1">{job.location}</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="lg:px-[130px] px-6 py-10 flex flex-col lg:flex-row gap-10">

        {/* LEFT */}
        <div className="flex-1 space-y-6">

          {/* ABOUT */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About Company</h2>

            <p className="text-gray-600 leading-7">
              Moody’s Corporation, often referred to as Moody’s, is an American
              business and financial services company. It is the holding company
              for Moody’s Investors Service (MIS), an American credit rating
              agency, and Moody’s Analytics (MA), an American provider of
              financial analysis software and services.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              Moody’s was founded by John Moody in 1909 to produce manuals of
              statistics related to stocks and bonds and bond ratings. Moody’s
              was acquired by Dun & Bradstreet in 1962. In 2000, Dun &
              Bradstreet spun off Moody’s Corporation as a separate company.
            </p>
          </div>

          {/* IMAGE GALLERY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="/employers-single-1.png" className="rounded-xl h-[120px] w-full object-cover" />
            <img src="/employers-single-3.png" className="rounded-xl h-[120px] w-full object-cover" />
            <img src="/employers-single-4.png" className="rounded-xl h-[120px] w-full object-cover" />
            <img src="/employers-single-3.png" className="rounded-xl h-[120px] w-full object-cover" />
          </div>

          {/* MORE TEXT */}
          <p className="text-gray-600 leading-7">
            Moody’s Corporation was split into two operating divisions, Moody’s
            Investors Service and Moody’s Analytics, with all of its other
            products.
          </p>

          {/* JOB COUNT */}
          <div>
            <h2 className="text-2xl font-semibold">3 Others jobs available</h2>
            <p className="text-gray-500 text-sm mt-1">
              2020 jobs live - 293 added today.
            </p>
          </div>

          {/* RELATED JOBS */}
          <div className="space-y-5">
  {jobs.slice(0, 3).map((item) => (
    <Link key={item.id} to={`/company/${item.id}`} className="block">
      
      <div className="border rounded-2xl p-6 flex gap-4 bg-white hover:shadow-lg transition duration-300">
        
        <img
          src={item.image}
          className="w-14 h-14 rounded-xl object-cover"
        />

        <div>
          <h3 className="font-semibold">{item.title}</h3>

          <div className="text-sm text-gray-500 flex gap-3 mt-2 flex-wrap">
            <span>{item.company}</span>
            <span>{item.location}</span>
            <span>{item.salary}</span>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-blue-100 px-3 py-1 text-xs rounded-full">{item.type}</span>
            <span className="bg-green-100 px-3 py-1 text-xs rounded-full">{item.level}</span>
            <span className="bg-yellow-100 px-3 py-1 text-xs rounded-full">{item.urgency}</span>
          </div>

        </div>
      </div>

    </Link>
  ))}
</div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[320px]">

          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">Primary industry:</span>
              <span>Software</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Company size:</span>
              <span>501-1,000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Founded in:</span>
              <span>2011</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span>123 456 7890</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span>info@stripe.com</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Location:</span>
              <span>{job.location}</span>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Social media:</span>
              <div className="flex gap-3 text-gray-600">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
                <FaLinkedin />
              </div>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-100 text-blue-600 py-3 rounded-lg mt-4">
              www.stripe.com
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}