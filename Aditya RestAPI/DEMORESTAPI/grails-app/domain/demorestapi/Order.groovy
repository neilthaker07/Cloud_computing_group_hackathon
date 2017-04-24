package demorestapi

import static java.util.UUID.randomUUID
import java.util.ArrayList ;
import java.util.Random ;
import java.util.UUID ;


class Order {

    //public String id = randomUUID() as String
    public String location
    public ArrayList<OrderItems> items = new ArrayList<OrderItems>()
    public ConcurrentHashMap<String,String> links = new ConcurrentHashMap<String,String>()
    public demorestapi.OrderStatus status
    public String message

    static constraints = {
    }
}
