"use client"; // Désactive le SSR pour cette page

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router =useRouter()
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
  try {
    e.preventDefault();
    console.log("Register Data:", formData);
    const response = await axios.post('http://localhost:5000/auth/register',formData)
    if(response.status === 201){
      localStorage.setItem('token',response?.data?.token)
router.push('/')

    }
  } catch (error) {
    console.log(error)
  }

  
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Créez votre compte
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Inscrivez-vous pour profiter de nos services.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Inscription</p>

          <div>
            <label className="sr-only">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
              placeholder="Nom"
              required
            />
          </div>

          <div>
            <label className="sr-only">Prénom</label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
              placeholder="Prénom"
              required
            />
          </div>

          <div>
            <label className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="sr-only">Numéro de téléphone</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
              placeholder="Numéro de téléphone"
              required
            />
          </div>

          <div>
            <label className="sr-only">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
              placeholder="Mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            S'inscrire
          </button>

          <p className="text-center text-sm text-gray-500">
            Déjà un compte ?{" "}
            <a className="underline text-indigo-600" href="/Login">
              Connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
