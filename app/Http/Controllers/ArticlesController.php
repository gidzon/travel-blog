<?php
namespace app\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use app\QueryBuilder;
use app\Database;

class ArticlesController
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

    public function index(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $articles = $this->queryBuilder->select('articles', ['id_category' => $arrgs['id']], $this->database);
        
        
        $template = $this->view->render('articles.twig', [
            'categories' => $categories,
            'articles'   => $articles
            ]);
        $response->getBody()->write($template);
        return $response;
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $article = $this->queryBuilder->select('articles', ['id' => $arrgs['id']], $this->database);
        
        $template = $this->view->render('article.twig', [
            'categories' => $categories,
            'article'   => $article[0]
            ]);
        $response->getBody()->write($template);
        return $response;
    }

    public function save(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $content = $request->getParsedBody();
        if (isset($content['id'])) {
            $idProduct = array_pop($content);
            $whereProduct = ['id' => $idProduct];
            $this->queryBuilder->update('articles', $content, $whereProduct, $this->database);
        } else {
            $this->queryBuilder->insert('articles', $content,$this->database);
        }

        $articles = $this->queryBuilder->select('articles', [], $this->database);
        $dataJsonArticles = json_encode($articles);
        $response->getBody()->write($dataJsonArticles);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getData(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $articles = $this->queryBuilder->select('articles', $arrgs, $this->database);
        $dataJsonArticles = json_encode($articles);
        $response->getBody()->write($dataJsonArticles);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $this->queryBuilder->delete('articles', $arrgs, $this->database);

        $articles = $this->queryBuilder->select('articles', [], $this->database);
        $dataJsonArticles = json_encode($articles);
        $response->getBody()->write($dataJsonArticles);
        return $response->withHeader('Content-Type', 'application/json');
    }

}