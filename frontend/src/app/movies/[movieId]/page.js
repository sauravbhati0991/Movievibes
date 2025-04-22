"use client";
import { useParams } from "next/navigation";
import MoviesDetails from "@/pages/MovieDetails";

export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/movies');
    const movies = await response.json();
    
    return movies.map((movie) => ({
      movieId: `movie-${movie.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Return empty array as fallback
  }
}

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
