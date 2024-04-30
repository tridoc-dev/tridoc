<?php

namespace App\Services;

use Docker\API\Endpoint\SystemInfo;
use Docker\Docker;
use Docker\DockerClientFactory;

class DockerService
{
    protected Docker $client;

    public function __construct() {
        $factory = DockerClientFactory::create([
            'remote_socket' => config('docker.host'),
            'ssl' => false,
        ]);

        $this->client = Docker::create($factory);
    }

    public function getInfo(): array
    {
        return json_decode($this->client->executeRawEndpoint(new SystemInfo())->getBody()->getContents(), true);
    }

    public function getContainers(): array {
        return $this->client->containerList();
    }
}
