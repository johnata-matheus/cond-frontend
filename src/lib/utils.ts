import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T, U extends Updater<T>>(updaterOrValue: U, ref: Ref<T>) {
  ref.value =
    typeof updaterOrValue === 'function'
      ? (updaterOrValue as (old: T) => T)(ref.value)
      : updaterOrValue as T
}

export function openOauthPopup(url: string, options = { width: 600, height: 700 }): Promise<{ token: string }> {
  return new Promise((resolve, reject) => {
    const { width, height } = options;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      url,
      'oauth-popup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars,resizable`
    );

    if (!popup) {
      reject(new Error('Popup blocked or failed to open'));
      return;
    }

    function handleMessage(event: MessageEvent) {
      if (event.origin !== 'http://localhost:8000') return;
      if (event.data.type === 'auth_success') {
        resolve({ token: event.data.token });
      } else if (event.data.type === 'auth_error') {
        reject(new Error('Erro ao autenticar com o Google.'));
      }
      window.removeEventListener('message', handleMessage);
    }

    window.addEventListener('message', handleMessage)
  })
}