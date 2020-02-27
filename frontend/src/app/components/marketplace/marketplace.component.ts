import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MarketplaceService } from "../../services/marketplace.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.css"]
})
export class MarketplaceComponent implements OnInit {
  userLogin = {
    usuario_id: ""
  };

  verVentas = false;
  verGuardadas = false;

  catfiltro = 0;

  search = "";

  venta = {
    venta_nombre: "",
    venta_detalle: "",
    venta_precio: "",
    venta_url: "",
    venta_estado: true,
    categ_id: 0,
    usuario_id: ""
  };

  constructor(
    private marketplace: MarketplaceService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ventasUsuario: Array<Object> = [];
  categorias: Array<Object> = [];
  ventasFiltradas: Array<Object> = [];
  ventasGuardadas: Array<Object> = [];

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    }
    this.getVentas();
    this.getCategorias();
  }

  addVenta() {
    if (
      this.venta.categ_id &&
      this.venta.venta_nombre &&
      this.venta.venta_precio &&
      this.venta.venta_detalle
    ) {
      this.venta.usuario_id = this.userLogin.usuario_id;
      this.venta.categ_id = parseInt(this.venta.categ_id.toString());
      this.marketplace.registerVenta(this.venta).subscribe(
        res => {
          this.clear();
          this.getVentas();
          this.showAlert("Artículo en venta");
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  buscarVenta() {
    this.marketplace.getVentas().subscribe(res => {
      this.ventasFiltradas = res.filter(
        ({ venta_nombre, venta_detalle }) =>
          venta_nombre.toUpperCase().match(this.search.toUpperCase()) ||
          venta_detalle.toUpperCase().match(this.search.toUpperCase())
      );
    });
  }

  saveVenta(id) {
    this.marketplace.getGuardadas(this.userLogin.usuario_id).subscribe(res => {
      const validar = res.map(({ venta_id }) => venta_id).indexOf(id);
      if (validar === -1) {
        this.marketplace
          .saveVenta({
            venta_id: id,
            usuario_id: this.userLogin.usuario_id
          })
          .subscribe(res => {
            this.showAlert("Artículo guardado");
          });
      } else {
        this.toastr.error("El artículo ya está guardado", "Marketplace", {
          positionClass: "toast-top-right"
        });
      }
    });
  }

  getVentas() {
    document.getElementById("verTodo").classList.add("active");
    this.filtrarVentas(0);
  }

  getCategorias() {
    this.marketplace.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo !== "error") {
        this.userLogin = res;
      }
    });
  }

  filtrarVentas(id) {
    if (id === 0) {
      this.marketplace.getVentas().subscribe(res => {
        this.ventasFiltradas = res;
      });
    } else {
      document.getElementById("verTodo").classList.remove("active");
      this.marketplace.getVentas().subscribe(res => {
        this.ventasFiltradas = res.filter(({ categ_id }) => categ_id === id);
      });
    }
  }

  verVentasUsuario() {
    this.marketplace
      .getVentasUsuario(this.userLogin.usuario_id)
      .subscribe(res => {
        this.ventasUsuario = res;
        this.verVentas = true;
      });
  }

  verVentasGuardadas() {
    this.marketplace.getGuardadas(this.userLogin.usuario_id).subscribe(res => {
      this.ventasGuardadas = res;
      this.verGuardadas = true;
    });
  }

  clear() {
    let modal = document.getElementById("agregarVenta");
    let backdrop = document.getElementsByClassName("modal-backdrop")[0];

    backdrop.id = "backdrop";

    this.venta.venta_nombre = "";
    this.venta.venta_detalle = "";
    this.venta.venta_precio = "";
    this.venta.venta_url = "";
    this.venta.venta_estado = true;
    this.venta.categ_id = 0;
    this.venta.usuario_id = "";

    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    document.getElementById("backdrop").classList.remove("show");
    document.getElementById("backdrop").style.display = "none";
  }

  showAlert(text) {
    this.toastr.success(text, "Marketplace", {
      positionClass: "toast-top-right"
    });
  }
}
