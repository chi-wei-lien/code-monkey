"use client";

import Navbar from "@/components/navbar";
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        setError,
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
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full flex-col items-center gap-5 pl-8 pr-8 pt-16 lg:flex-row lg:justify-center">
        <div className="no-scrollbar overflow-y-scroll rounded-md bg-cardPrimary px-10 py-10 shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <h1
                className={`${pacifico.className} mb-4 text-center text-2xl font-bold text-themeBrown`}
              >
                Sign In
              </h1>
              <label className="mb-2 block text-sm font-bold text-themeBrown">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-black"
                required
                placeholder="bob-1234"
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-bold text-themeBrown">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-black"
                required
              />
            </div>
            <div className="flex justify-center gap-2">
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
