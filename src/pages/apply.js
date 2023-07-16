import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Project from '../../contracts/Project.json';

import Notification from '@/components/ui/notification';

export default function ApplyBounty() {
  const [ethereumEnabled, setEthereumEnabled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [contributors, setContributors] = useState({});
  const [formInput, setFormInput] = useState({
    githubUsername: '',
  });

  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.ethereum) {
        setEthereumEnabled(true);
      } else {
        console.log('Ethereum is not available');
      }
    }
  }, []);

  useEffect(() => {
    if (ethereumEnabled) {
      connectWallet();
    } else {
      console.log('Ethereum is not enabled');
    }
  }, [ethereumEnabled]);

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        setWalletConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0x71bbBa2b29223A3bcF4698C360f24950dbA527b6';
        const contractABI = Project.abi;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // Retrieve the initial contributor status for the connected wallet address
        const isConnectedUserContributor = await contract.contributors(
          accounts[0]
        );

        setContributors({ [accounts[0]]: isConnectedUserContributor });
        setContract(contract);
      }
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  async function applyBounty(e) {
    e.preventDefault();

    if (!walletConnected) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
        setShow(true);
        setNotificationText('Wallet not connected');
        setNotificationDescription('Connect your wallet');
        return;
      }
    }

    try {
      setLoading(true);

      // Get the selected user's address
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const userAddress = accounts[0];

      // Check if the user has already applied to the bounty
      if (contributors[userAddress]) {
        setShow(true);
        setNotificationText('Bounty application failed');
        setNotificationDescription('You have already applied to this bounty');
        return;
      }

      // Check if wallet address is provided
      if (userAddress === ethers.constants.AddressZero) {
        throw new Error('Wallet address is required');
      }

      const tx = await contract.applyBounty(
        formInput.githubUsername,
        userAddress,
        { from: userAddress }
      );

      await tx.wait();

      // Update the contributors mapping
      setContributors((prevContributors) => ({
        ...prevContributors,
        [userAddress]: true,
      }));

      setShow(true);
      setNotificationText('Bounty applied successfully');
      setNotificationDescription(
        'You have been added to the bounty contributors list'
      );

      // Reset form inputs
      setFormInput({
        githubUsername: '',
      });
    } catch (error) {
      console.error(error);
      setShow(true);
      setNotificationText('Bounty application failed');
      setNotificationDescription(
        'An error occurred while applying to the bounty.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <Notification
        show={show}
        setShow={setShow}
        notificationText={notificationText}
        notificationDescription={notificationDescription}
      />
      <div className="w-full max-w-2xl px-4 py-16 mx-auto sm:px-6 lg:max-w-2xl xl:max-w-3xl lg:px-8 xl:px-10">
        <div className="p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg dark:bg-black">
          <h2 className="flex justify-center p-4 text-xl font-medium">
            Create a bounty
          </h2>
          <div className="grid grid-cols-1 p-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="githubUsername"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Enter your github username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formInput.githubUsername}
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      githubUsername: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border-gray-300 dark:bg-black dark:border-[#333] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                disabled={loading}
                onClick={applyBounty}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesing...
                  </>
                ) : (
                  <>Apply Bounty</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
