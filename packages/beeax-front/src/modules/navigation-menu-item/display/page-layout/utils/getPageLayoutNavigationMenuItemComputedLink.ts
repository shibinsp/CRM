import { AppPath } from 'beeax-shared/types';
import { getAppPath, isDefined } from 'beeax-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const getPageLayoutNavigationMenuItemComputedLink = (
  item: Pick<NavigationMenuItem, 'pageLayoutId'>,
): string => {
  if (!isDefined(item.pageLayoutId)) {
    return '';
  }

  return getAppPath(AppPath.PageLayoutPage, {
    pageLayoutId: item.pageLayoutId,
  });
};
