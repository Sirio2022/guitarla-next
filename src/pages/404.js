import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Pagina404() {
  const router = useRouter();
  return (
    <>
      <Layout
        title="Página no encontrada"
        description="GuitarLA - Página no encontrada error 404"
      >
        <p className="error">Pagina no encontrada error 404</p>
        <Link className="error-enlace" href="/">
          Volver al inicio
        </Link>
      </Layout>
    </>
  );
}
