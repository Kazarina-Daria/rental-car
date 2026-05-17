"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <div className={css.headerContainer}>
        <div className={css.logo}>
          <Link href="/">
            <svg width={102} height={16}>
              <use href="/sprite.svg#icon-Logo"></use>
            </svg>
          </Link>
        </div>
        <nav>
          <ul className={css.navList}>
            <li className={css.navLink}>
              <Link
                href="/"
                className={pathname === "/" ? css.linkActive : css.navLink}
              >
                Home
              </Link>
            </li>
            <li className={css.navLink}>
              <Link
                href="/catalog"
                className={
                  pathname.startsWith("/catalog") ? css.linkActive : css.navLink
                }
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
