const Button = ({ text, onClick, className = "" ,type }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
    type={type}
    >
      {text}
    </button>
  );
}

export default Button