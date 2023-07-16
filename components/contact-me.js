export default function ContactMe() {
  return (
    <div className="bg-[#eaeaea] dark:bg-[#111] py-24 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight ">
                Stay Updated with GitCode-v2!
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-[#999]">
                Stay connected and receive the latest updates about
                GitCode-v2&apos;s development and new features.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">Email</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-green-600"
                        href="mailto:rishabhkeshari10@gmail.com"
                      >
                        rishabhkeshari10@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">Twitter</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dd>
                      <a
                        className="font-semibold text-green-600"
                        href="https://twitter.com/RishabhKes22527"
                        target="_blank"
                        rel="noreferrer"
                      >
                        @RishabhKes22527
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">GitHub</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dd>
                      <a
                        className="font-semibold text-green-600"
                        href="https://github.com/Rishabhkes28"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Rishabhkes28
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">LinkedIn</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dd>
                      <a
                        className="font-semibold text-green-600"
                        href="https://www.linkedin.com/in/rishabh-keshari-4209431b9/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Rishabh Keshari 
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
