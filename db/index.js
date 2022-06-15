const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');


const Collector = conn.define('collector', {
    name: {
        type: STRING,
        allowNull: false,
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


const syncAndSeed = async()=> {
    await conn.sync({force : true });

    // let guitars = [
    //     {
    //         model: "Stratocaster"
    //     },
    //     {
    //         model: "Telecaster"
    //     },
    //     {
    //         model: "Les Paul"
    //     },
    //     {
    //         model: "J-50"
    //     },
    //     {
    //         model: "Martin"
    //     },
    //     {
    //         model: "Taylor"
    //     }
    // ];
    
    //let guitars = await Promise.all(['Stratocaster', 'Telecaster', 'Les Paul'].map( model => Guitar.create({ model })));
    let [Stratocaster, Telecaster, Les_Paul] = await Promise.all([
        Guitar.create({model: 'Stratocaster'}),
        Guitar.create({model: 'Telecaster'}),
        Guitar.create({model: 'Les_Paul'}),
    ]);
    
    // guitars = guitars.reduce( (acc, guitar) => {
    //     acc[guitar.brand] = guitar;
    //     return acc;
    //   }, {}); 

    const [Adam, Slash, Keith, Jimi, Eric, Stevie] = await Promise.all(['Adam', 'Slash', 'Keith', 'Jimi', 'Eric', 'Stevie'].map( name => Collector.create({ name })));
    
    const collections = await Promise.all([
        Collection.create({collectorId: Adam.id, guitarId: Stratocaster.id}),
        Collection.create({collectorId: Adam.id, guitarId: Telecaster.id}),
        Collection.create({collectorId: Adam.id, guitarId: Les_Paul.id}),
        Collection.create({collectorId: Slash.id, guitarId: Les_Paul.id}),
        Collection.create({collectorId: Keith.id, guitarId: Telecaster.id}),
        Collection.create({collectorId: Eric.id, guitarId: Stratocaster.id}),
        Collection.create({collectorId: Stevie.id, guitarId: Stratocaster.id}),
        ])

    // collectors = collectors.reduce( (acc, collector) => {
    //     acc[collector.name] = collector;
    //     return acc;
    //   }, {});

    //const collections = await Promise.all([
         //Collector.create({ collectorId: collectors.Adam.id, guitarId: Stratocaster.id }),
    //     Collection.create({ collectorId: collectors.Adam.id, modelId: guitars.id }),
        // Collection.create({ collectorId: collectors.Adam.id, modelId: Martin.id }),
        // Collection.create({ collectorId: collectors.Colton.id, modelId: guitars.Telecaster.id }),
        // Collection.create({ collectorId: collectors.Prof.id, modelId: guitars.Taylor.id })
    //]);
    // return {
    //     collectors,
    //     guitars,
    //     //collections
    // };
};


module.exports = {
    Collector,
    Guitar,
    //Collection,
    conn, 
    syncAndSeed
};