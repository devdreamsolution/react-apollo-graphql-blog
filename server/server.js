const jwt = require('jsonwebtoken');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');

const mongoose = require('./config/database'); 
mongoose.set('useCreateIndex', true);

const typeDefs = require('./modules/graphqlSchema.js');

const resolvers = require('./modules/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// JWT Middelware 
// app.use(async (req, res, next) => {
//     console.log(req.cookies);
//     const token = req.cookies.token ? req.cookies.token : null;
//     if (token !== null) {
//         try {
//             const currentUser = await jwt.verify(token, config.get('jwtPrivateKey'));
//             req.currentUser = currentUser;
//         } catch (err) {
//             //   console.error(err);
//             res.clearCookie('token');
//         }
//     }
//     next();
// });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

server.applyMiddleware({ app });

server.graphqlPath = "/hello";
// app.listen({ port: 3000 }, () => {
//     console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
// });
app.listen(4000);