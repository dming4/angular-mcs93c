import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, Renderer } from '@angular/core';
import subjx from './directives/outside.directive';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: false }) canvasContainer: ElementRef;
  name = 'Angular';

  constructor(private renderer2: Renderer2, private renderer: Renderer) {
    console.log(subjx);
    window.subjx = subjx;
  }

  ngAfterViewInit() {
    console.log(this.canvasContainer.nativeElement.attributes.class);
    console.log(this.canvasContainer.nativeElement.classList.value as string);
    const classElement = '.'+this.canvasContainer.nativeElement.classList.value as string;
    window.subjx(classElement).drag({
        onInit(el) {
            // fires on tool activation
    console.log(el);
        },
        onMove(dx, dy) {
            // fires on moving
            console.log(dx, dy);

        },
        onResize(dx, dy, handle) {
            // fires on resizing
            console.log(dx, dy, handle);
        },
        onRotate(rad) {
            // fires on rotation
    console.log(rad);
    

        },
        onDrop(e, el) {
            // fires on drop
        },
        onDestroy(el) {
            // fires on tool deactivation
        }
        });
    this.renderer
  };
}
