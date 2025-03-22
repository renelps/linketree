import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../input";
import { db } from '../../services/firebaseConnection';
import {
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';

export function NetWorks() {

  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "redesSociais");
      getDoc(docRef)
      
      .then((snapshot) => {
        if(snapshot.data() === undefined) return;

        setLinkedin(snapshot.data()?.linkedin);
        setInstagram(snapshot.data()?.instagram);
        setGithub(snapshot.data()?.github);

      })
    }

    loadLinks();
  }, [])



  function handleSaveLinks(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "redesSociais"), {
      linkedin: linkedin,
      instagram: instagram,
      github: github
    })
    .then(() => {
      console.log("Url adicionada com sucesso")
    }).catch((error) => {
      console.log("Error ao adicionar urls", error)
    })
  }


  return (
    <div className="flex justify-center max-w-2xl w-full flex-col m-auto">
      <Header />

      <form className=" flex flex-col mx-2" onSubmit={handleSaveLinks}>
        <h1 className="text-white font-bold text-2xl text-center mt-7 mb-3">Minhas Redes Sociais</h1>
        
        <label className="py-2 text-white font-medium">Link Linkedin</label>
        <Input 
          type="url"
          placeholder="digite a url"
          value={linkedin}
          onChange={ (e) => setLinkedin(e.target.value)}
        />

        <label className="py-2 text-white font-medium">Link instagram</label>
        <Input 
          type="url"
          placeholder="digite a url"
          value={instagram}
          onChange={ (e) => setInstagram(e.target.value)}
        />

        <label className="py-2 text-white font-medium">Link Facebook</label>
        <Input 
          type="url"
          placeholder="digite a url"
          value={github}
          onChange={ (e) => setGithub(e.target.value)}
        />


        <button 
          type="submit"
          className=" flex items-center justify-center bg-blue-900 text-white my-5 h-10 rounded-sm font-medium cursor-pointer mb-5"
         >
          Salvar links
        </button>
      </form>
    </div>
  )
}