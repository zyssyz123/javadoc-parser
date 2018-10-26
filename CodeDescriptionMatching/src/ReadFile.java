import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by songgeshuai on 2018/3/6.
 */
public class ReadFile {
   private String Path ;

    public ReadFile(String path) {
        Path = path;
    }

    public String getPath() {
        return Path;
    }

    public void setPath(String path) {
        Path = path;
    }

    public void ReadFile(){
   //读取文件前先读取数据库内容
        JDBC jdbc = new JDBC();
        ArrayList<MethodInformation> methodarrayList = jdbc.selectmethoddata("Arrays");

        File file = new File(Path);
        BufferedReader reader = null;
        try {
            System.out.println("以行为单位读取文件内容，一次读一整行：");
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;

            int num = 0; //计数器
            int sign = 0;//信号
            int col = 0;
            String code = new String();

            while ((tempString = reader.readLine()) != null) {


                for(int i = 0 ;i<methodarrayList.size();i++){
                    if(tempString.indexOf(methodarrayList.get(i).getName())!= -1){
                        col = methodarrayList.get(i).getNumber_key();
                        code = "";
                        sign = 1;
                      //  System.out.printf(methodarrayList.get(i).getName()+"\n");
                        break;
                    }

                }

                if(sign == 1){
                  //  System.out.printf(Integer.toString(num));
                    if(tempString.indexOf("}") != -1) {
                        code += tempString+"\n";
                        num--;
                        if(num == 0){
                            String escapeCode = escape(code);
                            jdbc.updataMethod(col,escapeCode);
                            System.out.printf(code);
                            sign = 0;
                        }
                    }
                    else if(tempString.indexOf("{") != -1) {
                        code += tempString+"\n";
                        num++;

                    }
                    else{
                        code +=tempString+"\n";
                    }
                }



            }
            reader.close();


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                }
            }
        }


    }



    public static String escape(String src) {
        int i;
        char j;
        StringBuffer tmp = new StringBuffer();
        tmp.ensureCapacity(src.length() * 6);
        for (i = 0; i < src.length(); i++) {
            j = src.charAt(i);
            if (Character.isDigit(j) || Character.isLowerCase(j)
                    || Character.isUpperCase(j))
                tmp.append(j);
            else if (j < 256) {
                tmp.append("%");
                if (j < 16)
                    tmp.append("0");
                tmp.append(Integer.toString(j, 16));
            } else {
                tmp.append("%u");
                tmp.append(Integer.toString(j, 16));
            }
        }
        return tmp.toString();
    }



}
