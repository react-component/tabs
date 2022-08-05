import type { TabsProps } from '..';
import type { AnimatedConfig } from '../interface';

export default function useAnimateConfig(
  animated: TabsProps['animated'] = {
    inkBar: true,
    tabPane: false,
  },
): AnimatedConfig {
  let mergedAnimated: AnimatedConfig;

  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false,
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: false,
    };
  } else {
    mergedAnimated = {
      inkBar: true,
      ...(typeof animated === 'object' ? animated : {}),
    };
  }

  // Enable tabPane animation if provide motion
  if (mergedAnimated.tabPaneMotion && mergedAnimated.tabPane === undefined) {
    mergedAnimated.tabPane = true;
  }

  return mergedAnimated;
}
