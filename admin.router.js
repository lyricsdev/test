const requestIp = require('request-ip');
const db = require("./db.model");
const { suggestion: Suggestion} = db;
const { votes: Votes} = db;
const { madesugg: Madesugg} = db;
const dotenv = require('dotenv')
const result = dotenv.config()

if (result.error) {
  throw result.error
}
var admin_pass = result.parsed.admin_password
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("/api/admin/action/delete",(req, res, next) => {
        const {suggestionid,password} = req.body;
        if(password === admin_pass) {

     
            Suggestion.destroy({
                where: {
                    id: suggestionid
                }
            }).then(function(count) {
                res.status(200).json({
                    message: "Suggestion deleted successfully",
                    result: count
                });
            });
       
        } else {
            res.status(200).json({
                message: "Wrong password",
                result: null
            });
        }
    });
    app.post("/api/admin/action/approve",(req, res, next) => {
        const {suggestionid,password} = req.body;
        if(password === admin_pass) {

        Suggestion.update({
            status: true
        }, {
            where: {
                id: suggestionid
            }
        }).then(function(count) {
            res.status(200).json({
                message: "Suggestion approved successfully",
                result: count
            });
        });
        } 
    });
    app.post("/api/admin/action/disapprove",(req, res, next) => {
        const {suggestionid,password} = req.body;
        if(password === admin_pass) {
            Suggestion.update({
                status: false
            }, {
                where: {
                    id: suggestionid
                }
            }).then(function(count) {
                res.status(200).json({
                    message: "Suggestion disapproved successfully",
                    result: count
                });
            });
        } 
    });    
};
