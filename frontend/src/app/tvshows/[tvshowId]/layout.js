export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/tvshows');
    const tvshows = await response.json();
    
    return tvshows.map((show) => ({
      tvshowId: `tvshow-${show.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function TVShowLayout({ children }) {
  return children;
}
