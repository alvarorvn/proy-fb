import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MarketplaceService } from "../../services/marketplace.service";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-ver-guardados",
  templateUrl: "./ver-guardados.component.html",
  styleUrls: ["./ver-guardados.component.css"]
})
export class VerGuardadosComponent implements OnInit {
  eliminar = {
    venta_id: 0
  };

  userLogin = {
    usuario_id: ""
  };

  @Input()
  ventasGuardadas: Array<Object> = [];

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

  eliminarVentaGuardada() {
    this.marketplace.deleteGuardada(this.eliminar.venta_id).subscribe(res => {
      this.marketplace
        .getGuardadas(this.userLogin.usuario_id)
        .subscribe(res => {
          this.ventasGuardadas = res;
        });
      this.toastr.success("Venta eliminada", "Marketplace", {
        positionClass: "toast-top-right"
      });
    });
  }
}
