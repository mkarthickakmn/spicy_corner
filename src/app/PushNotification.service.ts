import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const SERVER_URL = '/subscription'

@Injectable({providedIn:'root'})
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }

  public getNotification()
  {
  	 return this.http.post('/sendNotification',{})
  }
}