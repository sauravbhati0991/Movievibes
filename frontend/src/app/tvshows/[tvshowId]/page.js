"use client";
import { useParams } from "next/navigation";
import TVShowsDetails from "@/pages/TVShowDetails";

export default function TVShowDeatilsPage() {
  const params = useParams();
  const tvshowIdArr = params.tvshowId.split("-");
  const tvshowId = tvshowIdArr[tvshowIdArr.length - 1];
  return (
    <>
      <TVShowsDetails id={tvshowId} />
    </>
  );
}
