import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {Ingredient} from '../../shared/ingredients.model'
import { ShoppingList } from 'src/app/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{

  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingList:ShoppingList) { }

  ngOnInit() {
    this.subscription=this.shoppingList.startedEditing
    .subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.shoppingList.getIngredientt(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })       
      }
    )
  } 

  onSubmit(form:NgForm){
    const value=form.value;
    const ingredient:Ingredient= new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingList.updateIngredients(this.editedItemIndex, ingredient)
    }else{
      this.shoppingList.AddIngredient(ingredient)
    }
    this.editMode=false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingList.deleteIngredient(this.editedItemIndex)
    this.slForm.reset();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
