import React, { useEffect, useState } from "react";
import classes from "./News.module.css";
import newsImage from "../images/image 15.png";



function News() {
  const [news, setNews] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
    url:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = "ba5e9503fc94480c92dcbd99e71c7b61";

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );

        const data = await response.json();

        console.log("News", data);
        const article = data.articles[10];
        console.log("article", article);

        const dateTime = new Date(article.publishedAt);
        const year = dateTime.getFullYear();
        console.log("year", year);

        const options = { timeZone: "Asia/Kolkata" };
        const ISTTime = dateTime.toLocaleString("en-US", options);
        console.log(ISTTime);

        const date = ISTTime;

        setNews({
          title: article.title,
          date,
          description: article.content,
          image: article.urlToImage,
          url: article.url,
        });

        console.log("state news", news);
      } catch (error) {
        console.log("something went wrong", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={classes.newsSec}>
      <div className={classes.image}>
        <img src={news.image ? news.image : newsImage} alt="news section" />
        <div className={classes.titleBar}>
          <h2>{news.title}</h2>
          <a href={news.url} target="_blank" rel="noreferrer" >See More...</a>
          <h3>{news.date} </h3>
        </div>
      </div>
      <div className={classes.desc}>{news.description}</div>
    </div>
  );
}

export default News;
