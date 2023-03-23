import re
from scholarly import scholarly, ProxyGenerator

class GoogleScholarExtractor:

	def __init_(self):
		try:
			pg = ProxyGenerator()
			pg.FreeProxies()
			scholarly.use_proxy(pg)

		except Exception as ex:
			print(ex)
			
	def parseData(self,authors):

		extracts = []
		
		for author in authors:
			try:
			
				search_query = scholarly.search_author_id(author[2])
				articles = scholarly.fill(search_query)
				
				for publication in articles['publications']:
								papers = {}
								papers['title']=publication['bib']['title']
								papers['journal_name']=re.sub(r'[\d+\(\)\-,–…]','', publication['bib']['citation']).rstrip()
								papers['pub_year']=int(publication['bib']['pub_year'])
								papers['number_of_citation']=int(publication['num_citations'])
								papers['author_id']=author[0]
								papers['platform_code']=author[1]
								
								extracts.append(papers)
								
				print(len(extracts))
			
			except Exception as e:
				print(e)
				continue
				
		return extracts
        