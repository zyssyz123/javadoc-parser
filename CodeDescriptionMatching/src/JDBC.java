/**
 * Created by songgeshuai on 2017/5/24.
 */


import java.net.URLDecoder;
import java.sql.*;
import java.util.ArrayList;



public class JDBC {


    private String driver = "com.mysql.jdbc.Driver";

    // URL指向要访问的数据库名scutcs
    private String url = "jdbc:mysql://127.0.0.1:3306/Parser";

    // MySQL配置时的用户名
    private String user = "root";

    // MySQL配置时的密码
    private String password = "123";

    public JDBC() {
    }

    public JDBC(String driver, String url, String user, String password) {
        this.driver = driver;
        this.url = url;
        this.user = user;
        this.password = password;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public ArrayList<MethodInformation> selectmethoddata(String classname) {
        ArrayList<MethodInformation> methodarrayList = new ArrayList();
        try {
            // 加载驱动程序
            Class.forName(driver);

            // 连续数据库
            Connection conn = DriverManager.getConnection(url, user, password);

            if (!conn.isClosed()) {
                System.out.println("Succeeded connecting to the Database!");
            }

            // statement用来执行SQL语句
            Statement statement = conn.createStatement();

            // 要执行的SQL语句
            String sql = "select * from method where bel_any= '" + classname + "'";

            // 结果集
            ResultSet rs = statement.executeQuery(sql);


            String name = null;
            String description = null;
            String returns = null;
            String parameters = null;
            int Number_key = 0;
            String code = null;

            while (rs.next()) {

                //进行转码
                byte bytes[] = {(byte) 0xC2,(byte) 0xA0};
                String UTFSpace = new String(bytes,"utf-8");

                returns = URLDecoder.decode(rs.getString("retuns").replaceAll("%(?![0-9a-fA-F]{2})", "%25"), "utf-8").replaceAll("\\s+"," ");
                parameters = URLDecoder.decode(rs.getString("parameters").replaceAll("%(?![0-9a-fA-F]{2})", "%25"), "utf-8").replaceAll("\\s+"," ");
                description = URLDecoder.decode(rs.getString("description").replaceAll("%(?![0-9a-fA-F]{2})", "%25"), "utf-8").replaceAll("\\s+"," ");
                name = rs.getString("methodUse").replaceAll(UTFSpace, " ").replaceAll("\\s+"," ");
                Number_key = rs.getInt("methodcol");
                code =  rs.getString("code");




               if(code != null) {
                   MethodInformation method = new MethodInformation(returns, parameters, description, name, Number_key, unescape(code));

                  // System.out.println(method.getCode());
                   methodarrayList.add(method);
               }else{
        //           System.out.printf(name+"\n");
               }

            }

            rs.close();
            conn.close();

        } catch (ClassNotFoundException e) {


        //    System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();


        } catch (SQLException e) {


            e.printStackTrace();


        } catch (Exception e) {


            e.printStackTrace();

        }

        return methodarrayList;
    }


    public void updataMethod(int col, String code) {
        try {
            // 加载驱动程序
            Class.forName(driver);

            // 连续数据库
            Connection conn = DriverManager.getConnection(url, user, password);

            if (!conn.isClosed()) {
                System.out.println("Succeeded connecting to the Database!");
            }

            // statement用来执行SQL语句
            Statement statement = conn.createStatement();

            // 要执行的SQL语句
            String sql = "UPDATE method set code = '"+code+"' where methodcol = '"+col+"'";

            // 结果集
            statement.executeUpdate(sql);

            conn.close();

        } catch (ClassNotFoundException e) {


            //    System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();


        } catch (SQLException e) {


            e.printStackTrace();


        } catch (Exception e) {


            e.printStackTrace();

        }

    }



    public static String unescape(String src) {
        StringBuffer tmp = new StringBuffer();
        tmp.ensureCapacity(src.length());
        int lastPos = 0, pos = 0;
        char ch;
        while (lastPos < src.length()) {
            pos = src.indexOf("%", lastPos);
            if (pos == lastPos) {
                if (src.charAt(pos + 1) == 'u') {
                    ch = (char) Integer.parseInt(src
                            .substring(pos + 2, pos + 6), 16);
                    tmp.append(ch);
                    lastPos = pos + 6;
                } else {
                    ch = (char) Integer.parseInt(src
                            .substring(pos + 1, pos + 3), 16);
                    tmp.append(ch);
                    lastPos = pos + 3;
                }
            } else {
                if (pos == -1) {
                    tmp.append(src.substring(lastPos));
                    lastPos = src.length();
                } else {
                    tmp.append(src.substring(lastPos, pos));
                    lastPos = pos;
                }
            }
        }
        return tmp.toString();
    }

}


