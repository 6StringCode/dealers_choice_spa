const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const syncAndSeed = async()=> {
    await conn.sync({force : true });

    let guitars = [
        {
            model: "Stratocaster"
        },
        {
            model: "Telecaster"
        },
        {
            model: "Les Paul"
        },
        {
            model: "J-50"
        },
        {
            model: "Martin"
        },
        {
            model: "Taylor"
        }
    ];
    
    guitars = await Promise.all(guitars.map( guitar => Guitar.create( guitar )));
    
    guitars = guitars.reduce( (acc, guitar) => {
        acc[guitar.brand] = guitar;
        return acc;
      }, {}); 

    let collectors = await Promise.all(['Adam', 'Colton', 'Prof', 'Jonathan'].map( name => Collector.create({ name })));
    collectors = collectors.reduce( (acc, collector) => {
        acc[collector.name] = collector;
        return acc;
      }, {});

    const collections = await Promise.all([
        Collection.create({ collectorId: collectors.Adam.id, modelId: guitars.Stratocaster.id }),
        Collection.create({ collectorId: collectors.Adam.id, modelId: guitars.Telecaster.id }),
        Collection.create({ collectorId: collectors.Adam.id, modelId: guitars.Martin.id }),
        Collection.create({ collectorId: collectors.Colton.id, modelId: guitars.Telecaster.id }),
        Collection.create({ collectorId: collectors.Prof.id, modelId: guitars.Taylor.id })
    ]);
    return {
        collectors,
        guitars,
        collections
    };
};

const Collector = conn.define('collector', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validation: {
            notEmpty: true
        }
        //To Do - add first/last name functionality?
    }
});

const Guitar = conn.define('guitar', {
    model: {
        type: STRING,
        allowNull: false,
        unique: true,
        validation: {
            notEmpty: true
        }
    }
    //To do - add a vintage year property, and potentially a price?   
});

const Collection = conn.define('collection', {});

Collection.belongsTo(Collector);
Collection.belongsTo(Guitar);


module.exports = {
    Collector,
    Guitar,
    Collection,
    conn, 
    syncAndSeed
};