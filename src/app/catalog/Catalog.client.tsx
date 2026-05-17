"use client";

import { useEffect, useState, useMemo} from "react";
import { fetchCarBrand, fetchCars } from "../../../lib/api";
import { Filter } from "../components/Filter/Filter";
import {  FormValues } from "../../../types/car";
import { CarList } from "../components/CarList/CarList";
import { toast, Zoom } from "react-toastify/unstyled";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function Catalog() {
  const [brands, setBrands] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);
  const [filters, setFilters] = useState<FormValues>({});

  const LIMIT = 12;


  useEffect(() => {
    fetchCarBrand()
      .then((data) => {
        setBrands(data.brands);
        const generatedPrices = [];
 
        for(let i = data.price.min; i <= data.price.max; i+= 10){
          generatedPrices.push(i);
        }
        setPrices(generatedPrices);
      })
      .catch((error) => console.error("Error fetching car brands:", error));
  }, []);

const { data, isLoading, hasNextPage,fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["cars", filters],
  initialPageParam: 1,
    queryFn: async ({pageParam}) =>{
      return fetchCars({
        brand: filters.brand || undefined,
        price: filters.price
          ? Number(filters.price)
          : undefined,
        minMileage: filters.minMileage || undefined,
        maxMileage: filters.maxMileage || undefined,
        page : pageParam,
        perPage: LIMIT
      });
  } ,

  getNextPageParam : (lastPage, allPages) => {
    if(lastPage.cars.length < LIMIT){
      return undefined;
    }
    return allPages.length + 1;
  },
});
 const cars = useMemo(()=> {
  return data?.pages.flatMap((page) => page.cars) ?? [];
 }, [data]) ;

useEffect(() => {
  if (
    !isLoading &&
    data &&
    cars.length === 0
  ) {
    toast.info("No cars found", {
      transition: Zoom,
      theme: "dark",
    });
  }
}, [cars, data, isLoading]);

const hasMore = hasNextPage;

  const handleFilterSubmit = async (newFilters: FormValues) => {
    setFilters(newFilters); 
  };


  const handleLoadMore = async () => {
    fetchNextPage();
  };

  return (
    <>
      <Filter brands={brands} prices={prices} onSubmit={handleFilterSubmit} />
      
      <CarList 
        items={cars} 
        handleLoad={handleLoadMore} 
        isButton={hasMore} 
        fetching={isFetchingNextPage} 
      />
    </>
  );
}