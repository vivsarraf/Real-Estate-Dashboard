import http.client 
import pprint

conn = http.client.HTTPSConnection("api.gateway.attomdata.com") 

headers = { 
    'accept': "application/json", 
    'apikey': "daf4e5a5ad39fca21b4e2d1df993a9fd", 
    } 

conn.request("GET", "/propertyapi/v1.0.0/property/detail?address1=4529%20Winona%20Court&address2=Denver%2C%20CO", headers=headers) 

res = conn.getresponse() 
data = res.read() 

pprint.pprint(data.decode("utf-8"))