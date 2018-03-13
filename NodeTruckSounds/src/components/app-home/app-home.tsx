import { Component } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>NodeTruck</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>

        </ion-content>
      </ion-page>
    );
  }
}
