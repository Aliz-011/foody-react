import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBanner from '../img/heroBg.png';
import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex flex-1 flex-col items-start justify-center gap-6">
        <div className="flex items-center justify-center w-fit gap-2 bg-green-400 px-4 py-1 rounded-full">
          <p className="text-base text-white font-semibold">Ojol Delivery</p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="pengantaran motor"
            />
          </div>
        </div>

        <p className="text-[2.5rem] font-bold">
          Pengantaran tercepat
          <span className="text-green-600"> di Abepura</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint adipisci
          tempore delectus facilis, tempora quisquam.
        </p>

        <button className="bg-gradient-to-br from-green-400 to-green-500 px-5 py-1 rounded w-full md:w-auto hover:shadow-lg transition-all duration-200 ease-in-out">
          Order now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBanner}
          className="ml-auto h-420 w-full lg:w-auto lg:h-[650px]"
          alt="herobanner"
        />

        <div className="w-full h-full absolute top-0 left-0 py-4 lg:px-32 flex gap-4 flex-wrap items-center justify-center">
          {heroData &&
            heroData.map((item) => (
              <div
                className="lg:w-190 min-w-[190px] p-4 flex flex-col items-center justify-center bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-lg"
                key={item.id}
              >
                <img
                  src={item.img}
                  alt="ice cream"
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                />
                <p className="font-semibold text-textColor text-base lg:text-xl mt-2 lg:mt-4">
                  {item.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {item.desc}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">Rp.</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
