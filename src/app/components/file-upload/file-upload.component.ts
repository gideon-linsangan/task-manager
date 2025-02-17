import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  downloadURL$: string | null = null;

  constructor(private storageService: StorageService) {}

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.storageService.uploadFile(file).subscribe((url) => {
        this.downloadURL$ = url;
      });
    }
  }
}
