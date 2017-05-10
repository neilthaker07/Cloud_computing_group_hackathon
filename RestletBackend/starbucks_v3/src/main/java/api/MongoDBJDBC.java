package api;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;

import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC {

	public static DBCollection main1() {
	
      try{   
		
         // To connect to mongodb server
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
			
         // Now connect to your databases
         DB db = mongoClient.getDB( "test" );
         System.out.println("Connect to database successfully");
			
                  
         DBCollection coll = db.getCollection("mytest");
         System.out.println("Collection mycol selected successfully");
			return coll;
        /* BasicDBObject doc = new BasicDBObject("title", "MongoDB").
            append("description", "database").
            append("comment", 100).
            append("url", "http://www.tutorialspoint.com/mongodb/").
            append("by", "tutorials point");
				
         coll.insert(doc);
         System.out.println("Document inserted successfully");*/
      }catch(Exception e){
         System.err.println( e.getClass().getName() + ": " + e.getMessage() );
      }
      return null;
   }
}