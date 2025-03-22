import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';


export function Header() {


  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl px-1 mt-5 mb-3">
      <h1 className="flex items-center">
        <nav className="w-full bg-white h-12 flex items-center justify-between px-4 rounded-sm">
          <div className="flex gap-4 font-medium"> 
            <Link to="/">
              Home
            </Link>
            <Link to="/admin">
              Meus Links
            </Link>
            <Link to="/admin/social">
              Redes Social
            </Link>
          </div>

          <button onClick={handleLogout} className="cursor-pointer">
            <BiLogOut size={30} color="#db2629"/>
          </button>
        </nav>
      </h1>
    </header>
  )
}