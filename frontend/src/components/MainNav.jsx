import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown, Activity, Users, Settings } from 'lucide-react';
import axios from 'axios';

export default function MainNav({ detectedState, userLat, userLon }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeRegion, setActiveRegion] = useState('Delhi');
  const [liveHospitals, setLiveHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validRegions = ['Delhi', 'Punjab', 'Haryana', 'Rajasthan', 'Uttar Pradesh'];
    if (detectedState && validRegions.includes(detectedState)) {
      setActiveRegion(detectedState);
    }
  }, [detectedState]);

  useEffect(() => {
    if (userLat && userLon) {
      setIsLoading(true);
      // Fetch real hospitals within 50km using Overpass API
      const query = `[out:json];node["amenity"="hospital"](around:50000,${userLat},${userLon});out 10;`;
      axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(res => {
          const hospitalsData = res.data.elements
            .filter(el => el.tags && el.tags.name)
            .map(el => ({
              name: el.tags.name,
              website: el.tags.website || null,
              phone: el.tags.phone || el.tags['contact:phone'] || null
            }));
          setLiveHospitals(hospitalsData);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch hospitals", err);
          setIsLoading(false);
        });
    }
  }, [userLat, userLon]);

  const regions = ['Delhi', 'Punjab', 'Haryana', 'Rajasthan', 'Uttar Pradesh'];

  const specialties = [
    { name: 'Cardiac Sciences', icon: <Heart className="w-4 h-4"/> },
    { name: 'Nephrology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Diabetology/Endocrinology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Foetal Medicine', icon: <Users className="w-4 h-4"/> },
    { name: 'Infectious Diseases', icon: <Activity className="w-4 h-4"/> },
    { name: 'Mental Health and Behavioural Sciences', icon: <Activity className="w-4 h-4"/> },
    { name: 'Oncology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Orthopaedics', icon: <Settings className="w-4 h-4"/> },
    { name: 'Physiotherapy and Rehabilitation', icon: <Activity className="w-4 h-4"/> },
    { name: 'Rheumatology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Urology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Nuclear Medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Critical Care', icon: <Activity className="w-4 h-4"/> },
    { name: 'Emergency and Trauma', icon: <Activity className="w-4 h-4"/> },
    { name: 'General Surgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Internal Medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Neurointerventional Radiology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Obstetrics and Gynaecology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Paediatrics', icon: <Activity className="w-4 h-4"/> },
    { name: 'Plastic and Reconstructive Surgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Support Specialties', icon: <Activity className="w-4 h-4"/> },
    { name: 'Vascular Surgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Infertility medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Dental Science', icon: <Activity className="w-4 h-4"/> },
    { name: 'Endocrine Surgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Geriatric Medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Liver Transplant and Hepatobiliary Sciences', icon: <Activity className="w-4 h-4"/> },
    { name: 'Neurology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Ophthalmology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Pain and Palliative Medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Pulmonology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Thoracic Surgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Gastroenterology and Hepatobiliary Sciences', icon: <Activity className="w-4 h-4"/> },
    { name: 'Dermatology', icon: <Activity className="w-4 h-4"/> },
    { name: 'ENT', icon: <Activity className="w-4 h-4"/> },
    { name: 'Haematology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Medical Genetics', icon: <Activity className="w-4 h-4"/> },
    { name: 'Neurosurgery', icon: <Activity className="w-4 h-4"/> },
    { name: 'Organ Transplant', icon: <Activity className="w-4 h-4"/> },
    { name: 'Palliative Medicine', icon: <Activity className="w-4 h-4"/> },
    { name: 'Radiology', icon: <Activity className="w-4 h-4"/> },
    { name: 'Transfusion Medicine', icon: <Activity className="w-4 h-4"/> },
  ];

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  const getHospitalLink = (h) => {
    if (h.website) return h.website;
    if (h.phone) return `tel:${h.phone}`;
    return `mailto:contact@${h.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com`;
  };

  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-40 shadow-sm relative">
      <div className="flex items-center gap-2 text-brand font-black text-3xl tracking-tighter z-50">
        <Heart className="w-8 h-8 fill-brand" />
        Tony Health
      </div>
      
      <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 h-full">
        
        {/* Hospitals Menu */}
        <div 
          className="relative h-full py-4 flex items-center gap-1 cursor-pointer hover:text-brand transition"
          onMouseEnter={() => handleMouseEnter('Hospitals')}
          onMouseLeave={handleMouseLeave}
        >
          Hospitals <ChevronDown className="w-4 h-4" />
          {activeMenu === 'Hospitals' && (
            <div className="absolute top-[100%] left-0 w-[600px] bg-white border border-gray-100 shadow-xl rounded-b-2xl flex flex-col z-50">
              <div className="flex border-b border-gray-100">
                <div className="flex-1 py-4 text-center font-bold text-brand border-b-2 border-brand bg-red-50">North India</div>
                <div className="flex-1 py-4 text-center text-slate-500 hover:text-brand transition">East India</div>
                <div className="flex-1 py-4 text-center text-slate-500 hover:text-brand transition">South India</div>
                <div className="flex-1 py-4 text-center text-slate-500 hover:text-brand transition">West India</div>
              </div>
              <div className="flex h-[300px]">
                <div className="w-1/3 border-r border-gray-100 flex flex-col py-2">
                  {regions.map(region => (
                    <div 
                      key={region}
                      onMouseEnter={() => setActiveRegion(region)}
                      className={`px-6 py-3 cursor-pointer transition ${activeRegion === region ? 'bg-red-100 text-brand font-bold' : 'hover:bg-gray-50'}`}
                    >
                      {region}
                    </div>
                  ))}
                </div>
                <div className="w-2/3 p-6 overflow-y-auto space-y-4">
                  {isLoading ? (
                    <div className="text-sm text-brand animate-pulse">Detecting real hospitals near you using GPS...</div>
                  ) : liveHospitals.length > 0 ? (
                    liveHospitals.map((hospital, idx) => (
                      <a 
                        key={idx} 
                        href={getHospitalLink(hospital)}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm text-slate-600 hover:text-brand cursor-pointer p-2 rounded hover:bg-red-50 transition"
                      >
                        <span className="font-bold">{hospital.name}</span>
                        {hospital.phone && <div className="text-xs text-slate-400 mt-1">📞 {hospital.phone}</div>}
                        {hospital.website && <div className="text-xs text-blue-500 mt-1">🌐 Open Website</div>}
                        {!hospital.website && !hospital.phone && <div className="text-xs text-brand mt-1">✉️ Email Hospital</div>}
                      </a>
                    ))
                  ) : (
                    <div className="text-sm text-slate-500">Please enable GPS to see real hospitals in this region.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Specialties Menu */}
        <div 
          className="relative h-full py-4 flex items-center gap-1 cursor-pointer hover:text-brand transition"
          onMouseEnter={() => handleMouseEnter('Specialties')}
          onMouseLeave={handleMouseLeave}
        >
          Specialties <ChevronDown className="w-4 h-4" />
          {activeMenu === 'Specialties' && (
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[1000px] bg-white border border-gray-100 shadow-xl rounded-b-2xl p-6 z-50">
              <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                {specialties.map((spec, idx) => (
                  <Link to="/analysis" key={idx} className="flex items-center justify-between text-xs text-slate-600 hover:bg-red-50 hover:text-brand rounded p-2 transition cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className="text-brand/60 group-hover:text-brand">{spec.icon}</div>
                      <span>{spec.name}</span>
                    </div>
                    <ChevronDown className="w-3 h-3 -rotate-90 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Centre of Excellence Menu */}
        <div 
          className="relative h-full py-4 flex items-center gap-1 cursor-pointer hover:text-brand transition"
          onMouseEnter={() => handleMouseEnter('CentreOfExcellence')}
          onMouseLeave={handleMouseLeave}
        >
          Centre of Excellence <ChevronDown className="w-4 h-4" />
          {activeMenu === 'CentreOfExcellence' && (
            <div className="absolute top-[100%] left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-b-2xl py-2 z-50">
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Tony Institute of Robotic Surgery</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-brand font-bold bg-red-100 cursor-pointer">Tony Cancer Institute</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Tony Institute of Genomic Medicine</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Centre for Gynae Oncology</Link>
            </div>
          )}
        </div>

        <Link to="/analysis" className="flex items-center gap-1 cursor-pointer hover:text-brand">Media Centre <ChevronDown className="w-4 h-4" /></Link>
        
        {/* Medical Services Menu */}
        <div 
          className="relative h-full py-4 flex items-center gap-1 cursor-pointer hover:text-brand transition"
          onMouseEnter={() => handleMouseEnter('MedicalServices')}
          onMouseLeave={handleMouseLeave}
        >
          Medical Services <ChevronDown className="w-4 h-4" />
          {activeMenu === 'MedicalServices' && (
            <div className="absolute top-[100%] left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-2xl py-2 z-50">
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Medical Procedures</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Immigration Services</Link>
            </div>
          )}
        </div>

        {/* Patient Corner Menu */}
        <div 
          className="relative h-full py-4 flex items-center gap-1 cursor-pointer hover:text-brand transition"
          onMouseEnter={() => handleMouseEnter('PatientCorner')}
          onMouseLeave={handleMouseLeave}
        >
          Patient Corner <ChevronDown className="w-4 h-4" />
          {activeMenu === 'PatientCorner' && (
            <div className="absolute top-[100%] left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-2xl py-2 z-50">
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Blogs</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Podcasts</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Patient Information Literature</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Patient Stories</Link>
              <Link to="/analysis" className="block px-6 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-brand transition cursor-pointer">Breakthrough Cases</Link>
            </div>
          )}
        </div>

        <Link to="/dashboard" className="cursor-pointer hover:text-brand h-full py-4">Dashboard</Link>
      </div>
    </nav>
  );
}
