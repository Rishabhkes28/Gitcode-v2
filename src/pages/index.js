import React from 'react';
import HeaderSection from '@/components/header-section';
import ContentSection from '@/components/content-section';
import Link from 'next/link';
import ContactMe from '@/components/contact-me';
import Footer from '@/components/footer';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function Index() {
  return (
    <div className="items-center">
      <div className="fixed inset-x-0 bottom-0 z-10">
        <div className="items-center"></div>
      </div>
      <div className="relative h-screen ">
        <div className="h-screen" />
        <div className="sticky z-20">
          <HeaderSection />
        </div>

        <div className="sticky z-20">
          <ContentSection />
        </div>

        <div className="sticky z-20">
          <ContactMe />
        </div>

        <div className="sticky z-20">
          <Footer />
        </div>

        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
          <div>
            <h1 className="text-5xl text-center">Welcome to GitCode-v2</h1>
          </div>
          <div className="flex mt-4 space-x-2">
            <Link
              href="/projects"
              className="rounded-md bg-green-600 hover:bg-green-600/80 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <div className="flex flex-row items-center">
                <HeartIcon className="w-4 h-4 mr-2" />
                Sponsor
              </div>
            </Link>
            <Link
              href="/bounties"
              className="rounded-md bg-[#fafafa] dark:bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-black dark:text-white shadow-sm hover:bg-white/80 dark:hover:bg-white/20"
            >
              Contribute
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
