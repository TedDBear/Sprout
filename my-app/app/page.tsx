'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {USDAData} from "@/app/api/fetchUSDA/USDAData";
import {useState} from 'react';

export default function HomePage() {

  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const plantData = selectedPlant ? USDAData[selectedPlant.toUpperCase()] : null;
  
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
          
          {/*  this is where the cost/savings calc. can go!! */}
          <div className="bg-white py-8">
      <div className="border-2 border-gray-200 rounded-lg mx-2 p-8 max-w-7xl mx-auto">
        <h2 className="text-[50px] font-bold text-green-800 mb-6 text-center">Cost Calculator</h2>
        
        <div className="text-center mb-4">
          <select
            className="border p-2 rounded"
            onChange={(e) => setSelectedPlant(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select a plant</option>
            {Object.keys(USDAData).map((plantKey) => (
              <option key={plantKey} value={plantKey}>{plantKey}</option>
            ))}
          </select>
        </div>

        {plantData && (
          <div className="text-center text-lg">
            <p>Price Purchased Wholesale: ${plantData.PRICE_WHOLESALE.toFixed(2)}/{plantData.AMOUNT_TYPE}</p>
            <p>Price Grown: ${plantData.PRICE_GROWN.toFixed(2)}/{plantData.AMOUNT_TYPE}</p>
            <p>Amount saved: ${(plantData.PRICE_WHOLESALE - plantData.PRICE_GROWN).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
        </div>
      </div>

{/* F.A.Q. Section */}
      <div className="bg-white py-8">
        <div className="border-2 border-gray-200 rounded-lg mx-2 p-8 max-w-7xl mx-auto">
          <h2 className="text-[50px] font-bold text-green-800 mb-6 text-center">F.A.Q</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-700 text-left">How do I use Sprout?</h3>
              <p className="text-gray-600 mt-2 text-left">
                1. Click 'Start Your Garden' <br></br>
                2. Search your desired plant in the left plant menu, then simply drag and drop them onto the garden bed grid!
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-700 text-left">Can you learn how to garden with Sprout?</h3>
              <p className="text-gray-600 mt-2 text-left">
                You can learn the basics! Sprout is a tool created for new gardeners, as it offers plentiful information on a plants needs and where you should plant things in relation to eachother. 
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-700 text-left">Can I save my garden designs?</h3>
              <p className="text-gray-600 mt-2 text-left">
                Yes! By simply clicking the 'Save Garden' button, a .json file is downloaded to your computer. Later, you can reupload this file with the 'Load Garden' button.
              </p>
              {/* I'm sure there are other things we can add to this F.A.Q., but I think it would be best if we keep it brief. */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
