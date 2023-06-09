import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/guitarras.module.css';
import Layout from '@/components/layout';

export default function Guitarra({ guitarra, agregarCarrito }) {
  //console.log(guitarra[0].attributes.nombre);

  const [cantidad, setCantidad] = useState(0);

  const { nombre, precio, imagen, descripcion } = guitarra[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidad === 0) {
      alert('Debes seleccionar una cantidad');
      return;
    }

    // Construir el objeto
    const guitarraSeleccionada = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };

    // Pasarlo al componente al context de Next.  Este tiene su propio state.  Se puede acceder a el desde cualquier componente.
    agregarCarrito(guitarraSeleccionada);

  };

  return (
    <Layout
      title={`Guitarra ${nombre}`}
      description={`Guitarra ${nombre} con precio de ${precio}`}
    >
      <div className={styles.guitarra}>
        <Image
          src={imagen.data.attributes.url}
          width={600}
          height={400}
          alt={`Imagen de la ${nombre}`}
        />

        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>

          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label htmlFor="cantidad">Cantidad: {cantidad}</label>

            <select
              id="cantidad"
              onChange={(e) => setCantidad(+e.target.value)}
            >
              <option value="0">-- Seleccione --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <input type="submit" value="Agregar al carrito" />
          </form>
        </div>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps({ query: { url } }) {
//   const respuesta = await fetch(
//     `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
//   );
//   const { data: guitarra } = await respuesta.json();

//   return {
//     props: {
//       guitarra,
//     },
//   };
// }

// Esta tiene la desventaja de que tiene que acceder a la API todo el tiempo, cada vez que se accede a la pagina.  Se puede tomar como un ataque a la API.  Por eso se usa getStaticProps.  Pero esta tiene la desventaja de que no se puede usar con datos que cambian constantemente.  Por ejemplo, si se usa un contador, no se podria usar getStaticProps.  Para eso se usa getStaticPaths.

export async function getStaticPaths() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
  const { data: guitarras } = await respuesta.json();

  const paths = guitarras.map((guitarra) => ({
    params: { url: guitarra.attributes.url },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { url } }) {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
  );
  const { data: guitarra } = await respuesta.json();

  return {
    props: {
      guitarra,
    },
  };
}
