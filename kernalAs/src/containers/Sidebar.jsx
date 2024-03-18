import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

import DrawerIcon from "../../public/icons/drawer.svg";
import SettingsIcon from "../../public/icons/settings.svg";
import BotIcon from "../../public/icons/bot.svg";
import DropdownIcon from "../../public/icons/dropdown.svg";
import TwitterIcon from "../../public/icons/twitter.svg";
import GithubIcon from "../../public/icons/github.svg";
import LinkedinIcon from "../../public/icons/linkedin.svg";
import Logo from "../images/logo.png"
import { useWorkspaces } from "../hooks/getWorkspaces";

export default function Sidebar() {
  const bots = useWorkspaces()

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown-toggle");
    dropdown.classList.toggle("hidden");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {/* <DrawerIcon className="w-6 h-6" /> */}
        <img className="w-6 h-6" src={DrawerIcon} alt="Your SVG" />
      </button>

      {/* Sidebar */}
      <div
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-900">
          <div className="pb-10">
            <Link to="/dash" className="flex items-center justify-evenly  mb-5">
              <img
                src={Logo}
                alt="Kernal As"
                className="block h-auto w-12"
              />
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                Kernal As
              </span>
            </Link>
            <ul className="space-y-2 font-medium text-lg">
              {/* Settings */}
              {/* <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 group"
                >

                  <img className="w-6 h-6 text-gray-600 transition duration-75 group-hover:text-gray-900" src={SettingsIcon} alt="Your SVG" />
                  <span className="ml-3">Settings</span>
                </Link>
              </li> */}

              {/* Bots */}
              {bots.length !== 0 && (
                <li>
                  <div className="hover:text-gray-900">
                    <button
                      type="button"
                      className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group hover:bg-gray-200 "
                      onClick={toggleDropdown}
                    >
                      {/* <BotIcon className="w-6 h-6 text-gray-600 transition duration-75 group-hover:text-gray-900" /> */}
                      <img className="w-6 h-6 text-gray-600 transition duration-75 group-hover:text-gray-900" src={BotIcon} alt="Your SVG" />
                      <p className="flex-1 ml-3 text-left whitespace-nowrap text-white hover:text-gray-900">
                        Workspaces
                      </p>
                      {/* <DropdownIcon className="w-3 h-3" /> */}
                      <img className="w-3 h-3" src={DropdownIcon} alt="Your SVG" />
                    </button>
                  </div>

                  <ul
                    id="dropdown-toggle"
                    className="hidden text-sm py-2 space-y-2"
                  >
                    {bots.map((bot, index) => (
                      <React.Fragment key={index}>
                        <li>
                          <Link
                            to={`/chat/${bot.id}`}
                            className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 hover:text-gray-900"
                          >
                            {bot.data.name}
                          </Link>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
