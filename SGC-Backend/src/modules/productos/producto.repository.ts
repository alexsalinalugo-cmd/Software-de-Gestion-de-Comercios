import { pool } from "../../config/db";
import { CrearProducto, Producto } from "./producto.types";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PoolConnection } from "mysql2/promise";

import { ManagerErrors } from "../../shared/errors/AppErrors";
export class ProductoRepository {
  static async getAll(): Promise<Producto[]> {
    const [rows] = await pool.query(`
      SELECT p.*,mr.id AS id_marca ,mr.nombre AS marca_nombre,
      c.id AS id_categoria,c.nombre AS categoria_nombre,
      pr.id AS id_proveedor,pr.razon_social AS proveedor_razon_social,
      ubi.sector , ubi.estanteria, ubi.posicion
      FROM productos p 
      LEFT JOIN categorias c ON p.id_categoria = c.id
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
      LEFT JOIN ubicaciones ubi ON p.id_ubicacion = ubi.id
      LEFT JOIN marcas mr ON p.id_marca = mr.id 
     
      WHERE p.activo = 1
      
      `);

    return rows as Producto[];
  }
  static async create(
    conexion: PoolConnection,
    datos: CrearProducto,
  ): Promise<number> {
    const {
      nombre,
      precio_costo,
      precio_venta,
      unidad_medida,
      stock_total,
      stock_minimo,
      codigo_barra,
      id_categoria,
      id_proveedor,
      id_ubicacion,
      id_marca,
    } = datos;

    const Qr_code = codigo_barra === "" ? null : codigo_barra; // Si el qr_code es una cadena vacía, lo convertimos a null para que la base de datos lo acepte como un valor nulo.

    //aca lo mismo destructuracion la respuesta de la base de datos es un array con con 2 elementos el resultado de nuestra consulta
    //y metadatos y como solo nos inporta la primera hacemos [variable] que ocupa el primer indice del array [0,1]
    const [Resultado] = await conexion.execute<ResultSetHeader>(
      `INSERT INTO productos 
      (nombre, precio_costo, precio_venta, unidad_medida, stock_total, stock_minimo, codigo_barra,id_marca,id_ubicacion, id_proveedor, id_categoria ) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nombre,
        precio_costo,
        precio_venta,
        unidad_medida,
        stock_total,
        stock_minimo,
        Qr_code ?? null, // Si es undefined, pasa null
        id_marca ?? null,
        id_ubicacion ?? null, // Si es undefined, pasa null
        id_proveedor ?? null, // Si es undefined, pasa null
        id_categoria ?? null, // Si es undefined, pasa null
      ],
    );

    if (Resultado.affectedRows > 0) {
      return Resultado.insertId;
    }
    throw new ManagerErrors("No se pudo insertar el producto", 400);
  }

  static async insertarStock(
    conexion: PoolConnection,
    idPro: number,
    stock: number,
  ): Promise<void> {
    const [res]: any = await conexion.execute(
      " INSERT INTO stock_lotes (id_producto,cantidad_inicial,cantidad_actual) VALUES (?,?,?) ",
      [idPro, stock, stock],
    );
  }

  static async getbyid(
    conexion: PoolConnection,
    id: number,
  ): Promise<Producto> {
    const [rows] = await conexion.execute<RowDataPacket[]>(
      `
      SELECT p.*,
      mr.id AS id_marca ,mr.nombre AS marca_nombre,
      c.nombre AS categoria_nombre,
      pr.razon_social AS proveedor_razon_social, 
      ubi.sector , ubi.estanteria, ubi.posicion
      FROM productos p 
      LEFT JOIN categorias c ON p.id_categoria = c.id
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
      LEFT JOIN ubicaciones ubi ON p.id_ubicacion = ubi.id
      LEFT JOIN marcas mr ON p.id_marca = mr.id 
      WHERE p.id=?

      `,
      [id],
    );

    if (rows.length > 0) {
      return rows[0] as Producto;
    }
    throw new ManagerErrors("No se encontro el producto con el id", 404);
  }

  static async Desactivar(id: number): Promise<boolean> {
    const [DesactivarQuery] = await pool.query<ResultSetHeader>(
      `
     UPDATE productos SET activo = 0 WHERE id = ?
      `,
      [id],
    );
    if (DesactivarQuery.affectedRows === 0) {
      throw new ManagerErrors("No se encontro el producto con el id", 404);
    }
    return true;
  }

  static async edit(
    conexion: PoolConnection,
    Datos: Producto,
  ): Promise<number> {
    const {
      id,
      nombre,
      precio_costo,
      precio_venta,
      unidad_medida,
      stock_total,
      stock_minimo,
      codigo_barra,
      id_marca,
      id_ubicacion,
      id_proveedor,
      id_categoria,
    } = Datos;
    const Qr_code = codigo_barra === "" ? null : codigo_barra;
    const [ProEditado] = await conexion.execute<ResultSetHeader>(
      `UPDATE productos 
     SET 
     nombre = ?,
     precio_costo = ?,
     precio_venta = ?,
     unidad_medida = ?,
     stock_total = ?,
     stock_minimo = ?,
     codigo_barra = ?,
     id_marca = ?,
     id_ubicacion = ?,
     id_proveedor = ?,
     id_categoria = ?
     WHERE id = ?`,
      [
        nombre,
        precio_costo,
        precio_venta,
        unidad_medida,
        stock_total,
        stock_minimo,
        Qr_code,
        id_marca ?? null,
        id_ubicacion ?? null,
        id_proveedor ?? null,
        id_categoria ?? null,
        id,
      ],
    );

    if (ProEditado.affectedRows === 0) {
      throw new ManagerErrors(
        "No se pudo actualizar el productos xq no se encontro",
        404,
      );
    }
    return id;
  }

  static async ActualizarStock(
    conexion: PoolConnection,
    idPro: number,
    stock: number,
  ): Promise<void> {
    const [res]: any = await conexion.execute(
      " UPDATE stock_lotes SET cantidad_inicial=? ,cantidad_actual=? WHERE id_producto=?  ORDER BY id ASC LIMIT 1",
      [stock, stock, idPro],
    );
  }
}
