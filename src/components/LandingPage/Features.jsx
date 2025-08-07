import * as React from 'react';
import { motion } from 'framer-motion';

const slideInVariant = {
    hidden: (direction) => ({
        opacity: 0,
        x: direction === 'left' ? -100 : 100,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            damping: 20,
        },
    },
};

const roadmapData = [
    {
        text: 'Hosted at Government infrastructure and governed by rules and regulations of GOI.',
        image: 'assets/images/Hosted.jpg',
    },
    {
        text: 'Strategic control with Government.',
        image: 'assets/images/Data_store.png',
    },
    {
        text: 'Web Portal for Organisation/Member Management and Dashboard Services',
        image: 'assets/images/WebPortal.png',
    },
    {
        text: 'Messaging Gateway for Integration with eGov Applications',
        image: 'assets/images/Message.png',
    },
    {
        text: 'App Settings for Privacy and Security',
        image: 'assets/images/Security.webp',
    },
];

function Features() {
    return (
        <div className="mt-16 mb-16 bg-gray-50 py-12">
            <h5 className="text-4xl font-semibold text-center text-[#3D8E43] p-4">
                Features
            </h5>

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {roadmapData.map((item, index) => {
                        const direction = index % 2 === 0 ? 'left' : 'right';

                        return (
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={slideInVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className={`flex flex-col items-center bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
                            >
                                <img
                                    src={item.image}
                                    alt="Feature"
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <p className="text-center text-lg text-gray-700">{item.text}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Features;
