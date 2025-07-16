const Header = () => {
  const icons = {
    logo: "https://img.icons8.com/ios-filled/100/4ade80/garage-closed.png",
  };

  return (
    <header className="relative flex items-center gap-6 px-10 py-8 bg-white/95 shadow-xl rounded-b-3xl z-10 border-b-4 border-green-400">
      <div className="absolute inset-0 -z-10">
        <svg
          viewBox="0 0 500 80"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 Q250,0 500,80 L500,0 L0,0 Z"
            fill="url(#headerGradient)"
          />
          <defs>
            <linearGradient id="headerGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <img
        src={icons.logo}
        alt="Logo"
        className="w-20 h-20 drop-shadow-lg bg-white rounded-full border-4 border-green-300"
      />
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow-lg flex items-center gap-3">
          Menú de Gestión de Inventario
        </h1>
        <p className="text-green-700 font-medium text-lg mt-1">
          Administra vehículos, clientes y ventas de forma sencilla y
          profesional
        </p>
      </div>
    </header>
  );
};

export default Header;
