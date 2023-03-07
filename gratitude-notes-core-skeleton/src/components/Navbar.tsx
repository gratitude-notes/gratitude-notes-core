import ThemeButton from "./ThemeButton";
import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import { fb_auth } from "../lib/Firebase";

const Navbar: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(fb_auth);
  const [signOut, loadingSO, errorSO] = useSignOut(fb_auth);

  return (
    <header>
      <nav className = "flex flex-row justify-center w-full p-2 border-black flex-nowrap h-18 border-b-1">
          <div className="flex flex-row justify-between w-full">
            
            <button className="block bg-transparent border-0 hover:no-underline hover:shadow-none focus:no-underline focus:ring-0">
              <div className="[&>svg]:w-11 fill-purple-600 dark:fill-blue-50 flex flex-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1135 916.562">
                      <path fillRule="evenodd" d="M391,140c11.346,1.794,29.98-3.166,44,0,7.255,1.638,16.786-.227,25,2,13.728,3.723,31.036,6.33,44,10l20,3c1.112,0.553,2.891,3.432,4,4,9.185,4.7,19.689,4.938,29,9,9.7,4.233,20.3,10.767,30,15l16,5c16.484,8.748,33.146,19.905,49,30,3.934,2.5,5.939,6.287,11,8,9.269-12.609,27.752-20.234,41-29,52.8-34.933,146.689-75.67,234-47,96.39,31.652,152.28,89.286,184,186a258.206,258.206,0,0,1,13,82v30c-1.81,8-.89,17.617-3,26-5.94,23.547-9.22,47.652-18,69-12.37,30.078-24.67,60.3-41,87-17.95,29.359-38.51,57.391-58,85-63.464,89.889-136.582,164.139-225,229-24.1,17.675-47.5,37.767-72,55-13.227,9.31-26.7,16.74-40,26-8.344,5.81-17.29,10.96-26,17-4.569,3.17-6.422,9.6-12,12-16.906,7.26-38.651-14.08-48-20-26.166-16.57-52.233-32.72-78-49-17.6-11.118-36.688-19.711-49-36-35-46.308-82-82.69-117-129-10.524-13.924-25.287-24.826-36-39-13.381-17.7-33.14-32.662-47-51l-11-10c-14.621-19.321-33.391-34.67-48-54l-11-10c-17.875-23.622-41.134-42.362-59-66-6.628-8.77-17.367-15.234-24-24-23.249-30.726-53.76-55.249-77-86-8.637-11.428-30.548-25.239-35-39-5.1-15.776,8.206-23.207,14-29,12.67-12.67,26.306-24.352,39-37,6.169-6.146,12.736-16.4,21-20,3.969-1.728,10.611-1.044,16-1,1.769,1.67,3.842,1.52,6,3l31,34h1v-2c4.768-7.968,2.364-21.57,5-31,5.113-18.293,9.816-37.06,17-54,25.332-59.734,67-99.788,120-132,22.71-13.8,51.348-20.427,80-28C357.511,142.015,386.505,142.82,391,140Zm-14,22c-5.568,3.324-16.38,1.383-23,3-18.818,4.595-42.441,10.933-61,19-80.438,34.964-142.447,122.2-145,232,6.851,4.712,12.961,13.331,18,20l12,11c5.877,7.777,12.152,14.261,18,22,6.343,8.394,16.648,14.6,23,23,24.944,32.989,58.063,59,83,92l12,11c10.441,13.807,24.754,24.451,35,38,35.289,46.667,82.732,83.329,118,130,10.248,13.562,24.57,24.2,35,38,13.353,17.67,33.156,32.681,47,51,5.726,7.577,15.655,13.127,21,21,7.279,10.721,10.96,23.366,17,35,9.364,18.034,20.028,36.558,29,55,88.295-32.287,167.774-85.441,238-137,19.469-14.294,35.907-33.558,55-48,25.68-19.424,47.88-42.96,71-65,11.22-10.7,25.74-20.574,35-33,25.22-33.838,50.34-75.631,68-116,13.19-30.153,20.37-62.879,29-98,4.56-18.579,3.1-63.654-1-81-3.14-13.279-2.13-24.144-6-36-16.94-51.966-43.59-103.021-83-132-29.933-22.008-62.2-38.384-103-50-69.9-19.9-152.827,15.09-195,41-26.207,16.1-50.968,35.412-74,55-4.4,3.743-14.788,19.3-20,18-6.975-3.2-12.723-11.727-18-17a269.645,269.645,0,0,0-29-25C528.875,199.143,470.143,162.314,377,162ZM82,374c-3.125,4.636-8.124,7.138-12,11-11.346,11.3-22.559,22.8-34,34-5.2,5.093-14.267,8.671-16,17,8.8,5.909,16.618,16.554,23,25,6.33,8.376,15.995,15.13,23,23,4.48,5.034,8.8,14.052,16,16,3.125-4.636,8.124-7.138,12-11,11.351-11.309,22.62-22.721,34-34,5.157-5.111,14.273-8.7,16-17-10.051-6.657-26.395-26.934-34-37-7.19-9.517-19.3-16.031-25-27H82Zm74,80c-5.4,8.079-14.252,15.145-22,21l-20,21c-6.491,4.907-17.1,11.946-20,20,4.078,2.74,6.011,7.216,11,9,3.29-4.862,8.9-7.9,13-12,10.974-10.967,21.769-22.309,33-33,5.227-4.976,13.345-8.615,16-16C162.766,460.941,161.473,455.944,156,454Zm23,25c-5.616,8.41-14.934,15.9-23,22l-20,21c-6.249,4.724-16.2,11.226-19,19,11.685,9.081,28.817,29.847,38,42l11,10c17.866,23.629,41.137,42.36,59,66l9,8a184.276,184.276,0,0,1,15,18l12,11c31.475,41.625,73.551,74.38,105,116,6.349,8.4,16.654,14.608,23,23,19.937,26.362,44.823,50.605,68,74,5.766,5.82,15.037,21.895,24,23,4.967-7.416,12.882-13.621,20-19l21-22c6.344-4.8,18.182-12.284,20-21-11.714-7.833-26.339-26.537-35-38l-12-11c-14.326-18.948-32.677-34.044-47-53-6.627-8.77-17.371-15.232-24-24-35.007-46.3-82.008-82.692-117-129l-9-8a184.276,184.276,0,0,1-15-18l-12-11c-20.077-26.552-45.155-50-68-74C196.106,496.757,188.9,482.554,179,479ZM555,888c-3.118,4.639-8.125,7.14-12,11-11.351,11.308-22.621,22.722-34,34-5.115,5.07-13.349,8.625-16,16h1c5.475,5.427,13.265,7.758,20,12,11.6,7.308,24.1,19.953,38,24v-8c-3.412-5.2-1.984-23.783-1-28,10.23-5.989,23.121-.221,37,1v-1c-4.325-4.835-5.858-11.962-9-18-4.269-8.205-9.675-16.705-14-25C562.134,900.5,560.482,890.765,555,888Zm16,80q1,12.5,2,25c4.789,1.576,7.322,5.544,11,8,14.37,9.59,28.773,20.15,44,28v-2c-4.309-4.87-5.852-11.95-9-18-3.98-7.65-9.022-15.382-13-23-3.017-5.778-2.648-13.329-11-14C590.02,968.743,578.019,968.135,571,968Z" transform="translate(0 -138.938)"/>
                </svg>
              </div>
            </button>

            <div className="flex flex-row justify-center flex-nowrap">
              {
              (user) 
                ?               
                <button onClick={() => signOut()} className="px-4 py-2 text-white bg-purple-600 rounded-full text-md">
                  Sign Out
                </button>
                :
                <button onClick={() => signInWithGoogle()} className="px-4 py-2 text-white bg-purple-600 rounded-full text-md">
                  Get Started
                </button>
              }
              <ThemeButton/>
            </div>
            
          </div>
      </nav>
    </header>
  )
  }
  
  export default Navbar;