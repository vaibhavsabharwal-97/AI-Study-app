"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight, BookOpen, Loader, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import PageTransition from '../_context/PageTransition';

function Create() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))

        console.log(formData);
    }

    /**
     * Used to Save User Input and Generate Course Layout using AI
     */
    const GenerateCourseOutline = async () => {
        const courseId = uuidv4();
        setLoading(true);
        const result = await axios.post('/api/generate-course-outline', {
            courseId: courseId,
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress
        });
        setLoading(false);
        router.replace('/dashboard');
        //Toast Notification
        toast("Your course content is generating, Click on Refresh Button")
        console.log(result.data.result.resp);
    }

    return (
        <PageTransition>
            <div className='relative min-h-screen'>
                {/* Background decoration elements */}
                <div className="absolute top-20 -left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                
                <div className='container mx-auto px-5 py-16 flex flex-col items-center'>
                    {/* Progress indicator */}
                    <div className="w-full max-w-md mb-8">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                                        Step {step + 1} of 2
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                        {step === 0 ? '50%' : '100%'}
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                                <motion.div 
                                    initial={{ width: step === 0 ? "0%" : "50%" }}
                                    animate={{ width: step === 0 ? "50%" : "100%" }}
                                    transition={{ duration: 0.5 }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 to-indigo-600"
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-4">
                            <Sparkles size={30} />
                        </div>
                        <h2 className='font-bold text-3xl md:text-4xl text-gray-800 mb-4'>Create Your Personalized Study Material</h2>
                        <p className='text-gray-500 text-md md:text-lg max-w-2xl mx-auto'>
                            Our AI-powered system will generate comprehensive study materials tailored to your needs. Just follow these simple steps.
                        </p>
                    </motion.div>

                    <div className='w-full max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
                        {step === 0 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TopicInput
                                    setTopic={(value) => handleUserInput('topic', value)}
                                    setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className='flex justify-between w-full max-w-3xl mt-8'>
                        {step !== 0 ? (
                            <Button 
                                variant="outline" 
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                <ArrowLeft size={16} />
                                Previous
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        
                        {step === 0 ? (
                            <Button 
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Next
                                <ArrowRight size={16} />
                            </Button>
                        ) : (
                            <Button 
                                onClick={GenerateCourseOutline} 
                                disabled={loading}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                {loading ? <Loader className='animate-spin' /> : (
                                    <>
                                        <BookOpen size={16} />
                                        Generate Material
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Create