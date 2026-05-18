"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { bookingRequest, BookingResponse } from "../../../../lib/api";
import { BookingRequest } from "../../../../types/bookingModal";
import { type Car } from "../../../../types/car";
import BookingModal from "../../components/BookingModal/BookingModal";
import css from "./page.module.css";

interface CarDetailsClientProps {
  car: Car;
  carId: string;
}

export default function CarDetailsClient({
  car,
  carId,
}: CarDetailsClientProps) {
  const mileage = car.mileage.toLocaleString() + " km";
  const city = car.location.city;
  const country = car.location.country;

  const mutation = useMutation<
    BookingResponse,
    AxiosError<{ message?: string }>,
    BookingRequest
  >({
    mutationFn: (values: BookingRequest) => bookingRequest(carId, values),
    onSuccess: (data) => {
      toast.success(data.message || "Booking request created!");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data ? JSON.stringify(err.response.data) : undefined) ||
        err.message ||
        "Invalid request.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (values: BookingRequest, resetForm: () => void) => {
    try {
      await mutation.mutateAsync(values);
      resetForm();
    } catch {
      // Error handled in onError
    }
  };

  return (
    <section className={css.sectionId}>
      <div className={css.leftSide}>
        <div className={css.imgBox}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            loading="eager"
          />
        </div>

        <BookingModal onSubmit={onSubmit} id={carId} />
      </div>

      <div>
        <div className={css.rightSide}>
          <div className={css.brandBox}>
            <p className={css.brand}>
              <span>
                {car.brand} {car.model}, {car.year}
              </span>
              <span className={css.id}>id {car.id}</span>
            </p>
            <p className={css.location}>
              <svg width={12} height={15}>
                <use href="/sprite.svg#icon-Location"></use>
              </svg>
              <span className={css.city}>
                {city}
                {country ? `, ${country}` : ""}
              </span>
              <span className={css.mileage}>Mileage: {mileage}</span>
            </p>
            <p className={css.price}>${car.rentalPrice}</p>
            <p className={css.text}>{car.description}</p>
          </div>

          <div className={css.conditionBox}>
            <p className={css.title}>Rental Conditions:</p>
            <ul className={css.conditionList}>
              {car.rentalConditions.map((condition) => (
                <li className={css.item} key={condition}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  <span className={css.text}>{condition}</span>
                </li>
              ))}
            </ul>
            <hr className={css.lines} />
          </div>

          <div className={css.specificationsBox}>
            <p className={css.title}>Car Specifications:</p>
            <ul className={css.list}>
              <li className={css.item}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-calendar"></use>
                </svg>
                <span className={css.text}>Year: {car.year}</span>
              </li>
              <li className={css.item}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-car"></use>
                </svg>
                <span className={css.text}>Type: {car.type}</span>
              </li>
              <li className={css.item}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-fuel-pump"></use>
                </svg>
                <span className={css.text}>
                  Fuel Consumption: {car.fuelConsumption}
                </span>
              </li>
              <li className={css.item}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-gear"></use>
                </svg>
                <span className={css.text}>Engine: {car.engine}</span>
              </li>
            </ul>
            <hr className={css.lines} />
          </div>

          <div className={css.featuresBox}>
            <p className={css.title}>Accessories and functionalities:</p>
            <ul className={css.list}>
              {car.features.map((feature) => (
                <li className={css.item} key={feature}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  <span className={css.text}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
