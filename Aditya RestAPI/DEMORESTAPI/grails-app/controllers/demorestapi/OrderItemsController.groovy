package demorestapi


import grails.rest.*
import grails.converters.*

class OrderItemsController extends RestfulController {
    static responseFormats = ['json', 'xml']
    OrderItemsController() {
        super(OrderItems)
    }
}
