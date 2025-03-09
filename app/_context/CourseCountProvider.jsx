"use client";
import React, { useState } from 'react';
import { CourseCountContext } from './CourseCountContext';

export default function CourseCountProvider({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      {children}
    </CourseCountContext.Provider>
  );
} 