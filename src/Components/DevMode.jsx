import React from 'react';

const DevMode = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Development Mode</h1>
          <p className="text-gray-600">API keys are not configured. Please set up your environment variables to continue.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🔧 Setup Required</h3>
            <p className="text-blue-800 text-sm mb-3">To run this application, you need to configure the following API keys:</p>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>Clerk</strong> - For authentication</li>
              <li>• <strong>Stripe</strong> - For payments (optional)</li>
              <li>• <strong>Cloudinary</strong> - For image uploads (optional)</li>
              <li>• <strong>MongoDB</strong> - For database (backend)</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Quick Setup</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">1. Create a Clerk account:</p>
                <a 
                  href="https://clerk.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  https://clerk.com
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">2. Update your .env file:</p>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  <div>VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here</div>
                  <div>VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here</div>
                  <div>VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name</div>
                  <div>VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">3. Update backend .env file:</p>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  <div>MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database</div>
                  <div>CLERK_PUBLISHABLE_KEY=pk_test_your_key_here</div>
                  <div>CLERK_SECRET_KEY=sk_test_your_key_here</div>
                  <div>STRIPE_SECRET_KEY=sk_test_your_key_here</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">🚀 Ready to Start?</h3>
            <p className="text-green-800 text-sm mb-3">Once you've configured your API keys:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-800">Restart the development server</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-800">The application will load normally</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Need help? Check the <code className="bg-gray-100 px-1 rounded">SETUP.md</code> file for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevMode;