import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../input";
import { FiTrash } from 'react-icons/fi'
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}
export function Admin() {

  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, settextColorInput] = useState("#ffffff");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [allLinks, setAllLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unSub = onSnapshot(queryRef, (snapshot) => {

      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().nome,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setAllLinks(lista)
    })

    return () => {
      unSub()
    }
  }, [])

  
  async function handleDelete(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }



  function handleRegister(e: FormEvent) {
    e.preventDefault()

    if(nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos")
      return;
    }

    addDoc(collection(db, "links"), {
      nome: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("")
      setUrlInput("")
      console.log("Collection adicionado com sucesso")
    }).catch((error) => {
      console.log("Error ao enviar sua collection", error)
    })


  }


  return (
    <div className="flex flex-col max-w-2xl m-auto items-center min-h-screen pb-7 px-2 w-full">
      <Header />

      <form onSubmit={handleRegister} className="flex flex-col max-w-[600px] w-full px-1">
        <label className="text-white mt-2 mb-2">Nome do link</label>
        <Input 
          placeholder="Digite seu link"
          value={nameInput}
          onChange={ (e) => setNameInput(e.target.value)}
        />

        <label className="text-white mt-2 mb-2">Url do link</label>
        <Input 
          type="url"
          placeholder="Digite sua Url"
          value={urlInput}
          onChange={ (e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-5 gap-4 ">
          <div className="flex gap-2">
            <label className="text-white mt-2 mb-2">Coloque a cor do texto</label>
            <input 
              type="color"
              value={textColorInput}
              onChange={ (e) => settextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white mt-2 mb-2">Coloque a cor de fundo</label>
            <input 
              type="color"
              value={backgroundColorInput}
              onChange={ (e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-sm">
            <label className="text-white mt-2 mb-2">Analise como esta ficando: </label>
            <article 
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-4"
              style={{marginBottom: 8, marginTop: 8, background: backgroundColorInput}}
            >
              <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button 
          type="submit"
          className="text-white bg-blue-950 py-3 font-medium rounded-sm cursor-pointer mt-4 flex justify-center items-center mb-8"
          >
          Cadastrar
        </button>

        <h2 className="text-white text-center font-bold text-2xl mt-6 mb-5">Meus Links</h2>

        {allLinks.length > 0 && allLinks.map((item) => (
          <article 
          className="flex items-center w-full justify-between px-3 py-3 mb-2 rounded-sm select-none"
          style={{background: item.bg}}
          key={item.id}
        >
          
          <p 
            className="text-white font-medium"
            style={{color: item.color}}
          >
            {item.name}</p>
          <div>
            <button className="cursor-pointer" onClick={ (e: FormEvent) => {
              e.preventDefault()
              handleDelete(item.id)}
            }

            >
              <FiTrash size={20} color="#ffffff"/>
            </button>
          </div>
        </article>
      ))}

      </form>
    </div>
  )
}