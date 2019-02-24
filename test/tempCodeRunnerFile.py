    async with aiohttp.ClientSession() as session_wiki_location:    
        wiki_url = base_url+quote(station_name+'站')
        async with session.head(wiki_url) as resp:
            if(resp.status == 404):
                wiki_url = base_url+quote(station_name+'乘降所')
                async with session.head(wiki_url) as resp:
                    assert resp.status == 200
                    print(await resp.text())
                    # self.soup = BeautifulSoup(await resp.text(),features="lxml")
            else:
                assert resp.status == 200
                print(await resp.text())
