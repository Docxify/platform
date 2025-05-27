import React from 'react';

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-center mb-6">
          <span className="text-2xl text-purple-600">📝</span> {/* Icon placeholder */}
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign in</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Continue
          </button>
        </form>
        <div className="my-4 text-center text-gray-500">OR</div>
        <div className="space-y-4">
          <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span className="mr-2 text-red-500">G</span> Continue with Google
          </button>
          <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span className="mr-2 text-black">G</span> Continue with GitHub
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-purple-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}