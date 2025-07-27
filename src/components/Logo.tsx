import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="Shah Properties logo"
        width={90}
        height={90}
        priority
        className="h-10 w-10 object-contain"
      />
      <span className="sr-only">Shah Properties</span>
    </Link>
  );
}
 