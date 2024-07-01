const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username: 'apnacollege',
        content: 'I love coding'
    },
    {
        id: uuidv4(),
        username: 'hanusha jain',
        content: 'Just be yourself'
    },
    {
        id: uuidv4(),
        username: 'Random',
        content: 'Hello I am random'
    },
];

app.get('/post', (req, res) => {
    res.render('index', { posts });
});

app.get('/post/new/', (req, res) => {
    res.render('form');
});

app.post('/post', (req, res) => {
    const { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/post');
});

app.get('/post/edit/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (post) {
        res.render('formcontent', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.patch('/post/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find((p) => p.id === id);
    if (post) {
        post.content = content;
        res.redirect('/post');
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/post/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (post) {
        res.render('show', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log('Server is listening at port', port);
});
