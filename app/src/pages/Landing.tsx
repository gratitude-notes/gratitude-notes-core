import Navbar from "../components/Navbar/Navbar";

const Landing: React.FC = () => {  
  return (
    <div>
      <div className="dark:bg-slate-600 grid grid-flow-row">
        <Navbar />
        <h2>Thank yourself.</h2>
        <h3>Track happiness, explore joy, and live your best life today!</h3>
      </div>
    </div>
    
  )
}

export default Landing;