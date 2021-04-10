<?php

use Slim\Factory\AppFactory;
use Zeuxisoo\Whoops\Slim\WhoopsMiddleware;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

require_once __DIR__ . '/routes/web.php';

$app->add(new WhoopsMiddleware());
$app->run();