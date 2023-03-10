import mysql.connector



class DatabaseSetup:
	connectionObj = None
	def __init__(self):
		pass
		
	def getConnection(self,host,port,user,password,database):
		try:
			connectionObj = mysql.connector.connect(host=host,port=port,user=user,password=password,database=database)
			return connectionObj
		except Exception as e:
			print(e)
			
	def closeConnection(self):
		pass
		
		
