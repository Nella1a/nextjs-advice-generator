const Button = ({ text, addCss }: { text: string; addCss?: string }) => {
  return (
    <span
      className={`${addCss} flex justify-center items-center text-center text-dark-blue font-manrope bg-neon-green font-bold hover:bg-light-cyan`}
    >
      {text}
    </span>
  );
};

export default Button;
