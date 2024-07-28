import axios from "axios";

export const fetchAccess = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return "error";
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/client`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.status;
  } catch (err) {
    console.error(err);
    return "error";
  }
};
