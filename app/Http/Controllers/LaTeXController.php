<?php

namespace App\Http\Controllers;

use App\Http\Requests\Editor\ViewProjectRequest;
use App\Services\DockerService;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\Response;

class LaTeXController extends Controller
{
    public function compile(ViewProjectRequest $request, DockerService $docker, Filesystem $disk) {
        $project_path = 'storage/projects/' . $request->project->id;
        $output_path = 'storage/latex/' . $request->project->id;
        if (! $disk->exists($project_path)) {
            return response()->error('Project not found');
        }
        $disk->makeDirectory($output_path, 0755, true);

        $config = $docker->getLaTeXConfig();
        $host_config = new \Docker\API\Model\HostConfig();
        $host_config->setBinds([
            '/home/tridoc/' . $project_path . ':/document:ro',
            '/home/tridoc/' . $output_path . ':/output:rw',
        ]);
        $config->setHostConfig($host_config);

        $container = $docker->client->containerCreate($config);

        if ($container->getId() === null) {
            return response()->error('Failed to create container');
        }

        $docker->client->containerStart($container->getId());
        $docker->client->containerWait($container->getId());

        $info = $docker->client->containerInspect($container->getId());
        $docker->client->containerDelete($container->getId());
        if ($info->getState()->getExitCode() !== 0) {
            return response()->error('Failed to compile LaTeX');
        }

        return response($disk->get($output_path . '/main.pdf'), 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
