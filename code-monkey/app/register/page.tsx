"use client";

import Navbar from "@/components/navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { pacifico } from "../fonts";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import register from "@/lib/api/auth/register";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
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
    if (formData.password !== formData.repeatPassword) {
      setError("passwords do not match");
      return;
    }
    const handleRegister = async () => {
      await register(
        formData,
        () => {
          redirect("/leetcode-colab");
        },
        () => {},
        setError
      );
    };
    handleRegister();
  };

  const goHome = () => {
    redirect("/");
  };

  const goSignIn = () => {
    redirect("/sign-in");
  };

  return (
    <section className="min-h-screen md:h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 pl-8 pr-8 h-full flex gap-5 flex-col md:flex-row md:justify-center items-center">
        <div className="px-10 py-10 no-scrollbar overflow-y-scroll bg-cardPrimary rounded-md shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <h1
                className={`${pacifico.className} text-fontLogo font-bold text-2xl text-center mb-4`}
              >
                Register
              </h1>
              <label className="block mb-2 text-sm text-fontLogo font-bold">
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Repeat Password
              </label>
              <input
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex gap-2 justify-center">
              <PrimaryButton type="submit">Register</PrimaryButton>
              <SecondaryButton onClick={goSignIn}>Sign in</SecondaryButton>
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
