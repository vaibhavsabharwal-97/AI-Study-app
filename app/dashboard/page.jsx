"use client";
import React, { useContext } from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import PageTransition from '../_context/PageTransition'
import DashboardStats from './_components/DashboardStats'
import { CourseCountContext } from '../_context/CourseCountContext'

function Dashboard() {
  const { totalCourse } = useContext(CourseCountContext);
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <WelcomeBanner/>
        
        <DashboardStats courseCount={totalCourse || 0} />
        
        <div className="mt-6">
          <CourseList/>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard