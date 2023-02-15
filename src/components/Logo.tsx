const Logo = ({ size1, size2 }: { size1: string; size2: string }) => {
  return (
    <div className="select-none">
      <h1
        className={`font-pacifico text-center tracking-wide text-white text-[${size1}px]`}
      >
        Quality Electric Services
      </h1>
      <h2
        className={`font-roboto text-center text-gray-400 text-[${size2}px] tracking-widest`}
      >
        Project Manager
      </h2>
    </div>
  );
};

export default Logo;
