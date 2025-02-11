"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

const ProfileForm = ({ langIsKa }: { langIsKa: boolean }) => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [session, setSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputStyle =
    "block w-full text-black text-base leading-6 h-[calc(2.75rem+2px)] px-3 py-2 border border-[#cad1d7] rounded-md bg-white transition-all duration-200 ease-[cubic-bezier(.68,-.55,.265,1.55)] shadow-md focus:shadow-lg focus:outline-none mb-3";
  const labelStyle = "text-sm font-bold tracking-wider";

  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data || !data.session?.access_token) {
          throw new Error("User is not authenticated");
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSession();
  }, [supabase]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.access_token) return;
      try {
        const response = await fetch("/api/users-data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await response.json();
        if (data && data.data && data.data[0]) {
          setFormData(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(formData);

        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-[#8898aa]">
          {langIsKa ? "იტვირთება ..." : "loading ..."}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-1 w-full mb-52">
          <div className="flex justify-end mb-10">
            <button
              type="submit"
              className="bg-[#222e46] text-white px-4 py-2 rounded hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {langIsKa ? "პროფილის დეტალების შენახვა" : "Save profile details"}
            </button>
          </div>
          <div className="flex flex-col md:w-4/5 mx-auto md:pl-16 dark:text-[#ffa552]">
            <div className="pl-6 w-full">
              <div className="form-group focused">
                <label className={labelStyle}>
                  {langIsKa ? "სახელი" : "First name"}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder={langIsKa ? "შენი სახელი" : "Your first name"}
                />
              </div>
              <label className={labelStyle}>
                {langIsKa ? "გვარი" : "Last name"}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder={langIsKa ? "შენი გვარი" : "Your last name"}
              />
            </div>
          </div>
          <hr className="my-6" />
          <h6 className="text-sm py-1 tracking-wider text-[#8898aa] dark:text-white mb-6">
            {langIsKa ? "საკონტაქტო ინფორმაცია" : "CONTACT INFORMATION"}
          </h6>
          <div className="pl-6">
            <label className={labelStyle}>
              {langIsKa ? "ტელეფონი" : "Phone"}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder={`${langIsKa ? "მაგ." : "e.x."} +995 593 12-34-56`}
            />
            <label className={labelStyle}>
              {langIsKa ? "მისამართი" : "Address"}
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder={
                langIsKa ? "მაგ. ნუცუბიძის 1" : "e.x. Nutsubidze str."
              }
              type="text"
            />
            <label className={labelStyle}>{langIsKa ? "ქალაქი" : "City"}</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder={langIsKa ? "მაგ. თბილისი" : "e.x. Tbilisi"}
            />
            <label className={labelStyle}>
              {langIsKa ? "ქვეყანა" : "Country"}
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder={langIsKa ? "მაგ. საქართველო" : "e.x. Georgia"}
            />
          </div>
        </form>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#f0eff4] p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg text-[#86cd82] font-semibold">
              {langIsKa
                ? "მონაცემები შენახულია!"
                : "Information saved successfully!"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
