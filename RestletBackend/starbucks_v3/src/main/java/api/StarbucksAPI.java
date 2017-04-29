package api ;

import java.util.concurrent.BlockingQueue ;
import java.util.concurrent.LinkedBlockingQueue ;

import org.json.JSONObject;
import org.restlet.ext.jackson.JacksonRepresentation;
import org.restlet.representation.Representation;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.util.JSON;

import java.util.concurrent.ConcurrentHashMap ;
import java.util.Collection ;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.BlockingQueue;

public class StarbucksAPI {

    public enum OrderStatus { PLACED, PAID, PREPARING, SERVED, COLLECTED  }

    private static BlockingQueue<String> orderQueue = new LinkedBlockingQueue<String>();
    private static ConcurrentHashMap<String,Order> orders = new ConcurrentHashMap<String,Order>();

    public static void placeOrder(String order_id, Order order) {
        try { 
        	DBCollection coll=MongoDBJDBC.main1();
        	//JSONObject jsonobj=new JSONObject(order);
        	Representation result = new JacksonRepresentation<Order>(order) ;
        	BasicDBObject doc1=(BasicDBObject)JSON.parse(result.getText());
        	
        	//Order order1=(Order)JSON.parse(order.toString());
        	 BasicDBObject doc = new BasicDBObject("title", "MongoDB").
        	            append("description", "database").
        	            append("comment", 100).
        	            append("url", "http://www.tutorialspoint.com/mongodb/").
        	            append("by", "tutorials point");
        	 
        	           
        					
        	         //coll.insert(doc);
        	         coll.insert(doc1);
        	 //JSONObject doc1=new JSONObject();
        	 
        	         System.out.println("Document inserted successfully");
        	
            StarbucksAPI.orderQueue.put( order_id ) ; 
        } catch (Exception e) {}
        StarbucksAPI.orders.put( order_id, order ) ;
        System.out.println( "Order Placed: " + order_id ) ;
    }

    public static void startOrderProcessor() {
        StarbucksBarista barista = new StarbucksBarista( orderQueue ) ;
        new Thread(barista).start();
    }

    public static void updateOrder(String key, Order order) {
        StarbucksAPI.orders.replace( key, order ) ;
    }

    public static Order getOrder(String key) {
        return StarbucksAPI.orders.get( key ) ;
    }

    public static void removeOrder(String key) {
    	DBCollection coll=MongoDBJDBC.main1();
    	System.out.println(key);
    	coll.remove(new BasicDBObject("_id", key));
        StarbucksAPI.orders.remove( key ) ;
        StarbucksAPI.orderQueue.remove( key ) ;
    }

    public static void setOrderStatus( Order order, String URI, OrderStatus status ) {
        switch ( status ) {
            case PLACED:
                order.status = OrderStatus.PLACED ;
                order.message = "Order has been placed." ;
                order.links.put ("order", URI+"/"+order.id ) ;
                order.links.put ("payment",URI+"/"+order.id+"/pay" ) ;
            break;
                    
            case PAID:
                order.status = StarbucksAPI.OrderStatus.PAID ;
                order.message = "Payment Accepted." ;
                order.links.remove ( "payment" ) ;
            break;                        
        }
    }

    public static void setOrderStatus( Order order, OrderStatus status ) {
        switch ( status ) {
            case PREPARING: 
                order.status = StarbucksAPI.OrderStatus.PREPARING ;
                order.message = "Order preparations in progress." ;
                break;

            case SERVED: 
                order.status = StarbucksAPI.OrderStatus.SERVED ;
                order.message = "Order served, wating for Customer pickup." ;                   
                break;

            case COLLECTED: 
                order.status = StarbucksAPI.OrderStatus.COLLECTED ;
                order.message = "Order retrived by Customer." ;     
                break;   
        }
    }


    public static Collection<Order> getOrders() {
    	try{
    	DBCollection coll=MongoDBJDBC.main1();
    	System.out.println("Collection mycol selected successfully");
		
        DBCursor cursor = coll.find(new BasicDBObject("location", "sf"));
        //int i = 1;
			
        while (cursor.hasNext()) { 
           //System.out.println("Inserted Document: "+i); 
           System.out.println(cursor.next()); 
           //i++;
        }}
    	catch(Exception e)
    	{
    		
    	}
        return orders.values() ;
    }

}


