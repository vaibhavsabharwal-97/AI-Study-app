"use client";
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';

function CourseCardItem({course}) {
  return (
    <motion.div 
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 } 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='border border-gray-100 rounded-xl shadow-sm hover:shadow-md bg-white p-6 relative overflow-hidden transition-all duration-300'
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full translate-x-12 -translate-y-12 opacity-20"></div>
      <div>
        <div className='flex justify-between items-center'>
          <div className="bg-blue-50 p-2 rounded-lg">
            <Image src={'/knowledge.png'} alt='course' 
              width={40} height={40}
              className="hover-scale"
            />
          </div>
        </div>
        
        <h2 className='mt-4 font-semibold text-xl text-gray-800'>{course?.courseLayout?.course_title||course?.courseLayout?.courseTitle}</h2>
        
        <div className='mt-2 flex items-center gap-1 text-xs text-blue-600'>
          <BookOpen className='h-3 w-3' />
          <span>Course material</span>
        </div>
        
        <p className='text-sm line-clamp-2 text-gray-500 mt-3'>{course?.courseLayout?.summary}</p>

        <div className='mt-5'>
          {/* <Progress value={33} className="h-1.5 bg-blue-100" /> */}
        </div>

        <div className='mt-5 flex justify-end'>
          {course?.status=='Generating' ? (
            <div className='text-sm py-1.5 px-3 flex gap-2 items-center rounded-full bg-gray-100 text-gray-700'>
              <RefreshCw className='h-4 w-4 animate-spin text-blue-600'/>
              <span>Generating...</span>
            </div>
          ) : (
            <Link href={'/course/'+course?.courseId}>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg">
                View Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCardItem