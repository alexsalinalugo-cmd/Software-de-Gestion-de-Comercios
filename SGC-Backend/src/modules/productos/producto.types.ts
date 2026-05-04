export interface Producto {
  id: number;
  nombre: string;
  id_marca: number;
  marca_nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_total: number;
  stock_minimo: number;
  codigo_barra: string | null;
  id_ubicacion: number | null;
  id_proveedor: number | null;
  id_categoria: number | null;
  categoria_nombre: string;
  proveedor_razon_social: string;
  ubicacion_sector: string;
  ubicacion_estanteria: string;
  ubicacion_posicion: string;
  nombre_atributo: string;
  valor_atributo: string;
}

export interface CrearProducto {
  nombre: string;
  id_marca: number | null;
  marca_nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_minimo: number;
  stock_total: number;
  codigo_barra?: string | null;
  id_ubicacion: number | null;
  id_proveedor?: number | null;
  id_categoria?: number;
  categoria_nombre: string;
  proveedor_razon_social: string;
  ubicacion_sector: string;
  ubicacion_estanteria: string;
  ubicacion_posicion: string;
  nombre_atributo: string;
  valor_atributo: string;
}

/* 
Define la estructura de un producto en el sistema.

No es la base de datos, sino una representación en TypeScript
para asegurar que los datos que usamos en el código tengan la forma correcta.

Ayuda a:
- evitar errores
- mantener consistencia entre capas (controller, service, repository)
- validar datos antes de enviarlos o procesarlos
*/
