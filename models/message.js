module.exports = (sequelize, DataTypes) =>{
	const Message = sequelize.define('Message',{
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
        reciever: {
            type: DataTypes.INTEGER,
			allowNull: false
        }
	});

	Message.associate = models => {
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'sender'
            }
        });
    }

	return Message;
}