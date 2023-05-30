from flask import Flask, request, json, jsonify
from flask_cors import CORS
from mysql.connector import pooling

from serverSetup import DatabaseSetup
from authorOperations import AuthorOperation
from departmentOperation import DepartmentOperation
from platformOperations import PlatFormOperations
from articleOperation import ArticleOperation

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
articleOp = None

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
		authors = helper.getAllAuthorsData()
		return jsonify(authors)
		
		

#Get Author By email
@app.route("/author",methods=["GET"])
def getAuthorUsingCriteria():
	result = helper.getAllAuthorsData(request.args['email'],request.args["department"])
	return jsonify(result)

#RemoveAuthor
@app.route("/authors/remove",methods=["DELETE"])
def removeAuthor():
	result = authorOp.removeAuthor(request.args['author_id'])
	return jsonify(result)


# Article Routes

# get all article
@app.route("/articles",methods=["GET"])
def getAllArticles():
	args = request.args
	data = None
	
	if(len(args)==0):
		data = articleOp.getAllArticles()
	elif('platform_code' in args and 'article_name' in args):
		data=articleOp.getArtilcesByCodeAndName(args['article_name'],args['platform_code'])
	elif('platform_code' in args):
		data=articleOp.getArticlesByCode(args['platform_code'])
	else:
		data=articleOp.getArticlesByName(args['article_name'])

	return jsonify(data)

# article summary
@app.route("/summary")
def getArticleCountByYear():
	summaryData = {}
	summaryData = helper.getSummary()
	return jsonify(summaryData)


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

@app.route("/depart/remove",methods=["DELETE"])
def removeDepartment():
	result = departOp.removeDepartment(request.args['department'])
	return jsonify(result)


# platforms
@app.route("/platforms",methods=["GET","POST"])
def processPlatformData():
	result = []
	if request.method=="GET":
		result = platOp.getPlaformDetails()
	else:
		data = json.loads(request.data)
		result = platOp.savePlaformDetails(data)
	return jsonify(result)

@app.route("/platforms/remove",methods=["DELETE"])
def removePlatform():
	result = platOp.removePlatform(request.args['platform'])
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


# Extraction route 
@app.route("/scan")
def extractData():
	result = None
	
	result = helper.beginExtract()
	
	return jsonify(result)


#start of server 
if __name__ == '__main__':
	try:
		# creating Databse Setup Object 
		dbSetup = DatabaseSetup()  
		
		# establishing connection
		connection = dbSetup.getConnection("localhost",3306,"root","root","researchanalytics") 

		# initializing global opjects with eatblished conbnection
		authorOp = AuthorOperation(connection) 
		departOp = DepartmentOperation(connection)
		platOp = PlatFormOperations(connection)
		articleOp = ArticleOperation(connection)
		helper = HelperUtility(connection)
		
		
		app.run(debug = True)  
	except Exception as e:
		print(e)
	finally:
		if connection!=None:
			connection.close()

