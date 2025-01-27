import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: AccueilComponent
    },
    {
        path: 'services',  // Nouvelle route pour la page des services
        component: ServicesComponent
    },
    {
        path: 'contact',  // Nouvelle route pour la page des services
        component: ContactComponent
    }
];
