module.exports = (sequelize, DataTypes) =>{
	const ListingType = sequelize.define('ListingType', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return ListingType;
}