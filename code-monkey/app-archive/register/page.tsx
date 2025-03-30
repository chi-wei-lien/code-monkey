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
        setError,
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
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full flex-col items-center gap-5 pl-8 pr-8 pt-16 lg:flex-row lg:justify-center">
        <div className="no-scrollbar overflow-y-scroll rounded-md bg-cardPrimary px-10 py-10 shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <h1
                className={`${pacifico.className} mb-4 text-center text-2xl font-bold text-themeBrown`}
              >
                Register
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
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Repeat Password
              </label>
              <input
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-center gap-2">
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
