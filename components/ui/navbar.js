import { Fragment, useState, useEffect } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { ethers } from 'ethers';
import {
  Bars3Icon,
  CodeBracketSquareIcon,
  XMarkIcon,
  HeartIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import DarkModeToggle from './dark-mode-toggle';
import WalletModal from './wallet-modal';

const products = [
  {
    name: 'Contribute',
    description: 'Find bounties and contribute to projects',
    href: '/bounties',
    icon: TrophyIcon,
  },
  {
    name: 'Sponsor Projects',
    description: 'Support contributors by funding projects',
    href: '/projects',
    icon: HeartIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [connectedAccount, setConnectedAccount] = useState('');

  useEffect(() => {
    const loadConnectedAccount = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setConnectedAccount(accounts[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    // event listener for MetaMask account change
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', function (accounts) {
        setConnectedAccount(accounts[0]);
      });

      // event listener for MetaMask disconnect
      window.ethereum.on('disconnect', function (error) {
        setConnectedAccount(null);
      });
    }

    loadConnectedAccount();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setConnectedAccount(accounts[0]);
      } else {
        // Handle the case where MetaMask is not installed or not available
        console.log('MetaMask is not available');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Close the mobile menu when a link is clicked
  };
  return (
    <header className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-[#333] z-50">
      <nav
        className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <h1 className="flex items-center text-xl font-bold leading-7 text-black dark:text-white">
              <CodeBracketSquareIcon
                className="w-6 h-6 mr-1"
                aria-hidden="true"
              />
              GitCode-v2
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center text-sm font-semibold leading-6 text-black gap-x-1 dark:text-white">
              Projects
              <ChevronDownIcon
                className="flex-none w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-black border dark:border-[#333] shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-[#111] transition duration-150"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-[#111] group-hover:bg-white dark:group-hover:bg-[#333]">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:text-[#999] group-hover:text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-[#999]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/create"
            className="text-sm font-semibold leading-6 text-black dark:text-white"
          >
            Create
          </Link>

          <Link
            href="/claim"
            className="text-sm font-semibold leading-6 text-black dark:text-white"
          >
            Claim
          </Link>
        </Popover.Group>
        <div className="hidden mr-4 lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#333] hover:bg-gray-200 dark:hover:bg-[#333] transition duration-200"
          >
            {connectedAccount ? (
              <span>
                {connectedAccount.slice(0, 5)}...{connectedAccount.slice(-4)}
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
          <WalletModal
            open={open}
            setOpen={setOpen}
            connectWallet={connectWallet}
            connectedAccount={connectedAccount}
            setConnectedAccount={setConnectedAccount}
          />
        </div>

        <div className="hidden mr-4 lg:block">
          <DarkModeToggle />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white dark:bg-black sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">GitCode-v2</span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only dark:text-white">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Link
                  href="/bounties"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-black rounded-lg dark:text-white hover:bg-gray-50 dark:hover:text-gray-800"
                >
                  Contribute
                </Link>
                <Link
                  href="/projects"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-black rounded-lg dark:text-white hover:bg-gray-50 dark:hover:text-gray-800"
                >
                  Sponsor Projects
                </Link>
                <Link
                  href="/create"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-black rounded-lg dark:text-white hover:bg-gray-50 dark:hover:text-gray-800"
                >
                  Create a bounty
                </Link>
                <Link
                  href="/claim"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-black rounded-lg dark:text-white hover:bg-gray-50 dark:hover:text-gray-800"
                >
                  Claim bounties
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <DarkModeToggle />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
