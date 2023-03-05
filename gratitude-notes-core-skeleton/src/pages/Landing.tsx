import Navbar from "../components/Navbar";

const Landing: React.FC = () => {  
  return (
    <div>
      <Navbar />
      <div className="h-10 bg-blue-300 dark:bg-slate-600 grid grid-flow-row">
        <h2>Thank yourself.</h2>
        <h3>Track happiness, explore joy, and live your best life today!</h3>
      </div>
    </div>
    
  )
}

export default Landing;