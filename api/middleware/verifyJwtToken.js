const jwt = require('jsonwebtoken');
const config = require('../configs/config');
// const User = require('../model/user.model.js');
// const Role = require('../model/role.model.js');
 
verifyToken = (req, res, next) => {
	const token = req.headers['authorization'];
	// let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send('No token provided.');
	}
 
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(401).send('Fail to Authentication. Error -> ' + err);
		}
		req.userId = decoded.id;
		next();
	});
}
 
// isAdmin = (req, res, next) => {
	
// 	User.findOne({ _id: req.userId })
// 	.exec((err, user) => {
// 		if (err){
// 			if(err.kind === 'ObjectId') {
// 				return res.status(404).send({
// 					message: "User not found with Username = " + req.body.username
// 				});                
// 			}
// 			return res.status(500).send({
// 				message: "Error retrieving User with Username = " + req.body.username
// 			});
// 		}
 
// 		Role.find({
// 			'_id': { $in: user.roles }
// 		}, (err, roles) => {
// 			if(err) 
// 				res.status(500).send("Error -> " + err);
 
// 			for(let i=0; i<roles.length; i++){
// 				if(roles[i].name.toUpperCase() === "ADMIN"){
// 					next();
// 					return;
// 				}
// 			}
			
// 			res.status(403).send("Require Admin Role!");
// 			return;
// 		});
// 	});
// }
 
// isPmOrAdmin = (req, res, next) => {
// 	User.findOne({ _id: req.userId })
// 	.exec((err, user) => {
// 		if (err){
// 			if(err.kind === 'ObjectId') {
// 				return res.status(404).send({
// 					message: "User not found with Username = " + req.body.username
// 				});                
// 			}
// 			return res.status(500).send({
// 				message: "Error retrieving User with Username = " + req.body.username
// 			});
// 		}
		
// 		Role.find({
// 			'_id': { $in: user.roles }
// 		}, (err, roles) => {
// 			if(err) 
// 				res.status(500).send("Error -> " + err);
 
// 			for(let i=0; i<roles.length; i++){
// 				let role = roles[i].name.toUpperCase();
// 				if(role === "PM" || role === "ADMIN"){
// 					next();
// 					return;
// 				}
// 			}
			
// 			res.status(403).send("Require PM or Admin Roles!");
// 			return;
// 		});
// 	});
// }
 
const authJwt = {};
authJwt.verifyToken = verifyToken;
// authJwt.isAdmin = isAdmin;
// authJwt.isPmOrAdmin = isPmOrAdmin;
 
module.exports = authJwt;