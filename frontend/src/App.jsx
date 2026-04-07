import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindJobs from "./pages/FindJobs";
import JobDetails from "./pages/JobDetails";
import Company from "./pages/Company";
import CompanyDetails from "./pages/CompanyDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Candidate from "./pages/Candidate";
import CandidateDetails from "./pages/CandidateDetails";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AuthModal from "./components/AuthModal";
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<FindJobs />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/company" element={<Company />} />
      <Route path="/company/:id" element={<CompanyDetails />} />
      <Route path="/employers-dashboard" element={<EmployerDashboard />} />
      <Route path="/candidate" element={<Candidate/>} />
      <Route path="/candidate/:id" element={<CandidateDetails />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/AuthModal" element={<AuthModal />} />

    </Routes>
  )
}