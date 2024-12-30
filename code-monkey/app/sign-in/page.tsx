"use client";

import Navbar from "@/components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import login from "@/lib/api/auth/login";
import { pacifico } from "../fonts";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handleLogin = async () => {
      await login(
        formData,
        () => {
          redirect("/leetcode-colab");
        },
        () => {},
        setError
      );
    };
    handleLogin();
  };

  const goHome = () => {
    redirect("/");
  };

  const goRegister = () => {
    redirect("/register");
  };

  return (
    <section className="min-h-screen md:h-screen min-w-screen bg-themeIvory">
      <Navbar />
      <div className="pt-16 pl-8 pr-8 h-full flex gap-5 flex-col md:flex-row md:justify-center items-center">
        <div className="px-10 py-10 no-scrollbar overflow-y-scroll bg-cardPrimary rounded-md shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <h1
                className={`${pacifico.className} text-themeBrown font-bold text-2xl text-center mb-4`}
              >
                Sign In
              </h1>
              <label className="block mb-2 text-sm text-themeBrown font-bold">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-80 p-2.5"
                required
                placeholder="bob-1234"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-bold text-themeBrown">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-80 p-2.5"
                required
              />
            </div>
            <div className="flex gap-2 justify-center">
              <PrimaryButton type="submit">Login</PrimaryButton>
              <SecondaryButton onClick={goRegister}>Register</SecondaryButton>
              <SecondaryButton onClick={goHome}>Cancel</SecondaryButton>
            </div>
            {error && <div className="mt-5 w-80 text-red-400">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
