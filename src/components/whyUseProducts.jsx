import React from 'react';
import { useInView } from 'react-intersection-observer';
import { PencilIcon, CalendarIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const reasons = [
  {
    name: "Automated Content Creation",
    description: "Generate stunning content effortlessly with our AI-powered tools. Spend less time on creation and more on creativity.",
    icon: SparklesIcon,
    color: 'text-blue-500',
  },
  {
    name: "Advanced Scheduling",
    description: "Plan and schedule your social media posts in advance. Enjoy peace of mind with our robust and reliable scheduling system.",
    icon: CalendarIcon,
    color: 'text-green-500',
  },
  {
    name: "Smart Editing",
    description: "Easily edit and enhance your posts with AI-assisted tools. Ensure your content always looks professional and polished.",
    icon: PencilIcon,
    color: 'text-yellow-500',
  },
  {
    name: "Enhanced Security",
    description: "Your data and content are safe with our top-notch security features. Focus on your creativity while we handle the rest.",
    icon: ShieldCheckIcon,
    color: 'text-red-500',
  },
];

const WhyUseOurProduct = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Discover the sweetest features</h2>
          <p className="mt-2 text-3xl tracking-tight text-gray-900 sm:text-4xl">
          Why you’ll love GetSweet.AI
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <Reason key={index} {...reason} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Reason = ({ name, description, icon: Icon, color }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center shadow-xl rounded-xl py-5 text-center transition-all duration-700 ease-in-out ${inView ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}
    >
      <div className="flex-shrink-0 mb-4">
        <Icon className={`h-10 w-10 ${color}`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-medium text-gray-900">{name}</p>
        <p className="text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default WhyUseOurProduct;
