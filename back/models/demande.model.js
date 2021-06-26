module.exports = (sequelize, Sequelize) => {
	const Demande = sequelize.define('demande', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  intitule: {
			type: Sequelize.STRING
	  },
	  date: {
		type: Sequelize.DATE
  	  },
	  statut: {
			type: Sequelize.STRING
	  }
	});
	
	return Demande;
}