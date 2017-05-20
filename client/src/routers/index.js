import User from '../views/user/User.vue';
import Home from '../views/Home.vue';
import Cate from '../views/cate/Cate.vue';
import Blog from '../views/blog/Blog.vue';
import Comment from '../views/comment/Comment.vue';
import Upload from '../views/upload/Upload.vue';
import Chart from '../views/chart/Chart.vue';

export const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/user', component: User, name: 'user' },
    { path: '/cate', component: Cate, name: 'cate' },
    { path: '/blog', component: Blog, name: 'blog' },
    { path: '/comment', component: Comment, name: 'comment' },
    { path: '/upload', component: Upload, name: 'upload' },
    { path: '/chart', component: Chart, name: 'chart' }
];