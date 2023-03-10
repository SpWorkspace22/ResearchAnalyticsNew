from flask import Flask, request, json, jsonify
from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation


# creating the flask object
app = Flask(__name__)

# globa objects 

dbSetup = None
authorOp = None



# authors routers 
@app.route("/authors",methods=['POST','GET'])
def getAuthors():
	if request.method=='POST':
		data = json.loads(request.data)
		result = authorOp.saveAuthor(data["first_name"],data["last_name"],data["email"],data["phone"])
		
		return result
	else:
		return jsonify(authors)

if __name__ == '__main__':
	dbSetup = DatabaseSetup()  # creating Databse Setup Object 
	connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") # establishing connection
	
	authorOp = AuthorOperation(connection) # initializing AuthorOperation with eatblished conbnection
	
	app.run(debug = True)  

