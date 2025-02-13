// components/EmptyState.js
export default function EmptyState({ icon, title, action }) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-purple-600">{icon}</div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        {action && (
          <div className="mt-6">
            <Button onClick={action.onClick}>{action.label}</Button>
          </div>
        )}
      </div>
    )
  }