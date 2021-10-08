import { EzBackend, EzModel, Type } from '@ezbackend/common'

const sample = new EzModel('sample', {
    varchar: Type.VARCHAR,
    int: Type.INT,
    float: Type.FLOAT,
    double: Type.DOUBLE,
    real: Type.REAL,
    json: Type.JSON,
    date: Type.DATE
})

const program = new EzModel('program', {
    name: Type.VARCHAR,
    users: {
        type: Type.ONE_TO_MANY,
        //URGENT TODO: Automatically get from name of model (With pluralization?)
        target: "user",
        inverseSide: "program",
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
    }
})

const noCascadeProgram = new EzModel('noCascadeProgram', {
    name: Type.VARCHAR,
    users: {
        type: Type.ONE_TO_MANY,
        target: "noCascadeUser"
    }
})

const detail = new EzModel('detail', {
    age: Type.INT
})

const noCascadeUser = new EzModel('noCascadeUser', {
    name: Type.VARCHAR,
    detail: {
        type: Type.ONE_TO_ONE,
        joinColumn: true,
        target:'detail'
    },
    program: {
        type: Type.MANY_TO_ONE,
        target: 'noCascadeProgram'
    },
    //URGENT TODO: Automatically generate the ID? Also its not necessarily INT in postgres I think
    programId: Type.INT
})

const user = new EzModel('user', {
    name: Type.VARCHAR,
    detail: {
        type: Type.ONE_TO_ONE,
        target: 'detail',
        cascade: true,
        eager: true,
        joinColumn: true
    },
    program: {
        type: Type.MANY_TO_ONE,
        target: 'program',
        inverseSide: 'users'
    },
})

const sampleNullable = new EzModel('SampleNullable', {
    varchar: {
        type: Type.VARCHAR,
        nullable: true
    },
    int: {
        type: Type.INT,
        nullable: true
    },
    boolean: {
        type: Type.BOOL,
        nullable: true
    }

})

const ezb = new EzBackend()

//Register models
ezb.addApp('SampleNullable', sampleNullable, { prefix: 'SampleNullable' })
ezb.addApp('User', user, { prefix: 'User' })
ezb.addApp('noCascadeUser', noCascadeUser, { prefix: 'NoCascadeUser' })
ezb.addApp('detail', detail, { prefix: 'Detail' })
ezb.addApp('NoCascadeProgram', noCascadeProgram, { prefix: 'NoCascadeProgram' })
ezb.addApp('Program', program, { prefix: 'Program' })
ezb.addApp('Sample', sample, { prefix: 'Sample' })

//Prevent server from starting
ezb.removeHook("_run", "Run Fastify Server")

// ezb.start({
//     port: 3000,
//     server: {
//     },
//     orm: {
//       type: "sqlite",
//       database: ":memory:",
//       synchronize: true
//     }
//   })

export default ezb

