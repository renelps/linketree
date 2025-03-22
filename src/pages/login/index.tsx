//12345678

import { Link, useNavigate } from 'react-router-dom';
import imgLogin from '../../assets/img/pexels-pixabay-358528.jpg';
import { FormEvent, useState } from 'react';
 
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';


export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(email === '' || password === '') {
      alert("Preencha todos os campo!!");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/admin", { replace: true})
    }).catch((error) => {
      console.log(error);
      alert("A senha ou email está errado")
      setLoading(false)
    })
  }


  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${imgLogin})` }}
    >
      


      <div className="flex flex-col w-full max-w-[600px] shadow-xl p-15">

        <h1 className="font-bold text-white mt-10 mb-8 text-4xl text-center">
          <Link to="/">Dev 
            <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link</span>
          </Link>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
          <input 
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            placeholder='Digite seu Email'
            className="border-2 outline-none text-white border-white py-3 rounded-3xl px-4 placeholder:text-white"
          />
          <input 
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="border-2 outline-none text-white border-white py-3 rounded-3xl px-4 placeholder:text-white"
          />

          <button 
          type="submit"
          className="flex items-center justify-center text-white mt-5  py-2 rounded-3xl border-2 cursor-pointer">
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Acessar"}
          </button>


        </form>

      </div>
    </div>
  )
}