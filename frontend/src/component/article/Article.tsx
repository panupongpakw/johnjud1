import React from "react";
import './Article.css'
import 'bootstrap/dist/css/bootstrap.css'
import ArticleBG from "./Rectangle 55.png"

function Article() {
    return (
        <html>
        <head>
            <title>Article</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
            </style>
        </head>
        <body>
        <div>
            <img src={ArticleBG} alt="ArticleBG" width="100%"/>
            <div className="top-left"><h1 className="Article">Article</h1>
                <p className="ArticleText">It take noting away from a human to be kind to an animal<br/>
                    - Joaquin Phoenix
                </p>
            </div>
        </div><br/>
        <input type="text" name="search" placeholder="Search Article" className="search"/><br/><br/>
        <p className="article-alert">
            <a href="http://localhost:3000/How_to_take_a_good_care_of_your_kitten" className="article-link-text">How to take a good care of your kitten</a>
            last modified 18SEP2020
        </p>
        <p className="article-alert">
            <a href="http://localhost:3000/Article_2" className="article-link-text">Article 2</a>
        </p>
        <p className="article-alert">
            <a href="http://localhost:3000/Article_3" className="article-link-text">Article 3</a>
        </p>
        </body>
        </html>
    );
}

export default Article;