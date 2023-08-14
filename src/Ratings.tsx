import React from "react";
import { useRatings } from "./hooks/use-ratings";
import {ordinal} from "openskill";

function Ratings()
{
    const {ratings, isLoading} = useRatings();

    if (isLoading || ratings === undefined) {
        return <div>loading ratings...</div>;
      }

    return (
        <div>
            <h1>Ratings</h1>
            <ul>
                {ratings.map(r => <li>{r.playerName}: {r.rating} ({r.wins} wins / {r.losses} losses, {r.wins + r.losses} total)</li>)}
            </ul>
        </div>
    );
}

export default Ratings;
