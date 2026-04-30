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
import ProfileView from "./pages/ProfileView";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AuthModal from "./components/AuthModal";
 import AppliedJobs from "./pages/AppliedJobs";
 import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<FindJobs />} />
      <Route path="/job/:id" element={<ProtectedRoute><JobDetails /> </ProtectedRoute>} />
      <Route path="/company/:id" element={<CompanyDetails />} />
      <Route path="/employers-dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
      <Route path="/candidate/:id" element={<CandidateDetails />} />
      <Route path="/candidate-dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />

        <Route path="/profile" element={<ProfileView />} />
      <Route path="/applied-jobs" element={<ProtectedRoute><AppliedJobs /></ProtectedRoute>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/AuthModal" element={<AuthModal />} />

    </Routes>
  )
}