import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Service } from '../../models/service.model';
import { SERVICES } from '../../models/service.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  // Liste des états de dépliage pour chaque carte
  expanded: boolean[] = [];
  // Import des données des services
  services: Service[] = SERVICES;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    // Initialisez avec `false` pour chaque carte
    this.expanded = Array(this.services.length).fill(false);
  }

  ngOnInit(): void {
    // Vérifier si une ancre est présente dans l'URL
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToService(fragment);
      }
    });
  }

  scrollToService(id: string): void {
    const serviceMap: { [key: string]: number } = {
      optimisation: 0,
      logiciels: 1,
      dashboards: 2,
      prestataires: 3,
      marketing: 4,
      formations: 5,
      pack: 6,
    };

    const index = serviceMap[id];
    if (index !== undefined) {
      this.expanded[index] = true; // Dérouler le service correspondant

      window.scrollTo(0, 0);

      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Calculer le décalage pour compenser un header fixe
          const yOffset = -80; // Ajustez cette valeur selon la hauteur du header
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;

          // Effectuer un défilement fluide
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }

  toggleText(index: number): void {
    // Basculer l'état pour l'élément cliqué
    this.expanded[index] = !this.expanded[index];
  }

  getServiceIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}

