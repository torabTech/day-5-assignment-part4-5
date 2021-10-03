const mongoose = require('mongoose');
const Game = mongoose.model('Game'); 

getAll = function(req,res){
    const checkSID = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!checkSID){
        res.status(400).json({message : 'Invalid ID provided'});
        return;
    }

    Game.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }
        if(!data){
            res.status(404).json({message: 'document not found'});
            return;
        }
        res.status(200).json(data.publisher);
    });
}

getOne = function(req,res){

    const checkGID = mongoose.Types.ObjectId.isValid(req.params.id); 
    const checkPID = mongoose.Types.ObjectId.isValid(req.params.pid);
    

    if(!checkGID || !checkPID){
        res.status(400).json({message:'invalid IDs have been provided'});
        return;
    }

    Game.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        if(!data){
            res.status(404).json({message: 'Document Not Found!..'});
            return;
        }

        const publisher = data.publisher.id(req.params.pid);

        if(!publisher){
            res.status(404).json({message: 'Publisher Not Found!..'});
            return;
        }
        res.status(200).json(publisher);
    });
}


addOne = function(req,res){
    const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);

    if(!checkGID){
        res.status(400).json({message: 'Invalid ID'});
        return; 
    }
    if(Object.keys(req.body).length == 0){
        res.status(400).json({message: 'body data not found'});
        return; 
    }

    Game.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        data.publisher.push(
            {name : req.body.name,
            country :  req.body.country});

        data.save(function(saveErr){
            if(saveErr){
                res.status(500).json(saveErr.message);
                return;
            }
            res.status(200).json(data);
        });
    });

}

updateOne = function(req,res){

    const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);
    const checkPID = mongoose.Types.ObjectId.isValid(req.params.pid); 

    if(!checkGID || !checkPID){
        res.status(400).json({message: 'Invalid IDs'});
        return; 
    }
    if(Object.keys(req.body).length == 0){
        res.status(400).json({message: 'body data not found'});
        return; 
    }

    Game.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        const publisher =  data.publisher.id(req.params.pid);

        if(!publisher){
            res.status(404).json({message : 'Publisher Not Found'});
            return;
        }

        publisher.set({
            name : req.body.name,
            country : req.body.country
        });

        data.save(function(saveErr){
            if(saveErr){
                res.status(500).json(err.message);
                return; 
            }

            res.status(200).json(data);
        });

    });

}

deleteOne = function(req,res){
    const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);
    const checkPID = mongoose.Types.ObjectId.isValid(req.params.pid); 

    if(!checkGID || !checkPID){
        res.status(400).json({message: 'Invalid IDs'});
        return; 
    }

    Game.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        const desiredDoc =  data.publisher.id(req.params.pid);

        if(!desiredDoc){
            res.status(404).json({message : 'Publisher Not Found!'});
            return;
        }

        desiredDoc.remove();
    
        data.save(function(deleteErr){
            if(deleteErr){
                res.status(500).json(deleteErr.message);
                return;
            }

            res.status(200).json(data);
        });


    });
}


module.exports = {
    getAll : getAll,
    getOne : getOne,
    addOne : addOne,
    updateOne : updateOne,
    deleteOne : deleteOne
}