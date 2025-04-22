'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { USDAData as fallbackData } from "@/app/api/fetchUSDA/USDAData"; // Local static fallback data
import { fetchUSDAData } from '@/app/api/fetchUSDAData'; // API call for live USDA data
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Icons for the FAQ

export default function HomePage() {
  // Store selected plant name
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  // Store USDA data for the selected plant
  const [plantData, setPlantData] = useState<any | null>(null);

  // Try fetching fresh USDA data when the user selects a plant
  useEffect(() => {
    const getData = async () => {
      if (!selectedPlant) return;

      try {
        // Try getting live USDA data
        const freshData = await fetchUSDAData(selectedPlant);
        if (freshData) {
          setPlantData(freshData);
        } else {
          // If no result from API, fallback to static file
          setPlantData(fallbackData[selectedPlant.toUpperCase()]);
        }
      } catch (err) {
        // If fetch fails, fallback to static USDAData
        console.error('Error fetching USDA data:', err);
        setPlantData(fallbackData[selectedPlant.toUpperCase()]);
      }
    };

    getData();
  }, [selectedPlant]);

   const toggleFaq = (index: number) => {
    setFaqOpen(openFaq === index ? null : index);
  }

  const faq = [
    {
      question: "How do I use Sprout?",
      answer: "1. Click 'Start Your Garden' <br>2. Search your desired plant in the left plant menu, then simply drag and drop them onto the garden bed grid!"
    },
    {
      question: "Can you learn how to garden with Sprout?",
      answer: "You can learn the basics! Sprout is a tool created for new gardeners, as it offers plentiful information on a plants needs and where you should plant things in relation to each other."
    },
    {
      question: "Can I save my garden designs?",
      answer: "Yes! By simply clicking the 'Save Garden' button, a .json file is downloaded to your computer. Later, you can reupload this file with the 'Load Garden' button."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-[#B2D4A7]">

        {/* Homepage Header */}
        <header className="flex justify-between items-center mb-6 p-4 bg-white shadow-lg rounded-lg mx-4 mt-4">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">SPROUT</h1>
          <span className="text-gray-400 text-sm italic ">your garden planner</span>
        </header>
      </div>

      {/* Start Your Garden Button Section */}
      <section 
        className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#B2D4A7] to-[#DAE9D5] p-8"
        style={{ minHeight: '42vh' }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Button 
            asChild 
            size="lg" 
            className="text-3xl bg-white text-green-800 hover:bg-gray-100 px-12 py-8 shadow-md hover:scale-90" // This button shrinks when hovered over. 
          >
            <Link href="/garden">
              Start Your Garden
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Blurbs */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Learn",
                description: "Discover information about your plants needs.",
                icon: "📚" // maybe we can make icons to go here, but for now its emojis. Could also remove these, but the added visuality was nice I thought. 
              },
              {
                title: "Plan",
                description: "Design your garden according to the size of your gardenbed.",
                icon: "✏️"
              },
              {
                title: "Grow",
                description: "Then, go out and plant it in your backyard!", //I think these points sound alright, but if anyone has anything that flows better feel free to change. 
                icon: "🌱"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-8 border-r last:border-r-0 border-gray-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <div className="bg-white py-8">
        <div className="border-2 border-gray-200 rounded-lg mx-2 p-8 max-w-7xl mx-auto">
          <h2 className="text-[50px] font-bold text-green-800 mb-6 text-center">Cost Calculator</h2>

          {/* Plant selection dropdown */}
          <div className="text-center mb-4">
            <select
              className="border p-2 rounded"
              onChange={(e) => setSelectedPlant(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select a plant</option>
              {Object.keys(fallbackData).map((plantKey) => (
                <option key={plantKey} value={plantKey}>{plantKey}</option>
              ))}
            </select>
          </div>

          {/* Display pricing and savings info */}
          {plantData && (
            <div className="text-center text-lg">
              <p>Price Purchased Wholesale: ${plantData.PRICE_WHOLESALE.toFixed(2)}/{plantData.AMOUNT_TYPE}</p>
              <p>Price Grown: ${plantData.PRICE_GROWN.toFixed(2)}/{plantData.AMOUNT_TYPE}</p>
              <p>Amount saved: ${(plantData.PRICE_WHOLESALE - plantData.PRICE_GROWN).toFixed(2)}</p>
              <p className="text-[10px]">NOTE: All amounts in abbreviated formats; CWT = 100LBS</p>
            </div>
          )}
        </div>
      </div>

{/* F.A.Q. Section */}
      <div className="bg-white py-8">
        <div className="border-2 border-gray-200 rounded-lg mx-2 p-8 max-w-7xl mx-auto">
          <h2 className="text-[50px] font-bold text-green-800 mb-6 text-center">F.A.Q</h2>
          
          <div className="space-y-2">
          {faq.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between py-3 text-left"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-${index}`}
                >
                  <h3 className="font-bold text-gray-700">{item.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                <div
                  id={`faq-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p 
                    className="text-gray-600 pb-2" 
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
