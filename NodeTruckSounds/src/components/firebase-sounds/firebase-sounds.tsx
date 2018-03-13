import { Component, State } from '@stencil/core';
import firebase from 'firebase';

@Component({
  tag: 'firebase-sounds',
  styleUrl: 'firebase-sounds.scss'
})
export class FirebaseSounds {

  @State() engineStatus: string;

  componentDidLoad() {
    const hornRef = firebase.database().ref('horn/status');
    hornRef.on('value', (snapshot) => {
      console.log('horn status: ', snapshot.val());
      if(snapshot.val() === 'on'){
        this.playSound('horn','start');
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
      <p>FirebaseSounds</p>
    );
  }
}
