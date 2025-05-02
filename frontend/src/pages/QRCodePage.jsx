import { QRCodeSVG } from 'qrcode.react';
import img from "../assets/MAIN-LW.png";
import { useEffect } from 'react';

export default function QRCodePage() {
  useEffect(() => {
    // Create floating bubbles for the background
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'bubbles-container absolute inset-0 overflow-hidden';
    document.querySelector('.min-h-screen')?.appendChild(bubblesContainer);

    // Generate bubbles
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble absolute rounded-full bg-blue-100 opacity-20';
      bubble.style.width = `${Math.random() * 60 + 20}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}vw`;
      bubble.style.top = `${Math.random() * 100}vh`;
      bubble.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubblesContainer.appendChild(bubble);
    }

    return () => {
      // Cleanup on component unmount
      bubblesContainer.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400/40 to-blue-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating bubbles will be injected here via JS */}

      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full z-10">
        {/* Logo container with centered alignment */}
        <div className="flex justify-center mb-6">
          <img 
            src={img} 
            alt="Church Logo" 
            className="w-32 h-auto rounded-se-4xl" 
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-4">Church Bus Registration</h1>
        <p className="text-center mb-6">Scan this QR code to register for the bus</p>
        
        <div className="flex justify-center mb-6">
          <QRCodeSVG 
            value={`${window.location.origin}/register`}
            size={200}
            level="H"
          />
        </div>
        
        <p className="text-center text-sm text-gray-600">
          Can't scan? <a href="/register" className="text-blue-600 hover:underline">Click here</a>
        </p>
      </div>

      {/* Add the animation styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: 0.1;
          }
          100% {
            transform: translateY(-200px) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }
        .bubble {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}