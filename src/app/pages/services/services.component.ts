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

  rowMap: Map<number, number[]> = new Map();

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateRows();
      window.addEventListener("resize", () => this.calculateRows());
    }, 300); // On attend un peu pour être sûr que le DOM est bien prêt
  }

  calculateRows(): void {
    const cardElements = document.querySelectorAll(".service-card");
    if (cardElements.length === 0) return;

    this.rowMap.clear();
    let previousTop = -1;
    let rowIndex = 0;
    let row: number[] = [];

    cardElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (previousTop !== -1 && rect.top !== previousTop) {
        this.rowMap.set(rowIndex, row);
        rowIndex++;
        row = [];
      }
      row.push(index);
      previousTop = rect.top;
    });

    if (row.length) {
      this.rowMap.set(rowIndex, row);
    }
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
      window.scrollTo(0, 180);
      setTimeout(() => {
        this.toggleText(index);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }

  toggleText(index: number): void {
    let found = false;

    this.rowMap.forEach((row) => {
      if (row.includes(index)) {
        found = true;
        const currentState = this.expanded[index]; // Vérifier l’état actuel
        row.forEach((i) => {
          this.expanded[i] = !currentState; // Appliquer le même état pour tous
        });
      }
    });

    if (!found) {
      console.error(`Aucune ligne trouvée pour l'index ${index}`);
    }
  }

  getServiceIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}

