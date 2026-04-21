export interface Producto {
  id: number;
  nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_total: number;
  stock_minimo: number;
  qr_code: string | null;
  id_ubicacion: number | null;
  id_proveedor: number | null;
  id_categoria: number;
}

export interface CrearProducto {
  nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_minimo: number;
  qr_code?: string | null;
  id_ubicacion?: number | null;
  id_proveedor?: number | null;
  id_categoria: number;
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
