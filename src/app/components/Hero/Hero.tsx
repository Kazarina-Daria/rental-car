import Link from "next/link";
import css from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={css.heroSection}>
        <Image src="/car-hero.jpg" alt="Rental Car" className={css.heroImage} fill priority/>
      <div className={css.heroContainer}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <p className={css.heroDescription}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={css.heroButton}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
