module.exports = (sequelize, DataTypes) =>{
    const Listing = sequelize.define('Listing', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING
        }
    });

    Listing.associate = models => {
        Listing.belongsTo(models.User, {
            foreignKey: {
                name: 'userId'
            }
        });
        Listing.belongsTo(models.ListingType);
        Listing.belongsTo(models.Category);
        Listing.hasMany(models.Picture);
    }

    return Listing
}