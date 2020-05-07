package com.example.springboottest1.service;

import com.example.springboottest1.entity.User;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;

public interface UserLoginService {

    //用户登录
    User userLogin(String username,String password);

    //注册新用户
    int addUser(String username,String password,int age);

    //删除用户
    int delete(int id);
    //查询用户列表
    List<Map<String,Object>> queryAllUser();

    List<Map<String,Object>> queryUser_name();

    //查询用户列表
    PageInfo<User> queryAllUser1(User userList, PageInfo pageInfo);
}
