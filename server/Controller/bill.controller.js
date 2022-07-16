const Connection = require("../Connection");
const billModel = require("../Models/bill.model");

const router = require("express").Router();

router.get("/bills", (req, res, next) => {
  try {
    Connection()
      .then(() => {
        billModel
          .find()
          .then((bills) => {
            res.status(200).send({ bills });
          })
          .catch((error) => {
            res.status(400).send({ error });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ error });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.post("/addBill", (req, res, next) => {
  try {
    Connection()
      .then(() => {
        console.log(req.body);
        const bill = new billModel(req.body);
        bill.save((error, success) => {
          if (error) {
            res.status(400).send({ error });
          }
          res.status(200).send({ result: success });
        });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(400).send({ error });
  }
});
router.delete("/delete/:id", (req, res, next) => {
  try {
    Connection()
      .then(() => {
        console.log(req.params.id);
        billModel.findByIdAndRemove(req.params.id, (error, success) => {
          if (error) {
            res.status(400).send({ error });
          }
          res.status(200).send({ result: success });
        });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.put("/:id/edit", (req, res, next) => {
  try {
    Connection()
      .then(() => {
        billModel
          .findByIdAndUpdate(req.params.id, req.body)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            res.status(400).send({ error });
          });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/bill/:id", (req, res, next) => {
  try {
    Connection().then(() => {
      billModel.findById(req.params.id, (error, docs) => {
        if (error) {
          res.status(400).send({ error });
        }
        res.status(200).send(docs);
      });
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
