import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UserCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Loader from '@/components/ui/loader';
import { useParams } from 'next/navigation';

export default function BountyDetails() {
  const router = useRouter();
  const { username, repo, issueId } = router.query;
  const [bountyData, setBountyData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from GitHub API
  useEffect(() => {
    // Check if required parameters are available
    if (username && repo && issueId) {
      // Fetch data from GitHub API
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${username}/${repo}/issues/${issueId}`
          );

          if (response.ok) {
            const data = await response.json();
            setBountyData(data);
          } else {
            // Try fetching from the alternate endpoint
            const alternateResponse = await fetch();
            //`https://api.github.com/repos/${username}/${repo}`

            if (alternateResponse.ok) {
              const alternateData = await alternateResponse.json();
              setBountyData(alternateData);
            } else {
              setError(true);
            }
          }
        } catch (error) {
          console.error('Error fetching bounty details:', error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [username, repo, issueId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-10 text-center">Bounty not found.</div>;
  }

  if (!bountyData) {
    return <Loader />;
  }

  // Format date in a desired format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex items-center justify-center p-8 px-4">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-[#111] rounded-lg shadow-lg">
        <div className="flex flex-row items-center justify-between mb-4">
          {bountyData.labels && bountyData.labels.length > 0 && (
            <div>
              {bountyData.labels.map((label) => (
                <span
                  key={label.id}
                  className="px-3 py-1 mx-2 mt-4 text-sm text-gray-800 bg-gray-200 rounded-full"
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-row items-center justify-center">
            <div
              className={`w-4 h-4 mr-2 rounded-full ${
                bountyData.state === 'open' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {' '}
            </div>
            <span
              className={`text-lg font-semibold ${
                bountyData.state === 'open' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {bountyData.state === 'open' ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src={bountyData.user?.avatar_url || bountyData.owner?.avatar_url}
            alt={bountyData.user?.login || bountyData.owner?.login}
            className="w-16 h-16 mb-4 rounded-full"
          />

          <p className="text-xl text-gray-600">
            {bountyData.user?.login || bountyData.owner?.login}
          </p>
        </div>

        {/* Bounty title */}
        <h1 className="mb-4 text-3xl font-bold text-center text-black dark:text-white">
          {bountyData.title}
        </h1>
        {/* Bounty description */}
        <p className="mb-6 text-justify text-black dark:text-white">
          {bountyData.body}
        </p>

        {/* Bounty amount */}

        <div className="flex items-center justify-center mb-4">
          <CurrencyDollarIcon className="w-6 h-6 mr-2 text-green-500 dark:[#333]" />
          <p className="text-xl font-bold">
            Prize: {bountyData.bountyAmount}1 MATIC
          </p>
        </div>

        {/* Bounty timestamps */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-[#999]">Published:</p>
            <p className="text-md text-gray-500 dark:text-[#999]">
              {formatDate(bountyData.created_at)}
            </p>
          </div>
          {bountyData.state === 'closed' && (
            <div>
              <p className="text-sm text-red-500">Closed:</p>
              <p className="text-red-600 text-md">
                {formatDate(bountyData.closed_at)}
              </p>
            </div>
          )}
        </div>

        {/* Apply Bounty button */}
        <div>
          <button
            className={`flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              bountyData.state === 'closed'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600'
            }`}
            disabled={bountyData.state === 'closed'}
            onClick={() => router.push('/apply')}
          >
            {isLoading ? (
              <motion.div className="flex items-center">
                <Loader size={5} color="white" />
                <p className="ml-2">Processing</p>
              </motion.div>
            ) : (
              <>Apply Bounty</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
