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
			self.db.commit()
			
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
			
			sql = " update articles set citation=%s where article_id=%s"
			values = (citation,article_id)
			
			cursor.execute(sql,values)
			self.db.commit()
			result = cursor.rowcount
			return result
		
		except Exception as e:
			print(e)
			return -1
		finally:
			if cursor!=None:
				cursor.close()
		
		
	# def getAllArticles(self):
	# 	cursor = None
	# 	articles = []
		
	# 	try:
	# 		cursor = self.db.cursor()
			
	# 		key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
	# 		sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code order by pub_year desc"
			
	# 		cursor.execute(sql)
			
	# 		for article in cursor.fetchall():
	# 				articles.append(dict(zip(key,article)))
			
	# 		return articles
	# 	except Exception as e:
	# 		print(e)
	# 		return articles
	# 	finally:
	# 		if cursor!=None:
	# 			cursor.close()

	# def getAllArticlesBytitleAuthorName(self,title,journal_name,pub_year,author_id,platform_code):
	# 	cursor = None
	# 	article = None
		
	# 	try:
	# 		cursor = self.db.cursor()
		
	# 		sql = "select article_id from articles where article_name=%s and journal_name=%s and pub_year=%s and author_id=%s and platform_code=%s"
	# 		values = (title,journal_name,pub_year,author_id,platform_code)
			
	# 		cursor.execute(sql,values)
			
	# 		article = cursor.fetchone()
			
			
	# 		return article
	# 	except Exception as e:
	# 		print(e)
	# 		return article
	# 	finally:
	# 		if cursor!=None:
	# 			cursor.close()
		
		
	# def getArticlesByName(self,name):
	# 	cursor = None
	# 	articles = []
		
	# 	try:
	# 		cursor = self.db.cursor()
			
	# 		key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
	# 		sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and article_name like '%"+name+"%' order by pub_year desc";
	# 		values = (name,)
			
	# 		cursor.execute(sql)
			
	# 		for article in cursor.fetchall():
	# 			articles.append(dict(zip(key,article)))

	# 		return articles
	# 	except Exception as e:
	# 		print(e)
	# 		return articles
	# 	finally:
	# 		if cursor!=None:
	# 			cursor.close()
		
	# def getArticlesByCode(self,code):
	# 	cursor = None
	# 	articles = []
		
	# 	try:
	# 		cursor = self.db.cursor()
			
	# 		key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
	# 		sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and platform.platform_code=%s order by pub_year desc";
	# 		values = (code,)
			
	# 		cursor.execute(sql,values)
			
	# 		for article in cursor.fetchall():
	# 				articles.append(dict(zip(key,article)))

	# 		return articles
	# 	except Exception as e:
	# 		print(e)
	# 		return articles
	# 	finally:
	# 		if cursor!=None:
	# 			cursor.close()

		
	# def getArtilcesByCodeAndName(self,name,code):
	# 	cursor = None
	# 	articles = []
		
	# 	try:
	# 		cursor = self.db.cursor()
			
	# 		key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform")
	# 		sql = "select article_id,article_name,journal_name,pub_year,citation,platform_name from articles,platform where articles.platform_code=platform.platform_code and article_name like '%"+name+"%' and platform.platform_code=%s order by pub_year desc";
	# 		values = (code,)
			
	# 		cursor.execute(sql,values)
			
	# 		for article in cursor.fetchall():
	# 				articles.append(dict(zip(key,article)))

	# 		return articles
	# 	except Exception as e:
	# 		print(e)
	# 		return articles
	# 	finally:
	# 		if cursor!=None:
	# 			cursor.close()



	def getAllArticlesByCriteria(self,criteria):
		cursor = None
		articles = []

		articleQuery = '''
			select article_id,article_name,journal_name,pub_year,citation,platform.platform_name,concat(first_name," ",last_name) as 'author_name', department_name 
			from articles,platform,author,department
 			where articles.platform_code=platform.platform_code and articles.author_id=author.author_id and author.department_id=department.deparment_id
			'''
		key = ("Article_Id","Article_Name","Journal","Year","Citation","Platform","Author_Name","Department_Name")

		try:
			cursor = self.db.cursor()
			
			filters = self.filterOptions(criteria)

			if(filters=={}):
				cursor.execute(articleQuery)
			else:
				for column, value in filters.items():
					if(value.isdigit()):
						articleQuery=articleQuery+" and "+column+"="+value
					else:
						articleQuery=articleQuery+" and "+column+"='"+value+"'"						
				cursor.execute(articleQuery)


			for article in cursor.fetchall():
					articles.append(dict(zip(key,article)))
			return articles
		except Exception as e:
			print(e)
			return articles
		finally:
			if cursor!=None:
				cursor.close()

	def filterOptions(self,criteria):
		filter_options = {}

		if(criteria=={}):
			return filter_options
		
		if(criteria['article_name']!=''):
			filter_options['article_name']=criteria['article_name']
		
		if(criteria['platform_code']!='' and criteria['platform_code']!='-1'):
			filter_options['platform.platform_code']=criteria['platform_code']
		
		if(criteria['department_id']!='' and criteria['department_id']!='-1'):
			filter_options['author.department_id']=criteria['department_id']
		
		if(criteria['year']!=''):
			filter_options['pub_year']=criteria['year']
		
		return filter_options
# Summary Functions
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


	def getArticleCountByPlatform(self):
		cursor = None
		artCountByPlatformCode =[]

		try:
			cursor = self.db.cursor()
			key = ("platform_code","total")
			sql = "select platform_code,count(*) as total from articles group by platform_code"

			cursor.execute(sql)

			for data in cursor.fetchall():
				artCountByPlatformCode.append(dict(zip(key,data)))
			
			return artCountByPlatformCode
		except Exception as e:
			print(e)
			return artCountByPlatformCode
		finally:
			if cursor !=None:
				cursor.close()