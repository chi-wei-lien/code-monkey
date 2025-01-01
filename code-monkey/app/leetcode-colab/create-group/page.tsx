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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newData = {
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
    <div className="h-fit overflow-y-scroll rounded-md bg-cardPrimary p-10 shadow lg:h-[95%] lg:w-full">
      <div className="flex h-full items-center justify-center lg:flex-row">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Group Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>
          <div className="flex justify-center gap-2">
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
