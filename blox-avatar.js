import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blox-avatar`
 * select, resize, rotate and save an avatar image
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxAvatar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .file {
          display: none;
        }
      </style>
      <div class="rotate-icon" on-click="_rotate">Rotate</div>
      <input type="file" name="file" id="file" class="file" on-change="_fileSelected" accept=".jpg, .jpeg, .png, .gif" />
      <canvas
          id="canvas"
          class="canvas"
          width="{{canvasWidth}}"
          height="{{canvasHeight}}"
          on-mousedown="_panStart"
          on-mouseup="_panEnd"
          on-mousemove="_panMove"
          on-touchstart="_panStart"
          on-touchend="_panEnd"
          on-touchmove="_panMove">
          Your browser does not support HTML5 Canvas.
      </canvas>
    `;
  }
  static get properties() {
    return {
      canvasWidth: {
        type: Number,
        value: 250,
      },
      canvasHeight: {
        type: Number,
        value: 250,
    },
    };
  }

  _panStart(event) {
    event.preventDefault();
    this.mouseDown = true;
    if (event.clientX===undefined) {
            this.startX = event.touches[0].clientX - this.endX;
            this.startY = event.touches[0].clientY - this.endY;
    } else {
            this.startX = event.clientX - this.endX;
            this.startY = event.clientY - this.endY;
    }
}

_panEnd() {
  this.mouseDown = false;
  this._drawFile();
}

_panMove(event) {
  if (this.mouseDown) {
      if (event.clientX===undefined) {
          this.endX = event.touches[0].clientX - this.startX;
          this.endY = event.touches[0].clientY - this.startY;
      } else {
          this.endX = event.clientX - this.startX;
          this.endY = event.clientY - this.startY;
      }
  }
}

_panStart(event) {
  event.preventDefault();
  this.mouseDown = true;
  if (event.clientX===undefined) {
          this.startX = event.touches[0].clientX - this.endX;
          this.startY = event.touches[0].clientY - this.endY;
  } else {
          this.startX = event.clientX - this.endX;
          this.startY = event.clientY - this.endY;
  }
}

_drawFile(withArc=true, withShadow=true) {
  if (this.image && this.canvasWidth && this.canvasHeight && this.scale && this.context) {
      let myscale = (this.canvasHeight/this.image.height)*this.scale;
      let px = 2*this.endX / (myscale);
      let py = 2*this.endY / (myscale);
      let rad = this.angle * Math.PI / 180;
      let nx = px * Math.cos(-rad) - py * Math.sin(-rad);
      let ny = px * Math.sin(-rad) + py * Math.cos(-rad);
      this.context.globalAlpha = 1.0;
      this.context.fillStyle = '#000';
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.save();
      this.context.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5);
      this.context.scale(myscale, myscale);
      this.context.rotate(this.angle * Math.PI / 180);
      this.context.drawImage(this.image, - 0.5 * (this.image.width - nx),
          - 0.5*(this.image.height - ny));
      this.context.restore();
      if (withShadow) {
          this.context.globalAlpha = 0.5;
          this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.context.save();
          this.context.beginPath();
          this.context.arc(this.canvasWidth / 2, this.canvasHeight / 2,
          Math.min(100, 100) / 2, 0, 2 * Math.PI, false);
          this.context.clip();
          this.context.globalAlpha = 1;
          this.context.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5);
          this.context.scale(myscale, myscale);
          this.context.rotate(this.angle * Math.PI / 180);
          this.context.drawImage(this.image, - 0.5 * (this.image.width - nx),
              - 0.5*(this.image.height - ny));
          this.context.restore();
          this.context.save();
      }
      if (withArc) {
          this.context.globalAlpha = 1;
          this.context.arc(this.canvasWidth * 0.5,
          this.canvasHeight * 0.5, 50, 0, 2 * Math.PI, false);
          this.context.lineWidth = 4;
          this.context.strokeStyle = '#24B1FF';
          this.context.stroke();
          this.context.restore();
      }
  }
}

} window.customElements.define('blox-avatar', BloxAvatar);
