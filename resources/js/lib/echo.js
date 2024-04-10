import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

class LaravelEcho {
    static instance = null

    constructor() {
        this.instance = new Echo({
            client: new Pusher(import.meta.env.VITE_REVERB_APP_KEY, {
                forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
                wsHost: import.meta.env.VITE_REVERB_HOST,
                wssHost: import.meta.env.VITE_REVERB_HOST,
                wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
                wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
                cluster: '',
                key: import.meta.env.VITE_REVERB_APP_KEY,
            }),
            broadcaster: 'reverb',
            enabledTransports: ['ws', 'wss'],
        });
    }

    get pusher() {
        return this.instance.connector.pusher
    }
}

export default new LaravelEcho()
