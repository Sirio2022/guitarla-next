import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import styles from '@/styles/carrito.module.css';

export default function Carrito({
  carrito,
  actualizarCantidad,
  eliminarProducto,
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce((acc, item) => {
      return acc + item.precio * item.cantidad;
    }, 0);
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <Layout
      title="Carrito de compras"
      description="GuitarLA - Carrito de compras"
    >
      <main className="contenedor">
        <h1 className="heading">Carrito de compras</h1>

        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h2>Artículos</h2>

            {carrito.length === 0
              ? 'No hay artículos en el carrito '
              : carrito.map((guitarra) => (
                  <div className={styles.producto} key={guitarra.id}>
                    <div>
                      <Image
                        width={250}
                        height={480}
                        src={guitarra.imagen}
                        alt={guitarra.nombre}
                      />
                    </div>

                    <div>
                      <p className={styles.nombre}>{guitarra.nombre}</p>

                      <div className={styles.cantidad}>
                        <p>Cantidad: {guitarra.cantidad}</p>
                        <select
                          className={styles.select}
                          onChange={(e) =>
                            actualizarCantidad({
                              id: guitarra.id,
                              cantidad: +e.target.value,
                            })
                          }
                          value={guitarra.cantidad}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <p className={styles.precio}>
                        Precio: <span>$ {guitarra.precio}</span>
                      </p>
                      <p className={styles.subtotal}>
                        SubTotal:
                        <span> $ {guitarra.precio * guitarra.cantidad}</span>
                      </p>
                    </div>
                    <button
                      className={styles.eliminar}
                      type="button"
                      onClick={() => eliminarProducto(guitarra.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
          </div>
          <aside className={styles.resumen}>
            <h3>Resumen del pedido</h3>
            <p>Total a pagar: $ {total}</p>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
