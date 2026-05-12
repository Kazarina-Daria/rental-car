import axios from 'axios';
import {type Car} from '../types/car';

const BASE_URL ="https://car-rental-api.goit.global";

export interface FetchCarsResponse {
  cars: Car[];
 totalPages : number;
 totalCars : number;
 page : number;
}

export interface FetchCarsParams {
  brand?: string;
  rentalPrice?:number;
  page?: number;
  limit?: number;
}

export const fetchCars = async (params?: FetchCarsParams): Promise<FetchCarsResponse> => {
const res = await axios.get<FetchCarsResponse>(`${BASE_URL}/cars`, { params });
return res.data;
}

export const fetchCarById = async (id: string): Promise<Car> => {
  const res = await axios.get<Car>(`${BASE_URL}/cars/${id}`);
  return res.data;
};

export const fetchCarBrand = async (): Promise<string[]> => {
  const res = await axios.get<string[]>(`${BASE_URL}/brands`);
  return res.data;
}