import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MarketplaceService {
  URL: string = "http://localhost:3000/marketplace";
  constructor(private http: HttpClient) {}

  getVentas() {
    return this.http.get<any>(`${this.URL}`);
  }

  getGuardadas(id) {
    return this.http.get<any>(`${this.URL}/guardadas/${id}`);
  }

  getVentasUsuario(id) {
    return this.http.get<any>(`${this.URL}/ventas/${id}`);
  }

  getCategorias() {
    return this.http.get<any>(`${this.URL}/categorias`);
  }

  registerVenta(venta) {
    return this.http.post<any>(`${this.URL}/register`, venta);
  }

  saveVenta(venta) {
    return this.http.post<any>(`${this.URL}/save`, venta);
  }

  updateVenta(venta) {
    return this.http.put<any>(`${this.URL}/update`, venta);
  }

  deleteVenta(id) {
    return this.http.delete<any>(`${this.URL}/delete/${id}`);
  }

  deleteGuardada(id) {
    return this.http.delete<any>(`${this.URL}/guardadas/delete/${id}`);
  }
}
