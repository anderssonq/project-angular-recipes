import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../../recipe.model'
import { RecipeService } from 'src/app/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input() recipe:Recipe;
  @Input() index:number;

  constructor(private route:ActivatedRoute, private router:Router){}
  ngOnInit() {
  }


  setIDitem(){
    this.router.navigate([this.index], {relativeTo: this.route})
  }
  // tambien se pudo usar routerlink en el html
}
