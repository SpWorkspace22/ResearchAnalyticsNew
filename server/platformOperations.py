class PlatFormOperations:

	def __init__(self,dbConnection):
		self.db = dbConnection
		self.cursor = self.db.cursor()
		
		
	def savePlaformDetails(self,platform_code,platform_name):
		pass
		
	
	def getPlaformDetails(self,platform_code):
		pass
		
		
		
	def getAuthorPlatformById(self,author_id):
		platforms = {}
		try:
			
			keys = ('platform_code','platform_id')
			
			sql = "select platform_code,platform_id from author_platform where author_id=%s"
			val = (author_id,)
			
			self.cursor.execute(sql,val)
			
			platform = self.cursor.fetchall()
			
			if platform==None:
				return platforms
			
			for plat in platform:
				platforms[plat[0]]=plat[1]
			
			return platforms
			
		except Exception as e:
			print(e)
			return platforms
			
	def getAuthorPlatformData(self,author_id,platform_code):
		try:
			
			
			keys = ('author_id','platform_code','platform_id')
			
			sql = "select * from author_platform where platform_code=%s and author_id=%s"
			val = (platform_code,author_id)
			
			self.cursor.execute(sql,val)
			
			platform = self.cursor.fetchone()
			
			if platform==None:
				{}
			else:
				
				return dict(zip(keys,platform))
			
		except Exception as e:
			print(e)
			return -1
		
	def saveAuthorPlatformData(self,author_id,platform_code,platform_id):
		print(platform_id)
		try:
			sql = "insert into author_platform(author_id,platform_code,platform_id) values(%s,%s,%s)"
			val = (author_id,platform_code,platform_id)
		
			self.cursor.execute(sql,val)
			self.db.commit()
			
			return self.cursor.rowcount
			
		except Exception as e:
			print(e)
			return -1
			
			
	def updateAuthorPlatformData(self,author_id,platform_code,platform_id):
		
		try:
			sql = "update author_platform set platform_id=%s where author_id=%s and platform_code=%s"
			val = (platform_id,author_id,platform_code)
			
			self.cursor.execute(sql,val)
			self.db.commit()
			
			return self.cursor.rowcount
			
		except Exception as e:
			print(e)
			return -1