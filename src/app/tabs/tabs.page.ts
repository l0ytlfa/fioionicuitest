import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public templString: string;

  constructor(public photoService: PhotoService) {
    photoService.setData('changed value');
    this.templString = photoService.getData();
  }

}
