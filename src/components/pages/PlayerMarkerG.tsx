export function PlayerMarkerG({ color }: { color?: string }) {
  if (color === "red")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-red-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "green")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-green-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "blue")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-blue-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "yellow")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-yellow-600"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "black")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-gray-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );

  return null;
}
