package demorestapi
import grails.mongodb.*

class Product implements MongoEntity<Product>{

    static constraints = {
    name blank:false
    price range:0.0..1000.00
    }
    String name
    Double price
}
