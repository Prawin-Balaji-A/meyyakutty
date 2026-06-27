import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Printer, ChevronLeft } from 'lucide-react';

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    // Automatically trigger print dialog when component mounts, wait a bit for images to load
    if (order) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [order]);

  if (!order) {
    return <div className="p-10 text-center font-bold text-xl">Invoice not found for this order.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 print:bg-white print:py-0">
      
      {/* Non-printable header controls */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center px-4 print:hidden">
         <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm font-bold text-gray-700 hover:bg-gray-50">
           <ChevronLeft size={20} /> Back
         </button>
         <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-sm font-bold hover:bg-blue-700">
           <Printer size={20} /> Print Invoice
         </button>
      </div>

      {/* Printable Invoice Container */}
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 shadow-xl print:shadow-none print:p-0">
        
        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-200 pb-8 mb-8">
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-sm border border-gray-100 p-1">
               <img src="/logo.jpg" alt="MeyyaKutty Logo" className="w-full h-full object-contain" />
             </div>
             <div>
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">MeyyaKutty Pet Shop</h1>
               <p className="text-gray-500 font-medium mt-1">Premium Pets & Supplies</p>
             </div>
           </div>
           <div className="text-right">
             <h2 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-2">Invoice</h2>
             <p className="font-bold text-gray-800">INV-{order.id.split('-')[1] || order.id}</p>
             <p className="text-gray-500 text-sm mt-1">Date: {new Date(order.date).toLocaleDateString('en-IN')}</p>
           </div>
        </div>

        {/* Addresses */}
        <div className="flex justify-between gap-10 mb-12">
          <div className="w-1/2">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</h3>
             <p className="font-black text-gray-900 text-lg mb-1">{order.customer.fullName}</p>
             {order.deliveryMethod === 'delivery' ? (
               <p className="text-gray-600 text-sm leading-relaxed">
                 {order.customer.address}<br/>
                 {order.customer.city} - {order.customer.pincode}
               </p>
             ) : (
               <p className="text-gray-600 text-sm">Store Pickup</p>
             )}
             <p className="text-gray-600 text-sm mt-2">Ph: {order.customer.mobile}</p>
          </div>
          <div className="w-1/2 text-right">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Company Info</h3>
             <p className="font-black text-gray-900 text-lg mb-1">Meyyakutty Pet shop</p>
             <p className="text-gray-600 text-sm leading-relaxed">
               opst, Mutthupillai Mandapam<br/>
               Kumbakonam, Tamil Nadu 612201, India
             </p>
             <p className="text-gray-600 text-sm mt-2">Ph: +91 7200271113</p>
          </div>
        </div>

        {/* Order Details Table */}
        <div className="mb-10">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b-2 border-gray-900 text-gray-900">
                 <th className="py-3 font-black text-sm uppercase tracking-wider">Item Description</th>
                 <th className="py-3 font-black text-sm uppercase tracking-wider text-center">Qty</th>
                 <th className="py-3 font-black text-sm uppercase tracking-wider text-right">Unit Price</th>
                 <th className="py-3 font-black text-sm uppercase tracking-wider text-right">Total</th>
               </tr>
             </thead>
             <tbody className="text-gray-700">
               {order.items.map((item, idx) => (
                 <tr key={idx} className="border-b border-gray-200">
                   <td className="py-4">
                     <p className="font-bold text-gray-900">{item.breed}</p>
                     <p className="text-xs text-gray-500">{item.category} {item.faceType ? `| Face: ${item.faceType}` : ''}</p>
                   </td>
                   <td className="py-4 text-center font-medium">{item.quantity}</td>
                   <td className="py-4 text-right font-medium">₹{item.price}</td>
                   <td className="py-4 text-right font-bold text-gray-900">₹{item.price * item.quantity}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-1/2 md:w-1/3">
             <div className="flex justify-between py-2 text-sm text-gray-600">
               <span>Subtotal</span>
               <span className="font-bold text-gray-900">₹{order.subtotal || order.total}</span>
             </div>
             <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
               <span>Delivery ({order.deliveryMethod})</span>
               <span className="font-bold text-gray-900">{order.deliveryFee === 0 ? 'Free' : `₹${order.deliveryFee}`}</span>
             </div>
             <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
               <span>Estimated Tax (5%)</span>
               <span className="font-bold text-gray-900">₹{order.tax || 0}</span>
             </div>
             <div className="flex justify-between py-4 text-lg">
               <span className="font-black text-gray-900">Grand Total</span>
               <span className="font-black text-red-600 text-2xl">₹{order.total}</span>
             </div>
             <p className="text-right text-xs font-bold text-gray-400 uppercase mt-2">
               Paid via {order.paymentMethod || 'Cash on Delivery'}
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-gray-200 pt-8 mt-auto">
           <h3 className="font-black text-gray-900 text-xl mb-2">Thank you for your business!</h3>
           <p className="text-gray-500 text-sm">For any inquiries, please contact us at support@meyyakutty.com or call +91 7200271113.</p>
        </div>

      </div>
    </div>
  );
};

export default InvoicePage;
