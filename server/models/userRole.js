module.exports = (sequelize, DataTypes) =>{
	const UserRole = sequelize.define('UserRole', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return UserRole;
}