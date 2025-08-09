// src/components/common/ButtonAction.jsx
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const ButtonAction = ({
  label,
  onClick,
  type = 'primary',
  size = 'md',
  icon: Icon, // Icon bisa dari react-icons
  iconPosition = 'left',
  loading = false,
  disabled = false,
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const typeStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizeStyle = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const classes = `${baseStyle} ${typeStyle[type] || typeStyle.primary} ${sizeStyle[size]}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="mr-2" />
      )}
      {label}
      {Icon && iconPosition === 'right' && !loading && <Icon className="ml-2" />}
    </button>
  );
};

export default ButtonAction;
