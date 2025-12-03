import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./site/layout";
import DashboardLayout from "./dashboard/layout";
import Home from "./site/pages/Home";
import ExamsLayout from "./site/pages/Exams";
import ExamDetails from "./site/pages/ExamDetails";
import ExamAttempt from "./site/pages/ExamAttempt";
import ExamResult from "./site/pages/ExamResult";
import Login from "./site/pages/Login";
import Profile from "./site/pages/Profile";
import ChangePassword from "./site/pages/ChangePassword";

import Dashboard from "./dashboard/pages/Dashboard";
import DashboardBatches from "./dashboard/pages/Batches";
import Banners from "./dashboard/pages/Banners";
import Categories from "./dashboard/pages/Categories";
import SubCategories from "./dashboard/pages/SubCategories";
import Subjects from "./dashboard/pages/Subjects";
import Topics from "./dashboard/pages/Topics";
import Exams from "./dashboard/pages/Exams";
import Questions from "./dashboard/pages/Questions";
import Courses from "./dashboard/pages/Courses";

import Coupons from "./dashboard/pages/Coupons";
import Medias from "./dashboard/pages/Medias";


 ReactDOM.createRoot(document.getElementById('app')).render(
   <React.StrictMode>
    <Router>
      <Routes>
        {/* SITE ROUTES */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="exams" element={<ExamsLayout />} />
          <Route path="exam/:id" element={<ExamDetails />} />
          <Route path="exams/attempt/:userExamId" element={<ExamAttempt />} />
          <Route path="/exam-result/:userExamId" element={<ExamResult />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="banners" element={<Banners />} />
          <Route path="categories" element={<Categories />} />  
          <Route path="sub_categories" element={<SubCategories />} />  
          <Route path="subjects" element={<Subjects />} /> 
          <Route path="topics" element={<Topics />} /> 
          <Route path="exams" element={<Exams />} />
          <Route path="questions" element={<Questions />} />
          <Route path="courses" element={<Courses />} />
          <Route path="batches" element={<DashboardBatches />} />
          <Route path="coupons" element={<Coupons/>} />
          <Route path="medias" element={<Medias />} />
        </Route>
      </Routes>
    </Router>
    </React.StrictMode>
  );

