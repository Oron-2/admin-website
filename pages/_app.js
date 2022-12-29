// This file initialises each page on my website
// and allows me to simply add a reference to the CSS files in my /styles directory
// and have them applied globally across the entire application. 

// layout
import "../styles/layout.css"

// components
import "../styles/components/header.css"
import "../styles/components/sidebar.css"

// pages
import "../styles/login.css"
import "../styles/blog/index.css"
import "../styles/blog/create-new-post.css"
import "../styles/blog/edit.css"
import "../styles/images/index.css"
import "../styles/images/upload.css"
import "../styles/images/edit.css"
import "../styles/sitemap.css"
import "../styles/change-password.css"

// modals
import "../styles/components/modals/delete-blog-post.css"
import "../styles/components/modals/delete-image.css"

// codemirror
import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"

// In the future, I will import my CSS files into this page (i.e. import "../styles/layout.css")
// above the below code block and have them apply global CSS styles to the application. 
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}