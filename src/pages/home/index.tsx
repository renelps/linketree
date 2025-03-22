import { Social } from "../../components/social";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { db } from '../../services/firebaseConnection';
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from 'firebase/firestore';
import { useEffect, useState } from "react";


//https://github.com/renelps
//https://www.instagram.com/_renan_olv/

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  linkedin: string;
  instagram: string;
  github: string;
}

export function Home() {

  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))
      
      getDocs(queryRef)
      .then((snapshot) => {
        const lista = [] as LinksProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().nome,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })
        setLinks(lista)
      })
    } 

    loadLinks()
  }, [])


  useEffect(() => {
    function loadSocial() {
      const docRef = doc(db, "social", "redesSociais")

      getDoc(docRef)
      .then((snap) => {

        if(snap.data() === undefined) return;

        setSocialLinks({
          linkedin: snap.data()?.linkedin,
          instagram: snap.data()?.instagram,
          github: snap.data()?.github
        })
      })
      
    }

    loadSocial();
  }, [])

  return (
    <div className="flex justify-center h-screen w-full px-10">
      <div className="w-full max-w-[600px] flex-col mt-20">
        <h1 className="md:text-4xl text-3xl text-white text-center font-bold mb-10">Renan Gabriel</h1>
        <p className="text-white text-center m-auto mb-5">Veja meus perfis 👇</p>
        <main className="w-full">

        {links.length > 0 && links.map((item) => (
          <section 
            key={item.id}
            className="w-full select-none transition-transform hover:scale-105 py-5 rounded-lg mb-2 cursor-pointer"
            style={{background: item.bg, color: item.color}}
          >
          <a href={item.url} target="_blank">
            <p 
              className="text-center font-bold"
            >
              {item.name}
            </p>
          </a>
        </section>
        ))}
        </main>
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center text-center text-white mt-5 gap-3">
          <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#fff"/>
          </Social>

          <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff"/>
          </Social>

          <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#fff"/>
          </Social>
        </footer>
        )}
      </div>
    </div>
  )
}