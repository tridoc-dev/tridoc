<?php

namespace App\Listeners;

use App\Events\Heartbeat;
use Laravel\Reverb\Events\MessageReceived;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadcastMessage
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageReceived $event): void
    {
        $message = json_decode($event->message);
        $class = "App\\Events\\{$message->event}";

        if (class_exists($class)) {
            event(new $class($message->data));
        }
    }
}
