
import { AfterViewInit, Component } from '@angular/core';
import { SAPconnectorService } from './services/sapconnector.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  constructor(private SAP: SAPconnectorService) {
    //--> inject services
   }

  ngAfterViewInit(): void {

    return;

    //--> load UI5 and authenticate to one SAP url (can be same as service); leave version undefined to take last from CDN
    this.SAP.activateSAPconnection(undefined,'https://wd.fiorital.com:4301/sap/opu/odata4/sap/zretail/default/sap/zmm_gr_list/0001/?sap-client=200','BPINST','Welcome1')

    //--> enqueue model connection request
    this.SAP.addRemoteService("gr","https://wd.fiorital.com:4301/sap/opu/odata4/sap/zretail/default/sap/zmm_gr_list/0001/?sap-client=200","../assets/models.XML",false)
    .then((ref)=>{
        //--> single service ready
    })

    //--> enqueue model connection request
    this.SAP.addRemoteService("gr2","https://wd.fiorital.com:4301/sap/opu/odata4/sap/zretail/default/sap/zmm_gr_list/0001/?sap-client=200","../assets/models.XML",false)
    .then((ref)=>{
        //--> single service ready
    })

    this.SAP.connectAllRemoteServices().then((ref)=>{
      //--> all services loaded and ready!
    });
 
  }
}
