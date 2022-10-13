/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useReducer, useEffect } from 'react';

import vapid from '@config/vapid.json';
import { getPermission } from '@utils';
import { SwContext, swReducer } from '.';
import { useNotify } from '@hooks';
import { swService } from '@services';

export interface SwState {
  swReg: any;
  isActivePushNotifications: boolean;
}

const SW_INITIAL_STATE: SwState = {
  swReg: undefined,
  isActivePushNotifications: false,
};

interface Props {
  children: JSX.Element;
}

export const SwProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(swReducer, SW_INITIAL_STATE);
  const { notify } = useNotify();

  const setSwReg = async (reg: any) => {
    const isActive = await getPermission(notify, 'init');
    if (isActive) {
      activeNotificationWeb();
    }
    dispatch({ type: '[SW] - Set Reg', payload: reg });
  };

  const getSubscription = async () => {
    const { swReg } = state;
    const subscription = await swReg.pushManager.getSubscription();
    return subscription;
  };

  const cancelSubscribe = async () => {
    const subscription = await getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      dispatch({ type: '[SW] - active notifications', payload: false });
    }
  };

  useEffect(() => {
    const registerSubscription = async () => {
      if (state.isActivePushNotifications) {
        const { swReg } = state;
        const subscriptionExist = await getSubscription();
        if (!subscriptionExist) {
          const { publicKey } = vapid;
          const subscription = await swReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKey,
            })
            .then((res: any) => res.toJSON());

          try {
            await swService.subscribe(subscription);
          } catch ({ message }) {
            console.log(message);
            cancelSubscribe();
          }
        }
      }
    };
    registerSubscription();
  }, [state]);

  const activeNotificationWeb = async () => {
    dispatch({ type: '[SW] - active notifications', payload: true });
  };

  useEffect(() => {
    if (navigator.serviceWorker) {
      // window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(
        async function (reg) {
          console.log(
            'Service Worker registration successful with scope: ',
            reg.scope,
          );

          setSwReg(reg);
          // swReg.pushManager.getSubscription();

          // Notification.requestPermission().then((result) => {
          //   console.log({ result });
          //   reg.showNotification('hola mundo');
          // });
        },
        function (err) {
          console.log('Service Worker registration failed: ', err);
        },
      );
      // });
    }
  }, []);

  return (
    <SwContext.Provider
      value={{ ...state, activeNotificationWeb, cancelSubscribe }}
    >
      {children}
    </SwContext.Provider>
  );
};
