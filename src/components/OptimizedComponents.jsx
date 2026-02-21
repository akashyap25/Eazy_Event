import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { useDebounce, useThrottle, useIntersectionObserver } from '../hooks/usePerformance';

// Optimized Event Card Component
export const OptimizedEventCard = memo(({ event, onEventClick, onRegister, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize expensive calculations
  const eventDate = useMemo(() => {
    return new Date(event.startDateTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [event.startDateTime]);

  const eventTime = useMemo(() => {
    return new Date(event.startDateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [event.startDateTime]);

  const isUpcoming = useMemo(() => {
    return new Date(event.startDateTime) > new Date();
  }, [event.startDateTime]);

  // Memoize event handlers
  const handleEventClick = useCallback(() => {
    onEventClick?.(event);
  }, [onEventClick, event]);

  const handleRegister = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onRegister?.(event._id);
    } finally {
      setIsLoading(false);
    }
  }, [onRegister, event._id, isLoading]);

  const handleLike = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onLike?.(event._id, !isLiked);
      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  }, [onLike, event._id, isLiked, isLoading]);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleEventClick}
    >
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
            } hover:bg-red-500 hover:text-white transition-colors duration-200`}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{eventDate}</span>
          <span>{eventTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            {event.isFree ? 'Free' : `$${event.price}`}
          </span>
          
          {isUpcoming && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRegister();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

OptimizedEventCard.displayName = 'OptimizedEventCard';

// Optimized Search Component
export const OptimizedSearch = memo(({ onSearch, placeholder = "Search events..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Throttle search to prevent excessive API calls
  const throttledSearch = useThrottle(onSearch, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      throttledSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, throttledSearch]);

  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
});

OptimizedSearch.displayName = 'OptimizedSearch';

// Optimized Event List Component
export const OptimizedEventList = memo(({ events, onEventClick, onRegister, onLike }) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  // Memoize filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(event => event.status === 'upcoming');
  }, [events]);

  // Memoize event handlers
  const handleEventClick = useCallback((event) => {
    onEventClick?.(event);
  }, [onEventClick]);

  const handleRegister = useCallback((eventId) => {
    onRegister?.(eventId);
  }, [onRegister]);

  const handleLike = useCallback((eventId, isLiked) => {
    onLike?.(eventId, isLiked);
  }, [onLike]);

  if (!isIntersecting) {
    return <div ref={ref} className="h-96 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <OptimizedEventCard
          key={event._id}
          event={event}
          onEventClick={handleEventClick}
          onRegister={handleRegister}
          onLike={handleLike}
        />
      ))}
    </div>
  );
});

OptimizedEventList.displayName = 'OptimizedEventList';

// Optimized Modal Component
export const OptimizedModal = memo(({ isOpen, onClose, title, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
});

OptimizedModal.displayName = 'OptimizedModal';

// Optimized Button Component
export const OptimizedButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

OptimizedButton.displayName = 'OptimizedButton';

// Optimized Form Component
export const OptimizedForm = memo(({ onSubmit, children, className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(e);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, isSubmitting]);

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          </div>
        </div>
      )}
    </form>
  );
});

OptimizedForm.displayName = 'OptimizedForm';

export default {
  OptimizedEventCard,
  OptimizedSearch,
  OptimizedEventList,
  OptimizedModal,
  OptimizedButton,
  OptimizedForm
};