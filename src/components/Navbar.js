import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <div className='flex justify-end bg-blue-700 text-white mb-4'>
            <div>
                <Link to='/' className='hover:bg-blue-500 mx-2 uppercase rounded px-1'>Home</Link>
            </div>
            <div>
                <Link to='/test' className='hover:bg-blue-500 mx-2 uppercase rounded px-1'>Test</Link>
            </div>            
        </div>
    )
}