export function PlayerMarker({ color }: { color?: string }) {
  if (color === "red")
    return <div className="bg-red-700 w-4 h-4 rounded"></div>;
  if (color === "green")
    return <div className="bg-green-700 w-4 h-4 rounded"></div>;
  if (color === "blue")
    return <div className="bg-blue-700 w-4 h-4 rounded"></div>;
  if (color === "yellow")
    return <div className="bg-yellow-600 w-4 h-4 rounded"></div>;
  if (color === "black")
    return <div className="bg-gray-400 w-4 h-4 rounded"></div>;

  return <div className="border border-white w-4 h-4 rounded"></div>;
}
