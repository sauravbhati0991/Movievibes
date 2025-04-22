export async function generateStaticParams() {
  try {
    // First get the API key
    const keyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/apikey`
    );
    const keyData = await keyResponse.json();
    const apiKey = keyData.ApiKey;

    // Then fetch movies list
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    const data = await response.json();
    const movies = data.results || [];

    return movies.map((movie) => ({
      movieId: `${slugify(movie.title, { lower: true })}-${movie.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function MovieLayout({ children }) {
  return children;
}
