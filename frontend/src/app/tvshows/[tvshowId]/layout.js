import slugify from "slugify";

export async function generateStaticParams() {
  try {
    const keyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/apikey`
    );
    const keyData = await keyResponse.json();
    const apiKey = keyData.ApiKey;

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );
    const data = await response.json();
    const shows = data.results || [];

    return shows.map((show) => ({
      tvshowId: `${slugify(show.name, { lower: true })}-${show.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function TVShowLayout({ children }) {
  return children;
}
