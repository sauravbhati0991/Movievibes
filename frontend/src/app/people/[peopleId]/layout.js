export async function generateStaticParams() {
  try {
    const keyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/apikey`
    );
    const keyData = await keyResponse.json();
    const apiKey = keyData.ApiKey;

    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`
    );
    const data = await response.json();
    const people = data.results || [];

    return people.map((person) => ({
      peopleId: `${slugify(person.name, { lower: true })}-${person.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function PeopleLayout({ children }) {
  return children;
}
