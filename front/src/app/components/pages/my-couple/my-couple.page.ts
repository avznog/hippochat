import { Component, OnInit } from '@angular/core';
import { AlertButton, AlertInput } from '@ionic/angular';
import { CouplesService } from 'src/app/services/couples/couples.service';

@Component({
  selector: 'app-my-couple',
  templateUrl: './my-couple.page.html',
  styleUrls: ['./my-couple.page.scss'],
})
export class MyCouplePage implements OnInit {

  alertButtons: AlertButton[] = [
    {
      text: "Annuler",
      role: "destructive"
    },
    {
      text: "Modifier",
      role: "confirm",
      handler: (answer) => {
        this.coupleService.updateMyCouple({
          name: answer.name
        })
      }
    }
  ]
  alertInputs: AlertInput[] = [
    {
      type: "text",
      name: "name"
    }
  ]
  constructor(
    public readonly coupleService: CouplesService,
  ) { }

  ngOnInit() {
    this.coupleService.getMyCouple();
  }
}
