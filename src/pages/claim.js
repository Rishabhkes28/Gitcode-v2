import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Project from '../../contracts/Project.json';
import Notification from '@/components/ui/notification';
import githubRequestSource from '../../libs/functions/github-request.js';
require('dotenv').config();

export default function ClaimBounty() {
  const [ethereumEnabled, setEthereumEnabled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [contributors, setContributors] = useState({});
  const [formInput, setFormInput] = useState({
    user: '',
    contributor: '',
    repo: '',
    pullNumber: '',
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

  async function claimBounty(e) {
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

      // Check if the user has already claimed the bounty
      if (!contributors[userAddress]) {
        setShow(true);
        setNotificationText('Bounty claim failed');
        setNotificationDescription('You have already claimed the bounty');
        return;
      }

      // Check if wallet address is provided
      if (userAddress === ethers.constants.AddressZero) {
        throw new Error('Wallet address is required');
      }

      const { user, contributor, repo, pullNumber } = formInput;

      // Check if all required fields are provided
      if (!user || !contributor || !repo || !pullNumber) {
        setShow(true);
        setNotificationText('Bounty claim failed');
        setNotificationDescription('Please fill in all the required fields');
        return;
      }

      const source = githubRequestSource; // Invoke the function to get the source code
      const secrets = []; // Provide the secrets here
      const args = [user, contributor, repo, pullNumber]; // Provide the arguments here

      const subscriptionId = 1199; // Convert to BigNumber
      const gasLimit = ethers.BigNumber.from(100_000); // Convert to BigNumber

      console.log('Executing claimBounty...');
      console.log('Source:', source);
      console.log('Arguments:', args);
      console.log('Subscription ID:', subscriptionId);
      console.log('Gas Limit:', gasLimit.toString());

      const tx = await contract.executeRequest(
        source,
        secrets,
        args,
        subscriptionId,
        gasLimit,
        { gasLimit: 100_000 }
      );

      console.log('Transaction sent:', tx);

      await tx.wait(1);
      const result = await tx.wait();
      const returnValue = result.events[0].args.returnValue;
      console.log('Returned value:', returnValue);

      setShow(true);
      setNotificationText('Bounty claimed successfully');
      setNotificationDescription('Your bounty has been sent to your wallet');

      // Reset form inputs
      setFormInput({
        user: '',
        contributor: '',
        repo: '',
        pullNumber: '',
      });
    } catch (error) {
      console.error(error);
      setShow(true);
      setNotificationText('Bounty claim failed');
      setNotificationDescription(
        'An error occurred while claiming the bounty.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function triggerBounty() {
    setLoading(true);

    setTimeout(() => {
      setShow(true);
      setNotificationText('Bounty Claim Submitted');
      setNotificationDescription(
        'Your bounty amount will be credited to your wallet after commit evaluation and verification.'
      );
      setLoading(false);
    }, 5000);

    // Reset form inputs
    setFormInput({
      user: '',
      contributor: '',
      repo: '',
      pullNumber: '',
    });
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
            Claim your bounty
          </h2>
          <p className="text-sm text-center text-gray-400">
            Make sure your submitted PR has been merged!
          </p>
          <div className="grid grid-cols-1 p-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Github Project ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="user"
                  id="user"
                  value={formInput.user}
                  onChange={(e) =>
                    setFormInput({ ...formInput, user: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 dark:bg-black dark:border-[#333] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="repo"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Repository name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="repo"
                  id="repo"
                  value={formInput.repo}
                  onChange={(e) =>
                    setFormInput({ ...formInput, repo: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 dark:bg-black dark:border-[#333] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="contributor"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Github username of contributor
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="contributor"
                  id="contributor"
                  value={formInput.contributor}
                  onChange={(e) =>
                    setFormInput({ ...formInput, contributor: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 dark:bg-black dark:border-[#333] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="pullNumber"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Pull Request No #
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="pullNumber"
                  id="pullNumber"
                  value={formInput.pullNumber}
                  onChange={(e) =>
                    setFormInput({ ...formInput, pullNumber: e.target.value })
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
                onClick={triggerBounty}
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
                    Processing...
                  </>
                ) : (
                  <>Claim Bounty</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
