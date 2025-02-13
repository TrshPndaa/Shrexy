// components/ErrorBoundary.js
export default function ErrorBoundary({ error, reset }) {
    return (
      <div className="bg-red-50 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
          <h3 className="text-red-800 font-medium">Something went wrong</h3>
        </div>
        <p className="text-red-700 mb-4">{error.message}</p>
        <Button variant="destructive" onClick={reset}>
          Try Again
        </Button>
      </div>
    )
  }