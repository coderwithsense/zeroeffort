export function LoadingState() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <h2 className="text-xl font-medium">Loading your brain data...</h2>
      </div>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Brain is Empty 🧠
        </h2>
        <p className="text-gray-600">
          Start by teaching ZeroEffort what matters to you.
        </p>

        <div className="bg-gray-100 p-4 rounded-xl shadow-md max-w-md mx-auto text-left">
          <p className="font-semibold text-gray-700 mb-2">Example commands:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <code>
                Add to brain: I liked the productivity tip about 'Time Blocking'
              </code>
            </li>
            <li>
              <code>
                Add to brain: I disliked the suggestion about 'No-break work
                sprints'
              </code>
            </li>
            <li>
              <code>What’s currently stored in my brain?</code>
            </li>
            <li>
              <code>Clear all dislikes from brain</code>
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-500">
          Use natural language. ZeroEffort will understand.
        </p>
      </div>
    </div>
  );
}

export function EmptyBrainState() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">No brain data found</h2>
        <p className="mt-2 text-gray-600">We're still learning about you</p>
      </div>
    </div>
  );
}
