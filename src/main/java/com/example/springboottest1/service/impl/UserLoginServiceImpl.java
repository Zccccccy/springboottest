package com.example.springboottest1.service.impl;

import com.example.springboottest1.entity.User;
import com.example.springboottest1.dao.userMapper;
import com.example.springboottest1.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserLoginServiceImpl implements UserLoginService {

    /**
     * 注入dao
     */
    @Autowired
    private userMapper usermapper;

    //用户登录
    public User userLogin(String username,String password){
        return usermapper.userLogin(username,password);
    }

    //注册新用户
    public int addUser(String username,String password,int age){

        /**
         * 注意查看mapper中的注释
         */

        return usermapper.addUser(username,password,age);
        //return usermapper.addUser1(username,password,age);     //对应sql语句中的第二种注册方式
    }

    //删除用户
    public int delete(int id){
        int a = usermapper.delete(id);
        return a;
    }
    //查询用户列表
    public List<Map<String,Object>> queryAllUser(){
        return usermapper.queryAllUser();
    }
    public List<Map<String,Object>> queryUser_name(){
        return usermapper.queryUser_name();
    }
}
