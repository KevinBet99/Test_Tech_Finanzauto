const Footer = () => {
  const icons = {
    logo: "https://img.icons8.com/ios-filled/100/4ade80/garage-closed.png",
    vehiculos: "https://img.icons8.com/ios-filled/50/ffffff/car--v1.png",
    clientes: "https://img.icons8.com/ios-filled/50/ffffff/user-group-man-man.png",
    ventas: "https://img.icons8.com/ios-filled/50/ffffff/sell.png",
  };

  return (
    <footer className="relative flex flex-col items-center justify-center py-6 bg-gradient-to-r from-green-500 via-green-500 to-green-200 shadow-inner overflow-hidden">
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 500 80" className="w-full h-16" preserveAspectRatio="none">
          <path
            d="M0,80 Q250,0 500,80 L500,0 L0,0 Z"
            fill="url(#footerGradient)"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFF" />
              <stop offset="50%" stopColor="#FFFF" />
              <stop offset="100%" stopColor="#FFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex items-center gap-3 mb-2 z-10">
        <img
          src={icons.logo}
          alt="Logo Finanzauto"
          className="w-8 h-8 animate-bounce"
        />
        <span className="text-lg font-bold text-white tracking-wide drop-shadow">
          Prueba Finanzauto 
        </span>
      </div>

      <p className="text-green-100 text-xs text-center z-10">
        &copy; {new Date().getFullYear()} Kevin Alexnader Lopez . Todos los derechos
        reservados.
      </p>

      <div className="flex gap-2 mt-3 opacity-70 z-10">
        <img src={icons.vehiculos} alt="Vehículos" className="w-6 h-6" />
        <img src={icons.clientes} alt="Clientes" className="w-6 h-6" />
        <img src={icons.ventas} alt="Ventas" className="w-6 h-6" />
      </div>
    </footer>
  );
};

export default Footer;