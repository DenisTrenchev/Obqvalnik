module.exports = (sequelize, DataTypes) =>{
	const ListingType = sequelize.define('ListingType', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	// ListingType.associate = models => {
    //     ListingType.belongsTo(models.Listing, {
    //         foreignKey: {
    //             name: 'listingTypeId'
    //         }
    //     });
    // }

	return ListingType;
}