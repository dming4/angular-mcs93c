import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[z-draggable]',
})

export class DraggableDirective implements OnInit {

arrowDirection: string;
controls;
divContent;
isHidden: boolean;
lastTooltipText: string;
textContent;
container;
tooltipOffset: number = 8;

eventListenerFunction: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createDraggable();
  }
  

createDraggable() {
    const _this = this;
    this.container = this.renderer.createElement('div');
    this.renderer.addClass(this.container, 'sjx-wrapper');

    this.controls = this.renderer.createElement('div');
    this.renderer.addClass(this.controls, 'sjx-controls');
    const el =  this.elementRef.nativeElement;
    // var options = this.options;
    // var rotationPoint = options.rotationPoint;
    // var _el$style = el.style,
    //    let left = _el$style.left,
    //     top = _el$style.top,
    //     width = _el$style.width,
    //     height = _el$style.height;
    // var $el = helper(el);
    // var w = width || $el.css('width'),
    //     h = height || $el.css('height'),
    //     t = top || $el.css('top'),
    //     l = left || $el.css('left');
    // var css = {
    //   top: t,
    //   left: l,
    //   width: w,
    //   height: h,
    //   transform: this.getTransform($el)
    // };
    var handles = {
            normal: ['sjx-normal'],
            tl: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-l', 'sjx-hdl-tl'],
            tr: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-r', 'sjx-hdl-tr'],
            br: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-r', 'sjx-hdl-br'],
            bl: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-l', 'sjx-hdl-bl'],
            tc: ['sjx-hdl', 'sjx-hdl-t', 'sjx-hdl-c', 'sjx-hdl-tc'],
            bc: ['sjx-hdl', 'sjx-hdl-b', 'sjx-hdl-c', 'sjx-hdl-bc'],
            ml: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-l', 'sjx-hdl-ml'],
            mr: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-r', 'sjx-hdl-mr'],
            // center: rotationPoint ? ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-c', 'sjx-hdl-mc'] : undefined,
            center: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-c', 'sjx-hdl-mc'],
            //...(rotationPoint && { center: ['sjx-hdl', 'sjx-hdl-m', 'sjx-hdl-c', 'sjx-hdl-mc']}), IE11 not supports
            rotator: ['sjx-hdl', 'sjx-hdl-m', 'sjx-rotator']
          };
    Object.keys(handles).forEach(function (key) {
      var data = handles[key];
      // if (this.isUndef(data)) return;
      var handler = _this.createHandler(data);
      handles[key] = handler;
      _this.renderer.appendChild(_this.controls, handler);
    });

    this.renderer.appendChild(this.container, this.controls);

    // if (this.isDef(handles.center)) {
    //   var cHandle = handles.center;
    //   cHandle.css({
    //     left: "".concat(el.getAttribute('data-cx'), "px"),
    //     top: "".concat(el.getAttribute('data-cy'), "px")
    //   });
    // }

    // this.renderer.appendChild(this.divContent, this.textContent);
    this.elementRef.nativeElement.parentNode.insertBefore(this.container, el)

  }

  createHandler(classList) {
        const _this = this;

  var element = document.createElement('div');
  classList.forEach(function (cls) {
    _this.addClass(element, cls);
  });
  return element;
}

  isDef(val) {
      return val !== undefined && val !== null;
  }

  // helper(params) {
  //   return new Helper(params);
  // }

    getOffset(node) {
      return node.getBoundingClientRect();
    }
    getTransform(el) {
      var transform = el.css('-webkit-transform') || el.css('-moz-transform') || el.css('-ms-transform') || el.css('-o-transform') || el.css('transform') || 'none';
      return transform;
    }
    parseMatrix(value) {
      var transform = value.match(/-?\d+\.?\d+|-?\d+/g);

      if (transform) {
        return transform.map(function (item) {
          return parseFloat(item);
        });
      } else {
        return [1, 0, 0, 1, 0, 0];
      }
    }
    addClass(node, cls) {
      if (!cls) return;

      if (node.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (cl) {
            return node.classList.add(cl);
          });
        } else {
          return node.classList.add(cls);
        }
      }

      return node;
    }
    removeClass(node, cls) {
      if (!cls) return;

      if (node.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (cl) {
            return node.classList.remove(cl);
          });
        } else {
          return node.classList.remove(cls);
        }
      }

      return node;
    }
    objectsCollide(a, b) {
      var _getOffset = this.getOffset(a),
          aTop = _getOffset.top,
          aLeft = _getOffset.left,
          _getOffset2 = this.getOffset(b),
          bTop = _getOffset2.top,
          bLeft = _getOffset2.left,
      //     _a = helper(a),
      //     _b = helper(b);

      // return !(aTop < bTop || aTop + parseFloat(_a.css('height')) > bTop + parseFloat(_b.css('height')) || aLeft < bLeft || aLeft + parseFloat(_a.css('width')) > bLeft + parseFloat(_b.css('width')));
    }
}