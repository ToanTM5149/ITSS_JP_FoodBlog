import React from 'react'
import "./homepage.css";
import Header from '../components/Header';
export default function homepage() {
  return (
    <div>
      <Header/>
      <div className="homepage">
      {/* Section: Recent Blog Posts */}
      <section className="recent-blogs">
        <h2 className="section-title">最近のブログ投稿</h2>
        <div className="recent-blogs-container">
          <div className="blog-large">
            <div className="blog-image large-image"></div>
            <p className="blog-meta">Male • 2023年1月1日</p>
            <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
          </div>
          <div className="blog-small-group">
              <div className="blog-small">
                <div className="blog-image small-image"></div>
                  <div className='title-meta'>
                    <p className="blog-meta">Male • 2023年1月1日</p>
                    <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>`
                  </div>
                
              </div>
              <div className="blog-small">
                <div className="blog-image small-image"></div>
                <div className='title-meta'>
                    <p className="blog-meta">Male • 2023年1月1日</p>
                    <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>`
                  </div>
              </div>
            </div>
        </div>
        <div className="recent-blogs under-blog">
          <div className="blog-under">
          <div className="blog-under long-image"></div>
            <p className="blog-meta">Male • 2023年1月1日</p>
            <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
          </div>
        </div>
      </section>

      {/* Section: All Blog Posts */}
      <section className="all-blogs">
      <h2 className="section-title">すべてのブログ投稿</h2>
      <div className="all-blogs-container">
        <div className="blog-card">
          <div className="blog-image card-image"></div>
          <p className="blog-meta">Alec Whitman • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
        <div className="blog-card">
          <div className="blog-image card-image"></div>
          <p className="blog-meta">Demi Wilkinson • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
        <div className="blog-card">
          <div className="blog-image card-image"></div>
          <p className="blog-meta">Candice Wu • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
        <div className="blog-card">
          <div className="blog-image card-image"></div>
          <p className="blog-meta">John Doe • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
        <div className="blog-card">
          <div className="blog-image card-image"></div>
          <p className="blog-meta">Jane Smith • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
        <div className="blog-card">
          <div className="blog-under card-image"></div>
          <p className="blog-meta">Chris Lee • 1 Jan 2023</p>
          <p className="blog-title">新しいスニーカーが登場。500ドル!!!</p>
        </div>
      </div>
    </section>

    </div>
    </div>
  )
}
