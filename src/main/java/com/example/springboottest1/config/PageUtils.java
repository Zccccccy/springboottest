package com.example.springboottest1.config;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * @author :
 * @Date : 2020/5/7
 * @Comments :
 * @Version :
 */
public class PageUtils {
    public static void page(PageInfo pageInfo){
        PageHelper.startPage(pageInfo.getPageNum(),pageInfo.getPageSize(), pageInfo.getTotal() <= 0);
    }
}
