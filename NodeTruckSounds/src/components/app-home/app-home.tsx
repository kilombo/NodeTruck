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
            <ion-title>Ionic PWA Toolkit</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <firebase-sounds></firebase-sounds>
        </ion-content>
      </ion-page>
    );
  }
}
