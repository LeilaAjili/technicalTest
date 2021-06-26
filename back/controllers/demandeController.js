const db = require('../config/db.config.js');
const Demande = db.Demande;

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    let demande = {};

    try{
        
        demande.intitule = req.body.intitule;
        demande.date = req.body.date;
        demande.statut = req.body.statut;
    
        
        Demande.create(demande).then(result => {    
            
            res.status(200).json({
                message: "Demande ajoutée avec succés= " + result.intitule,
                demandes: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Erreur!",
            demandes: [],
            error: error.message
        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveAllDemandes= (req, res) => {
    
    try{
        Demande.findAll({attributes: ['id', 'intitule', 'date', 'statut']})
        .then(demandesInfos => {
            res.status(200).json({
                message: "liste des demandes affichée avec succès!",
                demandes: demandesInfos,
                error: ""
            });
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur!",
            demandes: [],
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
        let demandeId = req.params.id;
        let demande = await Demande.findByPk(demandeId);
    
        if(!demande){
            
            res.status(404).json({
                message: "Demande non trouvée = " + demandeId,
                demandes: [],
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                intitule: req.body.intitule,
                date: req.body.date,
                statut: req.body.statut
            }
            let result = await Demande.update(updatedObject, {returning: true, where: {id: demandeId}});
            
            
            if(!result) {
                res.status(500).json({
                    message: "MAJ non effectuée= " + req.params.id,
                    error: "MAJ non effectuée",
                    demandes: []
                });
            }

            res.status(200).json({
                message: "Demande modifiée avec succès= " + demandeId,
                demandes: [updatedObject],
                error: ""           
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Impossible de mettre à jour la demande = " + req.params.id,
            error: error.message,
            demandes: []

        });
    }
}

/**
 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteById = async (req, res) => {
    try{
        let demandeId = req.params.id;
        let demande = await Demande.findByPk(demandeId);

        if(!demande){
            res.status(404).json({
                message: "Demande non trouvée= " + demandeId,
                error: "404",
                demandes: []
            });
        } else {
            await demande.destroy();
            res.status(200).json({
                message: "Demande supprimée avec succès= " + demandeId,
                demandes: [demande],
                error: ""
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Impossible de supprimer la demande = " + req.params.id,
            error: error.message,
            demandes: []
        });
    }
}