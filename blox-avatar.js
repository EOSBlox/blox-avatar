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
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'blox-avatar',
      },
    };
  }
}

window.customElements.define('blox-avatar', BloxAvatar);
