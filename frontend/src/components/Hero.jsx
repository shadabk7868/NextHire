export default function Hero() {
  return (
    <div className="bg-gray-100 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Find Your Dream Job
      </h1>

      <p className="text-gray-600 mb-6">
        Search jobs by title, company or location
      </p>

      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="Job title"
          className="p-3 border rounded w-64"
        />
        <input
          type="text"
          placeholder="Location"
          className="p-3 border rounded w-64"
        />
        <button className="bg-blue-500 text-white px-6 rounded">
          Search
        </button>
      </div>
    </div>
  );
}