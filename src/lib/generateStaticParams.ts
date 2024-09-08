export async function generateStaticParams() {
    const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());
  
    const response = await fetch('https://your-api-endpoint-to-fetch-makes');
    if (!response.ok) {
      throw new Error('Failed to fetch makes');
    }
    const makes = await response.json();
  
    const paths = makes.flatMap(make =>
      years.map(year => ({
        params: {
          makeId: make.id,
          year: year,
        },
      }))
    );

    return {
      paths,
      fallback: 'blocking',
    };
  }
  