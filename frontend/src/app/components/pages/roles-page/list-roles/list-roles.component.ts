import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from "../../../../services/page.service";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  @Input() pageId !: any;
  @Input() rolesList !: any;
  @Output() rolEmitter = new EventEmitter();
  constructor(public pageService: PageService, private alert: AlertService) { }

  ngOnInit() {

  }

  deleteRol(userId) {
    if (! window.confirm('¿Está seguro que desea eliminar este rol?')) {
      return;
    }
    this.pageService.removeRol(this.pageId, userId).subscribe(res => {
        if (res.ok) {
          this.alert.success(res.message);
          this.rolEmitter.emit(true);
        }
    }, err => {
        if (err.error) {
          this.alert.error(err.error.message);
        }
    });
  }
}
