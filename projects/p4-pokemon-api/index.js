var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pokeDataUtil = require("./poke-data-util");
var _ = require("underscore");
var app = express();
var PORT = 3000;

// Restore original data into poke.json. 
// Leave this here if you want to restore the original dataset 
// and reverse the edits you made. 
// For example, if you add certain weaknesses to Squirtle, this
// will make sure Squirtle is reset back to its original state 
// after you restard your server. 
pokeDataUtil.restoreOriginalData();

//pokemon obj -> array -> obj 

// Load contents of poke.json into global variable. 
var _DATA = pokeDataUtil.loadData().pokemon;

/// Setup body-parser. No need to touch this.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    var contents = "";
    _.each(_DATA, function(i) {
        contents += `<tr><td>${i["id"]}</td><td><a href="/pokemon/${i["id"]}">${i["name"]}</a></td></tr>\n`;
    })
    var html = `<html>\n<body>\n<table>${contents}</table>\n</body>\n</html>`;
    res.send(html);
});

app.get("/pokemon/:pokemon_id", function(req, res) {
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    if (!result) return res.send("Error: Pokemon not found.");

    var contents = ""

    for (var key in result) {
        if (result[key] != null) {
            val = JSON.stringify(result[key])
            contents += `<tr><td>${key}</td><td>${val}</td></tr>\n`;
        }
    } 
    
    
    var html = `<html>\n<body>\n<table>${contents}</table>\n</body>\n</html>`;
    res.send(html)
});

app.get("/pokemon/image/:pokemon_id", function(req, res) {
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    if (!result) return res.send("Error: Pokemon not found.");

    var contents = ""

    contents = result["img"]
    
    var html = `<html><body><img src=${contents}></body></html>`;
    res.send(html)
});

app.get("/api/id/:pokemon_id", function(req, res) {
    // This endpoint has been completed for you.  
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    if (!result) return res.json({});
    res.json(result);
});

app.get("/api/evochain/:pokemon_name", function(req, res) {
    var _name = req.params.pokemon_name
    var result = _.findWhere(_DATA, { name: _name })
    if (!result) return res.send([]);

    var evoChain = []

    if (result["prev_evolution"]) {
        result["prev_evolution"].forEach(function(poke) {
            evoChain.push(poke["name"])
        })
    }

    evoChain.push(_name)
    
    if (result["next_evolution"]) {
        result["next_evolution"].forEach(function(poke) {
            evoChain.push(poke["name"])
        })
    }
    
    res.send(evoChain);
});

app.get("/api/type/:type", function(req, res) {
    var _type = req.params.type
    var result = [] 
    _DATA.forEach(function(mon) {
        mon["type"].forEach(function(types) {
            if (types == _type) {
                result.push(mon)
            }
        })
    })

    if (result.length == 0) return res.send([]);
    typeList = []
    
    result.forEach(function(poke) {
        typeList.push(poke["name"])
    })

    res.send(typeList)
    
});

app.get("/api/type/:type/heaviest", function(req, res) {
    var _type = req.params.type
    var result = [] 
    _DATA.forEach(function(mon) {
        mon["type"].forEach(function(types) {
            if (types == _type) {
                result.push(mon)
            }
        })
    })

    if (result.length == 0) return res.send({});
    heavyList = []
    nameList = []
   
    result.forEach(function(poke) {
        heavyList.push(parseInt(poke["weight"]))
        nameList.push(poke["name"])
    })

    var heaviest = 0 
    var index = 0; 
    for (let i = 0; i < heavyList.length; i++) {
        if (heavyList[i] > heaviest) {
            heaviest = heavyList[i]
            index = i
        }
    }

    res.send({"name": nameList[index], "weight": heaviest})
});

app.post("/api/weakness/:pokemon_name/add/:weakness_name", function(req, res) {
    var _name = req.params.pokemon_name
    var result = _.findWhere(_DATA, { name: _name })
    if (!result) return res.send({});

    _DATA = _DATA.filter(function (item) {
        return item["name"] != _name 
    })

    if (!result["weaknesses"].includes(req.params.weakness_name)) {
        result["weaknesses"].push(req.params.weakness_name)
    }

    _DATA.push(result)

    pokeDataUtil.saveData(_DATA);
    
    res.send({"name": result["name"], "weaknesses": result["weaknesses"]})
});

app.delete("/api/weakness/:pokemon_name/remove/:weakness_name", function(req, res) {
    var _name = req.params.pokemon_name
    var result = _.findWhere(_DATA, { name: _name })
    if (!result) return res.send({});

    _DATA = _DATA.filter(function (item) {
        return item["name"] != _name 
    })

    if (result["weaknesses"].includes(req.params.weakness_name)) {
        result["weaknesses"] = result["weaknesses"].filter(function (item) {
            return item != req.params.weakness_name
        })
    }

    _DATA.push(result)

    pokeDataUtil.saveData(_DATA);
    
    res.send({"name": result["name"], "weaknesses": result["weaknesses"]})
});


// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

// DO NOT REMOVE (for testing purposes)
exports.PORT = PORT
