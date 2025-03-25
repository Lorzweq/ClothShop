const HeaderCommercial = () => {
    return (
      <header className="bg-gray-300 text-gray-600 py-2 md:py-4 font-bold text-sm md:text-base">
        <ul className="flex flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0">
          <li><a href="#" className="hover:underline">All favorite brands</a></li>
          <li><a href="#" className="hover:underline">Free shipping on orders over 34,95 € & free returns*</a></li>
          <li><a href="#" className="hover:underline">30-day right of return</a></li>
        </ul>
      </header>
    );
  };
  
  export default HeaderCommercial;