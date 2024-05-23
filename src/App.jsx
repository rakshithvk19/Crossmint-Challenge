import React, { useEffect } from "react";
import axios from "axios";

function App() {
  const NUM_ROWS = 11;
  const NUM_COLS = 11;
  const BASE_URL = "https://challenge.crossmint.io/api/";

  const polyanetPositions = [
    [2, 2],
    [2, 8],
    [3, 3],
    [3, 7],
    [4, 4],
    [4, 6],
    [5, 5],
    [6, 4],
    [6, 6],
    [7, 3],
    [7, 7],
    [8, 2],
    [8, 8],
  ];

  // Clean up existing entities if present.
  const cleanExistingEntities = async (_entityType) => {
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        try {
          const response = await axios.delete(`${BASE_URL}${_entityType}`, {
            data: {
              candidateId: import.meta.env.VITE_CANDIDATE_ID,
              row: i.toString(),
              column: j.toString(),
            },
          });
          console.log(response);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    //Clean up existing polyanet, comeths and soloons if present.
    cleanExistingEntities("polyanet");
    cleanExistingEntities("soloons");
    cleanExistingEntities("comeths");

    //Adding polynets to the position.
    const addingPolynets = async (_position) => {
      try {
        const response = await axios.post(
          "https://challenge.crossmint.io/api/polyanets",
          {
            candidateId: import.meta.env.VITE_CANDIDATE_ID,
            row: _position[0].toString(),
            column: _position[1].toString(),
          }
        );
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    // Iterate through each position and call the API
    polyanetPositions.forEach(addingPolynets);
  }, []);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
