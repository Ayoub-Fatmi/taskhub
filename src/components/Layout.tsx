import { Link } from "react-router-dom";

const Layout = ({ children } : { children: React.ReactNode } ) => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/"><h1 className="text-xl font-bold text-blue-600">TaskHub</h1></Link>
          <div>
          <Link to="/" className="mx-2">Dashboard</Link> <Link to="/projects" className="mx-2">Projects</Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );

  export default Layout