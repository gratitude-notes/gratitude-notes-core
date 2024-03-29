import { BsFillEmojiSmileFill } from "react-icons/bs";
import Navbar from "../components/Navbar/Navbar";
import PeopleOnPhone from "../assets/TwoPeoplePhone.png";
import { SocialIcon } from 'react-social-icons';
import mobile_dash from '../assets/mobile_dash.png';
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { fb_auth } from "../lib/Firebase";

const Landing: React.FC = () => {

  const handleGetStartedClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    
    await signInWithPopup(fb_auth, provider);
}


  return (
    <div className="select-none">
      <div className="relative overflow-hidden bg-white z-0 dark:bg-gray-800">
        <Navbar updateViewState={() => {}}/>

        {/* Main Content */}
        <div className="max-w-3xl flex flex-col gap-20 px-8 pb-8 pt-20 m-auto">

          {/* Hero Section */}
          <section className="flex flex-col gap-4">
            <div>
              <h1 className="text-6xl dark:text-white text-center">Stay in touch with your own <span className="text-cyan-500 font-bold">happiness.</span></h1>
            </div>
            <div>
              <h1 className="text-xl text-center text-gray-400">Find out what makes you happy.</h1>
            </div>
            <div className="p-4 text-center">
            <button onClick={handleGetStartedClick} className="transition ease-in-out
                               bg-cyan-500 hover:-translate-y-1 hover:scale-110 duration-300
                               text-white font-bold py-2 px-4 rounded">
                Get Started
            </button>
            </div>

            {/* Phone mockup */}
            <div className="relative flex justify-center m-auto h-[550px] w-[265px] rounded-[45px]">
              <div className="-z-10 opacity-75 absolute h-[540px] w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500">

              </div>
              <div className="">
                <img className="rounded-[45px]" src={mobile_dash} alt="mobile dashboard..."/>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl dark:text-white">Say what's on your mind</h1>
              <h1 className="text-xl text-gray-400">It's time to go digital.</h1>
              <div>
              <button onClick={handleGetStartedClick} className="transition ease-in-out
                               bg-cyan-500 hover:-translate-y-1 hover:scale-110 duration-300
                               text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
              </div>
            </div>
          </section>

          {/* Some features */}
          <section className="flex flex-col-reverse gap-4 justify-center sm:flex-row">
            <div className="bg-gradient-to-r from-cyan-500">
              <img src={PeopleOnPhone} alt="People on phone image"/>
            </div>
            <div className="flex flex-col gap-4">
              <BsFillEmojiSmileFill className="fill-cyan-500" size={25}/>
              <h1 className="text-3xl dark:text-white">Explore yourself one happiness bullet at a time</h1>
              <h1 className="text-xl text-gray-400">Communicate with your future self through your current thoughts.</h1>
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-10 justify-center sm:flex-row">
            <div className="">
              <h1 className="text-3xl dark:text-white">Your questions,<br />answered</h1>
            </div>
            <div className="flex flex-col gap-2">
              {/* FAQ 1 */}
              <details className="border-b-2 duration-300 dark:text-white">
                <summary className="text-xl cursor-pointer">Is this the right app for you?</summary>
                <div className="py-6 border-gray-400 text-sm ">
                  <p>If you're looking for a secure and convenient digital platform to track your thoughts and reflections, access prompts and inspiration, and customize your entries in different formats, our journaling app may be a good fit for you. By investing time and effort into consistent journaling, you can gain insights into your thoughts and emotions. Try it out and see if it works for you!</p>
                </div>
              </details>
              {/* FAQ 2 */}
              <details className="border-b-2 duration-300 dark:text-white">
                <summary className="text-xl cursor-pointer ">Do I have to write everyday?</summary>
                <div className="py-6 border-gray-400 text-sm ">
                  <p>No. You can write however much and whenever you want.</p>
                </div>
              </details>
              {/* FAQ 3 */}
              <details className="border-b-2 duration-300 dark:text-white">
                <summary className="text-xl cursor-pointer">What is the ideal way to interact with the app?</summary>
                <div className="py-6 border-gray-400 text-sm">
                  <p>What is your ideal way to interact with DOSE.?</p>
                </div>
              </details>
              {/* FAQ 4 */}
              <details className="border-b-2 duration-300 dark:text-white">
                <summary className="text-xl cursor-pointer">Is it free?</summary>
                <div className="py-6 border-gray-400 text-sm">
                  <p>Yes!</p>
                </div>
              </details>
              {/* FAQ 5 */}
              <details className="border-b-2 duration-300 dark:text-white">
                <summary className="text-xl cursor-pointer">Why did we build this?</summary>
                <div className="py-6 border-gray-400 text-sm">
                  <p>To provide a clean, minimal journaling platform that is available across all devices.</p>
                </div>
              </details>
            </div>
          </section>

          {/* Testimonials */}

          {/* Meet the team */}

        </div>

        <hr className="w-full h-px border border-gray-200 rounded"/>

        {/* Footer */}
        <section className="flex flex-col gap-4 p-8">
          <div className="flex gap-2 justify-center dark:text-white">
            <h1 className="hover:underline">© 2023 Gratitude Notes, Inc.</h1>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 justify-center">
            <SocialIcon url="https://twitter.com" style={{ height: 25, width: 25 }} bgColor="#06b6d4"/>
            <SocialIcon url="https://instagram.com" style={{ height: 25, width: 25 }} bgColor="#06b6d4"/>
            <SocialIcon url="https://github.com" style={{ height: 25, width: 25 }} bgColor="#06b6d4"/>
            <SocialIcon url="https://discord.com" style={{ height: 25, width: 25 }} bgColor="#06b6d4"/>
            <SocialIcon url="https://linkedin.com" style={{ height: 25, width: 25 }} bgColor="#06b6d4"/>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Landing;