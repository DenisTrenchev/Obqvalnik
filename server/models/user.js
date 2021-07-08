module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = models => {
        User.hasOne(models.UserRole, {
            foreignKey: {
                name: 'userRoleId'
            }
        });
    }
    
    return User
}

