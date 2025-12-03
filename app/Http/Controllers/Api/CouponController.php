<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        return Coupon::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:coupons,code',
            'title' => 'required|string|max:255',
            'type' => 'required|in:fixed,percentage',
            'amount' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::create($validated);
        return response()->json($coupon, 201);
    }

    public function show($id)
    {
        return Coupon::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->update($request->only(['code', 'title', 'type', 'amount']));
        return response()->json($coupon);
    }

    public function destroy($id)
    {
        Coupon::findOrFail($id)->delete();
        return response()->noContent();
    }
}
