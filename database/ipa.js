module.exports = function (sequelize, DataTypes) {
	const ipa = sequelize.define("ipa",{
		id: {
			type: DataTypes.UUID,
			field: 'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true,
        },
        bundleId: {
            type: DataTypes.STRING(50),
            field: 'bundle_id',
		},
		displayName: {
			type: DataTypes.STRING(50),
            field: 'display_name',
		},
        bundleName: {
            type: DataTypes.STRING(50),
            field: 'bundle_name',
        },
        version: {
            type: DataTypes.STRING(20),
            field: 'version',
		},
		buildVersion: {
			type: DataTypes.STRING(50),
			field: 'build_version',
		},
		ipaPath: {
			type: DataTypes.STRING(200),
			field: 'ipa_path',
		},
	},
	{
		freezeTableName: true,
    	tableName: "ipa",
    	timestamps: true,
    	paranoid: true,
    	createdAt: 'create_time',
    	updatedAt: 'update_time',
    	deletedAt: 'delete_time',
    	comment: 'ipa文件数据',
    	charset: 'utf8mb4',
		collate: 'utf8mb4_unicode_ci',
    	instanceMethods: {

    	},
    	classMethods: {
    		
    	}
	});
	return ipa;
}