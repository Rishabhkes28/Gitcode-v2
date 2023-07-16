import { useTheme } from 'next-themes';

export default function ContentSection() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="relative isolate overflow-hidden bg-[#eaeaea] dark:bg-[#111]  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-green-600">
                GitCode-v2
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Get Paid for your Git contributions!
              </h1>
              <p className="mt-6 text-xl leading-8 ">
                Revolutionizing Open-Source Rewards with Automated Verification
                using Chainlink Functions
              </p>
            </div>
          </div>
        </div>
        <div className="p-12 -mt-12 -ml-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {/* if theme is light mode show this */}
          {theme === 'light' ? (
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              // src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              src="/lightmode.png"
              alt=""
            />
          ) : (
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              // src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              src="/darkmode.png"
              alt=""
            />
          )}
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 lg:max-w-lg">
              <p>
                Welcome to GitCode-v2, where your Git contributions are truly
                valued and rewarded. We aim to revolutionize the way open-source
                contributors earn recognition and compensation for their
                valuable work. Say goodbye to manual processes and delayed
                payments. With GitCode-v2, you can effortlessly earn what you
                deserve. Our seamless integration with GitHub and automated
                payment system, code verification and commit evaluation using
                Chainlink Functions, ensures that you get paid for your valuable
                contributions without any hassle.
              </p>
              <ul role="list" className="mt-8 space-y-8 ">
                <li className="flex gap-x-3">
                  <div
                    className="flex-none w-5 h-5 mt-1 text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">
                      For Contributors:
                    </strong>{' '}
                    Earn rewards and recognition for your open-source
                    contributions. Join a thriving community of developers and
                    showcase your skills.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div
                    className="flex-none w-5 h-5 mt-1 text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">For Maintainers:</strong>{' '}
                    Incentivize contributions and attract talented developers to
                    your projects. Streamline the management of open-source
                    bounties with automated payments.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div
                    className="flex-none w-5 h-5 mt-1 text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">
                      For the Open-Source Community:
                    </strong>{' '}
                    Foster collaboration and innovation by sponsoring projects
                    using our commit evaluation engine. Empower developers to
                    make a meaningful impact in the open-source ecosystem.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
