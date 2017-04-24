package demorestapi


import grails.rest.*
import grails.converters.*

class OrderController extends RestfulController {
    static responseFormats = ['json', 'xml']
    OrderController() {
        super(Order)
    }
}
