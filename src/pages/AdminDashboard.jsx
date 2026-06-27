import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useOrders } from '../context/OrderContext';
import { useShop } from '../context/ShopContext';
import { Check, X, Package, HeartPulse, Box, Plus, Edit2, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { requests, updateRequestStatus } = useAdmin();
  const { orders, updateOrderStatus } = useOrders();
  const { pets, addPet, updatePet, deletePet } = useShop();
  
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'requests', 'supplies'
  
  // Supplies Management State
  const supplyCategories = ['Dog Supplies', 'Cat Supplies', 'Bird Supplies', 'Fish Supplies', 'Hamster Supplies', 'Other Pet Supplies'];
  const [activeSupplyCat, setActiveSupplyCat] = useState('Dog Supplies');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    breed: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    description: ''
  });

  const handleStatusChange = (orderId, e) => {
    updateOrderStatus(orderId, e.target.value);
  };

  const suppliesList = pets.filter(p => p.category === 'Supplies' && p.subcategory === activeSupplyCat);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      breed: product.breed,
      price: product.price,
      stockQuantity: product.stockQuantity || 0,
      imageUrl: product.imageUrl,
      description: product.description
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ breed: '', price: '', stockQuantity: '', imageUrl: '', description: '' });
    setIsAdding(true);
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
      category: 'Supplies',
      subcategory: activeSupplyCat,
      gender: 'Accessory',
      ageMonths: 0,
      isVaccinated: false
    };

    if (isAdding) {
      addPet(productData);
    } else if (editingProduct) {
      updatePet(editingProduct, productData);
    }
    
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deletePet(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-4xl font-black text-gray-800 mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            activeTab === 'orders' ? 'bg-[var(--color-brand-red)] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Package size={20} /> Manage Orders
        </button>
        <button 
          onClick={() => setActiveTab('supplies')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            activeTab === 'supplies' ? 'bg-[var(--color-brand-red)] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Box size={20} /> Manage Supplies
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            activeTab === 'requests' ? 'bg-[var(--color-brand-red)] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <HeartPulse size={20} /> Service Requests
        </button>
      </div>
      
      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-black text-gray-900">Recent Customer Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
               <Package size={48} className="text-gray-300 mb-4" />
               <p className="text-gray-500 font-bold text-xl">No orders placed yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map(order => (
                <div key={order.id} className="p-8 hover:bg-gray-50 transition-colors flex flex-col lg:flex-row gap-8">
                  {/* Order Info */}
                  <div className="lg:w-1/3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID: {order.id}</p>
                    <h3 className="font-black text-xl text-gray-900 mb-2">{order.customer.fullName}</h3>
                    <p className="font-medium text-gray-600 mb-4">{order.customer.mobile}</p>
                    <p className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md inline-block">
                       {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Items Summary */}
                  <div className="lg:w-1/3">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Items ({order.items.length})</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {order.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between items-center text-sm font-medium">
                           <span className="text-gray-800 line-clamp-1 flex-1 pr-2">{item.breed} ({item.category})</span>
                           <span className="text-gray-500 whitespace-nowrap">x {item.quantity}</span>
                         </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="lg:w-1/3 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
                    <div className="w-full text-right mb-4">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Value</p>
                      <p className="text-3xl font-black text-[var(--color-brand-red)]">₹{order.total}</p>
                      <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Via {order.paymentMethod}</p>
                    </div>
                    
                    <div className="w-full">
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status</label>
                       <select 
                         value={order.status}
                         onChange={(e) => handleStatusChange(order.id, e)}
                         disabled={order.status === 'Cancelled'}
                         className="w-full p-3 rounded-xl border-2 border-gray-200 font-bold text-gray-800 focus:border-blue-500 outline-none"
                       >
                         <option value="Placed">Placed</option>
                         <option value="Confirmed">Confirmed</option>
                         <option value="Preparing">Preparing</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Out for Delivery">Out for Delivery</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled" disabled>Cancelled</option>
                       </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Supplies Tab */}
      {activeTab === 'supplies' && (
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row min-h-[60vh]">
          {/* Sidebar Categories */}
          <div className="w-full lg:w-1/4 bg-gray-50 border-r border-gray-100 p-6 flex flex-col gap-2">
            <h3 className="font-black text-gray-900 text-lg mb-4 px-2">Categories</h3>
            {supplyCategories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveSupplyCat(cat); handleCancelForm(); }}
                className={`text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeSupplyCat === cat ? 'bg-[var(--color-brand-red)] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-black text-gray-900">{activeSupplyCat}</h2>
              {!isAdding && !editingProduct && (
                <button onClick={handleAdd} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-black transition-colors">
                  <Plus size={20} /> Add Product
                </button>
              )}
            </div>

            {(isAdding || editingProduct) ? (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 animate-fade-in">
                <h3 className="text-xl font-black text-gray-800 mb-6">{isAdding ? 'Add New Product' : 'Edit Product'}</h3>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">Product Name *</label>
                      <input required type="text" name="breed" value={formData.breed} onChange={handleFormChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[var(--color-brand-red)] outline-none" placeholder="e.g. Dog Food Bowl" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">Price (₹) *</label>
                      <input required type="number" name="price" value={formData.price} onChange={handleFormChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[var(--color-brand-red)] outline-none" placeholder="Price" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">Stock Quantity *</label>
                      <input required type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleFormChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[var(--color-brand-red)] outline-none" placeholder="Quantity" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">Image URL</label>
                      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[var(--color-brand-red)] outline-none" placeholder="/images/clean/..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">Description</label>
                    <textarea name="description" rows="3" value={formData.description} onChange={handleFormChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[var(--color-brand-red)] outline-none" placeholder="Product details..."></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={handleCancelForm} className="px-6 py-3 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-3 font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors shadow-md">
                       {isAdding ? 'Save New Product' : 'Update Product'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                {suppliesList.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 font-bold text-lg">No products found in {activeSupplyCat}.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {suppliesList.map(prod => (
                      <div key={prod.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col group">
                        <div className="h-40 bg-gray-100 overflow-hidden relative">
                          <img src={prod.imageUrl || '/api/placeholder/400/300'} alt={prod.breed} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-black shadow-sm">
                            Stock: <span className={prod.stockQuantity > 5 ? 'text-green-600' : 'text-red-500'}>{prod.stockQuantity || 0}</span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-black text-gray-900 text-lg mb-1 line-clamp-1">{prod.breed}</h4>
                            <p className="text-[var(--color-brand-red)] font-bold text-lg">₹{prod.price}</p>
                          </div>
                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                            <button onClick={() => handleEdit(prod)} className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-bold text-sm transition-colors">
                              <Edit2 size={16} /> Edit
                            </button>
                            <button onClick={() => handleDelete(prod.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-bold text-sm transition-colors">
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Service Requests Tab */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-black text-gray-900">Sell & Care Requests</h2>
          </div>
          
          {requests.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
               <HeartPulse size={48} className="text-gray-300 mb-4" />
               <p className="text-gray-500 font-bold text-xl">No requests submitted yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {requests.map(req => (
                <div key={req.id} className="p-8 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-8">
                  <div className="flex flex-wrap gap-2 w-full md:w-auto flex-shrink-0">
                    {req.images.map((img, i) => (
                      <img key={i} src={img} alt="pet preview" className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-200" />
                    ))}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 bg-red-100 text-[var(--color-brand-red)] font-black rounded-xl text-xs uppercase tracking-wider">
                        {req.service}
                      </span>
                      <span className={`px-4 py-1.5 font-black rounded-xl text-xs uppercase tracking-wider ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        req.status === 'Rejected' ? 'bg-gray-200 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {req.status}
                      </span>
                      <span className="text-gray-400 font-bold text-sm ml-auto">
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="font-black text-2xl text-gray-900 mb-1">{req.data.fullName}</h3>
                    <p className="font-bold text-gray-600 mb-4">{req.data.mobile}</p>
                    
                    <div className="bg-white p-4 rounded-xl border border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
                      {req.data.petType && <p><span className="text-gray-400 uppercase text-xs font-bold tracking-wider block">Type</span> {req.data.petType}</p>}
                      {req.data.breed && <p><span className="text-gray-400 uppercase text-xs font-bold tracking-wider block">Breed</span> {req.data.breed}</p>}
                      {req.data.age && <p><span className="text-gray-400 uppercase text-xs font-bold tracking-wider block">Age</span> {req.data.age}</p>}
                      {req.data.careRequired && <p><span className="text-gray-400 uppercase text-xs font-bold tracking-wider block">Care Required</span> {req.data.careRequired}</p>}
                      {req.data.rescueLocation && <p className="col-span-2"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider block">Location</span> {req.data.rescueLocation}</p>}
                    </div>
                    
                    {req.data.description && (
                      <p className="mt-4 text-gray-700 italic border-l-4 border-[var(--color-brand-red)] pl-4 py-1 bg-gray-50">"{req.data.description}"</p>
                    )}
                  </div>

                  <div className="flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 min-w-[140px]">
                    {req.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => updateRequestStatus(req.id, 'Approved')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-md"
                        >
                          <Check size={18} /> Approve
                        </button>
                        <button 
                          onClick={() => updateRequestStatus(req.id, 'Rejected')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors"
                        >
                          <X size={18} /> Reject
                        </button>
                      </>
                    )}
                    <a 
                      href={`tel:${req.data.mobile}`}
                      className="flex-1 md:flex-none flex items-center justify-center py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-bold transition-colors text-center border border-blue-200"
                    >
                      Call Customer
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
