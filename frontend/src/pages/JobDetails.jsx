import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMoneyBill } from "react-icons/fa";

export default function JobDetails() {
    const { id } = useParams();

    const jobs = [
        { id: "0", title: "Software Engineer (Android), Libraries", company: "Segment", location: "London, UK", time: "11 hours ago", salary: "$35k - $45k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-1.webp" ,jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour"},
        { id: "1", title: "Recruiting Coordinator", company: "Catalyst", location: "London, UK", time: "10 hours ago", salary: "$30k - $40k", type: "Freelancer", level: "Private", urgency: "Urgent", image: "/1-2.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "2", title: "Senior Product Designer", company: "Upwork", location: "London, UK", time: "9 hours ago", salary: "$40k - $50k", type: "Temporary", level: "Private", urgency: "Urgent", image: "/1-3.webp" ,jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour"},
        { id: "3", title: "Senior Full Stack Engineer", company: "Medium", location: "London, UK", time: "8 hours ago", salary: "$45k - $60k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-4.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "4", title: "Frontend Developer", company: "Google", location: "California, USA", time: "7 hours ago", salary: "$60k - $80k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-5.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "5", title: "Backend Developer", company: "Amazon", location: "Seattle, USA", time: "6 hours ago", salary: "$70k - $90k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-6.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "6", title: "UI/UX Designer", company: "Dribbble", location: "Remote", time: "5 hours ago", salary: "$25k - $35k", type: "Part Time", level: "Private", urgency: "Urgent", image: "/1-1.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "7", title: "Data Analyst", company: "Microsoft", location: "New York, USA", time: "4 hours ago", salary: "$50k - $70k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-2.webp" ,jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour"},
        { id: "8", title: "DevOps Engineer", company: "Netflix", location: "Los Angeles, USA", time: "3 hours ago", salary: "$80k - $100k", type: "Full Time", level: "Private", urgency: "Urgent", image: "/1-3.webp",jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour" },
        { id: "9", title: "Mobile App Developer", company: "Facebook", location: "Remote", time: "2 hours ago", salary: "$60k - $85k", type: "Freelancer", level: "Private", urgency: "Urgent", image: "/1-4.webp" ,jobTitle: "Software Engineer", hours: "40h / week",rate: "$20 / hour"},
    ];

    const job = jobs.find((item) => item.id === id) || jobs[0];

    return (
        <div className="bg-[#f5f7fc] min-h-screen">
            <Navbar />

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#e9edf5] to-[#dfe6f3] py-10">
                <div className="lg:px-[130px] px-6 flex justify-between items-center flex-wrap gap-5">

                    <div className="flex items-center gap-4">
                        <img src={job.image} className="w-20 h-20 rounded-xl" />

                        <div>
                            <h1 className="text-2xl font-semibold">{job.title}</h1>

                            <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-2">
                                <span>{job.company}</span>
                                <span>{job.location}</span>
                                <span>{job.time}</span>
                                <span>{job.salary}</span>
                            </div>

                            <div className="flex gap-2 mt-3">
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">{job.type}</span>
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">{job.level}</span>
                                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">{job.urgency}</span>
                            </div>
                        </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Apply For Job</button>
                </div>
            </div>

            {/* MAIN */}
            <div className="lg:px-[130px] px-6 py-10 flex flex-col lg:flex-row gap-10">

                {/* LEFT SIDE */}
                <div className="flex-1 space-y-8">
                    {/* DESCRIPTION */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                        <p className="text-gray-600 leading-7">
                            As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                        </p>
                    </div>

                    {/* RESPONSIBILITIES */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing.</li>
                                <li>Work with BAs, product managers and tech teams to lead the Product Design</li>
                               <li> Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
                                <li>Accurately estimate design tickets during planning sessions.</li>
                               <li> Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files, style guides, high fidelity prototypes, micro interaction specifications and pattern libraries.</li>
                               <li>Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to plan moderated usability test sessions.</li>
                                <li>Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing the wheel</li>
                               <li> Present your work to the wider business at Show & Tell sessions.</li>
                        </ul>
                    </div>

                    {/* SKILLS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Skill & Experience</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>You have at least 3 years’ experience working as a Product Designer.</li>
                            <li>You have experience using Sketch and InVision or Framer X</li>
                            <li>You have some previous experience working in an agile environment – Think two-week sprints.</li>
                            <li>You are familiar using Jira and Confluence in your workflow</li>
                        </ul>
                    </div>

                    {/* SHARE */}
                    <div className="flex gap-3 mt-6">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Facebook</button>
                        <button className="bg-sky-500 text-white px-4 py-2 rounded-lg">Twitter</button>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">LinkedIn</button>
                    </div>

                    {/* RELATED JOBS */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">Related Jobs</h2>

                        <div className="space-y-5">
                            {jobs.slice(0, 4).map((item) => (
                                <Link key={item.id} to={`/job/${item.id}`} className="block">
                                    <div className="border rounded-2xl p-6 flex gap-4 bg-white hover:shadow-lg mb-4">

                                        <img
                                            src={item.image}
                                            className="w-14 h-14 rounded-xl object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>

                                            <div className="text-sm text-gray-500 flex gap-3 mt-2">
                                                <span>{item.company}</span>
                                                <span>{item.location}</span>
                                                <span>{item.salary}</span>
                                            </div>

                                            <div className="flex gap-2 mt-3">
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
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="w-full lg:w-[320px] space-y-6">

                    {/* JOB OVERVIEW FULL */}
                    <div>
  <h3 className="text-lg font-semibold mb-4">Job Overview</h3>

  <div className="space-y-6 text-m text-gray-600">

    {[
      { icon: <FaCalendarAlt className="text-blue-500" />, label: "Date Posted", value: job.time },
      { icon: <FaClock className="text-blue-500" />, label: "Expiration Date", value: "April 06, 2026" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, label: "Location", value: job.location },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, label: "Job Title", value: job.jobTitle },
      { icon: <FaClock className="text-blue-500" />, label: "Hours", value: job.hours },
      { icon: <FaMoneyBill className="text-blue-500" />, label: "Rate", value: job.rate },
      { icon: <FaMoneyBill className="text-blue-500" />, label: "Salary", value: job.salary },
    ].map((item, i) => (
      <div key={i} className="flex items-start gap-4">

        <div className="mt-1">
          {item.icon}
        </div>

        <div>
          <p className="font-medium text-gray-800">{item.label}:</p>
          <p className="mt-1 text-gray-500">{item.value}</p>
        </div>

      </div>
    ))}

  </div>

  {/* SKILLS */}
            <div className="flex flex-col gap-3 mt-[80px]">
              <h3 className="font-semibold">Job Skills</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {["App","Administrative","Android","Wordpress","Design","React"].map((tag,i)=>(
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
</div>


                    {/* COMPANY */}
                    <div className="mt-[100px]">
                        <div className="flex items-center gap-3 mb-4 mt-10">
                            <img src={job.image} className="w-12 h-12 rounded-lg" />
                            <div>
                                <h4 className="font-semibold">{job.company}</h4>
                                <p className="text-sm text-blue-500">View company profile</p>
                            </div>
                        </div>

                        <div className="text-m text-gray-600 space-y-4">
                            <p><b>Primary industry:</b> Software</p>
                            <p><b>Company size:</b> 500+</p>
                            <p><b>Founded in:</b> 2011</p>
                            <p><b>Phone:</b>123 456 7890</p>
                            <p><b>Email: </b>info@joio.com</p>
                            <p><b>Location:</b> {job.location}</p>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}   