import { useEffect } from 'react';
import type { GetUnreadNewsResponse } from '@/common/types/me';
import { useIsUserAuthenticated } from '@/store/store';
import { sendRequest } from '@/utils';
import { usePresentableProducer } from '..';
import { NewsItemPresentableRenderer } from './NewsItemPresentableRenderer';

export interface NewsItemPresentable {
  type: 'NewsItem';
  component: React.ReactNode;
}

export const getUnreadNewsItems = async () => {
  const newsItems = await sendRequest<GetUnreadNewsResponse>(`/me/news`);
  return newsItems.unreadNewsItemIds;
};

export function useNewsItemsPresentableProducer(priority: number) {
  const { setPresentables } = usePresentableProducer(priority);
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    (async () => {
      if (!isUserAuthenticated) {
        return;
      }
      const unreadNewsItemIds = await getUnreadNewsItems();
      setPresentables(
        unreadNewsItemIds.map((newsItemId) => {
          return {
            id: 'news-item-' + newsItemId,
            presentable: {
              type: 'NewsItem',
              component: (
                <NewsItemPresentableRenderer newsItemId={newsItemId} />
              ),
            },
          };
        })
      );
    })().catch(console.error);
  }, [isUserAuthenticated]);
}
