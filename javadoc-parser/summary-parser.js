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

function readfile(filename, prefile) {
  try {
    var data = fs.readFileSync(filename, "utf-8");
  } catch (e) {
    return;
  }
  $ = cheerio.load(data);
  var a = [];
  var b = [];
  $('.colFirst').each(function (i, e) {

    a[i] = $(this).text();

  });



  $('.colLast').each(function (i, e) {

    b[i] = $(this).text();
  });

  var return_arr = new Array();

  for (var i = 0; i < a.length; i++) {
    var c = new Array();
    c[0] = a[i];
    c[1] = b[i];
    return_arr[i] = c;
    if (filename.indexOf("overview-summary") != -1) {
      var newFileName = "docs/api/" + return_arr[i][0].replace(/\./g, "/") + "/package-summary.html"
    } else if (filename.indexOf("package-summary") != -1) {
      var newFileName = filename.replace(/package-summary/g, return_arr[i][0]);
      //console.log(newFileName);
    }
    readfile(newFileName, return_arr[i][0]);
  }
  if (filename.indexOf("overview-summary") != -1 || filename.indexOf("package-summary") != -1)
  { console.log(filename); }





  // if (filename.indexOf("overview-summary") != -1) {
  // //  InsertDb("package", return_arr, "");
  // } else 
  if (filename.indexOf("package-summary") != -1) {


    for (var i = 0; i < return_arr.length; i++) {
      if (return_arr[i][0] == "Interface") {
        var num = 0;
        var temparr = [];
        for (var j = i; j < return_arr.length; j++) {

          if (return_arr[j][0] == "Class" || return_arr[j][0] == "" || return_arr[j][0] == "Exception" || return_arr[j][0] == "Enum" || return_arr[j][0] == "Error") {
            break;
          } else {

            temparr[num] = return_arr[j];
            num++;

          }
        }
       // console.log(temparr);
        InsertDb("interface", temparr, prefile);
      } else if (return_arr[i][0] == "Class") {
        var num = 0;
        var temparr = [];
        for (var j = i; j < return_arr.length; j++) {

          if (return_arr[j][0] == "Interface" || return_arr[j][0] == "" || return_arr[j][0] == "Exception" || return_arr[j][0] == "Enum" || return_arr[j][0] == "Error") {
            break;
          } else {

            temparr[num] = return_arr[j];
            num++;


          }
        }
        InsertDb("class", temparr, prefile);
      } else if (return_arr[i][0] == "Exception") {
        var num = 0;
        var temparr = [];
        for (var j = i; j < return_arr.length; j++) {

          if (return_arr[j][0] == "Class" || return_arr[j][0] == "" || return_arr[j][0] == "Interface" || return_arr[j][0] == "Enum" || return_arr[j][0] == "Error") {
            break;
          } else {

            temparr[num] = return_arr[j];
            num++;


          }
        }
        InsertDb("exception", temparr, prefile);
      } else if (return_arr[i][0] == "Enum") {
        var num = 0;
        var temparr = [];
        for (var j = i; j < return_arr.length; j++) {

          if (return_arr[j][0] == "Class" || return_arr[j][0] == "" || return_arr[j][0] == "Exception" || return_arr[j][0] == "Interface" || return_arr[j][0] == "Error") {
            break;
          } else {

            temparr[num] = return_arr[j];
            num++;


          }
        }
        InsertDb("enum", temparr, prefile);
      } else if (return_arr[i][0] == "Error") {
        var num = 0;
        var temparr = [];
        for (var j = i; j < return_arr.length; j++) {

          if (return_arr[j][0] == "Class" || return_arr[j][0] == "" || return_arr[j][0] == "Exception" || return_arr[j][0] == "Enum" || return_arr[j][0] == "Interface") {
            break;
          } else {

            temparr[num] = return_arr[j];
            num++;


          }
        }
        InsertDb("error", temparr, prefile);
      }

    }
  }

}
readfile(filename, "");



function InsertDb(DBName, t_return_arr, belog_package) {
 // console.log(t_return_arr.length);

  var pool = mysql.createPool({
    connectionLimit: 10000,
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '123',
    database: 'Parser'
  });

  var sqls = [];


  for (var i = 1; i < t_return_arr.length; i++) {
    if (DBName == "package") {
      sqls[i] = "INSERT INTO package (packageName,description) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "')"
    }
    else if (DBName == "class") {

      sqls[i] = "INSERT INTO class (className,description,bel_package) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "','" + belog_package + "')";
    } else if (DBName == "interface") {

      sqls[i] = "INSERT INTO interface (interfaceName,description,bel_package) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "','" + belog_package + "')";
    } else if (DBName == "exception") {

      sqls[i] = "INSERT INTO exception (exceptionName,description,bel_package) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "','" + belog_package + "')";
    } else if (DBName == "enum") {

      sqls[i] = "INSERT INTO enum (enumName, description, bel_package) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "','" + belog_package + "')";
    } else if (DBName == "error") {

      sqls[i] = "INSERT INTO error (errorName,description,bel_package) values('" + t_return_arr[i][0] + "','" + escape(t_return_arr[i][1]) + "','" + belog_package + "')";
    }

  }
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