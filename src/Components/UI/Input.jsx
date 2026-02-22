import React, { forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  showPasswordToggle = false,
  leftIcon,
  rightIcon,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = !!error;

  const baseInputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed
    placeholder-gray-400 dark:placeholder-gray-500
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon || (type === 'password' && showPasswordToggle) ? 'pr-10' : ''}
    ${hasError 
      ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500'
    }
    ${isFocused ? 'ring-2' : ''}
    ${inputClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1
    ${hasError ? 'text-red-700 dark:text-red-400' : ''}
    ${labelClassName}
  `.trim();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={labelClasses}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={baseInputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        
        {rightIcon && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;