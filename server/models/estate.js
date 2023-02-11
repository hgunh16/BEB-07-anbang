// 1. types전세/월세
// 2. deposit보증금
// 3. rental 월세
// 4. description설명
// 5. tokenId
// 6. isSelling(판매중인가?)
// 7. owner 소유주 - userId 외래키


const Sequelize = require('sequelize');

class Estate extends Sequelize.Model{
    static initiate(sequelize){
        Estate.init(
            {
            types : {
                type: Sequelize.STRING,
                allowNull : false,
            },
            deposit : {
                type : Sequelize.INTEGER,
                allowNull: false
            },
            rental : {
                type : Sequelize.INTEGER,
            },
            description : {
                type : Sequelize.STRING,
                allowNull : false
            },
            tokenId : {
                type: Sequelize.STRING,
                unique:true,
            },
            IsSelling :  { 
                type:Sequelize.BOOLEAN,
                defaultValue : true,
            
            },
            }, 
            {
                sequelize,
                    timestamps: true,
                    modelName : 'Estate',
                    tableName : 'estates',
                    charset : 'utf8',
                    collate : 'utf8_general_ci'
            }
        );

    }

    static associate(db){
        db.Estate.belongsTo(db.User, {foreignKey : 'owner', targetKey : 'id'})
        db.Estate.belongsTo(db.User, {foreignKey: 'contractor', targetKey :'id'})
        db.Estate.hasOne(db.Dmroom, {foreignKey : 'estateId', sourceKey : 'id'})
        db.Estate.hasMany(db.Report, {foreignKey : 'reportId', sourceKey : 'id'})
        db.Estate.hasMany(db.OwnerAgreement, {foreignKey:'ownerestateTokenId', sourceKey:'tokenId'})
        db.Estate.hasMany(db.TenantAgreement, {foreignKey:'tenantestateTokenId', sourceKey: 'tokenId'})
    };
}

module.exports= Estate;