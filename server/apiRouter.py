from flask import Flask, request, json, jsonify
from flask_cors import CORS

from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation
from departmentOperation import DepartmentOperation
from platformOperations import PlatFormOperations
from helperUtilty import HelperUtility


# creating the flask object
app = Flask(__name__)
CORS(app)

# globa objects 
dbSetup = None
authorOp = None
departOp = None
platOp =  None
helper = None

# authors routers 

# Save,Update and Get All Authors
@app.route("/authors",methods=['POST','GET'])
def processAuthors():
	if request.method=='POST':
		data = json.loads(request.data)
		
		if(data["author_id"]==""):
			result = helper.saveAuthor(data)
			
		else:
			result = helper.updateAuthor(data)
			
		return jsonify(result)
	else:
		authors = helper.getAllAuthorsData(None)
		return jsonify(authors)
		
		

#Get Author By email
@app.route("/author",methods=["GET"])
def getAuthorUsingEmail():
	result = helper.getAllAuthorsData(request.args['email'])

	return jsonify(result)

#RemoveAuthor
@app.route("/authors/remove",methods=["DELETE"])
def removeAuthor():
	result = authorOp.removeAuthor(request.args['author_id'])
	return jsonify(result)



# department routes
@app.route("/depart",methods=["GET","POST"])
def processDepartments():
	if request.method=='POST':
		data = json.loads(request.data)
		result = departOp.saveDepartment(data['depart_name'])
		return jsonify(result)
	else:
		result = departOp.getAllDepartment()
		return jsonify(result)
		


# utility Function

# upload bulk authors
@app.route("/uploadAuthors",methods=["POST"])
def uploadAuthors():
	results = []
	authors = json.loads(request.data)
	
	for author in authors:
		if "author_id" not in author:
			result = helper.saveAuthor(author)
		else:
			pass
		results.append(result)
	
	return jsonify(results)


#start of server 
if __name__ == '__main__':
	try:
		# creating Databse Setup Object 
		dbSetup = DatabaseSetup()  

		# establishing connection
		connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") 
		
		print(connection)
		# initializing global opjects with eatblished conbnection
		authorOp = AuthorOperation(connection) 
		departOp = DepartmentOperation(connection)
		platOp = PlatFormOperations(connection)
		helper = HelperUtility(connection)
		
		app.run(debug = True)  
	except Exception as e:
		print(e)

