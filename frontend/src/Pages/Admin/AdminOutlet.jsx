import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminOutlet = () => {
  const navigate = useNavigate();
  const statusOptions = ["All", "Pending", "Approved", "Delivered", "Cancelled", "In Progress"];

  const [ordersData, setOrdersData] = useState([
    { outletID: 1, name: "Outlet A", location: "Colombo", product: "2.3Kg Gas Cylinder", quantity: 100, lastRestock: "2025-01-01", deliveryDate: "2025-01-01", status: "Delivered" },
    { outletID: 2, name: "Outlet B", location: "Negombo", product: "5Kg Gas Cylinder", quantity: 250, lastRestock: "2025-01-21", deliveryDate: "2025-01-01", status: "Approved" }
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...ordersData];
    updatedOrders[index].status = newStatus;
    setOrdersData(updatedOrders);
  };

  const filteredOrders = filterStatus === "All" ? ordersData : ordersData.filter(order => order.status === filterStatus);

  const downloadCSV = () => {
    const csvContent = [
      ["Outlet ID", "Name", "Location", "Product", "Quantity", "Last Restock", "Delivery Date", "Status"],
      ...ordersData.map(order => [order.outletID, order.name, order.location, order.product, order.quantity, order.lastRestock, order.deliveryDate, order.status])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Outlet_Orders_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Outlet Management</h2>
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/outlet-list")} className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">Outlets</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="font-semibold">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded p-2 bg-white"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button onClick={downloadCSV} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
          Download Report
        </button>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Outlet ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Last Restock</th>
              <th className="p-2 border">Delivery Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{order.outletID}</td>
                <td className="p-2 border">{order.name}</td>
                <td className="p-2 border">{order.location}</td>
                <td className="p-2 border">{order.product}</td>
                <td className="p-2 border font-bold">{order.quantity}</td>
                <td className="p-2 border">{order.lastRestock}</td>
                <td className="p-2 border">{order.deliveryDate}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border rounded p-1 bg-white"
                  >
                    {statusOptions.slice(1).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOutlet;
