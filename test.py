# # -*- coding=utf-8 -*-
 
# import time
# from tqdm import tqdm

# total = 1000
 
# def dosomework():
#     time.sleep(0.01)
 
# # progress = ProgressBar()
# for i in tqdm(range(10000)):
#     dosomework()
#     print('T')
from tqdm import tqdm
import time

with tqdm(total=100) as pbar:
    for i in range(100):
        time.sleep(0.1)
        pbar.set_description("Processing "+str(i))
        pbar.update(1)