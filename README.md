# CMPE 281 - Team Hackathon 

# Description:
Developed a cloud solution in which routing happens based on store selection via API gatewaty : KONG API, 3-nodes cassandra cluster and routed to the specific store for CRUD operations. In our case there are 3 backends (i.e. stores) which are using various programming languages with 3-nodes mongodb cluster for operations. Front end portal is developed in angular JS and it calls KONG api and KONG routes to the specific store as per the selection of store from UI. Solution is delpoyed on Heroku PaaS. Every portion of the solution is deployed on the cloud - AWS.

Starbucks Web Portal   
All team members worked on this.   
Deployment on Heroku PaaS  
https://cmpe281-stabucks.herokuapp.com/

API Gateway  
KONG API and 3 nodes Cassandra Cluster - Neil Thaker

Tenant REST API Backends   
San Francisco tenant -  Aditya Parmar - Python  
Palo Alto tenant -  Disha Sheth  - nodejs   
San Jose tenant - Harsh Mehta  - java restlet 

