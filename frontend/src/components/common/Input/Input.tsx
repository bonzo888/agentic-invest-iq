import React from 'react';
import classNames from 'classnames';
import type { InputProps } from './Input.types';
import './Input.css';

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  autoFocus = false,
  autoComplete,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  label,
  helperText,
  error,
  startIcon,
  endIcon,
  className,
  onChange,
  onBlur,
  onFocus,
}) => {
  const inputClasses = classNames(
    'input',
    `input--${size}`,
    {
      [`input--${variant}`]: variant !== 'default',
      'input--with-start-icon': startIcon,
      'input--with-end-icon': endIcon,
    },
    className
  );

  const containerClasses = classNames(
    'input-container',
    {
      'input-container--full-width': fullWidth,
    }
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={classNames('input-label', {
          'input-label--required': required,
        })}>
          {label}
        </label>
      )}
      
      <div className="input-wrapper">
        {startIcon && (
          <span className="input-icon input-icon--start">
            {startIcon}
          </span>
        )}
        
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className={inputClasses}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        
        {endIcon && (
          <span className="input-icon input-icon--end">
            {endIcon}
          </span>
        )}
      </div>
      
      {error && (
        <span className="input-error-text">{error}</span>
      )}
      
      {helperText && !error && (
        <span className="input-helper-text">{helperText}</span>
      )}
    </div>
  );
};