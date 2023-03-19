# class to handle manipulation of daparments data
class DepartmentOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		
		
	# save author if it does not exist
	def saveDepartment(self,departName):
		cursor = self.db.cursor()
		try:
		
			sql = "select * from department where department_name=%s"
			val = (departName,)
			
			cursor.execute(sql,val)
			
			depart = cursor.fetchone()
			if(depart!=None):
				return {"status":500,"message":"Duplicate department name","Error":""}
			else:
				sql = "INSERT INTO department(department_name) VALUES (%s)"
				cursor.execute(sql, val)
				self.db.commit()
				
				return {"status":200,"message":"Department Saved","Error":""}
		except Exception as e:
			print(e)
			return {"status":500,"message":"","Error":"Server Error"}
		finally:
			cursor.close()
			
		
	# get all deparments
	def getAllDepartment(self):
		cursor = None
		try:
			cursor = self.db.cursor()
			keys =  ('department_id','department_name')
			sql = "select * from department"
			departments = []

			cursor.execute(sql)
				
			for x in cursor.fetchall():
				departments.append(dict(zip(keys,x)))
				
			return departments
		except Exception as x:
			print(x)
			return {"status":500,"message":"","Error":"Server Error"}
		finally:
			if cursor!=None:
				cursor.close()
			