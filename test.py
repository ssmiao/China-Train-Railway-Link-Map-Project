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

with tqdm(total=1000000,ncols=100) as pbar:
    for i in range(1000000):
        time.sleep(0.001)
        mat = "{:10}"
        pbar.set_description("Processing "+mat.format(str(i)))
        pbar.update(1)

# mat = "{:20}\t{:28}\t{:32}"
# print(mat.format("占4个长度","占8个长度", "占12长度"))