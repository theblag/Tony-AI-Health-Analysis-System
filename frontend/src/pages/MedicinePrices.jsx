import { Pill, Search } from 'lucide-react';

export default function MedicinePrices() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Compare Medicine Prices</h1>
        <p className="text-slate-600 mb-8">Search for your prescribed medicine to find the cheapest pharmacy near you.</p>

        <div className="flex gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter medicine name (e.g. Atorvastatin)..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button className="bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-700 transition">
            Search
          </button>
        </div>

        {/* Dummy Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-md transition bg-gray-50/50">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Pill className="text-brand w-6 h-6" />
                <h3 className="font-bold text-lg text-slate-800">CVS Pharmacy</h3>
              </div>
              <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$12.99</span>
            </div>
            <p className="text-sm text-gray-500">In stock • 2.1 miles away</p>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-md transition bg-gray-50/50">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Pill className="text-blue-600 w-6 h-6" />
                <h3 className="font-bold text-lg text-slate-800">Walgreens</h3>
              </div>
              <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-sm">$15.50</span>
            </div>
            <p className="text-sm text-gray-500">In stock • 0.8 miles away</p>
          </div>
        </div>
      </div>
    </div>
  );
}
