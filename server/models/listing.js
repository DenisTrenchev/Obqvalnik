module.exports = (sequelize, DataTypes) =>{
    const Listing = sequelize.define('Listing', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Listing.associate = models => {
        Listing.belongsTo(models.User, {
            foreignKey: {
                name: 'userId'
            }
        });
        Listing.hasOne(models.ListingType, {
            foreignKey: {
                name: 'listingTypeId'
            }
        });
    }

    return Listing
}