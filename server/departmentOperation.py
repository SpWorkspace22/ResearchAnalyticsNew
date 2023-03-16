# class to handle manipulation of daparments data
class DepartmentOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		self.cursor = self.db.cursor()
		
	# save author if it does not exist
	def saveDepartment(self,departName):
		try:
		
			sql = "select * from department where department_name=%s"
			val = (departName,)
			
			self.cursor.execute(sql,val)
			
			if(self.cursor.fetchone()!=None):
				return {"status":500,"message":"Duplicate department name","Error":""}
			else:
				sql = "INSERT INTO department(department_name) VALUES (%s)"
				self.cursor.execute(sql, val)
				self.db.commit()
				
				return {"status":200,"message":"Department Saved","Error":""}
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
			
		
	# get all deparments
	def getAllDepartment(self):
		try:
			keys =  ('department_id','department_name')
			sql = "select * from department"
			
			
			departments = []

			self.cursor.execute(sql)
				
			for x in self.cursor.fetchall():
				departments.append(dict(zip(keys,x)))
				
			return departments
		except:
			print(x)
			
			return {"status":500,"message":"","Error":"Server Error"}
			
			