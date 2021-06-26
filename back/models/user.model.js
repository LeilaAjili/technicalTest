module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  name: {
			type: Sequelize.STRING
	  },
	  firstname: {
		type: Sequelize.STRING
  	  },
	  password: {
			type: Sequelize.STRING
	  },
	  mail: {
			type: Sequelize.STRING
	  }
	});
	
	return User;
}