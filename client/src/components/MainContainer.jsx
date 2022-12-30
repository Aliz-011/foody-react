import React, { useEffect, useRef, useState } from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Carousel from './Carousel';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const [{ foods, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex justify-between items-center">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-to-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-200">
            Es krim
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              onClick={() => setScrollValue(-200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-green-400 hover:bg-green-500 flex items-center justify-center transition-all ease-in-out duration-100 hover:shadow-lg cursor-pointer"
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              onClick={() => setScrollValue(200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-green-400 hover:bg-green-500 flex items-center justify-center transition-all ease-in-out duration-100 hover:shadow-lg cursor-pointer"
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>

        <Carousel
          scrollValue={scrollValue}
          flag={true}
          data={foods?.filter((item) => item.category === 'icecreams')}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
