import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./@layout/main/main.component").then(x => x.MainComponent),
        children: [
            {
                path: '',
                loadComponent: () => import("./@component/main-container/main-container.component").then(x => x.MainContainerComponent),
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import("./@layout/not-found-404/not-found-404.component").then(x => x.NotFound404Component)
    }
];
