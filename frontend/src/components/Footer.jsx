import { Link } from "react-router-dom";

export default function Footer() {

  const role = localStorage.getItem("role");

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white pt-14">

      {/* TOP SECTION */}
      <div className="lg:px-[130px] px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

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

        {/* ROLE BASED SECTION */}
        {role === "employer" ? (

          <div>
            <h3 className="font-semibold mb-8 text-gray-900">
              For Employers
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">

              <li>
                <Link
                  to="/employers-dashboard?tab=post"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Post Job
                </Link>
              </li>

              <li>
                <Link
                  to="/employers-dashboard?tab=appliedCandidates"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Browse Applicants
                </Link>
              </li>

              <li>
                <Link
                  to="/employers-dashboard"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/employers-dashboard?tab=myjobs"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  My Jobs
                </Link>
              </li>

            </ul>
          </div>

        ) : (

          <div>
            <h3 className="font-semibold text-l mb-8 text-gray-900">
              For Candidates
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">

              <li>
                <Link
                  to="/jobs"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Search Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/candidate-dashboard"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Candidate Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/candidate-dashboard"
                  onClick={scrollTop}
                  className="hover:text-blue-600"
                >
                  Applied Jobs
                </Link>
              </li>

            </ul>
          </div>

        )}

        {/* ABOUT */}
        <div>

          <h3 className="font-semibold mb-8 text-gray-900">
            About Us
          </h3>

          <ul className="space-y-4 text-sm text-gray-500">

            <li>
              <Link
                to="/blog"
                onClick={scrollTop}
                className="hover:text-blue-600"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={scrollTop}
                className="hover:text-blue-600"
              >
                Contact
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </footer>
  );
}