import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import * as L from 'leaflet';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

  email: string = 'honjanapi@gmail.com';
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Supprimez proprement la carte lorsque le composant est détruit
    }
  }

  private initializeMap(): void {
    // Vérifiez si une carte existe déjà, supprimez-la pour éviter les doublons
    if (this.map) {
      this.map.remove();
    }

    // Initialisez la carte avec un conteneur propre
    this.map = L.map('map', {
      center: [43.7477, 1.3081], // Coordonnées pour Merville
      zoom: 13,
      zoomControl: true,
    });

    // Ajouter des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Ajustez la taille de la carte après le rendu si nécessaire
    setTimeout(() => {
      this.map.invalidateSize(); // Corrige le problème des dimensions incorrectes
    }, 0);

    /* Ajouter un marqueur
    L.marker([43.7477, 1.3081])
      .addTo(this.map)
      .bindPopup('Bienvenue à notre bureau !')
      .openPopup();*/
  }



}
