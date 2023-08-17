import React from "react";

export function FullLoading() {
  return (
    <div className="w-full flex justify-center h-screen fixed left-0 right-0 top-0 items-center backdrop-blur-lg bg-background bg-opacity-40">
      <Loading />
    </div>
  );
}

export const Loading = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 44 44"
    className={`stroke-orange-500 svg-loaders-svg${
      className ? ` ${className}` : ""
    }`}
    {...props}
  >
    <g fill="none" fillRule="evenodd" strokeWidth={2}>
      <circle cx={22} cy={22} r={1}>
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={22} cy={22} r={1}>
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);
