"use client";
import { useParams } from "next/navigation";
import MoviesDetails from "@/pages/MovieDetails";

export default function MovieDeatilsPage() {
  const params = useParams();
  const movieIdArr = params.movieId.split("-");
  const movieId = movieIdArr[movieIdArr.length - 1];
  return (
    <>
      <MoviesDetails id={movieId} />
    </>
  );
}
