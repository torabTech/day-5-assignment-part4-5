const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const getAll = function (req, res) {

  const checkSID = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!checkSID) {
    res.status(400).json({ message: "Invalid ID provided" });
    return;
  }

  Game.findById(req.params.id).select('reviews').exec(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
      return;
    }
    if (!data) {
      res.status(404).json({ message: "document not found" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOne = function (req, res) {
  const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);
  const checkRID = mongoose.Types.ObjectId.isValid(req.params.rid);

  if (!checkGID || !checkRID) {
    res.status(400).json({ message: "invalid IDs have been provided" });
    return;
  }

  Game.findById(req.params.id).exec(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
      return;
    }

    if (!data) {
      res.status(404).json({ message: "Document Not Found!.." });
      return;
    }

    const reveiws = data.reveiws.id(req.params.rid);

    if (!reveiws) {
      res.status(404).json({ message: "Review Not Found!.." });
      return;
    }
    res.status(200).json(reveiws);
  });
};

const addOne = function (req, res) {
  const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!checkGID) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "body data not found" });
    return;
  }

  Game.findById(req.params.id).exec(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
      return;
    }

    data.reviews.push({ name: req.body.name, date: req.body.date });

    data.save(function (saveErr) {
      if (saveErr) {
        res.status(500).json(saveErr.message);
        return;
      }
      res.status(201).json(data);
    });
  });
};

const updateOne = function (req, res) {
  const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);
  const checkRID = mongoose.Types.ObjectId.isValid(req.params.rid);

  if (!checkGID || !checkRID) {
    res.status(400).json({ message: "Invalid IDs" });
    return;
  }
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "body data not found" });
    return;
  }

  Game.findById(req.params.id).exec(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
      return;
    }


    const review = data.reviews.id(req.params.rid);
    
    
    if (!review) {
      res.status(404).json({ message: "Review Not Found" });
      return;
    }

    review.set({
      name: req.body.name,
      date: req.body.date,
    });

    data.save(function (saveErr) {
      if (saveErr) {
        res.status(500).json(err.message);
        return;
      }

      res.status(200).json(data);
    });
  });
};

const deleteOne = function (req, res) {
  const checkGID = mongoose.Types.ObjectId.isValid(req.params.id);
  const checkRID = mongoose.Types.ObjectId.isValid(req.params.rid);

  if (!checkGID || !checkRID) {
    res.status(400).json({ message: "Invalid IDs" });
    return;
  }

  Game.findById(req.params.id).exec(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
      return;
    }

    console.log(data)
    if(!data.reviews){
        res.status(404).json({message : 'Review not found!'});
      return;
    }
    const desiredDoc = data.reviews.id(req.params.rid);
   
    if (!desiredDoc) {
      res.status(404).json({ message: "Review Not Found!" });
      return;
    }

    desiredDoc.remove();

    data.save(function (deleteErr) {
      if (deleteErr) {
        res.status(500).json(deleteErr.message);
        return;
      }

      res.status(200).json(data);
    });
  });
};

module.exports = {
  getAll: getAll,
  getOne: getOne,
  addOne: addOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
};
