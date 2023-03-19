
# class responsoble for all author manipulation
class AuthorOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		

	# Insert Author if it does not exist , Email id unique constraint
	def saveAuthor(self,first_name,last_name,email,phone,department_id):
		cursor = None
		try:
			cursor = self.db.cursor()

			if(self.getAuthorByEmail(email)!=[]):
				return 0
			else:
				sql = '''INSERT INTO author(first_name,last_name,email,phone,department_id) 
						VALUES(%s, %s,%s, %s,%s)'''
				val = (first_name,last_name,email,phone,department_id)
				
				cursor.execute(sql, val)
				
				self.db.commit()
				
				rowcount = cursor.rowcount
				
				return rowcount
				
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor !=None:
				cursor.close()
			
	#update author 
	def updateAuthor(self,author_id,first_name,last_name,email,phone,department_id):
		cursor = self.db.cursor()
		try:
	
			sql = '''update author set first_name=%s, last_name=%s, email=%s, phone=%s,
					department_id=%s where author_id=%s'''
			val = (first_name,last_name,email,phone,department_id,author_id)
				
			cursor.execute(sql,val)
			self.db.commit()
				
			rowcount = cursor.rowcount
			
			return rowcount

		except Exception as e:
			print(e)
			return -1
		finally:
			cursor.close()
		
	# list all authors
	def getAllAuthors(self):
		cursor = None
		try:
			cursor = self.db.cursor()
			authors = []
			keys = ('author_id','first_name','last_name','email','phone','department_id','depart_name')

			cursor.execute("select author_id,first_name,last_name,email,phone,a.department_id,department_name  from author a, department d where a.department_id=d.deparment_id")
			
			for x in cursor.fetchall():
				authors.append(dict(zip(keys,x)))

			return authors
		except Exception as e:
			print(e)
			return {"status":500,"message":"Server Error"}
		finally:
			if cursor !=None:
				cursor.close()
		
	# search author by email
	def getAuthorByEmail(self,email):
		cursor = None
		try:
			cursor = self.db.cursor()

			authors = []
		
			keys = ('author_id','first_name','last_name','email','phone','department_id','depart_name')
			sql = "select author_id,first_name,last_name,email,phone,a.department_id,department_name  from author a, department d where a.department_id=d.deparment_id and a.email=%s"
			val = (email,)
			
			cursor.execute(sql,val)
			author = cursor.fetchone()

			if(author==None):
				return authors

			authors.append(dict(zip(keys,author)))
			
			return authors
			
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		finally:
			if cursor!=None:
				cursor.close()
				
	# search author by id
	def getAuthorById(self,email):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "select * from author where author_id = %s"
			val = (author_id,)
			cursor.execute(sql,val)
			
			author = cursor.fetchone()
			
			return author
			
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		finally:
			if cursor!=None:
				cursor.close()

	def removeAuthor(self,author_id):
		cursor = self.db.cursor()
		try:
			sql = "delete from author where author_id=%s"
			val=(author_id,)

			cursor.execute(sql,val)
			self.db.commit()

			rowcount = cursor.rowcount
			if(rowcount>0):
				return {"status":200,"message":"Author Removed","Error":""}
			else:
				return {"status":200,"message":"Author Not Removed","Error":""}
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		finally:
			cursor.close()

