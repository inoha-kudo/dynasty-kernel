<?php

declare(strict_types=1);

namespace App\Providers;

use App\Enums\Module;
use Illuminate\Support\ServiceProvider;

final class ModuleServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if (! $this->app->routesAreCached()) {
            Module::loadWebRoutes();
            Module::loadApiRoutes();
        }

        if ($this->app->runningInConsole()) {
            Module::loadConsoleRoutes();
        }
    }
}
