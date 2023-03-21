class ArticleOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		
	def saveArticles(self):
		pass
		
	def updateArticles(self):
		pass
		
		
	def getAllArticles(self):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platfrom where articles.platform_code=platform.platform_code order by pub_year desc";
			
			cursor.execute(sql)
			
			for article in cursor.fetchall():
					articles.append(dict(zip(key,article)))

			return articles
		except Exception as e:
			print(e)
			return articles
		finally:
			if cursor!=None:
				cursor.close()
		
		
	def getArticlesByName(self,name):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platfrom where articles.platform_code=platform.platform_code and article_name like '%%s%%' order by pub_year desc";
			values = (name,)
			
			cursor.execute(sql,values)
			
			for article in cursor.fetchall():
					articles.append(dict(zip(key,article)))

			return articles
		except Exception as e:
			print(e)
			return articles
		finally:
			if cursor!=None:
				cursor.close()
		
	def getArticleByCode(self,code):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platfrom where articles.platform_code=platform.platform_code and platform.platform_code=%s order by pub_year desc";
			values = (code,)
			
			cursor.execute(sql,values)
			
			for article in cursor.fetchall():
					articles.append(dict(zip(key,article)))

			return articles
		except Exception as e:
			print(e)
			return articles
		finally:
			if cursor!=None:
				cursor.close()

		
	def getArtilcesByCodeAndName(self,name,code):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platfrom where articles.platform_code=platform.platform_code and article_name like '%%s%%' and platform.platform_code=%s order by pub_year desc";
			values = (name,code)
			
			cursor.execute(sql,values)
			
			for article in cursor.fetchall():
					articles.append(dict(zip(key,article)))

			return articles
		except Exception as e:
			print(e)
			return articles
		finally:
			if cursor!=None:
				cursor.close()
