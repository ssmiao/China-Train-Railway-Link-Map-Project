import asyncio
import time

async def say_after0(delay, what):
    time.sleep(1)
    print(time.strftime('%X'))
    await asyncio.sleep(delay)
    print(what)
    print(time.strftime('%X'))

async def say_after1(delay, what):
    # time.sleep(1)
    print(time.strftime('%X'))
    await asyncio.sleep(delay)
    print(what)
    print(time.strftime('%X'))

async def main():
    task1 = asyncio.create_task(
        say_after0(1, 'hello'))

    task2 = asyncio.create_task(
        say_after1(2, 'world'))

    print(f"started at {time.strftime('%X')}")

    # Wait until both tasks are completed (should take
    # around 2 seconds.)
    await task1
    await task2

    print(f"finished at {time.strftime('%X')}")

asyncio.run(main())