import './arrow.css'; 
import Product from './product';

const MainContent = () => {
    return (
      <main className="flex flex-col text-white w-full">
        
        <div className="flex flex-col px-4 py-8 text-white bg-orange-700">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 mx-4 md:mx-38">The Spring Festival starts now! Up to -50%</h2>
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 mx-4 md:mx-38">TODAY ONLY: Save 15% extra with the promo code</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-4 md:mx-38">
            <h1 className="text-xl md:text-2xl text-white">Etukoodi*</h1>
            <span className="flex material-symbols-outlined text-white">stack_group</span>
            <h1 className="font-bold text-xl md:text-2xl text-white">ALESTART</h1>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row px-4 py-8 text-white space-y-4 md:space-y-0">
          <h2 className="text-black font-bold ml-4 md:ml-38">
            <a href="#">Men</a>
            <span className="arrow"></span> {/* Arrow icon here */}
          </h2>
          
          <h2 className="text-black font-bold ml-4 md:ml-5">
            <a href="#">Ale</a>
            <span className="arrow"></span> {/* Arrow icon here */}
          </h2>
          
          <h2 className="text-black font-bold ml-4 md:ml-5">
            <a href="#">Clothes</a>
          </h2>
        </div>
        
        <h1 className="text-black font-bold text-2xl md:text-4xl ml-4 md:ml-42">Discounted men's clothing</h1>
      
      </main>
    );
  }
  
  export default MainContent;