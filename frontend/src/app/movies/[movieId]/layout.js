export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/movies');
    
    if (!response.ok) {
      console.error('API response not ok:', {
        status: response.status,
        statusText: response.statusText
      });
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      return [];
    }

    const movies = await response.json();
    
    if (!Array.isArray(movies)) {
      console.error('Expected array of movies, got:', typeof movies);
      return [];
    }

    return movies.map((movie) => ({
      movieId: `movie-${movie.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', {
      message: error.message,
      stack: error.stack
    });
    return []; 
  }
}

export default function MovieLayout({ children }) {
  return children;
}
