export async function generateStaticParams() {
  try {
    const response = await fetch('https://movievibes.onrender.com/api/v1/people');
    
    if (!response.ok) {
      console.error('API response not ok:', {
        status: response.status,
        statusText: response.statusText
      });
      return [];
    }

    const people = await response.json();
    
    return people.map((person) => ({
      peopleId: `person-${person.id}`
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; 
  }
}

export default function PeopleLayout({ children }) {
  return children;
}
