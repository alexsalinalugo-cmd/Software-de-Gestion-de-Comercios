import { pool } from "../../config/db";
import { Producto } from "./producto.types";
import { ResultSetHeader } from "mysql2";

export class ProductoRepository {
  static async getAll(): Promise<Producto[]> {
    const [rows] = await pool.query(`
      SELECT p.*,c.nombre AS categoria_nombre, pr.nombre AS proveedor_nombre, ubi.sector , ubi.estanteria, ubi.posicion
      FROM productos p 
      LEFT JOIN categoria c ON p.id_categoria = c.id
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
      LEFT JOIN ubicaciones ubi ON p.id_ubicacion = ubi.id


      `);

    return rows as Producto[];
  }
  static async create(datos: Producto): Promise<Producto> {
    const {
      nombre,
      precio_costo,
      precio_venta,
      unidad_medida,
      stock_total,
      stock_minimo,
      qr_code,
      id_categoria,
      id_proveedor,
      categoria_nombre,
      proveedor_cuit,
      proveedor_nombre,
      proveedor_MedioContacto,
      proveedor_NombreContacto,
      proveedor_DiaVisita,
      ubicacion_sector,
      ubicacion_estanteria,
      ubicacion_posicion,
    } = datos;

    //instanciamientos de los id
    let IdUbicacion: number | null = null;
    let IdCategoria: number | null = null;
    let IdProveedor: number | null = null;
    const Qr_code = qr_code === "" ? null : qr_code; // Si el qr_code es una cadena vacía, lo convertimos a null para que la base de datos lo acepte como un valor nulo.
    // se ingreso un sector? si, si se crea una nueva ubicacion
    if (ubicacion_sector) {
      const [Ubicacion_Insert] = await pool.query<ResultSetHeader>(
        "INSERT INTO ubicaciones (sector,estanteria,posicion) VALUES (?,?,?) ",
        [
          ubicacion_sector,
          ubicacion_estanteria || null,
          ubicacion_posicion || null,
        ],
      );
      IdUbicacion = Ubicacion_Insert.insertId;
    }

    //se ingreso un nombre de categoria? si, si se crea una nueva categoria
    if (categoria_nombre) {
      const [categoria_insert] = await pool.query<ResultSetHeader>(
        "INSERT INTO categoria (nombre) VALUES (?) ",
        [categoria_nombre],
      );
      IdCategoria = categoria_insert.insertId; // extraemos el id que se genero y se la damos ala variable para luego
      //poder hacer el insert completo
    } else if (
      id_categoria
    ) // se ingreso id de categoria? si ,si ponemos el id existente a la variable para poder hacer el insert con el id
    // de esa categoria
    {
      IdCategoria = id_categoria;
    }
    //se ingreso un nombre de proveedor? si , si se crea un nuevo proveedor
    if (proveedor_nombre) {
      const [Proveedor_insert] = await pool.query<ResultSetHeader>(
        "INSERT INTO proveedores (cuit,nombre, medio_contacto, nombre_contacto, dia_visita) VALUES(?,?,?,?,?)",

        [
          proveedor_cuit || null,
          proveedor_nombre,
          proveedor_MedioContacto || null,
          proveedor_NombreContacto || null,
          proveedor_DiaVisita || null,
        ],
      );
      IdProveedor = Proveedor_insert.insertId; // extraemos el id que se genero y se la damos ala variable para luego poder hacer el insert completo
    } else if (
      id_proveedor
    ) // se ingreso id de proveedor? si ,si ponemos el id existente a la variable para poder hacer el insert con el id
    {
      IdProveedor = id_proveedor;
    }
    //aca lo mismo destructuracion la respuesta de la base de datos es un array con con 2 elementos el resultado de nuestra consulta
    //y metadatos y como solo nos inporta la primera hacemos [variable] que ocupa el primer indice del array [0,1]
    const [Resultado] = await pool.query<ResultSetHeader>(
      "INSERT INTO productos (nombre,precio_costo,precio_venta,unidad_medida,stock_total,stock_minimo,qr_code,id_ubicacion,id_proveedor,id_categoria) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        precio_costo,
        precio_venta,
        unidad_medida,
        stock_total,
        stock_minimo,
        Qr_code,
        IdUbicacion,
        IdProveedor,
        IdCategoria,
      ],
      // ¿Por qué no ponemos las variables directo en el texto?
      // Si hiciéramos algo como VALUES (${nombre}, ${precio}),
      //  estaríamos dejando la puerta abierta a un ataque llamado Inyección SQL. Alguien podría escribir en el
      // input de nombre algo como "'; DROP TABLE Productos; --" y borrarte toda la base de datos.
      // Los signos de pregunta son parámetros preparados:
      // SQL primero entiende la estructura de la orden: "Voy a insertar 4 cosas".
      // Luego, el driver de MySQL limpia y "desinfecta" los valores que están en el array [] y los pega de forma segura donde están los ?.
    );

    if (Resultado.affectedRows > 0) {
      const ProductoNuevo: Producto = {
        id: Resultado.insertId,
        nombre: nombre,
        precio_costo: precio_costo,
        precio_venta: precio_venta,
        unidad_medida: unidad_medida,
        stock_total: stock_total,
        stock_minimo: stock_minimo,
        qr_code: Qr_code,
        id_ubicacion: IdUbicacion,
        id_proveedor: IdProveedor,
        id_categoria: IdCategoria,
        categoria_nombre,
        proveedor_cuit,
        proveedor_nombre,
        proveedor_MedioContacto,
        proveedor_NombreContacto,
        proveedor_DiaVisita,
        ubicacion_sector,
        ubicacion_estanteria,
        ubicacion_posicion,
      };
      return ProductoNuevo;
    }
    throw new Error("No se pudo insertar el producto");
  }

  static async edit(Datos: Producto): Promise<Producto> {
    const id = Datos.id;
    const [ProductoEditado] = await pool.query<ResultSetHeader>(
      `SELECT * FROM productos WHERE id = (?)`,
      [id],
    );
    //logica
    return;
  }
}
