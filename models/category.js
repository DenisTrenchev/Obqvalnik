module.exports = (sequelize, DataTypes) =>{
	const Category = sequelize.define('Category', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	// Category.associate = models => {
    //     Category.belongsTo(models.Listing, {
    //         foreignKey: {
    //             name: 'categoryId'
    //         }
    //     });
    // }

	return Category;
}