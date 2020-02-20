import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../../services/page.service';

@Component({
  selector: 'app-frm-publication',
  templateUrl: './frm-publication.component.html',
  styleUrls: ['./frm-publication.component.css']
})
export class FrmPublicationComponent implements OnInit {
  public imgFile: File;
  public videoFile: File;
  public imgUrl: any;
  public publication: any;
  public videoUrl: any;

  @Output() publicationEmitter = new EventEmitter();
  @Input() pageId !: any;
  constructor(public pageService: PageService) {
    this.publication = {
      text: ''
    };
  }

  ngOnInit() {
  }

  previewImage(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.imgFile = event.target.files[0];
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = ($event) => {
      this.imgUrl = reader.result;
    };

  }

  onSelectFile(event) {
    this.videoFile = event.target.files && event.target.files[0];
    if (this.videoFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.videoFile);
      reader.onload = ($event) => {
        this.videoUrl = (<FileReader>$event.target).result;
      };
    }
  }

  addPublication(publicationForm: NgForm) {
    if (!this.publication.text && !this.imgFile && !this.videoFile) {
      return;
    }

    const formData = new FormData();
    if (this.imgFile) {
      formData.append('image', this.imgFile);
    } else if (this.videoFile) {
      formData.append('image', this.videoFile);
    }

    formData.append('text', this.publication.text);
    formData.append('page', this.pageId);

    this.pageService.publish(formData).subscribe(res => {
      if (res.ok) {
        this.resetForm(publicationForm);
        this.publicationEmitter.emit(true);
      }
    }, err => {
      console.log(err);
    });
  }

  resetForm(publicationForm: NgForm) {
    this.imgFile = null;
    this.imgUrl = null;
    this.videoUrl = null;
    this.videoFile = null;
    publicationForm.reset();
  }


}
