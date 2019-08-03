import { NgModule } from '@angular/core';
import { DowndownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DowndownDirective
    ],
    exports: [DowndownDirective]
})
export class SharedModule {}