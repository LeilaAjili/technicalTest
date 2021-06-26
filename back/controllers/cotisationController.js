const db = require('../config/db.config.js');
const Cotisation = db.Cotisation;

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    let cotisation = {};

    try{
        
        cotisation.intitule = req.body.intitule;
        cotisation.date = req.body.date;
        cotisation.statut = req.body.statut;
    
        
        Cotisation.create(cotisation).then(result => {    
            
            res.status(200).json({
                message: "Cotisation ajoutée avec succés= " + result.intitule,
                cotisations: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Erreur!",
            cotisations: [],
            error: error.message
        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveAllCotisations= (req, res) => {
    
    try{
        Cotisation.findAll({attributes: ['id', 'intitule', 'date', 'statut']})
        .then(cotisationInfos => {
            res.status(200).json({
                message: "liste des cotisations affichée avec succès!",
                cotisation: cotisationInfos,
                error: ""
            });
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur!",
            cotisations: [],
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
        let cotisationId = req.params.id;
        let cotisation = await Cotisation.findByPk(cotisationId);
    
        if(!cotisation){
            
            res.status(404).json({
                message: "Cotisation non trouvée = " + cotisationId,
                cotisations: [],
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                intitule: req.body.intitule,
                date: req.body.date,
                statut: req.body.statut
            }
            let result = await Cotisation.update(updatedObject, {returning: true, where: {id: cotisationId}});
            
            
            if(!result) {
                res.status(500).json({
                    message: "MAJ non effectuée= " + req.params.id,
                    error: "MAJ non effectuée",
                    cotisations: []
                });
            }

            res.status(200).json({
                message: "Demande modifiée avec succès= " + cotisationId,
                cotisations: [updatedObject],
                error: ""           
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Impossible de mettre à jour la cotisation = " + req.params.id,
            error: error.message,
            cotisations: []

        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteById = async (req, res) => {
    try{
        let cotisationId = req.params.id;
        let cotisation = await Cotisation.findByPk(cotisationId);

        if(!cotisation){
            res.status(404).json({
                message: "Cotisation non trouvée= " + cotisationId,
                error: "404",
                cotisations: []
            });
        } else {
            await cotisation.destroy();
            res.status(200).json({
                message: "Cotisation supprimée avec succès= " + cotisationId,
                cotisations: [cotisation],
                error: ""
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Impossible de supprimer la cotisation = " + req.params.id,
            error: error.message,
            cotisations: []
        });
    }
}