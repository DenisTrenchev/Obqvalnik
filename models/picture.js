module.exports = (sequelize, DataTypes) =>{
	const Picture = sequelize.define('Picture', {
		fileName: {
			type: DataTypes.STRING,
			allowNull: false
		}
        // fileLocation: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
	});

    // Picture.associate = models => {
    //     Picture.belongsTo(models.Listing, {
    //         foreignKey: {
    //             name: 'listingId'
    //         }
    //     });
    // }

	return Picture;
}