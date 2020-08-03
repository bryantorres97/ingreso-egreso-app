import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore, 
    private router: Router) {}

  registrarUsuario(nombre: string, email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,          
          email: resp.user.email,
          nombre: nombre

        };

        this.afDB.doc(`${user.uid}/usuario`).set( user )
        .then(() => this.router.navigate(['/']));

        
      })
      .catch((error) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        })
      );
  }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {
      console.log(fbUser);
    })
  }

  loginMail(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        })
      );
  }

  cerrarSesion() {
    this.afAuth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch((error) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Something went wrong!',
        })
      );
  }


  estaAutenticado() {
    return this.afAuth.authState.pipe(
      map( fbUser => {
        
        if( fbUser === null ){
          this.router.navigate(['/login']);
        }

        return fbUser != null;
      })
    );
  }
}
