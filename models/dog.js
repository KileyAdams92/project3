module.exports = function(Sequelize, DataTypes) {
  
	var Dog = Sequelize.define('Dog', {
		id: { 
			autoIncrement: true, 
			primaryKey: true, 
			type: DataTypes.INTEGER
        },
        username: { 
			type: DataTypes.STRING,
			notEmpty: true
        },
        password : {
			type: DataTypes.STRING,
			allowNull: false 
        }, 
        last_login: {
			type: DataTypes.DATE
		}, 
		name: { 
			type: DataTypes.STRING,
			notEmpty: true
		},
        location: {
            type: DataTypes.STRING,
            notEmpty: true
        },
		breed : {
            type: DataTypes.TEXT,
            notEmpty: true
        },
        // age : {
        //     type: DataTypes.INTEGER (10)
        // },
        size : {
            type: DataTypes.TEXT,
            notEmpty: true
        },
        description : {
            type: DataTypes.TEXT,
            validate: {
                len: [1, 300]
            }
        },
		email: { 
			type:DataTypes.STRING, 
			allowNull: false, 
			unique: true, 
			validate: {isEmail:true} 			
		},
        // status: {
		// 	type: DataTypes.ENUM('active','inactive'),
		// 	defaultValue:'active' 
		// },
		imgUrl: {
			type: DataTypes.TEXT
        },
        // classMethods: {
        //     associate: function(models) {
        //         Dog.hasMany(models.Reviews);
        //     }
        // }
    
    });
    // Dog.associate = function(models) {
    //     models.Dog.belongsTo(models.User, {
    //         foriengKey: {
    //             allowNull: false
    //         }
    //     });
    // };
	return Dog;

}; 
