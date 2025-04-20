import Providers from '@/providers/Providers';
import RouterProvider from '@/providers/RouterProvider';

export default function App() {
  return (
    <Providers>
      <RouterProvider />
    </Providers>
  );
}
