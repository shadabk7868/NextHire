export default function JobCard() {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">Frontend Developer</h2>
      <p className="text-gray-500">Google • Remote</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-bold">₹10 LPA</span>
        <button className="bg-blue-500 text-white px-4 py-1 rounded">
          Apply
        </button>
      </div>
    </div>
  );
}