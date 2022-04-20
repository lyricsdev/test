const requestIp = require('request-ip');
const {getRequestIpAddress} = require('./request_ip_address');
const db = require("./db.model");

const { suggestion: Suggestion} = db;
const { votes: Votes} = db;
const { madesugg: Madesugg} = db;
const { user: User} = db;

function checkonfivetimes(votes) {
    if(votes >= 5) {
        return true;
    }
    return false;
}
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("/api/makesuggestion",(req, res, next) => {
        const ip = getRequestIpAddress(req);

        Madesugg.findall({
            where: { 
                distinct: ip,
            }
        }).then(function(count) {
            if(checkonfivetimes(count)) {
                User.update({
                    canpublish: false
                }, {
                    where: {
                        ip: ip
                    }
                });
                res.status(200).json({
                    message: `You have already made ${count} times a suggestions`,
                    result: count
                });
            } else {
            const ip = getRequestIpAddress(req);
            const {title, content} = req.body;
            Suggestion.create({
                title,
                content,
                ip
            }).then(result => {

                res.status(200).json({
                    message: "Suggestion added successfully",
                    result: result
                });
            });
        }
        });

    });
    app.post("/api/getsuggestions",(req, res, next) =>  {
            Suggestion.findAll({
                order: [
                    ['votes', 'DESC']
                ]
            }).then(function(result) {
                res.status(200).json({
                    message: "Suggestion sorted by votes",
                    result: result
                });
            });
        });
    app.post("/api/addvote",(req, res, next) => {
        const ip = getRequestIpAddress(req);
        Votes.findall({
            where: {
                distinct: ip,
            }
        }).then(function(count) {
            if(checkonfivetimes(count)) {
                User.update({
                    canvote: false
                }, {
                    where: {
                        ip: ip
                    }
                });
                res.status(200).json({
                    message: "You have already voted 5 times",
                    result: count
                });
            } else {
                const {id} = req.body;
                Suggestion.findOne({
                    where: {
                        id
                    }
                }).then(result => {
                    if(result) {
                        Suggestion.update({
                            votes: result.votes + 1
                        }, {
                            where: {
                                id
                            }
                        }).then(result => {
                            res.status(200).json({
                                message: "Vote added successfully",
                                result: result
                            });
                        });
                    } else {
                        res.status(200).json({
                            message: "Suggestion not found",
                            result: result
                        });
                    }
                });
            }
        });
    
    });
    app.post("/api/check/votes",(req, res, next) => {
        const ip = getRequestIpAddress(req);
        Votes.findall({
            where: {
                distinct: ip,
            }
        }).then(function(count) {
            if(checkonfivetimes(count)) {
            
                res.status(200).json({
                    message: `You have already voted ${count} times`,
                    result: 5-count
                });
            } else {
                const {id} = req.body;
                Suggestion.findOne({
                    where: {
                        id
                    }
                }).then(result => {
                    if(result) {
                        res.status(200).json({
                            message: "You have already voted",
                            result: result
                        });
                    } else {
                        res.status(200).json({
                            message: "You have not voted yet",
                            result: result
                        });
                    }
                });
            }
        });
    
    });
    app.post("/api/check/suggestion",(req, res, next) => {
        const ip = getRequestIpAddress(req);
        Madesugg.findall({
            where: {
                distinct: ip,
            }
        }).then(function(count) {
            if(checkonfivetimes(count)) {
                res.status(200).json({
                    message: `You have already made ${count} times a suggestions`,
                    result: 5-count
                });
            }
        });
    
    });
};
  