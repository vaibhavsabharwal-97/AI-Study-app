"use client";
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion';
import { BookOpen, Info, LightbulbIcon } from 'lucide-react';

function TopicInput({ setTopic, setDifficultyLevel }) {
    const [topicValue, setTopicValue] = useState('');
    const [difficulty, setDifficulty] = useState('');
    
    const handleTopicChange = (event) => {
        setTopicValue(event.target.value);
        setTopic(event.target.value);
    };
    
    const handleDifficultyChange = (value) => {
        setDifficulty(value);
        setDifficultyLevel(value);
    };
    
    return (
        <div className='w-full'>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
            >
                <div className="flex items-center mb-4">
                    <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-medium text-gray-800">What would you like to study?</h2>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                        Enter a specific topic or paste content for which you want to generate study material. 
                        The more detailed your description, the better results you'll get.
                    </p>
                </div>
                
                <Textarea 
                    placeholder="E.g., Introduction to machine learning algorithms, JavaScript event loop, World War II causes and effects..." 
                    className="mt-2 w-full min-h-[150px] border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg" 
                    onChange={handleTopicChange}
                    value={topicValue}
                />
                
                {topicValue.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-gray-500 mt-2 flex justify-end"
                    >
                        {topicValue.length} characters
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className="flex items-center mb-4">
                    <LightbulbIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-medium text-gray-800">Select difficulty level</h2>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                    This helps us tailor the content complexity to your knowledge level.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {['Easy', 'Moderate', 'Hard'].map((level) => (
                        <motion.div
                            key={level}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                p-4 border rounded-lg cursor-pointer text-center transition-all duration-200
                                ${difficulty === level 
                                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                                    : 'border-gray-200 hover:border-blue-300'}
                            `}
                            onClick={() => handleDifficultyChange(level)}
                        >
                            <div className={`text-lg font-medium ${difficulty === level ? 'text-blue-600' : 'text-gray-700'}`}>
                                {level}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {level === 'Easy' && 'Beginner friendly content'}
                                {level === 'Moderate' && 'Intermediate level depth'}
                                {level === 'Hard' && 'Advanced, in-depth material'}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Keeping the original Select component as a fallback */}
                <div className="hidden">
                    <Select onValueChange={handleDifficultyChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Difficulty Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>
        </div>
    )
}

export default TopicInput