export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/tvshows');
    
    if (!response.ok) {
      console.error('API response not ok:', {
        status: response.status,
        statusText: response.statusText
      });
      return [];
    }

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
