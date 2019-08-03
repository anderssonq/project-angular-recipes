import {Directive,ElementRef,Renderer2,HostListener,HostBinding, Output, EventEmitter} from '@angular/core'

@Directive({
    selector:'[appDropdown]'
})

export class DowndownDirective{

    constructor(private elRef: ElementRef,private renderer: Renderer2) { 

    }

    //@HostBinding('.classList') classList:string;

    
    /*isOpen:boolean=false;
    @Output() dropdown= new EventEmitter<boolean>();

    @HostListener('click') toggleOpen(eventData:Event){
        // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
        //console.log(eventData);
         this.isOpen=!this.isOpen;

         this.dropdown.emit(
             this.isOpen
         )
         
    }*/

    
    @HostBinding('class.open') isOpen:boolean=false;

    @HostListener('click') toggleOpen(eventData:Event){
        // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
        //console.log(eventData);
         this.isOpen=!this.isOpen;         
    }
}