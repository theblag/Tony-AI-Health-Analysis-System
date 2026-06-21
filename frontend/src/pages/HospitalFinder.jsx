import { MapPin, Search } from 'lucide-react';

export default function HospitalFinder() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Find Nearby Hospitals</h1>
        <p className="text-slate-600 mb-8">Enter your zip code or city to find emergency contacts and checkup centers near you.</p>

        <div className="flex gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter City or Zip Code..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button className="bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-700 transition">
            Search
          </button>
        </div>

        {/* Dummy Results */}
        <div className="space-y-4">
          <div className="p-6 border border-gray-100 rounded-2xl flex items-center justify-between hover:shadow-md transition cursor-pointer bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <MapPin className="text-brand w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">City General Hospital (Emergency)</h3>
                <p className="text-sm text-gray-500">1.2 miles away • Open 24/7</p>
              </div>
            </div>
            <button className="text-brand font-semibold hover:underline">Get Directions</button>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl flex items-center justify-between hover:shadow-md transition cursor-pointer bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Advanced Checkup Clinic</h3>
                <p className="text-sm text-gray-500">3.5 miles away • Closes at 8 PM</p>
              </div>
            </div>
            <button className="text-brand font-semibold hover:underline">Get Directions</button>
          </div>
        </div>
      </div>
    </div>
  );
}
