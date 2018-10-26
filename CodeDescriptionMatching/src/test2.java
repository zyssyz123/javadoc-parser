import java.io.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by songgeshuai on 2018/3/6.
 */
public class test2 {
    public static void main(String[] args) throws IOException, IllegalArgumentException, IllegalAccessException {
        PrintWriter writer = new PrintWriter("/users/songgeshuai/desktop/sample4.txt", "UTF-8");
        JDBC jdbc = new JDBC();
        ArrayList<MethodInformation> methodarrayList1 = jdbc.selectmethoddata("Arrays");
        ArrayList<MethodInformation> methodarrayList2 = jdbc.selectmethoddata("ArrayList<T>");
        String[] titles = new String[]{"methodUse", "description", "code"};
        String[] propertys = new String[]{"methodUse", "description", "code"};
        List<MethodInformation> list = new ArrayList<MethodInformation>();
        for (int i = 0; i < methodarrayList1.size(); i++) {
            list.add(methodarrayList1.get(i));

        }
        for (int i = 0; i < methodarrayList2.size(); i++) {
            list.add(methodarrayList2.get(i));
        }

        for (int i = 0; i < list.size(); i++) {

            writer.println("1" + "\t" + list.get(i).getDescription() + "\t" + list.get(i).getCode().replaceAll("\n", " ").replaceAll("\\s+", " ").replaceAll("\t", " "));

        }

        for (int i = 0; i < list.size(); i++) {
            for (int j = 0; j < 4; j++) {
                writer.println("0" + "\t" + list.get(i).getDescription() + "\t" + list.get(i+j).getCode().replaceAll("\n", " ").replaceAll("\\s+", " ").replaceAll("\t", " "));

            }
        }
        writer.close();

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
