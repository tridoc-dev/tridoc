<?php

namespace App\Services;

use Docker\API\Endpoint\SystemInfo;
use Docker\API\Model\ContainersCreatePostBody;
use Docker\API\Model\HostConfig;
use Docker\Docker;
use Docker\DockerClientFactory;

class DockerService
{
    public Docker $client;

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

    public function getLaTeXConfig(): ContainersCreatePostBody {
        $config = new ContainersCreatePostBody();
        $config->setImage('tridoc/worker:latest');
        $config->setWorkingDir('/document');
        $config->setCmd(['xelatex', '-output-directory=/output', 'main.tex']);

//        $host_config = new HostConfig();
//        $host_config->setAutoRemove(true);
//        $config->setHostConfig($host_config);

        return $config;
    }
}
