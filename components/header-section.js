import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CubeIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const cards = [
  {
    name: (
      <div className="flex items-center">
        Decentralized Donation & Bounty Platform
        <CurrencyDollarIcon className="w-5 h-5 ml-1" />
      </div>
    ),
    description:
      "Revolutionize the funding and sustainability of open-source software projects. Our platform, built on Internet Computer Protocol Blockchain with off-chain computation using Chainlink Functions, enables sponsors to seamlessly support their favorite projects through monthly donations. Enjoy transparent transactions, fair distribution of funds, and automated payout mechanisms, reshaping the landscape of open-source collaboration.",
  },
  {
    name: (
      <div className="flex items-center">
        Intelligent Commit Evaluation
        <CubeIcon className="w-5 h-5 ml-1" />
      </div>
    ),
    description:
      "Drive fair rewards and recognition for developers' contributions. Our analysis engine, powered by advanced technologies like OpenAI GPT enabled by Chainlink Functions, accurately assesses the impact and quality of code contributions. Ensure that funds are distributed based on the value added by each contributor, creating a vibrant open-source community that incentivizes and values developers' work.",
  },
  {
    name: (
      <div className="flex items-center">
        Fair Distribution through Dynamic Payouts
        <ShieldCheckIcon className="w-5 h-5 ml-1" />
      </div>
    ),
    description:
      "GitCode-v2 ensures equitable fund distribution by dynamically allocating the daily project balance among contributors. Using our commit evaluation engine, contributions are evaluated for impact and quality, determining each contributor's weight. This innovative approach guarantees fair distribution of funds based on their valuable contributions.",
  },
];
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
};

export default function HeaderSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div className="relative isolate overflow-hidden bg-[#eaeaea] dark:bg-[#111] dark:border-[#333] bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md dark:backdrop-blur-md py-24 sm:py-32 z-10">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 gap-6 mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex gap-x-4 rounded-xl  bg-[#fafafa] dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-6 ring-1 ring-inset ring-white/10 dark:ring-black/10"
              ref={ref}
            >
              <AnimatePresence>
                <motion.div
                  className="text-base leading-7"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {inView ? (
                    <>
                      <h3 className="font-semibold text-black dark:text-white">
                        {card.name}
                      </h3>
                      <p className="mt-4 text-sm text-black justify-normal dark:text-white">
                        {card.description}
                      </p>
                    </>
                  ) : (
                    <div className="animate-pulse">
                      <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
                      <div className="w-5/6 h-4 mt-2 bg-gray-400 rounded"></div>
                      <div className="w-3/4 h-4 mt-2 bg-gray-400 rounded"></div>
                      <div className="w-5/6 h-4 mt-2 bg-gray-400 rounded"></div>
                      <div className="w-3/4 h-4 mt-2 bg-gray-400 rounded"></div>
                      <div className="w-5/6 h-4 mt-2 bg-gray-400 rounded"></div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
