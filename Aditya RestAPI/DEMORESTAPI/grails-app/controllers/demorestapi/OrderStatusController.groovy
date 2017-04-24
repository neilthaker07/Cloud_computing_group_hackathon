package demorestapi


import grails.rest.*
import grails.converters.*

class OrderStatusController extends RestfulController {
    static responseFormats = ['json', 'xml']
    OrderStatusController() {
        super(OrderStatus)
    }
}
