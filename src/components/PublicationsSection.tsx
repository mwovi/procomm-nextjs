'use client';

import Image from 'next/image';
import Link from 'next/link';

const PublicationsSection = () => {
  const publications = [
    {
      id: 1,
      title: '10 rich, underutilized crops in Kenya',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/interphase_1_hpd5kz.jpg',
      date: { month: '07', day: '04' },
      excerpt: '"Based on their nutritional value and their resilience to changing weather and climatic conditions, the crops should be produced and marketed on a bigger, more commercial scale by the farmer communities," Nout said ...',
      link: 'https://hivos.org/10-richunderutilized-crops-in-kenya/'
    },
    {
      id: 2,
      title: '12 Best Agroecological Practices',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/image_narwdb.jpg',
      date: { month: '07', day: '17' },
      excerpt: 'Farming is inherently risky, with unpredictable weather, pests, and market fluctuations posing constant challenges. To mitigate these risks and protect their livelihoods, farmers often turn to crop insurance....',
      link: 'https://www.pelumkenya.net/wp-content/uploads/2021/11/12-Best-Agroecological-Practices.pdf'
    },
    {
      id: 3,
      title: 'AGRICULTURE in KENYA',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/image-079_tzr77x.jpg',
      date: { month: '07', day: '22' },
      excerpt: 'Ever enjoyed some cheese, yoghurt, French Beans, Mango juice, honey or some meat and wondered where it came from? Does it sometimes sound magical how food grows from a seed in the soil to a delicious meal on your table? Do you do food production or processing and wonder where it finally lands? Well, this is the right book for you...',
      link: 'https://drive.google.com/file/d/1vLxI5NzRJKWLqVUvGC8szQuKYAFNgFg4/view'
    }
  ];

  return (
    <section className="section section-sm bg-default py-20" id="news">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-gray-200 via-blue-300 to-gray-200 bg-clip-text mb-4 drop-shadow-lg">
            Publications
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <article key={publication.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <Link href={publication.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={publication.image}
                    alt={publication.title}
                    width={370}
                    height={307}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center">
                    <time className="block">
                      <span className="block text-xs font-semibold text-blue-600 uppercase">
                        {publication.date.month}
                      </span>
                      <span className="block text-xl font-bold text-gray-800">
                        {publication.date.day}
                      </span>
                    </time>
                  </div>
                </Link>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  <Link href={publication.link} target="_blank" rel="noopener noreferrer">
                    {publication.title}
                  </Link>
                </h4>
                
                <p className="text-gray-600 leading-relaxed line-clamp-4 mb-6">
                  {publication.excerpt}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm border border-blue-200">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm border border-blue-200">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 group"
          >
            View All Publications
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;