const {Router} = require("express");

const path = require("path");
const viewsRouter = Router()
viewsRouter.get('/',(req,res)=>{
    res.render('index', {});
})

module.exports = {
    viewsRouter
}