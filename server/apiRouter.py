from flask import Flask, request, json, jsonify
from flask_cors import CORS

from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation
from departmentOperation import DepartmentOperation

# creating the flask object
app = Flask(__name__)
CORS(app)

# globa objects 
dbSetup = None
authorOp = None
departOp = None


# authors routers 

# Save,Update and Get All Authors
@app.route("/authors",methods=['POST','GET'])
def processAuthors():
	if request.method=='POST':
		data = json.loads(request.data)
		if(data["author_id"]!=""):
			print(data["depart_name"])
			result = authorOp.updateAuthor(
				data["author_id"],data["first_name"],data["last_name"],data["email"],data["phone"],
				data["depart_name"]
			)

			return jsonify(result)
		else:
			result = authorOp.saveAuthor(
				data["first_name"],data["last_name"],data["email"],data["phone"],
				data["depart_name"]
			)
			return jsonify(result)
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
		


#start of server 
if __name__ == '__main__':
	# creating Databse Setup Object 
	dbSetup = DatabaseSetup()  

	# establishing connection
	connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") 

	# initializing global opjects with eatblished conbnection
	authorOp = AuthorOperation(connection) 
	departOp = DepartmentOperation(connection)
	
	app.run(debug = True)  

