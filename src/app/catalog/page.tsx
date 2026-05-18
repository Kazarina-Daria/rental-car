import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CatalogClient from './Catalog.client';
import TanstackProvider from '../components/TanStackProvider/TanStackProvider';
import { fetchCars } from '../../../lib/api';

export default async function CatalogPage (){
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cars', 1, ''],
    queryFn: () => fetchCars({ page: 1, perPage: 12 }),
  });

  return (
    <TanstackProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </TanstackProvider>
  );
}
