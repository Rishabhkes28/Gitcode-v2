"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  UserCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

import {
  Bars4Icon,
  MagnifyingGlassIcon,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";

import BountiesSkeleton from "@/components/ui/bounties-skeleton";

import { ethers } from "ethers";
import Project from "../../contracts/Project.json";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Bounties() {
  const [bounties, setBounties] = useState([]);
  const router = useRouter();
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    async function fetchData() {
      const rpcUrl = process.env.RPC_URL;
      const privateKey = process.env.PRIVATE_KEY;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const signer = new ethers.Wallet(privateKey, provider);
      const contractAddress = "0x71bbBa2b29223A3bcF4698C360f24950dbA527b6"; // Address of the deployed contract
      const contract = new ethers.Contract(
        contractAddress,
        Project.abi,
        signer
      );

      const bountiesCount = await contract.getBountiesCount();

      const fetchedBounties = [];
      for (let i = 0; i < bountiesCount; i++) {
        const bounty = await contract.bounties(i);
        fetchedBounties.push(bounty);
        console.log(bounty);
      }

      setBounties(fetchedBounties);
    }

    fetchData();
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
            <main className="flex-1 h-full overflow-y-auto">
              <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold">Bounties</h1>
                </div>

                <section className="pb-16 mt-8">
                  <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
                  >
                    {bounties.length > 0 ? (
                      bounties.map((bounty, index) => {
                        if (bounty) {
                          return (
                            <motion.li
                              onClick={() =>
                                router.push(
                                  `bounty/${bounty.username}/${bounty.repo}/${bounty.issueId}`
                                )
                              }
                              key={index}
                              className="relative rounded-lg shadow-md overflow-hidden bg-white dark:bg-[#333] cursor-pointer hover:shadow-lg transition-all duration-300 border-green-500 border-2"
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              <div className="absolute top-6 right-4">
                                {bounty.complete ? (
                                  <div className="flex items-center">
                                    <XCircleIcon
                                      className="w-4 h-4 mr-1 text-red-500"
                                      aria-hidden="true"
                                    />
                                    <p className="text-xs text-red-500">Open</p>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <CheckCircleIcon
                                      className="w-4 h-4 mr-1 text-green-500"
                                      aria-hidden="true"
                                    />
                                    <p className="text-xs text-green-500">
                                      Open
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col justify-between h-40 p-6">
                                <div className="flex flex-col">
                                  <h1 className="text-sm font-semibold text-black dark:text-gray-300">
                                    {bounty.repo}
                                  </h1>
                                  <div className="flex items-center mt-2">
                                    <div className="flex items-center">
                                      <CurrencyDollarIcon className="w-6 h-6 mr-2 text-green-500" />
                                      <div className="text-3xl font-bold text-black dark:text-white">
                                        {parseInt(bounty.bountyAmount._hex)}
                                      </div>
                                    </div>
                                    <div className="ml-1 text-3xl text-black dark:text-white">
                                      MATIC
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center mt-4">
                                  <div className="flex-shrink-0">
                                    <UserCircleIcon
                                      className="w-6 h-6 text-gray-400 dark:text-white"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500 dark:text-[#999]">
                                      Issue ID: #{parseInt(bounty.issueId._hex)}
                                    </p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-[#999]">
                                      Github:{" "}
                                      <a
                                        href={`https://github.com/${
                                          bounty.username
                                        }/${bounty.repo}/issues/${parseInt(
                                          bounty.issueId._hex
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                      >
                                        {bounty.username}/{bounty.repo}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="overflow-hidden text-base font-medium text-gray-900 dark:text-white overflow-ellipsis whitespace-nowrap">
                                  {bounty.description}
                                </p>
                              </div>
                            </motion.li>
                          );
                        }
                      })
                    ) : (
                      <BountiesSkeleton />
                    )}
                  </ul>
                </section>
              </div>
            </main>

            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 dark:border-[#333] bg-white dark:bg-black p-8 lg:block">
              <div className="pb-16 space-y-6">
                <div>
                  <div className="block w-full overflow-hidden rounded-lg aspect-h-7 aspect-w-10">
                    {bounties ? (
                      <h1 className="text-lg font-bold">
                        Click on a bounty to view details
                      </h1>
                    ) : (
                      <h1>Loading...</h1>
                    )}
                  </div>
                  <div className="flex items-start justify-between mt-4">
                    <div>
                      {bounties && (
                        <h2 className="text-lg font-medium">
                          <span className="sr-only">Details for </span>
                        </h2>
                      )}

                      <p className="text-sm font-medium"></p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
