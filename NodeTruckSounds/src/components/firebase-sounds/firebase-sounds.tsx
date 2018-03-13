import { Component, State, Event, EventEmitter, Listen } from '@stencil/core';
import firebase from 'firebase';

@Component({
  tag: 'firebase-sounds',
  styleUrl: 'firebase-sounds.scss'
})
export class FirebaseSounds {

  @State() engineStatus: string;
  @Event() playSoundEvent: EventEmitter;
  @Listen('playSoundEvent')
  playSoundEventHandler() {
    console.log('Received the custom playSoundEvent event.');
    this.playSound('horn','start');
  }

  componentDidLoad() {
    const hornRef = firebase.database().ref('horn/status');
    hornRef.on('value', (snapshot) => {
      console.log('horn status: ', snapshot.val());
      if(snapshot.val() === 'on'){
        this.playSound('horn','start');
        this.playSoundEvent.emit();
      }
      if(snapshot.val() === 'off'){
        this.playSound('horn','stop');
      }
    });

    const moveRef = firebase.database().ref('move_orders/move');
    moveRef.on('value', (snapshot) => {
      console.log('move: ', snapshot.val());
      if(snapshot.val() === 'retroceder'){
        this.playSound('reverse','start');
      }
      if(snapshot.val() === 'parar'){
        this.playSound('idle','start');
      }
      if(snapshot.val() === 'avanzar'){
        this.playSound('move-front','start');
      }
    });
  }

  playSound(soundName:string, action:string){
    console.log('playing sound ...');
    // http://soundbible.com/tags-truck.html
    let audio = new Audio(`../assets/sounds/${soundName}.mp3`);
    if(soundName === 'idle'){
      audio.loop = true;
    }
    if(action === 'start'){
      audio.play();
    }
    if(action === 'stop'){
      audio.pause();
    }
  }

  render() {
    return (
      <div>
        <p>FirebaseSounds Events</p>
        <ion-button onClick={() => this.playSound('horn','start')} expand='block' color='primary'>Test</ion-button>
      </div>
    );
  }
}
