import React from 'react'
import Headers from './Headers'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
         <Helmet>
                <meta charSet="utf-8" />
                <div>
                  <meta name="description" content={description}/>
                  <meta name="keywords" content={keywords} />
                  <meta name="author" content={author} />
                </div>

                <title>{title}</title>
            </Helmet>
        <Headers/>
        <main style={{minHeight:'70vh'}}>
        <Toaster />
        {children}
        </main>
        <Footer/>
    </div>
  )
}

Layout.defaultProps ={
  title: 'Grontho - shop now',
  description: 'Assamese Book Store',
  keywords: 'Book, Assamese, Assamese Book, Novels',
  author: 'Grontho'
};

export default Layout