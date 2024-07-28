"use client";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/utilites/getUser";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { toast, ToastContainer, Bounce } from "react-toastify";

export default function UserPage() {
  let [data, setData] = useState(null);
  let [showEdit, setShowEdit] = useState(false);
  let [editPhoto, setEditPhoto] = useState(false);
  let [editPassword, setEditPassword] = useState(false);

  let handleEdit = () => {
    setShowEdit(true);
  };

  let handlePhoto = () => {
    setEditPhoto(true);
  };

  let handleSave = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const id = data?._id;
    if (!name || !email) {
      toast.error("Enter both name and email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    const updateData = {
      name,
      email,
      id,
    };
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/updateMe`;
      const res = await axios({
        method: "PATCH",
        url,
        data: updateData,
      });
      if (res.data.status === "success") {
        toast.success("Data updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        window.setTimeout(() => {
          setShowEdit(false);
          location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleDelete = async () => {
    const id = data?._id;
    const deleteUserData = {
      id,
    };
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/deleteMe`;
      const res = await axios({
        method: "PATCH",
        url,
        data: deleteUserData,
      });
      console.log(res);
      if (res.data.status === "success") {
        toast.success("Account deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        window.setTimeout(() => {
          location.assign("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSavePhoto = async () => {
    let photo = document.getElementById("profile-photo");
    if (!photo) {
      toast.error("Choose file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    const formData = new FormData();
    formData.append("photo", photo.files[0]);
    formData.append("id", data?._id);
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/updateMe`;
      const res = await axios({
        method: "PATCH",
        url,
        data: formData,
      });
      if (res.data.status === "success") {
        toast.success("Data updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        window.setTimeout(() => {
          setEditPhoto(false);
          setShowEdit(false);
          location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchUserData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <div className=" absolute text-white  font-freeman top-[150px] w-full flex flex-col justify-center sm:items-end lmd:items-center xsm:items-center">
      <div className=" xsm:w-[95%] sm:w-[80%] lmd:w-[720px]  bg-[#121b3c] rounded-lg sm:mr-5 lmd:mr-0 p-5">
        <div
          className={` relative ${showEdit ? "xsm:pb-[120px]" : "xsm:pb-9"} ${
            showEdit ? "sm:pb-11" : "sm:pb-6"
          }  flex xsm:flex-col-reverse sm:flex-row items-center gap-4 justify-evenly`}
        >
          {showEdit ? (
            editPhoto ? (
              <div className=" flex flex-col justify-evenly items-center gap-3">
                <input
                  type="file"
                  id="profile-photo"
                  className=" underline rounded-lg cursor-pointer"
                  defaultValue={data?.photo}
                />
              </div>
            ) : (
              <div className=" flex flex-col justify-evenly items-center gap-3">
                <input
                  type="text"
                  id="name"
                  min={4}
                  required
                  className=" text-[25px] bg-[#182450] max-w-[75%] px-3 py-1 rounded-lg"
                  placeholder="Username"
                  defaultValue={data?.name}
                />
                <input
                  type="email"
                  id="email"
                  required
                  className=" text-[18px] bg-[#182450] max-w-[90%] px-3 py-1 rounded-lg"
                  placeholder="you@example.com"
                  defaultValue={data?.email}
                />
              </div>
            )
          ) : (
            <div className=" flex flex-col justify-evenly">
              <p className=" text-[25px]">{data?.name}</p>
              <p className=" text-[18px]">Email: {data?.email}</p>
              <p className=" text-[18px]">Favorites: {data?.like.length}</p>
              <p className=" text-[18px]">Reviewed: {data?.review.length}</p>
            </div>
          )}
          <div className=" flex flex-col gap-2">
            <img
              src={`/images/${
                data?.photo.split("/")[data?.photo.split("/").length - 1]
              }`}
              alt={data?.name}
              className=" rounded-[50%] w-[150px]"
            />
          </div>
          {showEdit ? (
            editPhoto ? (
              <div className=" absolute bottom-0 gap-2 justify-evenly flex flex-wrap flex-row max-w-full">
                <button
                  onClick={handleSavePhoto}
                  className=" py-1 text-nowrap px-2 rounded-lg bg-[#182450] hover:bg-[#18275e] font-sans"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className=" absolute bottom-0 gap-2 justify-evenly flex flex-wrap flex-row max-w-full">
                <button
                  onClick={handlePhoto}
                  className=" py-1 text-nowrap px-2 rounded-lg bg-[#182450] hover:bg-[#18275e] font-sans"
                >
                  Edit Profile Photo
                </button>
                <button className=" py-1 text-nowrap px-2 rounded-lg bg-[#182450] hover:bg-[#18275e] font-sans">
                  Update Password
                </button>
                <button
                  onClick={handleSave}
                  className=" py-1 text-nowrap px-2 rounded-lg bg-[#182450] hover:bg-[#18275e] font-sans"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleDelete}
                  className="py-1 text-nowrap px-2 rounded-lg bg-red-700 hover:bg-red-600 font-sans"
                >
                  Delete Account
                </button>
              </div>
            )
          ) : (
            <button
              onClick={handleEdit}
              className=" absolute bottom-0 sm:left-100 flex py-1 px-2 rounded-lg bg-[#182450] hover:bg-[#18275e] font-sans"
            >
              <EditNoteIcon /> Edit Profile
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
