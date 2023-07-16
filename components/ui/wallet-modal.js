import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import Notification from "./notification";

export default function WalletModal({
  open,
  setOpen,
  connectWallet,
  connectedAccount,
  setConnectedAccount,
}) {
  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");
  return (
    <>
      <Notification
        show={show}
        setShow={setShow}
        notificationText={notificationText}
        notificationDescription={notificationDescription}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-[#333]  dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl dark:bg-black sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full ">
                      <LinkIcon
                        className="w-6 h-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-black dark:text-white"
                      >
                        Connect Wallet
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-[#eaeaea]">
                          Please connect your wallet to Bitfinity (ICP) testnet.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 space-y-4 sm:mt-6">
                    {connectedAccount ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md shadow-sm cursor-not-allowed hover:bg-purple-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Connected to&nbsp;
                        {connectedAccount.slice(0, 5) +
                          "..." +
                          connectedAccount.slice(-4)}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={connectWallet}
                      >
                        Connect to ICP Testnet
                      </button>
                    )}

                    {connectedAccount && (
                      <button
                        type="button"
                        onClick={() => {
                          setConnectedAccount(null);
                          setShow(true);
                          setNotificationText("Disconnected!");
                          setNotificationDescription("");
                        }}
                        className="inline-flex w-full justify-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#333] hover:bg-gray-200 dark:hover:bg-[#333] transition duration-200"
                      >
                        Disconnect Wallet
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
