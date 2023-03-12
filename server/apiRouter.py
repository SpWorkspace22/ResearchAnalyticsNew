from flask import Flask, request, json, jsonify
from flask_cors import CORS

from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation


# creating the flask object
app = Flask(__name__)
CORS(app)

# globa objects 
dbSetup = None
authorOp = None



# authors routers 

# Save,Update and Get All Authors
@app.route("/authors",methods=['POST','GET'])
def getAuthors():
	if request.method=='POST':
		data = json.loads(request.data)
		print(data)
		if(data["author_id"]!=""):
			result = authorOp.updateAuthor(data["author_id"],data["first_name"],data["last_name"],data["email"],data["phone"])
			return jsonify(result)
		else:
			result = authorOp.saveAuthor(data["first_name"],data["last_name"],data["email"],data["phone"])
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


if __name__ == '__main__':
	# creating Databse Setup Object 
	dbSetup = DatabaseSetup()  

	# establishing connection
	connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") 

	# initializing AuthorOperation with eatblished conbnection
	authorOp = AuthorOperation(connection) 
	
	app.run(debug = True)  

