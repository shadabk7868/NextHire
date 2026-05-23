import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      alert("Invalid email");
      return;
    }

    alert("Message sent successfully!");

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      <Navbar />

      {/* HEADER */}
      <div className="w-full h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <p className="text-gray-500 mt-2 text-sm">Home / Contact</p>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="lg:px-[90px] md:px-10 px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h4 className="font-semibold">Address</h4>

              <p className="text-sm text-gray-500 mt-1">
                329 Queensberry Street, North <br />
                Melbourne VIC 3051, Australia.
              </p>
            </div>
          </div>

          {/* PHONE */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaPhoneAlt />
            </div>

            <div>
              <h4 className="font-semibold">Call Us</h4>

              <p className="text-sm text-gray-500 mt-1">
                123 456 7890
              </p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaEnvelope />
            </div>

            <div>
              <h4 className="font-semibold">Email</h4>

              <p className="text-sm text-gray-500 mt-1">
                contact.london@gmail.com
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FORM SECTION */}
      <div className="lg:px-[90px] md:px-10 px-6 py-12 flex justify-center">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-sm"
        >

          <h3 className="text-xl font-semibold mb-6">
            Leave A Message
          </h3>

          {/* ROW 1 */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-gray-600">
                Your Name
              </label>

              <input
                type="text"
                placeholder="Your Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 bg-gray-100 h-[50px] px-4 rounded-lg outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Your Email
              </label>

              <input
                type="email"
                placeholder="Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 bg-gray-100 h-[50px] px-4 rounded-lg outline-none text-sm"
              />
            </div>

          </div>

          {/* SUBJECT */}
          <div className="mt-5">

            <label className="text-sm text-gray-600">
              Subject
            </label>

            <input
              type="text"
              placeholder="Subject *"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-2 bg-gray-100 h-[50px] px-4 rounded-lg outline-none text-sm"
            />

          </div>

          {/* MESSAGE */}
          <div className="mt-5">

            <label className="text-sm text-gray-600">
              Your Message
            </label>

            <textarea
              rows={6}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 bg-gray-100 px-4 py-3 rounded-lg outline-none text-sm"
            ></textarea>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Send Message
          </button>

        </form>

      </div>

      <Footer />
    </div>
  );
}