import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-white text-6xl font-bold">404</h1>
        <p className="text-gray-400 text-xl">Page not found</p>
        <Link
          to="/"
          className="text-[#6366f1] hover:text-[#818cf8] text-lg underline transition-colors cursor-pointer"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
