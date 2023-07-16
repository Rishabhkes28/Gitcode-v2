import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  HeartIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import SlugSkeleton from '@/components/ui/bounties-skeleton';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const projects = [
  {
    id: 1,
    name: 'wagmi-dev/wagmi',
    image: 'projects/wagmi.svg',
    description: 'React Hooks for Ethereum',
    stars: '4.5k',
    githubLink: 'https://github.com/wagmi-dev/wagmi',
  },
  {
    id: 2,
    name: 'lensterxyz/lenster',
    image: 'projects/lenster.svg',
    description:
      'Lenster is a decentralized and permissionless social media app built with Lens Protocol 🌿',
    stars: '20.4k',
    githubLink: 'https://github.com/lensterxyz/lenster',
  },
  {
    id: 3,
    name: 'ethers-io/ethers.js',
    image: 'projects/ethers.png',
    description:
      'Complete Ethereum library and wallet implementation in JavaScript.',
    stars: '6.7k',
    githubLink: 'https://github.com/ethers-io/ethers.js',
  },
  {
    id: 4,
    name: 'shadcn/ui',
    image: '/projects/shadcn.png',
    description:
      'Beautifully designed components built with Radix UI and Tailwind CSS.',
    stars: '19k',
    githubLink: 'https://github.com/shadcn/ui',
  },
];

export default function Projects() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    setTimeout(() => {
      setLoadingState('loaded');
    }, 1000); // Delay of 1 seconds
  }, []);

  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 dark:border-[#333] bg-gray-200 dark:bg-[#111] shadow-sm">
              <div className="flex justify-between flex-1 px-4 sm:px-6">
                <div className="flex flex-1">
                  <div className="flex w-full md:ml-0">
                    <div className="relative w-full focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon
                          className="flex-shrink-0 w-5 h-5 ml-2"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        name="mobile-search-field"
                        id="mobile-search-field"
                        className="w-full h-full py-2 pl-8 pr-3 text-base text-gray-900 border-0 rounded-lg focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:hidden"
                        placeholder="Search"
                        type="search"
                      />
                      <input
                        name="desktop-search-field"
                        id="desktop-search-field"
                        className="hidden h-full w-full border-0 py-2 pl-8 pr-3 text-sm bg-gray-200 dark:bg-[#111] focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:block"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => {
                          e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="flex items-stretch flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold">
                    Sponsor Projects
                  </h1>
                </div>
                <section className="pb-16 mt-8">
                  <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
                  >
                    {loadingState === 'loaded' ? (
                      projects.map((project) => (
                        <motion.li
                          onClick={() => {}}
                          key={project.id}
                          className="relative rounded-lg shadow-md overflow-hidden bg-white dark:bg-[#333] cursor-pointer hover:shadow-lg transition-all duration-300 border-green-500 border-2"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="relative h-40">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="object-contain w-full h-full p-8 bg-[#333] dark:bg-black"
                            />
                            <button
                              type="button"
                              className="absolute inset-0 focus:outline-none"
                            ></button>
                          </div>

                          <div className="flex flex-col justify-between p-4">
                            <div>
                              <p className="font-medium text-gray-900 ext-base dark:text-white">
                                {project.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-[#999]">
                                {project.description}
                              </p>
                              <div className="flex items-center mt-2">
                                <div className="flex-shrink-0">
                                  <StarIcon
                                    className="w-6 h-6 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-500 dark:text-[#999]">
                                    {project.stars} stars
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <a
                                href={project.githubLink}
                                className="flex items-center space-x-2 text-sm text-gray-500 dark:text-white hover:underline"
                              >
                                <img
                                  src="github.png"
                                  className="w-5 h-5 text-gray-400 dark:text-white"
                                  alt="GitHub"
                                />
                                <span>Github</span>
                              </a>
                              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <HeartIcon
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                                <span>Sponsor</span>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))
                    ) : (
                      <SlugSkeleton />
                    )}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 dark:border-[#333] bg-white dark:bg-black p-8 lg:block">
              <h1 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                How It Works
              </h1>
              <ul className="space-y-4">
                <li className="text-sm text-gray-500">
                  Sponsor Projects: Add projects to your sponsor list.
                </li>
                <li className="text-sm text-gray-500">
                  Connect Your Wallet: Link your wallet for seamless
                  transactions.
                </li>
                <li className="text-sm text-gray-500">
                  Send Sponsor Amount: Easily send your desired sponsorship.
                </li>
                <li className="text-sm text-gray-500">
                  Commit Evaluation & Weight Distribution: Contributions
                  evaluated and weighted.
                </li>
                <li className="text-sm text-gray-500">
                  Fair Payouts: Funds distributed among contributors equitably.
                </li>
                <li className="text-sm text-gray-500">
                  Payout Process: Monthly payouts over three months.
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
