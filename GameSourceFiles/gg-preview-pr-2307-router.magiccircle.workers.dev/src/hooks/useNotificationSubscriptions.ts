import type { NotificationTopic } from '@/common/notifications/notification-topics';
import { useAuthenticatedResource } from '@/user';

export interface UserSubscriptionsResponse {
  subscriptions: NotificationTopic[];
}

export const useNotificationSubscriptions = () => {
  const { data, ...rest } = useAuthenticatedResource<UserSubscriptionsResponse>(
    {
      path: '/notifications/subscriptions',
    }
  );

  return {
    subscriptions: data?.subscriptions ?? [],
    ...rest,
  };
};
