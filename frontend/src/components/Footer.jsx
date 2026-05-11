export default function Footer() {
  return (
    <footer className="bg-white pt-18 h-[500px]">
      
      {/* TOP SECTION */}
      <div className="lg:px-[130px] px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* LOGO + CONTACT */}
        <div>
          <img src="./real logo.jpeg" alt="" />
          <p className="mt-3 text-m text-gray-500 leading-9">
            Call us <span className="text-blue-600 font-medium">123 456 7890</span>
            <br />
            329 Queensberry Street, North Melbourne VIC 3051, Australia.
            <br />
            support@jobportal.com
          </p>
        </div>

        {/* FOR CANDIDATES */}
        <div>
          <h3 className="font-semibold text-l mb-8 text-gray-900">For Candidates</h3>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer">Browse Jobs</li>
            <li className="hover:text-blue-600 cursor-pointer">Browse Categories</li>
            <li className="hover:text-blue-600 cursor-pointer">Candidate Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Job Alerts</li>
            <li className="hover:text-blue-600 cursor-pointer">My Bookmarks</li>
          </ul>
        </div>

        {/* FOR EMPLOYERS */}
        <div>
          <h3 className="font-semibold mb-8 text-gray-900">For Employers</h3>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer">Browse Candidates</li>
            <li className="hover:text-blue-600 cursor-pointer">Employer Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Add Job</li>
            <li className="hover:text-blue-600 cursor-pointer">Job Packages</li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold mb-8 text-gray-900">About Us</h3>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer">About us</li>
            <li className="hover:text-blue-600 cursor-pointer">Job page invoice</li>
            <li className="hover:text-blue-600 cursor-pointer">Term page</li>
            <li className="hover:text-blue-600 cursor-pointer">Blog </li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-26 ">
        <div className="lg:px-[130px] px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          
          <p>© 2026 Job Portal. All Right Reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-blue-600 cursor-pointer">Terms</span>
            <span className="hover:text-blue-600 cursor-pointer">Cookies</span>
          </div>

        </div>
      </div>

    </footer>
  );
}