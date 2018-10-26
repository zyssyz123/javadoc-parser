var fs = require("fs");
var cheerio = require("cheerio");
var lineReader = require("lineReader");
var filename = "docs/api/overview-summary.html";
var data = fs.readFileSync(filename, "utf-8");
var mysql = require("mysql");
var async = require("async");

var options = {
    connectTimeout: 100000000,
    acquireTimeout: 100000000,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'Parser'
};

require('mysql-queries').init(options);


function readfile(filename, priorName) {

    try {
        var data = fs.readFileSync(filename, "utf-8");
    } catch (e) {
        return;
    }

    console.log(filename);


    $ = cheerio.load(data);
    var a = [];
    var b = [];
    $('.colFirst').each(function (i, e) {

        a[i] = $(this).text().replace(/\n/g, "");
    });



    $('.colLast').each(function (i, e) {

        b[i] = $(this).text().replace(/\n/g, "");
    });

    var return_arr = new Array();

    var name_arr = [];
    var use_method_arr = [];
    var description_arr = [];
    var last_name_arr = [];
    var last_use_method_arr = [];
    var last_description_arr = [];
    var len_arr = [];
    var title_arr = []

    for (var i = 0; i < a.length; i++) {
        var c = new Array();
        c[0] = a[i];
        c[1] = b[i];
        return_arr[i] = c;
        if (filename.indexOf("overview-summary") != -1) {
            var newFileName = "docs/api/" + return_arr[i][0].replace(/\./g, "/") + "/package-summary.html"
        } else if (filename.indexOf("package-summary") != -1) {

            if (return_arr[i][0].indexOf("<") != -1) {
                var name = return_arr[i][0].slice(0, return_arr[i][0].indexOf("<"));
                var newFileName = filename.replace(/package-summary/g, name);
            } else {
                var newFileName = filename.replace(/package-summary/g, return_arr[i][0]);
            }
        } else {

            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').each(function (i, e) {
                    title_arr[i] = $(this).children().children('h3').text();
                    len_arr[i] = $(this).children().children('ul.blockList').length;
                });





            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList').children('h4').each(function (i, e) {
                    name_arr[i] = $(this).text().replace(/\n/g, " ");


                });


            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList').children('pre').each(function (i, e) {
                    use_method_arr[i] = $(this).text().replace(/\n/g, " ");;

                });

            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList').each(function (i, e) {
                    var num = 0;
                    var temp2 = [];
                    var temp = [];
                    temp[0] = "null";
                    temp[1] = "null";
                    temp[2] = "null";
                    temp[3] = "null";
                    temp[4] = $(this).children('div.block').text().replace(/\n/g, " ");
                    if ($(this).children('dl').length != 0) {
                        var temp_arr = [];
                        $(this).children('dl').children().each(function (n, e) {
                            temp_arr[n] = $(this).text();
                        });

                        for (var m = 0; m < temp_arr.length; m++) {
                            if (temp_arr[m] == "Returns:") {
                                temp[0] = temp_arr[m + 1];
                            } else if (temp_arr[m] == "Parameters:") {
                                var throwsString = temp_arr[m + 1];
                                for (var j = m + 2; j < temp_arr.length; j++) {
                                    if (temp_arr[j] == "See Also" || temp_arr == "Since:" || temp_arr[j] == "Returns:" || temp_arr[j] == "Type Parameters:" || temp_arr[j] == "Throws:") {
                                        break;
                                    }
                                    throwsString = throwsString.concat("$$").concat(temp_arr[j]);
                                }
                                temp[1] = throwsString;

                            } else if (temp_arr[m] == "Type Parameters:") {
                                var throwsString = temp_arr[m + 1];
                                for (var j = m + 2; j < temp_arr.length; j++) {
                                    if (temp_arr[j] == "See Also" || temp_arr == "Since:" || temp_arr[j] == "Returns:" || temp_arr[j] == "Parameters:" || temp_arr[j] == "Throws:") {
                                        break;
                                    }
                                    throwsString = throwsString.concat("$$").concat(temp_arr[j]);
                                }
                                temp[2] = throwsString;
                            } else if (temp_arr[m] == "Throws:") {
                                var throwsString = temp_arr[m + 1];
                                for (var j = m + 2; j < temp_arr.length; j++) {
                                    if (temp_arr[j] == "See Also" || temp_arr == "Since:") {
                                        break;
                                    }
                                    throwsString = throwsString.concat(temp_arr[j]);
                                }
                                temp[3] = throwsString;
                            }
                        }


                    }

                    description_arr[i] = temp;


                });


            // console.log(description_arr);



            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockListLast').children('li.blockList').children('h4').each(function (i, e) {
                    last_name_arr[i] = $(this).text().replace(/\n/g, " ");;


                });


            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockListLast').children('li.blockList').children('pre').each(function (i, e) {
                    last_use_method_arr[i] = $(this).text().replace(/\n/g, " ");;

                });

            $('div.details')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockList').children('li.blockList')
                .children('ul.blockListLast').children('li.blockList').each(function (i, e) {
                    var num = 0;
                    var temp2 = [];
                    var temp = [];
                    temp[0] = "null";
                    temp[1] = "null";
                    temp[2] = "null";
                    temp[3] = "null";
                    temp[4] = $(this).children('div.block').text().replace(/\n/g, " ");
                    if ($(this).children('dl').length != 0) {
                        var temp_arr = [];
                        $(this).children('dl').children().each(function (n, e) {
                            temp_arr[n] = $(this).text();
                        });

                        for (var m = 0; m < temp_arr.length; m++) {
                            if (temp_arr[m] == "Returns:") {
                                temp[0] = temp_arr[m + 1];
                            } else if (temp_arr[m] == "Parameters:") {
                                temp[1] = temp_arr[m + 1];
                            } else if (temp_arr[m] == "Type Parameters:") {
                                temp[2] = temp_arr[m + 1];
                            } else if (temp_arr[m] == "Throws:") {
                                var throwsString = temp_arr[m + 1];
                                for (var j = m + 2; j < temp_arr.length; j++) {
                                    if (temp_arr[j] == "See Also" || temp_arr == "Since:") {
                                        break;
                                    }
                                    throwsString = throwsString.concat(temp_arr[j]);
                                }
                                temp[3] = throwsString;
                            }
                        }


                    }

                    last_description_arr[i] = temp;

                });










        }



        readfile(newFileName, return_arr[i][0]);
    }

    var method_arr = [];
    var last_method_arr = [];
    for (var i = 0; i < name_arr.length; i++) {
        var temp = [];
        temp[0] = name_arr[i];
        temp[1] = use_method_arr[i];
        temp[2] = description_arr[i][0];
        temp[3] = description_arr[i][1];
        temp[4] = description_arr[i][2];
        temp[5] = description_arr[i][3];
        temp[6] = description_arr[i][4];

        method_arr[i] = temp;
    }

    for (var i = 0; i < last_name_arr.length; i++) {
        var temp = [];
        temp[0] = last_name_arr[i];
        temp[1] = last_use_method_arr[i];
        temp[2] = last_description_arr[i];
        temp[2] = last_description_arr[i][0];
        temp[3] = last_description_arr[i][1];
        temp[4] = last_description_arr[i][2];
        temp[5] = last_description_arr[i][3];
        temp[6] = last_description_arr[i][4];
        last_method_arr[i] = temp;
    }


    // console.log(method_arr.length);
    // // console.log(last_method_arr);
    // console.log(title_arr);
    // console.log(len_arr);

    for (var i = 0; i < title_arr.length; i++) {
        if (title_arr[i].indexOf("Method") != -1) {

            if (i == 0) {
                var methodArr = splitarr(method_arr, 0, len_arr[i] - 1);
                methodArr[methodArr.length] = last_method_arr[i]
                if (methodArr.length != 0) {
                    InsertDb3("method", methodArr, priorName);
                }
            } else {
                var num = 0;
                for (var j = i; j >= 0; j--) {
                    num += len_arr[j];

                }
                // console.log(num);
                var methodArr = splitarr(method_arr, len_arr[i - 1], num - 1);

                methodArr[methodArr.length] = last_method_arr[i]
                if (methodArr.length != 0) {

                    InsertDb3("method", methodArr, priorName);
                }
            }

        } else if (title_arr[i].indexOf("Constructor") != -1) {
            if (i == 0) {
                var constructorArr = splitarr(method_arr, 0, len_arr[i] - 1);
                constructorArr[constructorArr.length] = last_method_arr[i];
                if (constructorArr.length != 0) {

                    InsertDb3("constructor", constructorArr, priorName);
                }
            } else {
                var num = 0;
                for (var j = i; j >= 0; j--) {
                    num += len_arr[j];

                }
                var constructorArr = splitarr(method_arr, len_arr[i - 1], num - 1);
                constructorArr[constructorArr.length] = last_method_arr[i];
                if (constructorArr.length != 0) {

                    InsertDb3("constructor", constructorArr, priorName);
                }
            }

        } else if (title_arr[i].indexOf("Field") != -1) {
            if (i == 0) {
                var fieldArr = splitarr(method_arr, 0, len_arr[i] - 1);
                fieldArr[fieldArr.length] = last_method_arr[i];
                if (fieldArr.length != 0) {
                    InsertDb3("fields", fieldArr, priorName);
                }
            } else {
                var num = 0;
                for (var j = i; j >= 0; j--) {
                    num += len_arr[j];

                }
                var fieldArr = splitarr(method_arr, len_arr[i - 1], num - 1);
                fieldArr[fieldArr.length] = last_method_arr[i];
                if (fieldArr.length != 0) {
                    InsertDb3("fields", fieldArr, priorName);
                }
            }

        } else if (title_arr[i].indexOf("Enum") != -1) {
            if (i == 0) {
                var enumConstantArr = splitarr(method_arr, 0, len_arr[i] - 1);
                enumConstantArr[enumConstantArr.length] = last_method_arr[i];
                if (enumConstantArr.length != 0) {
                    InsertDb3("enumConstant", enumConstantArr, priorName);
                }
            } else {
                var num = 0;
                for (var j = i; j >= 0; j--) {
                    num += len_arr[j];

                }
                var enumConstantArr = splitarr(method_arr, len_arr[i - 1], num - 1);
                enumConstantArr[enumConstantArr.length] = last_method_arr[i];
                if (enumConstantArr.length != 0) {
                    InsertDb3("enumConstant", enumConstantArr, priorName);
                }
            }

        }

    }



}
readfile(filename, "");




function InsertDb(DBName, first_return_arr, bel) {

    var return_arr = [];
    var num = 0;
    for (var i = 0; i < first_return_arr.length; i++) {

        if (typeof (first_return_arr[i]) == "undefined") {
            continue;
        } else {
            return_arr[num] = first_return_arr[i];
            num++;
        }

    }



    //  console.log(return_arr);
    var connection = mysql.createConnection({
        connectTimeout: 100000000,
        acquireTimeout: 100000000,
        host: '127.0.0.1',
        user: 'root',
        port: '3306',
        password: '123',
        database: 'Parser'
    });
    if (DBName == "method") {
        connection.connect();
        var i = 0;
        async.whilst(function () {
            return i < return_arr.length;
        }, function (whileCb) {


            connection.query({ sql: "INSERT INTO method (methodUse, description, bel_any) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')", timeout: 600000 }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
                // console.log('The solution is: ');
                connection.end();
            });


            i++;
            whileCb();
        }, function (err) {         //here 如果条件不满足，或者发生异常  
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
        );


    } else if (DBName == "fields") {
        connection.connect();
        var i = 0;
        async.whilst(function () {
            return i < return_arr.length;
        }, function (whileCb) {


            connection.query({ sql: "INSERT INTO fields (fieldsUSe, description, bel_class) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')", timeout: 600000 }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
                // console.log('The solution is: ');
                connection.end();
            });

            i++;
            whileCb();
        }, function (err) {         //here 如果条件不满足，或者发生异常  
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
        );

    } else if (DBName == "enumConstant") {
        connection.connect();
        var i = 0;
        async.whilst(function () {
            return i < return_arr.length;
        }, function (whileCb) {


            connection.query({ sql: "INSERT INTO enum_constant (constantUse, description, bel_enum) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')", timeout: 60000 }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
                // console.log('The solution is: ');
                connection.end();

            });

            i++;
            whileCb();
        }, function (err) {         //here 如果条件不满足，或者发生异常  
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
        );

    } else if (DBName == "constructor") {
        connection.connect();
        var i = 0;
        async.whilst(function () {
            return i < return_arr.length;
        }, function (whileCb) {


            connection.query({ sql: "INSERT INTO constructor (constructorUse, description, bel_any) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')", timeout: 60000 }, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
                // console.log('The solution is: ');
                connection.end();
            });


            i++;
            whileCb();
        }, function (err) {         //here 如果条件不满足，或者发生异常  
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
        );

    }

}




function splitarr(split_arr, start_poistion, end_position) {
    // console.log(start_poistion);
    // console.log(end_position);
    // console.log(split_arr);
    var after_arr = [];
    for (var i = start_poistion; i <= end_position; i++) {

        after_arr[i - start_poistion] = split_arr[i];

    }
    // console.log("-----------------------------------------")
    // console.log(after_arr);
    return after_arr;
}




function InsertDb2(DBName, first_return_arr, bel) {
    var return_arr = [];
    var num = 0;
    for (var i = 0; i < first_return_arr.length; i++) {

        if (typeof (first_return_arr[i]) == "undefined") {
            continue;
        } else {
            return_arr[num] = first_return_arr[i];
            num++;
        }

    }


    var pool = mysql.createPool({
        connectTimeout: 100000000,
        acquireTimeout: 100000000,
        host: '127.0.0.1',
        user: 'root',
        port: '3306',
        password: '123',
        database: 'Parser'
    });

    var sqls = [];
    // console.log(return_arr);

    for (var i = 0; i < return_arr.length; i++) {
        if (DBName == "method") {
            sqls[i] = "INSERT INTO method (methodUse, description, bel_any) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')";
        } else if (DBName == "fields") {
            sqls[i] = "INSERT INTO fields (fieldsUSe, description, bel_class) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')";
        } else if (DBName == "enumConstant") {
            sqls[i] = "INSERT INTO enum_constant (constantUse, description, bel_enum) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')";
        } else if (DBName == "constructor") {
            sqls[i] = "INSERT INTO constructor (constructorUse, description, bel_any) values('" + escape(return_arr[i][1]) + "','" + escape(return_arr[i][2]) + "','" + escape(bel) + "')";
        }

    }

    console.log(sqls);


    async.eachSeries(sqls, function (item, callback) {
        // 遍历每条SQL并执行
        pool.getConnection(function (err, connection) {
            // Use the connection
            if (err) {
                console.log(err);
            } else if (connection && 'query' in connection) {
                // process connection and connection.query
                // console.log(item);
                connection.query({ sql: item, timeout: 10000000 }, function (error, results, fields) {
                    // And done with the connection.
                    //console.log(item);
                    console.log(results);
                    connection.release();

                    // Handle error after the release.
                    if (error) throw error;
                    console.log(results);
                    // Don't use the connection here, it has been returned to the pool.
                });
            }

        });


    }, function (err) {
        // 所有SQL执行完成后回调
        if (err) {
            console.log(err);
        } else {
            console.log("SQL全部执行成功");
        }
    });



}




function InsertDb3(DBName, return_arr, bel) {
    // var return_arr = [];
    // var num = 0;
    // for (var i = 0; i < first_return_arr.length; i++) {

    //     if (typeof (first_return_arr[i]) == "undefined" || typeof (first_return_arr[i][1]) == "undefined" || typeof (first_return_arr[i][2]) == "undefined" || typeof (first_return_arr[i][0]) == "undefined") {
    //         continue;
    //     } else {
    //         return_arr[num] = first_return_arr[i];
    //         num++;
    //     }

    // }
    //  console.log(return_arr);

    var pool = mysql.createPool({
        connectionLimit: 10000,
        host: '127.0.0.1',
        user: 'root',
        port: '3306',
        password: '123',
        database: 'Parser'
    });

    var sqls = [];


    for (var i = 0; i < return_arr.length; i++) {
        if (DBName == "method") {
            sqls[i] = "INSERT INTO method (methodUse, retuns, parameters, parameters_type, thows, description, bel_any) values('" + return_arr[i][1] + "','" + escape(return_arr[i][2]) + "','" + escape(return_arr[i][3]) + "','" + escape(return_arr[i][4]) + "','" + escape(return_arr[i][5]) + "','" + escape(return_arr[i][6]) + "','" + bel + "')";
        } else if (DBName == "fields") {
            sqls[i] = "INSERT INTO fields (fieldsUSe, returns, parameters, parameters_type, thows, description, bel_class) values('" + return_arr[i][1] + "','" + escape(return_arr[i][2]) + "','" + escape(return_arr[i][3]) + "','" + escape(return_arr[i][4]) + "','" + escape(return_arr[i][5]) + "','" + escape(return_arr[i][6]) + "','" + bel + "')";
        } else if (DBName == "enumConstant") {
            sqls[i] = "INSERT INTO enum_constant (constantUse, returns, parameters, parameters_type, throws, description, bel_enum) values('" + return_arr[i][1] + "','" + escape(return_arr[i][2]) + "','" + escape(return_arr[i][3]) + "','" + escape(return_arr[i][4]) + "','" + escape(return_arr[i][5]) + "','" + escape(return_arr[i][6]) + "','" + bel + "')";
        } else if (DBName == "constructor") {
            sqls[i] = "INSERT INTO constructor (constructorUse, returns, parameters, parameters_type, throws, description, bel_any) values('" + return_arr[i][1] + "','" + escape(return_arr[i][2]) + "','" + escape(return_arr[i][3]) + "','" + escape(return_arr[i][4]) + "','" + escape(return_arr[i][5]) + "','" + escape(return_arr[i][6]) + "','" + bel + "')";
        }

    }


    //console.log(sqls);


    var mq = require('mysql-queries');


    for (var i = 0; i < sqls.length; i++) {
        mq.query(sqls[i],
            function (err, results) {
                if (!!err) {
                    console.log(err);
                } else {
                    //If not error, the "results" is the results of the SQLs as array.
                    console.log(results);
                }
            });
    }

}