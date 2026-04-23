import { pool } from "../../config/db";
import { Producto } from "./producto.types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ManagerErrors } from "../../shared/errors/AppErrors";
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
      //podemos hacerlo asi o hacer otra consulta buscando x id y devolviendo todo el producto donde coincida con el id
      const ProductoNuevo = await ProductoRepository.getbyid(
        Resultado.insertId,
      );
      return ProductoNuevo;
    }
    throw new ManagerErrors("No se pudo insertar el producto", 400);
  }

  static async edit(Datos: Producto): Promise<Producto> {
    const {
      id,
      nombre,
      precio_costo,
      precio_venta,
      unidad_medida,
      stock_total,
      stock_minimo,
      qr_code,
      id_ubicacion,
      id_categoria,
      id_proveedor,
      ubicacion_sector,
      ubicacion_estanteria,
      ubicacion_posicion,
    } = Datos;
    let idubi = id_ubicacion;
    // 2. Si el producto tiene una ubicación asignada, la actualizamos
    if (id_ubicacion) {
      await pool.query(
        "UPDATE ubicaciones SET sector = ?, estanteria = ?, posicion = ? WHERE id = ?",
        [
          ubicacion_sector || null,
          ubicacion_estanteria || null,
          ubicacion_posicion || null,
          id_ubicacion,
        ],
      );
    } else if (ubicacion_sector) {
      // Si no tenía ID pero el usuario escribió un sector ahora
      const [nuevaUbi]: any = await pool.query(
        "INSERT INTO ubicaciones (sector, estanteria, posicion) VALUES (?, ?, ?)",
        [
          ubicacion_sector,
          ubicacion_estanteria || null,
          ubicacion_posicion || null,
        ],
      );
      idubi = nuevaUbi.insertId;
      // Actualizamos la variable para que el siguiente UPDATE la use
    }

    const [ProEditado] = await pool.query<ResultSetHeader>(
      `UPDATE productos 
      SET 
      nombre=?,
      precio_costo=?,
      precio_venta=?,
      unidad_medida=?,
      stock_total=?,
      stock_minimo=?,
      qr_code=?,
      id_ubicacion=?,
      id_proveedor=?,
      id_categoria=?
       WHERE id = (?)`,
      [
        nombre,
        precio_costo,
        precio_venta,
        unidad_medida,
        stock_total,
        stock_minimo,
        qr_code,
        idubi,
        id_proveedor,
        id_categoria,
        id, // EL ID VA AL FINAL
      ],
    );
    if (ProEditado.affectedRows === 0) {
      throw new ManagerErrors(
        "No se pudo actualizar el productos xq no se encontro",
        404,
      );
    }
    const RenderActualizado = await ProductoRepository.getbyid(id);
    if (!RenderActualizado)
      throw new ManagerErrors(
        "No se pudo actualizar el productos xq no se encontro",
        404,
      );
    return RenderActualizado;
  }

  static async getbyid(id: number): Promise<Producto> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT p.*,c.nombre AS categoria_nombre, pr.nombre AS proveedor_nombre, ubi.sector , ubi.estanteria, ubi.posicion
      FROM productos p 
      LEFT JOIN categoria c ON p.id_categoria = c.id
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
      LEFT JOIN ubicaciones ubi ON p.id_ubicacion = ubi.id
      WHERE p.id=?

      `,
      [id],
    );

    if (rows.length > 0) {
      return rows[0] as Producto;
    }
    throw new ManagerErrors("No se encontro el producto con el id", 404);
  }
}
// ResultSetHeader / OkPacket: Se usan para INSERT/UPDATE. Tienen propiedades como affectedRows, pero no son arrays, por eso no tienen .length.
// RowDataPacket[]: Es el tipo correcto para un SELECT. Indica que recibes una lista de filas, y como es un array, tiene la propiedad .length.
