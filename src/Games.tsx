import React from "react";
import { useQuery } from "react-query";
import { Game, conn } from "./conn";

function Games() {
  const { isLoading, data } = useQuery("games", () =>
    conn.collection("games").getFullList<Game>()
  );

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>Games</div>
      <ul>
        {data.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Games;
