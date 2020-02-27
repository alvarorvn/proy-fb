import { Component, OnInit, Input } from "@angular/core";
import { MarketplaceService } from "../../services/marketplace.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-ver-ventas",
  templateUrl: "./ver-ventas.component.html",
  styleUrls: ["./ver-ventas.component.css"]
})
export class VerVentasComponent implements OnInit {
  editando = false;

  eliminar = {
    venta_id: 0
  };

  userLogin = {
    usuario_id: ""
  };

  venta = {
    venta_id: 0,
    venta_nombre: "",
    venta_detalle: "",
    venta_precio: "",
    venta_url: "",
    categ_id: 0,
    usuario_id: 0
  };

  @Input()
  ventasUsuario: Array<Object> = [];
  @Input()
  categorias: Array<Object> = [];
  constructor(
    private marketplace: MarketplaceService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    }
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo !== "error") {
        this.userLogin = res;
      }
    });
  }

  editarVenta() {
    if (
      this.venta.venta_nombre &&
      this.venta.venta_detalle &&
      this.venta.venta_precio &&
      this.venta.venta_url &&
      this.venta.categ_id
    ) {
      this.marketplace.updateVenta(this.venta).subscribe(res => {
        this.editando = false;
        this.marketplace
          .getVentasUsuario(this.venta.usuario_id)
          .subscribe(res => {
            this.ventasUsuario = res;
            this.clear();
            this.showAlert("Venta editada");
          });
      });
    }
  }

  eliminarVenta() {
    this.marketplace.deleteVenta(this.eliminar.venta_id).subscribe(res => {
      this.marketplace
        .getVentasUsuario(this.userLogin.usuario_id)
        .subscribe(res => {
          this.ventasUsuario = res;
          this.showAlert("Venta eliminada");
        });
    });
  }

  setVenta(venta) {
    this.venta.venta_id = venta.venta_id;
    this.venta.venta_nombre = venta.venta_nombre;
    this.venta.venta_detalle = venta.venta_detalle;
    this.venta.venta_url = venta.venta_url;
    this.venta.venta_precio = venta.venta_precio;
    this.venta.categ_id = venta.categ_id;
    this.venta.usuario_id = venta.usuario_id;
    this.editando = true;
  }

  clear() {
    this.venta.venta_id = 0;
    this.venta.venta_nombre = "";
    this.venta.venta_detalle = "";
    this.venta.venta_precio = "";
    this.venta.venta_url = "";
    this.venta.usuario_id = 0;
    this.venta.categ_id = 0;
  }

  showAlert(text) {
    this.toastr.success(text, "Marketplace", {
      positionClass: "toast-top-right"
    });
  }
}
