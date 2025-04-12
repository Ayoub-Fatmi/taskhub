import { Link } from "react-router-dom";

// Example layout with Tailwind CSS
const Layout = ({ children } : { children: React.ReactNode } ) => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">TaskHub</h1>
          {/* Navigation */}
          <div>
          <Link to="/" className="mx-2">Dashboard</Link> <Link to="/projects" className="mx-2">Projects</Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );

  export default Layout