import { Link } from "react-router-dom";

// const Layout = ({ children } : { children: React.ReactNode } ) => (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm py-4">
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           <Link to="/"><h1 className="text-xl font-bold text-blue-600">TaskHub</h1></Link>
//           <div>
//           <Link to="/" className="mx-2">Dashboard</Link> <Link to="/projects" className="mx-2">Projects</Link>
//           </div>
//         </div>
//       </header>
//       <main className="container mx-auto px-4 py-8">{children}</main>
//     </div>
//   );

//   export default Layout

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          <Link 
            to="/" 
            className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            TaskHub
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/projects" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Projects
            </Link>
          </nav>
          
        </div>
      </div>
    </header>
    
    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

  export default Layout
