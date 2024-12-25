"use client";

import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import createGroup from "@/lib/api/group/createGroup";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const create = async () => {
      createGroup(() => {
        redirect("/login");
      }, formData);
      redirect("/leetcode-colab");
    };
    create();
  };

  const handleCancel = () => {
    redirect("/leetcode-colab");
  };

  return (
    <div className="h-fit lg:h-[95%] bg-cardPrimary rounded-md shadow p-10 lg:w-full overflow-y-scroll">
      <div className="h-full flex lg:flex-row justify-center items-center">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Group Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-80 p-2.5"
              required
            />
          </div>
          <div className="flex gap-2 justify-center">
            <PrimaryButton type="submit">Create Group</PrimaryButton>
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
