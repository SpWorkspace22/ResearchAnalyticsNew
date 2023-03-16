from authorOperations import AuthorOperation
from platformOperations import PlatFormOperations
from flask import Flask, request, json, jsonify
class HelperUtility:

	authorOp = None;
	platOp = None;
	
	
	def __init__(self,dbConnection):
		self.db = dbConnection
		self.cursor = self.db.cursor()
		
		self.authorOp = AuthorOperation(dbConnection)
		self.platOp = PlatFormOperations(dbConnection)
		
		

	def saveAuthor(self,data):
		rowInserted = self.authorOp.saveAuthor(data["first_name"],data["last_name"],data["email"],data["phone"],data["depart_name"] )
		
		result = None
		if(rowInserted>0):
			author = self.authorOp.getAuthorByEmail(data['email'])
			
			platform_data = data["platform_data"]
			
			for platform in platform_data.items():
				if(platform[1]!=""):
					if (not isAuthorPlatformDiff(author['author_id'],platform[0],platform[1])):
						self.platOp.saveAuthorPlatformData(author[0]['author_id'],platform[0],platform[1])
					else:
						result = {
							"status":200,
							"message": "Author Saved",
							"Error " : "Author Platform Id and Platform Code combination exists..."} 
				else:
					result = {
							"status":200,
							"message": "Author Saved",
							"Error " : ""} 	
					break
			else:		
				result  = {"status":200,"message":"Author Saved","Error":""}
			
		elif(rowInserted==0):
		
			result = {"status":200,"message":"Duplicate Email","Error":""}
		else:
			result = {"status":500,"message":"","Error":"Server Error"}
				
			
		return jsonify(result)


	def updateAuthor(self,data):
		rowUpdated = 0
		result = None	
		message = None
		
		if(self.authorOp.getAuthorByEmail(data["email"])!=[] or self.isAuthorDiff(data["author_id"],data["email"])):
			rowUpdated = self.authorOp.updateAuthor(data["author_id"],data["first_name"],data["last_name"],data["email"],data["phone"],data["depart_name"])
		
			print(rowUpdated)
			
			if(rowUpdated>=0):
			
				platform_data = data["platform_data"]
				
				
				for platform in platform_data.items():
					if(platform[1]!=""):
						
						if(self.platOp.getAuthorPlatformData(data['author_id'],platform[0])!=None):
							
							print(platform)
							if(self.isAuthorPlatformDiff(data['author_id'],platform[0],platform[1])):
								print("update")
								self.platOp.updateAuthorPlatformData(data['author_id'],platform[0],platform[1])
							else:
								result = {
									"status":200,
									"message":"Author Updated ",
									"Error ": "Author Platform Id and Platform Code combination exists"}
								break
						else:
							if(self.isAuthorPlatformDiff(data['author_id'],platform[0],platform[1])):
								print("insert")
								self.platOp.saveAuthorPlatformData(data['author_id'],platform[0],platform[1])
							else:
								result = {
									"status":200,
									"message":"Author Updated ",
									"Error ": "Author Platform Id and Platform Code combination exists"}
								break
					else:
						continue;
				else:
					result = {
								"status":200,
								"message":"Author Updated ",
								"Error ": ""
							}
			elif(rowUpdated==-1):
				result = {"status":500,"message":"","Error":"Server Error"}
		else:
			result = {"status":200,"message":"Duplicate Email!, Author exists","Error":""}
			
		print(result)
		return jsonify(result)
		
		
		
		
	def getAllAuthorsData(self,email):
	
		allAuthorsData = []
		
		try:
			authors = None
			
			if email==None :
				authors = self.authorOp.getAllAuthors()
			else:
				authors = self.authorOp.getAuthorByEmail(email)
				
			if(authors==[]):
				return jsonify([])
			
			else:
				
				for author in authors:
					newAuthors = author.copy()
			
					newAuthors["platform_data"]=self.platOp.getAuthorPlatformById(author["author_id"])
					
					allAuthorsData.append(newAuthors)
					
			return allAuthorsData	
			
		except Exception as e:
			print(e)
			return []
	

	# check if there is any change in field value from the last value
	def isAuthorDiff(self,author_id,email):
		sql = " select author_id from author where email = %s"
		val = (email,)
		
		
		self.cursor.execute(sql,val)
		author = self.cursor.fetchone()

		if(author[0]==author_id):
			return True
		
		return False
		
		
	# check if there is any change in combination of authir platform data
	def isAuthorPlatformDiff(self,author_id,platform_code,platform_id):
		sql = " select author_id from author_platform where platform_id=%s and platform_code=%s"
		val = (platform_id,platform_code)
		
		
		self.cursor.execute(sql,val)
		authorP = self.cursor.fetchone()
		
		
		print(authorP)
		if(authorP==None):
			return True
		elif(authorP[0]==int(author_id)):
			return True
		else:
			return False
		