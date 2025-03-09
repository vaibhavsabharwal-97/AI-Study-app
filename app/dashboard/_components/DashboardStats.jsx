"use client";
import React from 'react';
import { BookOpen, Clock, GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

function DashboardStats({ courseCount = 0 }) {
  const stats = [
    {
      id: 1,
      title: "Study Materials",
      value: courseCount,
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
      increase: "+2 this week"
    },
    {
      id: 2,
      title: "Study Hours",
      value: "12.5",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
      increase: "+3.5 hrs this week"
    },
    {
      id: 3,
      title: "Courses Completed",
      value: Math.max(0, courseCount - 2),
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
      increase: "+1 this month"
    },
    {
      id: 4,
      title: "Learning Streak",
      value: "5",
      icon: <Users className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-600",
      increase: "5 days in a row!"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center">
            <div className={`${stat.color} p-3 rounded-lg`}>
              {stat.icon}
            </div>
            <div className="ml-5">
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <span className="text-xs font-medium text-green-500 ml-2">{stat.increase}</span>
              </div>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default DashboardStats; 