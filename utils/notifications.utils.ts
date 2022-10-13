import { VariantType } from 'notistack';

export const getPermission = async (
  notify: (message: string, variant?: VariantType | undefined) => void,
  type?: string,
) => {
  if (!window.Notification) {
    notify('This browser does not support push notifications', 'error');
    return false;
  }

  const { permission } = Notification;

  if (permission === 'denied') {
    notify('Notifications were blocked, by the same user');
    return false;
  }

  if (permission === 'granted') {
    return true;
  }

  if (permission === 'default' && !type) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('This is how WEB notifications look, this is a test');
      return true;
    }
  }

  return false;
};
