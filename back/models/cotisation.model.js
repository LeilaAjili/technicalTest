module.exports = (sequelize, Sequelize) => {
	const Cotisation = sequelize.define('cotisation', {	
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
	
	return Cotisation;
}