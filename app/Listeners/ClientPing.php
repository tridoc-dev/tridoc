<?php

namespace App\Listeners;

use App\Events\Heartbeat;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ClientPing
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
    public function handle(\App\Events\ClientPing $event): void
    {
        Heartbeat::broadcast();
    }
}
