import FButtonIcon from './lib/FButtonIcon.vue';
import FContainer from './lib/FContainer.vue';
import FDivider from './lib/FDivider.vue';
import FTouchButton from './lib/FTouchButton.vue';
import FTouchDropdown from './lib/FTouchDropdown.vue';

import '../dist/style.css'; // Combined styles

if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./style.css', import.meta.url).href;
  document.head.appendChild(link);
}

export { FButtonIcon, FContainer, FDivider, FTouchButton, FTouchDropdown };
