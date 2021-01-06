-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: MODERN_WAITER_DB
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=`+00:00` */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`NO_AUTO_VALUE_ON_ZERO` */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `cost` double NOT NULL,
  `description` varchar(1000) NOT NULL,
  `calories` double NOT NULL,
  `popularity_count` int(11) NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `items_id_uindex` (`id`),
  KEY `items_restaurant_id_fk` (`restaurant_id`),
  CONSTRAINT `items_restaurant_id_fk` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,`Spicy Ahi Roll`,`Sushi`,16.5,`ocean wise ahi tuna, mango, avocado, asparagus, cucumber, sesame soy paper, wasabi mayo, cripy yam curls`,500,3,`gs://modern-waiter-47e96.appspot.com/dummy-spicy-ahi.jpg`),(2,1,`Prawn Crunch Roll`,`Sushi`,16,`crispy prawn, mango, avocado, asparagus, cucumber, sesame soy paper, sriracha mayo, soy glaze`,500,4,`gs://modern-waiter-47e96.appspot.com/dummy-prawn-crunch.jpg`),(3,1,`Ceviche`,`Appetizers`,18.5,`ocean wise lois lake steelhead, sustainably harvested prawns, avocado, chili, thai basil, mint, peruvian leche de tigre marinade`,750,2,`gs://modern-waiter-47e96.appspot.com/dummy-prawn-crunch.jpg`),(4,1,`Mini crispy chicken sandwiches`,`Appetizers`,16,`spicy panko-crusted chicken, swiss cheese, sambal mayo, lettuce, tomato, pickle, onion`,1100,5,`gs://modern-waiter-47e96.appspot.com/dummy-mini-crispy.jpg`),(5,1,`Modern bowl`,`Bowls`,21.5,`tabbouleh, pineapple salsa, broccoli, tomatoes, cucumber, fresh greens, jasmine rice, miso carrot ginger sauce, chicken`,450,3,`gs://modern-waiter-47e96.appspot.com/dummy-modern-bowl.jpg`),(6,1,`Tuna poke bowl`,`Bowls`,20.5,`sesame ginger ocean wise, ahi, jasmine rice, mango, cucumber, mango, cucumber, avocado, edamane, radish, crispy, tempura`,800,4,`gs://modern-waiter-47e96.appspot.com/dummy-tuna-bowl.jpg`);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_options`
--

DROP TABLE IF EXISTS `items_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `items_id` int(11) NOT NULL,
  `options_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `items_options_items_id_fk` (`items_id`),
  KEY `items_options_options_id_fk` (`options_id`),
  CONSTRAINT `items_options_items_id_fk` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  CONSTRAINT `items_options_options_id_fk` FOREIGN KEY (`options_id`) REFERENCES `options` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_options`
--

LOCK TABLES `items_options` WRITE;
/*!40000 ALTER TABLE `items_options` DISABLE KEYS */;
INSERT INTO `items_options` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,3),(6,3,1),(7,4,4),(8,4,5),(9,5,7),(10,6,1),(11,6,3),(12,6,6),(13,6,7);
/*!40000 ALTER TABLE `items_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `cost` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `options_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,`avocado`,1.5),(2,`wasabi mayo`,1),(3,`mango`,0),(4,`pickle`,0),(5,`onion`,0),(6,`radish`,0),(7,`jasmine rice`,2),(8,``,0);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordered_items`
--

DROP TABLE IF EXISTS `ordered_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordered_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orders_id` int(11) NOT NULL,
  `items_id` int(11) NOT NULL,
  `has_paid` tinyint(1) NOT NULL DEFAULT `0`,
  `is_selected` tinyint(1) NOT NULL DEFAULT `0`,
  `users_id` int(11) DEFAULT `-1`,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ordered_items_id_uindex` (`id`),
  KEY `ordered_items_orders_id_fk` (`orders_id`),
  CONSTRAINT `ordered_items_orders_id_fk` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordered_items`
--

LOCK TABLES `ordered_items` WRITE;
/*!40000 ALTER TABLE `ordered_items` DISABLE KEYS */;
INSERT INTO `ordered_items` VALUES (1,1,1,1,0,-1),(2,1,2,1,0,-1),(3,1,3,1,0,-1),(4,2,1,1,1,-1),(5,2,1,0,0,-1),(6,2,1,0,0,-1),(7,1,3,1,0,-1),(8,1,3,1,0,-1),(9,1,3,1,0,-1),(10,1,3,1,0,-1),(11,1,3,1,0,-1),(12,1,3,1,0,-1),(13,1,3,1,0,-1),(14,1,3,1,0,-1),(15,1,3,1,0,-1),(16,1,3,1,0,-1),(17,1,3,1,0,-1),(18,1,5,1,0,-1),(19,1,5,1,0,-1),(20,1,5,1,0,-1),(21,1,3,1,0,-1),(22,1,3,1,0,-1),(23,1,3,1,0,-1),(24,1,4,1,0,-1),(25,1,4,1,0,-1),(26,1,4,1,0,-1),(27,1,2,1,0,-1),(28,1,2,1,0,-1),(29,1,2,1,0,-1),(30,1,6,1,0,-1),(31,1,6,1,0,-1),(32,1,4,1,0,-1),(33,1,4,1,0,-1),(34,1,4,1,0,-1),(35,1,3,1,0,-1),(36,1,3,1,0,-1),(37,1,3,1,0,-1),(38,1,3,1,0,-1),(39,1,2,1,0,-1),(40,1,2,1,0,-1),(41,1,2,1,0,-1),(42,1,2,1,0,-1),(43,1,2,1,0,-1),(44,1,2,1,0,-1),(45,1,2,1,0,-1),(46,1,2,1,0,-1),(47,1,2,1,0,-1),(48,1,2,1,0,-1),(49,1,3,1,0,-1),(50,1,3,1,0,-1),(51,1,3,1,0,-1),(52,1,3,1,0,-1),(53,1,3,1,0,-1),(54,1,3,1,0,-1),(55,1,3,1,0,-1),(56,1,3,1,0,-1),(57,1,3,1,0,-1),(58,1,1,1,0,-1),(59,1,1,1,0,-1),(60,1,1,1,0,-1),(61,1,2,1,0,-1),(62,1,2,1,0,-1),(63,1,1,1,0,-1),(64,1,1,1,0,-1),(65,1,1,1,0,-1),(66,1,3,1,0,-1),(67,1,3,1,0,-1),(68,1,3,1,0,-1),(69,1,2,1,0,-1),(70,1,1,1,0,-1),(71,1,2,1,0,-1),(72,1,1,1,0,-1),(73,1,2,1,0,-1),(74,1,2,1,0,-1),(75,1,2,1,0,-1),(76,1,3,1,0,-1),(77,1,3,1,0,-1),(78,1,1,1,0,-1),(79,1,3,1,0,-1),(80,1,3,1,0,-1),(81,1,3,1,0,-1),(82,1,3,1,0,-1),(83,1,3,1,0,-1),(84,1,2,1,0,-1),(85,1,2,1,0,-1),(86,1,2,1,0,-1),(87,1,1,1,0,-1),(88,1,1,1,0,-1),(89,1,1,1,0,-1),(90,1,3,1,0,-1),(91,1,3,1,0,-1),(92,140,2,1,0,-1),(93,140,2,1,0,-1),(94,140,2,1,0,-1),(95,140,3,1,0,-1),(96,140,3,1,0,-1),(97,140,1,1,0,-1),(98,140,1,1,0,-1),(99,141,1,1,0,-1),(100,141,1,1,0,-1),(101,141,2,1,0,-1),(102,141,2,1,0,-1),(103,141,2,1,0,-1),(104,141,2,1,0,-1),(105,141,2,1,0,-1),(106,142,3,1,0,-1),(107,142,3,1,0,-1),(108,143,1,1,0,-1),(109,143,2,1,0,-1),(110,143,1,1,0,-1),(111,143,2,1,0,-1),(112,143,2,1,0,-1),(113,143,2,1,0,-1),(114,143,3,1,0,-1),(115,143,2,1,0,-1),(116,143,1,1,0,-1),(117,143,1,1,0,-1),(118,143,1,1,0,-1),(119,143,1,1,0,-1),(120,143,1,1,0,-1),(121,143,1,1,0,-1),(122,143,1,1,0,-1),(123,143,3,1,0,-1),(124,143,3,1,0,-1),(125,143,3,1,0,-1),(126,144,2,1,0,-1),(127,144,2,1,0,-1),(128,144,3,1,0,-1),(129,144,3,1,0,-1),(130,144,3,1,0,-1),(131,144,3,1,0,-1),(132,144,1,1,0,-1),(133,145,1,1,0,-1),(134,145,2,0,0,-1),(135,145,2,0,0,-1),(136,146,1,1,0,-1),(137,146,1,1,0,-1),(138,146,1,1,0,-1),(139,147,1,1,0,-1),(140,147,1,1,0,-1),(141,148,1,1,0,-1),(142,148,2,1,0,-1),(143,148,2,1,0,-1),(144,148,3,1,0,-1),(145,148,3,1,0,-1),(146,148,2,1,0,-1),(147,148,2,1,0,-1),(148,148,1,1,0,-1),(149,148,1,1,0,-1),(150,148,3,1,0,-1),(151,148,3,1,0,-1),(152,148,1,1,0,-1),(153,149,1,1,0,-1),(154,150,3,1,0,-1),(155,150,3,1,0,-1),(156,150,3,1,0,-1),(157,150,1,1,0,-1),(158,150,1,1,0,-1),(159,150,3,1,0,-1),(160,150,3,1,0,-1),(161,150,3,1,0,-1),(162,150,3,1,0,-1),(163,150,3,1,0,-1),(164,150,3,1,0,-1),(165,150,3,1,0,-1),(166,151,1,1,0,-1),(167,151,1,1,0,-1),(168,151,1,1,0,-1),(169,151,1,1,0,-1),(170,151,1,1,0,-1),(171,151,1,1,0,-1),(172,151,3,1,0,-1),(173,151,3,1,0,-1),(174,152,3,1,0,-1),(175,152,3,1,0,-1),(176,152,3,1,0,-1),(177,152,3,1,0,-1),(178,153,2,1,0,-1),(179,153,2,1,0,-1),(180,153,3,0,0,-1),(181,153,3,0,0,-1),(182,154,2,1,0,-1),(183,154,2,1,0,-1),(184,154,2,1,0,-1),(185,155,1,1,0,-1),(186,155,1,1,0,-1),(187,155,1,1,0,-1),(188,155,1,1,0,-1),(189,155,2,1,0,-1),(190,155,2,1,0,-1),(191,155,3,1,0,-1),(192,155,3,1,0,-1),(193,155,3,1,0,-1),(194,155,3,1,0,-1),(195,155,3,1,0,-1),(196,155,5,1,0,-1),(197,155,5,1,0,-1),(198,155,3,1,0,-1),(199,155,3,1,0,-1),(200,155,3,1,0,-1),(201,155,3,1,0,-1),(202,155,2,1,0,-1),(203,155,2,1,0,-1),(204,155,2,1,0,-1),(205,156,3,1,0,-1),(206,156,3,1,0,-1),(207,157,2,1,0,-1),(208,157,2,1,0,-1),(209,157,3,1,0,-1),(210,157,3,1,0,-1),(211,157,5,1,0,-1),(212,157,3,1,0,-1),(213,158,4,1,0,-1),(214,159,2,1,0,-1),(215,159,3,1,0,-1),(216,160,5,1,0,-1),(217,160,2,1,0,-1),(218,160,2,1,0,-1),(219,160,2,1,0,-1),(220,160,3,1,0,-1),(221,160,3,1,0,-1),(222,161,3,1,0,-1),(223,162,2,1,0,-1),(224,162,1,1,0,-1),(225,162,1,1,0,-1),(226,162,1,1,0,-1),(227,162,1,1,0,-1),(228,162,1,1,0,-1),(229,163,2,1,0,-1),(230,163,2,1,0,-1),(231,163,4,1,0,-1),(232,163,4,1,0,-1),(233,163,5,1,0,-1),(234,163,5,1,0,-1),(235,163,5,1,0,-1),(236,164,1,1,0,-1),(237,164,6,1,0,-1),(238,164,6,1,0,-1),(239,165,1,1,0,-1),(240,165,1,1,0,-1),(241,165,1,1,0,-1),(242,165,4,1,0,-1),(243,165,4,1,0,-1),(244,165,6,1,0,-1),(245,165,6,1,0,-1),(246,165,6,1,0,-1),(247,165,5,1,0,-1),(248,165,5,1,0,-1),(249,166,3,1,0,-1),(250,166,3,1,0,-1),(251,166,2,1,0,-1),(252,166,2,1,0,-1),(253,166,2,1,0,-1),(254,166,3,1,0,-1),(255,166,3,1,0,-1),(256,166,3,1,0,-1),(257,166,3,1,0,-1),(258,166,3,1,0,-1),(259,166,5,1,0,-1),(260,166,5,1,0,-1),(261,166,3,1,0,-1),(262,166,3,1,0,-1),(263,166,3,1,0,-1),(264,166,3,1,0,-1),(265,167,3,1,0,-1),(266,167,3,1,0,-1),(267,167,4,1,0,-1),(268,168,1,1,0,-1),(269,168,4,1,0,-1),(270,168,4,1,0,-1),(271,1,2,0,0,-1),(272,169,4,1,0,-1),(273,169,3,1,0,-1),(274,169,4,1,0,-1),(275,169,3,1,0,-1),(277,169,2,1,0,-1),(278,169,2,1,0,-1),(279,169,2,1,0,-1),(280,169,2,1,0,-1),(281,169,2,1,0,-1),(282,170,2,1,0,-1),(283,170,2,1,0,-1),(284,171,2,1,0,-1),(285,172,2,1,0,-1),(286,173,1,1,0,-1),(287,174,2,1,0,-1),(288,175,2,1,0,-1),(289,176,1,1,0,-1),(290,177,2,1,0,-1),(291,177,2,1,0,-1),(292,177,2,1,0,-1),(293,178,1,1,0,-1),(294,179,1,1,0,-1),(295,179,3,1,0,-1),(296,179,4,1,0,-1),(297,179,4,1,0,-1),(298,179,1,1,0,-1),(299,179,3,1,0,-1),(300,179,1,1,0,-1),(301,169,2,1,0,-1),(302,179,2,1,0,-1),(303,179,2,1,0,-1),(304,179,2,1,0,-1),(305,179,2,1,0,-1),(306,179,3,1,0,-1),(307,179,3,1,0,-1),(309,297,2,0,0,-1),(315,297,500,0,0,-1),(316,297,500,0,0,-1),(317,297,500,0,0,-1),(318,297,500,0,0,-1),(319,297,500,0,0,-1),(320,297,500,0,0,-1),(321,297,500,0,0,-1),(322,297,500,0,0,-1),(323,297,500,0,0,-1),(324,297,500,0,0,-1),(325,297,500,0,0,-1),(327,297,500,0,0,-1),(328,297,500,0,0,-1),(329,297,500,0,0,-1),(330,297,500,0,0,-1),(331,297,500,0,0,-1),(332,297,500,0,0,-1),(333,297,500,0,0,-1),(334,297,500,0,0,-1),(335,297,500,0,0,-1),(336,297,500,0,0,-1),(337,297,500,0,0,-1),(338,297,500,0,0,-1),(339,297,500,0,0,-1),(343,1,500,0,0,-1),(349,1,500,0,0,-1),(350,1,500,0,0,-1),(351,1,500,0,0,-1),(352,1,500,0,0,-1),(353,1,500,0,0,-1),(354,1,1,0,0,-1),(368,1,500,0,0,-1),(369,1,500,0,0,-1),(370,1,500,0,0,-1),(371,1,500,0,0,-1),(372,1,500,0,0,-1),(373,1,500,0,0,-1),(374,1,500,0,0,-1),(375,1,500,0,0,-1),(376,1,1,0,0,-1),(377,1,1,0,0,-1),(378,1,1,0,0,-1),(379,1,100,0,0,-1),(380,1,100,0,0,-1),(381,1,100,0,0,-1),(382,1,100,0,0,-1),(390,1,1,0,0,-1),(391,180,1,1,0,-1),(392,180,2,1,0,-1),(393,180,1,1,0,-1),(394,180,3,1,0,-1),(395,181,3,1,0,-1),(396,181,3,1,0,-1),(397,182,1,1,1,-1),(398,182,2,0,0,-1),(399,182,1,1,1,10),(400,182,1,0,1,11),(401,182,1,0,1,11),(402,182,1,0,1,11);
/*!40000 ALTER TABLE `ordered_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tables_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `has_paid` tinyint(1) NOT NULL DEFAULT `0`,
  `is_active_session` tinyint(1) NOT NULL DEFAULT `0`,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_id_uindex` (`id`),
  KEY `orders_tables_id_fk` (`tables_id`),
  KEY `orders_users_id_fk` (`users_id`),
  CONSTRAINT `orders_tables_id_fk` FOREIGN KEY (`tables_id`) REFERENCES `tables` (`id`),
  CONSTRAINT `orders_users_id_fk` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,1644.62,1,0),(2,3,2,1,51.480000000000004,1,0),(140,1,1,1,118,1,0),(141,1,1,1,113,1,0),(142,1,1,1,37,1,0),(143,1,1,1,302.5,1,0),(144,1,1,1,122.5,1,0),(145,1,1,1,48.5,1,0),(146,1,1,1,49.5,1,0),(147,1,1,1,33,1,0),(148,1,1,1,204,1,0),(149,1,1,1,16.5,1,0),(150,1,1,1,218,1,0),(151,1,1,1,136,1,0),(152,1,1,1,74,1,0),(153,1,1,1,69,1,0),(154,1,1,1,48,1,0),(155,1,1,1,355.5,1,0),(156,1,1,1,37,1,0),(157,1,1,1,109,1,0),(158,1,1,1,16,1,0),(159,1,1,1,34.5,1,0),(160,1,1,1,106.5,1,0),(161,1,1,1,18.5,1,0),(162,1,1,1,98.5,1,0),(163,1,1,1,128.5,1,0),(164,1,1,1,57.5,1,0),(165,1,1,1,186,1,0),(166,1,1,1,294.5,1,0),(167,1,1,1,53,1,0),(168,1,1,1,48.5,1,0),(169,1,1,1,149,1,0),(170,1,1,1,32,1,0),(171,1,1,1,16,1,0),(172,1,1,1,16,1,0),(173,1,1,1,16.5,1,0),(174,1,1,1,16,1,0),(175,1,1,1,16,1,0),(176,1,1,1,16.5,1,0),(177,1,1,1,48,1,0),(178,1,1,1,16.5,1,0),(179,1,1,1,219.5,1,0),(180,1,1,1,67.5,1,0),(181,1,1,1,37,1,0),(182,1,1,1,98.5,0,1),(183,1,1,1,0,0,1),(184,1,1,1,0,0,1),(185,1,1,1,0,0,1),(186,1,1,1,0,0,1),(187,1,1,1,0,0,1),(188,1,1,1,0,0,1),(189,1,1,1,0,0,1),(190,1,1,1,0,0,1),(191,1,1,1,0,0,1),(192,1,1,1,0,0,1),(193,1,1,1,0,0,1),(194,1,1,1,0,0,1),(195,1,1,1,0,0,1),(196,1,1,1,0,0,1),(197,1,1,1,0,0,1),(198,1,1,1,0,0,1),(199,1,1,1,0,0,1),(200,1,1,1,0,0,1),(201,1,1,1,0,0,1),(202,1,1,1,0,0,1),(203,1,1,1,0,0,1),(204,1,1,1,0,0,1),(205,1,1,1,0,0,1),(206,1,1,1,0,0,1),(207,1,1,1,0,0,1),(208,1,1,1,0,0,1),(209,1,1,1,0,0,1),(210,1,1,1,0,0,1),(211,1,1,1,0,0,1),(212,1,1,1,0,0,1),(213,1,1,1,0,0,1),(214,1,1,1,0,0,1),(215,1,1,1,0,0,1),(216,1,1,1,0,0,1),(217,1,1,1,0,0,1),(218,1,1,1,0,0,1),(219,1,1,1,0,0,1),(220,1,1,1,0,0,1),(221,1,1,1,0,0,1),(222,1,1,1,0,0,1),(223,1,1,1,0,0,1),(224,1,1,1,0,0,1),(225,1,1,1,0,0,1),(226,1,1,1,0,0,1),(227,1,1,1,0,0,1),(228,1,1,1,0,0,1),(229,1,1,1,0,0,1),(230,1,1,1,0,0,1),(231,1,1,1,0,0,1),(232,1,1,1,0,0,1),(233,1,1,1,0,0,1),(234,1,1,1,0,0,1),(235,1,1,1,0,0,1),(236,1,1,1,0,0,1),(237,1,1,1,0,0,1),(238,1,1,1,0,0,1),(239,1,1,1,0,0,1),(240,1,1,1,0,0,1),(241,1,1,1,0,0,1),(242,1,1,1,0,0,1),(243,1,1,1,0,0,1),(244,1,1,1,0,0,1),(245,1,1,1,0,0,1),(246,1,1,1,0,0,1),(247,1,1,1,0,0,1),(248,1,1,1,0,0,1),(249,1,1,1,0,0,1),(250,1,1,1,0,0,1),(251,1,1,1,0,0,1),(252,1,1,1,0,0,1),(253,1,1,1,0,0,1),(254,1,1,1,0,0,1),(255,1,1,1,0,0,1),(256,1,1,1,0,0,1),(257,1,1,1,0,0,1),(258,1,1,1,0,0,1),(259,1,1,1,0,0,1),(260,1,1,1,0,0,1),(261,1,1,1,0,0,1),(262,1,1,1,0,0,1),(263,1,1,1,0,0,1),(264,1,1,1,0,0,1),(265,1,1,1,0,0,1),(266,1,1,1,0,0,1),(267,1,1,1,0,0,1),(268,1,1,1,0,0,1),(269,1,1,1,0,0,1),(270,1,1,1,0,0,1),(271,1,1,1,0,0,1),(272,2,2,1,0,0,1),(273,2,2,1,0,0,1),(274,2,2,1,0,0,1),(275,1,1,1,0,0,1),(276,1,1,1,0,0,1),(277,1,1,1,0,0,1),(278,1,1,1,0,0,1),(279,1,1,1,0,0,1),(280,1,1,1,0,0,1),(281,2,2,1,0,1,0),(282,2,2,1,0,0,1),(283,1,1,1,0,0,1),(284,1,1,1,0,0,1),(285,1,1,1,0,0,1),(286,1,1,1,0,0,1),(287,1,1,1,0,0,1),(288,1,1,1,0,0,1),(289,1,1,1,0,0,1),(290,2,2,1,0,0,1),(291,1,1,1,55.43,0,1),(294,2,2,7,0,0,1),(297,2,2,1,16,0,1),(300,1,1,1,55.43,0,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `location` varchar(250) NOT NULL,
  `tax_percentage` double NOT NULL,
  `service_fee_percentage` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `restaurant_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,`Cactus Club`,`Vancouver`,12,0);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tables_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,10),(2,13),(3,15),(4,0);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `preferences` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_uindex` (`email`),
  UNIQUE KEY `users_id_uindex` (`id`),
  UNIQUE KEY `users_username_uindex` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,`tawsifh`,`t@gmail.com`,`mango cucumber tuna`,`2020-10-24 14:46:32`),(2,`efe`,`e@gmail.com`,`ginger prawn ahi mango`,`2020-06-23 14:46:56`);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-02  7:46:02
