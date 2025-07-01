interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "emerald" | "teal" | "blue";
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "emerald",
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    emerald: "border-emerald-500",
    teal: "border-teal-500",
    blue: "border-blue-500",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
      ></div>
      {text && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}
