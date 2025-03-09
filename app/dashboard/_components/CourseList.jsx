"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle, RefreshCw, Search } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

function CourseList() {
    const {user}=useUser();
    const [courseList,setCourseList]=useState([]);
    const [loading,setLoading]=useState(false);
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    
    useEffect(()=>{
        user&&GetCourseList();
    },[user])

    const GetCourseList=async()=>{
        setLoading(true);
        const result=await axios.post('/api/courses',
            {createdBy:user?.primaryEmailAddress?.emailAddress})
            console.log(result);
            setCourseList(result.data.result);
            setLoading(false);
            setTotalCourse(result.data.result?.length);
    }
    
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };
    
    return (
      <div className='mt-10'>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8'
        >
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <h2 className='font-bold text-2xl text-gray-800 flex items-center gap-2'>
                <BookOpen className="h-6 w-6 text-blue-600" />
                Your Study Materials
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {courseList?.length || 0}
                </span>
              </h2>
              <p className="text-gray-500 mt-1">Manage and access all your study materials in one place</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input 
                  type="search" 
                  className="block w-full p-2 pl-10 text-sm border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Search courses..." 
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={GetCourseList}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2"/> 
                  Refresh
                </Button>
                
                <Link href="/create">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <PlusCircle className="h-4 w-4 mr-2"/> 
                    Create New
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {loading === false ? (
            courseList?.length > 0 ? (
              courseList.map((course, index) => (
                <CourseCardItem course={course} key={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16 px-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <BookOpen className="h-12 w-12 text-blue-200 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No study materials yet</h3>
                  <p className="text-gray-500 max-w-md mb-6">Create your first study material to get started with AI-powered learning</p>
                  <Link href="/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <PlusCircle className="h-4 w-4 mr-2"/> 
                      Create New Study Material
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          ) : (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className='rounded-xl overflow-hidden'>
                <div className="h-36 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded mt-4 w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mt-3 w-1/2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded mt-4 w-1/3 ml-auto animate-pulse"></div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    )
}

export default CourseList