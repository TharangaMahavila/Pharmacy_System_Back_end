import sqlite from "sqlite3";

const sqlite3 = sqlite.verbose();
let dropSql: string[] = [];
let createSql: string[] = [];

let db: sqlite.Database;

export const connectToDB = () => {
    db = new sqlite3.Database('./pharmacy_system.db', sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            return console.error(err.message);
        }
    });

    dropSql.push(`DROP TABLE IF EXISTS users`);

    createSql.push(
        `CREATE TABLE IF NOT EXISTS users 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR NOT NULL,
            first_name VARCHAR NOT NULL,
            last_name VARCHAR,
            role VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            active BOOLEAN DEFAULT 1,
            CONSTRAINT username_unique UNIQUE (username)
        )`
    );

    dropSql.map((sql) => {
        db.run(sql);
    });

    createSql.map((sql) => {
        db.run(sql);
    });

    return db;
}

const getDBInstance = () => {
    if(db) {
        return db;
    } else {
        return connectToDB();
    }
}

export {getDBInstance, db}

