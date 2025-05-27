
import React from 'react';
import labanoon from '../assets/Labanoon.png';
import sillyfools from '../assets/Sillyfools.png';
import bgImage from '../assets/concert-bg.png';
import { Link } from 'react-router-dom';



const HeroBanner: React.FC = () => {
    const labanoonAudio = React.useRef<HTMLAudioElement | null>(null);
    const sillyAudio = React.useRef<HTMLAudioElement | null>(null);

      const playAudio = (ref: React.RefObject<HTMLAudioElement | null>) => {
  if (ref.current) {
    ref.current.currentTime = 0;
    ref.current.play();
  }
};

const stopAudio = (ref: React.RefObject<HTMLAudioElement | null>) => {
  if (ref.current) {
    ref.current.pause();
    ref.current.currentTime = 0;
  }
};



  return (
    <section
      className="relative h-screen text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Labanoon*/}
      <div
        className="absolute top-10 left-10 z-20 cursor-pointer group"
        onMouseEnter={() => playAudio(labanoonAudio)}
       onMouseLeave={() => stopAudio(labanoonAudio)}
      >
     <img
     src={labanoon}
     alt="Labanoon"
     className="w-[200px] md:w-[260px] lg:w-[300px] object-contain opacity-30 group-hover:opacity-100 group-hover:scale-110 transition duration-500 ease-in-out"
     />
    </div>

      {/* sillyfools*/}
      <div
        className="absolute bottom-0 right-0 z-20 cursor-pointer group p-4"
         onMouseEnter={() => playAudio(sillyAudio)}
         onMouseLeave={() => stopAudio(sillyAudio)}
       > 
     <img
        src={sillyfools}
        alt="Silly Fools"
        className="w-[250px] md:w-[300px] lg:w-[350px] object-contain opacity-30 group-hover:opacity-100 group-hover:scale-110 transition duration-500 ease-in-out"
       />
     </div>

      
      <div className="relative z-20 flex flex-col items-center justify-start h-full text-center px-4 pt-[20vh] pointer-events-none">
        <nav className="mt-8 px-6 py-3 bg-white text-black font-semibold tracking-wider rounded hover:bg-gray-300 transition pointer-events-auto">
          <Link to="/shop">Get tickets</Link>
        </nav>
      </div>
      <audio ref={labanoonAudio} src="/labanoon.mp3" preload="auto" />
      <audio ref={sillyAudio} src="/sillyfools.mp3" preload="auto" />
    </section>
  );
};



export default HeroBanner;
