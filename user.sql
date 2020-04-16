/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2020-04-16 14:22:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(45) DEFAULT NULL COMMENT '用户名',
  `password` varchar(36) DEFAULT NULL COMMENT '密码',
  `age` int(11) DEFAULT NULL COMMENT '用户年龄',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('000001', 'admin', '123456', '22');
INSERT INTO `user` VALUES ('000002', 'test', '123456', '22');
INSERT INTO `user` VALUES ('000003', 'zxcz', '123', '24');
INSERT INTO `user` VALUES ('000004', 'asd', 'asdasd', '24');
INSERT INTO `user` VALUES ('000005', 'QWE', 'qwe', '18');
INSERT INTO `user` VALUES ('000006', 'zxczxc', '123456', '24');
