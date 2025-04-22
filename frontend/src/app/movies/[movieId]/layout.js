export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/v1/movies');
    
    if (!response.ok) {
      console.error('API response not ok:', {
        status: response.status,
        statusText: response.statusText
      });
      return [];
    }

    const movies = await response.json();
    
    return movies.map((movie) => ({
      movieId: `movie-${movie.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function MovieLayout({ children }) {
  return children;
}
