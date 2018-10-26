

import java.util.*;

/**
 * Created by songgeshuai on 2017/5/24.
 */
public class MethodInformation  {
    private String returns = null;
    private String parameters = null;
    private String description = null;
    private String name = null;
    private int Number_key = 0;
    private String code = null;

    public MethodInformation(String returns, String parameters, String description, String name, int Number_key, String code) {
        this.returns = returns;
        this.parameters = parameters;
        this.description = description;
        this.name = name;
        this.Number_key = Number_key;
        this.code = code;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReturns() {
        return returns;
    }

    public void setReturns(String returns) {
        this.returns = returns;
    }

    public String getParamters() {
        return parameters;
    }

    public void setParamters(String parameters) {
        this.parameters = parameters;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumber_key() {
        return Number_key;
    }

    public void setNumber_key(int number_key) {
        Number_key = number_key;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "MethodInformation{" +
                "returns='" + returns + '\'' +
                ", parameters='" + parameters + '\'' +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", Number_key=" + Number_key +
                ", code='" + code + '\'' +
                '}';
    }
}
