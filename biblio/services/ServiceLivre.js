import React, { useState, useEffect } from "react";
import axios from "axios";

function LivreList() {
  const [livres, setLivres] = useState([]);

  const fetchLivres = async () => {
    try {
      const response = await axios.get("/api/v1/livre");
    } catch (error) {
      console.error("Error fetching livres:", error);
    }
  };

  useEffect(() => {
    fetchLivres();
  }, []);

  return (
            <h2>LivreList</h2>
            {livres.map((livre) => (
            <div key={livre.code}>
                <h1>{livre.Titre}</h1>
                <p>{livre.Description}</p>
                <p>{livre.Auteur}</p>
            )}
            </div>

    ))}
  );

}

export default Livre;
