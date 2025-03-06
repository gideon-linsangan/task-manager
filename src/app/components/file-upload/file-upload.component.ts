import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  private storageService = inject(StorageService)
  downloadURL$: string | null = null;

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.storageService.uploadFile(file).subscribe((url) => {
        this.downloadURL$ = url;
      });
    }
  }
}
