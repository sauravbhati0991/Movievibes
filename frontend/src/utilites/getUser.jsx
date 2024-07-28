import axios from "axios";

export const fetchUserData = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/myprofile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.status === "error") {
      window.setTimeout(() => {
        location.assign("/login");
      }, 700);
    } else {
      return res.data.data.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
