const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const ws = fs.createWriteStream("mydb.csv");
const { connection } = require('../connection');
const path = require("path")


const fastFile = require("fast-file-converter").default;

/* const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    //database: "analytics"
}); */


exports.database = async (req, res, next) => {
    connection.connect(function (err) {

        connection.query("show databases", function (err, result, fields) {
            if (err) throw err;
            const results = result.map((r) => r["Database"]);
            if (results) {
                res
                    .status(200)
                    .json({
                        "Total-Databases": result.length,
                        result,
                        message: "Databases Found!",
                    });
                //console.log(results);
            }
            /* for (i = 0; i < result.length; i++) {
                  connection.query("show tables", function (err, tables, fields) {
                      if (err) throw err;
                      console.log(tables[i]);
                  });
              } */
        });
    });
};

exports.table = async (req, res, next) => {
    try {
        connection.connect(function (err) {

            let query = "select table_schema, table_name from information_schema.tables WHERE table_schema NOT IN ( 'information_schema', 'performance_schema', 'mysql','phpmyadmin' )"
            connection.query(query, function (err, tables, fields) {
                if (err) throw err;
                const result = tables.map((table) => table["table_name"]);
                if (result) {
                    res
                        .status(200)
                        .json({
                            "Total-Tables": result.length,
                            result,
                            message: "Tables Found!",
                        });
                    //console.log(result);
                }
            }
            );
        });
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};

exports.tableByDb = async (req, res, next) => {
    try {

        let dbname = req.body.dbname;

        connection.connect(function (err) {
            let query1 = "SHOW TABLES FROM " + dbname;
            //let query2="SHOW FULL TABLES IN "+ dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query1, function (err, table, fields) {
                if (err) throw err;
                //console.log(table)
                /* connection.query(query2, function (err, view, fields) {
                    if (err) throw err;
                    console.log(view) */

                if (table) {
                    res.status(200).json({ table, message: "Tables Found!" });
                    //console.log(result);
                }
            });
        });
        //})
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};

exports.viewByDb = async (req, res, next) => {
    try {

        let dbname = req.body.dbname;

        connection.connect(function (err) {
            //let query1 = "SHOW TABLES FROM " + dbname;
            let query2 = "SHOW FULL TABLES IN " + dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query2, function (err, table, fields) {
                if (err) throw err;
                //console.log(table)
                /* connection.query(query2, function (err, view, fields) {
                    if (err) throw err;
                    console.log(view) */

                if (table) {
                    res.status(200).json({ table, message: "Tables Found!" });
                    //console.log(result);
                }
            });
        });
        //})
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};

exports.downloadCsv = async (req, res, next) => {
    try {
        let dbname = req.body.dbname;

        let tablename = req.body.tablename;

        connection.connect(function (err) {
            let query1 = "USE " + dbname;
            let query = "SELECT * FROM " + tablename;
            //let query2="SHOW FULL TABLES IN "+ dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query1, function (err, result, fields) {
                if (err) throw err;
                //console.log(result)

                if (result) {
                    connection.query(query, function (err, table, fields) {
                        if (err) throw err;
                        //console.log(table)

                        const jsonData = JSON.parse(JSON.stringify(table));

                        let pdf=fastFile(jsonData, "csv", res);
                        
                        //console.log("jsonData", jsonData);

                        /* if (jsonData) {
                            res.status(200).json({ jsonData, message: "Data Found!" });
                            //console.log(result);
                        } */
                        /* fastcsv
                            .write(jsonData, { headers: true })
                            .on("finish", function () {
                                console.log("Write to mydb.csv successfully!");
                            })
                            .pipe(ws); */
                        //console.log(table);
                    });
                    //res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.csv")
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};
exports.downloadPdf = async (req, res, next) => {
    try {
        let dbname = req.body.dbname;

        let tablename = req.body.tablename;

        connection.connect(function (err) {
            let query1 = "USE " + dbname;
            let query = "SELECT * FROM " + tablename;
            //let query2="SHOW FULL TABLES IN "+ dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query1, function (err, result, fields) {
                if (err) throw err;
                //console.log(result)

                if (result) {
                    connection.query(query, function (err, table, fields) {
                        if (err) throw err;
                        //console.log(table)

                        const jsonData = JSON.parse(JSON.stringify(table));

                        let pdf=fastFile(jsonData, "pdf", res);
                        
                        //console.log("jsonData", jsonData);

                        /* if (jsonData) {
                            res.status(200).json({ jsonData, message: "Data Found!" });
                            //console.log(result);
                        } */
                        /* fastcsv
                            .write(jsonData, { headers: true })
                            .on("finish", function () {
                                console.log("Write to mydb.csv successfully!");
                            })
                            .pipe(ws); */
                        //console.log(table);
                    });
                    //res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.csv")
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};

exports.downloadJson = async (req, res, next) => {
    try {
        let dbname = req.body.dbname;

        let tablename = req.body.tablename;

        connection.connect(function (err) {
            let query1 = "USE " + dbname;
            let query = "SELECT * FROM " + tablename;
            //let query2="SHOW FULL TABLES IN "+ dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query1, function (err, result, fields) {
                if (err) throw err;
                //console.log(result)

                if (result) {
                    connection.query(query, function (err, table, fields) {
                        if (err) throw err;
                        //console.log(table)

                        const jsonData = JSON.parse(JSON.stringify(table));

                        let pdf=fastFile(jsonData, "json", res);
                        
                        //console.log("jsonData", jsonData);

                        /* if (jsonData) {
                            res.status(200).json({ jsonData, message: "Data Found!" });
                            //console.log(result);
                        } */
                        /* fastcsv
                            .write(jsonData, { headers: true })
                            .on("finish", function () {
                                console.log("Write to mydb.csv successfully!");
                            })
                            .pipe(ws); */
                        //console.log(table);
                    });
                    //res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.csv")
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};


exports.downloadTxt = async (req, res, next) => {
    try {
        let dbname = req.body.dbname;

        let tablename = req.body.tablename;

        connection.connect(function (err) {
            let query1 = "USE " + dbname;
            let query = "SELECT * FROM " + tablename;
            //let query2="SHOW FULL TABLES IN "+ dbname + " WHERE TABLE_TYPE LIKE 'VIEW';"

            connection.query(query1, function (err, result, fields) {
                if (err) throw err;
                //console.log(result)

                if (result) {
                    connection.query(query, function (err, table, fields) {
                        if (err) throw err;
                        //console.log(table)

                        const jsonData = JSON.parse(JSON.stringify(table));

                        let pdf=fastFile(jsonData, "txt", res);
                        
                        //console.log("jsonData", jsonData);

                        /* if (jsonData) {
                            res.status(200).json({ jsonData, message: "Data Found!" });
                            //console.log(result);
                        } */
                        /* fastcsv
                            .write(jsonData, { headers: true })
                            .on("finish", function () {
                                console.log("Write to mydb.csv successfully!");
                            })
                            .pipe(ws); */
                        //console.log(table);
                    });
                    //res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.csv")
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};
/* 
exports.downloadPdf = async (req, res, next) => {
    try {
        const filePath = path.resolve("./mydb.csv")

        const destinationPath = path.resolve("./mydb")

        converter.HTMLAndPDFConverter(filePath, destinationPath)

        res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.pdf")

    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
};
 */
/* exports.downloadTsv = async (req, res, next) => {
    try {    
        var tsv = aoot.tsv("C:/Users/Raj Gupta/DATABASE-API/mydb.csv")
        console.log(aoot.tsv("C:/Users/Raj Gupta/DATABASE-API/mydb.csv"))
        res.send("C:/Users/Raj Gupta/DATABASE-API/mydb.tsv")
    } catch (error) {
        res.status(500).json({ error, message: "Something went wrong!" });
    }
}; */