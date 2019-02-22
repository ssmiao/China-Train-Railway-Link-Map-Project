import asyncio
import urllib.parse
import sys

# async def print_http_headers(url):
#     url = urllib.parse.urlsplit(url)
#     if url.scheme == 'https':
#         reader, writer = await asyncio.open_connection(
#             url.hostname, 443, ssl=True)
#     else:
#         reader, writer = await asyncio.open_connection(
#             url.hostname, 80)

#     query = (
#         f"HEAD {url.path or '/'} HTTP/1.0\r\n"
#         f"Host: {url.hostname}\r\n"
#         f"\r\n"
#     )

#     writer.write(query.encode('latin-1'))
#     while True:
#         line = await reader.readline()
#         if not line:
#             break

#         line = line.decode('latin1').rstrip()
#         if line:
#             print(f'HTTP header> {line}')

#     # Ignore the body, close the socket
#     writer.close()

# url = sys.argv[1]
# asyncio.run(print_http_headers(url))

async def wget(host):
    print('wget %s...' % host)
    connect = asyncio.open_connection(host, 80)
    reader, writer = await connect
    header = 'GET / HTTP/1.0\r\nHost: %s\r\n\r\n' % host
    writer.write(header.encode('utf-8'))
    await writer.drain()
    while True:
        line = await reader.readline()
        if line == b'\r\n':
            break
        print('%s header > %s' % (host, line.decode('utf-8').rstrip()))
    # Ignore the body, close the socket
    writer.close()

loop = asyncio.get_event_loop()
tasks = [wget(host) for host in ['www.sina.com.cn', 'www.sohu.com', 'www.163.com']]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()