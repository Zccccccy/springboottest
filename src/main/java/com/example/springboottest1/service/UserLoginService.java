package com.example.springboottest1.service;

import com.example.springboottest1.entity.User;

import java.util.List;
import java.util.Map;

public interface UserLoginService {

    //用户登录
    User userLogin(String username,String password);

    //注册新用户
    int adduser(String username,String password,int age);

    //删除用户
    int delete(int id);
    //查询用户列表
    List<Map<String,Object>> queryAllUser();

    List<Map<String,Object>> queryUser_name();
}
