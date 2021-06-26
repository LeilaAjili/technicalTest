const db = require('../config/db.config.js');
const User = db.User;

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    let user = {};

    try{
        
        user.name = req.body.name;
        user.firstname = req.body.firstname;
        user.password = req.body.password;
        user.mail = req.body.mail;
    
        
        User.create(user).then(result => {    
            
            res.status(200).json({
                message: "Utilisateur ajouté avec succés= " + result.name,
                users: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Erreur!",
            users: [],
            error: error.message
        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveAllUsers= (req, res) => {
    
    try{
        User.findAll({attributes: ['id', 'name', 'firstname', 'password', 'mail']})
        .then(usersInfos => {
            res.status(200).json({
                message: "liste des utilisateurs affichée avec succès!",
                users: usersInfos,
                error: ""
            });
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Erreur!",
            users: [],
            error: error
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateById = async (req, res) => {
    try{
        let userId = req.params.id;
        let user = await User.findByPk(userId);
    
        if(!user){
            
            res.status(404).json({
                message: "Utilisateur non trouvé = " + userId,
                users: [],
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                name: req.body.name,
                firstname: req.body.firstname,
                password: req.body.password,
                mail: req.body.mail
            }
            let result = await User.update(updatedObject, {returning: true, where: {id: userId}});
            
            
            if(!result) {
                res.status(500).json({
                    message: "MAJ non effectuée= " + req.params.id,
                    error: "MAJ non effectuée",
                    users: []
                });
            }

            res.status(200).json({
                message: "Compte modifié avec succès= " + userId,
                users: [updatedObject],
                error: ""           
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Impossible de mettre à jour l'utilisateur = " + req.params.id,
            error: error.message,
            users: []

        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteById = async (req, res) => {
    try{
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if(!user){
            res.status(404).json({
                message: "Utilisateur non trouvé= " + userId,
                error: "404",
                users: []
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Utilisateur supprimé avec succès= " + userId,
                users: [user],
                error: ""
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Impossible de supprimer l'utilisateur = " + req.params.id,
            error: error.message,
            users: []
        });
    }
}