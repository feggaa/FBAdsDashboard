package com.devlinetech.adsdashbord

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteQueryBuilder
import android.widget.Toast
import android.database.sqlite.SQLiteOpenHelper as SqliteSQLiteOpenHelper

class DbManager{
    val dbName = "AdsDataBase.db"
    val dbTable = "Clintes"
    val dbVersion = 1

    val sqlTableClintes = "CREATE TABLE 'Clintes' ('ID' INTEGER PRIMARY KEY AUTOINCREMENT,'cName' TEXT,'Phone' TEXT,'Address' TEXT,'Contact' TEXT,'img' TEXT,'Credit' TEXT);"
    val sqlTablePages   = "CREATE TABLE 'Pages' ('ID' INTEGER PRIMARY KEY AUTOINCREMENT,'pName' TEXT,'Link' TEXT,'Likes' INTEGER,'AdminID' INTEGER,'Logo' TEXT);"
    val sqlTablePayments   = "CREATE TABLE 'Payments' ('ID' INTEGER PRIMARY KEY AUTOINCREMENT,'AdminID' TEXT,'Amount' TEXT,'Date' TEXT,'Time' TEXT);"
    val sqlTableBoosts   = "CREATE TABLE 'Boost' ('ID' INTEGER PRIMARY KEY AUTOINCREMENT,'AdminID' TEXT,'PageID' TEXT,'Date' TEXT,'Time' TEXT,'End' TEXT,'Budget' TEXT,'State' TEXT,'Doller' TEXT);"

    var sqlDB:SQLiteDatabase?   = null


    constructor(context: Context)
    {
        var db = Databasehelper(context)
        sqlDB = db.writableDatabase

    }

    inner class Databasehelper: SqliteSQLiteOpenHelper {

        var context:Context?= null
        constructor(context: Context):super(context,dbName,null,dbVersion)
        {
            this.context = context
        }

        override fun onCreate(db: SQLiteDatabase?) {
            db!!.execSQL(sqlTableClintes)
            db!!.execSQL(sqlTablePages)
            db!!.execSQL(sqlTablePayments)
            db!!.execSQL(sqlTableBoosts)
            Toast.makeText(context,"Database is  created",Toast.LENGTH_LONG).show()
            //val values = ContentValues()
            //values.put("Title", "Login")
            //values.put("Description", "Yes")
        }

        override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
            db!!.execSQL("Drop table IF EXISTS "+dbTable+"")
        }
    }

    fun getAllName(dbTable : String): Cursor? {
        return sqlDB!!.rawQuery("SELECT * FROM '"+dbTable+"'", null)
    }
    fun SQL(sql :String): Cursor? {
        return sqlDB!!.rawQuery(sql, null)
    }

    fun execSQL(sql :String): Any? {
        return sqlDB!!.execSQL(sql)
    }

    fun insert(values: ContentValues,dbTable : String):Long{
        val id =  sqlDB!!.insert(dbTable,"",values)
        return id
    }

    fun delete(selection: String,selectionArgs: Array<String>,dbTable : String):Int{
        val count = sqlDB!!.delete(dbTable,selection,selectionArgs)
        return count
    }

    fun update(values:ContentValues,selection: String,selectionArgs: Array<String>,dbTable : String):Int{
        val count = sqlDB!!.update(dbTable,values,selection,selectionArgs)
        return count
    }





}