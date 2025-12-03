import { useState, useEffect, useCallback } from "react";
import CouponService from "../services/CouponService";
import toast from "react-hot-toast";

export const useCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CouponService.getAll();
      setCoupons(res.data);
    } catch {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return { coupons, fetchCoupons, loading };
};
