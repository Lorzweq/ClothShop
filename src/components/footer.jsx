import React from 'react';
import apple from '../assets/apple.png';
import playstore from '../assets/playstore.svg';

const Footer = () => {
    return (
      <footer className="bg-black text-white  py-12 w-full flex flex-col items-center">
        <ul className="flex flex-col md:flex-row justify-around font-semibold space-y-2 md:space-y-0 md:space-x-4 mb-8 text-center">
          <li><a href="#" className="text-white hover:underline">Company Information</a></li>
          <li><a href="#" className="text-white hover:underline">General Terms and Conditions</a></li>
          <li><a href="#" className="text-white hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="text-white hover:underline">Tech Blog</a></li>
          <li><a href="#" className="text-white hover:underline">Cookie Settings</a></li>
          <li><a href="#" className="text-white hover:underline">Community Guidelines</a></li>
        </ul>
  
        <h2 className="font-bold text-center mb-4">Zalando apps:</h2>
  
        {/* Container for app logos */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="mt-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <img 
                src={apple}  // Use the imported image here
                alt="Download on the App Store" 
                className="w-36 h-auto" 
              />
            </a>
          </div>
  
          <div className="mt-4">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <img 
                src={playstore}  // Use the imported image here
                alt="Get it on Google Play" 
                className="w-36 h-auto" 
              />
            </a>
          </div>
        </div>
  
        {/* Social media buttons */}
        <div className="flex flex-col md:flex-row justify-center px-4 mb-4 mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="button"
            className="inline-block bg-white px-6 py-2.5 text-xs font-medium uppercase leading-normal text-black shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="inline-block bg-white px-6 py-2.5 text-xs font-medium uppercase leading-normal text-black shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="inline-block bg-white px-6 py-2.5 text-xs font-medium uppercase leading-normal text-black shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512">
                <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
              </svg>
            </span>
          </button>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  