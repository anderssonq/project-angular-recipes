import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


const recipesRoutes:Routes=[
    {path: '', component:RecipesComponent, children:[
        {path:'', component: RecipeStartComponent},
        {path:'new', component: RecipeEditComponent, canActivate:[AuthGuard]},
        //primero se apilan las urls sin parametrosdinamicos para que no den errores
        {path:':id', component: RecipesDetailComponent},
        {path:':id/edit', component: RecipeEditComponent, canActivate:[AuthGuard]}
      ]},
];


@NgModule({
    declarations: [],
    imports: [ CommonModule,
    RouterModule.forChild(recipesRoutes) ],
    exports: [RouterModule],
    providers:[AuthGuard]
})
export class RecipesRoutingModule {}