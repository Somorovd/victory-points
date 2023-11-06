import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 mt-4">
      <div>
        <Link href="/games">
          <button className="bg-blue-800 text-white p-4 box-border">
            Browse Games
          </button>
        </Link>
      </div>
    </div>
  );
}
