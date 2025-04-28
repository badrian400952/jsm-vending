"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Headers() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storage, setStorage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/user/login");
    } else {
      setStorage(username);
    }
  }, [router]);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">JSM</span>
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Vending JSM
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {storage === "admin" && (
            <Link
              href="/produk/tambah-produk"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Tambah Produk
            </Link>
          )}
          <Link
            href="/history"
            className="text-sm/6 font-semibold text-gray-900"
          >
            History
          </Link>

          <span
            className="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer"
            onClick={() => {
              localStorage.removeItem("username");
              router.push("/user/login");
            }}
          >
            <IoIosLogOut size={20} />
          </span>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Link href={"/"}>
                <span className="font-bold">Vending JSM</span>
              </Link>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col">
                {storage === "admin" && (
                  <Link
                    href="/produk/tambah-produk"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Tambah Produk
                  </Link>
                )}
                <Link
                  href="/history"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  History
                </Link>
              </div>
              <div className="py-6">
                <p
                  onClick={() => {
                    localStorage.removeItem("username");
                    router.push("/user/login");
                  }}
                  className="hover:cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
