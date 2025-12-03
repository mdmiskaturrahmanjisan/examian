import React from "react";
import { useEffect, useState, useCallback } from "react";
import DashboardService from "../../services/DashboardService";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getStats();
      setStats(res.data);
    } catch {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadStats();
    };
    fetchData();
  }, [loadStats]);

  if (loading || !stats)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      </div>
    );

  const cards = [
    { title: "Categories", value: stats.total_categories, color: "orange" },
    { title: "Sub Categories", value: stats.total_sub_categories, color: "orange" },
    { title: "Banners", value: stats.total_banners, color: "orange" },
    { title: "Batches", value: stats.total_services, color: "orange" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white shadow-2xl rounded-2xl border-t-4 border-${card.color}-500 p-6 transition transform hover:scale-[1.02] hover:shadow-3xl`}
        >
          <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
          <p className={`text-4xl font-extrabold mt-2 text-${card.color}-600`}>
            {card.value}
          </p>
        </div>
      ))}

      {/* Total Service Amount Card */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white shadow-2xl rounded-2xl border-t-4 border-orange-500 p-6 transition transform hover:scale-[1.02] hover:shadow-3xl">
        <h2 className="text-xl font-bold text-gray-800">Total Batch Amount</h2>
        <p className="text-5xl font-extrabold mt-2 text-orange-600">
          ${stats.total_service_amount}
        </p>
      </div>
    </div>
  );
}
