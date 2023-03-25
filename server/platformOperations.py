class PlatFormOperations:

	def __init__(self,dbConnection):
		self.db = dbConnection

		
	def savePlaformDetails(self,data):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "insert into platform(platform_code,platform_name) values(%s,%s)"
			val = (data["platform_code"],data["platform_name"])

			if(self.getPlatformByCode(data['platform_code'])==None):
				cursor.execute(sql,val)
				self.db.commit()
				return {"status":200,"message":"platformed created"}
			else:
				return {"status":200,"message":"Platform exists"}
		except Exception as e:
			print(e)
			return {"status":500,"message":e}
		finally:
			if cursor!=None:
				cursor.close()
		
	def getPlaformDetails(self):
		cursor = None
		platforms = []
		try:
			cursor = self.db.cursor()
			key = ("platform_code","platform_name")
			sql = "select * from platform"

			cursor.execute(sql)

			for platform in cursor.fetchall():
				platforms.append(dict(zip(key,platform)))
			
			return platforms
		except Exception as e:
			print(e)
			return []
		finally:
			if cursor!=None:
				cursor.close()

	def getPlatformByCode(self,platform_code):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "select * from platform where platform_code=%s"
			val= (platform_code,)
			cursor.execute(sql,val)

			platform = cursor.fetchone()
			print(platform)
			return platform
		except Exception as e:
			print(e)
			return None
		finally:
			if cursor!=None:
				cursor.close()

	def removePlatform(self,platform_code):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "delete from platform where platform_code=%s"
			val = (platform_code,)

			cursor.execute(sql,val)
			self.db.commit()

			rowcount = cursor.rowcount
			if rowcount > 0:
				return {"status":200,"message":"Platform Removed"}
		except Exception as e:
			print(e)
			return {"status":500,"message":e}
		finally:
			if cursor!=None:
				cursor.close()

	def getAuthorPlatformById(self,author_id):
		cursor = self.db.cursor()
		platforms = {}
		try:
			
			keys = ('platform_code','platform_id')
		
			sql = "select platform_code,platform_id from author_platform where author_id=%s"
			val = (author_id,)
			
			cursor.execute(sql,val)
			
			platform = cursor.fetchall()
			
			if platform==None:
				return platforms
			
			for plat in platform:
				platforms[plat[0]]=plat[1]
			
			return platforms
			
		except Exception as e:
			print(e)
			return platforms
		finally:
			cursor.close()


	def getAuthorPlatformData(self,author_id,platform_code):
		cursor = self.db.cursor()
		try:

			keys = ('author_id','platform_code','platform_id')
			
			sql = "select * from author_platform where platform_code=%s and author_id=%s"
			val = (platform_code,author_id)
			
			cursor.execute(sql,val)
			
			platform = cursor.fetchone()
			
			if platform==None:
				{}
			else:
				
				return dict(zip(keys,platform))
			
		except Exception as e:
			print(e)
			return -1
		finally:
			cursor.close()
		
	def saveAuthorPlatformData(self,author_id,platform_code,platform_id):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "insert into author_platform(author_id,platform_code,platform_id) values(%s,%s,%s)"
			val = (author_id,platform_code,platform_id)
		
			cursor.execute(sql,val)
			self.db.commit()
			
			rowcount = cursor.rowcount
			print("Plat",rowcount)
			return rowcount
			
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor!=None:
				cursor.close()
			
			
	def updateAuthorPlatformData(self,author_id,platform_code,platform_id):
		cursor = None
		try:
			cursor = self.db.cursor()
			sql = "update author_platform set platform_id=%s where author_id=%s and platform_code=%s"
			val = (platform_id,author_id,platform_code)
			
			cursor.execute(sql,val)
			self.db.commit()
			
			rowcount = cursor.rowcount
			return rowcount
			
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor!=None:
				cursor.close()