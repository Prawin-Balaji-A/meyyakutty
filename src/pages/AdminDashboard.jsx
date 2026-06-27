import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const { requests, updateRequestStatus } = useAdmin();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-4xl font-black text-gray-800 mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Recent Requests</h2>
        </div>
        
        {requests.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-medium text-lg">No requests submitted yet.</div>
        ) : (
          <div className="divide-y">
            {requests.map(req => (
              <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6">
                <div className="flex gap-2">
                  {req.images.map((img, i) => (
                    <img key={i} src={img} alt="pet preview" className="w-24 h-24 rounded-lg object-cover shadow" />
                  ))}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-[var(--color-brand-red)] font-bold rounded-full text-xs uppercase tracking-wider">
                      {req.service}
                    </span>
                    <span className={`px-3 py-1 font-bold rounded-full text-xs uppercase tracking-wider ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      req.status === 'Rejected' ? 'bg-gray-200 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-gray-400 text-sm ml-auto">
                      {new Date(req.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-800">{req.data.fullName} - {req.data.mobile}</h3>
                  
                  <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-x-4 gap-y-1">
                    {req.data.petType && <p><span className="font-semibold">Type:</span> {req.data.petType}</p>}
                    {req.data.breed && <p><span className="font-semibold">Breed:</span> {req.data.breed}</p>}
                    {req.data.age && <p><span className="font-semibold">Age:</span> {req.data.age}</p>}
                    {req.data.careRequired && <p><span className="font-semibold">Care:</span> {req.data.careRequired}</p>}
                    {req.data.rescueLocation && <p><span className="font-semibold">Location:</span> {req.data.rescueLocation}</p>}
                  </div>
                  
                  <p className="mt-3 text-gray-700 italic border-l-4 border-gray-300 pl-3">"{req.data.description}"</p>
                </div>

                <div className="flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4 min-w-[120px]">
                  {req.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => updateRequestStatus(req.id, 'Approved')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors"
                      >
                        <Check size={18} /> Approve
                      </button>
                      <button 
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold transition-colors"
                      >
                        <X size={18} /> Reject
                      </button>
                    </>
                  )}
                  <a 
                    href={`tel:${req.data.mobile}`}
                    className="flex-1 md:flex-none flex items-center justify-center py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold transition-colors text-center"
                  >
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
