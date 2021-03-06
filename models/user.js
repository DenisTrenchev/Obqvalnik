module.exports = (sequelize, DataTypes) =>{
	const User = sequelize.define('User',{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'Users'
	});

	User.associate = models => {
		User.belongsTo(models.UserRole, {
			foreignKey:{
				name: 'userRole'
			}
		});
	}

	return User;
}