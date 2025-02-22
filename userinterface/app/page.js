'use client';
import Image from 'next/image';
import { useAppContext } from './context/AppContext';
import NavBar from './components/NavBar';
import Section1 from './components/Section1';
export default function Home() {
  const { user, setUser } = useAppContext();
  console.log(user);
  return (
    <div>
      <NavBar />
      <Section1 />
    </div>
  );  
}
