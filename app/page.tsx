import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Victory Points</h1>
      <Link href="games">Browse Games</Link>
    </main>
  );
}
