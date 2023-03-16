import Navbar from "../components/Navbar/Navbar";

const Landing: React.FC = () => {

  return (
    <div>
      <div className="">
        <Navbar />

        {/* Main Content */}
        <div className="max-w-3xl p-8 m-auto">

          {/* Hero Section */}
          <section className="">
            <div>
              <h1 className="text-6xl text-center">Stay in touch with your own <span className="text-blue-500 font-bold">happiness</span>.</h1>
            </div>
            <div className="pt-6 pb-6">
              <h1 className="text-xl text-center text-gray-400">Find out what makes you happy.</h1>
            </div>
            <div className="text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
            </div>
          </section>

          {/* Purpose and Roots */}
          <section>
            
          </section>

          {/* FAQ */}
          <section>
            
          </section>

          {/* Testimonials */}
          <section>
            
          </section>

          {/* Meet the team */}
          <section>
            
          </section>

          {/* Call to Action? */}
          <section>
            
          </section>

          {/* Footer */}
          <section>
            
          </section>

          </div>
      </div>
    </div>
  )
}

export default Landing;