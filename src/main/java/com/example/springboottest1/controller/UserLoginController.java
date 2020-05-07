package com.example.springboottest1.controller;

import com.example.springboottest1.entity.User;
import com.example.springboottest1.service.UserLoginService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = {"/user"})
public class UserLoginController extends BaseController{

    /**
     * 最开始希望用Map的形式接参数，后来不用了，将请求对应的接受方式记录一下
     *
     * @RequestBody Map<String,Object> map      post请求
     * @RequestParam Map<String,Object> map     get请求
     */

    /**
     * 注入service
     */
    @Autowired
    private UserLoginService userLoginService;


    /**
     * 跳转到用户登录页面
     * @return 登录页面
     */
    @RequestMapping(value = {"/loginHtml"})
    public String loginHtml(){
        return "userLogin";
    }



    /**
     * 获取用户名与密码，用户登录
     * @return 登录成功页面
     */
    @RequestMapping(value = {"/userLogin"})
    public String userLogin(@RequestParam("username") String username,
                            @RequestParam("password") String password,
                            HttpServletRequest request){

        if(StringUtils.isEmpty(username)){
            return "Empty_username";
        }

        if(StringUtils.isEmpty(password)){
            return "Empty_password";
        }

        User user = userLoginService.userLogin(username,password);

        if(user != null){                                                  //登录成功
            request.getSession().setAttribute("session_user",user);     //将用户信息放入session  用于后续的拦截器
            return "loginSuccess";
        }
        return "loginError";
    }


    /**
     * 跳转到用户管理页面
     * @return 管理页面
     */
    @RequestMapping(value = {"/management"})
    public String management(){
        return "userManagement";
    }




    @RequestMapping(value = {"/delete_id"})
    public String delete_id(){
        return "Delete";
    }

    /**
     * 跳转到用户注册页面
     * @return 注册页面
     */
    @RequestMapping(value = {"/registerpage"})
    public String registerpage(){
        return "register";
    }
    /**
     * 注册新用户
     * @return 注册结果
     */
    @ResponseBody
    @RequestMapping(value = {"/uregister"})
    public String addUser(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("password2") String password2,
                          @RequestParam("age") Integer age){

        if(StringUtils.isEmpty(username)){
            return "用户名不能为空";
        }

        if(StringUtils.isEmpty(password)){
            return "密码不能为空";
        }

        if(StringUtils.isEmpty(password2)){
            return "确认密码不能为空";
        }

        if(!password.equals(password2)){
            return "两次密码不相同，注册失败！！";
        }else {
            int res = userLoginService.addUser(username,password,age);
            if(res == 0){
                return "注册失败！";
            }else {
                return "注册成功！";
            }
        }

    }


    /**
     * 删除用户
     * @return 删除结果
     */
    @ResponseBody
    @RequestMapping(value = {"/delete"})
    public String delete(@RequestParam("id") Integer id) {

        if (id == null ) {
            return "id不能为空";
        }else {
            int res = userLoginService.delete(id);
            if(res == 0){
                return "没有此id用户、删除失败！";
            }else {
                return "删除成功！";
            }
        }
    }



    /**
     * 用于测试拦截器（用户是否登录，查看session）
     * 查询用户列表  http://localhost:8080/user/queryAllUser
     * @return 用户列表（json串）
     */

    @ResponseBody
    @RequestMapping(value = {"/queryAllUser"})
    public List<Map<String,Object>> queryAllUser(){

        return userLoginService.queryAllUser();
    }


    @RequestMapping(value = {"/select"})
    public String select(){
        return "userList";
    }


    @ResponseBody
    @RequestMapping(path = "/queryAllUser1")
    public PageInfo queryAllUser1(User userList, PageInfo pageInfo) {
        return userLoginService.queryAllUser1(userList, pageInfo);
    }



    /**
     * 用于测试拦截器（用户是否登录，查看session）
     * 查询用户姓名列表  http://localhost:8080/user/queryUser_name
     * @return 用户姓名列表（json串）
     */
    @ResponseBody
    @RequestMapping(value = {"/queryUser_name"})
    public List<Map<String,Object>> queryUser_name() {

        return userLoginService.queryUser_name();
    }
}
