from flask import Flask, request, json, jsonify
from flask_cors import CORS

from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation
from departmentOperation import DepartmentOperation
from platformOperations import PlatFormOperations

# creating the flask object
app = Flask(__name__)
CORS(app)

# globa objects 
dbSetup = None
authorOp = None
departOp = None
platOp =  None

# authors routers 

# Save,Update and Get All Authors
@app.route("/authors",methods=['POST','GET'])
def processAuthors():
	if request.method=='POST':
		data = json.loads(request.data)
		
		if(data["author_id"]==""):
			result = saveAuthor(data)
			
		else:
			result = updateAuthor(data)
			
		return result
	else:
		authors = authorOp.getAllAuthors()
		return jsonify(authors)
		
		

#Get Author By email
@app.route("/author",methods=["GET"])
def getAuthorUsingEmail():
	result = authorOp.getAuthorByEmail(request.args['email'])
	return jsonify(result)

#RemoveAuthor
@app.route("/authors/remove",methods=["DELETE"])
def removeAuthor():
	result = authorOp.removeAuthor(request.args['author_id'])
	return result





# department routes
@app.route("/depart",methods=["GET","POST"])
def processDepartments():
	if request.method=='POST':
		data = json.loads(request.data)
		result = departOp.saveDepartment(data['depart_name'])
		return result
	else:
		result = departOp.getAllDepartment()
		return result
		



# helper functions

def saveAuthor(data):
	rowInserted = authorOp.saveAuthor(data["first_name"],data["last_name"],data["email"],data["phone"],data["depart_name"] )
	
	result = None
	if(rowInserted>0):
		author = authorOp.getAuthorByEmail(data['email'])
		
		platform_data = data["platform_data"]
		
		for platform in platform_data.items():
			if(platform[1]!=""):
				platOp.saveAuthorPlatformData(author[0]['author_id'],platform[0],platform[1])
			
		result  = {"status":200,"message":"Author Saved"}
		
	elif(rowInserted==0):
	
		result = {"status":200,"message":"Duplicate Email"}
	else:
		result = {"status":500,"message":"Server Error"}
			
		
	return jsonify(result)



def updateAuthor(data):
	
	rowUpdated = authorOp.updateAuthor(data["author_id"],data["first_name"],data["last_name"],data["email"],data["phone"],data["depart_name"])

	
	result = None
	if(rowUpdated>0):
	
		platform_data = data["platform_data"]
		
		for platform in platform_data.items():
			if(platform[1]!=""):
				
				if(platOp.getAuthorPlatformData(data['author_id'],platform[0])!={}):
					
					platOp.updateAuthorPlatformData(data['author_id'],platform[0],platform[1])
				else:
					platOp.saveAuthorPlatformData(data['author_id'],platform[0],platform[1])
			
		result = {"status":200,"message":"Author Updated"}
		
	elif(rowUpdated==0):
		result = {"status":200,"message":"Duplicate Email"}
	else:
		result = {"status":500,"message":"Server Error"}
		
	return jsonify(result)
	
	

#start of server 
if __name__ == '__main__':
	# creating Databse Setup Object 
	dbSetup = DatabaseSetup()  

	# establishing connection
	connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") 

	# initializing global opjects with eatblished conbnection
	authorOp = AuthorOperation(connection) 
	departOp = DepartmentOperation(connection)
	platOp = PlatFormOperations(connection)
	
	
	app.run(debug = True)  

