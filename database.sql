-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: onlineshop
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'José Mauro de Vasconcelos'),(2,'Paulo Coelho'),(3,'Niccolò Machiavelli'),(4,'Nguyên Hồng'),(5,'Nguyễn Nhật Ánh'),(6,'Thích Nhất Hạnh'),(7,'Nguyên Phong'),(8,'Lê Bảo Ngọc'),(9,'Minh Niệm'),(10,'John Gray'),(11,'albert rutherford'),(12,'Trương Tiếu Hằng'),(13,'Barry J. Nalebuff'),(14,'Avinash Dixit'),(15,'Dale Carnegie'),(16,'Darrell Mullis'),(17,'Judith Orloff'),(18,'Walter Isaacson'),(19,'Nhiều Tác Giả'),(20,'ThS Phan Hoàng Văn'),(21,'Song Hong Bing');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` bigint NOT NULL AUTO_INCREMENT,
  `copies` int NOT NULL,
  `copies_available` int NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `description` longtext,
  `image_url` varchar(255) DEFAULT NULL,
  `page` int NOT NULL,
  `price` double DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `language_id` bigint NOT NULL,
  `publisher_id` bigint NOT NULL,
  PRIMARY KEY (`book_id`),
  KEY `FKmrhfp9wfi5dy4bwl87bx8ivua` (`language_id`),
  KEY `FKgtvt7p649s4x80y6f4842pnfq` (`publisher_id`),
  CONSTRAINT `FKgtvt7p649s4x80y6f4842pnfq` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`publisher_id`),
  CONSTRAINT `FKmrhfp9wfi5dy4bwl87bx8ivua` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,23,17,'2024-01-03 13:42:55.000000','Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, \ncho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu. Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, \nCây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm \ntrắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704264065/image_217480.jpg.jpg',244,2000,'Cây Cam Ngọt Của Tôi',1,1),(2,28,28,'2024-01-03 13:53:05.000000','Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. \nTiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704264606/NhaGiaKim.jpg.jpg',227,2000,'Nhà Giả Kim (Tái Bản 2020)',1,1),(3,18,18,'2024-01-03 13:59:54.000000','Quả thật, hiếm có cuốn sách nào thực sự “vượt thời gian” như Quân vương, cuốn sách nhỏ khiêm nhường song vô giá của Niccolo Machiavelli. \nKể cả ngày nay, và kể cả dù bản thân ta không phải một quân vương hay nhà cai trị, ta vẫn có thể rút ra từ cuốn sách này những lời khuyên \nđầy minh triết về thuật đối nhân xử thế, có thể dựa vào cuốn sách này để hiểu hơn về động cơ ẩn sau những động thái của các chính trị gia hiện đại \n- tức là, dẫu ta chỉ là một thường dân “hèn mọn”, ta vẫn có tầm nhìn thấu suốt của một đấng quân vương.','https://res.cloudinary.com/dboo9wwlk/image/upload/v1704273729/image_181756_xtfhnr.jpg',215,1000,'Quân Vương (Tái Bản 2018)',1,2),(4,35,31,'2024-01-03 14:08:11.000000','Những ngày thơ ấu có thể coi là một tác phẩm xuất sắc. Đây là tập hồi ký về tuổi thơ ghi lại những “rung động cực điểm của một linh hồn trẻ dại”.\nCuốn sách bao gồm những phần chính sau:\n- Tiếng kèn\n- Chúa thương xót chúng con\n- Truỵ lạc\n- Trong lòng mẹ\n- Đêm noel','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704265672/image_182317.jpg.jpg',120,1000,'Những Ngày Thơ Ấu (Tái Bản 2019)',1,3),(5,47,47,'2024-01-03 14:14:31.000000','Ta bắt gặp trong Tôi Thấy Hoa Vàng Trên Cỏ Xanh một thế giới đấy bất ngờ và thi vị non trẻ với những suy ngẫm giản dị thôi nhưng gần gũi đến lạ. Câu chuyện của Tôi Thấy Hoa Vàng Trên Cỏ Xanh có chút này chút kia, để ai soi vào cũng thấy mình trong đó, kiểu như lá \nthư tình đầu đời của cu Thiều chẳng hạ ngây ngô và khờ khạo.\nNhưng Tôi Thấy Hoa Vàng Trên Cỏ Xanh hình như không còn trong trẻo, thuần khiết trọn vẹn của một thế giới tuổi thơ nữa. Cuốn sách nhỏ nhắn vẫn hồn hậu, dí dỏm, \nngọt ngào nhưng lại phảng phất nỗi buồn, về một người cha bệnh tật trốn nhà vì không muốn làm khổ vợ con, về một người cha khác giả làm vua bởi đứa con tâm thầm của ông luôn nghĩ mình là công chúa, Những bài học về luân lý, \nvề tình người trở đi trở lại trong day dứt và tiếc nuối.\nTôi Thấy Hoa Vàng Trên Cỏ Xanh lắng đọng nhẹ nhàng trong tâm tưởng để rồi ai đã lỡ đọc rồi mà muốn quên đi thì thật khó.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704266053/nna-hvtcx.jpg.jpg',378,1000,'Tôi Thấy Hoa Vàng Trên Cỏ Xanh (Tái Bản 2023)',1,4),(6,52,52,'2024-01-03 14:22:33.000000','Nhiều người trong chúng ta tin rằng cuộc đời của ta bắt đầu từ lúc chào đời và kết thúc khi ta chết. Chúng ta tin rằng chúng ta tới từ cái Không, nên khi chết chúng ta cũng không còn lại gì hết. Và chúng ta lo lắng vì sẽ trở thành hư vô.\nBụt có cái hiểu rất khác về cuộc đời. Ngài hiểu rằng sống và chết chỉ là những ý niệm không có thực. Coi đó là sự thực, chính là nguyên do gây cho chúng ta khổ não. Bụt dạy không có sinh, không có diệt, không tới cũng không đi, không giống nhau cũng không khác nhau, không có cái ngã thường hằng cũng không có hư vô. Chúng ta thì coi là Có hết mọi thứ. Khi chúng ta hiểu rằng mình không bị hủy diệt thì chúng ta không còn lo sợ. Đó là sự giải thoát. Chúng ta có thể an hưởng và thưởng thức đời sống một cách mới mẻ\nKhông diệt Không sinh Đừng sợ hãi là tựa sách được Thiền sư Thích Nhất Hạnh viết nên dựa trên kinh nghiệm của chính mình. Ở đó, Thầy Nhất Hạnh đã đưa ra một thay thế đáng ngạc nhiên cho hai triết\n lý trái ngược nhau về vĩnh cửu và hư không: “Tự muôn đời tôi vẫn tự do. Tử sinh chỉ là cửa ngõ ra vào, tử sinh là trò chơi cút bắt. Tôi chưa bao giờ từng sinh cũng chưa bao giờ từng diệt” và “Nỗi khổ lớn nhất của chúng ta\n là ý niệm về đến-đi, lui-tới.”','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704266530/8935278607311.jpg.jpg',224,1000,'Không Diệt Không Sinh Đừng Sợ Hãi (Tái Bản 2022)',1,5),(7,75,75,'2024-01-03 14:31:09.000000','“Muôn kiếp nhân sinh” là tác phẩm do Giáo sư John Vũ - Nguyên Phong viết từ năm 2017 và hoàn tất đầu năm 2020 ghi lại những câu chuyện, trải nghiệm tiền kiếp kỳ lạ từ nhiều kiếp sống của người bạn tâm giao lâu năm, ông Thomas – một nhà kinh doanh tài chính nổi tiếng ở New York. Những câu chuyện chưa từng tiết lộ này sẽ giúp mọi người trên thế giới chiêm nghiệm, khám phá các quy luật về luật Nhân quả và Luân hồi của vũ trụ giữa lúc trái đất đang gặp nhiều tai ương, biến động, khủng hoảng từng ngày.\n“Muôn kiếp nhân sinh” là một bức tranh lớn với vô vàn mảnh ghép cuộc đời, là một cuốn phim đồ sộ, sống động về những kiếp sống huyền bí, trải dài từ nền văn minh Atlantis hùng mạnh đến vương quốc Ai Cập cổ đại của các Pharaoh quyền uy, đến Hợp Chủng Quốc Hoa Kỳ ngày nay.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704266929/muonkiepnhansinh_1.jpg.jpg',481,3000,'Sách Muôn Kiếp Nhân Sinh (Bìa Mềm) - Nguyên Phong',1,6),(8,62,62,'2024-01-03 14:43:28.000000','SÓI VÀ CỪU - BẠN KHÔNG TỐT NHƯ BẠN NGHĨ ĐÂU!\nLàn ranh của việc ngây thơ hay xấu xa đôi khi mỏng manh hơn bạn nghĩ.\nBạn làm một việc mà mình cho là đúng, kết quả lại bị mọi người khiển trách.\nBạn ủng hộ một quan điểm của ai đó, và số đông khác lại ủng hộ một quan điểm trái chiều.\nRốt cuộc thì bạn sai hay họ sai?\nCuốn sách “Không phải sói nhưng cũng đừng là cừu” đến từ tác giả Lê Bảo Ngọc sẽ giúp bạn hiểu rõ hơn những khía cạnh sắc sảo phía sau những nhận định đúng, sai đơn thuần của mỗi người.\n\nNhững câu hỏi đầy tính tranh cãi như “Cứu người hay cứu chó?”, “Một kẻ thô lỗ trong lớp vỏ “thẳng tính” khác với người EQ thấp như thế nào?”, “Vì sao một bộ phận nữ giới lại victim blaming đối với nạn nhân bị xâm hại?”, được tác giả đưa ra trong “Không phải sói nhưng cũng đừng là cừu”. Bằng từng chương sách của mình, tác giả vạch rõ cho bạn rằng “thật sự thế nào mới là người tốt”, ngây thơ và xấu xa có ranh giới rõ ràng như thế không,\n rốt cuộc bạn có là người tốt như mình vẫn luôn nghĩ?','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704267692/_khong-phai-soi-nhung-cung-dung-la-cuu.jpg.jpg',296,4000,'Không Phải Sói Nhưng Cũng Đừng Là Cừu',1,5),(9,57,57,'2024-01-03 14:56:22.000000','Hiểu Về Trái Tim – Cuốn Sách Mở Cửa Thề Giới Cảm Xúc Của Mỗi Người\nXuất bản lần đầu tiên vào năm 2011, Hiểu Về Trái Tim trình làng cũng lúc với kỷ lục: cuốn sách có số lượng in lần đầu lớn\n nhất: 100.000 bản. Trung tâm sách kỷ lục Việt Nam công nhận kỳ tích ấy nhưng đến nay, con số phát hành của Hiểu về trái tim vẫn chưa có dấu hiệu chậm lại.\nLà tác phẩm đầu tay của nhà sư Minh Niệm, người sáng lập dòng \n thiền hiểu biết (Understanding Meditation), kết hợp giữa tư tưởng Phật giáo Đại thừa và Thiền nguyên thủy Vipassana, nhưng Hiểu Về Trái Tim không phải tác phẩm thuyết giáo về Phật pháp. Cuốn sách rất “đời” với những ưu \n tư của một người tu nhìn về cõi thế. Ở đó, có hạnh phúc, có đau khổ, có tình yêu, có cô đơn, có tuyệt vọng, có lười biếng, có yếu đuối, có buông xả… Nhưng, tất cả những hỉ nộ ái ố ấy đều được khoác lên tấm áo mới, một\n tấm áo tinh khiết và xuyên suốt, khiến người đọc khi nhìn vào, đều thấy mọi sự như nhẹ nhàng hơn…','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704268479/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg.jpg',479,2000,'Hiểu Về Trái Tim (Tái Bản 2023)',1,6),(10,84,84,'2024-01-03 15:03:59.000000','Cuốn sách này thực sự đã giúp đỡ cho hàng triệu độc giả, trong đó có tôi và chắc chắn cũng sẽ có bạn. Nếu không có những ý niệm mới mẻ này\n thì chưa chắc tôi đã có được cuộc hôn nhân hạnh phúc như hiện nay hay có thể trở thành một người cha giàu đức hy sinh đối với các con của mình như vậy. Những vướng mắc trong mối quan hệ với vợ cách đây hai mươi năm đã \n từng làm tôi tức điên lên, hiện giờ thi thoảng nó vẫn thường xảy ra. Nhưng điều khác biệt là tôi đã biết khoan dung hơn, chấp nhận và thấu hiểu hơn. Tôi có thể hiểu những lời lẽ và phản ứng của vợ tôi theo cách khách \n quan hơn, đồng thời tôi biết cách nên đáp lại như thế nào. Có thể tôi là một chuyên gia trong lĩnh vực giao tiếp và sự khác biệt về giới tính, tuy nhiên, đối với Bonnie và các cô con gái của tôi thì việc để hiều được \n họ vẫn còn là những bí ẩn. Dù vậy, cuốn sách này có thể giúp chúng ta trở nên khoan dung và biết tha thứ khi ai đó không đáp lại theo cách mà ta mong đợi. May mắn thay, để xây dựng những mối quan hệ bền đẹp, tính hoàn\n hảo không phải là điều kiện bắt buộc.\n\nVới những áp lực công việc ngày càng gia tăng, cùng với những đòi hỏi nhiều hơn về sự lãng mạn trong gia đình, ngày nay những mối quan hệ dường như đang thách thức hầu hết mọi\n người. Hiểu được người bạn đời của mình tới từ đâu sẽ giúp mối quan hệ của bạn trở nên nhẹ nhàng hơn. Bao dung với những điều khác biệt giữa hai người không có nghĩa là chấp nhận một cách thụ động mối quan hệ đầy vấn \n đề hoặc thiếu cảm xúc đam mê. Thay vào đó, sự thích nghi lành mạnh này dựa trên nền tảng thấu hiểu thực sự, điều đó sẽ giúp chúng ta cảm thông với người bạn đời hơn, đối đáp với họ bằng nhiều tình yêu hơn và truyền cảm\n hứng tốt nhất đến với họ. Bạn không thể và cũng không nên cố thay đổi người bạn đời của mình. Thay đổi là việc của họ, còn việc của bạn là thay đổi cách giao tiếp, phản ứng và đối đáp với người bạn đời của mình. Bằng sự \n thấu hiểu mới mẻ này, bạn sẽ có thêm sức mạnh và sự thông thái để điều chỉnh cách tiếp cận của mình. Từ việc giao tiếp tốt hơn, bạn sẽ biết cách trợ giúp hiệu quả hơn, đồng thời bạn sẽ thành công hơn khi nhận được sự trợ\n giúp mà bạn muốn.\n\nCó nhiều người áp dụng sai những khái niệm trong cuốn sách này. Họ dùng ví dụ và giải thích này của tôi để bào chữa cho việc không chịu thay đổi những khía cạnh quan trọng giúp mối quan hệ trở nên tốt\n đẹp hơn. Chẳng hạn, tôi chỉ ra rằng đàn ông cần chui vào chiếc kén của mình thường xuyên để thư giãn mỗi ngày. Tuy nhiên điều này không thể trở thành lý do biện minh cho việc ở lì trong đó cả ngày. Mặt khác, tôi cũng chỉ \n ra rằng phụ nữ nói chung thường có nhu cầu chia sẻ cảm xúc nhiều hơn đàn ông, như là một cách để đương đầu với sự căng thẳng của mình. Điều này không có nghĩa là họ có thể nói không ngừng hoặc mong chờ đàn ông phải dừng \n việc của họ lại để lắng nghe bất kỳ điều gì cô ấy nói hay bất cứ khi nào cô ấy muốn. Thật không may là nhiều khi những ý niệm tốt cũng có thể bị áp dụng sai. Nhưng nếu bạn đang tìm cách dùng những ý niệm này để hiểu thêm\n về người bạn đời của mình, để tôn trọng người khác theo cách mà họ cho là quan trọng, cũng như để người khác hiểu được những nhu cầu của mình thì cuốn sách này có thể giúp ích cho bạn.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704268997/image_183259.jpg.jpg',488,4000,'Đàn Ông Sao Hỏa Đàn Bà Sao Kim',1,7),(11,60,60,'2024-01-03 15:12:49.000000','Như bạn có thể thấy, chìa khóa để trở thành một người có \n tư duy phản biện tốt chính là sự tự nhận thức. Bạn cần phải đánh giá trung thực những điều trước đây bạn nghĩ là đúng, cũng như quá trình suy nghĩ đã dẫn bạn tới những kết luận đó. Nếu bạn không có những lý lẽ hợp lý, \n hoặc nếu suy nghĩ của bạn bị ảnh hưởng bởi những kinh nghiệm và cảm xúc, thì lúc đó hãy cân nhắc sử dụng tư duy phản biện! Bạn cần phải nhận ra được rằng con người, kể từ khi sinh ra, rất giỏi việc đưa ra những lý do \n lý giải cho những suy nghĩ khiếm khuyết của mình. Nếu bạn đang có những kết luận sai lệch này thì có một sự thật là những đức tin của bạn thường mâu thuẫn với nhau và đó thường là kết quả của thiên kiến xác nhận, nhưng\n nếu bạn biết điều này, thì bạn đã tiến gần hơn tới sự thật rồi!\nNhững người tư duy phản biện cũng biết rằng họ cần thu thập những ý tưởng và đức tin của mọi người. Tư duy phản biện không thể tự nhiên mà có.\nNhững người\n khác có thể đưa ra những góc nhìn khác mà bạn có thể chưa bao giờ nghĩ tới, và họ có thể chỉ ra những lỗ hổng trong logic của bạn mà bạn đã hoàn toàn bỏ qua. Bạn không cần phải hoàn toàn đồng ý với ý kiến của những người\n khác, bởi vì điều này cũng có thể dẫn tới những vấn đề liên quan đến thiên kiến, nhưng một cuộc thảo luận phản biện là một bài tập tư duy cực kỳ hiệu quả.\nViệc lắng nghe những ý kiến của người khác cũng có thể giúp bạn \n nhận ra rằng phạm vi tri thức của bạn không phải là vô hạn. Không ai có thể biết hết tất cả mọi thứ. Nhưng với việc chia sẻ và đánh giá phê bình kiến thức, chúng ta có thể mở rộng tâm trí. Nếu điều này khiến bạn cảm thấy\n không thoải mái, không sao cả. Trên thực tế, bước ra ngoài vùng an toàn là một điều quan trọng để mở rộng niềm tin và suy nghĩ của bạn. Tư duy phản biện không phải là chỉ biết vài thứ, và chắc chắn không phải việc xác nhận\n những điều bạn đã biết. Thay vào đó, nó xoay quanh việc tìm kiếm sự thật – và biến chúng trở thành thứ bạn biết.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704269520/image_195509_1_18448.jpg.jpg',204,4000,'Rèn Luyện Tư Duy Phản Biện',1,8),(12,33,33,'2024-01-03 15:18:22.000000','Nội dung quyển sách này xoay quanh hai vấn đề đó là “biết cách nói chuyện” và “biết giữ miệng”, thông qua 12 chương sách nói rõ cách nói chuyện với những\n người khác nhau, cách nói chuyện trong những trường hợp khác nhau, làm thế nào để nắm vững những kỹ năng và chừng mực để nói chuyện cho khôn khéo, những người không giỏi ăn nói làm cách nào mới có thể nói được\n những lời thích hợp với đúng người và đúng thời điểm, để có thể ứng phó với những trường hợp khác nhau trong giao tiếp.\n\nNgười biết nói chuyện, ẩn sau con người họ là lòng tốt đã khắc sâu vào xương tủy, là sự\n tôn trọng đến từ việc đặt mình vào vị trí của người khác, là trí tuệ sâu sắc, độc đáo và lòng kiên nhẫn không ngại phiền hà. Họ chưa hẳn là những người giỏi ăn nói, nhưng mỗi khi nói đều làm người khác như được \n tắm trong gió xuân, vừa mở miệng là đã toát lên khí chất hơn người. \n\nNgười biết giữ miệng, bất kể trong trường hợp nào, họ đều có thể lập tức nhìn thấu cảm xúc của người khác, quan tâm đến cảm giác của đối phương,\n nói năng có chừng mực, làm gì cũng chừa lại đường lui cho mình và người khác. Vừa mở miệng là có thể làm yên lòng người khác, tự nhiên đi tới đâu cũng sẽ được chào đón.\nBiết giữ im lặng thì cuộc sống sẽ dễ chịu hơn, \n học cách giữ miệng thì cuộc đời này sẽ không còn điều gì phải hối hận. Điều không nên nói thì không nói, điều không nên hỏi thì không hỏi, hiểu ý mà không vạch trần, nhìn thấu mà không nói ra, đó là bậc đại trí.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704269796/im-lang-la-tri-tue.jpg.jpg',450,3000,'Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ (Tái bản 2022)',1,9),(13,23,23,'2024-01-03 15:32:14.000000','Có phải những người chiến thắng các chương trình truyền hình thực tế được trời phú cho trí thông minh và kỹ năng hơn người?\nCó phải các nhà đầu tư vĩ đại có thể nhìn thấy những điều mà hầu hết mọi người bỏ lỡ?\nCó phải\n các tay chơi poker sở hữu những tài năng mà chúng ta không có?\nCâu trả lời cho tất cả những câu hỏi trên là \"Không hề!\" Họ hoàn toàn \"bình thường\", như bạn, như tôi hay bất cứ ai ngoài kia.\nThông qua Nghệ thuật tư \n duy chiến lược, bạn sẽ thấy \"những người thành công\" trong mọi lĩnh vực từ giải trí đến chính trị, từ giáo dục đến thể thao, đạt thành công vang dội là nhờ luôn nắm vững lý thuyết trò chơi hay nghệ thuật tư duy chiến \n lược, với khả năng dự đoán những động thái tiếp theo của người cùng chơi, trong khi biết rõ rằng đối thủ đang cố gắng làm điều tương tự với mình.\nNgoài ra, bạn cũng sẽ nắm được những bí kíp vô cùng giản đơn để có thể áp\n dụng lý thuyết trò chơi vào cuộc sống lẫn công việc, từ đó sở hữu một cuộc đời đáng sống.\nGiá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà\n có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704270715/nghe-thuat-tu-duy-chien-luoc.jpg.jpg',560,5000,'Nghệ Thuật Tư Duy Chiến Lược',1,10),(14,41,41,'2024-01-03 15:39:27.000000','Đắc Nhân Tâm là nghệ thuật thu phục lòng người, là làm cho tất cả mọi người yêu mến mình. “Đắc Nhân Tâm” cần được cảm nhận bằng sự hiểu rõ bản \n thân, thành thật với chính mình, hiểu biết và quan tâm đến những người xung quanh để nhìn ra, khơi gợi những tiềm năng ẩn khuất nơi họ và giúp họ phát triển lên một tầm cao mớ Dưới ngòi bút của dịch giả Nguyễn Hiến Lê, bản\n dịch truyền tải đúng linh hồn của bản gốc nhưng vẫn thân thuộc, gần gũi với bao nhiêu thế hệ và giúp hàng triệu người Việt Nam thành công. Với phiên bản mới nhất này có sửa chữa và thêm 2 chương mới phù hợp với\n nhu cầu thực tiễn hiện nay đồng thời thêm cả phụ lục của dịch giả Nguyễn Hiến Lê chép một số cố sự của phương Đông dẫn chứng minh họa cho cuốn sách được đầy đủ và hoàn hảo nhất. Vì thế đây chính là cuốn sách mà \n mọi thế hệ người Việt Nam đều cần có, xứng đáng đứng top Bestseller.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704271008/new_doc_2018-08-21_14.43.16_10.jpg.jpg',450,2000,'Đắc Nhân Tâm - Bí Quyết Để Thành Công',1,7),(15,16,16,'2024-01-03 15:50:42.000000','Đã bao lần bạn cầm trên tay bảng báo cáo tài chính doanh nghiệp của mình, nhưng chẳng thể nào hiểu nổi? \nKế toán và tài chính là nỗi đau chung của rất nhiều doanh nghiệp nhỏ. Ngôn ngữ tài\n chính dường như là điều bí ẩn nhất của thế giới. Vô số tính toán và ý đồ được cài cắm sau các con số, mà thậm chí người kinh doanh nhiều năm cũng không thể nào bóc tách nổi.\nNếu bạn vẫn cảm thấy mù mờ với bảng báo cáo \n tài chính của mình thì thật là đáng tiếc. Tài chính được xem như là ngôn ngữ của kinh doanh. Bảng kế toán sẽ cho bạn biết được doanh nghiệp của mình lời hay lỗ, trả lời câu hỏi vì sao trông bạn có vẻ đang ăn nên làm ra,\n nhưng két sắt công ty không có lấy một đồng.','https://res.cloudinary.com/dboo9wwlk/image/upload/v1705716585/ketoanvia_iunjxa.jpg',268,3000,'Kế Toán Vỉa Hè - Thực Hành Báo Cáo Tài Chính Căn Bản Từ Quầy Bán Nước Chanh',1,5),(16,12,12,'2024-01-03 15:56:50.000000','Tiểu sử Elon Musk là cuộc khám phá về cuộc sống và công việc của một biểu tượng thời hiện đại, mang đến những hiểu biết sâu sắc về tâm trí của một người có tầm nhìn được thúc đẩy bởi sự \n theo đuổi không ngừng đổi mới và tiến bộ. Đây là một cuốn sách hấp dẫn dành cho những ai quan tâm đến sự giao thoa giữa công nghệ, tinh thần kinh doanh và tâm lý con người.\nTiểu sử Elon Musk của Walter Isaacson đi sâu\n vào cuộc đời và tính cách của một trong những nhà đổi mới hấp dẫn và gây tranh cãi nhất trong thời đại chúng ta, Elon Musk. Cuốn tiểu sử đưa người đọc vào một hành trình gần gũi xuyên suốt cuộc đời đầy biến động của Musk,\n khám phá những trải nghiệm thời thơ ấu của anh ở Nam Phi, mối quan hệ phức tạp của anh với cha mình và quá trình phát triển thành một doanh nhân có tầm nhìn xa trông rộng, được biết đến với việc dẫn đầu các dự án đột phá \n trong lĩnh vực xe điện, thám hiểm không gian và trí tuệ nhân tạo cũng như những mục tiêu đầy tham vọng của ông đối với nhân loại.\nIsaacson đã vẽ nên một bức tranh sống động về Musk như một \"đứa trẻ\" được hình thành từ \n những vết sẹo cả về thể xác lẫn tinh thần trong quá khứ, bao gồm cả việc bị bắt nạt khi còn nhỏ. Tính cách của Musk được đặc trưng bởi tính khí thất thường, khả năng chấp nhận rủi ro cao và quyết tâm kiên cường theo đuổi\n những sứ mệnh lớn lao.\nCuốn tiểu sử này cung cấp cái nhìn hậu trường về các hoạt động kinh doanh của Musk, bao gồm SpaceX, Tesla và việc anh tiếp quản Twitter, làm sáng tỏ phong cách lãnh đạo, nỗi ám ảnh về chi tiết và \n việc không ngừng theo đuổi các mục tiêu của mình.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704272042/elonmusk_2_2.jpg.jpg',756,7000,'Tiểu Sử Elon Musk',1,11),(17,27,27,'2024-01-03 16:02:43.000000','Cuốn sách Tiếng Anh 7\n Tập 1 - Sách Bài Tập giúp học sinh cũng cố khả năng phát âm, cách nhận biết các âm phát âm khác nhau và các âm khác nhau .\nNgoài ra cuốn sách còn cũng cố những từ ngữ và cấu trúc ngữ pháp và mở rộng vôn từ vựng thông qua \n các dạng bài tập khác nhau. Các khả năng nghe, đọc, viết , nói được đặc biệt chú ý trong cuốn sách này.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704272540/image_195509_1_43111_1.jpg.jpg',70,1000,'Tiếng Anh 7 - Tập 1',2,12),(18,72,72,'2024-01-03 16:08:19.000000','Là tài liệu tham khảo cần thiết cho những học sinh muốn tìm hiểu kĩ về môn khoa học thú vị này. Đây là tài liệu dùng để ôn tập, chuẩn bị cho các kì thi học\n sinh giỏi, tuyển sinh vào các trường chuyên.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704272885/8935083581509.jpg.jpg',221,1000,'500 Bài Tập Vật Lí Trung Học Cơ Sở',1,13),(19,12,12,'2024-01-03 16:12:58.000000','Destination B1\n - Grammar And Vocabulary with Answer Key\nBộ sách cung cấp từ vựng và ngữ pháp tiếng Anh cần thiết nhất dành cho người học đang có ý định thi các kỳ thi ở Level B1, B2, C1, C2 theo Khung tham chiếu châu Âu và mong\n muốn cải thiện năng lực tiếng Anh của bản thân.','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704273018/b1-1_1_5.jpg.jpg',248,5000,'Destination B1 - Grammar And Vocabulary with Answer Key',2,7),(20,12,12,'2024-01-03 16:17:55.000000','Chiến Tranh Tiền Tệ - Phần 1 - Ai Thực Sự Là Người Giàu Nhất Thế Giới? (Tái bản 2022)\nGiá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, \n hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu \n (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....','http://res.cloudinary.com/dboo9wwlk/image/upload/v1704273393/bia-truoc-chien-tranh-tien-te-phan-1-1.jpg.jpg',532,3000,'Chiến Tranh Tiền Tệ - Phần 1 - Ai Thực Sự Là Người Giàu Nhất Thế Giới? (Tái bản 2022)',1,10),(21,3,3,'2024-01-14 00:29:54.000000','Truyện Nôm Lục Vân Tiên (ra đời khoảng năm 1854 lúc Nguyễn Đình Chiểu 32 tuổi , bản Nôm khắc \n in sớm nhất hiện ghi nhận được là do Quảng Thạnh Nam phát thụ, Duy Minh Thị đính chính, Tôn Thọ Tường trông nom, in ở Quảng Đông 1865), ','https://res.cloudinary.com/dboo9wwlk/image/upload/v1705716794/luc_van_tien_ccjs0d.jpg',352,1000,'Lục Vân Tiên Và Những Luận Đề Về Nguyễn Đình Chiểu',1,8);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_author`
--

DROP TABLE IF EXISTS `book_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_author` (
  `book_id` bigint NOT NULL,
  `author_id` bigint NOT NULL,
  KEY `FKbjqhp85wjv8vpr0beygh6jsgo` (`author_id`),
  KEY `FKhwgu59n9o80xv75plf9ggj7xn` (`book_id`),
  CONSTRAINT `FKbjqhp85wjv8vpr0beygh6jsgo` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`),
  CONSTRAINT `FKhwgu59n9o80xv75plf9ggj7xn` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_author`
--

LOCK TABLES `book_author` WRITE;
/*!40000 ALTER TABLE `book_author` DISABLE KEYS */;
INSERT INTO `book_author` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(13,14),(14,15),(15,16),(15,17),(16,18),(17,19),(18,20),(19,19),(20,21),(21,12);
/*!40000 ALTER TABLE `book_author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_category`
--

DROP TABLE IF EXISTS `book_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_category` (
  `book_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  KEY `FKam8llderp40mvbbwceqpu6l2s` (`category_id`),
  KEY `FKnyegcbpvce2mnmg26h0i856fd` (`book_id`),
  CONSTRAINT `FKam8llderp40mvbbwceqpu6l2s` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKnyegcbpvce2mnmg26h0i856fd` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_category`
--

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;
INSERT INTO `book_category` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,2),(7,2),(8,2),(9,3),(9,4),(9,5),(10,4),(11,3),(12,3),(12,4),(13,6),(13,10),(14,3),(14,4),(14,5),(15,8),(15,9),(16,11),(17,14),(18,15),(19,15),(20,8),(20,9),(21,2);
/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `cart_item_id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `book_id` bigint DEFAULT NULL,
  `cart_id` bigint NOT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `UK_cu3hobdvb4ve6i1p6jxxevdcb` (`book_id`),
  KEY `FKlqwuo55w1gm4779xcu3t4wnrd` (`cart_id`),
  KEY `FK1tscnty9f6ot5k83g0kljp9ww` (`customer_id`),
  CONSTRAINT `FK1tscnty9f6ot5k83g0kljp9ww` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKis5hg85qbs5d91etr4mvd4tx6` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `FKlqwuo55w1gm4779xcu3t4wnrd` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (1,NULL,6000,3,1,1,2),(2,NULL,2000,2,4,1,2);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `is_ordered` bit(1) NOT NULL,
  `total_item` int DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `FKf7w5m83c8c7s23qsojo6fg45d` (`customer_id`),
  CONSTRAINT `FKf7w5m83c8c7s23qsojo6fg45d` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,_binary '',5,8000,2);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'TIỂU THUYẾT 1'),(2,'TÔN GIÁO'),(3,'Kỹ Năng Sống'),(4,'Tâm Lý'),(5,'Rèn Luyện Nhân Cách'),(6,'Quản Trị - Lãnh Đạo'),(7,'Khởi Nghiệp - Làm Giàu'),(8,'Phân Tích Kinh Tế'),(9,'Tài Chính'),(10,'Nhân Sự - Việc Làm'),(11,'Câu Chuyện Cuộc Đời'),(12,'Lịch Sử'),(13,'Chính Trị'),(14,'Sách Giáo Khoa'),(15,'Sách Tham Khảo'),(16,'manga'),(17,'comic'),(18,'truyện ngắn-tản văn');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `favortite_id` bigint NOT NULL AUTO_INCREMENT,
  `is_favorite` bit(1) NOT NULL,
  `book_id` bigint NOT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`favortite_id`),
  KEY `FK3c9qhul48t7s6uc34fl7avfp8` (`book_id`),
  KEY `FK701fb18km01shitve2yrelh68` (`customer_id`),
  CONSTRAINT `FK3c9qhul48t7s6uc34fl7avfp8` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `FK701fb18km01shitve2yrelh68` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (2,_binary '\0',2,4),(3,_binary '\0',3,4),(6,_binary '\0',1,4),(7,_binary '',1,5);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `language_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'Vietnamese'),(2,'English');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `is_payed` bit(1) NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `book_id` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `employee_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  UNIQUE KEY `UK_f67xlaxtwr6wwab7u7mxndi5s` (`book_id`),
  KEY `FKkbgaappyp4pvxj9yqpf91c3n7` (`customer_id`),
  KEY `FK87oi78dip7g6hd2qmor1pq6ol` (`employee_id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  CONSTRAINT `FK87oi78dip7g6hd2qmor1pq6ol` FOREIGN KEY (`employee_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKb033an1f8qmpbnfl0a6jb5njs` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `FKkbgaappyp4pvxj9yqpf91c3n7` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,_binary '',6000,3,1,2,3,1),(2,_binary '',2000,2,4,2,3,1);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `code_order` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `order_status` bit(1) NOT NULL,
  `total_item` int NOT NULL,
  `total_price` double NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `employee_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK14n2jkmoyhpimhracvcdy7sst` (`customer_id`),
  KEY `FKev7hi98cbb5xnvj8k2yj7tjly` (`employee_id`),
  CONSTRAINT `FK14n2jkmoyhpimhracvcdy7sst` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKev7hi98cbb5xnvj8k2yj7tjly` FOREIGN KEY (`employee_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'K6UlcA79aoN9','2024-06-07 13:18:06.945047',_binary '',5,8000,2,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `publisher_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'NXB Hội Nhà Văn'),(2,'NXB Tri thức'),(3,'NXB Văn Học'),(4,'NXB Trẻ'),(5,'Nhà Xuất Bản Thế Giới'),(6,'NXB Tổng Hợp TPHCM'),(7,'NXB Hồng Đức'),(8,'Nhà Xuất Bản Phụ Nữ'),(9,'NXB Thanh Niên'),(10,'NXB Lao Động'),(11,'NXB Công Thương'),(12,'NXB Giáo Dục Việt Nam'),(13,'NXB Đại Học Quốc Gia TP.HCM'),(14,'NXB alpha');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rate` int DEFAULT NULL,
  `book_id` bigint NOT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7y1acs6la7vkgb5ulm44729sc` (`book_id`),
  KEY `FKq549kekqyw73qvq1md7rdk9un` (`customer_id`),
  CONSTRAINT `FK7y1acs6la7vkgb5ulm44729sc` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `FKq549kekqyw73qvq1md7rdk9un` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,5,1,2);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_CUSTOMER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_EMPLOYEE'),(3,'ROLE_CUSTOMER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role_id` bigint NOT NULL,
  `user_detail_id` bigint DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7k7r1dvep9vu4tg69ebted09v` (`user_detail_id`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  CONSTRAINT `FKda0fetw3e5nbo2brw8c0n9bts` FOREIGN KEY (`user_detail_id`) REFERENCES `user_detail` (`user_detail_id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'$2a$10$O/n1kywb9GaZkBbfKaLr0eLkGjKi/4nC1Gd7chBCQKvHz1VAak5Du',NULL,3,1,NULL,NULL),(2,'$2a$10$uthkVijiCEHGMY8d6fgUH.p/4qDbfTCne6fEUu63OqTvFU.zwISGO','long1234',3,2,NULL,NULL),(3,'$2a$10$n006.Y40/Tz4ZiNtP5jPx.R0cSipBwK6Bx4eAwWcF8bqTXlxOgfG6','122345678',2,3,NULL,NULL),(4,'$2a$10$K/D/vOOUn.UdGKuBP9zeweQGTRyaSe80YuFUNcm8vSEftcauz/vl.','duy12345',3,4,NULL,NULL),(5,'$2a$10$hjX8aXLuuNdcNCGihI79rexWNY4/nyfro6X32gs.zmHq6a0oPjW7i','12345678',3,5,NULL,NULL),(6,'$2a$10$BtnUPpTQi7qWDi.r5qyLD.kBo83R/FPK/cEKxn1XEveTq6uX/4Gry','duy123456',3,6,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_detail`
--

DROP TABLE IF EXISTS `user_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_detail` (
  `user_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(5000) DEFAULT NULL,
  `dob` datetime(6) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_detail`
--

LOCK TABLES `user_detail` WRITE;
/*!40000 ALTER TABLE `user_detail` DISABLE KEYS */;
INSERT INTO `user_detail` VALUES (1,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-05-09 17:58:10.160000','asasd'),(2,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-05-09 18:07:48.496000','asasd'),(3,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-06-07 13:21:06.494000','122345678'),(4,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-06-09 09:18:05.292000','duy12345'),(5,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-06-26 22:18:20.358000',NULL),(6,NULL,'https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg','2024-06-26 22:18:42.868000',NULL);
/*!40000 ALTER TABLE `user_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 20:19:42
