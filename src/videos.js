const express= require('express');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const router = express.Router();
const helper = require('./helper');


/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
  }

async function fetchVideos(){
    const file = await readFileAsync('./videos.json');
    const json = JSON.parse(file);
    return json;
}

async function videoList(req,res){
    const title = "Myndbönd";
    const json = await fetchVideos();
    const mapped = [];
    json.categories.forEach((item,index) => {
        items = []
        item.videos.forEach((val,idx) =>{
            var obj;
            json.videos.forEach((vid,i) =>{
                if(val == vid.id){
                    obj = vid;
                }
            })
            items.push(obj);
        })
        var result;
        var result = {
            title:item.title,
            videos:items,
        }
        mapped.push(result)
    } )
    res.render('index',{title,mapped,helper});
}

async function videos(req,res,next){
    const {id} = req.params;

    const json = await fetchVideos();
    const {videos } = json;
    const foundVideos = videos.find(a => a.id === parseInt(id));

    if(!foundVideos){
        return next();
    }

    const {title} = foundVideos;
    console.log({title, content: foundVideos})
    return res.render('index',{title, content: foundVideos})
}


router.get('/',catchErrors(videoList));
router.get('/:id',catchErrors(videos));

module.exports = router;


