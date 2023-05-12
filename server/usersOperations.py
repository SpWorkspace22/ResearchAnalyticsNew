import hashlib

class UserOperations:

	def __init__(self,dbConnection):
		self.db = dbConnection
		
		
	def registerUser(self,data):
		result = {}
		cursor = None
		try:
			if(not self.isUserExist(data["email"])):
				cursor = self.db.cursor()
				sql = "insert into users(name,email,password) values(%s,%s,%s)"
				val = (data["user_name"],data["email"],self.encrypt(data["password"]))
				
				cursor.execute(sql,val)
				self.db.commit()
				if(cursor.rowcount>0):
					result = {"ststua":200,"message":"users registered"}
	
			else:
				result = {"ststua":404,"message":"users exists"}
			
			return result
		except Exception as e:
			print(e)
			result = {"ststua":500,"message":"server error"}
			
			return result
		finally:
			if cursor!=None:
				cursor.close()
			
		
	def verifyUser(self,data):
		result = {}
		cursor = None
		try:
			cursor = self.db.cursor()
			
			sql = "select name from users where email=%s and password=%s"
		
			val = (data["email"],self.encrypt(data["password"]))
			
			cursor.execute(sql,val)
			

			user = cursor.fetchone()
			
			if user!=None:
				result = {"status":200,"message":user[0]}
			else:
				result = {"status":404,"message":"invalid credentials"}
				
			return result
		except Exception as e:
			print(e)
			result = {"status":500,"message":"server error"}
			return result
		finally:
			if cursor!=None:
				cursor.close()
		
		
	def isUserExist(self,email):
		cursor = None
		try:
			cursor = self.db.cursor()
			
			sql = "select name from users where email=%s"
			val = (email,)
			
			cursor.execute(sql,val)
			
			user = cursor.fetchone()
			
			if user==None:
				return False
			else:
				return True
				
		except Exception as e:
			print(e)

		finally:
			if cursor!=None:
				cursor.close()
		
		
	def encrypt(self,password):
		result = hashlib.md5(password.encode())
		
		result = result.hexdigest()
		
		return result
		