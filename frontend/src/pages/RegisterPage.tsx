import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../actions/auth/register";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    }
    const handleRegister = async () => {
      await register(
        formData,
        () => navigate("/"),
        () => {},
        setError
      );
    };
    handleRegister();
  };

  const goHome = () => {
    navigate("/");
  };

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        <div className="flex gap-2">
          <PrimaryButton type="submit">Register</PrimaryButton>
          <SecondaryButton type="button" onClick={goLogin}>
            Login
          </SecondaryButton>
          <SecondaryButton type="button" onClick={goHome}>
            Cancel
          </SecondaryButton>
        </div>
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </div>
  );
};

export default RegisterPage;
