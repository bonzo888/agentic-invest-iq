import React from 'react';
import classNames from 'classnames';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'medium',
  shadow = 'small',
}) => {
  const cardClasses = classNames(
    'card',
    `card--padding-${padding}`,
    `card--shadow-${shadow}`,
    className
  );

  return <div className={cardClasses}>{children}</div>;
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={classNames('card-header', className)}>{children}</div>;
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={classNames('card-content', className)}>{children}</div>;
};