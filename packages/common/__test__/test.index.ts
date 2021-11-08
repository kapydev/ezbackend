import { EzBackend, EzModel, Type } from '../src'

const sample = new EzModel('sample', {
    varchar: Type.VARCHAR,
    int: Type.INT,
    float: Type.FLOAT,
    double: Type.DOUBLE,
    real: Type.REAL,
    json: Type.JSON,
    date: Type.DATE,
    enum: {
        type: Type.ENUM,
        enum: ["type1","type2"]
    },
    smallint: {
        type: "smallint" //For testing directly specifying the typeorm type
    }
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

const sampleUnique = new EzModel("SampleUnique", {
    idNumber: {
        type: Type.INT,
        unique:true
    }
})

const user2 = new EzModel("User2",{
    programs: {
        type: Type.MANY_TO_MANY,
        target: "Program2",
        inverseSide: "users"
    }
})

const program2 = new EzModel("Program2", {
    users: {
        type: Type.MANY_TO_MANY,
        target: "User2",
        inverseSide: "programs"
    }
})

const ezb = new EzBackend()

//Register models
ezb.addApp(sampleNullable, { prefix: 'SampleNullable' })
ezb.addApp(user, { prefix: 'User' })
ezb.addApp(noCascadeUser, { prefix: 'NoCascadeUser' })
ezb.addApp(detail, { prefix: 'Detail' })
ezb.addApp(noCascadeProgram, { prefix: 'NoCascadeProgram' })
ezb.addApp(program, { prefix: 'Program' })
ezb.addApp(sample, { prefix: 'Sample' })
ezb.addApp(sampleUnique, { prefix: 'SampleUnique' })
ezb.addApp(user2, { prefix: 'User2' })
ezb.addApp(program2, { prefix: 'Program2' })

//Prevent server from starting
ezb.removeHook("_run", "Run Fastify Server")

export default ezb

