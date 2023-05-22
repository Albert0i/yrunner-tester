import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className="mb-4 flex justify-end bg-blue-700 text-white">
      <div>
        <Link to="/" className="mx-2 rounded px-1 uppercase hover:bg-blue-500">
          Home
        </Link>
      </div>
      <div>
        <Link to="/test" className="mx-2 rounded px-1 uppercase hover:bg-blue-500">
          Test
        </Link>
      </div>
    </div>
  )
}
