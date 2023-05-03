import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <div className='text-right'>
            <Link to='/' className='mx-4r'>Home</Link>
            <Link to='/test' className='mx-4'>Test</Link>
        </div>
    )
}