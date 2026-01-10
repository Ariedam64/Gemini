import { ErrorBoundary } from '@sentry/react';

export const RiveErrorFallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        fontSize: '12px',
        textTransform: 'capitalize',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <span>
        Rive
        <br />
        Error
      </span>
    </div>
  );
};

export const RiveErrorBoundary = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: JSX.Element;
}) => {
  return (
    <ErrorBoundary
      fallback={fallback || <RiveErrorFallback />}
      onError={(error) => {
        console.warn(
          '[RiveErrorBoundary] Rive error triggered fallback',
          error
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
