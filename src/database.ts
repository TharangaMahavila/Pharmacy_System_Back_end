import sqlite from "sqlite3";
import userService from "./service/user.service";

const sqlite3 = sqlite.verbose();
let dropSql: string[] = [];
let createSql: string[] = [];

let db: sqlite.Database;

export const connectToDB = async () => {
    db = new sqlite3.Database('./pharmacy_system.db', sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            return console.error(err.message);
        }
    });

    dropSql.push(`DROP TABLE IF EXISTS users`);
    dropSql.push(`DROP TABLE IF EXISTS customers`);
    dropSql.push(`DROP TABLE IF EXISTS medicine`);

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

    createSql.push(
        `CREATE TABLE IF NOT EXISTS customers 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR NOT NULL,
            last_name VARCHAR,
            contact VARCHAR,
            active BOOLEAN DEFAULT 1
        )`
    );

    createSql.push(
        `CREATE TABLE IF NOT EXISTS medicine 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            quantity REAL DEFAULT 0,
            active BOOLEAN DEFAULT 1
        )`
    );

    const dropTables = async () => {
        for(let query of dropSql) {
            await db.exec(query);
        }
    }

    const createTables = async () => {
        for(let query of createSql) {
            await db.exec(query);
        }
    }

    await dropTables();
    await createTables();
    userService.create({
        username: 'admin', 
        firstName: 'admin', 
        lastName: undefined,
        role: 'Owner',
        password: 'admin'
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

