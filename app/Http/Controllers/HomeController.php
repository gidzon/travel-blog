<?php
namespace app\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use app\QueryBuilder;
use app\Database;

class HomeController
{
    
    private $view;
    private $database;
    private $queryBuilder;

    public function __construct(Environment $view, Database $database, 
    QueryBuilder $queryBuilder)
    {
        $this->view = $view;
        $this->database = $database;
        $this->queryBuilder = $queryBuilder;

    }
    
    public function show(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $articles = $this->queryBuilder->select('articles', [], $this->database);
        
        $template = $this->view->render('home.twig', [
            'categories' => $categories,
            'articles'   => $articles
            ]);

        $response->getBody()->write($template);
        return $response;
    }

}

