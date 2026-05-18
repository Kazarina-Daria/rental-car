import type { Metadata } from "next";
import { fetchCarById } from "../../../../lib/api";
import CarDetailsClient from "./CarDetailsClient";

export const metadata: Metadata = {
  title: "Car Details",
  description: "Detail for this specific car",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarId({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  return (
    <>
      <CarDetailsClient car={car} carId={id} />;
    </>
  );
}
