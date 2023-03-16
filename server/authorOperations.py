
# class responsoble for all author manipulation
class AuthorOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		self.cursor = self.db.cursor()

	# Insert Author if it does not exist , Email id unique constraint
	def saveAuthor(self,first_name,last_name,email,phone,department_id):
		try:
			
			if(self.getAuthorByEmail(email)!=[]):
				return 0
			else:
				sql = '''INSERT INTO author(first_name,last_name,email,phone,department_id) 
						VALUES(%s, %s,%s, %s,%s)'''
				val = (first_name,last_name,email,phone,department_id)
				self.cursor.execute(sql, val)
				self.db.commit()
				
				return self.cursor.rowcount
				
		except Exception as e:
			print(e)
			return -1
			
	#update author 
	def updateAuthor(self,author_id,first_name,last_name,email,phone,department_id):
		try:
			sql = '''update author set first_name=%s, last_name=%s, email=%s, phone=%s,
					department_id=%s where author_id=%s'''
			val = (first_name,last_name,email,phone,department_id,author_id)
				
			self.cursor.execute(sql,val)
			self.db.commit()
				
			print(self.cursor.rowcount)
			return self.cursor.rowcount

		except Exception as e:
			print(e)
			return -1
		
	# list all authors
	def getAllAuthors(self):
		try:
			authors = []
			keys = ('author_id','first_name','last_name','email','phone','department_id','depart_name')

			self.cursor.execute("select author_id,first_name,last_name,email,phone,a.department_id,department_name  from author a, department d where a.department_id=d.deparment_id")
			
			for x in self.cursor.fetchall():
				authors.append(dict(zip(keys,x)))

			return authors
		except Exception as e:
			print(e)
			return {"status":500,"message":"Server Error"}
		
	# search author by email
	def getAuthorByEmail(self,email):
		try:
			authors = []
			keys = ('author_id','first_name','last_name','email','phone','department_id')
			sql = "select * from author where email = %s"
			val = (email,)
			self.cursor.execute(sql,val)
			
			author = self.cursor.fetchone()

			if(author==None):
				return []

			authors.append(dict(zip(keys,author)))
			
			return authors
			
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		
	# search author by id
	def getAuthorById(self,email):
		try:
			sql = "select * from author where author_id = %s"
			val = (author_id,)
			self.cursor.execute(sql,val)
			
			author = self.cursor.fetchone()
			
			return author
			
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		
	def removeAuthor(self,author_id):
		try:
			sql = "delete from author where author_id=%s"
			val=(author_id,)

			self.cursor.execute(sql,val)
			self.db.commit()

			if(self.cursor.rowcount>0):
				return {"status":200,"message":"Author Removed","Error":""}
			else:
				return {"status":200,"message":"Author Not Removed","Error":""}
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}

