module.exports = (sequelize, DataTypes) =>{
	const ListingTag = sequelize.define('ListingTag');

    ListingTag.associate = models => {
        ListingTag.belongsTo(models.Listing, {
            foreignKey: {
                name: 'listingId'
            }
        });
        ListingTag.belongsTo(models.Tag, {
            foreignKey: {
                name: 'tagId'
            }
        });
    }

	return ListingTag;
}