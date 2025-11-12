import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight mb-4 leading-tight">
              Your Digital Backpack, Reimagined.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 mb-8">
              Note Nest provides a seamless platform for students and faculty at CSE-DS to share, access, and manage academic resources. All your notes, in one nest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup"><Button size="lg" className="w-full sm:w-auto">Sign Up as Student</Button></Link>
              <Link to="/signup"><Button size="lg" variant="secondary" className="w-full sm:w-auto">Sign Up as Faculty</Button></Link>
            </div>
          </div>
          <div className="hidden md:block p-8">
            <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor: '#93C5FD', stopOpacity:1}} />
                </linearGradient>
                <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
                  <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
                  <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
                  <feFlood floodColor="rgb(59,130,246)" result="glowColor" />
                  <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
                  <feMerge>
                    <feMergeNode in="softGlow_colored"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="200" cy="150" r="140" fill="#F3F4F6" />
              <circle cx="200" cy="150" r="110" fill="#E5E7EB" />
              <g transform="translate(100 80) rotate(-15)">
                <rect x="0" y="0" width="80" height="100" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
                <path d="M 15 20 H 65" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 15 35 H 55" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 15 50 H 65" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 15 65 H 45" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <circle cx="60" cy="80" r="12" fill="#EF4444"/>
                <text x="60" y="85" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">PDF</text>
              </g>
              <g transform="translate(220 120) rotate(10)">
                <rect x="0" y="0" width="80" height="100" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
                <path d="M 15 20 H 65" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 15 35 H 55" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="65" r="20" stroke="#34D399" strokeWidth="3" fill="none"/>
                <path d="M 32 65 L 38 71 L 48 61" stroke="#34D399" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <g transform="translate(160 50) rotate(5)">
                <rect x="0" y="0" width="90" height="110" rx="8" fill="url(#grad1)" stroke="#3B82F6" strokeWidth="2" filter="url(#softGlow)"/>
                <path d="M 20 25 H 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M 20 45 H 60" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M 20 65 H 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M 20 85 H 50" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-6 space-y-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">A Better Way to Share & Learn</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-lg p-8">
              <svg className="w-full h-auto" viewBox="0 0 100 80">
                 <rect x="10" y="15" width="80" height="60" rx="5" fill="#E5E7EB"/>
                 <rect x="15" y="20" width="70" height="50" rx="3" fill="white"/>
                 <path d="M 25 30 L 75 30" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                 <path d="M 25 40 L 65 40" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                 <path d="M 25 50 L 70 50" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                 <path d="M 25 60 L 55 60" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                 <circle cx="20" cy="10" r="8" fill="#3B82F6"/>
                 <path d="M 18 10 L 20 12 L 24 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Everything in One Place</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Say goodbye to scattered files and cluttered inboxes. Note Nest organizes all your course materials—from lecture notes to lab assignments—into a single, easy-to-navigate repository.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 bg-gray-100 rounded-lg p-8">
               <svg className="w-full h-auto" viewBox="0 0 100 80">
                  <rect x="10" y="15" width="80" height="15" rx="5" fill="#E5E7EB"/>
                  <circle cx="20" cy="22.5" r="3" fill="#9CA3AF"/>
                  <path d="M 30 22.5 L 80 22.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="55" cy="50" r="15" stroke="#3B82F6" strokeWidth="3" fill="none"/>
                  <path d="M 65 60 L 75 70" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
               </svg>
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Find What You Need, Instantly</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Don't waste time searching. Our powerful search and filtering tools help you locate specific files by subject, date, or uploader in seconds. Accessing your materials has never been faster.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-lg p-8">
               <svg className="w-full h-auto" viewBox="0 0 100 80">
                  <path d="M 30 60 C 30 40, 70 40, 70 60" fill="none" stroke="#E5E7EB" strokeWidth="5"/>
                  <path d="M 20 70 L 80 70 L 75 75 L 25 75 Z" fill="#E5E7EB"/>
                  <path d="M 50 10 L 50 50 M 40 20 L 50 10 L 60 20" stroke="#3B82F6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Streamlined for Educators</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                 Faculty can upload, tag, and manage course content with an intuitive drag-and-drop interface. Keep your students updated with the latest resources, effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Join Note Nest today and transform the way you share and access academic materials.
        </p>
        <Link to="/signup">
          <Button size="lg" className="px-10 py-4">Create Your Free Account</Button>
        </Link>
      </section>

      <footer className="bg-primary text-white">
        <div className="container mx-auto px-6 py-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Note Nest. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
