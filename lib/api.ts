import axios from 'axios';
import {type Car} from '../types/car';
import { type BookingRequest } from '../types/bookingModal';

const BASE_URL ="https://car-rental-api.goit.study";

export interface FetchCarsResponse {
  cars: Car[];
 totalPages : number;
 totalCars : number;
 page : number;
}

export interface FetchCarsParams {
  brand?: string;
  price?:number;
  page?: number;
  perPage?: number;
  minMileage?: string;
  maxMileage?: string;
}


export interface fetchBrandsAndPrices{
  brands : string[];
  price : {
    min : number,
    max : number,
  }
}


export const fetchCars = async (params?: FetchCarsParams): Promise<FetchCarsResponse> => {
const res = await axios.get<FetchCarsResponse>(`${BASE_URL}/cars`, { params });
return res.data;
}

export const fetchCarById = async (id: string): Promise<Car> => {
  const res = await axios.get<Car>(`${BASE_URL}/cars/${id}`);
  return res.data;
};

export const fetchCarBrand = async (): Promise<fetchBrandsAndPrices> => {
  const res = await axios.get<fetchBrandsAndPrices>(`${BASE_URL}/cars/filters`);
  return res.data;
}

export interface BookingResponse {
  message: string;
  booking?: BookingRequest;
}

export const bookingRequest = async (
  carId: string,
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const res = await axios.post<BookingResponse>(
    `${BASE_URL}/cars/${carId}/booking-requests`,
    bookingData
  );
  return res.data;
}