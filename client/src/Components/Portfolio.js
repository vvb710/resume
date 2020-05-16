import React from 'react';

const Portfolio = ({ data }) => {

  if (data) {
    const projects = data.projects.map((project) => {
      const { title, url, category, image } = project
      const projectImage = 'images/portfolio/' + image

      return (
        <div key={title} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={url} title={title} target="_blank" rel="noopener noreferrer">
              <img alt={title} src={projectImage} />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{title}</h5>
                  <p>{category}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      )
    })


    return (
      <section id="portfolio">

        <div className="row">

          <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {projects}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
