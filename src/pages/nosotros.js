/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Layout from '@/components/layout';
import styles from '@/styles/nosotros.module.css';

export default function Nosotros() {
  return (
    <Layout
      title={'Nosotros'}
      description="GuitaLA - Acerca de nosotros, venta de guitarras, blog de música y más"
    >
      <main className="contenedor">
        <h2 className="heading">Sobre Nosotros</h2>
        <div className={styles.contenido}>
          <Image
            src="/img/nosotros.jpg"
            alt="Imagen sobre nosotros"
            width={1000}
            height={800}
          />
          <div>
            <p>
              Quisque ultrices risus tristique ligula volutpat, ut iaculis diam
              porttitor. Nunc at ligula nec nisi molestie laoreet id eget justo.
              Mauris ut molestie mauris, quis vehicula elit. Pellentesque
              pharetra nunc vel erat placerat finibus. Morbi nec ligula et felis
              bibendum rhoncus. Etiam congue, ligula in tincidunt aliquet,
              lectus eros elementum odio, vel luctus arcu arcu in lectus. Nullam
              dictum tellus justo, quis commodo dolor ullamcorper sed.
            </p>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
