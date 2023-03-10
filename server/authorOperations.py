
# class responsoble for all author manipulation
class AuthorOperation:

	
	def __init__(self,dbConnection):
		self.db = dbConnection
		self.cursor = self.db.cursor()
		
	def getAllAuthors(self):
		pass
		
		
	# Insert Author if it does not exist , Email id unique constraint
	def saveAuthor(self,first_name,last_name,email,phone):
		try:
		
			if(self.getAuthorByEmail(email)!=None):
				return {"status":500,"message":"duplilcate email"}
			else:
			
				sql = "INSERT INTO author (first_name,last_name,email,phone) VALUES (%s, %s,%s, %s)"
				val = (first_name,last_name,email,phone)
				self.cursor.execute(sql, val)
				self.db.commit()
				
				return {"status":200,"message":"Author Saved"}
		except Exception as e:
			print(e)
			return {"status":500,"message":"Server Error"}
			
			
	# search author by email
	def getAuthorByEmail(self,email):
		try:
			sql = "select * from author where email = %s"
			val = (email,)
			self.cursor.execute(sql,val)
			
			author = self.cursor.fetchone()
			print(author)
			
			return author
			
		except Exception as e:
			print(e)
			return {"status":500,"message":"Server Error"}
			