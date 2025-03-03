import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';

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
        path: 'contact',  // Nouvelle route pour la page le contact
        component: ContactComponent
    },
    {
        path: 'mentions-legales',  // Nouvelle route pour la page des mentions légales
        component: MentionsLegalesComponent
    }
];
