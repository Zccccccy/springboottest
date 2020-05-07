package com.example.springboottest1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 这部分是最开始创建项目时，为了测试项目能否正常运行写的一个测试
 *
 * 访问http://localhost:8080/hello/springboot     可在页面看见：HelloWord
 *
 * */

@Controller
@RequestMapping(value = {"/hello"})
public class HelloController extends BaseController {

    @RequestMapping(value = {"/springboot"})
    public String hello(){
        String loginStatus = this.loginCheck();
        if (loginStatus==""){
            return "HelloWord";
        }
        return "HelloWord";
    }
}
