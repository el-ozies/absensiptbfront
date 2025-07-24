const ButtonAction = ({ label, onClick, type = 'primary', disabled = false }) => {
  const baseStyle =
    'px-4 py-2 text-sm rounded font-medium transition duration-200';

  const typeStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  const combined = `${baseStyle} ${typeStyle[type] || typeStyle.primary}`;

  return (
    <button
      className={combined}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonAction;
