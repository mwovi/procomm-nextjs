'use client';

import { useState } from 'react';
import Image from 'next/image';

const GetMoreWithUsSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      title: 'DIRECT ACCESS TO EXPERTS',
      content: 'Gain direct access to our network of experts, enabling you to ask questions, seek advice, and engage in meaningful conversations with agricultural thought leaders.'
    },
    {
      id: 2,
      title: 'EXCLUSIVE EVENT INVITATIONS',
      content: 'Receive invitations to exclusive events, workshops, and conferences. Network with industry professionals, learn from experts, and stay at the forefront of agricultural advancements.'
    },
    {
      id: 3,
      title: 'RISK COMMUNICATION',
      content: 'With the rise in unexpected events and disruptions globally, risk communication becomes very important. Procom Media helps clients communicate effectively during crises and uncertainties, making it easy for them to manage and mitigate potential risks'
    },
    {
      id: 4,
      title: 'DEVELOPMENT SUPPORT COMMUNICATION',
      content: 'Procomm assists institutions in ensuring effective communication of their development initiatives, progress and impact to their target stakeholders. This is particularly valuable for organizations working in the development and social impact sectors.'
    }
  ];

  const carouselImages = [
    'https://res.cloudinary.com/dcutc6ix8/image/upload/camera-1705135_1920_xlejha.jpg',
    'https://res.cloudinary.com/dcutc6ix8/image/upload/20230713_103522_afzana.jpg'
  ];

  return (
    <section className="section section-sm bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Get More With Us
            </h2>

            {/* Tabs */}
            <div className="tabs-custom">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {String(tab.id).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`transition-opacity duration-300 ${
                      activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
                  >
                    <h5 className="text-xl font-semibold text-gray-800 mb-4">
                      {tab.title}
                    </h5>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {tab.content}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                      Get in touch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="text-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {carouselImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        width={313}
                        height={580}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
                {carouselImages.map((image, index) => (
                  <div key={`duplicate-${index}`} className="relative group">
                    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1} duplicate`}
                        width={313}
                        height={580}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetMoreWithUsSection;