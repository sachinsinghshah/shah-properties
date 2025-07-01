import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative flex items-center">
        <div className="bg-blue-900 h-10 w-10 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <div className="ml-2">
          <span className="text-xl font-bold text-blue-900">Shah</span>
          <span className="text-xl font-bold text-orange-600">Properties</span>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full"></div>
      </div>
    </Link>
  );
}
 