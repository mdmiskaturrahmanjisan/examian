<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{Banner, Category, Coupon, Service};

class PublicController extends Controller
{
    public function index()
    {
        return response()->json([
            'banners' => Banner::with('media')->get(),
            'coupons' => Coupon::all(),
            'categories' => Category::with(['media', 'subCategories.media'])->whereNull('parent_id')->get(),
            'servicePackages' => [],
            'featuredServices' => Service::with(['media','user'])->where('status', 1)->get(),
        ]);
    }
}

