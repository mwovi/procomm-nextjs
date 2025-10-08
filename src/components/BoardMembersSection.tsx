'use client';

import { useState } from 'react';
import Image from 'next/image';

const BoardMembersSection = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const boardMembers = [
    {
      id: 'joyce_kamau',
      name: 'Joyce Kamau',
      role: 'Development Communication and Public Relations specialist',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/Joyce_Kamau_dfxjmi.png',
      shortBio: 'Joyce Kamau is a seasoned Development Communication & Public Relations specialist with proficiency in both traditional and contemporary communication. She has over Thirteen (13) years\' experience creating and implementing effective communication strategies for brand positioning, Social & behavior change, customer experience, developing public relations solutions and packaging Public Communications for development agencies, public institutions and the private sector...',
      fullBio: `Joyce Kamau is a seasoned Development Communication & Public Relations specialist with proficiency in both traditional and contemporary communication. She has over Thirteen (13) years' experience creating and implementing effective communication strategies for brand positioning, Social & behavior change, customer experience, developing public relations solutions and packaging Public Communications for development agencies, public institutions and the private sector.

She is well versed with technical and practical skills critical for effective vertical and horizontal Communication amongst a broad spectrum of stakeholders. Her key strengths include being a quick learner with problem solving and critical thinking skills. Joyce is highly adaptive to changes in technology and the communication needs of diverse stakeholders, and also highly skilled in development of communication strategies that meet the needs of an organization keen on upholding both customer experience and customer satisfaction.

Some of the key highlights of her tenure of service include conceptualizing, coordinating and organizing key state functions in the infrastructure space for the three heads of states from H.E President Mwai Kibaki, H.E President Uhuru Kenyatta and H.E President William Ruto. Coordinating Ministerial and State Departments Trade Fairs and exhibitions. Joyce holds a Bachelors Degree in Communication from University of Nairobi and a Master's Degree in Development Communication from the same institution.`
    },
    {
      id: 'julius_sigei',
      name: 'Julius Sigei',
      role: 'Journalist, Editor, Publishing Consultant and Trainer',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/julius_Sigei_gxezdr.jpg',
      shortBio: 'Julius is journalist, editor, publishing consultant, media engagement expert and trainer with 20 years\' experience in public and private sectors. He was for many years a senior editor with Saturday Nation which publishes \'Weekend\', a popular books journal. He has been a ghostwriter and editor of memoirs and biographies for more than 15 years. He regularly edits books and reviews manuscripts for such leading publishing houses as Longhorn, Phoenix and Africawide Network. Since 2019, he has been an editorial consultant with the Kenya...',
      fullBio: `Julius is journalist, editor, publishing consultant, media engagement expert and trainer with 20 years' experience in public and private sectors. He was for many years a senior editor with Saturday Nation which publishes 'Weekend', a popular books journal. He has been a ghostwriter and editor of memoirs and biographies for more than 15 years. He regularly edits books and reviews manuscripts for such leading publishing houses as Longhorn, Phoenix and Africawide Network. Since 2019, he has been an editorial consultant with the Kenya Yearbook Editorial Board where he helps with its various multisectoral publications such as Mwai Kibaki and Uhuru Kenyatta Cabinets.`
    }
  ];

  return (
    <section className="section section-sm bg-default py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            <span className="border-b-4 border-blue-400 pb-2">Board Members</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {boardMembers.map((member) => (
            <article key={member.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex items-start space-x-6 mb-6">
                <div className="flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-semibold text-sm leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="text-gray-600 leading-relaxed mb-6">
                <p className="italic">
                  {member.shortBio}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedMember(member.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
                >
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-8">
                {(() => {
                  const member = boardMembers.find(m => m.id === selectedMember);
                  if (!member) return null;
                  
                  return (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                          />
                          <div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-1">
                              {member.name}
                            </h4>
                            <p className="text-blue-600 font-semibold text-sm">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedMember(null)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-gray-600 leading-relaxed space-y-4">
                        {member.fullBio.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="italic">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoardMembersSection;