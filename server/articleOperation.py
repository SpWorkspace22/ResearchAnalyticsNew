class ArticleOperation:

	def __init__(self,dbConnection):
		self.db = dbConnection
		
	def saveArticles(self,article):
		cursor = None
		try:
			cursor = self.db.cursor()
			
			sql = "insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code) values(%s,%s,%s,%s,%s,%s)"
			values = (article['title'],article['journal_name'],article['pub_year'],article['number_of_citation'],article['author_id'],article['platform_code'])
			
			cursor.execute(sql,values)
			
			result = cursor.rowcount
			return result
		
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor!=None:
				cursor.close()
				
	def updateArticles(self,citation,article_id):
		cursor = None
		try:
			cursor = self.db.cursor()
			
			sql = " update articles set citation=%s where articleid=%s"
			values = (citation,article_id)
			
			cursor.execute(sql,values)
			
			result = cursor.rowcount
			return result
		
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor!=None:
				cursor.close()
		
		
	def getAllArticles(self):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code order by pub_year desc";
			
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

	def getAllArticlesBytitleAuthorName(self,title,author_id,platform_code):
		cursor = None
		article = None
		
		try:
			cursor = self.db.cursor()
			
			sql = "select article_id from articles where article_name=%s and author_id=%s and platform_code=%s";
			values = (title,author_id,platform_code)
			
			cursor.execute(sql)
			
			article = cursor.fetchone()
			
			
			return article
		except Exception as e:
			print(e)
			return article
		finally:
			if cursor!=None:
				cursor.close()
		
		
	def getArticlesByName(self,name):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and article_name like '%"+name+"%' order by pub_year desc";
			values = (name,)
			
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
		
	def getArticlesByCode(self,code):
		cursor = None
		articles = []
		
		try:
			cursor = self.db.cursor()
			
			key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and platform.platform_code=%s order by pub_year desc";
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
			sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and article_name like '%"+name+"%' and platform.platform_code=%s order by pub_year desc";
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

	def getArticlePublishByYear(self):
		cursor = None
		artPubByYear = []

		try:
			cursor = self.db.cursor()
			key = ("year","platform_code","article_count")
			sql = "select pub_year,platform_code,count(*) as 'Paper Published' from articles group by pub_year,platform_code order by pub_year"

			cursor.execute(sql)

			for summary in cursor.fetchall():
				s = dict(zip(key,summary))

				if len(artPubByYear)==0:
					artPubByYear.append({'year':s['year'],s['platform_code']:s['article_count']})
				else:
					data = artPubByYear[-1]
					if data['year']==s['year']:
						data[s['platform_code']]=s['article_count']
						artPubByYear[-1]=data
					else:
						artPubByYear.append({'year':s['year'],s['platform_code']:s['article_count']})

			return artPubByYear
		except Exception as e:
			print(e)
			return []
		finally:
			if cursor!=None:
				cursor.close()

	def getArticlePublishByPlatform(self):
		cursor = None
		artPubByPlatform = []

		try:
			cursor = self.db.cursor()
			key = ("author_id","platform_code","article_count")
			sql = "select author_id,platform_code,count(*) as 'Paper Published' from articles group by author_id,platform_code order by author_id"

			cursor.execute(sql)
			
			for summary in cursor.fetchall():
				s = dict(zip(key,summary))
				if len(artPubByPlatform)==0:
					artPubByPlatform.append({'author_id':s['author_id'],s['platform_code']:s['article_count']})
				else:
					data = artPubByPlatform[-1]
					if data['author_id']==s['author_id']:
						data[s['platform_code']]=s['article_count']
						artPubByPlatform[-1]=data
					else:
						artPubByPlatform.append({'author_id':s['author_id'],s['platform_code']:s['article_count']})
			return artPubByPlatform
		except Exception as e:
			print(e)
			return []
		finally:
			if cursor!=None:
				cursor.close()