"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

function SelectOption({ selectedStudyType }) {
    const Options = [
        {
            name: 'Exam',
            icon: '/exam_1.png',
            description: 'Prepare for upcoming exams and tests'
        },
        {
            name: 'Job Interview',
            icon: '/job.png',
            description: 'Get ready for your next career opportunity'
        },
        {
            name: 'Practice',
            icon: '/practice.png',
            description: 'Enhance your skills through practice materials'
        },
        {
            name: 'Coding Prep',
            icon: '/code.png',
            description: 'Master programming concepts and patterns'
        },
        {
            name: 'Other',
            icon: '/knowledge.png',
            description: 'Create custom study material for other needs'
        },
    ];
    
    const [selectedOption, setSelectedOption] = useState();
    
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    
    return (
        <div>
            <h2 className='text-center mb-6 text-xl font-medium text-gray-800'>What type of study material do you need?</h2>
            
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            >
                {Options.map((option, index) => (
                    <motion.div 
                        key={index}
                        variants={item}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`p-6 flex flex-col items-center justify-center 
                            border rounded-xl cursor-pointer relative overflow-hidden
                            hover:shadow-md transition-all duration-300
                            ${option?.name === selectedOption 
                                ? 'border-blue-600 bg-blue-50' 
                                : 'border-gray-100 bg-white hover:border-blue-200'}`}
                        onClick={() => {
                            setSelectedOption(option.name);
                            selectedStudyType(option.name);
                        }}
                    >
                        {option?.name === selectedOption && (
                            <div className="absolute top-3 right-3 text-blue-600">
                                <CheckCircle size={20} />
                            </div>
                        )}
                        
                        <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 
                            ${option?.name === selectedOption ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <Image 
                                src={option.icon} 
                                alt={option.name} 
                                width={30} 
                                height={30}
                                className="hover-scale" 
                            />
                        </div>
                        
                        <h2 className={`text-lg font-medium mb-2 ${option?.name === selectedOption ? 'text-blue-600' : 'text-gray-800'}`}>
                            {option.name}
                        </h2>
                        
                        <p className="text-xs text-gray-500 text-center">
                            {option.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default SelectOption