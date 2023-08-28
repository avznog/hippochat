import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(
    private http: HttpClient,
    public readonly publicProfileService: PublicProfileService
  ) {

   }

  ngOnInit() { }
  async onFileSelected(event: any) {
    console.log(event.target.files[0])
    let formData = new FormData()
    formData.append("file", event.target.files[0])
    this.http.post(`mates/update-profile-picture`, formData).subscribe(res => {
      console.log(res)
    })
  }

}
