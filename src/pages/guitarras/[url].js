export default function Guitarra({ guitarra }) {
  //console.log(guitarra[0].attributes.nombre);

  const { nombre, precio, imagen, descripcion } = guitarra[0].attributes;

  return <div>Guitarra</div>;
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

// Esta tiene la desventaja de que tiene que acceder a la API todo el tiempo, caada vez que se accede a la pagina.  Se puede tomar como un ataque a la API.  Por eso se usa getStaticProps.  Pero esta tiene la desventaja de que no se puede usar con datos que cambian constantemente.  Por ejemplo, si se usa un contador, no se podria usar getStaticProps.  Para eso se usa getStaticPaths.

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
