"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

function WelcomeBanner() {
    const {user}=useUser();
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-6 bg-gradient-to-r from-blue-600 to-indigo-600 w-full text-white rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-lg'
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-white/30 rounded-full blur-md"></div>
          <Image 
            src={'/laptop.png'} 
            alt='laptop' 
            width={120} 
            height={120} 
            className="relative z-10 hover-scale" 
          />
        </motion.div>
        <div className="text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='font-bold text-3xl md:text-4xl mb-2'
          >
            Hello, {user?.fullName}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-blue-100 text-lg'
          >
            Welcome back! It's time to continue your learning journey.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4"
          >
            <a href="/create" className="inline-flex items-center px-5 py-2.5 bg-white text-blue-600 rounded-lg font-medium shadow-md hover:bg-blue-50 transition-all duration-300">
              Create New Course
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    )
}

export default WelcomeBanner