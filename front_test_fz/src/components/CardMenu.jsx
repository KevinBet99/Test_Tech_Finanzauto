const CardMenu = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="relative w-64 h-80 rounded-3xl cursor-pointer bg-white shadow-xl border border-green-200 group transition-transform duration-300 hover:scale-105 overflow-hidden"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-green-50 z-0" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-white/90">
        {icon}
      </div>
 
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <h3 className="text-2xl font-extrabold text-green-800 mb-2">{title}</h3>
        <p className="text-green-700 text-base font-medium mb-4">
          {description}
        </p>
        <span className="inline-block mt-auto text-green-400 font-semibold text-sm tracking-widest uppercase opacity-80">
          Haz clic aquí
        </span>
      </div>
   
      <div className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 pointer-events-none" />
    </div>
  );
};

export default CardMenu;
