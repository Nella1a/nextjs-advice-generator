import Dice from '../Icons/Dice';

const RoundButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      className="absolute z-10 -bottom-8 left-50% bg-neon-green
    hover:bg-light-cyan
    rounded-full w-16 h-16 margin-auto flex justify-center items-center sm:w-16 sm:h-16 sm:-bottom-7"
      onClick={onClickHandler}
    >
      <Dice />
    </button>
  );
};

export default RoundButton;
