/**
 * Created by songgeshuai on 2018/3/13.
 */
public class OutpuutMethod {

    private String name = null;
    private String description = null;
    private String code = null;

    public OutpuutMethod(String name, String description, String code) {
        this.name = name;
        this.description = description;
        this.code = code;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "OutpuutMethod{" +
                "description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
