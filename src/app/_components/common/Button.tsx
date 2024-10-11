type Color = 'default' | 'white' | 'red';
type Size = 'sm' | 'md' | 'full';
type Type = 'button' | 'submit';

interface ButtonType {
  children: React.ReactNode;
  onClick: () => void;
  color?: Color;
  size?: Size;
  type?: Type;
}

const buttonTheme = {
  color: {
    default: 'text-white bg-green-400 border-green-400',
    white: 'text-green-400 bg-white border-green-400',
    red: 'text-red-400 bg-white border-red-400'
  },

  size: {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    full: 'py-3 w-full text-base'
  }
};

const Button = ({ children, onClick, color = 'default', size = 'md', type = 'button' }: ButtonType) => {
  return (
    <button
      className={`${buttonTheme.color[color]} ${buttonTheme.size[size]} text-center rounded-md font-semibold border`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
