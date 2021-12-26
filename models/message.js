module.exports = (sequelize, DataTypes) =>{
	const Message = sequelize.define('Message',{
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
        sender: {
            type: DataTypes.INTEGER,
			allowNull: false
        },
        reciever: {
            type: DataTypes.INTEGER,
			allowNull: false
        }
	});

	return Message;
}