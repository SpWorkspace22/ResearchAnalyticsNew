import requests
import re


class ScopusExtractor:

	def __init__(self,apiKey):
		self.headers = {'X-ELS-APIKey':apiKey}
		self.baseUrl = url = "https://api.elsevier.com/content/search/scopus"
		
	def scanScopus(self, authors):
		
		
		try:
		
			for author in authors:
			
				moreRecords = True
				start = 0
				articleList = []

				while(moreRecords):
				
					param = {'query':'AU-ID ('+author[0]+')','start':start}
					response = requests.get(self.baseUrl,headers=self.headers,params=param)
					
					searchResults = response.json()['search-results']
					
					if searchResults.get('entry') is not None:
						articleList.extend(self.scanPage(searchResults["entry"],author))
						start=start+25
						moreRecords=False
					else:
						break
						
				print(articleList)
		except Exception as err:
			print(err)
		
	
	def scanPage(self,entries,author):
		
		extracts = []
		for ent in entries:
			papers = {}
			papers['title']=re.sub(r'[+<sub></sup><inf>/inf>]','', ent["dc:title"])
			papers['journal_name']=ent["prism:publicationName"]
			papers['pub_year']=int(ent["prism:coverDate"][0:4])
			papers['number_of_citation']=int(ent["citedby-count"])
			papers['author_id']=author[0]
			papers['platform_code']=author[1]
								
			extracts.append(papers)
			
		return extracts
