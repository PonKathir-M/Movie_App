import React from "react";

export default function App() {

   const API_KEY = "https://jsonplaceholder.typicode.com/photos";

   const [photos, setPhotos] = React.useState([]);
   const [loading, setLoading] = React.useState(true);
   const [error, setError] = React.useState(null);

   React.useEffect(() => {
      const controller= new AbortController();

      fetch(API_KEY, { signal: controller.signal })
         .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
         })
         .then(data => {
            
            setPhotos(Array.isArray(data) ? data.slice(0, 20) : []);
         })
         .catch(err => {
            if (err.name !== 'AbortError') setError(err.message);
         })
         .finally(() => setLoading(false));

      return () => controller.abort();
   }, []);

   return (
      <div>
         <h1>Welcome to Movie App</h1>

         {loading && <p>Loading photos...</p>}
         {error && <p style={{ color: 'red' }}>Error: {error}</p>}

         {!loading && !error && (
            <div >
               {photos.map(photo => (
                  <figure key={photo.id} style={{ margin: 0 }}>
                     <img src={photo.thumbnailUrl || photo.url} alt={photo.title} style={{ width: '100%', height: 'auto' }} />
                     <figcaption style={{ fontSize: 12, marginTop: 6 }}>{photo.title}</figcaption>
                  </figure>
               ))}
            </div>
         )}

      </div>
   );
}