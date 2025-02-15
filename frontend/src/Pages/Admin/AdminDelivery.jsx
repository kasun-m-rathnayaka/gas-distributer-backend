import React, { useState } from "react";

const AdminDelivery = () => {
  const statusOptions = ["Pending", "In Transit", "Delivered"];

  const [gasStock, setGasStock] = useState([
    { cylinder: "2.3Kg", quantity: 5000 },
    { cylinder: "5Kg", quantity: 3500 },
    { cylinder: "12.5Kg", quantity: 2000 },
    { cylinder: "37.5Kg", quantity: 1000 },
  ]);

  const lowStockOutlets = [
    { outletID: 1, name: "Outlet A", location: "Colombo", cylinder: "5Kg", available: 20, requestQuantity: 50 },
    { outletID: 2, name: "Outlet B", location: "Negombo", cylinder: "12.5Kg", available: 10, requestQuantity: 50 },
  ];

  const [deliveries, setDeliveries] = useState([
    { deliveryID: 101, outlet: "Outlet A", cylinder: "5Kg", quantity: 50, status: "Pending" },
    { deliveryID: 102, outlet: "Outlet B", cylinder: "12.5Kg", quantity: 50, status: "In Transit" },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedDeliveries = [...deliveries];
    updatedDeliveries[index].status = newStatus;
    setDeliveries(updatedDeliveries);
  };

  const handleTransfer = (outlet, cylinder) => {
    const neededQuantity = parseInt(prompt(`Enter quantity to send for ${outlet}:`), 10);
    if (isNaN(neededQuantity) || neededQuantity <= 0) return;

    const updatedStock = gasStock.map((item) =>
      item.cylinder === cylinder && item.quantity >= neededQuantity
        ? { ...item, quantity: item.quantity - neededQuantity }
        : item
    );

    setGasStock(updatedStock);

    setDeliveries([
      ...deliveries,
      { deliveryID: deliveries.length + 103, outlet, cylinder, quantity: neededQuantity, status: "Pending" },
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gas Delivery Management</h2>

      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h3 className="text-lg font-bold mb-2">Main Warehouse Gas Stock</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Cylinder Type</th>
              <th className="p-2 border">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {gasStock.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{item.cylinder}</td>
                <td className="p-2 border">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h3 className="text-lg font-bold mb-2">Outlets with Low Stock</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Outlet</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Cylinder Type</th>
              <th className="p-2 border">Available</th>
              <th className="p-2 border">Request Quantity</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockOutlets.map((outlet, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{outlet.name}</td>
                <td className="p-2 border">{outlet.location}</td>
                <td className="p-2 border">{outlet.cylinder}</td>
                <td className="p-2 border">{outlet.available}</td>
                <td className="p-2 border">{outlet.requestQuantity}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleTransfer(outlet.name, outlet.cylinder)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    Send Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-bold mb-2">Delivery Tracking</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Delivery ID</th>
              <th className="p-2 border">Outlet</th>
              <th className="p-2 border">Cylinder Type</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{delivery.deliveryID}</td>
                <td className="p-2 border">{delivery.outlet}</td>
                <td className="p-2 border">{delivery.cylinder}</td>
                <td className="p-2 border">{delivery.quantity}</td>
                <td className="p-2 border">
                  <select
                    value={delivery.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border rounded p-1 bg-white"
                  >
                    {statusOptions.map((status) => (
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

export default AdminDelivery; 