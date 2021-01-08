CREATE SEQUENCE items_seq;

CREATE TABLE items (
  id int NOT NULL DEFAULT NEXTVAL ('items_seq'),
  restaurant_id int NOT NULL,
  name varchar(250) NOT NULL,
  type varchar(250) NOT NULL,
  cost double precision NOT NULL,
  description varchar(1000) NOT NULL,
  calories double precision NOT NULL,
  popularity_count int NOT NULL,
  image varchar(1000) NOT NULL,
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE items_options_seq;

CREATE TABLE items_options (
  id int NOT NULL DEFAULT NEXTVAL ('items_options_seq'),
  items_id int NOT NULL,
  options_id int NOT NULL,
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE options_seq;

CREATE TABLE options (
  id int NOT NULL DEFAULT NEXTVAL ('options_seq'),
  name varchar(250) NOT NULL,
  cost double precision NOT NULL,
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE ordered_items_seq;

CREATE TABLE ordered_items (
  id int NOT NULL DEFAULT NEXTVAL ('ordered_items_seq'),
  orders_id int NOT NULL,
  items_id int NOT NULL,
  has_paid smallint NOT NULL DEFAULT '0',
  is_selected smallint NOT NULL DEFAULT '0',
  users_id int DEFAULT '-1',
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE orders_seq;

CREATE TABLE orders (
  id int NOT NULL DEFAULT NEXTVAL ('orders_seq'),
  tables_id int NOT NULL,
  users_id int NOT NULL,
  restaurant_id int NOT NULL,
  amount double precision NOT NULL,
  has_paid smallint NOT NULL DEFAULT '0',
  is_active_session smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE restaurant_seq;

CREATE TABLE restaurant (
  id int NOT NULL DEFAULT NEXTVAL ('restaurant_seq'),
  name varchar(250) NOT NULL,
  location varchar(250) NOT NULL,
  tax_percentage double precision NOT NULL,
  service_fee_percentage double precision NOT NULL,
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE tables_seq;

CREATE TABLE tables (
  id int NOT NULL DEFAULT NEXTVAL ('tables_seq'),
  table_number int NOT NULL,
  PRIMARY KEY (id)
)  ;

CREATE SEQUENCE users_seq;

CREATE TABLE users (
  id int NOT NULL DEFAULT NEXTVAL ('users_seq'),
  username varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  preferences varchar(250) DEFAULT NULL,
  google_id varchar(255) DEFAULT '',
  PRIMARY KEY (id)
)  ;


ALTER TABLE items ADD CONSTRAINT items_id_uindex UNIQUE  (id);
ALTER TABLE items ADD CONSTRAINT items_restaurant_id_fk FOREIGN KEY (restaurant_id) REFERENCES restaurant (id);

CREATE INDEX items_restaurant_id_fk ON items (restaurant_id);

ALTER TABLE items_options ADD CONSTRAINT items_options_items_id_fk FOREIGN KEY (items_id) REFERENCES items (id);
ALTER TABLE items_options ADD CONSTRAINT items_options_options_id_fk FOREIGN KEY (options_id) REFERENCES options (id);

CREATE INDEX items_options_items_id_fk ON items_options (items_id);
CREATE INDEX items_options_options_id_fk ON items_options (options_id);

ALTER TABLE options ADD CONSTRAINT options_id_uindex UNIQUE  (id);

ALTER TABLE ordered_items ADD CONSTRAINT ordered_items_id_uindex UNIQUE  (id);
ALTER TABLE ordered_items ADD CONSTRAINT ordered_items_orders_id_fk FOREIGN KEY (orders_id) REFERENCES orders (id);

CREATE INDEX ordered_items_orders_id_fk ON ordered_items (orders_id);

ALTER TABLE orders ADD CONSTRAINT orders_id_uindex UNIQUE  (id);
ALTER TABLE orders ADD CONSTRAINT orders_restaurant_id_fk FOREIGN KEY (restaurant_id) REFERENCES restaurant (id);
ALTER TABLE orders ADD CONSTRAINT orders_tables_id_fk FOREIGN KEY (tables_id) REFERENCES tables (id);
ALTER TABLE orders ADD CONSTRAINT orders_users_id_fk FOREIGN KEY (users_id) REFERENCES users (id);

CREATE INDEX orders_tables_id_fk ON orders (tables_id);
CREATE INDEX orders_users_id_fk ON orders (users_id);
CREATE INDEX orders_restaurant_id_fk ON orders (restaurant_id);

ALTER TABLE restaurant ADD CONSTRAINT restaurant_id_uindex UNIQUE  (id);

ALTER TABLE tables ADD CONSTRAINT tables_id_uindex UNIQUE  (id);

ALTER TABLE users ADD CONSTRAINT users_email_uindex UNIQUE (email);
ALTER TABLE users ADD CONSTRAINT users_id_uindex UNIQUE (id);
ALTER TABLE users ADD CONSTRAINT users_username_uindex UNIQUE  (username);

INSERT INTO items VALUES (1,1,'Spicy Ahi Roll','Sushi',16.5,'ocean wise ahi tuna, mango, avocado, asparagus, cucumber, sesame soy paper, wasabi mayo, cripy yam curls',500,3,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-spicy-ahi.jpg'),(2,1,'Prawn Crunch Roll','Sushi',16,'crispy prawn, mango, avocado, asparagus, cucumber, sesame soy paper, sriracha mayo, soy glaze',500,4,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-prawn-crunch.jpg'),(3,1,'Ceviche','Appetizers',18.5,'ocean wise lois lake steelhead, sustainably harvested prawns, avocado, chili, thai basil, mint, peruvian leche de tigre marinade',750,2,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-ceviche.jpg'),(4,1,'Mini crispy chicken sandwiches','Appetizers',16,'spicy panko-crusted chicken, swiss cheese, sambal mayo, lettuce, tomato, pickle, onion',1100,5,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-mini-crispy.jpg'),(5,1,'Modern bowl','Bowls',21.5,'tabbouleh, pineapple salsa, broccoli, tomatoes, cucumber, fresh greens, jasmine rice, miso carrot ginger sauce, chicken',450,3,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-modern-bowl.jpg'),(6,1,'Tuna poke bowl','Bowls',20.5,'sesame ginger ocean wise, ahi, jasmine rice, mango, cucumber, mango, cucumber, avocado, edamane, radish, crispy, tempura',800,4,'https://firebasestorage.googleapis.com/v0/b/modern-waiter-47e96.appspot.com/o/dummy-tuna-bowl.jpg'),(141,2,'testItem','sushi',12.5,'chicken chicken chicken spice mango cucumber',123,0,''),(142,2,'testItem','sushi',12.5,'chicken chicken chicken spice mango cucumber',123,0,'');
INSERT INTO restaurant VALUES (1,'Cactus Club','Vancouver',12,0),(2,'Best Restaurant','Calgary',12.2,1),(185,'Best Restaurant','Calgary',12,0),(186,'Best Restaurant','Calgary',12,0),(187,'Best Restaurant','Calgary',12,0),(188,'Best Restaurant','Calgary',12,0);
INSERT INTO tables VALUES (1,10),(2,13),(3,15),(4,0),(5,10),(39,15),(40,15);
INSERT INTO users VALUES (1,'tawsifh','t@gmail.com','mango cucumber tuna',''),(2,'efe','e@gmail.com','ginger prawn ahi ahi mango mango',''),(3,'TestUser','testy@email.com',NULL,''),(4,'TestUser2','testy2@email.com','Chicken',''),(5,'Modern Waiter','modernwaiterproject@gmail.com','','108656645518992985641'),(179,'Vincent S','vincent.sastra@gmail.com','','116875609987281252784'),(198,'Integration_test1606624543680','integration_test_user1606624543680@gmail.com','mango cucumber tuna spicy','dummy_google1606624543680'),(199,'Integration_test1606624543681','integration_test_user1606624543681@gmail.com',NULL,NULL),(201,'Integration_test1606624751015','integration_test_user1606624751015@gmail.com','mango cucumber tuna spicy','dummy_google1606624751015'),(202,'Integration_test1606624751017','integration_test_user1606624751017@gmail.com',NULL,NULL);
INSERT INTO orders VALUES (1,1,1,1,1644.62,0,0),(2,3,2,1,51.480000000000004,1,0),(1300,4,2,2,0,1,0),(1301,4,2,2,0,1,0),(1302,4,2,2,0,0,1),(1303,4,2,2,0,0,1),(1304,4,2,2,0,0,1),(1305,4,2,2,0,0,1),(1306,4,2,2,0,0,1),(1307,4,2,2,0,0,1),(1308,1,1,1,0,0,0),(1312,4,2,2,0,0,1),(1313,4,2,2,0,0,1),(1314,4,2,2,0,0,1),(1315,4,2,2,0,0,1),(1316,4,2,2,0,0,1),(1317,4,2,2,0,0,1),(1318,4,2,2,0,0,1),(1319,4,2,2,0,0,1),(1320,1,1,1,0,0,0),(1325,1,1,1,0,0,0),(1329,1,1,1,0,0,0),(1333,1,1,1,0,0,0),(1337,1,179,1,0,0,1),(1338,4,2,2,0,0,1),(1339,4,2,2,0,0,1),(1340,4,2,2,0,0,1),(1341,4,2,2,0,0,1),(1342,4,2,2,0,0,1),(1343,4,2,2,0,0,1),(1344,4,2,2,0,0,1),(1345,4,2,2,0,0,1),(1346,4,2,2,0,0,1),(1347,4,2,2,0,0,1),(1348,4,2,2,0,0,1),(1349,4,2,2,0,0,1),(1350,4,2,2,0,0,1),(1351,4,2,2,0,0,1),(1352,4,2,2,0,0,1),(1353,4,2,2,0,0,1),(1354,4,2,2,0,0,1),(1355,4,2,2,0,0,1),(1356,4,2,2,0,0,1),(1357,4,2,2,0,0,1),(1358,4,2,2,0,0,1),(1359,4,2,2,0,0,1),(1360,4,2,2,0,0,1),(1361,4,2,2,0,0,1),(1362,4,2,2,0,0,1),(1363,4,2,2,0,0,1),(1364,4,2,2,0,0,1),(1365,4,2,2,0,0,1),(1366,4,2,2,0,0,1),(1367,4,2,2,0,0,1),(1368,4,2,2,0,0,1),(1369,4,2,2,0,0,1),(1370,4,2,2,0,0,1),(1372,4,2,2,0,0,1),(1373,4,2,2,0,0,1),(1374,4,2,2,0,0,1),(1375,4,2,2,0,0,1),(1376,4,2,2,0,0,1),(1377,4,2,2,0,0,1),(1378,4,2,2,0,0,1),(1379,4,2,2,0,0,1),(1380,4,2,2,0,0,1),(1381,4,2,2,0,0,1),(1383,4,2,2,0,0,1),(1384,4,2,2,0,0,1),(1385,4,2,2,0,0,1),(1386,4,2,2,0,0,1),(1387,4,2,2,0,0,1),(1388,4,2,2,0,0,1),(1390,4,2,2,0,0,1),(1392,4,2,2,0,0,1),(1393,4,2,2,0,0,1),(1394,4,2,2,0,0,1),(1395,4,2,2,0,0,1),(1396,4,2,2,0,0,1),(1397,4,2,2,0,0,1),(1398,4,2,2,0,0,1),(1399,4,2,2,0,0,1),(1401,4,2,2,0,0,1),(1402,4,2,2,0,0,1),(1403,4,2,2,0,0,1),(1404,4,2,2,0,0,1),(1405,4,2,2,0,0,1),(1406,4,2,2,0,0,1),(1407,4,2,2,0,0,1);
INSERT INTO items_options VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,3),(6,3,1),(7,4,4),(8,4,5),(9,5,7),(10,6,1),(11,6,3),(12,6,6),(13,6,7);
INSERT INTO options VALUES (1,'avocado',1.5),(2,'wasabi mayo',1),(3,'mango',0),(4,'pickle',0),(5,'onion',0),(6,'radish',0),(7,'jasmine rice',2),(8,'',0);
INSERT INTO ordered_items VALUES (1,1,1,0,0,1),(2,1,2,1,0,-1),(3,1,3,1,0,-1),(4,2,1,1,1,-1),(5,2,1,0,0,-1),(6,2,1,0,0,-1),(7,1,3,1,0,-1),(8,1,3,1,0,-1),(9,1,3,1,0,-1),(10,1,3,1,0,-1),(11,1,3,1,0,-1),(12,1,3,1,0,-1),(13,1,3,1,0,-1),(14,1,3,1,0,-1),(15,1,3,1,0,-1),(16,1,3,1,0,-1),(17,1,3,1,0,-1),(18,1,5,1,0,-1),(19,1,5,1,0,-1),(20,1,5,1,0,-1),(21,1,3,1,0,-1),(22,1,3,1,0,-1),(23,1,3,1,0,-1),(24,1,4,1,0,-1),(25,1,4,1,0,-1),(26,1,4,1,0,-1),(27,1,2,1,0,-1),(28,1,2,1,0,-1),(29,1,2,1,0,-1),(30,1,6,1,0,-1),(31,1,6,1,0,-1),(32,1,4,1,0,-1),(33,1,4,1,0,-1),(34,1,4,1,0,-1),(35,1,3,1,0,-1),(36,1,3,1,0,-1),(37,1,3,1,0,-1),(38,1,3,1,0,-1),(39,1,2,1,0,-1),(40,1,2,1,0,-1),(41,1,2,1,0,-1),(42,1,2,1,0,-1),(43,1,2,1,0,-1),(44,1,2,1,0,-1),(45,1,2,1,0,-1),(46,1,2,1,0,-1),(47,1,2,1,0,-1),(48,1,2,1,0,-1),(49,1,3,1,0,-1),(50,1,3,1,0,-1),(51,1,3,1,0,-1),(52,1,3,1,0,-1),(53,1,3,1,0,-1),(54,1,3,1,0,-1),(55,1,3,1,0,-1),(56,1,3,1,0,-1),(57,1,3,1,0,-1),(58,1,1,0,0,-1),(59,1,1,0,0,-1),(60,1,1,1,0,-1),(61,1,2,1,0,-1),(62,1,2,1,0,-1),(63,1,1,1,0,-1),(64,1,1,1,0,-1),(65,1,1,1,0,-1),(66,1,3,1,0,-1),(67,1,3,1,0,-1),(68,1,3,1,0,-1),(69,1,2,1,0,-1),(70,1,1,1,0,-1),(71,1,2,1,0,-1),(72,1,1,1,0,-1),(73,1,2,1,0,-1),(74,1,2,1,0,-1),(75,1,2,1,0,-1),(76,1,3,1,0,-1),(77,1,3,1,0,-1),(78,1,1,1,0,-1),(79,1,3,1,0,-1),(80,1,3,1,0,-1),(81,1,3,1,0,-1),(82,1,3,1,0,-1),(83,1,3,1,0,-1),(84,1,2,1,0,-1),(85,1,2,1,0,-1),(86,1,2,1,0,-1),(87,1,1,1,0,-1),(88,1,1,1,0,-1),(89,1,1,1,0,-1),(90,1,3,1,0,-1),(91,1,3,1,0,-1),(2656,1337,3,0,1,179),(2657,1337,4,0,1,5),(2658,1337,4,0,0,-1),(2659,1300,1,0,1,2),(2660,1300,2,0,0,-1),(2661,1300,3,0,0,-1),(2662,1300,1,1,0,-1),(2663,1300,2,0,0,-1),(2664,1300,3,0,0,-1),(2665,1301,1,0,1,2),(2666,1301,2,0,0,-1),(2667,1301,3,0,0,-1),(2668,1301,1,1,0,-1),(2669,1301,2,0,0,-1),(2670,1301,3,0,0,-1),(2671,1301,1,0,0,-1),(2672,1301,2,0,0,-1),(2673,1301,3,0,0,-1),(2674,1301,1,0,0,-1),(2675,1301,2,0,0,-1),(2676,1301,3,0,0,-1),(2677,1301,1,0,0,-1),(2678,1301,2,0,0,-1),(2679,1301,3,0,0,-1),(2680,1301,1,0,0,-1),(2681,1301,2,0,0,-1),(2682,1301,3,0,0,-1),(2683,1302,1,0,0,-1),(2684,1302,2,0,0,-1),(2685,1302,3,0,0,-1),(2686,1302,1,0,0,-1),(2687,1302,2,0,0,-1),(2688,1302,3,0,0,-1),(2689,1302,1,0,0,-1),(2690,1302,2,0,0,-1),(2691,1302,3,0,0,-1),(2692,1302,1,0,0,-1),(2693,1302,2,0,0,-1),(2694,1302,3,0,0,-1);

