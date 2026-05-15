import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', 
        redirectTo: '/games', 
        pathMatch: 'full'
    },
    { path: 'categories', 
        loadComponent: () => 
            import('../category/category-list/category-list.page')
            .then(m => m.CategoryListPage)
    },
    { path: 'customers', 
        loadComponent: () => 
            import('../customer/customer-list/customer-list.page')
            .then(m => m.CustomerListPage)
    },
    { path: 'authors', 
        loadComponent: () => 
            import('../author/author-list/author-list.page')
            .then(m => m.AuthorListPage)
    },
    { path: 'lendings', 
        loadComponent: () => 
            import('../lending/lending-list/lending-list.page')
            .then(m => m.LendingListPage)
    },
    { path: 'games', 
        loadComponent: () => 
                import('../game/game-list/game-list.page')
                .then(m => m.GameListPage)
    }
];
