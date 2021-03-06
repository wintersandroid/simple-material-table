import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`

<iron-iconset-svg name="table">
  <svg>
    <defs>
      <g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></g>
      <g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></g>
      <g id="remove"><path d="M19 13H5v-2h14v2z"/></g>
      <g id="sort-ascending"><path d="M10,11V13H18V11H10M10,5V7H14V5H10M10,17V19H22V17H10M6,7H8.5L5,3.5L1.5,7H4V20H6V7Z" /></g>
      <g id="sort-descending"><path d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V4H6V17Z" /></g>
      <g id="arrow-down"><path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /></g>
      <g id="arrow-up"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></g>
      <g id="filter"><path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" /></g>
    </defs>
  </svg>
</iron-iconset-svg>
`;

document.head.appendChild(template.content);

