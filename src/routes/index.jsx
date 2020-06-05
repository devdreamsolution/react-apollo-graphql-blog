import Pages from "layouts/Pages.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Dashboard.jsx";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.jsx";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.jsx";
import AboutUsPage from "views/AboutUsPage/AboutUsPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";

var indexRoutes = [
  { path: "/about-us", name: "AboutUs", component: AboutUsPage },
  { path: "/posts", name: "Posts", component: BlogPostsPage },
  { path: "/post", name: "Post", component: BlogPostPage },
  { path: "/rtl", name: "RTL", component: RTL },
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/home", name: "Home", component: LandingPage },
  
  { path: "/", name: "Dashboard", component: Dashboard },
];

export default indexRoutes;
