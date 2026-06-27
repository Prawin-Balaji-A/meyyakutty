import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [requests, setRequests] = useState([]); // Will store Sell & Care requests

  const addRequest = (request) => {
    setRequests((prev) => [{ ...request, id: Date.now(), status: 'Pending', createdAt: new Date() }, ...prev]);
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  return (
    <AdminContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
