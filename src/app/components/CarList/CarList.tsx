"use client";

import { useState } from "react";
import css from "./CarList.module.css";
import { type Car } from "../../../../types/car";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarListProps {
  items: Car[];
  handleLoad: () => void;
  isButton: boolean; 
  fetching: boolean; 
}

export const CarList = ({ items, handleLoad, isButton, fetching }: CarListProps) => {
    const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className={css.carListSection}>
      <div className={css.carListContainer}>
        <ul className={css.list}>
          {items.map((car) => {
            const city = car.location.city;
            const country = car.location.country;
            const mileage = car.mileage ? car.mileage.toLocaleString() + " km" : "0 km";
            const isFavorite = Boolean(favoriteIds[car.id]);

            return (
              <li key={car.id} className={css.card}>
                <div className={css.imgWrapper}>
                  <button
                    type="button"
                    className={css.favoriteBtn}
                    onClick={() => toggleFavorite(car.id)}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg width={24} height={24}>
                      <use href={`/sprite.svg#${isFavorite ? "icon-heart-blue" : "icon-heart-white"}`} />
                    </svg>
                  </button>
                  <Image 
                    src={car.img} 
                    alt={`${car.brand} ${car.model}`} 
                    className={css.img} 
                    width={276} 
                    height={268}
                  />
                </div>

                <div className={css.header}>
                  <h2 className={css.title}>
                    {car.brand} <span className={css.accent}>{car.model}</span>, {car.year}
                  </h2>
                  <span className={css.price}>${car.rentalPrice}</span>
                </div>

                <div className={css.description}>
                  <p className={css.textLine}>
                    {city} | {country} | {car.rentalCompany} | {car.type}
                  </p>
                  <p className={css.textLine}>
                    {car.model} | {mileage}
                  </p>
                </div>    
                  <button className={css.button} type="button" onClick = {() => router.push(`/catalog/${car.id}`)}>Read more</button>
              </li>
            );
          })}
        </ul>
      </div>

      {isButton && (
        <div className={css.LoadMore}>
          <button 
            type="button" 
            onClick={handleLoad} 
            disabled={fetching} 
            className={css.loadMoreBtn}
          >
            {fetching ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  );
};