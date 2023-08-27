import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "src/environments/environment";
import { Mate } from "../models/mate.model";

@Injectable()
export class SocketPublicProfile extends Socket {
  constructor() {
    super({url: environment.apiURL + '/public-profile', options: {query: {mateId: localStorage.getItem("currentUser") ? ( JSON.parse((localStorage.getItem("currentUser")!)) as Mate).id : ''}}})
  }
}