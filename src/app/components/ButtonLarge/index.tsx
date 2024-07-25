const ButtonLarge = ({ text }: { text: string }) => {
  return (
    <div className="w-44 h-12 flex justify-center items-center text-center text-dark-blue font-manrope bg-neon-green font-bold hover:bg-light-cyan">
      {text}
    </div>
  );
};

export default ButtonLarge;
